require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  env: {
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'plugin:tailwindcss/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    '@vue/eslint-config-prettier',
    'prettier',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: false,
    },
  },
  plugins: ['vue', 'import', '@typescript-eslint'],
  ignorePatterns: [
    'dist',
    'node_modules',
    'src/api/graphql.ts',
    'types/auto-imports.d.ts',
    'types/auto-components.d.ts',
  ],
  rules: {
    'no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],
    'no-constant-condition': 'off',
    'import/newline-after-import': 'error',
    'vue/no-restricted-syntax': [
      'error',
      {
        /** @see https://astexplorer.net */
        selector:
          '[expression.name="$debug"],[expression.callee.name="$debug"]',
        message:
          'Remove after use immediately. It will not be removed at build.',
      },
    ],
    'vue/multi-word-component-names': 'off',
    'vue/component-name-in-template-casing': [
      'error',
      'PascalCase',
      { registeredComponentsOnly: false },
    ],
    'vue/require-explicit-emits': 'off',
    'vue/no-unused-vars': [
      'warn',
      {
        ignorePattern: '^_',
      },
    ],
    'vue/component-tags-order': [
      'error',
      {
        order: ['script', 'template', 'style'],
      },
    ],
    'vue/padding-line-between-blocks': 'error',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
        ignoreRestSiblings: true,
      },
    ],
    '@typescript-eslint/no-empty-interface': [
      'error',
      {
        allowSingleExtends: true,
      },
    ],
    'tailwindcss/no-custom-classname': [
      'error',
      {
        config: 'tailwind.config.cjs',
      },
    ],
    'no-restricted-imports': [
      'error',
      {
        patterns: ['**/*/pages/*'],
      },
    ],
  },
  settings: {
    'import/resolver': {
      typescript: {
        project: ['tsconfig.json'],
      },
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        moduleDirectory: ['node_modules', 'src/'],
      },
    },
  },
  overrides: [
    {
      files: ['*.vue'],
      rules: {
        'no-undef': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
      },
    },
  ],
}
