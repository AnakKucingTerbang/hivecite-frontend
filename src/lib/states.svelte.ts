// Define the shape of a research item
export interface ResearchItem {
	id: string;
	name: string;
	created_at: string; // Assuming created_at is stored as an ISO string or similar
}

export const createActiveResearch = () => {
	let value = $state<string | null>(null); // Stores the ID of the active research

	return {
		get value() {
			return value;
		},
		update: (_value: string | null) => (value = _value)
	};
};

export const createResearchList = () => {
	let list = $state<ResearchItem[]>([]);

	return {
		get list() {
			return list;
		},
		add: (item: ResearchItem) => {
			// Ensure no duplicate IDs are added, or decide on update strategy
			// For now, simple push. Consider sorting by created_at if needed.
			list = [...list, item];
		},
		remove: (itemId: string) => {
			list = list.filter((item) => item.id !== itemId);
		},
		init: (items: ResearchItem[]) => {
			list = items;
		},
		latest: (): ResearchItem | undefined => {
			// Assuming list is sorted by created_at or insertion order matters for "latest"
			if (list.length === 0) return undefined;
			// If not sorted by date, this just gets the last added.
			// If you need the truly latest by date, you might need to sort or find max created_at.
			// For now, consistent with previous behavior of "last item in array".
			return list[list.length - 1];
		}
	};
};
