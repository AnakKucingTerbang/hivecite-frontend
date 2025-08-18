<script lang="ts">
    /**
     * NOTICE:
     * 
     * You're correct about the difference in behavior between `bind:open` and just passing `resource`.
     *
     * **For `bind:open={openDialog}`:**
     * - This creates a two-way binding
     * - Changes to `open` in the child component will automatically update `openDialog` in the parent
     * - Changes to `openDialog` in the parent will update `open` in the child
     * 
     * **For `resource={highlights[selectedHighlightIndex!]}`:**
     * - This is a one-way prop passing
     * - If the child modifies properties of the `resource` object (like `resource.tags.push(query)`), these changes **will** be reflected in the parent because you're modifying the same object reference
     * - However, if the child reassigned `resource` to a completely new object, that wouldn't affect the parent

     * In your case, since the child is doing `resource.tags.push(query)`, this **will** change the parent's data because:
     * - `resource` points to the same object as `highlights[selectedHighlightIndex!]`
     * - You're mutating the `tags` array of that shared object
     * - The parent will see this change because it's the same object in memory

     * If you wanted to prevent the child from modifying the parent's data, you'd need to pass a copy of the object instead:

     * ```svelte
     * <AddTag 
     *   bind:open={openDialog}
     *   resource={structuredClone(highlights[selectedHighlightIndex!])}
     * />
     * ```
     * 
     * So to summarize: `bind:` creates explicit two-way binding for the variable itself, while regular props share object references (allowing mutation to be visible to the parent).
     * 
    */

	import { Tag } from 'lucide-svelte';
    import * as Dialog from "$lib/components/ui/dialog"
    import { Input } from '$lib/components/ui/input';
    import { Button } from '$lib/components/ui/button';

    let {
        open = $bindable(false),
        resource, // This can either be paper or annotation
    } = $props();

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
    let query = $state<string>("")
    let filteredTags = $derived<any[]>(
        availableTags.filter(tag => tag.toLowerCase().includes(query.toLocaleLowerCase()) && !resource.tags.includes(tag))
    )
</script>

<Dialog.Root bind:open>
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
                    open = false
                }}
            >
                Cancel
            </Button>
            <Button
                class="bg-blue-600 hover:bg-blue-700"
                onclick={() => {
                    open = false
                    resource.tags.push(query)
                    
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