import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { Toast } from "@/types";

let toastIdCounter = 0;

export const useUiStore = defineStore("ui", () => {
  const isDarkMode = ref(false);
  const isSidebarCollapsed = ref(false);
  const toasts = ref<Toast[]>([]);

  function initDarkMode() {
    const stored = localStorage.getItem("localify_dark_mode");
    if (stored !== null) {
      isDarkMode.value = stored === "true";
    } else {
      isDarkMode.value = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;
    }
  }

  function toggleDarkMode() {
    isDarkMode.value = !isDarkMode.value;
    localStorage.setItem("localify_dark_mode", String(isDarkMode.value));
  }

  function toggleSidebar() {
    isSidebarCollapsed.value = !isSidebarCollapsed.value;
  }

  function addToast(options: Omit<Toast, "id">) {
    const id = `toast-${++toastIdCounter}`;
    const toast: Toast = { id, duration: 4000, ...options };
    toasts.value.push(toast);
    setTimeout(() => removeToast(id), toast.duration);
  }

  function removeToast(id: string) {
    const index = toasts.value.findIndex((t) => t.id === id);
    if (index >= 0) toasts.value.splice(index, 1);
  }

  const activeToasts = computed(() => toasts.value);

  return {
    isDarkMode,
    isSidebarCollapsed,
    toasts,
    activeToasts,
    initDarkMode,
    toggleDarkMode,
    toggleSidebar,
    addToast,
    removeToast,
  };
});
