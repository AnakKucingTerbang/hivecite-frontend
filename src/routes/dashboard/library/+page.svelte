<script lang="ts">
	import { FileText, Plus, ChevronRight, X, Trash } from 'lucide-svelte';
    import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
    import AddTag from '@/components/ui/modal/add-tag-2/AddTag.svelte';
    import TagListSheet from '@/components/ui/tag-list-sheet/TagListSheet.svelte';
    import DeleteResource from '@/components/ui/modal/delete-resource/DeleteResource.svelte';
    import AddPaper from '@/components/ui/modal/add-paper-2/AddPaper.svelte';

    let papers = $state<any[]>([
        {
            id: 1,
            title: "The Role of Quantum Computing in Cryptography",
            author: ["Reed, E.", "Jenkins, M."],
            tags: ["quantum physics", "computer science", "cryptography"],
            highlights: 15
        },
        {
            id: 2,
            title: "Neuroplasticity and Language Acquisition in Adults",
            author: ["Chen, J.", "Martinez, R.", "Singh, P."],
            tags: [],
            highlights: 22
        },
        {
            id: 3,
            title: "Sustainable Urban Planning for Megacities",
            author: ["O'Connell, S."],
            tags: ["urban planning", "sustainability", "architecture"],
            highlights: 8
        },
        {
            id: 4,
            title: "Analyzing Social Media Trends During Economic Crises",
            author: ["Volkov, A.", "Nguyen, L."],
            tags: ["sociology", "economics", "data analysis"],
            highlights: 30
        },
        {
            id: 5,
            title: "Advances in Gene Editing Technologies",
            author: ["Carter, B.", "Kim, H."],
            tags: [],
            highlights: 45
        },
        {
            id: 6,
            title: "The Impact of AI on Modern Art History",
            author: ["Sanchez, M."],
            tags: ["art history", "artificial intelligence", "digital art"],
            highlights: 12
        },
        {
            id: 7,
            title: "Climate Change Effects on Coral Reef Ecosystems",
            author: ["Wright, K.", "Lee, J.", "Thompson, R."],
            tags: ["marine biology", "climatology", "ecology", "art history"],
            highlights: 53
        },
        {
            id: 8,
            title: "Historical Perspectives on Public Health Policy",
            author: ["Adams, C.", "Miller, J."],
            tags: ["history", "public health", "policy"],
            highlights: 18
        },
        {
            id: 9,
            title: "Financial Modeling with Machine Learning",
            author: ["Patel, L."],
            tags: ["finance", "machine learning", "data science"],
            highlights: 27
        },
        {
            id: 10,
            title: "Optimizing Supply Chain Logistics",
            author: ["Lee, J.", "Evans, A."],
            tags: [],
            highlights: 9
        }
    ]);
    let open = $state<{
        deleteResourceAlert: boolean, 
        tagListSheet: boolean, 
        addTagDialog: boolean,
        addPaperDialog: boolean
    }>({
        deleteResourceAlert: false,
        tagListSheet: false,
        addTagDialog: false,
        addPaperDialog: false,
    })

    let selectedPaperIndex = $state<number|null>(null)
    let query = $state<string>("")
    let filteredTags = $state<string[]>([])
    let filteredPapers = $derived<any[]>(
        papers.filter(paper => {
            if (filteredTags.length > 0) {
                return (paper.title.toLowerCase().includes(query) || paper.author.join(", ").toLowerCase().includes(query)) && filteredTags.every(tag => paper.tags.includes(tag))
            } else {
                return paper.title.toLowerCase().includes(query) || paper.author.join(", ").toLowerCase().includes(query)
            }
        })
    )
</script>

<AddTag 
    bind:open={open.addTagDialog}
    resource={papers[selectedPaperIndex!]}
/>

<TagListSheet
    bind:open={open.tagListSheet}
    filteredTags={filteredTags}
    resource={papers[selectedPaperIndex!]}
/>

<DeleteResource
    bind:open={open.deleteResourceAlert}
    filteredTags={filteredTags}
    resource={papers[selectedPaperIndex!]}
    resources={papers}
    type="highlight"
