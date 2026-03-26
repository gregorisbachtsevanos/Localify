<script setup lang="ts">
import { onMounted } from "vue";
import { RouterView } from "vue-router";
import { useUiStore } from "@/stores/uiStore";
import AppToast from "@/components/ui/AppToast.vue";

const uiStore = useUiStore();

onMounted(() => {
  uiStore.initDarkMode();
});
</script>

<template>
  <div :class="{ dark: uiStore.isDarkMode }">
    <RouterView />
    <AppToast />
  </div>
</template>
