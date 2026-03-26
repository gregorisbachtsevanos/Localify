<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useProjectStore } from "@/stores/projectStore";
import { useTranslationStore } from "@/stores/translationStore";
import { languageService } from "@/services/languageService";
import type { Project, ProjectFormData, Language } from "@/types";
import TranslationTable from "@/components/translations/TranslationTable.vue";
import ProjectForm from "@/components/projects/ProjectForm.vue";
import ProgressBar from "@/components/ui/ProgressBar.vue";
import AppBadge from "@/components/ui/AppBadge.vue";
import AppButton from "@/components/ui/AppButton.vue";

const route = useRoute();
const router = useRouter();
const projectStore = useProjectStore();
const translationStore = useTranslationStore();

const projectId = computed(() => route.params.id as string);
const project = computed(() => projectStore.getProjectById(projectId.value));
const languages = ref<Language[]>([]);
const showEditForm = ref(false);
const isDeleting = ref(false);

onMounted(async () => {
  if (projectStore.projects.length === 0) {
    await projectStore.fetchProjects();
  }
  if (!project.value) {
    router.replace("/");
    return;
  }
  languages.value = languageService.getByCodeSync(project.value.languages);
  await translationStore.loadForProject(projectId.value);
});

watch(project, async (p) => {
  if (p) {
    languages.value = languageService.getByCodeSync(p.languages);
  }
});

const stats = computed(() => {
  if (!project.value) return null;
  return translationStore.getProjectStats(project.value.languages);
});

const overallCompletion = computed(() => {
  if (!stats.value || !project.value) return 0;
  const langs = project.value.languages.filter(
    (l) => l !== project.value!.defaultLanguage,
  );
  if (langs.length === 0) return 100;
  const avg =
    langs.reduce((sum, lang) => sum + (stats.value!.completion[lang] ?? 0), 0) /
    langs.length;
  return Math.round(avg);
});

async function handleEditSubmit(data: ProjectFormData) {
  await projectStore.updateProject(projectId.value, data);
  showEditForm.value = false;
  // Refresh languages
  if (project.value) {
    languages.value = languageService.getByCodeSync(project.value.languages);
    await translationStore.refreshForProject(projectId.value);
  }
}

