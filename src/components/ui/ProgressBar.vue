<script setup lang="ts">
defineProps<{
  value: number; // 0–100
  color?: "primary" | "success" | "warning" | "danger";
  size?: "sm" | "md";
  showLabel?: boolean;
}>();
</script>

<template>
  <div class="w-full">
    <div class="flex items-center gap-2">
      <div
        :class="[
          'flex-1 rounded-full overflow-hidden bg-slate-200 dark:bg-slate-700',
          size === 'sm' ? 'h-1.5' : 'h-2',
        ]"
      >
        <div
          :class="[
            'h-full rounded-full transition-all duration-500',
            !color || color === 'primary'
              ? 'bg-primary-500'
              : color === 'success'
                ? 'bg-emerald-500'
                : color === 'warning'
                  ? 'bg-amber-500'
                  : 'bg-rose-500',
          ]"
          :style="{ width: `${Math.min(100, Math.max(0, value))}%` }"
        ></div>
      </div>
      <span
        v-if="showLabel"
        class="text-xs text-slate-500 dark:text-slate-400 tabular-nums w-8 text-right shrink-0"
      >
        {{ value }}%
      </span>
    </div>
  </div>
</template>