/>

<AddPaper
    bind:open={open.addPaperDialog}
/>

<div class="flex h-screen w-full flex-col">
    <div class="flex items-center justify-between p-4">
        <div>
            <h1 class="text-xl font-bold">Library</h1>
            <p class="text-sm text-gray-400">Browse and manage all your uploaded papers with a complete view of every citation you've collected from each source</p>
        </div>
        <div class="flex gap-2 items-center">
            <Input 
                placeholder="Search paper"
                oninput={(e) => {
                    const target = e.target as HTMLInputElement;
                    query = target.value
                }}
            />
            <Button
                onclick={() => {
                    open.addPaperDialog = true
                }}
                class="bg-blue-600 hover:bg-blue-800"
            >
                <Plus />
                <p>Add paper</p>
            </Button>
        </div>
    </div>
    <div class="grow overflow-y-auto rounded-tl-md">
        <div class="min-h-full grow rounded-tl-md bg-gray-100 p-4">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {#each filteredPapers as paper}
                    <div class="rounded-lg border-1 border-gray-200 bg-white hover:shadow-md transition-shadow group">
                        <a href="/dashboard/research-project/id-goes-here/article">
                            <div class="px-4 pt-4 cursor-pointer">
                                <div class="flex gap-2 mb-3 items-center">
                                    <FileText class="text-gray-500 transition-colors text-md group-hover:text-blue-500"/>
                                    <p class="text-sm text-gray-800 leading-relaxed grow">{paper.title}</p>
                                    <div class="flex gap-1 text-xs items-center">
                                        <p>Highlight</p>
                                        <ChevronRight class="w-3 h-3 "/>
                                    </div>
                                </div>
                                <p class="text-xs text-gray-600 mb-3 font-medium">{paper.author.join(", ")}</p>
                            </div>
                        </a>
                        <div class="border-t border-gray-200 py-2 px-4 flex justify-between text-sm items-center">
                            <div class="flex gap-2">
                                {#each paper.tags as tag, index}
                                    {#if index < 3}
                                        <button
                                            onclick={(e) => {
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
                                                    const highlightIndex = papers.findIndex(_highlight => _highlight.id === paper.id)
                                                    if (highlightIndex !== -1) {
                                                        const tagIndex = papers[highlightIndex].tags.findIndex((_tag: string) => _tag === tag)
                                                        papers[highlightIndex].tags.splice(tagIndex, 1)
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
                                {#if paper.tags.length > 3}
                                    <button
                                        onclick={() => {
                                            const found = papers.findIndex((_paper: any) => _paper.id === paper.id)
                                            if (found !== -1) {
                                                selectedPaperIndex = found
                                                open.tagListSheet = true
                                            }
                                        }}
                                        class="flex items-center gap-1 px-2 py-1 rounded text-xs font-medium cursor-pointer transition-colors bg-gray-200 text-gray-700 hover:bg-gray-300"
                                    >
                                        +{paper.tags.length - 3}
                                    </button>
                                {/if}
                                <button
                                    onclick={() => {
                                        const found = papers.findIndex(_paper => _paper.id === paper.id)
                                        if (found !== -1) {
                                            selectedPaperIndex = found
                                            open.addTagDialog = true
                                        }
                                        
                                    }}
                                    class="inline-block px-2 py-1 rounded-sm text-xs font-medium cursor-pointer transition-colors border border-gray-200 text-gray-700 hover:bg-gray-300"
                                >
                                    +
                                </button>
                            </div>
                            <div class="flex gap-3">
                                <p class="text-xs text-gray-700">{paper.highlights} Highlights</p>
                                <Trash
                                    class="w-4 h-4 text-gray-500 hover:text-red-500 transition-colors cursor-pointer"
                                    onclick={() => {
                                        const found = papers.findIndex(_paper => _paper.id === paper.id)
                                        if (found !== -1) {
                                            selectedPaperIndex = found
                                            open.deleteResourceAlert = true
                                        }
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                {/each}
            </div>
        </div>
    </div>
</div>
