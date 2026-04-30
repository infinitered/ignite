import axios, { type AxiosInstance, type AxiosRequestConfig, isAxiosError } from 'axios';
import type { z } from 'zod';

import { env } from '@/config/env';
import { logger } from '@/lib/logger';
import { getAuthToken } from '@/lib/secureStorage';

/**
 * Centralized HTTP client. Every network call in app code must go through
 * this instance — Biome enforces this via `noRestrictedImports`. The
 * indirection exists so that auth-header injection, error normalization,
 * dev logging, request cancellation, and Sentry breadcrumbs are applied
 * uniformly.
 */

const NETWORK_ERROR_CODE = 'NETWORK_ERROR';
const TIMEOUT_ERROR_CODE = 'TIMEOUT';
const UNKNOWN_ERROR_CODE = 'UNKNOWN';

/**
 * Normalized error type. Extends `Error` so consumers can rely on
 * `error.message` and `instanceof Error` checks.
 */
export class ApiError extends Error {
  status: number | null;
  code: string;
  data?: unknown;

  constructor(message: string, opts: { status: number | null; code: string; data?: unknown }) {
    super(message);
    this.name = 'ApiError';
    this.status = opts.status;
    this.code = opts.code;
    this.data = opts.data;
  }
}

function normalizeError(error: unknown): ApiError {
  if (isAxiosError(error)) {
    if (error.response) {
      const data = error.response.data as { message?: string } | undefined;
      return new ApiError(data?.message ?? error.message, {
        status: error.response.status,
        code: typeof error.code === 'string' ? error.code : `HTTP_${error.response.status}`,
        data: error.response.data,
      });
    }
    if (error.code === 'ECONNABORTED') {
      return new ApiError('Request timed out', { status: null, code: TIMEOUT_ERROR_CODE });
    }
    if (error.code === 'ERR_NETWORK') {
      return new ApiError('Network unavailable', { status: null, code: NETWORK_ERROR_CODE });
    }
    return new ApiError(error.message, { status: null, code: UNKNOWN_ERROR_CODE });
  }
  if (error instanceof Error) {
    return new ApiError(error.message, { status: null, code: UNKNOWN_ERROR_CODE });
  }
  return new ApiError('Unknown error', { status: null, code: UNKNOWN_ERROR_CODE, data: error });
}

function createApi(): AxiosInstance {
  const instance = axios.create({
    baseURL: env.EXPO_PUBLIC_API_URL,
    timeout: 15_000,
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
  });

  instance.interceptors.request.use(async (config) => {
    const token = await getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    if (__DEV__) {
      logger.debug(`→ ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`);
    }
    return config;
  });

  instance.interceptors.response.use(
    (response) => {
      if (__DEV__) {
        logger.debug(`← ${response.status} ${response.config.url}`);
      }
      return response;
    },
    (error: unknown) => {
      const normalized = normalizeError(error);
      if (__DEV__) {
        logger.warn(`✗ ${normalized.code} ${normalized.status ?? ''} ${normalized.message}`);
      }
      return Promise.reject(normalized);
    }
  );

  return instance;
}

export const api = createApi();

/**
 * Fetch + Zod-validate. Use this for endpoints whose shape you want
 * checked at runtime (recommended for any external API).
 */
export async function getValidated<T>(
  url: string,
  schema: z.ZodType<T>,
  config?: AxiosRequestConfig
): Promise<T> {
  const response = await api.get(url, config);
  return schema.parse(response.data);
}

export type { AxiosRequestConfig };
