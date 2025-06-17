<script>
  import { onMount } from 'svelte';
  
  let showNotification = false;
  let isVisible = false;

  function isMobile() {
    const userAgent = navigator.userAgent.toLowerCase();
    const mobileKeywords = ['mobile', 'android', 'iphone', 'ipad', 'ipod', 'blackberry', 'windows phone'];
    const hasMobileKeyword = mobileKeywords.some(keyword => userAgent.includes(keyword));
    
    const isSmallScreen = window.innerWidth <= 768;
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    return hasMobileKeyword || (isSmallScreen && isTouchDevice);
  }

  function closeNotification() {
    isVisible = false;
    setTimeout(() => {
      showNotification = false;
    }, 300);
  }

  onMount(() => {
    if (isMobile()) {
      showNotification = true;
      setTimeout(() => {
        isVisible = true;
      }, 100);
    }
  });
</script>

{#if showNotification}
  <div 
    class="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 transition-all duration-300"
    class:opacity-0={!isVisible}
    class:invisible={!isVisible}
    class:opacity-100={isVisible}
    class:visible={isVisible}
    on:click={closeNotification}
    role="dialog"
    aria-modal="true"
    aria-labelledby="notification-title"
    tabindex="1"
  >
    <div 
      class="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-sm w-full transform transition-transform duration-300 p-6"
      class:translate-y-4={!isVisible}
      class:translate-y-0={isVisible}
      on:click|stopPropagation
    >
      <div class="text-center space-y-4">
        <h3 id="notification-title" class="text-lg font-medium text-gray-900 dark:text-white">
          Best experienced on desktop
        </h3>
        <div class="space-y-1">
          <p class="text-sm text-gray-600 dark:text-gray-400">
            Full demo and features available on larger screens.
          </p>
        </div>
        <button 
          class="w-full bg-blue-600 dark:bg-white text-white dark:text-gray-900 py-2.5 px-4 rounded-md text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          on:click={closeNotification}
        >
          Continue anyway
        </button>
      </div>
    </div>
  </div>
{/if}