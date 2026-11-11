import { defineConfig, globalIgnores } from "eslint/config";
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import astro from "eslint-plugin-astro";
import prettierRecommended from "eslint-plugin-prettier/recommended";
import globals from "globals";

export default defineConfig([
	globalIgnores(["dist/", ".astro/", "node_modules/"]),
	{
		languageOptions: {
			globals: { ...globals.node },
		},
	},
	js.configs.recommended,
	tseslint.configs.recommended,
	prettierRecommended,
	astro.configs.recommended,
	astro.configs["jsx-a11y-recommended"],
	{
		rules: {
			"@typescript-eslint/no-require-imports": "warn",
		},
	},
	{
		files: ["**/*.astro"],
		rules: {
			// prettier-plugin-astro formats these; don't report formatting as lint errors
			"prettier/prettier": "off",
			"@typescript-eslint/consistent-type-imports": "error",
			"@typescript-eslint/no-unused-vars": "off",
		},
	},
	{
		files: ["**/*.ts"],
		rules: {
			"@typescript-eslint/no-unused-vars": [
				"error",
				{ argsIgnorePattern: "^_", destructuredArrayIgnorePattern: "^_" },
			],
			"@typescript-eslint/no-non-null-assertion": "off",
		},
	},
]);
