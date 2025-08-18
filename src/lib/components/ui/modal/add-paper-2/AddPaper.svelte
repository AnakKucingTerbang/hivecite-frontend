<script lang="ts">
	import { Link, Upload, X, FileText, CheckCircle2, Download } from 'lucide-svelte';
    import * as Dialog from "$lib/components/ui/dialog"
    import { Input } from '$lib/components/ui/input';
    import { Button } from '$lib/components/ui/button';

    let {
        open = $bindable(false)
    } = $props();

    let uploadMethod = $state<"link"|"upload">("link")
    let paperLink = $state<string | null>(null)
    let isDragOver = $state<boolean>(false);
    let uploadedFile = $state<File | null>(null);
    let warning = $state<string>("");
    // svelte-ignore non_reactive_update
    let fileInput: HTMLInputElement;

    const handleDragOver = (event: DragEvent) => {
        event.preventDefault();
        isDragOver = true;
    }

    const handleDragLeave = (event: DragEvent) => {
        event.preventDefault();
        isDragOver = false;
    }

    const handleDrop = (event: DragEvent) => {
        event.preventDefault();
        isDragOver = false;
        
        const files = event.dataTransfer!.files;
        if (files.length > 0) {
            processFile(files[0]);
        }
    }

    const handleFileSelect = (event: any) => {
        const files = event.target!.files;
        if (files.length > 0) {
        processFile(files[0]);
        }
    }

    const processFile = (file: File) => {
        warning = '';
        
        // Check if file is PDF
        if (file.type !== 'application/pdf') {
            warning = 'Please select a PDF file only.';
            return;
        }
        
        // Check file size (10MB = 10 * 1024 * 1024 bytes)
        if (file.size > 10 * 1024 * 1024) {
            warning = 'File size must be less than 10MB.';
            return;
        }
        
        uploadedFile = file;
    }

    const browseFiles = () => {
        fileInput.click();
    }

    const removeFile = () => {
        uploadedFile = null;
        warning = '';
        fileInput.value = '';
    }

</script>

<Dialog.Root bind:open>
    <Dialog.Content class="p-0">
        <Dialog.Header class="border-b-1 border-gray-200 p-6">
            <Dialog.Title>
                <div class="flex gap-3 items-center">
                <div class="bg-blue-100 w-fit p-2 rounded-xl">
                    <FileText class="text-blue-600 w-5 h-5"/>
                </div>
                <h2 class="text-xl font-semibold text-gray-900">Add Paper</h2>
            </div>
            </Dialog.Title>
            <Dialog.Description>
                <div class="bg-gray-200 border border-gray-300 text-sm text-gray-700 rounded-md p-2 mt-4">
                    Search existing tags in the search bar and select from the list, or type a new tag name and click "Add" to create it.
                </div>
            </Dialog.Description>
        </Dialog.Header>
        <div class="px-6 pb-6">
            <div class="flex border-b mb-6">
            <button
                onclick={() => uploadMethod = "link"}
                class="flex-1 pb-3 px-1 text-sm font-medium border-b-2 transition-colors cursor-pointer {
                uploadMethod === "link" 
                    ? "border-blue-500 text-blue-600" 
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }"
            >
                <Link size={16} class="inline mr-2" />
                By Link
            </button>
            <button
                onclick={() => uploadMethod = "upload"}
                class="flex-1 pb-3 px-1 text-sm font-medium border-b-2 transition-colors cursor-pointer {
                uploadMethod === "upload" 
                    ? "border-blue-500 text-blue-600" 
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }"
            >
                <Upload size={16} class="inline mr-2" />
                Upload PDF
            </button>
            </div>
            {#if uploadMethod === "link"}
                <div>
                    <p class="block text-sm font-medium text-gray-700 mb-2">Paper URL</p>
                    <input
                    type="text"
                    value={paperLink}
                    onchange={(e) => {
                        const target = e.target as HTMLInputElement;
                        paperLink = target.value
                    }}
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://example.com/paper.pdf"
                    />
                    <p class="text-xs text-gray-500 mt-2">Paste a link to a PDF document</p>
                </div>
            {:else if uploadMethod === "upload"}
                <div>
                    <input
                        bind:this={fileInput}
                        type="file"
                        accept=".pdf,application/pdf"
                        onchange={handleFileSelect}
                        class="hidden"
                    />

                    {#if uploadedFile}
                        <div class="border-2 border-green-300 rounded-lg p-8 text-center bg-green-50">
                            <div class="flex justify-center mb-4">
                                <CheckCircle2 class="text-green-500 w-12 h-12"/>
                            </div>
                            <p class="text-sm text-gray-700 mb-2">File uploaded successfully!</p>
                            <p class="text-sm font-medium text-gray-800">{uploadedFile.name}</p>
                            <p class="text-xs text-gray-500 mb-4">{(uploadedFile.size / (1024 * 1024)).toFixed(2)} MB</p>
                            <button
                                onclick={removeFile}
                                class="text-red-600 hover:text-red-700 text-sm font-medium cursor-pointer"
                            >
                                Remove file
                            </button>
                        </div>
                    {:else}
                        <!-- Upload area -->
                        <div
                            class="border-2 border-dashed rounded-lg p-8 text-center transition-colors duration-200 {isDragOver ? 'border-blue-400 bg-blue-50' : warning ? 'border-red-300 bg-red-50' : 'border-gray-300'}"
                            ondragover={handleDragOver}
                            ondragleave={handleDragLeave}
                            ondrop={handleDrop}
                            role="region"
                        >
                        <!-- Upload icon -->
                        <Download class="mx-auto mb-4 {warning ? 'text-red-400' : isDragOver ? 'text-blue-500' : 'text-gray-400'} w-12 h-12" />
                        
                        {#if warning}
                            <p class="text-sm text-red-600 mb-2">{warning}</p>
                            <button
                            onclick={browseFiles}
                            class="text-blue-600 hover:text-blue-700 text-sm font-medium cursor-pointer"
                            >
                            try again
                            </button>
                        {:else}
                            <p class="text-sm text-gray-600 mb-2">
                            {isDragOver ? 'Drop your PDF here' : 'Drop your PDF here or'}
                            </p>
                            <button
                                onclick={browseFiles}
                                class="text-blue-600 hover:text-blue-700 text-sm font-medium cursor-pointer"
                            >
                                {isDragOver ? "Drop file" : "Browser files"}
                            </button>
                        {/if}
                        
                        <p class="text-xs text-gray-400 mt-2">PDF files only, max 10MB</p>
                        </div>
                    {/if}
                </div>
            {/if}
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
                    open = false
                    
                    // todo: call api
                }}
            >
                Add
            </Button>
        </Dialog.Footer>
    </Dialog.Content>
</Dialog.Root>