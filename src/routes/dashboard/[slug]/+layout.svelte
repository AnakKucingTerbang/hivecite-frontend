<script lang="ts">
    import { Button } from '$lib/components/ui/button'
    import { Plus } from "lucide-svelte";

    let { children, data } = $props();
</script>

<div class="flex flex-col w-full h-full">
    <div class="p-4 flex justify-between items-center">
        <h1 class="text-xl font-bold">{data.slug}</h1>
    </div>
    <div class="grow overflow-y-auto rounded-tl-md">
        <div class="bg-gray-100 rounded-tl-md grow p-4 min-h-full">
            {@render children()}
        </div>
    </div>
</div>