async function handleDelete() {
  if (!project.value) return;
  if (
    window.confirm(
      `Delete project "${project.value.name}"? All keys and translations will be lost.`,
    )
  ) {
    isDeleting.value = true;
    await projectStore.deleteProject(projectId.value);
    router.replace("/");
  }
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
</script>

<template>
  <div class="max-w-full">
    <!-- Loading -->
    <div
      v-if="projectStore.isLoading || !project"
      class="flex items-center justify-center py-20"
    >
      <svg
        class="w-8 h-8 animate-spin text-primary-400"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        />
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
        />
      </svg>
    </div>

    <template v-else>
      <!-- Project header -->
      <div class="flex items-start justify-between gap-4 mb-6">
        <div class="flex items-center gap-4 min-w-0">
          <!-- Color indicator -->
          <div
            class="flex items-center justify-center w-12 h-12 rounded-xl text-white text-lg font-bold shrink-0"
            :style="{ backgroundColor: project.color }"
          >
            {{ project.name.charAt(0) }}
          </div>
          <div class="min-w-0">
            <h1
              class="text-2xl font-bold text-slate-900 dark:text-white truncate"
            >
              {{ project.name }}
            </h1>
            <p
              v-if="project.description"
              class="text-sm text-slate-500 dark:text-slate-400 mt-0.5 truncate"
            >
              {{ project.description }}
            </p>
          </div>
        </div>

        <div class="flex items-center gap-2 shrink-0">
          <AppButton variant="outline" @click="showEditForm = true" size="sm">
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
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z"
              />
            </svg>
            Edit
          </AppButton>
          <AppButton
            variant="ghost"
            @click="handleDelete"
            :loading="isDeleting"
            size="sm"
            class="text-rose-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950"
          >
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
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
            Delete
          </AppButton>
        </div>
      </div>

      <!-- Stats cards -->
      <div v-if="stats" class="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        <!-- Overall completion -->
        <div
          class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4"
        >
          <p class="text-xs text-slate-500 dark:text-slate-400 mb-1">
            Overall Progress
          </p>
          <p class="text-2xl font-bold text-slate-900 dark:text-white mb-2">
            {{ overallCompletion }}%
          </p>
          <ProgressBar
            :value="overallCompletion"
            :color="
              overallCompletion >= 80
                ? 'success'
                : overallCompletion >= 40
                  ? 'warning'
                  : 'danger'
            "
          />
        </div>

        <!-- Keys -->
        <div
          class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4"
        >
          <p class="text-xs text-slate-500 dark:text-slate-400 mb-1">
            Total Keys
          </p>
          <p class="text-2xl font-bold text-slate-900 dark:text-white">
            {{ stats.totalKeys }}
          </p>
          <p class="text-xs text-slate-400 dark:text-slate-500 mt-1">
            {{ translationStore.namespaces.length }} namespace{{
              translationStore.namespaces.length !== 1 ? "s" : ""
            }}
          </p>
        </div>

        <!-- Languages -->
        <div
          class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4"
        >
          <p class="text-xs text-slate-500 dark:text-slate-400 mb-1">
            Languages
          </p>
          <p class="text-2xl font-bold text-slate-900 dark:text-white">
            {{ project.languages.length }}
          </p>
          <p class="text-xs text-slate-400 dark:text-slate-500 mt-1">
            Default: {{ project.defaultLanguage.toUpperCase() }}
          </p>
        </div>

        <!-- Last updated -->
        <div
          class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4"
        >
          <p class="text-xs text-slate-500 dark:text-slate-400 mb-1">
            Last Updated
          </p>
          <p class="text-sm font-semibold text-slate-900 dark:text-white mt-1">
            {{ formatDate(project.updatedAt) }}
          </p>
          <p class="text-xs text-slate-400 dark:text-slate-500 mt-1">
            {{ formatDate(project.createdAt) }} created
          </p>
        </div>
      </div>

      <!-- Per-language progress -->
      <div
        v-if="stats && project.languages.length > 1"
        class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 mb-6"
      >
        <h3
          class="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3"
        >
          Language Coverage
        </h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <div
            v-for="lang in languages"
            :key="lang.code"
            class="flex items-center gap-3"
          >
            <span class="text-xl shrink-0">{{ lang.flag }}</span>
            <div class="flex-1 min-w-0">
              <div class="flex items-center justify-between mb-1">
                <span
                  class="text-xs font-medium text-slate-600 dark:text-slate-400"
                  >{{ lang.name }}</span
                >
                <span
                  class="text-xs tabular-nums font-semibold"
                  :class="
                    (stats.completion[lang.code] ?? 0) >= 80
                      ? 'text-emerald-600 dark:text-emerald-400'
                      : (stats.completion[lang.code] ?? 0) >= 40
                        ? 'text-amber-600 dark:text-amber-400'
                        : 'text-rose-600 dark:text-rose-400'
                  "
                >
                  {{ stats.completion[lang.code] ?? 0 }}%
                </span>
              </div>
              <ProgressBar
                :value="stats.completion[lang.code] ?? 0"
                size="sm"
                :color="
                  (stats.completion[lang.code] ?? 0) >= 80
                    ? 'success'
                    : (stats.completion[lang.code] ?? 0) >= 40
                      ? 'warning'
                      : 'danger'
                "
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Translation table -->
      <TranslationTable
        :project-id="projectId"
        :languages="languages"
        :default-language="project.defaultLanguage"
      />
    </template>

    <!-- Edit form modal -->
    <ProjectForm
      v-if="project"
      v-model="showEditForm"
      :project="project"
      @submit="handleEditSubmit"
    />
  </div>
</template>
