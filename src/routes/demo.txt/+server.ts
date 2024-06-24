import type { RequestHandler } from './$types';
import landingCode from '../landing-code.txt?raw';

export const GET: RequestHandler = () => {
	return new Response(landingCode, {
		headers: {
			'Content-Type': 'text/plain; charset=utf-8'
		}
	});
};
