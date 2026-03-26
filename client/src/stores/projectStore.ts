import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Project, ProjectFormData, ProjectStats } from '@/types'
import { projectService } from '@/services/projectService'
import { useUiStore } from './uiStore'

export const useProjectStore = defineStore('projects', () => {
  const projects = ref<Project[]>([])
  const isLoading = ref(false)
  const isSaving = ref(false)

  const uiStore = useUiStore()

  async function fetchProjects() {
    isLoading.value = true
    try {
      projects.value = await projectService.getAll()
    } catch (err) {
      uiStore.addToast({ type: 'error', title: 'Error', message: 'Failed to load projects' })
    } finally {
      isLoading.value = false
    }
  }

  async function createProject(data: ProjectFormData): Promise<Project | null> {
    isSaving.value = true
    try {
      const project = await projectService.create(data)
      projects.value.unshift(project)
      uiStore.addToast({ type: 'success', title: 'Project created', message: `"${project.name}" was created successfully` })
      return project
    } catch {
      uiStore.addToast({ type: 'error', title: 'Error', message: 'Failed to create project' })
      return null
    } finally {
      isSaving.value = false
    }
  }

  async function updateProject(id: string, data: Partial<ProjectFormData>): Promise<boolean> {
    isSaving.value = true
    try {
      const updated = await projectService.update(id, data)
      const index = projects.value.findIndex(p => p.id === id)
      if (index >= 0) projects.value[index] = updated
      uiStore.addToast({ type: 'success', title: 'Project updated', message: `"${updated.name}" was updated` })
      return true
    } catch {
      uiStore.addToast({ type: 'error', title: 'Error', message: 'Failed to update project' })
      return false
    } finally {
      isSaving.value = false
    }
  }

  async function deleteProject(id: string): Promise<boolean> {
    try {
      const project = projects.value.find(p => p.id === id)
      await projectService.delete(id)
      projects.value = projects.value.filter(p => p.id !== id)
      uiStore.addToast({ type: 'success', title: 'Project deleted', message: `"${project?.name}" was deleted` })
      return true
    } catch {
      uiStore.addToast({ type: 'error', title: 'Error', message: 'Failed to delete project' })
      return false
    }
  }

  const getProjectById = computed(() => (id: string) => {
    return projects.value.find(p => p.id === id) ?? null
  })

  return {
    projects,
    isLoading,
    isSaving,
    fetchProjects,
    createProject,
    updateProject,
    deleteProject,
    getProjectById
  }
})
