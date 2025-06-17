<!-- src/lib/components/accordion/AccordionItem.svelte -->
<script>
	import { getContext } from 'svelte';
	import { slide } from 'svelte/transition';

	const id = Symbol();

	// MODIFIED: Destructure 'multiple' from the context.
	const { multiple, activeItems, toggleItem } = getContext('accordion');

	// MODIFIED: The logic to determine if the item is open now depends on the 'multiple' flag.
	// This prevents the "Cannot read property 'has' of null" error.
	$: isOpen = multiple ? $activeItems.has(id) : $activeItems === id;

	// ARIA attributes for accessibility
	const a11y = {
		buttonId: `accordion-button-${id.toString()}`,
		contentId: `accordion-content-${id.toString()}`,
	};
</script>

<div class="accordion-item" class:open={isOpen}>
	<!-- svelte-ignore a11y-autofocus -->
	<button
		class="accordion-header"
		on:click={() => toggleItem(id)}
		aria-expanded={isOpen}
		aria-controls={a11y.contentId}
		id={a11y.buttonId}
	>
		<slot name="header" />
		<span class="indicator" aria-hidden="true" />
	</button>

	{#if isOpen}
		<div
			class="accordion-content"
			transition:slide={{ duration: 250 }}
			id={a11y.contentId}
			role="region"
			aria-labelledby={a11y.buttonId}
		>
			<div class="content-padding">
				<slot name="content" />
			</div>
		</div>
	{/if}
</div>

<!-- src/lib/components/accordion/AccordionItem.svelte -->
<style>
	/* Each item is a self-contained card */
	.accordion-item {
		background-color: #ffffff;
		border: 1px solid #e5e7eb; /* gray-200 */
		border-radius: 0.75rem; /* 12px */
		box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
		transition:
			box-shadow 0.2s ease,
			background-color 0.2s ease;
	}

	/* When open, give it a slightly stronger shadow and a hint of color */
	.accordion-item.open {
		border-color: #d1d5db; /* gray-300 */
		box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
	}

	.accordion-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		padding: 1rem 1.25rem;
		font-size: 1rem;
		font-weight: 600;
		text-align: left;
		color: #1f2937; /* gray-800 */
		background-color: transparent;
		border: none;
		border-radius: inherit; /* Inherit rounding from parent */
		cursor: pointer;
	}
	
	.accordion-header:focus-visible {
		outline: 2px solid #3b82f6; /* A nice blue focus ring */
		outline-offset: 2px;
	}

	/* Use the original plus/minus indicator, it works well here */
	.indicator {
		position: relative;
		width: 1rem;
		height: 1rem;
		transition: transform 0.3s ease;
		flex-shrink: 0;
		margin-left: 1rem;
	}
	.indicator::before,
	.indicator::after {
		content: '';
		position: absolute;
		background-color: #4b5563;
		transition: transform 0.3s ease;
	}
	.indicator::before {
		top: 0;
		left: 50%;
		width: 2px;
		height: 100%;
		transform: translateX(-50%);
	}
	.indicator::after {
		top: 50%;
		left: 0;
		width: 100%;
		height: 2px;
		transform: translateY(-50%);
	}
	.open .indicator {
		transform: rotate(45deg);
	}
	.open .indicator::before {
		transform: translateX(-50%) rotate(90deg);
	}

	.accordion-content {
		color: #374151; /* gray-700 */
		overflow: hidden;
		border-top: 1px solid #e5e7eb; /* Separator line appears when open */
	}

	.content-padding {
		padding: 1.25rem;
	}
</style>