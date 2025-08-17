<script lang="ts">
	import { X, Tag } from 'lucide-svelte';
	import { modalStates } from '@/states.svelte'
    import { Input } from '$lib/components/ui/input';

    let query = $state<string>("")
    let tags = $state<string[]>([
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
        tags.filter(tag => tag.toLowerCase().includes(query.toLocaleLowerCase()))
    )

</script>

<div class="absolute h-screen w-screen z-10 bg-gray-700/40 flex items-center justify-center">
    <div class="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
        <div class="flex items-center justify-between p-6 border-b">
            <div class="flex gap-3 items-center">
                <div class="bg-blue-100 w-fit p-2 rounded-xl">
                    <Tag class="text-blue-600 w-5 h-5"/>
                </div>
                <h2 class="text-xl font-semibold text-gray-900">Add tag</h2>
            </div>
            <button 
                onclick={() => {
                    modalStates.update(prev => {
                        return { ...prev, addTag: { show: false, metadata: { id: null } } }
                    })
                }} 
                class="text-gray-400 hover:text-gray-600 cursor-pointer">
                <X size={20} />
            </button>
        </div>
        
        <div class="p-6 space-y-4">
            <div class="bg-gray-200 border border-gray-300 text-sm text-gray-700 rounded-md p-2">
                Search existing tags in the search bar and select from the list, or type a new tag name and click "Add" to create it.
            </div>
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

        <div class="flex justify-end gap-3 p-6 border-t bg-gray-50 rounded-b-lg">
        <button 
            onclick={() => {
                modalStates.update(prev => {
                    return { ...prev, addTag: { show: false, metadata: { id: null } } }
                })
            }}
            class="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-100 cursor-pointer"
        >
            Cancel
        </button>
        <button
            onclick={() => {
                if (tags.filter(tag => tag.toLowerCase().includes(query.toLocaleLowerCase())).length === 0) {
                    console.log(`Adding new tag "${query}" to list and resource with id: ${$modalStates.addTag.metadata.id}`)
                } else {
                    console.log(`Adding existing tag "${query}" to resource with id: ${$modalStates.addTag.metadata.id}`)
                }

                modalStates.update(prev => {
                    return { ...prev, addTag: { show: false, metadata: { id: null } } }
                })
            }}
            class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 cursor-pointer"
        >
            Add
        </button>
        </div>
    </div>
</div>