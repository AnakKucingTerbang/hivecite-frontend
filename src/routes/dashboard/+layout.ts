import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	return {
		research: ["Aging population and mHealth", "Accessibility settings overview"]
	};

	error(404, 'Not found');
};
