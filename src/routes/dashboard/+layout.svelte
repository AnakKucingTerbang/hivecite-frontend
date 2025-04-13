<script lang="ts">
	import { Sidebar } from '$lib/components/ui/sidebar';

	let { children, data } = $props();
</script>

<div class="flex h-screen">
	<Sidebar research={data.research} />
	{@render children()}
</div>
