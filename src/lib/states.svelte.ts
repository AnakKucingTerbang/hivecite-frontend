import { writable } from 'svelte/store';

export const modalStates = writable({
	addPaper: {
		show: false
	},
	addResearchProject: {
		show: false
	},
	filterPaper: {
		show: false
	},
	addTag: {
		show: false,
		metadata: {
			id: null
		}
	}
});