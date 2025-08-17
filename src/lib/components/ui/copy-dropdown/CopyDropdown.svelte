<script lang="ts">
	import { Copy, CheckCircle2 } from 'lucide-svelte';

    let {
        setCopied,
        id
    } = $props();

    let triggered = $state<boolean>(false)
    let text = $state<"Copied" | "Copy">("Copy")
    let popupElement: any;

    const handleClickOutside = (e) => {
        if (popupElement && !popupElement.contains(e.target)) {
            triggered = false
        }
    }

    const handleKeydown = (e) => {
        if (e.key === 'Escape') {
            triggered = false
        }
    }
</script>

<svelte:window on:click={handleClickOutside} on:keydown={handleKeydown} />
<div class="inline-block relative cursor-default" bind:this={popupElement}>
    <button
        class="flex gap-1 text-xs hover:text-blue-600 items-center cursor-pointer transition-colors"
        onclick={() => {
            triggered = true
        }}
    >
        {#if text === "Copy"}
            <Copy class="w-4 h-4"/>
        {:else}
            <CheckCircle2 class="w-4 h-4 text-green-600"/>
        {/if}
        <p class="{text === "Copied" ? "text-green-600" : ""}">{text}</p>
    </button>
    <div class="bg-white absolute right-0 mt-2 rounded-md min-w-40 z-10 border border-gray-200 shadow-md {triggered ? "block" : "invisible"}">
        <div class="flex flex-col">
            <div class="flex gap-2 items-center border-b border-gray-200 p-1">
                <button
                    class="flex gap-2 items-center hover:bg-gray-100 w-full p-2 rounded-sm text-sm cursor-pointer"
                    onclick={async () => {
                        triggered = false
                        await navigator.clipboard.writeText("foobar");
                        setCopied(id)
                        text = "Copied"
                        setTimeout(() => {
                            text = "Copy"
                        }, 1000)
                    }}
                >
                    <Copy class="w-4 h-4"/>
                    <p>Copy text</p>
                </button>
            </div>
            <div class="p-1">
                <p class="text-xs">Copy reference</p>
                <div class="text-sm">
                    <button 
                        class="hover:bg-gray-100 rounded-sm py-1 pl-3 cursor-pointer w-full text-left"
                        onclick={async () => {
                            triggered = false
                            await navigator.clipboard.writeText("foobar");
                            setCopied(id)
                            text = "Copied"
                            setTimeout(() => {
                                text = "Copy"
                            }, 1000)
                        }}
                    >
                        MLA
                    </button>
                    <button 
                        class="hover:bg-gray-100 rounded-sm py-1 pl-3 cursor-pointer w-full text-left"
                        onclick={async () => {
                            triggered = false
                            await navigator.clipboard.writeText("foobar");
                            setCopied(id)
                            text = "Copied"
                            setTimeout(() => {
                                text = "Copy"
                            }, 1000)
                        }}
                    >
                        APA
                    </button>
                    <button 
                        class="hover:bg-gray-100 rounded-sm py-1 pl-3 cursor-pointer w-full text-left"
                        onclick={async () => {
                            triggered = false
                            await navigator.clipboard.writeText("foobar");
                            setCopied(id)
                            text = "Copied"
                            setTimeout(() => {
                                text = "Copy"
                            }, 1000)
                        }}
                    >
                        Chicago
                    </button>
                    <button 
                        class="hover:bg-gray-100 rounded-sm py-1 pl-3 cursor-pointer w-full text-left"
                        onclick={async () => {
                            triggered = false
                            await navigator.clipboard.writeText("foobar");
                            setCopied(id)
                            text = "Copied"
                            setTimeout(() => {
                                text = "Copy"
                            }, 1000)
                        }}
                    >
                        Harvard
                    </button>
                    <button 
                        class="hover:bg-gray-100 rounded-sm py-1 pl-3 cursor-pointer w-full text-left"
                        onclick={async () => {
                            triggered = false
                            await navigator.clipboard.writeText("foobar");
                            setCopied(id)
                            text = "Copied"
                            setTimeout(() => {
                                text = "Copy"
                            }, 1000)
                        }}
                    >
                        Vancouver
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>