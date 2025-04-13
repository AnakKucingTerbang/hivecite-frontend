<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Github, KeyRound } from 'lucide-svelte'; // Assuming lucide-svelte is installed or similar icons are available
</script>

<div class="bg-background flex min-h-screen flex-col items-center justify-center">
	<div class="w-full max-w-md space-y-4 rounded-lg bg-white p-6 shadow-md">
		<h2 class="text-center text-2xl font-bold">Sign Up / Log In</h2>
		<div class="flex flex-col space-y-4">
			<Button size="lg" variant="outline" class="flex items-center justify-center space-x-2">
				<KeyRound class="h-5 w-5" />
				<span>Continue with Google</span>
			</Button>
			<Button size="lg" variant="outline" class="flex items-center justify-center space-x-2">
				<KeyRound class="h-5 w-5" />
				<span>Continue with Microsoft</span>
			</Button>
			<Button size="lg" variant="outline" class="flex items-center justify-center space-x-2">
				<Github class="h-5 w-5" />
				<span>Continue with GitHub</span>
			</Button>
			<div class="relative">
				<div class="absolute inset-0 flex items-center">
					<div class="w-full border-t border-gray-300"></div>
				</div>
				<div class="relative flex justify-center text-sm">
					<span class="bg-white px-2 text-gray-500">Or</span>
				</div>
			</div>
			<input
				type="email"
				placeholder="Enter your email"
				class="focus:ring-primary w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:outline-none"
			/>
			<Button size="lg" class="w-full">Sign Up / Log In with Email</Button>
		</div>
	</div>
</div>
