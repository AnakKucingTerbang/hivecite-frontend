<script lang="ts">
	import { Tag, X } from 'lucide-svelte';
    import * as Sheet from "$lib/components/ui/sheet";

    let {
        open = $bindable(),
        filteredTags,
        resource, // This can either be paper or annotation
    } = $props();
</script>

<Sheet.Root bind:open>
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
            {#each resource.tags as tag}
                <button
                    onclick={() => {
                        const index = filteredTags.findIndex((_tag: string) => _tag === tag)
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

                            const tagIndex = resource.tags.findIndex((_tag: string) => _tag === tag)
                            if (tagIndex !== -1) {
                                resource.tags.splice(tagIndex, 1)
                            }
                            
                            const index = filteredTags.findIndex((_tag: string) => _tag === tag)
                            if (index !== -1) {
                                filteredTags.splice(index, 1)
                            }
                        }}
                    />
                </button>
            {/each}
        </div>
    </Sheet.Content>
</Sheet.Root>