<script lang="ts">
    import * as Dialog from "$lib/components/ui/dialog"
    import { Button } from '$lib/components/ui/button';
    import * as Alert from "$lib/components/ui/alert";
	import { Search, X, Folder, TriangleAlert } from 'lucide-svelte';

    let {
        open = $bindable()
    } = $props();

    // Mock email suggestions
    const emailSuggestions = [
        "john.doe@university.edu",
        "jane.smith@research.org", 
        "alice.johnson@lab.com",
        "bob.wilson@institute.edu",
        "carol.brown@college.edu",
        "a@college.edu",
        "ab@college.edu",
    ];

    let warnings = $state<string[]>([])
    let selectedEmails = $state<string[]>([])
    let emailSearch = $state<string>("")
    let projectName = $state<string>("")
    let projectDescription = $state<string>("")
    let filteredEmails = $derived<string[]>(emailSuggestions.filter(email => 
        email.toLowerCase().includes(emailSearch.toLowerCase()) && 
        !selectedEmails.includes(email)
    ))

</script>

<Dialog.Root bind:open>
    <Dialog.Content class="p-0">
        <Dialog.Header class="border-b-1 border-gray-200 p-6">
            <Dialog.Title>
                <div class="flex gap-3 items-center">
                <div class="bg-blue-100 w-fit p-2 rounded-xl">
                    <Folder class="text-blue-600 w-5 h-5"/>
                </div>
                <h2 class="text-xl font-semibold text-gray-900">Add Research Project</h2>
            </div>
            </Dialog.Title>
        </Dialog.Header>
        <div class="p-6 space-y-4">
            {#if warnings.length > 0}
                <Alert.Root>
                    <TriangleAlert/>
                    <Alert.Title>Unable to add project</Alert.Title>
                    <Alert.Description>
                    <p>Please verify you have fill out all of the required field</p>
                    <ul class="list-inside list-disc text-sm">
                        {#each warnings as warning}
                            <li>{warning}</li>
                        {/each}
                    </ul>
                    </Alert.Description>
                </Alert.Root>
            {/if}
            <div>
                <p class="block text-sm font-medium text-gray-700 mb-2">Project Name*</p>
                <input
                type="text"
                value={projectName}
                onchange={(e) => {
                    const target = e.target as HTMLInputElement;
                    projectName = target.value
                }}
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter project name"
                />
            </div>

            <div>
                <p class="block text-sm font-medium text-gray-700 mb-2">Description*</p>
                <textarea
                value={projectDescription}
                onchange={(e) => {
                    const target = e.target as HTMLInputElement;
                    projectDescription = target.value
                }}
                rows={3}
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Describe your research project"
                ></textarea>
            </div>

            <div>
                <p class="block text-sm font-medium text-gray-700 mb-2">Collaborators</p>
                <div class="relative inline-block w-full">
                    <div class="flex items-center border border-gray-300 rounded-md p-2 min-h-10 mb-1">
                        <Search size={16} class="text-gray-400 mr-2" />
                        <input
                            type="text"
                            value={emailSearch}
                            oninput={e => {
                                const target = e.target as HTMLInputElement;
                                emailSearch =target.value
                            }}
                            class="outline-none w-full"
                            placeholder={selectedEmails.length === 0 ? "Search emails..." : ""}
                        />
                    </div>
                    {#if emailSearch && filteredEmails.length > 0}
                        <div class="absolute hover:block bg-white rounded-md p-2 shadow-md border border-gray-200">
                            {#each filteredEmails as filteredEmail}
                                <button
                                    onclick={() => {
                                        selectedEmails.push(filteredEmail)
                                        emailSearch = ""
                                    }}
                                    class="w-full text-left px-3 py-2 hover:bg-gray-100 text-sm rounded-sm cursor-pointer"
                                    >
                                    {filteredEmail}
                                </button>
                            {/each}
                        </div>
                    {/if}
                    <div class="flex flex-wrap gap-1 flex-1">
                        {#each selectedEmails as selectedEmail}
                            <span class="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm flex items-center w-fit">
                                {selectedEmail}
                                <button onclick={() => { selectedEmails = selectedEmails.filter(item => item !== selectedEmail) }} class="ml-1 text-blue-600 hover:text-blue-800 hover:bg-blue-300 rounded-sm cursor-pointer">
                                    <X size={12} />
                                </button>
                            </span>
                        {/each}
                    </div>
                </div>
            </div>
        </div>
        <Dialog.Footer class="p-6 border-t bg-gray-50">
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
                    let index

                    if (projectName === "") {
                        index = warnings.findIndex((warning) => warning === "Project must have a name")
                        if (index === -1) {
                            warnings.push("Project must have a name")
                        }
                    } else {
                        warnings = warnings.filter((warning) => warning !== "Project must have a name")
                    }

                    if (projectDescription === "") {
                        index = warnings.findIndex((warning) => warning === "Project must have a description")
                        if (index === -1) {
                            warnings.push("Project must have a description")
                        }
                    } else {
                        warnings = warnings.filter((warning) => warning !== "Project must have a description")
                    }

                    if (warnings.length > 0) return

                    // Check if project name is unique

                    open = false
                }}
            >
                Add
            </Button>
        </Dialog.Footer>
    </Dialog.Content>
</Dialog.Root>