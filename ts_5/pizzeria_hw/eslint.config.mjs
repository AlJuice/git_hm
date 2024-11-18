import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  prettierConfig, // Подключаем конфигурацию Prettier для отключения конфликтующих правил
  {
    plugins: { prettier: prettierPlugin },
    rules: {
      'prettier/prettier': 'error'
      // 'no-console': 'error' // Предупреждение при использовании console.log
    }
  }
];