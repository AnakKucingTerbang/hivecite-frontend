<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Github, BookOpen, Tag, Search, Cloud, Code } from 'lucide-svelte'; // Assuming lucide-svelte is installed or similar icons are available
</script>

<div class="flex min-h-screen flex-col">
	<!-- Hero Section -->
	<section
		class="from-primary to-primary/80 text-primary-foreground w-full bg-gradient-to-r py-12 md:py-24 lg:py-32 xl:py-48"
	>
		<div class="container mx-auto px-4 md:px-6">
			<div class="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
				<div class="flex flex-col justify-center space-y-4">
					<div class="space-y-2">
						<h1 class="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
							Streamline Your Research with HiveCite
						</h1>
						<p class="text-primary-foreground/80 max-w-[600px] md:text-xl">
							Tired of losing track of crucial insights in research papers? HiveCite helps you
							highlight, organize, and reference key information effortlessly, so you can focus on
							writing.
						</p>
					</div>
					<div class="flex flex-col gap-2 min-[400px]:flex-row">
						<Button size="lg" href="/auth">Get Started</Button>
						<Button size="lg" variant="secondary" href="#features">Learn More</Button>
					</div>
				</div>
				<!-- Placeholder for an image or illustration -->
				<div class="flex items-center justify-center">
					<!-- <img
						src="/placeholder.svg"
						alt="Hero Illustration"
						class="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square bg-muted"
						width="550"
						height="550"
					/> -->
				</div>
			</div>
		</div>
	</section>

	<!-- Features Section -->
	<section id="features" class="bg-background w-full py-12 md:py-24 lg:py-32">
		<div class="container mx-auto px-4 md:px-6">
			<div class="flex flex-col items-center justify-center space-y-4 text-center">
				<div class="space-y-2">
					<div class="bg-muted inline-block rounded-lg px-3 py-1 text-sm">Key Features</div>
					<h2 class="text-3xl font-bold tracking-tighter sm:text-5xl">
						Manage Citations Like Never Before
					</h2>
					<p
						class="text-muted-foreground max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed"
					>
						HiveCite offers powerful tools designed specifically for researchers, students, and
						academics to enhance their workflow.
					</p>
				</div>
			</div>
			<div
				class="mx-auto mt-12 grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:max-w-none lg:grid-cols-3"
			>
				<div class="grid gap-1 text-center md:text-left">
					<div class="mb-2 flex justify-center md:justify-start">
						<BookOpen class="text-primary h-8 w-8" />
					</div>
					<h3 class="text-xl font-bold">Intelligent Highlighting</h3>
					<p class="text-muted-foreground text-sm">
						Directly highlight text within research papers (PDFs, web articles) and save them
						instantly.
					</p>
				</div>
				<div class="grid gap-1 text-center md:text-left">
					<div class="mb-2 flex justify-center md:justify-start">
						<Tag class="text-primary h-8 w-8" />
					</div>
					<h3 class="text-xl font-bold">Tagging System</h3>
					<p class="text-muted-foreground text-sm">
						Organize your highlights with custom tags for easy categorization and retrieval.
					</p>
				</div>
				<div class="grid gap-1 text-center md:text-left">
					<div class="mb-2 flex justify-center md:justify-start">
						<Search class="text-primary h-8 w-8" />
					</div>
					<h3 class="text-xl font-bold">Powerful Search</h3>
					<p class="text-muted-foreground text-sm">
						Quickly find specific highlights using free-text search across your entire library.
					</p>
				</div>
				<div class="grid gap-1 text-center md:text-left">
					<div class="mb-2 flex justify-center md:justify-start">
						<Cloud class="text-primary h-8 w-8" />
					</div>
					<h3 class="text-xl font-bold">Cloud Integration</h3>
					<p class="text-muted-foreground text-sm">
						Connects seamlessly with your Google Drive and OneDrive accounts to access your papers.
					</p>
				</div>
				<div class="grid gap-1 text-center md:text-left">
					<div class="mb-2 flex justify-center md:justify-start">
						<Code class="text-primary h-8 w-8" />
					</div>
					<h3 class="text-xl font-bold">Open Source</h3>
					<p class="text-muted-foreground text-sm">
						HiveCite is open source! Contribute, inspect the code, or host it yourself.
					</p>
				</div>
				<div class="grid gap-1 text-center md:text-left">
					<div class="mb-2 flex justify-center md:justify-start">
						<Github class="text-primary h-8 w-8" />
					</div>
					<h3 class="text-xl font-bold">Easy Referencing</h3>
					<p class="text-muted-foreground text-sm">
						Effortlessly reference your stored highlights directly within your research papers.
						(Feature coming soon!)
					</p>
				</div>
			</div>
		</div>
	</section>

	<!-- Comparison Section -->
	<section id="compare" class="bg-muted w-full py-12 md:py-24 lg:py-32">
		<div class="container mx-auto px-4 md:px-6">
			<div class="mb-12 flex flex-col items-center justify-center space-y-4 text-center">
				<div class="space-y-2">
					<h2 class="text-3xl font-bold tracking-tighter sm:text-5xl">How HiveCite Compares</h2>
					<p
						class="text-muted-foreground max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed"
					>
						See how HiveCite stacks up against other popular research management tools.
					</p>
				</div>
			</div>
			<div class="overflow-x-auto">
				<table class="w-full min-w-[600px] border-collapse text-left">
					<thead>
						<tr class="border-b">
							<th class="text-muted-foreground p-4 font-medium">Feature</th>
							<th class="text-primary p-4 text-center font-medium">HiveCite</th>
							<th class="text-muted-foreground p-4 text-center font-medium">Zotero</th>
							<th class="text-muted-foreground p-4 text-center font-medium">EndNote</th>
							<th class="text-muted-foreground p-4 text-center font-medium">Anara</th>
						</tr>
					</thead>
					<tbody>
						<tr class="border-b">
							<td class="p-4">Direct PDF Highlighting & Saving</td>
							<td class="p-4 text-center text-green-500">✔</td>
							<td class="p-4 text-center">Partial</td>
							<td class="p-4 text-center">✔</td>
							<td class="p-4 text-center">✖</td>
						</tr>
						<tr class="border-b">
							<td class="p-4">Advanced Tagging System</td>
							<td class="p-4 text-center text-green-500">✔</td>
							<td class="p-4 text-center">✔</td>
							<td class="p-4 text-center">Basic</td>
							<td class="p-4 text-center">✔</td>
						</tr>
						<tr class="border-b">
							<td class="p-4">Google Drive / OneDrive Sync</td>
							<td class="p-4 text-center text-green-500">✔</td>
							<td class="p-4 text-center">Via Plugin</td>
							<td class="p-4 text-center">✔</td>
							<td class="p-4 text-center">✖</td>
						</tr>
						<tr class="border-b">
							<td class="p-4">Open Source</td>
							<td class="p-4 text-center text-green-500">✔</td>
							<td class="p-4 text-center text-green-500">✔</td>
							<td class="p-4 text-center">✖</td>
							<td class="p-4 text-center">✖</td>
						</tr>
						<tr>
							<td class="p-4">Price</td>
							<td class="p-4 text-center">Free (OSS)</td>
							<td class="p-4 text-center">Free</td>
							<td class="p-4 text-center">Paid</td>
							<td class="p-4 text-center">Freemium</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</section>

	<!-- Footer -->
	<footer class="bg-background flex items-center justify-center border-t py-6">
		<p class="text-muted-foreground text-xs">
			&copy; {new Date().getFullYear()} HiveCite. All rights reserved.
		</p>
	</footer>
</div>
