// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import tailwindcss from '@tailwindcss/vite';

// Each topic is a folder in src/content/docs/. Notes inside are listed automatically,
// ordered by `sidebar.order` in their frontmatter (then alphabetically).
const topics = [
	['Software Engineering', 'software-engineering'],
	['Backend', 'backend'],
	['Frontend', 'frontend'],
	['Databases', 'databases'],
	['Data Engineering', 'data-engineering'],
	['Algorithms', 'algorithms'],
	['DevOps & Cloud', 'devops-cloud'],
	['AI / ML Research', 'ai-ml-research'],
	['Teaching', 'teaching'],
];

// https://astro.build/config
export default defineConfig({
	// Vercel provides the production domain at build time (used for sitemap and canonical URLs).
	site: process.env.VERCEL_PROJECT_PRODUCTION_URL
		? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
		: undefined,
	integrations: [
		starlight({
			title: 'Knowledge Handbook',
			description: 'My personal, searchable engineering knowledge base.',
			lastUpdated: true,
			sidebar: topics.map(([label, directory]) => ({
				label,
				collapsed: true,
				items: [{ autogenerate: { directory } }],
			})),
			customCss: ['./src/styles/global.css'],
		}),
	],
	vite: {
		plugins: [tailwindcss()],
	},
});
