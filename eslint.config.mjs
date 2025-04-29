import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals"),
  // Add a new configuration object to define custom rules
  {
    rules: {
      // Disable the 'quotes' rule to allow both single and double quotes
      'quotes': 'off',
      // You can add other custom rules here if needed
    },
  },
];

export default eslintConfig;
