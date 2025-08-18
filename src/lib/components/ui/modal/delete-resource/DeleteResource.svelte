<script lang="ts">
    import * as AlertDialog from "$lib/components/ui/alert-dialog";

    let {
        open = $bindable(),
        filteredTags,
        resource,       // This can either be paper or annotation
        resources,      // This can either be papers or annotations
        type
    } = $props();
</script>

<AlertDialog.Root bind:open>
    <AlertDialog.Content>
        <AlertDialog.Header>
            <AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
            <AlertDialog.Description>
                <div>
                    This action cannot be undone. This will permanently delete the selected highlight
                    and remove the data from our servers.
                </div>
                {#if type === "highlight"}
                    <div class="mt-6">
                        <p class="text-xs pb-2">Preview</p>
                        <div class="border-l-3 border-gray-300 pl-3">
                            {resource?.highlight}
                        </div>
                    </div>
                {:else if type === "paper"}
                    <div class="mt-6 flex flex-col gap-3">
                        <div>
                            <p class="text-xs">Title</p>
                            {resource?.title}
                        </div>
                        <div>
                            <p class="text-xs">Authors</p>
                            {resource?.author.join(", ")}
                        </div>
                    </div>
                {/if}
            </AlertDialog.Description>
        </AlertDialog.Header>
        <AlertDialog.Footer>
            <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
            <AlertDialog.Action
                onclick={() => {
                    // todo: make api call here

                    resource.tags.forEach((tag: string) => {
                        const index = filteredTags.findIndex((_tag: string) => _tag === tag)
                        if (index !== -1) {
                            filteredTags.splice(index, 1)
                        }
                    })

                    const index = resources.findIndex((_resource: any) => _resource.id === resource.id)
                    if (index !== -1) {
                        resources.splice(index, 1)
                    }
                    
                    open = false

                }}
            >
                Continue
            </AlertDialog.Action>
        </AlertDialog.Footer>
    </AlertDialog.Content>
</AlertDialog.Root>