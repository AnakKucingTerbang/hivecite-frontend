<script lang="ts">
	import { Highlighter, X, Trash, MessageSquareText } from 'lucide-svelte';
    import { Input } from '$lib/components/ui/input';
    import CopyDropdown from '@/components/ui/copy-dropdown/CopyDropdown.svelte';
    import AddTag from '@/components/ui/modal/add-tag-2/AddTag.svelte';
    import TagListSheet from '@/components/ui/tag-list-sheet/TagListSheet.svelte';
    import DeleteResource from '@/components/ui/modal/delete-resource/DeleteResource.svelte';

    let highlights = $state<any[]>([
        {
            id: 1,
            title: "The Role of Quantum Computing in Cryptography",
            author: ["Reed, E.", "Jenkins, M."],
            highlight: "A new algorithm leveraging quantum superposition could render current public-key cryptosystems obsolete, opening a new frontier in secure communication.",
            tags: []
        },
        {
            id: 2,
            title: "Neuroplasticity and Language Acquisition in Adults",
            author: ["Chen, J.", "Martinez, R.", "Singh, P."],
            highlight: "This study provides compelling evidence that targeted cognitive exercises can significantly enhance the brain's capacity for second-language acquisition, challenging the critical period hypothesis.",
            tags: ["neuroscience", "linguistics", "psychology", "neuroscience", "linguistics", "psychology", "neuroscience", "linguistics", "psychology"]
        },
        {
            id: 3,
            title: "Sustainable Urban Planning for Megacities",
            author: ["O'Connell, S."],
            highlight: "Implementing smart infrastructure and green corridors has been shown to reduce urban heat island effects by up to 10°C, drastically improving quality of life.",
            tags: ["urban planning", "sustainability", "architecture"]
        },
        {
            id: 4,
            title: "Analyzing Social Media Trends During Economic Crises",
            author: ["Volkov, A.", "Nguyen, L."],
            highlight: "Our model accurately predicts shifts in consumer confidence by analyzing sentiment analysis from Twitter data, offering a real-time indicator of market stability.",
            tags: []
        },
        {
            id: 5,
            title: "Advances in Gene Editing Technologies",
            author: ["Carter, B.", "Kim, H."],
            highlight: "CRISPR-Cas9 has shown unprecedented precision in correcting a specific genetic mutation associated with a rare neurodegenerative disorder in in-vitro trials.",
            tags: ["genetics", "biotechnology", "molecular biology", "neuroscience"]
        },
        {
            id: 6,
            title: "The Impact of AI on Modern Art History",
            author: ["Sanchez, M."],
            highlight: "The generative capabilities of AI are not just tools for creation but are also forcing art historians to redefine concepts of authorship, originality, and the creative process itself.",
            tags: ["art history", "artificial intelligence", "digital art"]
        },
        {
            id: 7,
            title: "Climate Change Effects on Coral Reef Ecosystems",
            author: ["Wright, K.", "Lee, J.", "Thompson, R."],
            highlight: "Rising ocean temperatures and acidification are causing irreversible damage to coral reefs, with some species facing extinction within the next century without intervention.",
            tags: ["marine biology", "climatology", "ecology"]
        },
        {
            id: 8,
            title: "Historical Perspectives on Public Health Policy",
            author: ["Adams, C.", "Miller, J."],
            highlight: "Lessons from the 1918 influenza pandemic highlight the critical role of coordinated public health messaging and swift, decisive policy implementation.",
            tags: ["history", "public health", "policy"]
        },
        {
            id: 9,
            title: "Financial Modeling with Machine Learning",
            author: ["Patel, L."],
            highlight: "We propose a novel machine learning model that outperforms traditional econometric models in forecasting stock market volatility with a 95% accuracy rate.",
            tags: ["finance", "machine learning", "data science"]
        },
        {
            id: 10,
            title: "Optimizing Supply Chain Logistics",
            author: ["Lee, J.", "Evans, A."],
            highlight: "A case study of a multinational corporation demonstrates that integrating real-time GPS data with predictive analytics reduced delivery delays by 25%.",
            tags: ["logistics", "business", "operations research"]
        }
    ]);
    let open = $state<{
        deleteResourceAlert: boolean, 
        tagListSheet: boolean, 
        addTagDialog: boolean
    }>({
        deleteResourceAlert: false,
        tagListSheet: false,
        addTagDialog: false,
    })
    
    let selectedHighlightIndex = $state<number | null>(null)
    let highlighted = $state<number|null>(null)
    let filteredTags = $state<string[]>([])
    let timeout: NodeJS.Timeout | null = null
    let query = $state<string>("")
    let filteredHighlights = $derived<any[]>(
        highlights.filter(highlight => {
            if (filteredTags.length > 0) {
                return (
                    (
                        highlight.title.toLowerCase().includes(query) || 
                        highlight.author.join(", ").toLowerCase().includes(query) || 
                        highlight.highlight.toLowerCase().includes(query)
                    ) && filteredTags.every(tag => highlight.tags.includes(tag))
                )
            } else {
                return (
                    (
                        highlight.title.toLowerCase().includes(query) || 
                        highlight.author.join(", ").toLowerCase().includes(query) || 
                        highlight.highlight.toLowerCase().includes(query)
                    )
                )
            }
        })
    )

    const setCopied = (id: number) => {
        highlighted = id

        if (timeout !== null) {
            clearTimeout(timeout)
            timeout = null
        }

        timeout = setTimeout(() => {
            highlighted = null
        }, 15000)
    }
