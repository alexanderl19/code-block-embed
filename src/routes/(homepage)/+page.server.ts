import type { Actions } from './$types';

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const code = data.get('code');

		if (code && typeof code === 'string') {
			const response = await fetch(code);
			return { code: await response.text() };
		}
	},
} satisfies Actions;
