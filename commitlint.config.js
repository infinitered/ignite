/** @type {import('@commitlint/types').UserConfig} */
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-enum': [
      2,
      'always',
      [
        'screen',
        'store',
        'query',
        'service',
        'nav',
        'theme',
        'i18n',
        'auth',
        'api',
        'components',
        'hooks',
        'lib',
        'infra',
        'docs',
        'deps',
        'ci',
        'release',
        'a11y',
        'perf',
        'security',
      ],
    ],
    'subject-case': [2, 'never', ['upper-case', 'pascal-case', 'start-case']],
    'header-max-length': [2, 'always', 100],
  },
};
