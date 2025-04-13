<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Plus } from 'lucide-svelte';

	let { children, data } = $props();
</script>

<div class="flex h-full w-full flex-col">
	<div class="flex items-center justify-between p-4">
		<h1 class="text-xl font-bold">{data.slug}</h1>
	</div>
	<div class="grow overflow-y-auto rounded-tl-md">
		{@render children()}
	</div>
</div>
