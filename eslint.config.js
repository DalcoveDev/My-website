import js from "@eslint/js";
import globals from "globals";

export default [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: {
        ...globals.browser,
      },
    },
    rules: {
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_", varsIgnorePattern: "^(_|gsap|ScrollTrigger)", caughtErrorsIgnorePattern: "^_" }],
      "no-console": "warn",
      "no-debugger": "warn",
      "no-duplicate-imports": "error",
      "eqeqeq": ["error", "always"],
      "no-var": "error",
      "prefer-const": "warn",
      "no-throw-literal": "error",
      "no-self-compare": "error",
      "no-template-curly-in-string": "warn",
      "no-unreachable-loop": "error",
      "no-loss-of-precision": "error",
      "no-promise-executor-return": "error",
      "no-useless-concat": "warn",
      "no-useless-return": "warn",
      "no-shadow": "warn",
    },
  },
  {
    ignores: ["dist/**", "node_modules/**", "backend/**"],
  },
];
