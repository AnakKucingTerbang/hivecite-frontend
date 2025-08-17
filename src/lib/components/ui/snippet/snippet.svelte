<script lang="ts">
	import { Copy, Trash2, Tag, Plus, X, Dot, Clock } from 'lucide-svelte';
    import * as Dialog from "$lib/components/ui/dialog"
    import { Input } from '$lib/components/ui/input';
    import { Button } from '$lib/components/ui/button';

    let { snippet, key, deleteSnippet } = $props();

    let isAddingTag = $state<boolean>(false)
    let tags = $state<string[]>([])
    let value = $state<string>("")
    let isFocusing = $state<boolean>(false)
    let isClickingOption = $state<boolean>(false)
    let openDialog = $state<boolean>(false)
    let query = $state<string>("")
    let availableTags = $state<string[]>([
        "Artificial Intelligence",
        "Machine Learning",
        "Deep Learning",
        "Natural Language Processing",
        "Computer Vision",
        "Reinforcement Learning",
        "Neural Networks",
        "Data Science",
        // "Big Data",
        // "Data Mining",
        // "Robotics",
        // "Cognitive Computing",
        // "Human-Computer Interaction",
        // "Algorithm Design",
        // "Computational Complexity",
        // "Graph Theory",
        // "Optimization",
        // "Quantum Computing",
        // "Cryptography",
        // "Cybersecurity",
        // "Privacy",
        // "Ethics in AI",
        // "Social Implications of Technology",
        // "Computational Linguistics",
        // "Bioinformatics",
        // "Genomics",
        // "Proteomics",
        // "Neuroscience",
        // "Cognitive Science",
        // "Theoretical Computer Science",
        // "Operating Systems",
        // "Computer Architecture"
    ]);
    let filteredTags = $derived<any[]>(
        availableTags.filter(tag => tag.toLowerCase().includes(query.toLocaleLowerCase()) && !tags.includes(tag))
    )
</script>

