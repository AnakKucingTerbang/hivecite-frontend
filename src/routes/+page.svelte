<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import Accordion from '$lib/components/ui/accordion/Accordion.svelte';
	import AccordionItem from '$lib/components/ui/accordion/AccordionItem.svelte';
	import MobileNotification from '$lib/components/ui/mobile-notification/MobileNotification.svelte';
	import { onMount } from 'svelte';
	import { Highlighter, ThumbsUp, MessagesSquare, CircleCheck } from 'lucide-svelte';
	import { Snippet } from '$lib/components/ui/snippet';
    import logo from '$lib/assets/logo.png';
	import { dev } from '$app/environment';

    let snippets = $state<any>({})
    let tempText = $state<string>("")
    let previewFilePromise = $state<any>()
	let email = $state<string>("");
    let selectedTags = $state<any>([]);
    let searchTerm = $state<string>("");

	let isSubmitting = $state<boolean>(false);
	let feedbackMessage = $state<string>('');
	let feedbackType = $state<string>(''); // 'success', 'error', or 'validation'

    const citations = [
        {
            id: 1,
            text: "According to Smith (2023), climate change has accelerated in the past decade",
            source: "Smith, J. (2023). Environmental Trends in the 21st Century",
            tags: ["climate", "environment", "recent", "statistics"]
        },
        {
            id: 2,
            text: "Johnson et al. (2022) argue that renewable energy adoption is crucial for sustainability",
            source: "Johnson, M., Lee, K., & Brown, S. (2022). Renewable Energy Solutions",
            tags: ["renewable energy", "sustainability", "policy", "recent"]
        },
        {
            id: 3,
            text: "The economic impact of technology, as noted by Davis (2021), cannot be understated",
            source: "Davis, R. (2021). Digital Economy and Society",
            tags: ["economics", "technology", "society", "impact"]
        },
        {
            id: 4,
            text: "Williams (2020) demonstrates that educational reforms have shown mixed results",
            source: "Williams, A. (2020). Education Policy Analysis",
            tags: ["education", "policy", "analysis", "reform"]
        },
        {
            id: 5,
            text: "Healthcare accessibility remains a challenge, according to Thompson (2023)",
            source: "Thompson, L. (2023). Public Health Systems",
            tags: ["healthcare", "accessibility", "public health", "recent"]
        }
    ];

    // Get all unique tags
    let allTags = $derived([...new Set(citations.flatMap(citation => citation.tags))]);

    let filteredCitations = $derived(citations.filter(citation => {
        const matchesSearch = citation.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            citation.source.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesTags = selectedTags.length === 0 || 
                        selectedTags.every((tag: string) => citation.tags.includes(tag));
        return matchesSearch && matchesTags;
    }));

    function toggleTag(tag: string) {
        if (selectedTags.includes(tag)) {
            selectedTags = selectedTags.filter((t: string) => t !== tag);
        } else {
            selectedTags = [...selectedTags, tag];
        }
    }

    function clearAllTags() {
        selectedTags = [];
    }

    function isValidEmail(email: string) {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email.trim());
	}

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

    // onMount(async () => {
	// 	await sleep(500);
    //     // @ts-ignore
    //     var adobeDCView = new AdobeDC.View({clientId: `${dev ? "079678ae12b548aa9e0719f7a9eea4a2": "e8df376e9ae849cc9b50c8cb04e494d3"}`, divId: "adobe-dc-view"});
    //     previewFilePromise = adobeDCView.previewFile(
    //         {
    //             content:   {location: {url: "https://arxiv.org/pdf/1706.03762"}},
    //             metaData:  {fileName: "Attention Is All You Need.pdf", id: "77c6fa5d-6d74-4104-8349-657c8411a834"}
    //         },
    //         {
    //             enableAnnotationAPIs: true,
    //             enableFilePreviewEvents: true,
    //             enableAnnotationEvents: true,
    //         }
    //     );

    //     previewFilePromise.then((adobeViewer: any) => {
	// 		adobeViewer.getAPIs().then((apis: any) => {
    //             apis.getZoomAPIs().zoomIn()
    //             apis.getZoomAPIs().zoomIn()
    //             apis.getZoomAPIs().zoomIn()
    //             apis.getZoomAPIs().zoomIn()
    //     	});
    //         adobeViewer.getAnnotationManager().then((annotationManager: any) => {
    //             annotationManager.registerEventListener(
    //                 function(event: any) {
    //                     if (event.type === "PREVIEW_SELECTION_END") {
    //                         setTimeout(() => {
    //                             adobeViewer.getAPIs().then((apis: any) => {
    //                             apis.getSelectedContent()
    //                                 .then((result: any) => {
    //                                     tempText = result.data
    //                                 });
    //                         });
    //                         }, 100)
    //                     } else if (event.type === "ANNOTATION_ADDED") {
    //                         snippets[event.data.id] = {
    //                             text: tempText,
    //                             page: event.data.target.selector.node.index + 1
    //                         }
    //                         tempText = ""
    //                     } else if (event.type === "ANNOTATION_CLICKED") {
    //                     }
    //                 },
    //                 {
    //                     listenOn: ["ANNOTATION_ADDED", "ANNOTATION_CLICKED", "PREVIEW_SELECTION_END"]
    //                 }
    //             );
    //         });
    //     })
	// });
