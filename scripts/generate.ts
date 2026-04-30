#!/usr/bin/env tsx
/**
 * Lightweight scaffolding generator.
 *
 * Usage:
 *   pnpm gen <kind> <Name>
 *
 * Kinds:
 *   component | screen | hook | store | service | query | navigator | feature
 *
 * `feature` is a composite that runs store + service + query + screen.
 *
 * Templates live in `templates/<kind>/`. They can use these placeholders:
 *   {{Name}}       PascalCase  e.g. "UserProfile"
 *   {{name}}       camelCase   e.g. "userProfile"
 *   {{kebab-name}} kebab-case  e.g. "user-profile"
 *   {{snake_name}} snake_case  e.g. "user_profile"
 *
 * No EJS — placeholder substitution is enough for our shapes and avoids
 * a dependency that drifts.
 */
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';

type Kind =
  | 'component'
  | 'screen'
  | 'hook'
  | 'store'
  | 'service'
  | 'query'
  | 'navigator'
  | 'feature';

const KINDS: Kind[] = [
  'component',
  'screen',
  'hook',
  'store',
  'service',
  'query',
  'navigator',
  'feature',
];
const REPO_ROOT = process.cwd();

function fail(msg: string): never {
  console.error(`✗ ${msg}`);
  process.exit(1);
}

function caseTransforms(name: string) {
  const Pascal = name
    .replace(/[-_\s]+([a-z])/g, (_, c: string) => c.toUpperCase())
    .replace(/^([a-z])/, (_, c: string) => c.toUpperCase());
  const camel = Pascal.charAt(0).toLowerCase() + Pascal.slice(1);
  const kebab = Pascal.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
  const snake = kebab.replace(/-/g, '_');
  return { Pascal, camel, kebab, snake };
}

function render(template: string, vars: ReturnType<typeof caseTransforms>): string {
  return template
    .replaceAll('{{Name}}', vars.Pascal)
    .replaceAll('{{name}}', vars.camel)
    .replaceAll('{{kebab-name}}', vars.kebab)
    .replaceAll('{{snake_name}}', vars.snake);
}

function destinationFor(
  kind: Kind,
  vars: ReturnType<typeof caseTransforms>,
  templateFile: string
): string {
  const fileName = render(templateFile, vars);
  switch (kind) {
    case 'component':
      return join('app', 'components', fileName);
    case 'screen':
      return join('app', 'screens', vars.kebab, fileName);
    case 'hook':
      return join('app', 'hooks', fileName);
    case 'store':
      return join('app', 'stores', fileName);
    case 'service':
      return join('app', 'services', vars.camel, fileName);
    case 'query':
      return join('app', 'queries', fileName);
    case 'navigator':
      return join('app', 'navigators', fileName);
    case 'feature':
      return ''; // unused — feature dispatches to other kinds
  }
}

async function generate(kind: Kind, rawName: string): Promise<void> {
  const vars = caseTransforms(rawName);
  if (!vars.Pascal) fail(`Invalid name: "${rawName}"`);

  if (kind === 'feature') {
    await generate('store', rawName);
    await generate('service', rawName);
    await generate('query', rawName);
    await generate('screen', rawName);
    console.warn('\n→ Feature scaffold complete. Next steps:');
    console.warn(`  • Define the Zod schema in app/services/${vars.camel}/${vars.camel}Service.ts`);
    console.warn(`  • Wire ${vars.Pascal}Screen into app/navigators/AppNavigator.tsx`);
    console.warn(`  • Add i18n keys for "${vars.camel}.*" in app/i18n/en.ts`);
    return;
  }

  const templateDir = join(REPO_ROOT, 'templates', kind);
  if (!existsSync(templateDir)) fail(`No templates/ for kind "${kind}"`);

  const templateFiles = readdirSync(templateDir).filter((f) =>
    statSync(join(templateDir, f)).isFile()
  );
  if (templateFiles.length === 0) fail(`No template files in ${templateDir}`);

  for (const templateFile of templateFiles) {
    const dest = destinationFor(kind, vars, templateFile);
    if (existsSync(dest)) fail(`Refusing to overwrite ${dest}`);

    const template = readFileSync(join(templateDir, templateFile), 'utf8');
    const rendered = render(template, vars);
    await mkdir(dirname(dest), { recursive: true });
    await writeFile(dest, rendered);
    console.warn(`✓ ${dest}`);
  }
}

const [, , kind, name] = process.argv;
if (!kind || !name) {
  console.error('Usage: pnpm gen <kind> <Name>');
  console.error(`Kinds: ${KINDS.join(' | ')}`);
  process.exit(1);
}
if (!KINDS.includes(kind as Kind)) fail(`Unknown kind "${kind}". Use one of: ${KINDS.join(', ')}`);

await generate(kind as Kind, name);
