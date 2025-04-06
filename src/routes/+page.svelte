<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Github, BookOpen, Tag, Search, Cloud, Code } from 'lucide-svelte'; // Assuming lucide-svelte is installed or similar icons are available
</script>

<div class="flex flex-col min-h-screen">
	<!-- Hero Section -->
	<section class="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
		<div class="container px-4 md:px-6 mx-auto">
			<div class="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
				<div class="flex flex-col justify-center space-y-4">
					<div class="space-y-2">
						<h1 class="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
							Streamline Your Research with HiveCite
						</h1>
						<p class="max-w-[600px] text-primary-foreground/80 md:text-xl">
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
	<section id="features" class="w-full py-12 md:py-24 lg:py-32 bg-background">
		<div class="container px-4 md:px-6 mx-auto">
			<div class="flex flex-col items-center justify-center space-y-4 text-center">
				<div class="space-y-2">
					<div class="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Key Features</div>
					<h2 class="text-3xl font-bold tracking-tighter sm:text-5xl">
						Manage Citations Like Never Before
					</h2>
					<p class="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
						HiveCite offers powerful tools designed specifically for researchers, students, and
						academics to enhance their workflow.
					</p>
				</div>
			</div>
			<div
				class="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3 lg:max-w-none mt-12"
			>
				<div class="grid gap-1 text-center md:text-left">
                    <div class="flex justify-center md:justify-start mb-2"><BookOpen class="h-8 w-8 text-primary" /></div>
					<h3 class="text-xl font-bold">Intelligent Highlighting</h3>
					<p class="text-sm text-muted-foreground">
						Directly highlight text within research papers (PDFs, web articles) and save them
						instantly.
					</p>
				</div>
				<div class="grid gap-1 text-center md:text-left">
                    <div class="flex justify-center md:justify-start mb-2"><Tag class="h-8 w-8 text-primary" /></div>
					<h3 class="text-xl font-bold">Tagging System</h3>
					<p class="text-sm text-muted-foreground">
						Organize your highlights with custom tags for easy categorization and retrieval.
					</p>
				</div>
				<div class="grid gap-1 text-center md:text-left">
                    <div class="flex justify-center md:justify-start mb-2"><Search class="h-8 w-8 text-primary" /></div>
					<h3 class="text-xl font-bold">Powerful Search</h3>
					<p class="text-sm text-muted-foreground">
						Quickly find specific highlights using free-text search across your entire library.
					</p>
				</div>
                <div class="grid gap-1 text-center md:text-left">
                    <div class="flex justify-center md:justify-start mb-2"><Cloud class="h-8 w-8 text-primary" /></div>
                    <h3 class="text-xl font-bold">Cloud Integration</h3>
                    <p class="text-sm text-muted-foreground">
                        Connects seamlessly with your Google Drive and OneDrive accounts to access your papers.
                    </p>
                </div>
                <div class="grid gap-1 text-center md:text-left">
                    <div class="flex justify-center md:justify-start mb-2"><Code class="h-8 w-8 text-primary" /></div>
                    <h3 class="text-xl font-bold">Open Source</h3>
                    <p class="text-sm text-muted-foreground">
                        HiveCite is open source! Contribute, inspect the code, or host it yourself.
                    </p>
                </div>
                 <div class="grid gap-1 text-center md:text-left">
                    <div class="flex justify-center md:justify-start mb-2"><Github class="h-8 w-8 text-primary" /></div>
                    <h3 class="text-xl font-bold">Easy Referencing</h3>
                    <p class="text-sm text-muted-foreground">
                        Effortlessly reference your stored highlights directly within your research papers. (Feature coming soon!)
                    </p>
                </div>
			</div>
		</div>
	</section>

	<!-- Comparison Section -->
	<section id="compare" class="w-full py-12 md:py-24 lg:py-32 bg-muted">
		<div class="container px-4 md:px-6 mx-auto">
			<div class="flex flex-col items-center justify-center space-y-4 text-center mb-12">
				<div class="space-y-2">
					<h2 class="text-3xl font-bold tracking-tighter sm:text-5xl">How HiveCite Compares</h2>
					<p class="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
						See how HiveCite stacks up against other popular research management tools.
					</p>
				</div>
			</div>
			<div class="overflow-x-auto">
				<table class="w-full min-w-[600px] text-left border-collapse">
					<thead>
						<tr class="border-b">
							<th class="p-4 font-medium text-muted-foreground">Feature</th>
							<th class="p-4 font-medium text-center text-primary">HiveCite</th>
							<th class="p-4 font-medium text-center text-muted-foreground">Zotero</th>
							<th class="p-4 font-medium text-center text-muted-foreground">EndNote</th>
							<th class="p-4 font-medium text-center text-muted-foreground">Anara</th>
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
    <footer class="flex items-center justify-center py-6 border-t bg-background">
        <p class="text-xs text-muted-foreground">&copy; {new Date().getFullYear()} HiveCite. All rights reserved.</p>
    </footer>
</div>
