<script lang="ts">
    import { Button } from '$lib/components/ui/button';
    import { Github, KeyRound } from 'lucide-svelte'; // Assuming lucide-svelte is installed or similar icons are available
  </script>
  
  <div class="flex flex-col items-center justify-center min-h-screen bg-background">
    <div class="w-full max-w-md p-6 space-y-4 bg-white rounded-lg shadow-md">
      <h2 class="text-2xl font-bold text-center">Sign Up / Log In</h2>
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
            <span class="px-2 bg-white text-gray-500">Or</span>
          </div>
        </div>
        <input
          type="email"
          placeholder="Enter your email"
          class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <Button size="lg" class="w-full">Sign Up / Log In with Email</Button>
      </div>
    </div>
  </div>
  