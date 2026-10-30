// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import tailwindcss from '@tailwindcss/vite';

// Imported with a cache-busting query: Node caches modules, so a plain import would keep
// the old topic list when the dev server restarts after topics.mjs changes.
const topicsUrl = new URL('./src/topics.mjs', import.meta.url);
const { topics } = await import(`${topicsUrl.href}?t=${Date.now()}`);

// https://astro.build/config
export default defineConfig({
	// Vercel provides the production domain at build time (used for sitemap and canonical URLs).
	site: process.env.VERCEL_PROJECT_PRODUCTION_URL
		? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
		: undefined,
	integrations: [
		starlight({
			title: 'Anvo Handbook',
			description: 'My personal, searchable engineering knowledge base.',
			lastUpdated: true,
			sidebar: topics.map(([label, directory]) => ({
				label,
				collapsed: true,
				items: [{ autogenerate: { directory } }],
			})),
			components: {
				Footer: './src/components/Footer.astro',
			},
			customCss: ['./src/styles/global.css'],
		}),
		{
			// The sidebar is read once at startup, so restart the dev server when the topic list changes.
			name: 'watch-topics',
			hooks: {
				'astro:config:setup': ({ addWatchFile }) => {
					addWatchFile(topicsUrl);
				},
			},
		},
	],
	vite: {
		plugins: [tailwindcss()],
	},
});
