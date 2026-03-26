<script setup lang="ts">
import { ref, computed, watch } from "vue";
import type { TranslationKey, Language, FilterStatus } from "@/types";
import { useTranslationStore } from "@/stores/translationStore";
import TranslationCell from "./TranslationCell.vue";
import KeyForm from "./KeyForm.vue";
import LanguageSelector from "./LanguageSelector.vue";
import AppButton from "@/components/ui/AppButton.vue";
import AppBadge from "@/components/ui/AppBadge.vue";
import AppInput from "@/components/ui/AppInput.vue";

const props = defineProps<{
  projectId: string;
  languages: Language[];
  defaultLanguage: string;
}>();

const emit = defineEmits<{
  deleteKey: [keyId: string];
}>();

const translationStore = useTranslationStore();

// Filter/search state
const search = ref("");
const nsFilter = ref("all");
const statusFilter = ref<FilterStatus>("all");

// Selected languages to display
const selectedLanguages = ref<string[]>([]);

// Key form modal
const showKeyForm = ref(false);
const confirmDeleteKeyId = ref<string | null>(null);

// Initialize selected languages
watch(
  () => props.languages,
  (langs) => {
    if (selectedLanguages.value.length === 0 && langs.length > 0) {
      selectedLanguages.value = langs.map((l) => l.code);
    }
  },
  { immediate: true },
);

const namespaces = computed(() => translationStore.namespaces);

const visibleLanguages = computed(() =>
  props.languages.filter((l) => selectedLanguages.value.includes(l.code)),
);

const filteredKeys = computed(() => {
  let keys = translationStore.keys;

  // Search
  if (search.value.trim()) {
    const q = search.value.toLowerCase();
    keys = keys.filter(
      (k) =>
        k.key.toLowerCase().includes(q) ||
        k.namespace.toLowerCase().includes(q) ||
        k.description?.toLowerCase().includes(q),
    );
  }

  // Namespace filter
  if (nsFilter.value !== "all") {
    keys = keys.filter((k) => k.namespace === nsFilter.value);
  }

  // Status filter
  if (statusFilter.value !== "all") {
    keys = keys.filter((k) => {
      const hasMissing = props.languages.some(
        (l) => !translationStore.getTranslation(k.id, l.code)?.value?.trim(),
      );
      return statusFilter.value === "missing" ? hasMissing : !hasMissing;
    });
  }

  return keys;
});

// Group by namespace
const groupedKeys = computed(() => {
  const groups: Record<string, TranslationKey[]> = {};
  for (const key of filteredKeys.value) {
    if (!groups[key.namespace]) groups[key.namespace] = [];
    groups[key.namespace].push(key);
  }
  return groups;
});

const totalKeys = computed(() => translationStore.keys.length);
const missingCount = computed(() => {
  let count = 0;
  for (const key of translationStore.keys) {
    for (const lang of props.languages) {
      if (!translationStore.getTranslation(key.id, lang.code)?.value?.trim())
        count++;
    }
  }
  return count;
});

async function handleAddKey(data: {
  key: string;
  namespace: string;
  description?: string;
}) {
  await translationStore.createKey(data);
  showKeyForm.value = false;
}

async function handleDeleteKey(keyId: string) {
  confirmDeleteKeyId.value = keyId;
}

