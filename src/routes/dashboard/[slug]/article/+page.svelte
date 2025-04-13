<!-- <script lang="ts">
	import type { PDFSlick } from '@pdfslick/core';
	import { onMount, onDestroy } from 'svelte';
	import { ZoomIn, ZoomOut, X } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button';
	import '@pdfslick/core/dist/pdf_viewer.css';

	let container: HTMLDivElement;
	let pdfSlick: PDFSlick;
	let unsubscribe: any;
	let pageNumber = 1;
	let numPages = 0;

	onMount(async () => {
		/**
		 * This is all happening on client side, so we'll make sure we only load it there
		 */
		const { create, PDFSlick } = await import('@pdfslick/core');

		const store = create();

		pdfSlick = new PDFSlick({
			container,
			store,
			options: {
				scaleValue: 'page-fit'
			}
		});

		pdfSlick.loadDocument('https://arxiv.org/pdf/2402.06196');
		pdfSlick.setHighlightDefaultColor('#ffffff');
		store.setState({ pdfSlick });

		unsubscribe = store.subscribe((s) => {
			pageNumber = s.pageNumber;
			numPages = s.numPages;
		});
	});

	// onDestroy(() => unsubscribe());

	let selectedText = $state('');

	let texts = $state<string[]>([]);

	function handleSelection() {
		const selection = window.getSelection();

        if (selection === null) return

		selectedText = selection!.toString();

		if (selectedText === '') return;
        console.log("selectedText", selectedText)
		texts.push(selectedText);

        console.log("selection", selection)

        const baseNode = selection.baseNode.parentNode
        const extentNode = selection.extentNode.parentNode

        // only highlighted 1 line
        if (baseNode === extentNode) {
            const text = baseNode.textContent
            const before = text.substring(0, selection.anchorOffset);
            const matched = text.substring(selection.anchorOffset, selection.anchorOffset + selectedText.length);
            const after = text.substring(selection.anchorOffset + selectedText.length);

            const fragment = document.createDocumentFragment();

            if (before) {
                fragment.appendChild(document.createTextNode(before));
            }

            const highlightDiv = document.createElement('span');
            highlightDiv.className = 'highlight';
            highlightDiv.textContent = selectedText;
            fragment.appendChild(highlightDiv);

            if (after) {
                fragment.appendChild(document.createTextNode(after));
            }

            baseNode.textContent = ""
            baseNode.appendChild(fragment);
        } else {
            let currentNode = baseNode

            let nextCheck = currentNode.nextSibling
            if (currentNode.nextSibling.localName !== "span") {
                nextCheck = currentNode.nextSibling.nextSibling
            }

            let previousCheck = currentNode.previousSibling
            if (currentNode.previousSibling.localName !== "span") {
                previousCheck = currentNode.previousSibling.previousSibling
            }

            console.log("nextCheck", nextCheck)
            console.log("previousCheck", previousCheck)

            console.log("selectedText", selectedText.split("\n"))
            console.log("nextCheck.textContent", nextCheck.textContent)
            console.log("previousCheck.textContent", previousCheck.textContent)

            if (selectedText.includes(nextCheck.textContent)) {
                console.log("next")
            } else if (selectedText.includes(previousCheck.textContent)) {
                console.log("after")
            }

            while (true) {
                if (currentNode.localName !== "span") {
                    currentNode = currentNode.nextSibling
                    continue
                }
                
                if (currentNode === baseNode) {
                    const text = currentNode.textContent
                    const before = text.substring(0, selection.anchorOffset);
                    const matched = text.substring(selection.anchorOffset, selection.anchorOffset + selectedText.length);
                    const after = text.substring(selection.anchorOffset + selectedText.length);
    
                    const fragment = document.createDocumentFragment();
    
                    if (before) {
                        fragment.appendChild(document.createTextNode(before));
                    }
    
                    const highlightDiv = document.createElement('span');
                    highlightDiv.className = 'highlight';
                    highlightDiv.textContent = matched;
                    fragment.appendChild(highlightDiv);
    
                    if (after) {
                        fragment.appendChild(document.createTextNode(after));
                    }
    
                    currentNode.textContent = ""
                    currentNode.appendChild(fragment);
                } else if (currentNode === extentNode) {
                    const text = currentNode.textContent
                    const matched = text.substring(0, selection.extentOffset);
                    const after = text.substring(selection.extentOffset);

                    console.log("text", text)
                    console.log("matched", matched)
                    console.log("after", after)

                    const fragment = document.createDocumentFragment();
                    const highlightDiv = document.createElement('span');
                    highlightDiv.className = 'highlight';
                    highlightDiv.textContent = matched;
                    fragment.appendChild(highlightDiv);

                    if (after) {
                        fragment.appendChild(document.createTextNode(after));
                    }

                    currentNode.textContent = ""
                    currentNode.appendChild(fragment);
                } else {
                    const fragment = document.createDocumentFragment();
                    const text = currentNode.textContent
                    const highlightDiv = document.createElement('span');
                    highlightDiv.className = 'highlight';
                    highlightDiv.textContent = text;
                    fragment.appendChild(highlightDiv);
                    currentNode.textContent = ""
                    currentNode.appendChild(fragment);
                }

                if (currentNode === extentNode) break // End
                if (currentNode.nextSibling === null) break // End, no more sibling

                currentNode = currentNode.nextSibling
            }
        }


        // while (true) {

        // }


		// highlightText(document.querySelector('#viewer')!, selectedText);
		// highlightText2(selectedText);
	}

	onMount(() => {
		document.addEventListener('mouseup', handleSelection);
		document.addEventListener('keyup', handleSelection);

		return () => {
			document.removeEventListener('mouseup', handleSelection);
			document.removeEventListener('keyup', handleSelection);
		};
	});

	// Simple function to find and highlight text
	// function highlightText2(searchText: string, container = document.querySelector('#viewer')!) {
	// 	if (!searchText) return;

	// 	// Simple text search in the DOM
	// 	const textNodes = [];
	// 	const walk = document.createTreeWalker(
	// 	container,
	// 	NodeFilter.SHOW_TEXT,
	// 	null,
	// 	false
	// 	);

	// 	let node;
	// 	while ((node = walk.nextNode())) {
	// 	textNodes.push(node);
	// 	}

	// 	// Look through text nodes for matches
	// 	textNodes.forEach(textNode => {
    //         const text = textNode.nodeValue;
    //         const index = text.indexOf(searchText);

    //         console.log("index", index)

    //         if (index >= 0) {
    //             console.log("textNode", textNode)
    //             // Split the text node
    //             const before = text.substring(0, index);
    //             const matched = text.substring(index, index + searchText.length);
    //             const after = text.substring(index + searchText.length);

    //             console.log("before", before)
    //             console.log("matched", matched)
    //             console.log("after", after)

    //             // Create the elements
    //             const fragment = document.createDocumentFragment();

    //             if (before) {
    //                 fragment.appendChild(document.createTextNode(before));
    //             }

    //             console.log("fragment 1", fragment)


    //             // Create the highlight div
    //             const highlightDiv = document.createElement('span');
    //             highlightDiv.className = 'highlight';
    //             highlightDiv.textContent = matched;
    //             fragment.appendChild(highlightDiv);

    //             console.log("highlightDiv", highlightDiv)

    //             if (after) {
    //                 fragment.appendChild(document.createTextNode(after));
    //             }

    //             console.log("fragment 2", fragment)

    //             // Replace the original text node
    //             textNode.parentNode.replaceChild(fragment, textNode);
    //             console.log("textNode.parentNode", textNode.parentNode)
    //         }
	// 	});
	// }

    // function highlightText(container, searchText) {
    //     // Separate the searchText by space (" ") so it's individual words
    //     const words = searchText.trim().split(" ");
    //     if (words.length === 0) return false;
        
    //     // Find all the text nodes that are in the container
    //     const spanNodes = [];
    //     const getAllSpanNodes = (node) => {
    //     if (node.tagName && node.tagName.toLowerCase() === 'span') {
    //         spanNodes.push(node);
    //     }
        
    //     Array.from(node.childNodes).forEach(child => getAllSpanNodes(child));
    //     };
    //     getAllSpanNodes(container);
        
    //     // Find potential start nodes
    //     let potentialStartNodes = [];
    //     let currentMatchingPhrase = words[0];
    //     let currentMatchingNodes = spanNodes.filter(node => 
    //         node.textContent.includes(currentMatchingPhrase));
        
    //     // If we can't find the first word, exit early
    //     if (currentMatchingNodes.length === 0) return false;
        
    //     potentialStartNodes = currentMatchingNodes;
        
    //     // Try to match longer and longer phrases from the beginning
    //     for (let i = 1; i < words.length; i++) {
    //         currentMatchingPhrase += " " + words[i];
    //         currentMatchingNodes = spanNodes.filter(node => 
    //         node.textContent.includes(currentMatchingPhrase));
            
    //         // If we found nodes with the longer phrase, update potential start nodes
    //         if (currentMatchingNodes.length > 0) {
    //         potentialStartNodes = currentMatchingNodes;
    //         } else {
    //         // No more matches with longer phrases, keep the last successful matches
    //         break;
    //         }
    //     }

    //     console.log("potentialStartNodes", potentialStartNodes)
        
    //     // Find potential end nodes working backwards
    //     let potentialEndNodes = [];
    //     currentMatchingPhrase = words[words.length - 1];
    //     currentMatchingNodes = spanNodes.filter(node => 
    //         node.textContent.includes(currentMatchingPhrase));
        
    //     // If we can't find the last word, exit early
    //     if (currentMatchingNodes.length === 0) return false;
        
    //     potentialEndNodes = currentMatchingNodes;
        
    //     // Try to match longer and longer phrases from the end
    //     for (let i = words.length - 2; i >= 0; i--) {
    //         currentMatchingPhrase = words[i] + " " + currentMatchingPhrase;
    //         currentMatchingNodes = spanNodes.filter(node => 
    //         node.textContent.includes(currentMatchingPhrase));
            
    //         // If we found nodes with the longer phrase, update potential end nodes
    //         if (currentMatchingNodes.length > 0) {
    //         potentialEndNodes = currentMatchingNodes;
    //         } else {
    //         // No more matches with longer phrases, keep the last successful matches
    //         break;
    //         }
    //     }

    //     console.log("potentialEndNodes", potentialEndNodes)
        
    //     // Check if we have a match within a single node
    //     const sameNodeMatches = potentialStartNodes.filter(startNode => 
    //         potentialEndNodes.some(endNode => startNode === endNode));
        
    //     console.log("sameNodeMatches", sameNodeMatches)


    //     if (sameNodeMatches.length > 0) {
    //         // Single node match - we wrap just this node
    //         const node = sameNodeMatches[0];
    //         const nodeText = node.textContent;
    //         const startIndex = nodeText.indexOf(words[0]);
    //         const endIndex = nodeText.lastIndexOf(words[words.length - 1]) + words[words.length - 1].length;
            
    //         const beforeText = nodeText.substring(0, startIndex);
    //         const highlightedText = nodeText.substring(startIndex, endIndex);
    //         const afterText = nodeText.substring(endIndex);

    //         const fragment = document.createDocumentFragment();

    //         if (beforeText) {
    //             fragment.appendChild(document.createTextNode(beforeText));
    //         }

    //         const highlightDiv = document.createElement('span');
    //         highlightDiv.className = 'highlight';
    //         highlightDiv.textContent = highlightedText;
    //         fragment.appendChild(highlightDiv);

    //         if (afterText) {
    //             fragment.appendChild(document.createTextNode(afterText));
    //         }

    //         node.textContent = ""
    //         node.appendChild(fragment);
        
    //         return true;
    //     } else {
    //         // We need to highlight across multiple nodes
    //         // Find the path from start to end nodes
    //         const nodePath = findNodePath(spanNodes, potentialStartNodes, potentialEndNodes, words);
    //         if (!nodePath) return false;
            
    //         // Apply highlighting to all nodes in the path
    //         for (let i = 0; i < nodePath.length; i++) {
    //         const node = nodePath[i];
    //         const nodeText = node.textContent;
            
    //         if (i === 0) {
    //             // First node - highlight from the first word
    //             const startWord = words[0];
    //             const startIndex = nodeText.indexOf(startWord);
                
    //             const beforeText = nodeText.substring(0, startIndex);
    //             const highlightedText = nodeText.substring(startIndex);
                
    //             const beforeNode = document.createTextNode(beforeText);
    //             const highlightNode = document.createElement("span");
    //             highlightNode.className = "highlight";
    //             highlightNode.textContent = highlightedText;
                
    //             // Replace original node
    //             const parent = node.parentNode;
    //             parent.replaceChild(highlightNode, node);
    //             parent.insertBefore(beforeNode, highlightNode);
    //         } else if (i === nodePath.length - 1) {
    //             // Last node - highlight until the last word
    //             const lastWord = words[words.length - 1];
    //             const lastIndex = nodeText.lastIndexOf(lastWord) + lastWord.length;
                
    //             const highlightedText = nodeText.substring(0, lastIndex);
    //             const afterText = nodeText.substring(lastIndex);
                
    //             const highlightNode = document.createElement("span");
    //             highlightNode.className = "highlight";
    //             highlightNode.textContent = highlightedText;
    //             const afterNode = document.createTextNode(afterText);
                
    //             // Replace original node
    //             const parent = node.parentNode;
    //             parent.replaceChild(afterNode, node);
    //             parent.insertBefore(highlightNode, afterNode);
    //         } else {
    //             // Middle nodes - highlight the entire content
    //             const highlightNode = document.createElement("span");
    //             highlightNode.className = "highlight";
    //             highlightNode.textContent = nodeText;
                
    //             // Replace original node
    //             const parent = node.parentNode;
    //             parent.replaceChild(highlightNode, node);
    //         }
    //         }
            
    //         return true;
    //     }
    //     }

    //     // Helper function to find a valid path from start nodes to end nodes
    //     function findNodePath(allNodes, startNodes, endNodes, words) {
    //     // Start with the simplest case - direct path
    //     for (const startNode of startNodes) {
    //         const startIndex = allNodes.indexOf(startNode);
            
    //         for (const endNode of endNodes) {
    //         const endIndex = allNodes.indexOf(endNode);
            
    //         if (startIndex <= endIndex) {
    //             // Check if the full text is contained in this node sequence
    //             const nodeSlice = allNodes.slice(startIndex, endIndex + 1);
    //             const fullText = nodeSlice.map(node => node.textContent).join(" ");
                
    //             // Check if all words appear in the right order in the full text
    //             let allWordsFound = true;
    //             let lastIndex = -1;
                
    //             for (const word of words) {
    //             const wordIndex = fullText.indexOf(word, lastIndex + 1);
    //             if (wordIndex === -1) {
    //                 allWordsFound = false;
    //                 break;
    //             }
    //             lastIndex = wordIndex;
    //             }
                
    //             if (allWordsFound) {
    //             return nodeSlice;
    //             }
    //         }
    //         }
    //     }
        
    //     return null; // No valid path found
    // }
