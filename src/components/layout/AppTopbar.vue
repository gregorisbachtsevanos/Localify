<script setup lang="ts">
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useUiStore } from "@/stores/uiStore";
import { useProjectStore } from "@/stores/projectStore";

const route = useRoute();
const router = useRouter();
const uiStore = useUiStore();
const projectStore = useProjectStore();

const breadcrumbs = computed(() => {
  const crumbs: { label: string; to?: string }[] = [
    { label: "Projects", to: "/" },
  ];
  if (route.name === "project-detail") {
    const project = projectStore.getProjectById(route.params.id as string);
    if (project) crumbs.push({ label: project.name });
  } else if (route.name === "settings") {
    crumbs.push({ label: "Settings" });
  }
  return crumbs;
});
</script>

<template>
  <header
    class="flex items-center justify-between px-6 py-3.5 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shrink-0"
  >
    <!-- Breadcrumbs -->
    <nav class="flex items-center gap-1.5 text-sm" aria-label="Breadcrumb">
      <template v-for="(crumb, i) in breadcrumbs" :key="i">
        <span v-if="i > 0" class="text-slate-300 dark:text-slate-600">/</span>
        <RouterLink
          v-if="crumb.to && i < breadcrumbs.length - 1"
          :to="crumb.to"
          class="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
        >
          {{ crumb.label }}
        </RouterLink>
        <span v-else class="font-medium text-slate-900 dark:text-white">{{
          crumb.label
        }}</span>
      </template>
    </nav>

    <!-- Right side actions -->
    <div class="flex items-center gap-3">
      <!-- Dark mode toggle -->
      <button
        @click="uiStore.toggleDarkMode()"
        type="button"
        class="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
        :title="
          uiStore.isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'
        "
      >
        <!-- Sun icon -->
        <svg
          v-if="uiStore.isDarkMode"
          class="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="1.75"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
          />
        </svg>
        <!-- Moon icon -->
        <svg
          v-else
          class="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="1.75"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
          />
        </svg>
      </button>

      <!-- Divider -->
      <div class="h-6 w-px bg-slate-200 dark:bg-slate-700"></div>

      <!-- User avatar placeholder -->
      <div class="flex items-center gap-2.5 cursor-default">
        <div
          class="w-8 h-8 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-xs font-semibold select-none"
        >
          U
        </div>
        <span
          class="text-sm font-medium text-slate-700 dark:text-slate-300 hidden sm:block"
          >User</span
        >
      </div>
    </div>
  </header>
</template>
