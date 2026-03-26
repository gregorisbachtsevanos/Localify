<script setup lang="ts">
import { ref, computed, watch } from "vue";
import type { Project, ProjectFormData } from "@/types";
import { AVAILABLE_LANGUAGES } from "@/data/mockData";
import AppModal from "@/components/ui/AppModal.vue";
import AppButton from "@/components/ui/AppButton.vue";

const props = defineProps<{
  modelValue: boolean;
  project?: Project | null;
}>();

const emit = defineEmits<{
  "update:modelValue": [value: boolean];
  submit: [data: ProjectFormData];
}>();

const DEFAULT_FORM: ProjectFormData = {
  name: "",
  description: "",
  defaultLanguage: "en",
  languages: ["en"],
};

const form = ref<ProjectFormData>({ ...DEFAULT_FORM });
const errors = ref<Partial<Record<keyof ProjectFormData, string>>>({});

const isEditing = computed(() => !!props.project);
const title = computed(() =>
  isEditing.value ? "Edit Project" : "New Project",
);

watch(
  () => props.modelValue,
  (open) => {
    if (open) {
      if (props.project) {
        form.value = {
          name: props.project.name,
          description: props.project.description,
          defaultLanguage: props.project.defaultLanguage,
          languages: [...props.project.languages],
        };
      } else {
        form.value = { ...DEFAULT_FORM };
      }
      errors.value = {};
    }
  },
);

function validate(): boolean {
  errors.value = {};
  if (!form.value.name.trim()) {
    errors.value.name = "Project name is required";
  } else if (form.value.name.length > 60) {
    errors.value.name = "Name must be 60 characters or less";
  }
  if (form.value.languages.length === 0) {
    errors.value.languages = "Select at least one language";
  }
  if (!form.value.languages.includes(form.value.defaultLanguage)) {
    form.value.languages = [
      form.value.defaultLanguage,
      ...form.value.languages,
    ];
  }
  return Object.keys(errors.value).length === 0;
}

function handleSubmit() {
  if (!validate()) return;
  emit("submit", { ...form.value });
}

function toggleLanguage(code: string) {
  const idx = form.value.languages.indexOf(code);
  if (idx >= 0) {
    if (code === form.value.defaultLanguage) return; // can't remove default
    form.value.languages = form.value.languages.filter((l) => l !== code);
  } else {
    form.value.languages = [...form.value.languages, code];
  }
}

function setDefaultLanguage(code: string) {
  form.value.defaultLanguage = code;
  if (!form.value.languages.includes(code)) {
    form.value.languages = [code, ...form.value.languages];
  }
}
</script>

<template>
  <AppModal
    :model-value="modelValue"
    @update:model-value="emit('update:modelValue', $event)"
    :title="title"
    size="lg"
  >
    <form @submit.prevent="handleSubmit" class="space-y-5">
      <!-- Name -->
      <div>
        <label
          class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"
        >
          Project Name <span class="text-rose-500">*</span>
        </label>
        <input
          v-model="form.name"
          type="text"
          placeholder="e.g. Marketing Website"
          maxlength="60"
          :class="[
            'w-full rounded-lg border px-3 py-2 text-sm bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-colors',
            errors.name
              ? 'border-rose-400 focus:ring-rose-400/30'
              : 'border-slate-300 dark:border-slate-600 focus:border-primary-400 focus:ring-primary-400/20',
          ]"
        />
        <p
          v-if="errors.name"
          class="mt-1 text-xs text-rose-600 dark:text-rose-400"
        >
          {{ errors.name }}
        </p>
      </div>

      <!-- Description -->
      <div>
        <label
          class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"
        >
          Description
        </label>
        <textarea
          v-model="form.description"
          placeholder="What is this project about?"
          rows="2"
          class="w-full rounded-lg border border-slate-300 dark:border-slate-600 px-3 py-2 text-sm bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:border-primary-400 focus:ring-primary-400/20 transition-colors resize-none"
        ></textarea>
      </div>

      <!-- Languages -->
      <div>
        <label
          class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
        >
          Languages <span class="text-rose-500">*</span>
        </label>
        <div
          class="grid grid-cols-3 gap-1.5 max-h-52 overflow-y-auto pr-1 scrollbar-thin"
        >
          <button
            v-for="lang in AVAILABLE_LANGUAGES"
            :key="lang.code"
            type="button"
            @click="toggleLanguage(lang.code)"
            :class="[
              'flex items-center gap-2 px-2.5 py-2 rounded-lg border text-xs font-medium transition-all text-left',
              form.languages.includes(lang.code)
                ? 'border-primary-400 dark:border-primary-500 bg-primary-50 dark:bg-primary-950 text-primary-700 dark:text-primary-300'
                : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800',
            ]"
          >
            <span class="text-base">{{ lang.flag }}</span>
            <span class="truncate">{{ lang.name }}</span>
            <span
              v-if="lang.code === form.defaultLanguage"
              class="ml-auto text-xs text-primary-500 dark:text-primary-400 font-semibold"
              >✓</span
            >
          </button>
        </div>
        <p
          v-if="errors.languages"
          class="mt-1 text-xs text-rose-600 dark:text-rose-400"
        >
          {{ errors.languages }}
        </p>
      </div>

      <!-- Default language -->
      <div>
        <label
          class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"
        >
          Default Language
        </label>
        <select
          :value="form.defaultLanguage"
          @change="
            setDefaultLanguage(($event.target as HTMLSelectElement).value)
          "
          class="w-full rounded-lg border border-slate-300 dark:border-slate-600 px-3 py-2 text-sm bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:border-primary-400 focus:ring-primary-400/20 transition-colors"
        >
          <option
            v-for="lang in AVAILABLE_LANGUAGES.filter((l) =>
              form.languages.includes(l.code),
            )"
            :key="lang.code"
            :value="lang.code"
          >
            {{ lang.flag }} {{ lang.name }}
          </option>
        </select>
      </div>
    </form>

    <template #footer>
      <AppButton variant="secondary" @click="emit('update:modelValue', false)"
        >Cancel</AppButton
      >
      <AppButton @click="handleSubmit">
        {{ isEditing ? "Save Changes" : "Create Project" }}
      </AppButton>
    </template>
  </AppModal>
</template>
