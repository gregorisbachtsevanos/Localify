import { ref, watch } from 'vue'

export function useLocalStorage<T>(key: string, defaultValue: T) {
  function read(): T {
    try {
      const stored = localStorage.getItem(key)
      return stored !== null ? JSON.parse(stored) : defaultValue
    } catch {
      return defaultValue
    }
  }

  const value = ref<T>(read()) as { value: T }

  watch(
    () => value.value,
    newVal => {
      try {
        localStorage.setItem(key, JSON.stringify(newVal))
      } catch {
        // ignore storage errors
      }
    },
    { deep: true }
  )

  function reset() {
    value.value = defaultValue
    localStorage.removeItem(key)
  }

  return { value, reset }
}
