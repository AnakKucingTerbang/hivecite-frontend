<script lang="ts">
	import type { PageProps } from './$types';
	import { Dot, BookCopy, Plus } from 'lucide-svelte';
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';

	let { data }: PageProps = $props();
	let activePage: string | null = $state(null);
</script>

<div class="min-h-full grow rounded-tl-md bg-gray-100 p-4">
	<div class="flex items-center justify-between">
		<div class="flex gap-3">
			<button
				class="w-fit cursor-pointer rounded-full border-1 px-6 py-2 hover:border-blue-600 hover:text-blue-600 {activePage ===
				'papers'
					? 'border-blue-600 bg-white text-blue-600'
					: 'border-transparent bg-white'}"
				onclick={() => {
					activePage = 'papers';
				}}
			>
				Papers
			</button>
			<button
				class="w-fit cursor-pointer rounded-full border-1 px-6 py-2 hover:border-blue-600 hover:text-blue-600 {activePage ===
				'highlights'
					? 'border-blue-600 bg-white text-blue-600'
					: 'border-transparent bg-white'}"
				onclick={() => {
					activePage = 'highlights';
				}}
			>
				Highlights
			</button>
		</div>
		<div class="flex gap-2">
			<Input placeholder="Search paper" />
			<Button class="bg-blue-600">
				<Plus />
				<p>Add paper</p>
			</Button>
		</div>
	</div>
	<div class="flex flex-col gap-3 pt-4">
		<div class="rounded-lg border-1 border-gray-200 bg-white">
			<div class="p-3">
				<p class="bold">Understanding the Ethical Implications of AI in Healthcare</p>
				<div class="flex items-center pt-2 text-sm text-gray-500">
					<p>Johnson et al.</p>
					<Dot />
					<p>2023</p>
				</div>
				<div class="flex justify-between pt-6">
					<div class="flex items-center gap-2 text-sm">
						<div class="h-[6px] w-[6px] rounded-full bg-blue-600"></div>
						<p>2 Highlights</p>
					</div>
					<div
						class="flex w-fit items-center gap-2 rounded-md bg-blue-100 px-3 py-1 text-sm text-blue-600"
					>
						<BookCopy size={18} />
						<p>2 Projects</p>
					</div>
				</div>
			</div>
			<div class="flex border-t-1 border-gray-200">
				<button
					class="flex grow cursor-pointer justify-center border-r-1 border-gray-200 p-2 text-sm"
					onclick={() => {
						console.log('click');
					}}
				>
					<p>View Highlights</p>
				</button>
				<a href="/dashboard/{data.slug}/article" class="flex grow">
					<button
						class="flex grow cursor-pointer justify-center p-2 text-sm text-blue-600"
						onclick={() => {
							console.log('click');
						}}
					>
						<p>Open PDF</p>
					</button>
				</a>
			</div>
		</div>
        <button class="rounded-lg border-1 border-dashed border-gray-200 bg-white p-6 flex items-center justify-center flex-col cursor-pointer">
            <div class="mb-5 rounded-full bg-blue-200">
				<Plus color="blue" class="m-4"/>
            </div>
			<h3 class="text-2xl font-medium">Add Paper</h3>
            <p class="text-gray-500">Upload or import new research paper</p>
		</button>
	</div>
</div>
