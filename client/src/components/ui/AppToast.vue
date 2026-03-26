<script setup lang="ts">
import { useUiStore } from "@/stores/uiStore";

const uiStore = useUiStore();

const iconMap = {
  success: {
    bg: "bg-emerald-50 dark:bg-emerald-950",
    iconBg: "bg-emerald-100 dark:bg-emerald-900",
    icon: "text-emerald-600 dark:text-emerald-400",
    title: "text-emerald-800 dark:text-emerald-200",
    message: "text-emerald-700 dark:text-emerald-300",
  },
  error: {
    bg: "bg-rose-50 dark:bg-rose-950",
    iconBg: "bg-rose-100 dark:bg-rose-900",
    icon: "text-rose-600 dark:text-rose-400",
    title: "text-rose-800 dark:text-rose-200",
    message: "text-rose-700 dark:text-rose-300",
  },
  warning: {
    bg: "bg-amber-50 dark:bg-amber-950",
    iconBg: "bg-amber-100 dark:bg-amber-900",
    icon: "text-amber-600 dark:text-amber-400",
    title: "text-amber-800 dark:text-amber-200",
    message: "text-amber-700 dark:text-amber-300",
  },
  info: {
    bg: "bg-sky-50 dark:bg-sky-950",
    iconBg: "bg-sky-100 dark:bg-sky-900",
    icon: "text-sky-600 dark:text-sky-400",
    title: "text-sky-800 dark:text-sky-200",
    message: "text-sky-700 dark:text-sky-300",
  },
};
</script>

<template>
  <Teleport to="body">
    <div
      class="fixed top-4 right-4 z-[100] flex flex-col gap-2 pointer-events-none"
    >
      <TransitionGroup name="toast">
        <div
          v-for="toast in uiStore.activeToasts"
          :key="toast.id"
          :class="[
            'pointer-events-auto flex items-start gap-3 px-4 py-3.5 rounded-xl shadow-lg border border-white/20 max-w-sm min-w-[280px] animate-slide-in',
            iconMap[toast.type].bg,
          ]"
        >
          <!-- Icon -->
          <div
            :class="[
              'flex items-center justify-center w-7 h-7 rounded-full shrink-0 mt-0.5',
              iconMap[toast.type].iconBg,
            ]"
          >
            <!-- Success checkmark -->
            <svg
              v-if="toast.type === 'success'"
              :class="['w-4 h-4', iconMap[toast.type].icon]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2.5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
            <!-- Error x -->
            <svg
              v-else-if="toast.type === 'error'"
              :class="['w-4 h-4', iconMap[toast.type].icon]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2.5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            <!-- Warning ! -->
            <svg
              v-else-if="toast.type === 'warning'"
              :class="['w-4 h-4', iconMap[toast.type].icon]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2.5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
              />
            </svg>
            <!-- Info i -->
            <svg
              v-else
              :class="['w-4 h-4', iconMap[toast.type].icon]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2.5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
              />
            </svg>
          </div>

          <!-- Text -->
          <div class="flex-1 min-w-0">
            <p
              v-if="toast.title"
              :class="[
                'text-sm font-semibold leading-tight',
                iconMap[toast.type].title,
              ]"
            >
              {{ toast.title }}
            </p>
            <p
              :class="[
                'text-sm leading-snug',
                toast.title ? 'mt-0.5' : '',
                iconMap[toast.type].message,
              ]"
            >
              {{ toast.message }}
            </p>
          </div>

          <!-- Close -->
          <button
            @click="uiStore.removeToast(toast.id)"
            type="button"
            :class="[
              'shrink-0 p-0.5 rounded transition-opacity opacity-60 hover:opacity-100',
              iconMap[toast.type].icon,
            ]"
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
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<style scoped>
.toast-enter-active {
  transition: all 0.2s ease-out;
}
.toast-leave-active {
  transition: all 0.15s ease-in;
}
.toast-enter-from {
  transform: translateX(100%);
  opacity: 0;
}
.toast-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
</style>
