import { defineConfig } from 'unocss';
import presetMini from '@unocss/preset-mini';

export default defineConfig({
	presets: [presetMini()],
	theme: {
		fontFamily: {
			archivo: 'Archivo Variable'
		}
	},
	shortcuts: {
		'ring-focus-visible':
			'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-7 focus-visible:ring-offset-2'
	}
});
