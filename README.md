# Thodoris' webcorner

Source for [tyrovouzis.dev](https://tyrovouzis.dev), a personal blog built with [Astro](https://astro.build), [Tailwind CSS](https://tailwindcss.com) and [Pagefind](https://pagefind.app) search.

## Development

Requires the Node version in `.nvmrc` (`nvm use` or `fnm use`).

| Command           | Action                                                    |
| :---------------- | :-------------------------------------------------------- |
| `npm install`     | Install dependencies                                      |
| `npm run dev`     | Start the dev server at `localhost:4321`                  |
| `npm run build`   | Build the site to `./dist/` and generate the search index |
| `npm run preview` | Serve the production build locally                        |
| `npm run check`   | Type-check the project                                    |
| `npm run lint`    | Lint with ESLint                                          |
| `npm run format`  | Format with Prettier (`format:check` only reports)        |
| `npm run sync`    | Regenerate content collection types                       |

Search only works in a production build (`npm run build && npm run preview`).

## Writing posts

Posts live in `src/content/post/`, as a single `.md`/`.mdx` file or a folder with an `index.md(x)` and its images. The file or folder name becomes the URL: `src/content/post/elf/index.mdx` → `/posts/elf/`. Files starting with `_` are ignored.

Frontmatter is validated by the schema in `src/content.config.ts`:

| Property         | Description                                                                         |
| :--------------- | :---------------------------------------------------------------------------------- |
| `title` \*       | Post title, max 60 characters                                                       |
| `description` \* | SEO description, 50–160 characters                                                  |
| `publishDate` \* | ISO date, e.g. `2024-03-23`                                                         |
| `updatedDate`    | ISO date; posts are sorted by this when set                                         |
| `tags`           | List of tags; lowercased, and each gets a page at `/tags/<slug>/`                   |
| `coverImage`     | `{ src: "./image.png", alt: "..." }`, shown above the post                          |
| `ogImage`        | Path to a custom social image; otherwise one is generated at `/og-image/<post>.png` |

\* required

- **Images:** reference them relatively (`![alt](./diagram.png)`); they are optimised at build time.
- **Math:** inline `$...$` and display `$$...$$` (remark-math + KaTeX), or the `<Latex formula="..." />` component in MDX.

## Project notes

- Site metadata and menu links: `src/site.config.ts`.
- Colours and post typography: `src/styles/global.css` (Tailwind v4, configured in CSS).
- Font: Roboto Mono via the Astro Fonts API (`astro.config.ts`), also used by the OG images (`src/pages/og-image/[slug].png.ts`).
- Navigation uses Astro's `<ClientRouter />`. Client scripts that touch the page must run on `astro:page-load`, not `DOMContentLoaded`.
- CI (`.github/workflows/ci.yml`) runs lint, format check, type check and build on every push and pull request; Dependabot groups minor/patch updates monthly.

## Credits

Based on [Astro Theme Cactus](https://github.com/chrismwilliams/astro-theme-cactus) by Chris Williams (MIT, see [LICENSE](./LICENSE)).
