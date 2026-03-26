<script setup lang="ts">
import { ref, watch } from "vue";
import type { KeyFormData } from "@/types";
import AppModal from "@/components/ui/AppModal.vue";
import AppButton from "@/components/ui/AppButton.vue";

const props = defineProps<{
  modelValue: boolean;
  namespaces: string[];
}>();

const emit = defineEmits<{
  "update:modelValue": [value: boolean];
  submit: [data: KeyFormData];
}>();

const DEFAULT: KeyFormData = { key: "", namespace: "common", description: "" };
const form = ref<KeyFormData>({ ...DEFAULT });
const errors = ref<Partial<Record<keyof KeyFormData, string>>>({});
const customNamespace = ref("");
const showCustomNs = ref(false);

watch(
  () => props.modelValue,
  (open) => {
    if (open) {
      form.value = { ...DEFAULT, namespace: props.namespaces[0] ?? "common" };
      errors.value = {};
      showCustomNs.value = false;
      customNamespace.value = "";
    }
  },
);

function validate(): boolean {
  errors.value = {};
  if (!form.value.key.trim()) {
    errors.value.key = "Key is required";
  } else if (!/^[a-z0-9_.-]+$/i.test(form.value.key.trim())) {
    errors.value.key =
      "Key can only contain letters, numbers, underscores, hyphens and dots";
  }
  if (showCustomNs.value && customNamespace.value.trim()) {
    form.value.namespace = customNamespace.value
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "_");
  }
  if (!form.value.namespace) {
    errors.value.namespace = "Namespace is required";
  }
  return Object.keys(errors.value).length === 0;
}

function handleSubmit() {
  if (!validate()) return;
  emit("submit", {
    key: form.value.key.trim(),
    namespace: form.value.namespace,
    description: form.value.description?.trim(),
  });
}
</script>

<template>
  <AppModal
    :model-value="modelValue"
    @update:model-value="emit('update:modelValue', $event)"
    title="Add Translation Key"
    size="md"
  >
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <!-- Key -->
      <div>
        <label
          class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"
        >
          Key Name <span class="text-rose-500">*</span>
        </label>
        <input
          v-model="form.key"
          type="text"
          placeholder="e.g. nav.home or button.submit"
          :class="[
            'w-full rounded-lg border px-3 py-2 text-sm bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-colors font-mono',
            errors.key
              ? 'border-rose-400 focus:ring-rose-400/30'
              : 'border-slate-300 dark:border-slate-600 focus:border-primary-400 focus:ring-primary-400/20',
          ]"
        />
        <p
          v-if="errors.key"
          class="mt-1 text-xs text-rose-600 dark:text-rose-400"
        >
          {{ errors.key }}
        </p>
      </div>

      <!-- Namespace -->
      <div>
        <label
          class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"
        >
          Namespace <span class="text-rose-500">*</span>
        </label>
        <div v-if="!showCustomNs">
          <div class="flex gap-2">
            <select
              v-model="form.namespace"
              class="flex-1 rounded-lg border border-slate-300 dark:border-slate-600 px-3 py-2 text-sm bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:border-primary-400 focus:ring-primary-400/20 transition-colors"
            >
              <option v-for="ns in namespaces" :key="ns" :value="ns">
                {{ ns }}
              </option>
              <option v-if="namespaces.length === 0" value="common">
                common
              </option>
            </select>
            <button
              type="button"
              @click="showCustomNs = true"
              class="px-3 py-2 text-sm rounded-lg border border-dashed border-slate-300 dark:border-slate-600 text-slate-500 dark:text-slate-400 hover:border-primary-400 hover:text-primary-500 transition-colors"
            >
              + New
            </button>
          </div>
        </div>
        <div v-else>
          <div class="flex gap-2">
            <input
              v-model="customNamespace"
              type="text"
              placeholder="New namespace name"
              class="flex-1 rounded-lg border border-slate-300 dark:border-slate-600 px-3 py-2 text-sm bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:border-primary-400 focus:ring-primary-400/20 transition-colors"
            />
            <button
              type="button"
              @click="showCustomNs = false"
              class="px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-600 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
        <p
          v-if="errors.namespace"
          class="mt-1 text-xs text-rose-600 dark:text-rose-400"
        >
          {{ errors.namespace }}
        </p>
      </div>

      <!-- Description -->
      <div>
        <label
          class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"
        >
          Description <span class="text-slate-400 font-normal">(optional)</span>
        </label>
        <input
          v-model="form.description"
          type="text"
          placeholder="Provide context for translators..."
          class="w-full rounded-lg border border-slate-300 dark:border-slate-600 px-3 py-2 text-sm bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:border-primary-400 focus:ring-primary-400/20 transition-colors"
        />
      </div>
    </form>

    <template #footer>
      <AppButton variant="secondary" @click="emit('update:modelValue', false)"
        >Cancel</AppButton
      >
      <AppButton @click="handleSubmit">Add Key</AppButton>
    </template>
  </AppModal>
</template>
