import { defineConfig, fontProviders } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";
import tailwindcss from "@tailwindcss/vite";
import { unified } from "@astrojs/markdown-remark";
import rehypeUnwrapImages from "rehype-unwrap-images";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { remarkReadingTime } from "./src/utils/remark-reading-time.mjs";

// https://astro.build/config
export default defineConfig({
	// ! Please remember to replace the following site property with your own domain
	site: "https://tyrovouzis.dev",
	markdown: {
		// Astro 7 defaults to the Sätteri processor; unified() keeps remark/rehype plugins working
		processor: unified({
			remarkPlugins: [remarkReadingTime, remarkMath],
			rehypePlugins: [rehypeKatex, rehypeUnwrapImages],
			remarkRehype: { footnoteLabelProperties: { className: [""] } },
		}),
		shikiConfig: {
			theme: "dracula",
			wrap: true,
		},
	},
	// Prefetch is built in since Astro 3; links opt in with data-astro-prefetch
	prefetch: true,
	// Self-hosted at build time; used as Tailwind's `font-mono` (see src/styles/global.css)
	fonts: [
		{
			provider: fontProviders.fontsource(),
			name: "Roboto Mono",
			cssVariable: "--font-roboto-mono",
			weights: ["400 700"],
			styles: ["normal", "italic"],
			subsets: ["latin"],
			fallbacks: ["monospace"],
		},
	],
	integrations: [mdx(), sitemap(), icon()],
	compressHTML: true,
	vite: {
		plugins: [tailwindcss()],
		optimizeDeps: {
			exclude: ["@resvg/resvg-js"],
		},
	},
});
