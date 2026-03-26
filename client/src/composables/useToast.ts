import { useUiStore } from "@/stores/uiStore";
import type { Toast } from "@/types";

export function useToast() {
  const uiStore = useUiStore();

  function success(message: string, title?: string) {
    uiStore.addToast({ type: "success", message, title });
  }

  function error(message: string, title?: string) {
    uiStore.addToast({ type: "error", message, title: title ?? "Error" });
  }

  function warning(message: string, title?: string) {
    uiStore.addToast({ type: "warning", message, title });
  }

  function info(message: string, title?: string) {
    uiStore.addToast({ type: "info", message, title });
  }

  function add(options: Omit<Toast, "id">) {
    uiStore.addToast(options);
  }

  return { success, error, warning, info, add };
}
