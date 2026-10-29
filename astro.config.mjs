// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import tailwindcss from '@tailwindcss/vite';
import { topics } from './src/topics.mjs';

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
					addWatchFile(new URL('./src/topics.mjs', import.meta.url));
				},
			},
		},
	],
	vite: {
		plugins: [tailwindcss()],
	},
});
