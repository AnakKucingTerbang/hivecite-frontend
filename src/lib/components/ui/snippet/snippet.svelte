<script lang="ts">
	import { Copy, Trash2, Tag, Plus, X, Dot, Clock } from 'lucide-svelte';

    let { snippet, key, deleteSnippet } = $props();

    let isAddingTag = $state<boolean>(false)
    let tags = $state<string[]>([])
    let value = $state<string>("")
    let isFocusing = $state<boolean>(false)
    let isClickingOption = $state<boolean>(false)

</script>

<div class="border border-gray-300/40 rounded-md p-3 mb-3 bg-white">
    <div class="flex justify-between items-center">
        <div class="flex items-center text-stone-500">
            <p class="text-xs text-stone-500">Page 23</p>
            <Dot class="text-stone-500"/>
            <div class="flex items-center text-xs gap-1">
                <Clock size={12}/>
                <p>1W ago</p>
            </div>
        </div>
        <div class="flex gap-3">
            <Copy size={16} class="cursor-pointer text-stone-500" onclick={() => { console.log("copy") }}/>
            <Trash2 size={16} class="cursor-pointer hover:text-red-500 transition-colors text-stone-500" onclick={() => { deleteSnippet(key) }}/>
        </div>
    </div>
    <div class="border-l-4 border-blue-500 rounded-sm bg-gray-200/40 p-3 mt-2">
        {snippet}
    </div>
    <div class="pt-3 flex flex-wrap gap-2 items-center">
        {#each tags as tag, index}
        <div class="rounded-full bg-blue-100 text-xs px-2 py-1 w-fit flex gap-1 items-center text-blue-700">
            <Tag size={12}/>
            <p>{tag}</p>
            <X size={12} class="cursor-pointer" onclick={() => { tags.splice(index, 1) }}/>
        </div>
        {/each}
        <button class="rounded-full bg-gray-200 text-xs px-2 py-1 w-fit flex gap-1 items-center cursor-pointer {isAddingTag ? 'hidden' : ''}" onclick={() => { isAddingTag = true }}>
            <Plus size={12}/>
            <p>Add Tag</p>
        </button>
        <div class="flex items-center gap-1 {isAddingTag ? '' : 'hidden'}">
            <div class="relative">
                <input
                    class="rounded-full border border-gray-300 text-xs px-2 h-6 m-0 placeholder:text-gray-300" 
                    onfocusin={() => isFocusing = true} 
                    onfocusout={() => {
                        setTimeout(() => {
                            // Only hide if not clicked on a dropdown button
                            if (!isClickingOption) {
                                isFocusing = false;
                            }
                            isClickingOption = false;
                        }, 100);
                    }} 
                    bind:value={value} 
                    placeholder="New tags..."
                >
                <div class="absolute w-full bg-white border border-gray-300/40 mt-1 rounded-md text-xs {isFocusing ? '' : 'hidden'}">
                    <button
                        class="hover:bg-gray-200 py-1 px-2 cursor-pointer rounded-t-md w-full text-left"
                        onclick={(e) => {
                            e.stopPropagation()
                            isClickingOption = true
                            isFocusing = false
                            tags.push("Population")
                            isAddingTag = false
                        }}
                    >
                        Population
                    </button>
                    <button 
                        class="hover:bg-gray-200 py-1 px-2 cursor-pointer w-full text-left" 
                        onclick={(e) => {
                            e.stopPropagation()
                            tags.push("Statistic")
                            isClickingOption = true
                            isFocusing = false
                            isAddingTag = false
                        }}
                    >
                        Statistic
                    </button>
                    <button 
                        class="hover:bg-gray-200 py-1 px-2 cursor-pointer rounded-b-md w-full text-left" 
                        onclick={(e) => {
                            e.stopPropagation()
                            tags.push("Other")
                            isClickingOption = true
                            isFocusing = false
                            isAddingTag = false
                        }}
                    >
                        Other
                    </button>
                </div>
            </div>
            <button class="rounded-full bg-blue-600 text-white px-2 text-sm h-6 cursor-pointer text-xs" onclick={() => {
                if (value === "") return
                tags.push(value)
                value = ""
                isAddingTag = false
            }}>
                Add
            </button>
            <button 
                class="rounded-full bg-gray-200 text-black px-2 text-sm h-6 cursor-pointer text-xs" 
                onclick={() => { 
                    isAddingTag = false
                    isFocusing = false
                }}
            >
                Cancel
            </button>
        </div>
    </div>
</div>