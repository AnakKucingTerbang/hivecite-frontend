<!-- src/lib/components/accordion/Accordion.svelte -->
<script>
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';

	/**
	 * If true, allows multiple accordion items to be open at the same time.
	 * @type {boolean}
	 */
	export let multiple = false;

	const activeItems = writable(multiple ? new Set() : null);

	const toggleItem = (id) => {
		activeItems.update((current) => {
			if (multiple) {
				current.has(id) ? current.delete(id) : current.add(id);
				return current;
			} else {
				return current === id ? null : id;
			}
		});
	};

	// MODIFIED: Pass the 'multiple' prop into the context as well.
	setContext('accordion', {
		multiple, // <-- ADD THIS
		activeItems,
		toggleItem
	});
</script>

<div class="accordion-container" role="presentation">
	<slot />
</div>

<!-- src/lib/components/accordion/Accordion.svelte -->
<style>
	.accordion-container {
		/* The container now acts as a flex column with a gap */
		display: flex;
		flex-direction: column;
		gap: 0.75rem; /* 12px space between items */
	}
</style>