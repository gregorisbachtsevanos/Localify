<script setup lang="ts">
defineProps<{
  modelValue: string;
  placeholder?: string;
  label?: string;
  error?: string;
  clearable?: boolean;
  icon?: "search" | "key";
}>();

const emit = defineEmits<{
  "update:modelValue": [value: string];
  clear: [];
}>();
</script>

<template>
  <div class="w-full">
    <label
      v-if="label"
      class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"
    >
      {{ label }}
    </label>
    <div class="relative">
      <!-- Search icon -->
      <div
        v-if="icon"
        class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
      >
        <svg
          v-if="icon === 'search'"
          class="w-4 h-4 text-slate-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
        <svg
          v-else-if="icon === 'key'"
          class="w-4 h-4 text-slate-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
          />
        </svg>
      </div>

      <input
        :value="modelValue"
        @input="
          emit('update:modelValue', ($event.target as HTMLInputElement).value)
        "
        :placeholder="placeholder"
        :class="[
          'w-full rounded-lg border text-sm transition-colors duration-150',
          'bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100',
          'placeholder:text-slate-400 dark:placeholder:text-slate-500',
          'focus:outline-none focus:ring-2',
          icon ? 'pl-9' : 'pl-3',
          'pr-3 py-2',
          error
            ? 'border-rose-400 dark:border-rose-500 focus:ring-rose-400/30'
            : 'border-slate-300 dark:border-slate-600 focus:border-primary-400 dark:focus:border-primary-500 focus:ring-primary-400/20 dark:focus:ring-primary-500/20',
        ]"
      />

      <!-- Clear button -->
      <button
        v-if="clearable && modelValue"
        @click="
          emit('update:modelValue', '');
          emit('clear');
        "
        type="button"
        class="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
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
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
    <p v-if="error" class="mt-1 text-xs text-rose-600 dark:text-rose-400">
      {{ error }}
    </p>
  </div>
</template>
