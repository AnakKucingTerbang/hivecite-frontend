<script lang="ts">
	import { Search, X } from 'lucide-svelte';

    let {
        query,
        items,
        filteredItems,
        selectedItems,
        inputPlaceholder,
        setQuery,
        selectItem, 
        deleteItem
    } = $props();
</script>

<div>
    <div class="relative inline-block w-full">
        <div class="flex items-center border border-gray-300 rounded-md p-2 min-h-10 mb-1">
            <Search size={16} class="text-gray-400 mr-2" />
            <input
                type="text"
                value={query}
                oninput={e => {
                    const target = e.target as HTMLInputElement;
                    setQuery(target.value)
                }}
                class="outline-none w-full"
                placeholder={inputPlaceholder}
            />
        </div>
        {#if query && filteredItems?.length > 0}
            <div class="absolute hover:block bg-white rounded-md p-2 shadow-md w-full z-10 border border-gray-300">
                {#each filteredItems as item}
                    <button
                        onclick={() => {
                            selectItem(item)
                            setQuery("")
                        }}
                        class="w-full text-left px-3 py-2 hover:bg-gray-100 text-sm rounded-sm cursor-pointer"
                        >
                        {item}
                    </button>
                {/each}
            </div>
        {/if}
    </div>
    <div class="flex flex-wrap gap-1 flex-1">
        {#each selectedItems as selectedItem}
            <span class="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm flex items-center w-fit">
                {selectedItem}
                <button onclick={() => { deleteItem(selectedItem) }} class="ml-1 text-blue-600 hover:text-blue-800 cursor-pointer">
                    <X size={12} />
                </button>
            </span>
        {/each}
    </div>
</div>