</script>

<AddTag 
    bind:open={open.addTagDialog}
    resource={highlights[selectedHighlightIndex!]}
/>

<TagListSheet
    bind:open={open.tagListSheet}
    filteredTags={filteredTags}
    resource={highlights[selectedHighlightIndex!]}
/>

<DeleteResource
    bind:open={open.deleteResourceAlert}
    filteredTags={filteredTags}
    resource={highlights[selectedHighlightIndex!]}
    resources={highlights}
    type="highlight"
/>

<div class="flex h-screen w-full flex-col">
    <div class="flex items-center justify-between p-4">
        <div>
            <h1 class="text-xl font-bold">Annotations</h1>
            <p class="text-sm text-gray-400">Access all your highlighted quotes and citations from across different projects and papers in one centralized location</p>
        </div>
        <div class="flex gap-2 items-center">
            <Input 
                placeholder="Search annotation"
                oninput={(e) => {
                    const target = e.target as HTMLInputElement;
                    query = target.value
                }}
            />
        </div>
    </div>
    <div class="grow overflow-y-auto rounded-tl-md">
        <div class="min-h-full grow rounded-tl-md bg-gray-100 p-4">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {#each filteredHighlights as highlight}
                    <div class="rounded-lg border-1 border-gray-200 bg-white hover:shadow-md transition-shadow group">
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
                                    <button
                                        onclick={() => {
                                            const found = highlights.findIndex(_highlight => _highlight.id === highlight.id)
                                            if (found !== -1) {
                                                selectedHighlightIndex = found
                                                open.tagListSheet = true
                                            }
                                        }}
                                        class="flex items-center gap-1 px-2 py-1 rounded text-xs font-medium cursor-pointer transition-colors bg-gray-200 text-gray-700 hover:bg-gray-300"
                                    >
                                        +{highlight.tags.length - 3}
                                    </button>
                                {/if}
                                <button
                                    onclick={() => {
                                        const found = highlights.findIndex(_highlight => _highlight.id === highlight.id)
                                        if (found !== -1) {
                                            selectedHighlightIndex = found
                                            open.addTagDialog = true
                                        }
                                    }}
                                    class="inline-block px-2 py-1 rounded-sm text-xs font-medium cursor-pointer transition-colors border border-gray-200 text-gray-700 hover:bg-gray-300"
                                >
                                    +
                                </button>
                            </div>
                            <div class="flex gap-3">
                                <div class="flex gap-3 text-xs text-gray-700 hover:text-blue-600 items-center">
                                    <MessageSquareText class="w-4 h-4 text-gray-500 hover:text-green-500 transition-colors cursor-pointer"/>
                                    <Trash
                                        class="w-4 h-4 text-gray-500 hover:text-red-500 transition-colors cursor-pointer"
                                        onclick={() => {
                                            const found = highlights.findIndex(_highlight => _highlight.id === highlight.id)
                                            if (found !== -1) {
                                                selectedHighlightIndex = found
                                                open.deleteResourceAlert = true
                                            }
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                {/each}
            </div>
        </div>
    </div>
</div>