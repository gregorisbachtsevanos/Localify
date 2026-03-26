<script setup lang="ts">
import AppSidebar from "./AppSidebar.vue";
import AppTopbar from "./AppTopbar.vue";
import { useUiStore } from "@/stores/uiStore";

const uiStore = useUiStore();
</script>

<template>
  <div
    class="flex h-screen overflow-hidden bg-slate-50 dark:bg-slate-950 transition-colors duration-200"
  >
    <AppSidebar />
    <div
      class="flex flex-col flex-1 min-w-0 overflow-hidden transition-all duration-200"
    >
      <AppTopbar />
      <main class="flex-1 overflow-auto p-6 scrollbar-thin">
        <RouterView />
      </main>
    </div>
  </div>
</template>
