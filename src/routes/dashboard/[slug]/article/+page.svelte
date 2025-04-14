<script lang="ts">
	import type { PDFSlick } from '@pdfslick/core';
	import { onMount, onDestroy } from 'svelte';
	import { Copy, Trash2, Tag, Plus, X, Dot, Clock } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button';
	import '@pdfslick/core/dist/pdf_viewer.css';

    let texts = $state<any>({ "123": 123, "312": 123, "12": 123, "43": 123, "13": 123, "134": 123, "153": 123 })
    let tempText = $state<string>("")
    let previewFilePromise = $state<any>()

    onMount(() => {
        var adobeDCView = new AdobeDC.View({clientId: "079678ae12b548aa9e0719f7a9eea4a2", divId: "adobe-dc-view"});
        previewFilePromise = adobeDCView.previewFile(
            {
                content:   {location: {url: "https://acrobatservices.adobe.com/view-sdk-demo/PDFs/Bodea Brochure.pdf"}},
                metaData:  {fileName: "Bodea Brochure.pdf", id: "77c6fa5d-6d74-4104-8349-657c8411a834"}
            },
            {
                enableAnnotationAPIs: true,
                enableFilePreviewEvents: true,
                enableAnnotationEvents: true,
            }
        );

        previewFilePromise.then(adobeViewer => {
            adobeViewer.getAnnotationManager().then(annotationManager => {
                annotationManager.registerEventListener(
                    function(event) {
                        if (event.type === "PREVIEW_SELECTION_END") {
                            setTimeout(() => {
                                adobeViewer.getAPIs().then(apis => {
                                apis.getSelectedContent()
                                    .then(result => {
                                        console.log("result", result)
                                        tempText = result.data
                                    });
                            });
                            }, 100)
                        } else if (event.type === "ANNOTATION_ADDED") {
                            console.log("annotation added", event.data)
                            texts[event.data.id] = tempText
                            tempText = ""

                        } else if (event.type === "ANNOTATION_CLICKED") {
                            console.log("annotation clicked", event.data)
                        }
                    },
                    {
                        listenOn: ["ANNOTATION_ADDED", "ANNOTATION_CLICKED", "PREVIEW_SELECTION_END"]
                    }
                );
            });
        })
	});

    let foo = $state([1, 2, 3, 4, 2, 3, 4, 5, 6, 7, 8])
</script>

<div class="bg-gray-100 h-full rounded-tl grid grid-cols-2">
    <div class="p-2 h-full">
        <div id="adobe-dc-view" class="rounded-md h-full"></div>
    </div>
    <div id="scroll" class="overflow-auto p-2">
        {#each foo as bar}
        <div class="border border-gray-300/40 rounded-md p-3 mb-3 bg-white">
            <div class="flex justify-between items-center">
                <div class="flex items-center text-stone-500">
                    <p class="text-xs text-stone-500">Page 23</p>
                    <Dot class="text-stone-500"/>
                    <div class="flex items-center text-xs gap-1">
                        <Clock size={12}/>
                        <p>1W ago</p>
                    </div>
                </div>
                <div class="flex gap-3">
                    <Copy size={16} class="cursor-pointer text-stone-500" onclick={() => { console.log("copy") }}/>
                    <Trash2 size={16} class="cursor-pointer hover:text-red-500 transition-colors text-stone-500" onclick={() => { console.log("delete") }}/>
                </div>
            </div>
            <div class="border-l-4 border-blue-500 rounded-sm bg-gray-200/40 p-3 mt-2">
                This is a snippet
            </div>
            <div class="pt-3 flex flex-wrap gap-2">
                <div class="rounded-full bg-blue-100 text-xs px-2 py-1 w-fit flex gap-1 items-center text-blue-700">
                    <Tag size={12}/>
                    <p>Population</p>
                    <X size={12} class="cursor-pointer" onclick={() => { console.log("delete tag") }}/>
                </div>
                <div class="rounded-full bg-gray-200 text-xs px-2 py-1 w-fit flex gap-1 items-center cursor-pointer">
                    <Plus size={12}/>
                    <p>Add Tag</p>
                </div>
            </div>
        </div>
        {/each}
    </div>
</div>

<!-- <div class="flex min-h-full grow rounded-tl-md bg-gray-800 p-4">
	<div id="test" class="flex grow">
		<div class="flex grow flex-col">
			<div id="adobe-dc-view" class="rounded-md"></div>
		</div>
		<div class="max-w-[50%] grow p-4">
			{#each Object.entries(texts) as [key, value]}
				<button id={key} class="mb-4 rounded-md border-1 border-gray-300 w-full" onclick={() => {
                    previewFilePromise.then(adobeViewer => {
                        adobeViewer
                            .getAnnotationManager()
                            .then(annotationManager => {
                            annotationManager
                                .getAnnotations({ annotationIds: [key] })
                                .then (result => console.log("find", result))
                                .catch(error => console.log(error));
                        });
                    });
                }}>
					<div class="p-2">
						<p class="text-sm text-gray-400">Highlight</p>
						<p>{value}</p>
					</div>
					<div class="border-t-1 border-gray-300 p-2">
						<p class="pb-2 text-sm text-gray-400">Tags</p>
						<div>
							<div class="flex w-fit items-center gap-3 rounded-sm bg-blue-200 pl-2 text-sm">
								<p>Population</p>
								<div
									class="cursor-pointer rounded-r-md border-l-1 border-blue-100 py-1 pr-2 pl-2 hover:bg-blue-400"
								>
									<X size={18} />
								</div>
							</div>
						</div>
					</div>
				</button>
			{/each}
		</div>
	</div>
</div> -->