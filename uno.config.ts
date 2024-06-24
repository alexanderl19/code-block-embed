import { defineConfig } from 'unocss';
import presetMini from '@unocss/preset-mini';

export default defineConfig({
	presets: [presetMini()],
	theme: {
		fontFamily: {
			archivo: 'Archivo Variable'
		}
	}
});
