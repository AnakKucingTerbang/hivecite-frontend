<svelte:head>
    <script src="https://acrobatservices.adobe.com/view-sdk/viewer.js"></script>
</svelte:head>

<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

{@render children()}
