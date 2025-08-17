<script lang="ts">
	import { X, FileText } from 'lucide-svelte';
	import { modalStates } from '@/states.svelte'
    import SearchableMultiSelect from '../../searchable-multi-select/SearchableMultiSelect.svelte';
	import * as RadioGroup from '$lib/components/ui/radio-group';
    import { Label } from "$lib/components/ui/label";
    import { Input } from "$lib/components/ui/input";

    let tagStates = $state<any>({
        query: "",
        items: ['1', '2', '3', '4', '5'],
        filteredItems: [],
        selectedItems: [],
        inputPlaceholder: "Search tags...",
        setQuery: (_value: string) => {
            tagStates.query = _value
            tagStates.filteredItems = tagStates.items.filter((item: string) => item.includes(_value) && !tagStates.selectedItems.includes(item))
        },
        selectItem: (_value: string) => {
            tagStates.selectedItems.push(_value)
        }, 
        deleteItem: (_value: string) => {
            tagStates.selectedItems = tagStates.selectedItems.filter((item: string) => item !== _value)
        }
    })

    let authorStates = $state<any>({
        query: "",
        items: ['1', '2', '3', '4', '5'],
        filteredItems: [],
        selectedItems: [],
        inputPlaceholder: "Search author...",
        setQuery: (_value: string) => {
            authorStates.query = _value
            authorStates.filteredItems = authorStates.items.filter((item: string) => item.includes(_value) && !authorStates.selectedItems.includes(item))
        },
        selectItem: (_value: string) => {
            authorStates.selectedItems.push(_value)
        }, 
        deleteItem: (_value: string) => {
            authorStates.selectedItems = authorStates.selectedItems.filter((item: string) => item !== _value)
        }
    })

    let publicationPeriodType = $state<string>("anyYear")
</script>

<div class="absolute h-screen w-screen z-10 bg-gray-700/40 flex items-center justify-center">
    <div class="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
        <div class="flex items-center justify-between p-6 border-b">
        <div class="flex gap-3 items-center">
            <div class="bg-blue-100 w-fit p-2 rounded-xl">
                <FileText class="text-blue-600 w-5 h-5"/>
            </div>
            <h2 class="text-xl font-semibold text-gray-900">Filter Paper</h2>
        </div>
        <button 
            onclick={() => {
                modalStates.update(prev => {
                    return { ...prev, filterPaper: { show: false } }
                })
            }} 
            class="text-gray-400 hover:text-gray-600 cursor-pointer">
            <X size={20} />
        </button>
        </div>
        
        <div class="p-6 space-y-4">
            <div>
                <p class="block text-sm font-medium text-gray-700 mb-2">Tags</p>
                <SearchableMultiSelect 
                    query={tagStates.query}
                    items={tagStates.items}
                    filteredItems={tagStates.filteredItems}
                    selectedItems={tagStates.selectedItems}
                    inputPlaceholder={tagStates.inputPlaceholder}
                    setQuery={tagStates.setQuery}
                    selectItem={tagStates.selectItem}
                    deleteItem={tagStates.deleteItem}
                />
            </div>
            <div>
                <p class="block text-sm font-medium text-gray-700 mb-2">Authors</p>
                <SearchableMultiSelect 
                    query={authorStates.query}
                    items={authorStates.items}
                    filteredItems={authorStates.filteredItems}
                    selectedItems={authorStates.selectedItems}
                    inputPlaceholder={authorStates.inputPlaceholder}
                    setQuery={authorStates.setQuery}
                    selectItem={authorStates.selectItem}
                    deleteItem={authorStates.deleteItem}
                />
            </div>
            <div>
                <p class="block text-sm font-medium text-gray-700 mb-2">Publication Period</p>
                <RadioGroup.Root
                    value={publicationPeriodType}
                    class="text-gray-700 flex flex-wrap mb-3"
                >
                    <div class="flex items-center space-x-2">
                        <RadioGroup.Item value="anyYear" id="r1" onclick={() => publicationPeriodType = "anyYear"}/>
                        <Label for="r1">Any year</Label>
                    </div>
                    <div class="flex items-center space-x-2">
                        <RadioGroup.Item value="specificYear" id="r2" onclick={() => publicationPeriodType = "specificYear"}/>
                        <Label for="r2">Specific year</Label>
                    </div>
                    <div class="flex items-center space-x-2">
                        <RadioGroup.Item value="yearRange" id="r3" onclick={() => publicationPeriodType = "yearRange"}/>
                        <Label for="r3">Year range</Label>
                    </div>
                    <div class="flex items-center space-x-2">
                        <RadioGroup.Item value="publishedAfter" id="r4" onclick={() => publicationPeriodType = "publishedAfter"}/>
                        <Label for="r4">Published after</Label>
                    </div>
                    <div class="flex items-center space-x-2">
                        <RadioGroup.Item value="publishedBefore" id="r5" onclick={() => publicationPeriodType = "publishedBefore"}/>
                        <Label for="r5">Published before</Label>
                    </div>
                </RadioGroup.Root>
                {#if publicationPeriodType !== "anyYear"}
                    <div>
                        {#if publicationPeriodType === "yearRange"}
                            <div class="flex gap-2">
                                <Input placeholder="From" />
                                <Input placeholder="To" />
                            </div>
                        {:else}
                            <Input placeholder="Enter year (ex. 2023)" />
                        {/if}
                    </div>
                {/if}
            </div>
        </div>

        <div class="flex justify-end gap-3 p-6 border-t bg-gray-50 rounded-b-lg">
        <button 
            onclick={() => {
                // todo: add validation and store value
                modalStates.update(prev => {
                    return { ...prev, filterPaper: { show: false } }
                })
            }}
            class="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-100 cursor-pointer"
        >
            Cancel
        </button>
        <button
            onclick={() => {
                modalStates.update(prev => {
                    return { ...prev, filterPaper: { show: false } }
                })
            }}
            class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 cursor-pointer"
        >
            Apply
        </button>
        </div>
    </div>
</div>