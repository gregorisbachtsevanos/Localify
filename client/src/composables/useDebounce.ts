import { ref, computed } from "vue";

export function useDebounce<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay = 300,
) {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  function debounced(...args: Parameters<T>) {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  }

  function cancel() {
    if (timeout) clearTimeout(timeout);
  }

  return { debounced, cancel };
}

export function useDebouncedRef(initialValue: string, delay = 300) {
  const value = ref(initialValue);
  const debouncedValue = ref(initialValue);
  let timeout: ReturnType<typeof setTimeout> | null = null;

  function update(newValue: string) {
    value.value = newValue;
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      debouncedValue.value = newValue;
    }, delay);
  }

  return { value, debouncedValue, update };
}
