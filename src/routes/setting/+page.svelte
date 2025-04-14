<script lang="ts">
	import { ArrowLeft, Bot, Lock } from 'lucide-svelte'; // Assuming lucide-svelte is installed or similar icons are available

</script>

<div class="h-screen grid grid-cols-12">
    <div class="col-start-5 col-end-9 mt-7">
        <div class="flex gap-3 items-center">
            <a href="/dashboard" class="bg-gray-100 rounded-full w-12 h-12 flex items-center justify-center">
                <ArrowLeft />
            </a>
            <p class="text-lg">Settings</p>
        </div>
        <div class="border border-gray-200/60 rounded-lg mt-3">
            <div class="flex justify-between p-6 items-center">
                <div class="flex gap-2">
                    <Bot />
                    <p class="text-lg">AI Credentials</p>
                </div>
                <button class="border border-gray-200 px-3 py-1 rounded-lg text-sm cursor-pointer hover:bg-gray-100">How to get API Key</button>
            </div>
            <div class="flex gap-3 px-6 pb-6">
                <div class="bg-gray-50 p-2 rounded-lg grow cursor-not-allowed opacity-60">
                    <p class="text-xs text-gray-400">Provider</p>
                    <div class="flex items-center">
                        <input class="rounded-md py-1 cursor-not-allowed grow text-sm" disabled value="Google Gemini">
                        <Lock size={16}/>
                    </div>
                </div>
                <div class="bg-gray-50 p-2 rounded-lg grow">
                    <p class="text-xs text-gray-400">API Key</p>
                    <input class="rounded-md py-1 grow placeholder:text-gray-400 w-full text-sm focus:outline-none" placeholder="Your api key...">
                </div>
            </div>
        </div>
    </div>
</div>