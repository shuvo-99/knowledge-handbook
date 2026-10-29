# Knowledge Handbook

My personal, searchable engineering knowledge base, built with [Astro Starlight](https://starlight.astro.build) and Tailwind CSS.

## Layout

- **Left:** all topics (sidebar, generated from folders)
- **Middle:** the note
- **Right:** headings of the current note, plus previous/next links at the bottom

## Writing a note

1. Copy `templates/note.md` to `src/content/docs/<topic>/<note-name>.md`
2. Set `title`, `description` and `sidebar.order` in the frontmatter
3. Use `##` / `###` headings — they appear in the right-hand column

New notes show up in the sidebar automatically. To add a new topic, create a folder in `src/content/docs/` and add it to the `topics` list in `astro.config.mjs`.

## Commands

| Command | Action |
| --- | --- |
| `pnpm install` | Install dependencies |
| `pnpm dev` | Start the dev server at `localhost:4321` |
| `pnpm build` | Build the site to `./dist/` |
| `pnpm preview` | Preview the build locally |

## Deploying

Hosted on [Vercel](https://vercel.com). The repo is connected to a Vercel project, so every push to `main`
deploys to production and every other branch gets a preview URL. Vercel detects Astro and pnpm automatically.

The deployed site is **public**. Don't publish work code, credentials or anything personal.

## Export as PDF

Open any note, press `Ctrl+P` and choose **Save as PDF**. The print stylesheet in `src/styles/global.css` hides the sidebars and navigation.
