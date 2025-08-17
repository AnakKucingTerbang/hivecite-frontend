<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import Accordion from '$lib/components/ui/accordion/Accordion.svelte';
	import AccordionItem from '$lib/components/ui/accordion/AccordionItem.svelte';
	import MobileNotification from '$lib/components/ui/mobile-notification/MobileNotification.svelte';
	import { MessagesSquare } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { Highlighter } from 'lucide-svelte';
	import { Snippet } from '$lib/components/ui/snippet';
	import '@pdfslick/core/dist/pdf_viewer.css';

    let snippets = $state<any>({})
    let tempText = $state<string>("")
    let previewFilePromise = $state<any>()
	let email = '';

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

	const sleep = (ms: number) => new Promise(f => setTimeout(f, ms));

    onMount(async () => {
		await sleep(500);
        // @ts-ignore
        var adobeDCView = new AdobeDC.View({clientId: "079678ae12b548aa9e0719f7a9eea4a2", divId: "adobe-dc-view"});
        previewFilePromise = adobeDCView.previewFile(
            {
                content:   {location: {url: "https://arxiv.org/pdf/1706.03762"}},
                metaData:  {fileName: "Attention Is All You Need.pdf", id: "77c6fa5d-6d74-4104-8349-657c8411a834"}
            },
            {
                enableAnnotationAPIs: true,
                enableFilePreviewEvents: true,
                enableAnnotationEvents: true,
            }
        );

        previewFilePromise.then((adobeViewer: any) => {
			adobeViewer.getAPIs().then((apis: any) => {
                apis.getZoomAPIs().zoomIn()
                apis.getZoomAPIs().zoomIn()
                apis.getZoomAPIs().zoomIn()
                apis.getZoomAPIs().zoomIn()
        	});
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

<div class="flex min-h-screen flex-col relative">
	<div id="circuit-board"></div>
	<MobileNotification />
	<!-- Header Section -->
	<header class="flex justify-between py-5 px-8 z-10">
		<div class="flex items-center gap-2">
			<div class="bg-blue-600 rounded-lg p-2 text-white geist-bold">
				HC
			</div>
			<p class="geist-bold text-lg text-stone-800">EagleCite</p>
		</div>
		<div class="flex gap-10 items-center text-stone-800">
			<a href="#faq" class="group flex items-center gap-2 cursor-pointer hover:bg-stone-100 pr-0 px-5 sm:pr-4 py-4 rounded-2xl transition duration-300">
				<MessagesSquare class="group-hover:-rotate-12 transition duration-300"/>
				<p class="geist-bold">FAQs</p>
			</a>
			<!-- <div class="bg-stone-100 rounded-2xl px-5 py-1 text-white cursor-pointer items-center gap-3 hidden md:flex">
				<svg height="48" viewBox="0 0 17 48" width="17" xmlns="http://www.w3.org/2000/svg"><path d="m15.5752 19.0792a4.2055 4.2055 0 0 0 -2.01 3.5376 4.0931 4.0931 0 0 0 2.4908 3.7542 9.7779 9.7779 0 0 1 -1.2755 2.6351c-.7941 1.1431-1.6244 2.2862-2.8878 2.2862s-1.5883-.734-3.0443-.734c-1.42 0-1.9252.7581-3.08.7581s-1.9611-1.0589-2.8876-2.3584a11.3987 11.3987 0 0 1 -1.9373-6.1487c0-3.61 2.3464-5.523 4.6566-5.523 1.2274 0 2.25.8062 3.02.8062.734 0 1.8771-.8543 3.2729-.8543a4.3778 4.3778 0 0 1 3.6822 1.841zm-6.8586-2.0456a1.3865 1.3865 0 0 1 -.2527-.024 1.6557 1.6557 0 0 1 -.0361-.337 4.0341 4.0341 0 0 1 1.0228-2.5148 4.1571 4.1571 0 0 1 2.7314-1.4078 1.7815 1.7815 0 0 1 .0361.373 4.1487 4.1487 0 0 1 -.9867 2.587 3.6039 3.6039 0 0 1 -2.5148 1.3236z"></path></svg>
				<p class="text-stone-800 geist-bold">Mac App Store</p>
			</div> -->
		</div>
	</header>
	<section class="px-8 pt-10 sm:pt-40 z-10">
		<div class="flex justify-center mb-4">
			<p class="bg-blue-600/10 text-blue-600 rounded-full text-sm px-3 py-1 border border-stone-200 mb-4 w-fit">For individuals and teams doing research</p>
		</div>
		<h1 class="geist-bold text-3xl sm:text-6xl tracking-tight text-stone-800 leading-tight text-center mb-4"><span class="bg-blue-600/20 text-blue-600 px-3">Highlight</span>, organize, and search your citations in one place</h1>
		<div class="flex justify-center">
			<div class="flex gap-2 w-80">
				<Input placeholder="Insert email" bind:value={email}/>
				<Button
					class="bg-blue-600 hover:bg-blue-700"
					onclick={() => {
						async function sendEmailToDiscord(email: string) {
							const webhookUrl = 'http://localhost:3000/webhook/email';
							
							try {
								const response = await fetch(webhookUrl, {
									method: 'POST',
									headers: {
										'Content-Type': 'application/json'
									},
									body: JSON.stringify({
										email: email,
										website_url: window.location.hostname, // Automatically gets current domain
										// apiKey: 'YOUR_WEBHOOK_API_KEY' // Replace with your API key
									})
								});

								const result = await response.json();
								
								if (response.ok) {
									// console.log('✅ Email sent to Discord successfully');
									return { success: true, data: result };
								} else {
									console.error('❌ Failed to send email:', result.error);
									return { success: false, error: result.error };
								}
							} catch (error) {
								console.error('❌ Network error:', error);
								return { success: false, error: 'Network error' };
							}
						}

						sendEmailToDiscord(email)
					}}
				>
					<span>Join waitlist</span>
				</Button>
			</div>
		</div>
	</section>
	<section class="px-8 sm:py-12 pt-12 md:py-24 lg:py-32 z-10">
		<div class="text-blue-600 flex items-center gap-1 mb-2">
			<div class="h-[7px] w-[20px] rounded-full bg-blue-600"></div>
			<p>Highlight</p>
		</div>
		<h2 class="text-xl sm:text-3xl geist-500 mb-8">Easily highlight important texts <br> from your references</h2>
		<div class="bg-blue-600/20 rounded-2xl px-4 pt-4 h-[500px] hidden sm:block">
			<div class="bg-gray-100 h-full rounded-t grid grid-cols-10">
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
	</section>
	<section class="px-8 pb-12 md:pb-24 lg:pb-32 z-10 flex justify-evenly">
		<div>
			<div class="text-green-600 flex items-center gap-1 mb-2">
				<div class="h-[7px] w-[20px] rounded-full bg-green-600"></div>
				<p>Organize</p>
			</div>
			<h2 class="text-xl sm:text-3xl geist-500 mb-8">Organize highlights by tags</h2>
		</div>
		<div>
			<div class="text-purple-600 flex items-center gap-1 mb-2">
				<div class="h-[7px] w-[20px] rounded-full bg-purple-600"></div>
				<p>Search</p>
			</div>
			<h2 class="text-xl sm:text-3xl geist-500 mb-8">Locate your highlights easily with AI</h2>
		</div>
	</section>
	<section id="faq" class="px-8 pb-12 md:pb-24 lg:pb-32 z-10">
		<div class="flex items-center gap-1 mb-2">
			<div class="h-[7px] w-[20px] rounded-full bg-black"></div>
			<p>FAQ</p>
		</div>
		<Accordion multiple={true}>
			<AccordionItem>
				<span slot="header">Is EagleCite free?</span>
				<p slot="content">Yes, EagleCite is free for offline, individual use. This means you can download and use the app on your device, and all your research data, snippets, and notes will be stored locally on that device. <br><br> However, if you wish to collaborate with other researchers online and utilize EagleCite's cloud-based features, there will be a subscription fee. Details on pricing plans for online collaboration will be announced soon.</p>
			</AccordionItem>
			<AccordionItem>
				<span slot="header">What is EagleCite?</span>
				<p slot="content">EagleCite is a dedicated application designed to help researchers effectively manage and organize the most valuable snippets of information found within research papers. While existing reference management tools often focus on high-level citation organization, EagleCite takes it a step further by allowing you to capture, categorize, and easily access specific pieces of information - the "aha!" moments, key data points, or insightful arguments - that are crucial to your work. <br><br> As researchers ourselves, we understand the challenge of keeping track of these vital bits of information. EagleCite aims to streamline this process, ensuring that the valuable details you discover are readily available whenever you need them for your projects, papers, or presentations.</p>
			</AccordionItem>
			<AccordionItem>
				<span slot="header">Is it a desktop app?</span>
				<p slot="content">The free version of the app is a desktop app.</p>
			</AccordionItem>
			<AccordionItem>
				<span slot="header">What is EagleCite's Pricing?</span>
				<p slot="content">To be announce</p>
			</AccordionItem>
			<AccordionItem>
				<span slot="header">Are there any discounts?</span>
				<p slot="content">For students! Contact us for more detail.</p>
			</AccordionItem>
		</Accordion>
	</section>
	<!-- Footer -->
	<footer class="bg-background flex items-center justify-center border-t py-6 z-10">
		<p class="text-muted-foreground text-xs">
			&copy; {new Date().getFullYear()} EagleCite. All rights reserved.
		</p>
	</footer>
</div>
