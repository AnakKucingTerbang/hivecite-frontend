<script lang="ts">
    import { Folder, Plus } from "lucide-svelte";
    import { Button } from "$lib/components/ui/button"
    import { Input } from "$lib/components/ui/input"
    import { createActiveResearch, createResearchList } from "@/states.svelte";
	import { tick } from "svelte";

    const activeResearch = createActiveResearch()
    const researchList = createResearchList()
    
    let props = $props();
    let isAddNewResearch: boolean = $state(false)
    let newResearchName: string = $state("")
    let researchNameInputComponent: HTMLInputElement | null = $state(null)

    researchList.init(props.research)
</script>

<div class="min-w-64 max-w-64 bg-white flex flex-col">
    <div class="p-4">
        <h1 class="text-xl font-bold text-blue-600">HiveCite</h1>
    </div>

    <div class="p-4">
        <Button
            class="w-full"
            variant="theme"
            on:click={async () => {
                isAddNewResearch = true
                await tick()
                if (researchNameInputComponent) {
                    researchNameInputComponent.focus()
                }
            }}
        >
            <Plus />
            <span>New Research</span>
        </Button>
    </div>

    <div class="px-4 py-2">
        <h2 class="text-sm font-semibold text-gray-500 mb-2">Research</h2>
        <ul>
        {#each researchList.list as research}
            <a href="/dashboard/{research}">
                <li class="mb-1 rounded-md {research === activeResearch.value ? 'bg-blue-50 text-blue-600' : ''}">
                    <button 
                        class="w-full text-left py-2 px-3 flex items-center cursor-pointer hover:bg-blue-50 hover:text-blue-600 hover:rounded-md" 
                        onclick={() => activeResearch.update(research)}
                    >
                        <Folder class="mr-2" />
                        <span class="truncate">{research.length > 20 ? research.substring(0, 17) + '...' : research}</span>
                    </button>
                </li>
            </a>
        {/each}
        {#if researchList.list.length === 0 && isAddNewResearch === false}
            <p class="text-sm italic">No research</p>
        {/if}
        {#if isAddNewResearch}
            <li class="mb-1 rounded-md">
                <button 
                    class="w-full text-left py-2 px-3 flex items-center cursor-pointer hover:bg-blue-50 hover:rounded-md" 
                >
                    <Folder class="mr-2" />
                    <Input
                        bind:value={newResearchName}
                        bind:ref={researchNameInputComponent!}
                        onfocusout={() => {
                            isAddNewResearch = false
                            newResearchName = ""
                        }}
                        onkeydown={(e) => {
                            if (e.key === "Enter" && newResearchName !== "") {
                                researchList.add(newResearchName)
                                newResearchName = ""
                                isAddNewResearch = false
                            }
                        }}
                    />
                </button>
            </li>
        {/if}
        </ul>
    </div>

    <div class="mt-auto p-4 border-t border-gray-200">
        <div class="flex items-center">
        <div class="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">R</div>
        <span class="ml-2">Researcher Account</span>
        </div>
    </div>
</div>