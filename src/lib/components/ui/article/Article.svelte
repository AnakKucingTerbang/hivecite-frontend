<script lang="ts">
	import type { PDFSlick } from '@pdfslick/core';
	import { onMount, onDestroy } from 'svelte';
	import { Highlighter, ChevronLeft } from 'lucide-svelte';
	import { Snippet } from '$lib/components/ui/snippet';
    import { Input } from '$lib/components/ui/input';
	import '@pdfslick/core/dist/pdf_viewer.css';

    let snippets = $state<any>({})
    let tempText = $state<string>("")
    let previewFilePromise = $state<any>()

    const deleteSnippet = (key: string) => {
        delete snippets[key]

        previewFilePromise.then((adobeViewer: any) => {
            adobeViewer.getAnnotationManager().then((annotationManager: any) => {
                annotationManager.deleteAnnotations({ annotationIds: [key] })
                    .then (() => {})
                    .catch((error: any) => {});
            });
        });
    }

    onMount(() => {
        // @ts-ignore
        var adobeDCView = new AdobeDC.View({
            clientId: "079678ae12b548aa9e0719f7a9eea4a2", 
            divId: "adobe-dc-view",
            sendAutoPDFAnalytics: false
        });
        previewFilePromise = adobeDCView.previewFile(
            {
                content:   {location: {url: "https://acrobatservices.adobe.com/view-sdk-demo/PDFs/Bodea Brochure.pdf"}},
                metaData:  {fileName: "Bodea Brochure.pdf", id: "77c6fa5d-6d74-4104-8349-657c8411a834"}
            },
            {
                enableFilePreviewEvents: true,
                enableAnnotationEvents: true,
                enableFormFilling: false,

                /**
                 * When only enableAnnotationAPIs is true, adding or updating annotations does not alter the original PDF content.
                 * When both (includePDFAnnotations) these variables are true, the APIs alter the original PDF.
                 * Source: https://developer.adobe.com/document-services/docs/overview/pdf-embed-api/howtos_comments/
                 * 
                 * todo: Need to test if this modify the file in storage
                 */
                enableAnnotationAPIs: true,
                includePDFAnnotations: false // currently set to false (default), set to true when testing
            }
        );

        previewFilePromise.then((adobeViewer: any) => {
            adobeViewer.getAnnotationManager().then((annotationManager: any) => {
                annotationManager.registerEventListener(
                    function(event: any) {
                        if (event.type === "PREVIEW_SELECTION_END") {
                            setTimeout(() => {
                                adobeViewer.getAPIs().then((apis: any) => {
                                apis.getSelectedContent()
                                    .then((result: any) => {
                                        // console.log("result", result)
                                        tempText = result.data
                                    });
                                });
                            }, 100)
                        } else if (event.type === "ANNOTATION_ADDED") {
                            // console.log("annotation added", event.data)
                            snippets[event.data.id] = tempText
                            tempText = ""
                        } else if (event.type === "ANNOTATION_CLICKED") {
                            // console.log("annotation clicked", event.data)
                        }
                    },
                    {
                        listenOn: ["ANNOTATION_ADDED", "ANNOTATION_CLICKED", "PREVIEW_SELECTION_END"]
                    }
                );
            });
        })
	});
</script>

<div class="flex h-screen w-full flex-col">
	<div class="flex items-center justify-between p-4">
        <div class="flex gap-2 items-center">
            <a
                href="/dashboard/research-project/id-goes-here"
                class="bg-blue-100 rounded-sm px-1 cursor-pointer"
            >
                <ChevronLeft class="w-4 text-blue-600" />
            </a>
            <h1 class="text-xl font-bold">Name of paper</h1>
        </div>
        <div class="flex gap-2">
			<Input placeholder="Search highlights" />
		</div>
	</div>
	<div class="grow overflow-y-auto rounded-tl-md">
        <div class="bg-gray-100 h-full rounded-tl grid grid-cols-10 w-full">
            <div class="p-2 h-full col-span-7">
                <div id="adobe-dc-view" class="rounded-md h-full"></div>
            </div>
            <div id="scroll" class="overflow-auto p-2 col-span-3">
                {#if Object.keys(snippets).length === 0}
                    <div class="border-2 border-dashed border-gray-300 h-full flex items-center justify-center text-xs gap-2 text-stone-500 flex-col">
                        <Highlighter size={48} />
                        Start highlighting your document to see your snippets here
                    </div>
                {/if}
                {#each Object.keys(snippets) as key}
                    <Snippet snippet={snippets[key]} key={key} deleteSnippet={deleteSnippet}/>
                {/each}
            </div>
        </div>
    </div>
</div>