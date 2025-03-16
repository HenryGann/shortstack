import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import parser from '@typescript-eslint/parser';

export default tseslint.config(
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser,
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: import.meta.dir,
      },
      sourceType: "module",
    },
    plugins: {
      "@typescript-eslint": tseslint,
    },
    rules: {
      ...eslint.configs.recommended.rules,
      ...tseslint.configs.recommended.rules,
      ...tseslint.configs.recommendedTypeChecked.rules,

      // Formatting and styling
      "semi": ["error", "always"],
      "quotes": ["error", "single"],
      "curly": ["error", "all"],
      "prefer-const": "warn",
      "no-undef": "off",
      "indent": ["error", 2],
      "space-infix-ops": "error",
      "object-curly-spacing": ["error", "always"],
      "no-mixed-spaces-and-tabs": "error",
      "array-bracket-spacing": ["error", "always"],
      "block-spacing": ["error", "always"],
      "linebreak-style": ["error", "unix"]
    },
    ignores: ["node_modules/**", "dist/**",]
  },
  {
    files: ["**/*.js"],
    ignores: ["node_modules/**", "dist/**",]
  }
);
