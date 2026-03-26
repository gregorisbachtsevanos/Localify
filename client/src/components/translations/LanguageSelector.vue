<script setup lang="ts">
import { ref, computed } from "vue";
import type { Language } from "@/types";

const props = defineProps<{
  languages: Language[];
  selected: string[];
  defaultLanguage: string;
}>();

const emit = defineEmits<{
  "update:selected": [value: string[]];
}>();

function toggle(code: string) {
  if (code === props.defaultLanguage) return;
  const current = [...props.selected];
  const idx = current.indexOf(code);
  if (idx >= 0) {
    if (current.length <= 1) return;
    current.splice(idx, 1);
  } else {
    current.push(code);
  }
  emit("update:selected", current);
}

function selectAll() {
  emit(
    "update:selected",
    props.languages.map((l) => l.code),
  );
}

function selectNone() {
  emit("update:selected", [props.defaultLanguage]);
}
</script>

<template>
  <div class="flex items-center gap-2 flex-wrap">
    <span
      class="text-xs font-medium text-slate-500 dark:text-slate-400 shrink-0"
      >Languages:</span
    >
    <div class="flex items-center gap-1.5 flex-wrap">
      <button
        v-for="lang in languages"
        :key="lang.code"
        @click="toggle(lang.code)"
        type="button"
        :disabled="lang.code === defaultLanguage"
        :title="`${lang.name} (${lang.code})`"
        :class="[
          'flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-medium transition-all',
          selected.includes(lang.code)
            ? 'bg-primary-50 dark:bg-primary-950 border-primary-300 dark:border-primary-700 text-primary-700 dark:text-primary-300'
            : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-600',
          lang.code === defaultLanguage
            ? 'opacity-80 cursor-default'
            : 'cursor-pointer',
        ]"
      >
        <span>{{ lang.flag }}</span>
        <span>{{ lang.code.toUpperCase() }}</span>
        <span
          v-if="lang.code === defaultLanguage"
          class="text-primary-400 text-xs"
          >(default)</span
        >
      </button>
    </div>
    <div class="flex items-center gap-1 ml-auto">
      <button
        @click="selectAll"
        type="button"
        class="text-xs text-slate-500 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors px-1"
      >
        All
      </button>
      <span class="text-slate-300 dark:text-slate-600">·</span>
      <button
        @click="selectNone"
        type="button"
        class="text-xs text-slate-500 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors px-1"
      >
        Default only
      </button>
    </div>
  </div>
</template>
