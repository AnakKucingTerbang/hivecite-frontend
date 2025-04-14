<script lang="ts">
	import { Sidebar } from '$lib/components/ui/sidebar';

	let { children, data } = $props();
</script>

<div class="flex h-screen overflow-hidden">
	<Sidebar research={data.research} />
	{@render children()}
</div>
