// Loaded from src/styles/global.css via `@config` (Tailwind v4 JS config compatibility)
import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";
import plugin, { type PluginUtils } from "tailwindcss/plugin";
import typography from "@tailwindcss/typography";

// Underline gradients shared by `.cactus-link` and prose links
const linkUnderline =
	"linear-gradient(transparent,transparent 5px,rgb(var(--theme-text)) 5px,rgb(var(--theme-text)))";
const linkUnderlineHover =
	"linear-gradient(transparent,transparent 4px,rgb(var(--theme-link)) 4px,rgb(var(--theme-link)))";

export default {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	theme: {
		extend: {
			colors: {
				bgColor: "rgb(var(--theme-bg) / <alpha-value>)",
				textColor: "rgb(var(--theme-text) / <alpha-value>)",
				link: "rgb(var(--theme-link) / <alpha-value>)",
				accent: "rgb(var(--theme-accent) / <alpha-value>)",
				"accent-2": "rgb(var(--theme-accent-2) / <alpha-value>)",
				quote: "rgb(var(--theme-quote) / <alpha-value>)",
			},
			fontFamily: {
				// Add any custom fonts here
				sans: [...defaultTheme.fontFamily.sans],
				serif: [...defaultTheme.fontFamily.serif],
			},
			transitionProperty: {
				height: "height",
			},
			typography: ({ theme }: PluginUtils) => ({
				cactus: {
					css: {
						"--tw-prose-body": theme("colors.textColor / 1"),
						"--tw-prose-headings": theme("colors.accent-2 / 1"),
						"--tw-prose-links": theme("colors.textColor / 1"),
						"--tw-prose-bold": theme("colors.textColor / 1"),
						"--tw-prose-bullets": theme("colors.textColor / 1"),
						"--tw-prose-quotes": theme("colors.quote / 1"),
						"--tw-prose-code": theme("colors.textColor / 1"),
						"--tw-prose-hr": "0.5px dashed #666",
						"--tw-prose-th-borders": "#666",
					},
				},
				DEFAULT: {
					css: {
						// Same look as `.cactus-link` (Tailwind v4 doesn't support @apply inside plugin config)
						a: {
							textDecoration: "none",
							backgroundSize: "100% 6px",
							backgroundPosition: "bottom",
							backgroundRepeat: "repeat-x",
							backgroundImage: linkUnderline,
							"&:hover": {
								backgroundImage: linkUnderlineHover,
							},
						},
						strong: {
							fontWeight: "700",
						},
						code: {
							border: "1px dotted #666",
							borderRadius: "2px",
						},
						blockquote: {
							borderLeftWidth: "0",
						},
						hr: {
							borderTopStyle: "dashed",
						},
						thead: {
							borderBottomWidth: "none",
						},
						"thead th": {
							fontWeight: "700",
							borderBottom: "1px dashed #666",
						},
						"tbody tr": {
							borderBottomWidth: "none",
						},
						tfoot: {
							borderTop: "1px dashed #666",
						},
						sup: {
							marginInlineStart: "0.125rem",
							a: {
								backgroundImage: "none",
								"&:hover": {
									color: "rgb(var(--theme-link))",
									textDecoration: "none",
									backgroundImage: "none",
								},
								"&:before": {
									content: "'['",
								},
								"&:after": {
									content: "']'",
								},
							},
						},
					},
				},
				sm: {
					css: {
						code: {
							fontSize: theme("fontSize.sm")[0],
							fontWeight: "400",
						},
					},
				},
			}),
		},
	},
	plugins: [
		typography,
		plugin(function ({ addComponents }) {
			addComponents({
				".cactus-link": {
					"@apply bg-[size:100%_6px] bg-bottom bg-repeat-x": {},
					backgroundImage: linkUnderline,
					"&:hover": {
						backgroundImage: linkUnderlineHover,
					},
				},
				".title": {
					"@apply text-2xl font-semibold text-accent-2": {},
				},
			});
		}),
	],
} satisfies Config;
