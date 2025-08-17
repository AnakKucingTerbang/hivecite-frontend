<script lang="ts">
	import { X, FileText, Highlighter, ChevronRight, ChevronLeft, Plus, Tag, Trash, MessageSquareText } from 'lucide-svelte';
    import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
	import { modalStates } from '@/states.svelte'
    import CopyDropdown from '@/components/ui/copy-dropdown/CopyDropdown.svelte';
    import * as Sheet from "$lib/components/ui/sheet";
    import * as AlertDialog from "$lib/components/ui/alert-dialog";
    import * as Dialog from "$lib/components/ui/dialog"

    let view = $state<"papers" | "highlights">("papers")

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
            tags: ["neuroscience", "linguistics", "psychology"]
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
            tags: ["genetics", "biotechnology", "molecular biology"]
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
            tags: ["history", "public health", "ecology"]
        },
        {
            id: 9,
            title: "Financial Modeling with Machine Learning",
            author: ["Patel, L."],
            highlight: "We propose a novel machine learning model that outperforms traditional econometric models in forecasting stock market volatility with a 95% accuracy rate.",
            tags: ["finance", "machine learning", "data science", "finance", "machine learning", "data science"]
        },
        {
            id: 10,
            title: "Optimizing Supply Chain Logistics",
            author: ["Lee, J.", "Evans, A."],
            highlight: "A case study of a multinational corporation demonstrates that integrating real-time GPS data with predictive analytics reduced delivery delays by 25%.",
            tags: ["logistics", "business", "operations research", "finance"]
        }
    ]);

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
            tags: ["urban planning", "sustainability", "architecture", "finance"],
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
            tags: ["marine biology", "climatology", "ecology"],
            highlights: 53
        },
        {
            id: 8,
            title: "Historical Perspectives on Public Health Policy",
            author: ["Adams, C.", "Miller, J."],
            tags: ["history", "public health", "policy", "history", "public health", "policy"],
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
    let openAlert = $state<boolean>(false)
    let openSheet = $state<boolean>(false)
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
    let highlighted = $state<number|null>(null)
    let timeout: NodeJS.Timeout | null = null
    let selectedHighlightIndex = $state<number | null>(null)
    let selectedPaperIndex = $state<number | null>(null)
    let openDialog = $state<boolean>(false)
    let dialogQuery = $state<string>("")
    let availableTags = $state<string[]>([
        "Artificial Intelligence",
        "Machine Learning",
        "Deep Learning",
        "Natural Language Processing",
        "Computer Vision",
        "Reinforcement Learning",
        "Neural Networks",
        "Data Science",
    ]);
    let dialogFilteredTags = $derived<any[]>(
        availableTags.filter(tag => {
            if (view === "papers") {
                return tag.toLowerCase().includes(dialogQuery.toLocaleLowerCase()) && !papers[selectedPaperIndex!].tags.includes(tag)
            } else if (view === "highlights") {
                return tag.toLowerCase().includes(dialogQuery.toLocaleLowerCase()) && !highlights[selectedHighlightIndex!].tags.includes(tag)
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
                    value={dialogQuery}
                    placeholder="Search tag..."
                    oninput={(e) => {
                        const target = e.target as HTMLInputElement;
                        dialogQuery = target.value
                    }}
                />
            </div>
            <div class="flex gap-1 flex-wrap border border-gray-200 rounded-md p-2 max-h-40 overflow-y-auto">
                {#each dialogFilteredTags as tag}
                    <button
                        onclick={() => {
                            dialogQuery = tag
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

                    if (view === "papers") {
                        papers[selectedPaperIndex!].tags.push(dialogQuery)
                        
                        const found = availableTags.findIndex(_tag => _tag === dialogQuery)
                        if (found === -1) {
                            availableTags.push(dialogQuery)
                        }
                    } else if (view === "highlights") {
                        highlights[selectedHighlightIndex!].tags.push(dialogQuery)
                        
                        const found = availableTags.findIndex(_tag => _tag === dialogQuery)
                        if (found === -1) {
                            availableTags.push(dialogQuery)
                        }
                    }

                    dialogQuery = ""
                }}
            >
                Apply
            </Button>
        </Dialog.Footer>
    </Dialog.Content>
</Dialog.Root>

<Sheet.Root bind:open={openSheet}>
    <Sheet.Content>
        <Sheet.Header>
            <Sheet.Title class="flex gap-2">
                <div class="bg-blue-200 rounded-md text-blue-600 flex items-center justify-center w-6">
                    <Tag class="w-4 h-4"/>
                </div>
                <div>Tag list</div>
            </Sheet.Title>
            <Sheet.Description>
                Click any tag to filter resources by that tag type.
            </Sheet.Description>
        </Sheet.Header>
         <div class="m-5 flex flex-wrap gap-2">
            {#if view === "papers"}
                {#each papers[selectedHighlightIndex!].tags as tag}
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
                                const highlightIndex = papers.findIndex(_highlight => _highlight.id === papers[selectedHighlightIndex!].id)
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
                {/each}
            {:else if view === "highlights"}
                {#each highlights[selectedHighlightIndex!].tags as tag}
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
                                const highlightIndex = highlights.findIndex(_highlight => _highlight.id === highlights[selectedHighlightIndex!].id)
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
                {/each}
            {/if}
        </div>
    </Sheet.Content>
    <AlertDialog.Root bind:open={openAlert}>
        <AlertDialog.Content>
            <AlertDialog.Header>
                <AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
                <AlertDialog.Description>
                    <div>
                        This action cannot be undone. This will permanently delete the selected highlight
                        and remove the data from our servers.
                    </div>
                    {#if view === "highlights"}
                        <div class="mt-6">
                            <p class="text-xs pb-2">Preview</p>
                            <div class="border-l-3 border-gray-300 pl-3">
                                {highlights[selectedHighlightIndex!]?.highlight}
                            </div>
                        </div>
                    {:else}
                        <div class="mt-6 flex flex-col gap-3">
                            <div>
                                <p class="text-xs">Title</p>
                                {papers[selectedPaperIndex!]?.title}
                            </div>
                            <div>
                                <p class="text-xs">Authors</p>
                                {papers[selectedPaperIndex!]?.author.join(", ")}
                            </div>
                        </div>
                    {/if}
                </AlertDialog.Description>
            </AlertDialog.Header>
            <AlertDialog.Footer>
                <AlertDialog.Cancel
                     onclick={() => {
                        selectedHighlightIndex = null
                    }}
                >
                    Cancel
                </AlertDialog.Cancel>
                <AlertDialog.Action
                    onclick={() => {
                        if (view === "highlights") {
                            highlights[selectedHighlightIndex!].tags.forEach(tag => {
                                const index = filteredTags.findIndex(_tag => _tag === tag)
                                if (index !== -1) {
                                    filteredTags.splice(index, 1)
                                }
                            })
                            highlights.splice(selectedHighlightIndex!, 1)
                            selectedHighlightIndex = null
                        } else if (view === "papers") {
                            papers[selectedPaperIndex!].tags.forEach((tag: string) => {
                                const index = filteredTags.findIndex(_tag => _tag === tag)
                                if (index !== -1) {
                                    filteredTags.splice(index, 1)
                                }
                            })
                            papers.splice(selectedPaperIndex!, 1)
                            selectedPaperIndex = null
                        }

                        openAlert = false
                    }}
                >
                    Continue
                </AlertDialog.Action>
            </AlertDialog.Footer>
        </AlertDialog.Content>
        <div class="flex h-screen w-full flex-col">
            <div class="grid grid-cols-12 p-4">
                <div class="flex gap-2 items-center col-start-1 col-end-3">
                    <a
                        href="/dashboard/research-project"
                        class="bg-blue-100 rounded-sm px-1 cursor-pointer"
                    >
                        <ChevronLeft class="w-4 text-blue-600" />
                    </a>
                    <h1 class="text-xl font-bold">Name of project</h1>
                </div>
                <div class="flex gap-2 col-start-4 col-end-9 place-self-center">
                    <Button 
                        class="border-b font-normal rounded-none py-2 px-3 cursor-pointer hover:bg-white hover:text-blue-600 hover:border-blue-600 {view === 'papers' ? 'border-blue-600 bg-white text-blue-600' : 'border-gray-200 bg-white text-black'}"
                        onclick={() => {
                            view = "papers"
                            filteredTags = []
                        }}
                    >
                        Papers
                    </Button>
                    <Button 
                        class="border-b border-gray-200 bg-white text-black font-normal rounded-none py-2 px-3 cursor-pointer hover:bg-white hover:text-blue-600 hover:border-blue-600 {view === 'highlights' ? 'border-blue-600 bg-white text-blue-600' : 'border-gray-200 bg-white text-black'}"
                        onclick={() => { 
                            view = "highlights"
                            filteredTags = []
                        }}
                    >
                        Highlights
                    </Button>
                </div>
                <div class="flex gap-2 col-start-11 col-end-13 place-self-end w-full">
                    <Input 
                        placeholder="Search {view}" 
                        class="w-full"
                        oninput={(e) => {
                            const target = e.target as HTMLInputElement;
                            query = target.value
                        }}
                    />
                    {#if view === "papers"}
                        <Button
                            class="bg-blue-600"
                            onclick={() => {
                                modalStates.update(prev => {
                                    return { ...prev, addPaper: { show: true } }
                                })
                            }}
                        >
                            <Plus />
                            <p>Add paper</p>
                        </Button>
                    {/if}
                </div>
            </div>
            <div class="grow overflow-y-auto rounded-tl-md">
                <div class="min-h-full grow rounded-tl-md bg-gray-100 p-4">
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {#if view === "papers"}
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
                                                            selectedHighlightIndex = found
                                                            openSheet = true
                                                        }
                                                    }}
                                                    class="flex items-center gap-1 px-2 py-1 rounded text-xs font-medium cursor-pointer transition-colors bg-gray-200 text-gray-700 hover:bg-gray-300"
                                                >
                                                    +{paper.tags.length - 3}
                                                </button>
                                            {/if}
                                            <button
                                                onclick={() => {
                                                    // modalStates.update(prev => {
                                                    //     return { ...prev, addTag: { show: true, metadata: { id: paper.id } } }
                                                    // })
                                                    const found = papers.findIndex((_paper: any) => _paper.id === paper.id)
                                                    if (found !== -1) {
                                                        selectedPaperIndex = found
                                                        openDialog = true
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
                                                        openAlert = true
                                                    }
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            {/each}
                        {:else}
                            {#each filteredHighlights as highlight}
                                <div class="rounded-lg border-1 border-gray-200 bg-white cursor-pointer hover:shadow-md transition-shadow group">
                                    <div class="px-4 pt-4 mb-3">
                                        <div class="flex gap-2 items-center mb-3">
                                            <Highlighter class="transition-colors text-md group-hover:text-yellow-500 {highlighted === highlight.id ? "text-yellow-500" : "text-gray-500"}"/>
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
                                                                openSheet = true
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
                                                    // modalStates.update(prev => {
                                                    //     return { ...prev, addTag: { show: true, metadata: { id: highlight.id } } }
                                                    // })
                                                    const found = highlights.findIndex(_highlight => _highlight.id === highlight.id)
                                                    if (found !== -1) {
                                                        selectedHighlightIndex = found
                                                        openDialog = true
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
                                                            openAlert = true
                                                        }
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            {/each}
                        {/if}
                    </div>
                </div>
            </div>
        </div>
    </AlertDialog.Root>
</Sheet.Root>