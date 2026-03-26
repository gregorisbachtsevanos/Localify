<script setup lang="ts">
defineProps<{
  rows?: number;
}>();
</script>

<template>
  <div
    class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 animate-pulse"
  >
    <div class="flex items-start justify-between mb-4">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 bg-slate-200 dark:bg-slate-700 rounded-lg"></div>
        <div>
          <div
            class="h-4 w-36 bg-slate-200 dark:bg-slate-700 rounded mb-2"
          ></div>
          <div class="h-3 w-24 bg-slate-100 dark:bg-slate-800 rounded"></div>
        </div>
      </div>
      <div class="h-6 w-16 bg-slate-100 dark:bg-slate-800 rounded-full"></div>
    </div>
    <div class="h-3 w-full bg-slate-100 dark:bg-slate-800 rounded mb-1.5"></div>
    <div class="h-3 w-3/4 bg-slate-100 dark:bg-slate-800 rounded mb-4"></div>
    <div class="h-2 w-full bg-slate-200 dark:bg-slate-700 rounded-full"></div>
  </div>
</template>
