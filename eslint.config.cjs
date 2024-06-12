/* eslint-env node */

module.exports = {
  files: ['*.vue, *.js, *.cjs, *.mjs'],
  ignores: ['node_modules', 'dist', 'build', 'public', 'coverage', '*.config.js'],
  root: true,
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  }
}
