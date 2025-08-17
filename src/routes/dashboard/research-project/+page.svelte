<script lang="ts">
	import { Folder, FileText, Highlighter, Tag, Plus } from 'lucide-svelte';
    import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
	import { modalStates } from '@/states.svelte'

    const projects = [
        {
            id: 1,
            name: "Machine Learning Research",
            description: "Advance research",
            papers: 15,
            highlights: 9,
            tags: 3,
            lastAccessed: "08/10/2025"
        },
        {
            id: 2,
            name: "Biotech and why it matters",
            description: "Scoping review of biotech",
            papers: 280,
            highlights: 56,
            tags: 12,
            lastAccessed: "08/15/2025"
        },
        {
            id: 3,
            name: "Computer vision and keystroke",
            description: "The use of CV in keystroke detection",
            papers: 1,
            highlights: 3,
            tags: 1,
            lastAccessed: "08/10/2025"
        },
    ]
    const users = [
        { id: 1, name: 'Alice Johnson', avatar: null },
        { id: 2, name: 'Bob Smith', avatar: null },
        { id: 3, name: 'Carol Davis', avatar: null },
        { id: 4, name: 'David Wilson', avatar: null },
        { id: 5, name: 'Emma Brown', avatar: null },
        { id: 6, name: 'Frank Miller', avatar: null },
        { id: 7, name: 'Grace Lee', avatar: null },
    ];

    let query = $state<string>("")
    let filteredProjects = $derived<any[]>(
        projects.filter(project => project.name.toLowerCase().includes(query) || project.description.toLowerCase().includes(query))
    )
</script>

<div class="flex h-screen w-full flex-col">
	<div class="flex items-center justify-between p-4">
        <div>
            <h1 class="text-xl font-bold">Research Projects</h1>
            <p class="text-sm text-gray-400">Organize your reference papers by specific research topics or writing projects to keep your citations structured and focused</p>
        </div>
        <div class="flex gap-2">
			<Input
                placeholder="Search project"
                oninput={(e) => {
                    const target = e.target as HTMLInputElement;
                    query = target.value
                }}
            />
			<Button 
                class="bg-blue-600"
                onclick={() => {
                    modalStates.update(prev => {
                        return { ...prev, addResearchProject: { show: true } }
                    })
                }}
            >
				<Plus />
				<p>Add research project</p>
			</Button>
		</div>
	</div>
	<div class="grow overflow-y-auto rounded-tl-md">
        <div class="min-h-full grow rounded-tl-md bg-gray-100 p-4">
            {#each filteredProjects as project}
                <a href="/dashboard/research-project/id-goes-here">
                    <div class="rounded-lg border-1 border-gray-200 bg-white mb-4 cursor-pointer hover:shadow-md transition-shadow">
                        <div class="flex justify-between items-center px-4 pt-4">
                            <div class="bg-blue-500 w-fit rounded-lg p-4">
                                <Folder class="text-white"/>
                            </div>
                            <div class="flex gap-6">
                                <div class="flex gap-2 items-center">
                                    <FileText class="text-blue-500 w-5"/>
                                    <p>{project.papers} Papers</p>
                                </div>
                                <div class="flex gap-2 items-center">
                                    <Highlighter class="text-yellow-500 w-5"/>
                                    <p>{project.highlights} Highlights</p>
                                </div>
                                <div class="flex gap-2 items-center">
                                    <Tag class="text-green-500 w-5"/>
                                    <p>{project.tags} Tags</p>
                                </div>
                            </div>
                        </div>
                        <div class="mt-4 px-4 pb-4">
                            <h3 class="text-xl font-bold text-gray-900">{project.name}</h3>
                            <p class="text-gray-600 text-sm mt-1">{project.description}</p>
                        </div>
                        <div class="border-t border-gray-200 py-2 px-4 text-sm flex justify-between text-gray-600">
                            <div class="flex flex-col gap-1">
                                <p class="text-xs">Members</p>
                                <div class="flex items-center">
                                    <div class="flex -space-x-2">
                                        {#each users.slice(0, 4) as user, index}
                                            <div
                                                class="relative w-9 h-9 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-700 font-medium text-sm shadow-sm hover:z-10 hover:shadow-md transition-all duration-200 cursor-pointer"
                                                style="z-index: {4 - index}"
                                                title={user.name}
                                            >
                                                <img src="https://randomuser.me/api/portraits/thumb/men/{index}.jpg" class="rounded-full" alt="user"/>
                                            </div>
                                        {/each}
                                    </div>
                                    {#if users.length > 4}
                                        <div class="ml-2 relative w-9 h-9 rounded-full border border-gray-200 bg-gray-100 flex items-center justify-center text-gray-600 font-medium text-xs shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer">
                                            +{users.length - 4}
                                        </div>
                                    {/if}
                                </div>
                            </div>
                            <div class="flex flex-col gap-1 justify-center">
                                <div>Updated 2 days ago</div>
                            </div>
                        </div>
                    </div>
                </a>
            {/each}
        </div>
	</div>
</div>