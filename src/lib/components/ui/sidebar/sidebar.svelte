<script lang="ts">
	import { Folder, Settings, PanelRightOpen, Library, Highlighter } from 'lucide-svelte';
	import { page } from '$app/state';
</script>

<div class="flex flex-col bg-white h-full">
	<div class="p-4 flex justify-between items-center">
		<h1 class="text-xl font-bold text-blue-600">EagleCite</h1>
		<!-- <PanelRightOpen size={18} class="cursor-pointer text-gray-400"/> -->
	</div>
	<div class="px-4 py-2 h-full overflow-auto">
		<a href="/dashboard/research-project">
			<div class="mb-1 rounded-md">
				<button
					class="flex w-full cursor-pointer items-center px-3 py-2 text-left hover:rounded-md hover:bg-blue-50 hover:text-blue-600 {page.url.pathname.includes("research-project") ? 'bg-blue-50 text-blue-600 rounded-md' : ''}"
				>
					<Folder class="mr-2" />
					<span class="truncate">Research Projects</span>
				</button>
			</div>
		</a>
		<a href="/dashboard/library">
			<div class="mb-1 rounded-md">
				<button
					class="flex w-full cursor-pointer items-center px-3 py-2 text-left hover:rounded-md hover:bg-blue-50 hover:text-blue-600 {page.url.pathname.includes("library") ? 'bg-blue-50 text-blue-600 rounded-md' : ''}"
					onclick={() => {}}
				>
					<Library class="mr-2" />
					<span class="truncate">Library</span>
				</button>
			</div>
		</a>
		<a href="/dashboard/annotation">
			<div class="mb-1 rounded-md">
				<button
					class="flex w-full cursor-pointer items-center px-3 py-2 text-left hover:rounded-md hover:bg-blue-50 hover:text-blue-600 {page.url.pathname.includes("annotation") ? 'bg-blue-50 text-blue-600 rounded-md' : ''}"
					onclick={() => {}}
				>
					<Highlighter class="mr-2" />
					<span class="truncate">Annotations</span>
				</button>
			</div>
		</a>
	</div>
	<a href="/setting" class="mt-auto border-t border-gray-200 p-4 cursor-pointer hover:bg-gray-200">
		<div class="flex items-center gap-3">
			<Settings />
			<p>Settings</p>
		</div>
	</a>
</div>
