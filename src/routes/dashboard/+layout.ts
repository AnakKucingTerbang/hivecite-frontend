import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	return {
		research: ["Title goes here", "wowowowowo wowowowowow wowowoow"]
	};

	error(404, 'Not found');
};
