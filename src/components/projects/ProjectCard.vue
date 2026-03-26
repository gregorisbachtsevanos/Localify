<script setup lang="ts">
import { computed } from "vue";
import type { Project, ProjectStats } from "@/types";
import { languageService } from "@/services/languageService";
import ProgressBar from "@/components/ui/ProgressBar.vue";
import AppBadge from "@/components/ui/AppBadge.vue";

const props = defineProps<{
  project: Project;
  stats?: ProjectStats;
}>();

const emit = defineEmits<{
  edit: [project: Project];
  delete: [project: Project];
}>();

const languages = computed(() =>
  languageService.getByCodeSync(props.project.languages),
);

const overallCompletion = computed(() => {
  if (!props.stats || props.project.languages.length === 0) return 0;
  const langs = props.project.languages.filter(
    (l) => l !== props.project.defaultLanguage,
  );
  if (langs.length === 0) return 100;
  const avg =
    langs.reduce((sum, lang) => sum + (props.stats!.completion[lang] ?? 0), 0) /
    langs.length;
  return Math.round(avg);
});

const completionColor = computed(() => {
  if (overallCompletion.value >= 80) return "success";
  if (overallCompletion.value >= 40) return "warning";
  return "danger";
});

const totalMissing = computed(() => {
  if (!props.stats) return 0;
  return Object.values(props.stats.missingCount).reduce((a, b) => a + b, 0);
});
</script>

<template>
  <div
    class="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-200 flex flex-col gap-4"
  >
    <!-- Header -->
    <div class="flex items-start justify-between gap-2">
      <div class="flex items-center gap-3 min-w-0">
        <!-- Color dot / project icon -->
        <div
          class="flex items-center justify-center w-10 h-10 rounded-lg shrink-0 text-white font-bold text-sm"
          :style="{ backgroundColor: project.color }"
        >
          {{ project.name.charAt(0).toUpperCase() }}
        </div>
        <div class="min-w-0">
          <RouterLink
            :to="`/projects/${project.id}`"
            class="block font-semibold text-slate-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-colors truncate"
          >
            {{ project.name }}
          </RouterLink>
          <p class="text-xs text-slate-500 dark:text-slate-400 truncate">
            {{ project.slug }}
          </p>
        </div>
      </div>

      <!-- Actions (show on hover) -->
      <div
        class="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
      >
        <button
          @click.stop="emit('edit', project)"
          type="button"
          class="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          title="Edit project"
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
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
            />
          </svg>
        </button>
        <button
          @click.stop="emit('delete', project)"
          type="button"
          class="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950 transition-colors"
          title="Delete project"
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
        </button>
      </div>
    </div>

    <!-- Description -->
    <p
      class="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed"
    >
      {{ project.description || "No description" }}
    </p>

    <!-- Language flags -->
    <div class="flex items-center gap-1.5 flex-wrap">
      <span
        v-for="lang in languages"
        :key="lang.code"
        :title="lang.name"
        class="text-lg leading-none cursor-default select-none"
        >{{ lang.flag }}</span
      >
      <AppBadge size="sm" class="ml-1"
        >{{ project.languages.length }} lang{{
          project.languages.length !== 1 ? "s" : ""
        }}</AppBadge
      >
    </div>

    <!-- Progress -->
    <div v-if="stats">
      <div class="flex items-center justify-between mb-1.5">
        <span class="text-xs text-slate-500 dark:text-slate-400"
          >Translation progress</span
        >
        <span
          class="text-xs font-semibold"
          :class="
            overallCompletion >= 80
              ? 'text-emerald-600 dark:text-emerald-400'
              : overallCompletion >= 40
                ? 'text-amber-600 dark:text-amber-400'
                : 'text-rose-600 dark:text-rose-400'
          "
        >
          {{ overallCompletion }}%
        </span>
      </div>
      <ProgressBar
        :value="overallCompletion"
        :color="completionColor"
        size="sm"
      />
      <div class="flex items-center justify-between mt-1.5">
        <span class="text-xs text-slate-400 dark:text-slate-500"
          >{{ stats.totalKeys }} keys</span
        >
        <span
          v-if="totalMissing > 0"
          class="text-xs text-rose-500 dark:text-rose-400"
          >{{ totalMissing }} missing</span
        >
        <span v-else class="text-xs text-emerald-500 dark:text-emerald-400"
          >All translated</span
        >
      </div>
    </div>
  </div>
</template>
