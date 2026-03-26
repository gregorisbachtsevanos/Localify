import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { TranslationKey, Translation, KeyFormData, ProjectStats } from '@/types'
import { translationService } from '@/services/translationService'
import { useUiStore } from './uiStore'

export const useTranslationStore = defineStore('translations', () => {
  const keys = ref<TranslationKey[]>([])
  const translations = ref<Translation[]>([])
  const currentProjectId = ref<string | null>(null)
  const isLoading = ref(false)
  const isSaving = ref(false)
  const savingCells = ref<Set<string>>(new Set())

  const uiStore = useUiStore()

  async function loadForProject(projectId: string) {
    if (currentProjectId.value === projectId) return
    isLoading.value = true
    currentProjectId.value = projectId
    try {
      const [loadedKeys, loadedTranslations] = await Promise.all([
        translationService.getKeysForProject(projectId),
        translationService.getTranslationsForProject(projectId)
      ])
      keys.value = loadedKeys
      translations.value = loadedTranslations
    } catch {
      uiStore.addToast({ type: 'error', title: 'Error', message: 'Failed to load translations' })
    } finally {
      isLoading.value = false
    }
  }

  async function refreshForProject(projectId: string) {
    currentProjectId.value = null
    await loadForProject(projectId)
  }

  async function createKey(data: KeyFormData): Promise<TranslationKey | null> {
    if (!currentProjectId.value) return null
    isSaving.value = true
    try {
      const key = await translationService.createKey({ ...data, projectId: currentProjectId.value })
      keys.value.push(key)
      uiStore.addToast({ type: 'success', message: `Key "${key.key}" added` })
      return key
    } catch {
      uiStore.addToast({ type: 'error', title: 'Error', message: 'Failed to create key' })
      return null
    } finally {
      isSaving.value = false
    }
  }

  async function updateKey(id: string, data: Partial<KeyFormData>): Promise<boolean> {
    try {
      const updated = await translationService.updateKey(id, data)
      const index = keys.value.findIndex(k => k.id === id)
      if (index >= 0) keys.value[index] = updated
      uiStore.addToast({ type: 'success', message: 'Key updated' })
      return true
    } catch {
      uiStore.addToast({ type: 'error', title: 'Error', message: 'Failed to update key' })
      return false
    }
  }

  async function deleteKey(id: string): Promise<boolean> {
    try {
      const key = keys.value.find(k => k.id === id)
      await translationService.deleteKey(id)
      keys.value = keys.value.filter(k => k.id !== id)
      translations.value = translations.value.filter(t => t.keyId !== id)
      uiStore.addToast({ type: 'success', message: `Key "${key?.key}" deleted` })
      return true
    } catch {
      uiStore.addToast({ type: 'error', title: 'Error', message: 'Failed to delete key' })
      return false
    }
  }

  async function saveTranslation(keyId: string, languageCode: string, value: string) {
    const cellId = `${keyId}:${languageCode}`
    savingCells.value = new Set(savingCells.value).add(cellId)
    try {
      const updated = await translationService.upsertTranslation(keyId, languageCode, value)
      const index = translations.value.findIndex(t => t.keyId === keyId && t.languageCode === languageCode)
      if (index >= 0) {
        translations.value[index] = updated
      } else {
        translations.value.push(updated)
      }
    } catch {
      uiStore.addToast({ type: 'error', title: 'Error', message: 'Failed to save translation' })
    } finally {
      const next = new Set(savingCells.value)
      next.delete(cellId)
      savingCells.value = next
    }
  }

  const getTranslation = computed(() => (keyId: string, languageCode: string): Translation | null => {
    return translations.value.find(t => t.keyId === keyId && t.languageCode === languageCode) ?? null
  })

  const getTranslationsForKey = computed(() => (keyId: string): Record<string, Translation> => {
    const result: Record<string, Translation> = {}
    translations.value.filter(t => t.keyId === keyId).forEach(t => { result[t.languageCode] = t })
    return result
  })

  const isCellSaving = computed(() => (keyId: string, languageCode: string): boolean => {
    return savingCells.value.has(`${keyId}:${languageCode}`)
  })

  const namespaces = computed(() => {
    return [...new Set(keys.value.map(k => k.namespace))].sort()
  })

  function getProjectStats(languages: string[]): ProjectStats {
    const totalKeys = keys.value.length
    const completion: Record<string, number> = {}
    const missingCount: Record<string, number> = {}

    for (const lang of languages) {
      const translated = translations.value.filter(
        t => t.languageCode === lang && t.value.trim() !== '' && keys.value.some(k => k.id === t.keyId)
      ).length
      missingCount[lang] = totalKeys - translated
      completion[lang] = totalKeys > 0 ? Math.round((translated / totalKeys) * 100) : 0
    }

    return { totalKeys, languages, completion, missingCount }
  }

  return {
    keys,
    translations,
    currentProjectId,
    isLoading,
    isSaving,
    savingCells,
    loadForProject,
    refreshForProject,
    createKey,
    updateKey,
    deleteKey,
    saveTranslation,
    getTranslation,
    getTranslationsForKey,
    isCellSaving,
    namespaces,
    getProjectStats
  }
})
