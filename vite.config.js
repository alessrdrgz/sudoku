import { sveltekit } from '@sveltejs/kit/vite';
import path from 'path';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()],
	resolve: {
		alias: {
			'@components': path.resolve('src/lib/components'),
			'@lib': path.resolve('src/lib'),
			'@store': path.resolve('src/lib/store'),
			'@utils': path.resolve('src/lib/utils'),
			'@icons': path.resolve('src/lib/components/icons'),
			'@sudoku': path.resolve('src/lib/components/sudoku'),
			'@styles': path.resolve('src/styles')
		}
	}
};

export default config;
