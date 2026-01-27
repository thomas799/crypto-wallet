import eslint from '@eslint/js';
import typescriptEslintPlugin from '@typescript-eslint/eslint-plugin';
import perfectionistPlugin from 'eslint-plugin-perfectionist';
import prettierRecommendedPlugin from 'eslint-plugin-prettier/recommended';
import reactPlugin from 'eslint-plugin-react';
import hooksPlugin from 'eslint-plugin-react-hooks';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommended,
  reactPlugin.configs.flat['jsx-runtime'],
  prettierRecommendedPlugin,
  {
    ignores: ['**/build/**', '**/node_modules/**', '**/dist/**', '**/.next/**']
  },
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      globals: {
        JSX: 'writable',
        React: 'writable',
        ...Object.fromEntries(
          Object.entries(globals.browser).map(([key, value]) => [
            key.trim(),
            value
          ])
        ),
        ...Object.fromEntries(
          Object.entries(globals.node).map(([key, value]) => [
            key.trim(),
            value
          ])
        )
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        },
        sourceType: 'module'
      }
    },
    plugins: {
      '@typescript-eslint': typescriptEslintPlugin,
      perfectionist: perfectionistPlugin,
      react: reactPlugin,
      'react-hooks': hooksPlugin
    },
    rules: {
      '@typescript-eslint/await-thenable': 'off',
      '@typescript-eslint/ban-ts-comment': 'warn',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports' }
      ],
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-expressions': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_'
        }
      ],
      'no-unused-vars': 'off',
      'react/prop-types': 'off',

      // Perfectionist
      'perfectionist/sort-imports': ['error'],
      'perfectionist/sort-interfaces': ['error'],
      'perfectionist/sort-named-imports': 'error',
      'perfectionist/sort-objects': ['error'],

      // Prettier rules
      'prettier/prettier': [
        'error',
        {
          parser: 'typescript',
          singleQuote: true,
          trailingComma: 'none'
        }
      ],

      // React Best Practices
      'react-hooks/exhaustive-deps': 'off',
      'react-hooks/rules-of-hooks': 'warn',
      'react/jsx-boolean-value': ['error', 'never'],
      'react/jsx-no-useless-fragment': 'error',
      'react/jsx-sort-props': [
        'error',
        {
          callbacksLast: true,
          ignoreCase: true,
          reservedFirst: true,
          shorthandFirst: true
        }
      ]
    },
    settings: {
      perfectionist: {
        order: 'asc',
        partitionByComment: true,
        type: 'natural'
      }
    }
  },
  {
    files: ['next-env.d.ts'],
    rules: {
      '@typescript-eslint/triple-slash-reference': 'off'
    }
  }
);
