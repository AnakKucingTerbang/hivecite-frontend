<script lang="ts">
	import { Sidebar } from '$lib/components/ui/sidebar';

	let { children } = $props();
</script>

<div class="flex h-screen overflow-hidden">
	<Sidebar />
	{@render children()}
</div>
