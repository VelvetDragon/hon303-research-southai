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
    "@next/next/no-html-link-for-pages": "off",
    "react/no-unescaped-entities": "off",
    // --- Other rules ---
    "react/react-in-jsx-scope": "off"
    // ... your other custom rulesou can add other custom rules here if needed
    },
  },
];

export default eslintConfig;
