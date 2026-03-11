import {defineConfig, globalIgnores} from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const ext = [
    ...tseslint.configs.recommended, // Includes "no-explicit-any": "error"
    {
        rules: {
            // Set to "off", "warn", or "error"
            "@typescript-eslint/no-explicit-any": "error",
        }
    }
]

const eslintConfig = defineConfig([
    ...nextVitals,
    ...nextTs,
    ...ext,
    // Override default ignores of eslint-config-next.
    globalIgnores([
        // Default ignores of eslint-config-next:
        ".next/**",
        "out/**",
        "build/**",
        "next-env.d.ts",
    ]),
]);

export default eslintConfig;
