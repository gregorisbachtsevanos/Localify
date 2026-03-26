<script setup lang="ts">
import { useUiStore } from "@/stores/uiStore";
import AppButton from "@/components/ui/AppButton.vue";

const uiStore = useUiStore();

function clearAllData() {
  if (
    window.confirm(
      "Clear all local data? This will reset all projects and translations to defaults.",
    )
  ) {
    localStorage.removeItem("localify_projects");
    localStorage.removeItem("localify_keys");
    localStorage.removeItem("localify_translations");
    window.location.reload();
  }
}
</script>

<template>
  <div class="max-w-2xl mx-auto">
    <!-- Page header -->
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-slate-900 dark:text-white">
        Settings
      </h1>
      <p class="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
        Manage your workspace preferences
      </p>
    </div>

    <!-- Cards -->
    <div class="space-y-4">
      <!-- Appearance -->
      <div
        class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6"
      >
        <h2 class="text-base font-semibold text-slate-900 dark:text-white mb-4">
          Appearance
        </h2>
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-slate-700 dark:text-slate-300">
              Dark mode
            </p>
            <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Toggle dark theme for the interface
            </p>
          </div>
          <button
            @click="uiStore.toggleDarkMode()"
            type="button"
            :class="[
              'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
              uiStore.isDarkMode
                ? 'bg-primary-600'
                : 'bg-slate-200 dark:bg-slate-700',
            ]"
            role="switch"
            :aria-checked="uiStore.isDarkMode"
          >
            <span
              :class="[
                'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
                uiStore.isDarkMode ? 'translate-x-5' : 'translate-x-0',
              ]"
            ></span>
          </button>
        </div>
      </div>

      <!-- Team (placeholder) -->
      <div
        class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 opacity-70"
      >
        <div class="flex items-start gap-3 mb-4">
          <h2
            class="text-base font-semibold text-slate-900 dark:text-white flex-1"
          >
            Team Management
          </h2>
          <span
            class="text-xs bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800 px-2 py-0.5 rounded-full font-medium"
            >Coming Soon</span
          >
        </div>
        <p class="text-sm text-slate-500 dark:text-slate-400">
          Invite team members, assign roles, and manage permissions for each
          project. This feature will be available in a future release.
        </p>
      </div>

      <!-- Integrations (placeholder) -->
      <div
        class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 opacity-70"
      >
        <div class="flex items-start gap-3 mb-4">
          <h2
            class="text-base font-semibold text-slate-900 dark:text-white flex-1"
          >
            Integrations
          </h2>
          <span
            class="text-xs bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800 px-2 py-0.5 rounded-full font-medium"
            >Coming Soon</span
          >
        </div>
        <p class="text-sm text-slate-500 dark:text-slate-400">
          Connect with GitHub, GitLab, Figma, and export to various i18n formats
          (JSON, YAML, PO files).
        </p>
      </div>

      <!-- Danger zone -->
      <div
        class="bg-white dark:bg-slate-900 border border-rose-200 dark:border-rose-900 rounded-xl p-6"
      >
        <h2
          class="text-base font-semibold text-rose-700 dark:text-rose-400 mb-4"
        >
          Danger Zone
        </h2>
        <div class="flex items-center justify-between gap-4">
          <div>
            <p class="text-sm font-medium text-slate-700 dark:text-slate-300">
              Reset all data
            </p>
            <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Clear localStorage and revert to default mock data. This action
              cannot be undone.
            </p>
          </div>
          <AppButton
            variant="danger"
            size="sm"
            @click="clearAllData"
            class="shrink-0"
          >
            Reset Data
          </AppButton>
        </div>
      </div>
    </div>

    <!-- About -->
    <div class="mt-8 text-center text-xs text-slate-400 dark:text-slate-600">
      <p class="font-semibold text-slate-500 dark:text-slate-500 mb-1">
        Localify v0.1.0
      </p>
      <p>
        A lightweight localization platform built with Vue 3, Pinia & Tailwind
        CSS.
      </p>
    </div>
  </div>
</template>
