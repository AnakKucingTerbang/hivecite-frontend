<script lang="ts">
	import { Sidebar } from '$lib/components/ui/sidebar';
	import { modalStates } from '@/states.svelte'
	import AddResearchProject from '@/components/ui/modal/add-research-project/AddResearchProject.svelte';
	import AddPaper from '@/components/ui/modal/add-paper/AddPaper.svelte';
	import FilterPaper from '@/components/ui/modal/filter-paper/FilterPaper.svelte';
	import AddTag from '@/components/ui/modal/add-tag/AddTag.svelte';

	let { children } = $props();
</script>

<div class="flex h-screen overflow-hidden">
	{#if $modalStates.addPaper.show}
		<AddPaper />
	{/if}
	{#if $modalStates.addResearchProject.show}
		<AddResearchProject />
	{/if}
	{#if $modalStates.filterPaper.show}
		<FilterPaper />
	{/if}
	{#if $modalStates.addTag.show}
		<AddTag />
	{/if}
	<Sidebar />
	{@render children()}
</div>