<Dialog.Root bind:open={openDialog}>
    <Dialog.Content class="p-0">
        <Dialog.Header class="border-b-1 border-gray-200 p-6">
            <Dialog.Title>
                <div class="flex gap-3 items-center ">
                    <div class="bg-blue-100 w-fit p-2 rounded-xl">
                        <Tag class="text-blue-600 w-5 h-5"/>
                    </div>
                    <h2 class="text-xl font-semibold text-gray-900">Add tag</h2>
                </div>
            </Dialog.Title>
            <Dialog.Description>
                <div class="bg-gray-200 border border-gray-300 text-sm text-gray-700 rounded-md p-2 mt-4">
                    Search existing tags in the search bar and select from the list, or type a new tag name and click "Add" to create it.
                </div>
            </Dialog.Description>
        </Dialog.Header>
        <div class="px-6 pb-6 space-y-4 border-b-1 border-gray-200">
            <div>
                <p class="block text-sm font-medium text-gray-700 mb-2">Tag</p>
                <Input
                    value={query}
                    placeholder="Search tag..."
                    oninput={(e) => {
                        const target = e.target as HTMLInputElement;
                        query = target.value
                    }}
                />
            </div>
            <div class="flex gap-1 flex-wrap border border-gray-200 rounded-md p-2 max-h-40 overflow-y-auto">
                {#each filteredTags as tag}
                    <button
                        onclick={() => {
                            query = tag
                        }}
                        class="flex items-center gap-1 px-2 py-1 rounded text-xs font-medium cursor-pointer transition-colors bg-gray-200 text-gray-700 hover:bg-gray-300"
                    >
                        {tag}
                    </button>
                {:else}
                    <p class="text-gray-400 w-full text-center text-sm">No existing tags found</p>
                {/each}
            </div>
        </div>
        <Dialog.Footer class="px-6 pb-6">
            <Button
                variant="outline"
                onclick={() => {
                    openDialog = false
                }}
            >
                Cancel
            </Button>
            <Button
                class="bg-blue-600 hover:bg-blue-700"
                onclick={() => {
                    openDialog = false
                    tags.push(query)
                    
                    const found = availableTags.findIndex(_tag => _tag === query)
                    if (found === -1) {
                        availableTags.push(query)
                    }

                    query = ""
                }}
            >
                Apply
            </Button>
        </Dialog.Footer>
    </Dialog.Content>
</Dialog.Root>
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
            <Copy size={16} class="cursor-pointer text-stone-500 hover:text-blue-600 transition-colors" onclick={() => { console.log("copy") }}/>
            <Trash2 size={16} class="cursor-pointer hover:text-red-500 transition-colors text-stone-500 transition-colors" onclick={() => { deleteSnippet(key) }}/>
        </div>
    </div>
    <div class="border-l-4 border-blue-500 rounded-sm bg-gray-200/40 p-3 mt-2">
        {snippet}
    </div>
    <div class="pt-3 flex flex-wrap gap-2 items-center">
        {#each tags as tag}
            <button
                class="flex items-center gap-1 px-2 py-1 rounded text-xs font-medium cursor-pointer transition-colors bg-gray-200 text-gray-700 hover:bg-gray-300"
            >
                {tag}
                <X
                    class="w-3 h-3 hover:bg-gray-400 rounded-sm hover:text-white"
                    onclick={(e) => {
                        const tagIndex = tags.findIndex(_tag => _tag === tag)
                        if (tagIndex !== -1) {
                            tags.splice(tagIndex, 1)
                        }
                    }}
                />
            </button>
        {/each}
        <button
            onclick={() => {
                openDialog = true
            }}
            class="inline-block px-2 py-1 rounded-sm text-xs font-medium cursor-pointer transition-colors border border-gray-200 text-gray-700 hover:bg-gray-300"
        >
            +
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

<!-- <div class="rounded-lg border-1 border-gray-200 bg-white cursor-pointer hover:shadow-md transition-shadow group">
    <div class="px-4 pt-4 mb-3">
        <div class="flex gap-2 items-center mb-3">
            <Highlighter class="text-gray-500 transition-colors text-md group-hover:text-yellow-500 {highlighted === highlight.id ? "text-yellow-500" : "text-gray-500"}"/>
            <div class="w-full">
                <div class="flex justify-between w-full items-center">
                    <p class="text-sm text-gray-800 leading-relaxed grow">{highlight.title}</p>
                    <CopyDropdown setCopied={setCopied} id={highlight.id}/>
                </div>
                <p class="text-xs text-gray-600 font-medium">{highlight.author.join(", ")}</p>
            </div>
        </div>
        <div class="border-l-3 border-gray-200 p-2 text-xs italic mb-3">
            {highlight.highlight}
        </div>
    </div>
    <div class="border-t border-gray-200 py-2 px-4 flex justify-between text-sm items-center">
        <div class="flex gap-2">
            {#each highlight.tags as tag, index}
                {#if index < 3}
                    <button
                        onclick={() => {
                            const index = filteredTags.findIndex(_tag => _tag === tag)
                            if (index === -1) {
                                filteredTags.push(tag)
                            } else {
                                filteredTags.splice(index, 1)
                            }
                        }}
                        class="flex items-center gap-1 px-2 py-1 rounded text-xs font-medium cursor-pointer transition-colors {filteredTags.includes(tag) ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}"
                    >
                        {tag}
                        <X
                            class="w-3 h-3 hover:bg-gray-400 rounded-sm hover:text-white"
                            onclick={(e) => {
                                e.stopPropagation()
                                const highlightIndex = highlights.findIndex(_highlight => _highlight.id === highlight.id)
                                if (highlightIndex !== -1) {
                                    const tagIndex = highlights[highlightIndex].tags.findIndex((_tag: string) => _tag === tag)
                                    highlights[highlightIndex].tags.splice(tagIndex, 1)
                                }

                                const index = filteredTags.findIndex(_tag => _tag === tag)
                                if (index !== -1) {
                                    filteredTags.splice(index, 1)
                                }
                            }}
                        />
                    </button>
                {/if}
            {/each}
            {#if highlight.tags.length > 3}
                <Sheet.Trigger>
                    <button
                        onclick={() => {
                            const found = highlights.findIndex(_highlight => _highlight.id === highlight.id)
                            if (found !== -1) {
                                selectedHighlightIndex = found
                            }
                        }}
                        class="flex items-center gap-1 px-2 py-1 rounded text-xs font-medium cursor-pointer transition-colors bg-gray-200 text-gray-700 hover:bg-gray-300"
                    >
                        +{highlight.tags.length - 3}
                    </button>
                </Sheet.Trigger>
            {/if}
            <button
                onclick={() => {
                    modalStates.update(prev => {
                        return { ...prev, addTag: { show: true, metadata: { id: highlight.id } } }
                    })
                }}
                class="inline-block px-2 py-1 rounded-sm text-xs font-medium cursor-pointer transition-colors border border-gray-200 text-gray-700 hover:bg-gray-300"
            >
                +
            </button>
        </div>
    </div>
</div> -->