</script>

<div class="flex min-h-full grow rounded-tl-md bg-gray-100 p-4">
	<div id="test" class="flex grow">
		<div id="foo" class="flex grow flex-col">
			<div class="flex justify-center gap-4 p-4">
				<ZoomIn onclick={() => pdfSlick.increaseScale()} class="cursor-pointer" />
				<ZoomOut onclick={() => pdfSlick.decreaseScale()} class="cursor-pointer" />
			</div>
			<div class="grow">
				<div class="relative h-full w-full">
					<div class="pdfSlick absolute inset-0">
						<div class="relative h-full flex-1" id="container">
							<div
								id="viewerContainer"
								class="pdfSlickContainer absolute inset-0 overflow-auto"
								bind:this={container}
							>
								<div id="viewer" class="pdfSlickViewer pdfViewer"></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="max-w-[50%] grow p-4">
			{#each texts as text}
				<div class="mb-4 rounded-md border-1 border-gray-300">
					<div class="p-2">
						<p class="text-sm text-gray-400">Highlight</p>
						<p>{text}</p>
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
				</div>
			{/each}
		</div>
	</div>
</div> -->

<!--  -->

<svelte:head>
    <script src="https://acrobatservices.adobe.com/view-sdk/viewer.js"></script>
</svelte:head>

<script lang="ts">
	import type { PDFSlick } from '@pdfslick/core';
	import { onMount, onDestroy } from 'svelte';
	import { ZoomIn, ZoomOut, X } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button';
	import '@pdfslick/core/dist/pdf_viewer.css';

    let texts = $state([])

    function handleSelection() {
		const selection = window.getSelection();

        console.log("selection", selection)

        if (selection === null) return

		let selectedText = selection!.toString();

        console.log("selectedText", selectedText)
    }

    onMount(() => {
        document.addEventListener("adobe_dc_view_sdk.ready", function() {
            var adobeDCView = new AdobeDC.View({clientId: "079678ae12b548aa9e0719f7a9eea4a2", divId: "adobe-dc-view"});
            adobeDCView.previewFile({
                content:  {location: {url: "https://arxiv.org/pdf/2402.06196"}},
                metaData: {fileName: "yourfilename.pdf"}
            });

            console.log("adobeDCView", adobeDCView)

            const foo = adobeDCView.getSelectedContent()

            console.log("foo", foo)


            adobeDCView.registerCallback(
                AdobeDC.View.Enum.CallbackType.EVENT_LISTENER,
                function(event) {
                    if (event.type === "PREVIEW_SELECTION_END") {
                        previewFilePromise.then(adobeViewer => {
                            adobeViewer.getAPIs().then(apis => {
                                apis.getSelectedContent()
                                    .then(result => console.log(result));
                            });
                        });
                    }
                }, {enableFilePreviewEvents: true}
            );
        });

		document.addEventListener('mouseup', handleSelection);
		document.addEventListener('keyup', handleSelection);

		return () => {
			document.removeEventListener('mouseup', handleSelection);
			document.removeEventListener('keyup', handleSelection);
		};
	});

</script>

<!-- 079678ae12b548aa9e0719f7a9eea4a2 -->

<div class="flex min-h-full grow rounded-tl-md bg-gray-100 p-4">
	<div id="test" class="flex grow">
		<div id="foo" class="flex grow flex-col">
			<div id="adobe-dc-view"></div>
		</div>
		<div class="max-w-[50%] grow p-4">
			{#each texts as text}
				<div class="mb-4 rounded-md border-1 border-gray-300">
					<div class="p-2">
						<p class="text-sm text-gray-400">Highlight</p>
						<p>{text}</p>
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
				</div>
			{/each}
		</div>
	</div>
</div>