<script setup lang="ts">
import { ref, computed, watch } from "vue";
import type { Translation } from "@/types";

const props = defineProps<{
  keyId: string;
  languageCode: string;
  translation: Translation | null;
  saving: boolean;
  isDefault?: boolean;
}>();

const emit = defineEmits<{
  save: [keyId: string, languageCode: string, value: string];
  delete: [keyId: string, languageCode: string];
}>();

const isEditing = ref(false);
const inputValue = ref(props.translation?.value ?? "");
const inputRef = ref<HTMLTextAreaElement | null>(null);

watch(
  () => props.translation?.value,
  (val) => {
    if (!isEditing.value) {
      inputValue.value = val ?? "";
    }
  },
);

const isEmpty = computed(() => !props.translation?.value?.trim());
const hasValue = computed(() => !!props.translation?.value?.trim());

function startEdit() {
  inputValue.value = props.translation?.value ?? "";
  isEditing.value = true;
  setTimeout(() => inputRef.value?.focus(), 10);
}

function cancelEdit() {
  inputValue.value = props.translation?.value ?? "";
  isEditing.value = false;
}

function handleSave() {
  const trimmed = inputValue.value.trim();
  isEditing.value = false;
  if (trimmed !== (props.translation?.value ?? "")) {
    emit("save", props.keyId, props.languageCode, trimmed);
  }
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    handleSave();
  }
  if (e.key === "Escape") {
    cancelEdit();
  }
}
</script>

<template>
  <div class="relative group/cell h-full">
    <!-- Editing state -->
    <div v-if="isEditing" class="absolute inset-0 z-10 p-1">
      <textarea
        ref="inputRef"
        v-model="inputValue"
        @blur="handleSave"
        @keydown="onKeydown"
        rows="2"
        :class="[
          'w-full h-full resize-none rounded-md border border-primary-400 dark:border-primary-500 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary-400/30 shadow-sm',
        ]"
        :placeholder="`Enter ${languageCode} translation...`"
        :dir="languageCode === 'ar' ? 'rtl' : 'ltr'"
      ></textarea>
    </div>

    <!-- Display state -->
    <div
      v-else
      @click="startEdit"
      :class="[
        'h-full min-h-[52px] px-3 py-2.5 cursor-text rounded transition-colors text-sm',
        saving ? 'opacity-60 pointer-events-none' : '',
        isEmpty
          ? 'bg-rose-50/60 dark:bg-rose-950/30 hover:bg-rose-50 dark:hover:bg-rose-950/50'
          : 'hover:bg-slate-50 dark:hover:bg-slate-800/50',
      ]"
    >
      <!-- Saving spinner -->
      <svg
        v-if="saving"
        class="w-4 h-4 animate-spin text-primary-400 mx-auto mt-1"
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

      <!-- Value -->
      <template v-else>
        <span
          v-if="hasValue"
          class="text-slate-700 dark:text-slate-300 leading-snug block"
          :dir="languageCode === 'ar' ? 'rtl' : 'ltr'"
          >{{ translation!.value }}</span
        >
        <span v-else class="text-rose-400 dark:text-rose-500 text-xs italic"
          >Missing</span
        >

        <!-- Edit pen icon on hover -->
        <svg
          class="absolute top-2 right-2 w-3.5 h-3.5 text-slate-300 dark:text-slate-600 opacity-0 group-hover/cell:opacity-100 transition-opacity pointer-events-none"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
          />
        </svg>
      </template>
    </div>
  </div>
</template>
