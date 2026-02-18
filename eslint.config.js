const { defineConfig } = require("eslint/config");
const expoConfig = require("eslint-config-expo/flat");
const eslintPluginPrettierRecommended = require("eslint-plugin-prettier/recommended");

module.exports = defineConfig([
  expoConfig,
  eslintPluginPrettierRecommended,
  {
    ignores: ["dist/*"],
    overrides: [
      {
        files: [
          "**/*.test.*",
          "**/*.spec.*",
          "**/jest.setup.*",
          "**/__tests__/**",
        ],
        env: {
          jest: true,
        },
      },
    ],
  },
]);
