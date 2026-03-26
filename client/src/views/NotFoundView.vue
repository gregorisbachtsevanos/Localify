<script setup lang="ts">
// 404 view
</script>

<template>
  <div class="flex flex-col items-center justify-center py-24 text-center">
    <p
      class="text-7xl font-black text-slate-200 dark:text-slate-800 mb-4 select-none"
    >
      404
    </p>
    <h1 class="text-2xl font-bold text-slate-900 dark:text-white mb-2">
      Page not found
    </h1>
    <p class="text-slate-500 dark:text-slate-400 mb-8">
      The page you're looking for doesn't exist.
    </p>
    <RouterLink
      to="/"
      class="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium rounded-lg transition-colors"
    >
      <svg
        class="w-4 h-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
        />
      </svg>
      Back to Projects
    </RouterLink>
  </div>
</template>
