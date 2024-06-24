import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load = (async ({ url }) => {
	const codeUrl = url.searchParams.get('code');
	if (!codeUrl) throw error(400, '`code` search parameter is required.');
	const code = await (await fetch(codeUrl)).text();

	const fileName = new URL(codeUrl).pathname.split('/').pop();

	const fontSize = url.searchParams.get('fontSize');

	const lines = url.searchParams.get('lines');
	const linesParsed =
		lines?.split(':').map((lines) => lines.split(',').map((number) => parseInt(number))) ?? [];

	const showOnHover = !(url.searchParams.get('showOnHover') === 'false');

	const wrapLines = Number(url.searchParams.get('wrapLines'));
	const wrapLinesParsed =
		!isNaN(wrapLines) && (wrapLines === 0 || wrapLines === 1) ? !!wrapLines : undefined;

	return {
		code,
		fileName,
		lines: linesParsed,
		showOnHover: showOnHover || undefined,
		fontSize: Number(fontSize) || undefined,
		wrapLines: wrapLinesParsed
	};
}) satisfies PageServerLoad;
