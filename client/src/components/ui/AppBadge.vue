<script setup lang="ts">
defineProps<{
  variant?: "default" | "success" | "warning" | "danger" | "info" | "outline";
  size?: "sm" | "md";
}>();
</script>

<template>
  <span
    :class="[
      'inline-flex items-center gap-1 font-medium rounded-full border',
      size === 'sm' ? 'text-xs px-2 py-0.5' : 'text-xs px-2.5 py-1',
      !variant || variant === 'default'
        ? 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700'
        : variant === 'success'
          ? 'bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800'
          : variant === 'warning'
            ? 'bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800'
            : variant === 'danger'
              ? 'bg-rose-50 dark:bg-rose-950 text-rose-700 dark:text-rose-400 border-rose-200 dark:border-rose-800'
              : variant === 'info'
                ? 'bg-sky-50 dark:bg-sky-950 text-sky-700 dark:text-sky-400 border-sky-200 dark:border-sky-800'
                : 'bg-transparent text-slate-600 dark:text-slate-400 border-slate-300 dark:border-slate-600',
    ]"
  >
    <slot />
  </span>
</template>
