import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load = (async ({ url }) => {
	const codeUrl = url.searchParams.get('code');
	if (!codeUrl) throw error(400, '`code` search parameter is required.');

	const lines = url.searchParams.get('lines');
	const linesParsed = lines
		?.split(':')
		.map((lines) => lines.split(',').map((number) => parseInt(number)));

	const code = await (await fetch(codeUrl)).text();

	return { code, lines: linesParsed };
}) satisfies PageServerLoad;
