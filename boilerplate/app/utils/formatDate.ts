import { format, parseISO, type Locale } from "date-fns"
import { arSA } from "date-fns/locale/ar-SA"
import { ko } from "date-fns/locale/ko"
import { enUS } from "date-fns/locale/en-US"
import { i18n } from "@/i18n"

type Options = Parameters<typeof format>[2]

const getLocale = (): Locale => {
  const locale = i18n.language.split("-")[0]
  return locale === "ar" ? arSA : locale === "ko" ? ko : enUS
}

export const formatDate = (date: string, dateFormat?: string, options?: Options) => {
  const locale = getLocale()
  const dateOptions = {
    ...options,
    locale,
  }
  return format(parseISO(date), dateFormat ?? "MMM dd, yyyy", dateOptions)
}
