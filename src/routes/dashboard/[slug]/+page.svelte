<script lang="ts">
	import type { PageProps } from './$types';
    import { Dot, BookCopy, Plus } from "lucide-svelte";
    import { Input } from '$lib/components/ui/input'
    import { Button } from '$lib/components/ui/button'

    let { data }: PageProps = $props();
    let activePage: string | null = $state(null)
</script>

<div class="flex justify-between items-center">
    <div class="flex gap-3">
        <button
            class="rounded-full py-2 px-6 w-fit hover:text-blue-600 hover:border-blue-600 border-1 cursor-pointer {activePage === 'papers' ? 'text-blue-600 border-blue-600 bg-white' : 'bg-white border-transparent'}"
            onclick={() => {activePage = "papers"}}
            >
            Papers
        </button>
        <button
            class="rounded-full py-2 px-6 w-fit hover:text-blue-600 hover:border-blue-600 border-1 cursor-pointer {activePage === 'highlights' ? 'text-blue-600 border-blue-600 bg-white' : 'bg-white border-transparent'}"
            onclick={() => {activePage = "highlights"}}
            >
            Highlights
        </button>
    </div>
    <div class="flex gap-2">
        <Input placeholder="Search paper"/>
        <Button class="bg-blue-600">
            <Plus />
            <p>Add paper</p>
        </Button>
    </div>
</div>
<div class="pt-4 flex flex-col gap-3">
    <div class="bg-white border-1 border-gray-200 rounded-lg">
        <div class="p-3">
            <p class="bold">Understanding the Ethical Implications of AI in Healthcare</p>
            <div class="flex items-center text-sm text-gray-500 pt-2">
                <p>Johnson et al.</p>
                <Dot />
                <p>2023</p>
            </div>
            <div class="flex justify-between pt-6">
                <div class="text-sm flex items-center gap-2">
                    <div class="h-[6px] w-[6px] rounded-full bg-blue-600"></div>
                    <p>2 Highlights</p>
                </div>
                <div class="text-sm bg-blue-100 text-blue-600 rounded-md w-fit px-3 py-1 flex gap-2 items-center">
                    <BookCopy size={18} />
                    <p>2 Projects</p>
                </div>
            </div>
        </div>
        <div class="border-t-1 border-gray-200 flex">
            <button
                class="border-r-1 border-gray-200 grow flex justify-center p-2 text-sm cursor-pointer"
                onclick={() => { console.log('click') }}
            >
                <p>View Highlights</p>
            </button>
            <a href="/dashboard/{data.slug}/article">
                <button
                    class="border-r-1 border-gray-200 grow flex justify-center p-2 text-sm cursor-pointer text-blue-600"
                    onclick={() => { console.log('click') }}
                >
                    <p>Open PDF</p>
                </button>
            </a>
        </div>
    </div>
</div>