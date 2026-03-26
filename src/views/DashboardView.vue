<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
import { useProjectStore } from "@/stores/projectStore";
import { useTranslationStore } from "@/stores/translationStore";
import type { Project, ProjectFormData, ProjectStats } from "@/types";
import ProjectCard from "@/components/projects/ProjectCard.vue";
import ProjectForm from "@/components/projects/ProjectForm.vue";
import SkeletonCard from "@/components/ui/SkeletonCard.vue";
import AppButton from "@/components/ui/AppButton.vue";

const projectStore = useProjectStore();
const translationStore = useTranslationStore();

const showForm = ref(false);
const editTarget = ref<Project | null>(null);
const statsMap = ref<Record<string, ProjectStats>>({});

onMounted(async () => {
  await projectStore.fetchProjects();
  // Load stats for each project
  for (const project of projectStore.projects) {
    await translationStore.refreshForProject(project.id);
    statsMap.value[project.id] = translationStore.getProjectStats(
      project.languages,
    );
  }
});

function openCreate() {
  editTarget.value = null;
  showForm.value = true;
}

function openEdit(project: Project) {
  editTarget.value = project;
  showForm.value = true;
}

async function handleFormSubmit(data: ProjectFormData) {
  if (editTarget.value) {
    await projectStore.updateProject(editTarget.value.id, data);
  } else {
    await projectStore.createProject(data);
  }
  showForm.value = false;
}

async function handleDelete(project: Project) {
  if (
    window.confirm(`Delete project "${project.name}"? This cannot be undone.`)
  ) {
    await projectStore.deleteProject(project.id);
  }
}

const sortedProjects = computed(() =>
  [...projectStore.projects].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
  ),
);
</script>

<template>
  <div class="max-w-7xl mx-auto">
    <!-- Page header -->
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-2xl font-bold text-slate-900 dark:text-white">
          Projects
        </h1>
        <p class="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          Manage all your localization projects
        </p>
      </div>
      <AppButton @click="openCreate">
        <svg
          class="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
        New Project
      </AppButton>
    </div>

    <!-- Loading skeletons -->
    <div
      v-if="projectStore.isLoading"
      class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4"
    >
      <SkeletonCard v-for="i in 4" :key="i" />
    </div>

    <!-- Empty state -->
    <div
      v-else-if="sortedProjects.length === 0"
      class="flex flex-col items-center justify-center py-24 text-center"
    >
      <div
        class="w-16 h-16 bg-primary-50 dark:bg-primary-950 rounded-2xl flex items-center justify-center mb-4"
      >
        <svg
          class="w-8 h-8 text-primary-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="1.5"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
          />
        </svg>
      </div>
      <h2 class="text-xl font-semibold text-slate-900 dark:text-white mb-2">
        No projects yet
      </h2>
      <p class="text-slate-500 dark:text-slate-400 mb-6 max-w-sm">
        Create your first localization project to start managing translations.
      </p>
      <AppButton @click="openCreate">Create First Project</AppButton>
    </div>

    <!-- Projects grid -->
    <div
      v-else
      class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4"
    >
      <ProjectCard
        v-for="project in sortedProjects"
        :key="project.id"
        :project="project"
        :stats="statsMap[project.id]"
        @edit="openEdit"
        @delete="handleDelete"
      />
    </div>

    <!-- Project form modal -->
    <ProjectForm
      v-model="showForm"
      :project="editTarget"
      @submit="handleFormSubmit"
    />
  </div>
</template>