async function confirmDelete() {
  if (confirmDeleteKeyId.value) {
    await translationStore.deleteKey(confirmDeleteKeyId.value);
    confirmDeleteKeyId.value = null;
  }
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <!-- Toolbar -->
    <div class="flex flex-col gap-3">
      <!-- Row 1: Search + Add key -->
      <div class="flex items-center gap-3">
        <AppInput
          v-model="search"
          placeholder="Search keys, namespaces..."
          icon="search"
          clearable
          class="max-w-xs"
        />

        <!-- Status filter -->
        <select
          v-model="statusFilter"
          class="rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 text-sm px-3 py-2 focus:outline-none focus:ring-2 focus:border-primary-400 focus:ring-primary-400/20 transition-colors"
        >
          <option value="all">All keys</option>
          <option value="missing">Missing</option>
          <option value="translated">Translated</option>
        </select>

        <!-- Namespace filter -->
        <select
          v-model="nsFilter"
          class="rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 text-sm px-3 py-2 focus:outline-none focus:ring-2 focus:border-primary-400 focus:ring-primary-400/20 transition-colors"
        >
          <option value="all">All namespaces</option>
          <option v-for="ns in namespaces" :key="ns" :value="ns">
            {{ ns }}
          </option>
        </select>

        <div class="ml-auto flex items-center gap-2">
          <AppBadge
            v-if="missingCount > 0"
            variant="danger"
            class="hidden sm:flex"
          >
            {{ missingCount }} missing
          </AppBadge>
          <AppBadge variant="default"
            >{{ totalKeys }} key{{ totalKeys !== 1 ? "s" : "" }}</AppBadge
          >
          <AppButton @click="showKeyForm = true" size="sm">
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
            Add Key
          </AppButton>
        </div>
      </div>

      <!-- Row 2: Language selector -->
      <div
        class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3"
      >
        <LanguageSelector
          :languages="languages"
          :selected="selectedLanguages"
          :default-language="defaultLanguage"
          @update:selected="selectedLanguages = $event"
        />
      </div>
    </div>

    <!-- Loading state -->
    <div
      v-if="translationStore.isLoading"
      class="flex items-center justify-center py-20"
    >
      <div class="flex flex-col items-center gap-3">
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
        <span class="text-sm text-slate-500 dark:text-slate-400"
          >Loading translations...</span
        >
      </div>
    </div>

    <!-- Empty state -->
    <div
      v-else-if="totalKeys === 0"
      class="flex flex-col items-center justify-center py-20 text-center"
    >
      <div
        class="w-14 h-14 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center mb-4"
      >
        <svg
          class="w-7 h-7 text-slate-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="1.5"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
          />
        </svg>
      </div>
      <p class="text-slate-700 dark:text-slate-300 font-medium mb-1">
        No translation keys yet
      </p>
      <p class="text-slate-500 dark:text-slate-400 text-sm mb-4">
        Add your first key to start translating
      </p>
      <AppButton @click="showKeyForm = true">Add First Key</AppButton>
    </div>

    <!-- No results -->
    <div
      v-else-if="filteredKeys.length === 0"
      class="flex flex-col items-center justify-center py-16 text-center"
    >
      <p class="text-slate-600 dark:text-slate-400 font-medium">
        No keys match your filters
      </p>
      <button
        @click="
          search = '';
          nsFilter = 'all';
          statusFilter = 'all';
        "
        type="button"
        class="mt-2 text-sm text-primary-600 dark:text-primary-400 hover:underline"
      >
        Clear filters
      </button>
    </div>

    <!-- Table -->
    <div
      v-else
      class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden"
    >
      <div class="overflow-x-auto scrollbar-thin">
        <table class="w-full">
          <thead>
            <tr
              class="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950"
            >
              <th
                class="text-left px-4 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide sticky left-0 bg-slate-50 dark:bg-slate-950 min-w-[220px] z-10"
              >
                Key
              </th>
              <th
                v-for="lang in visibleLanguages"
                :key="lang.code"
                class="text-left px-3 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide min-w-[200px]"
              >
                <div class="flex items-center gap-2">
                  <span class="text-base">{{ lang.flag }}</span>
                  <span>{{ lang.name }}</span>
                  <span
                    class="text-slate-400 dark:text-slate-600 font-mono lowercase"
                    >({{ lang.code }})</span
                  >
                  <span
                    v-if="lang.code === defaultLanguage"
                    class="ml-1 text-primary-400 text-xs"
                    >★</span
                  >
                </div>
              </th>
              <th
                class="px-3 py-3 w-12 sticky right-0 bg-slate-50 dark:bg-slate-950"
              ></th>
            </tr>
          </thead>
          <tbody>
            <template v-for="(keys, namespace) in groupedKeys" :key="namespace">
              <!-- Namespace header -->
              <tr
                class="border-b border-dashed border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50"
              >
                <td :colspan="visibleLanguages.length + 2" class="px-4 py-2">
                  <div class="flex items-center gap-2">
                    <span
                      class="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest"
                      >{{ namespace }}</span
                    >
                    <span class="text-xs text-slate-300 dark:text-slate-700"
                      >{{ keys.length }} keys</span
                    >
                  </div>
                </td>
              </tr>

              <!-- Key rows -->
              <tr
                v-for="key in keys"
                :key="key.id"
                class="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50/80 dark:hover:bg-slate-800/30 transition-colors group"
              >
                <!-- Key name cell -->
                <td
                  class="px-4 py-0 sticky left-0 bg-white dark:bg-slate-900 group-hover:bg-slate-50/80 dark:group-hover:bg-slate-800/30 z-10 align-top"
                >
                  <div class="py-2.5">
                    <span
                      class="font-mono text-sm text-slate-700 dark:text-slate-300 block"
                      >{{ key.key }}</span
                    >
                    <span
                      v-if="key.description"
                      class="text-xs text-slate-400 dark:text-slate-500 block mt-0.5 leading-snug"
                      >{{ key.description }}</span
                    >
                  </div>
                </td>

                <!-- Translation cells -->
                <td
                  v-for="lang in visibleLanguages"
                  :key="lang.code"
                  class="p-0 border-l border-slate-100 dark:border-slate-800 align-top min-w-[200px]"
                >
                  <TranslationCell
                    :key-id="key.id"
                    :language-code="lang.code"
                    :translation="
                      translationStore.getTranslation(key.id, lang.code)
                    "
                    :saving="translationStore.isCellSaving(key.id, lang.code)"
                    :is-default="lang.code === defaultLanguage"
                    @save="translationStore.saveTranslation"
                  />
                </td>

                <!-- Actions -->
                <td
                  class="px-2 py-0 sticky right-0 bg-white dark:bg-slate-900 group-hover:bg-slate-50/80 dark:group-hover:bg-slate-800/30 border-l border-slate-100 dark:border-slate-800 align-top"
                >
                  <div class="py-2.5 flex items-center justify-center">
                    <button
                      @click="handleDeleteKey(key.id)"
                      type="button"
                      class="p-1.5 rounded-lg text-slate-300 dark:text-slate-600 hover:text-rose-500 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950 transition-colors opacity-0 group-hover:opacity-100"
                      title="Delete key"
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
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Key form modal -->
    <KeyForm
      v-model="showKeyForm"
      :namespaces="namespaces"
      @submit="handleAddKey"
    />

    <!-- Delete confirm dialog -->
    <Teleport to="body">
      <Transition name="modal">
        <div
          v-if="confirmDeleteKeyId"
          class="fixed inset-0 z-50 flex items-center justify-center p-4"
          @click.self="confirmDeleteKeyId = null"
        >
          <div
            class="absolute inset-0 bg-black/40 backdrop-blur-sm"
            @click="confirmDeleteKeyId = null"
          ></div>
          <div
            class="relative bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-700 p-6 max-w-sm w-full animate-slide-up"
          >
            <div class="flex items-start gap-4">
              <div
                class="flex items-center justify-center w-10 h-10 bg-rose-100 dark:bg-rose-950 rounded-full shrink-0"
              >
                <svg
                  class="w-5 h-5 text-rose-600 dark:text-rose-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                  />
                </svg>
              </div>
              <div>
                <h3 class="font-semibold text-slate-900 dark:text-white mb-1">
                  Delete key?
                </h3>
                <p class="text-sm text-slate-500 dark:text-slate-400">
                  This will permanently delete the key and all its translations.
                  This action cannot be undone.
                </p>
              </div>
            </div>
            <div class="flex gap-3 mt-5 justify-end">
              <AppButton variant="secondary" @click="confirmDeleteKeyId = null"
                >Cancel</AppButton
              >
              <AppButton variant="danger" @click="confirmDelete"
                >Delete Key</AppButton
              >
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.15s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
