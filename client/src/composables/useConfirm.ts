import { ref } from 'vue'

export function useConfirm() {
  const isOpen = ref(false)
  const message = ref('')
  const title = ref('')
  let resolvePromise: ((value: boolean) => void) | null = null

  function confirm(msg: string, ttl = 'Are you sure?'): Promise<boolean> {
    message.value = msg
    title.value = ttl
    isOpen.value = true
    return new Promise(resolve => {
      resolvePromise = resolve
    })
  }

  function onConfirm() {
    isOpen.value = false
    resolvePromise?.(true)
  }

  function onCancel() {
    isOpen.value = false
    resolvePromise?.(false)
  }

  return { isOpen, message, title, confirm, onConfirm, onCancel }
}