</script>

<div class="flex min-h-screen flex-col relative">
	<div id="circuit-board"></div>
	<MobileNotification />
	<!-- Header Section -->
	<header class="flex justify-between py-5 px-8 z-10">
		<div class="flex items-center gap-2">
            <div class="rounded-lg">
                <img alt="The project logo" class="rounded-md aspect-square h-[30px]" src={logo} />
            </div>
			<p class="geist-bold text-lg text-stone-800">Eagle Cite</p>
		</div>
		<div class="flex gap-10 items-center text-stone-800">
			<a href="#faq" class="group flex items-center gap-2 cursor-pointer hover:bg-stone-100 pr-0 px-5 sm:pr-4 py-4 rounded-2xl transition duration-300">
				<MessagesSquare class="group-hover:-rotate-12 transition duration-300"/>
				<p class="geist-bold">FAQs</p>
			</a>
		</div>
	</header>
	<section class="px-8 pt-10 sm:pt-40 z-10 flex justify-center">
        <div class="lg:max-w-5xl">
            <div class="flex justify-center mb-4">
                <p class="bg-blue-600/10 text-blue-600 rounded-full text-sm px-3 py-1 border border-stone-200 mb-4 w-fit">For individuals and teams doing research</p>
            </div>
            <h1 class="geist-bold text-3xl sm:text-6xl tracking-tight text-stone-800 leading-tight text-center mb-4"><span class="bg-blue-600/20 text-blue-600 px-3">Highlight</span>, organize, and search your citations in one place</h1>
            <div class="flex items-center flex-col">
                {#if feedbackType === 'success'}
                    <!-- Success state - replaces input and button -->
                    <div class="w-fit self-center">
                        <div class="flex justify-center gap-3 items-center text-green-600 bg-green-50 border border-green-200 rounded-lg px-6 py-3 mb-[2px]">
                            <!-- <div class="text-2xl mb-2">✅</div> -->
                                <ThumbsUp />
                            <div>
                                <p class="text-green-800 text-sm font-medium mb-1">Successfully joined!</p>
                                <p class="text-green-600 text-xs">{feedbackMessage}</p>
                            </div>
                        </div>
                    </div>
                {:else}
                    <div class="flex gap-2 w-80">
                        <Input 
                            placeholder="Insert email" 
                            bind:value={email}
                            class={feedbackType === 'validation' || feedbackType === 'error' ? 'border-red-500 focus:border-red-500' : ''}
                            disabled={isSubmitting}
                        />
                        <Button
                            class="bg-blue-600 hover:bg-blue-700"
                            onclick={() => {
                                async function handleJoinWaitlist() {
                                    // Reset feedback
                                    feedbackMessage = '';
                                    feedbackType = '';

                                    // Validate email
                                    if (!email.trim()) {
                                        feedbackMessage = 'Please enter your email address.';
                                        feedbackType = 'validation';
                                        return;
                                    }

                                    if (!isValidEmail(email)) {
                                        feedbackMessage = 'Please enter a valid email address.';
                                        feedbackType = 'validation';
                                        return;
                                    }

                                    isSubmitting = true;

                                    try {
                                        const response = await fetch('https://listybot.com/api/external/email', {
                                            method: 'POST',
                                            headers: {
                                                'Content-Type': 'application/json'
                                            },
                                            body: JSON.stringify({
                                                email: email.trim(),
                                                // apiKey: 'YOUR_WEBHOOK_API_KEY' // Replace with your API key
                                            })
                                        });

                                        const result = await response.json();
                                        
                                        if (response.ok) {
                                            feedbackMessage = 'We\'ll be in touch soon.';
                                            feedbackType = 'success';
                                            email = ''; // Clear the input field
                                        } else {
                                            feedbackMessage = 'Something went wrong. Please try again later.';
                                            feedbackType = 'error';
                                        }
                                    } catch (error) {
                                        feedbackMessage = 'Something went wrong. Please check your connection and try again.';
                                        feedbackType = 'error';
                                    } finally {
                                        isSubmitting = false;
                                        clearFeedback();
                                    }
                                }
        
                                handleJoinWaitlist()
                            }}
                        >
                            <span>{isSubmitting ? 'Joining...' : 'Join waitlist'}</span>
                        </Button>
                    </div>
                    <!-- Error text below input - fixed height to prevent layout shift -->
                    <div class="h-6 mt-1">
                        {#if feedbackMessage && (feedbackType === 'validation' || feedbackType === 'error')}
                            <p class="text-red-500 text-sm">
                                {feedbackMessage}
                            </p>
                        {/if}
                    </div>
                {/if}
            </div>
        </div>
	</section>
	<section class="px-8 sm:py-12 pt-12 md:py-24 lg:py-32 z-10 flex justify-center">
        <div class="lg:max-w-7xl">
            <div class="text-blue-600 flex items-center gap-1 mb-2 justify-center sm:justify-start">
                <div class="h-[7px] w-[20px] rounded-full bg-blue-600"></div>
                <p>Highlight</p>
            </div>
            <h2 class="text-xl sm:text-3xl geist-500 mb-8 text-center sm:text-left">Easily highlight important texts <br> from your references</h2>
            <div class="bg-blue-600/20 rounded-2xl px-4 pt-4 h-[500px] hidden sm:block">
                <div class="bg-gray-100 h-full rounded-t grid grid-cols-10">
                    <div class="p-2 h-full col-span-7">
                        <div id="adobe-dc-view" class="rounded-md h-full"></div>
                    </div>
                    <div id="scroll" class="overflow-auto p-2 col-span-3">
                        {#if Object.keys(snippets).length === 0}
                            <div class="border-2 border-dashed border-gray-300 h-full px-3 flex items-center justify-center text-center text-xs gap-2 text-stone-500 flex-col">
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
	</section>
    <section class="px-8 pb-12 sm:py-12 pt-12 md:py-24 lg:py-32 z-10 flex justify-center">
        <div class="lg:max-w-7xl">
            <div class="text-green-600 flex items-center gap-1 mb-2 justify-center sm:justify-start">
                <div class="h-[7px] w-[20px] rounded-full bg-green-600"></div>
                <p>Organize & Search</p>
            </div>
            <h2 class="text-xl sm:text-3xl geist-500 mb-1 text-center block sm:hidden">Organize highlights by tags and locate <br> your highlights easily with AI</h2>
            <h2 class="text-xl sm:text-3xl geist-500 mb-1 text-center sm:text-left hidden sm:block">Organize highlights by tags and locate your highlights easily with AI<span class="hidden sm:inline">*</span></h2>
            <p class="mb-8 italic text-sm hidden sm:block">AI feature is not available in demo mode</p>
            <div class="bg-blue-600/20 rounded-2xl px-4 pt-4 h-[500px] hidden sm:block">
                <div class="mb-6 space-y-4 bg-gray-100 rounded-t-md p-3 h-full overflow-auto">
                    <!-- Search -->
                    <div class="max-w-md">
                        <input
                            type="text"
                            placeholder="Search citations..."
                            bind:value={searchTerm}
                            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                        />
                    </div>

                    <!-- Tag Filters -->
                    <div class="bg-white p-4 rounded-lg border border-gray-200">
                        <div class="flex items-center gap-2 mb-3">
                            <span class="font-medium text-gray-700 text-sm">Filter by tags:</span>
                            {#if selectedTags.length > 0}
                            <button
                                onclick={clearAllTags}
                                class="text-xs text-blue-500 hover:text-blue-700 underline cursor-pointer"
                            >
                                Clear all
                            </button>
                            {/if}
                        </div>
                        <div class="flex flex-wrap gap-2">
                            {#each allTags as tag}
                            <button
                                onclick={() => toggleTag(tag)}
                                class="inline-block px-3 py-1 rounded-md text-sm font-medium cursor-pointer transition-colors border
                                {selectedTags.includes(tag) 
                                    ? 'bg-blue-500 text-white border-blue-500' 
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-300'}"
                            >
                                {tag}
                            </button>
                            {/each}
                        </div>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {#each filteredCitations as citation (citation.id)}
                        <div class="bg-white p-5 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                            <div class="flex items-start gap-2 mb-3">
                            <svg class="w-4 h-4 text-gray-500 mt-1 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
                                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
                            </svg>
                            <p class="text-sm text-gray-800 leading-relaxed">{citation.text}</p>
                            </div>
                            <p class="text-xs text-gray-600 mb-3 font-medium">{citation.source}</p>
                            <div class="flex flex-wrap gap-1">
                            {#each citation.tags as tag}
                                <button
                                onclick={() => toggleTag(tag)}
                                class="inline-block px-2 py-1 rounded text-xs font-medium cursor-pointer transition-colors
                                    {selectedTags.includes(tag)
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}"
                                >
                                {tag}
                                </button>
                            {/each}
                            </div>
                        </div>
                        {/each}
                    </div>
                </div>
            </div>
        </div>
	</section>
	<section id="pricing" class="px-8 pb-12 sm:py-12 pt-12 md:py-24 lg:py-32 z-10 flex justify-center">
        <div class="min-w-full xl:min-w-7xl xl:max-w-7xl">
            <div class="flex items-center gap-1 mb-2 text-orange-600">
                <div class="h-[7px] w-[20px] rounded-full bg-orange-600"></div>
                <p>Pricing</p>
            </div>
            <h2 class="text-xl sm:text-3xl geist-500 mb-1 text-center sm:text-left hidden sm:block mb-8">New accounts get <span class="underline text-blue-600">14 day free trial</span>, no credit card required</h2>
			<div class="grid grid-cols-3 gap-3">
				<div class="grow bg-white border border-gray-100 rounded-lg p-4 flex flex-col shadow-md">
					<div>
						<div class="text-lg font-semibold">Trainee</div>
						<p class="text-sm">Best for students</p>
					</div>
					<div class="my-6">
						<div class="text-3xl font-bold">$5.99<span class="text-sm font-normal">/month</span></div>
					</div>
					<div class="flex flex-col gap-3">
						<div class="flex gap-2 items-center">
							<CircleCheck class="text-green-600 w-5 h-5" />
							<p>10GB of storage space</p>
						</div>
						<div class="flex gap-2 items-center">
							<CircleCheck class="text-green-600 w-5 h-5" />
							<p>1000 AI search per month</p>
						</div>
					</div>
					<Button
						class="mt-8 bg-blue-600 hover:bg-blue-700"
						onclick={() => {

						}}
					>
						Start for Free
					</Button>
				</div>
				<div class="grow bg-white border border-gray-100 rounded-lg p-4 flex flex-col shadow-md">
					<div>
						<div class="text-lg font-semibold">Researcher</div>
						<p class="text-sm">Best for faculty members and professors</p>
					</div>
					<div class="my-6">
						<div class="text-3xl font-bold">$14.99<span class="text-sm font-normal">/month</span></div>
					</div>
					<div class="flex flex-col gap-3">
						<div class="flex gap-2 items-center">
							<CircleCheck class="text-green-600 w-5 h-5" />
							<p>Unlimited storage space</p>
						</div>
						<div class="flex gap-2 items-center">
							<CircleCheck class="text-green-600 w-5 h-5" />
							<p>Unlimited AI search</p>
						</div>
					</div>
					<Button
						class="mt-8 bg-blue-600 hover:bg-blue-700"
						onclick={() => {
							
						}}
					>
						Start for Free
					</Button>
				</div>
				<div class="grow bg-white border border-gray-100 rounded-lg p-4 flex flex-col shadow-md">
					<div>
						<div class="text-lg font-semibold">Labs / Departments / Institutions</div>
						<p class="text-sm">Best for bulk plans</p>
					</div>
					<div class="my-6">
						<div class="text-3xl font-bold">Contact us</div>
					</div>
					<div class="flex flex-col gap-3">
						<div class="flex gap-2 items-center">
							<CircleCheck class="text-green-600 w-5 h-5" />
							<p>Unlimited storage space</p>
						</div>
						<div class="flex gap-2 items-center">
							<CircleCheck class="text-green-600 w-5 h-5" />
							<p>Unlimited AI search</p>
						</div>
					</div>
					<Button
						class="mt-8 bg-blue-600 hover:bg-blue-700"
						onclick={() => {
							
						}}
					>
						Start for Free
					</Button>
				</div>
			</div>
        </div>
	</section>
	<section id="faq" class="px-8 pb-12 sm:py-12 pt-12 md:py-24 lg:py-32 z-10 flex justify-center">
        <div class="min-w-full xl:min-w-7xl xl:max-w-7xl">
            <div class="flex items-center gap-1 mb-2 text-purple-600">
                <div class="h-[7px] w-[20px] rounded-full bg-purple-600"></div>
                <p>FAQ</p>
            </div>
            <Accordion multiple={true}>
                <AccordionItem>
                    <span slot="header">What is Eagle Cite?</span>
                    <p slot="content">Eagle Cite is a dedicated application designed to help researchers effectively manage and organize the most valuable snippets of information found within research papers. While existing reference management tools often focus on high-level citation organization, Eagle Cite takes it a step further by allowing you to capture, categorize, and easily access specific pieces of information - the "aha!" moments, key data points, or insightful arguments - that are crucial to your work. <br><br> As researchers ourselves, we understand the challenge of keeping track of these vital bits of information. Eagle Cite aims to streamline this process, ensuring that the valuable details you discover are readily available whenever you need them for your projects, papers, or presentations.</p>
                </AccordionItem>
				<AccordionItem>
                    <span slot="header">What makes Eagle Cite different than other citation manager?</span>
                    <p slot="content">Eagle Cite prioritize what researchers actually need most: <span class="font-bold">efficient annotation management and intuitive discovery of your resources.</span> While other citation managers focus on storage and organization, we've designed our interface specifically around helping you find and work with your highlights, notes, and annotations quickly. Our streamlined UI eliminates clutter and makes searching through your research as natural as browsing your favorite app.</p>
                </AccordionItem>
				<AccordionItem>
                    <span slot="header">What is AI search?</span>
                    <p slot="content">AI search is Eagle Cite's intelligent research assistant. Instead of remembering exact keywords or phrases, you can simply describe what you're looking for in natural language—like "studies about social media impact on teenagers" or "that quote about climate change solutions."</p>
                </AccordionItem>
                <AccordionItem>
                    <span slot="header">When will Eagle Cite be fully released?</span>
                    <p slot="content">Signup for our waitlist on the top to get the latest update!</p>
                </AccordionItem>
            </Accordion>
        </div>
	</section>
	<!-- Footer -->
	<footer class="bg-background flex justify-center border-t py-6 z-10">
		<p class="text-muted-foreground text-xs">
			&copy; {new Date().getFullYear()} Eagle Cite. All rights reserved.
		</p>
	</footer>
</div>