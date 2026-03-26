<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useUiStore } from "@/stores/uiStore";

const route = useRoute();
const uiStore = useUiStore();

const navItems = [
  {
    label: "Projects",
    icon: "grid",
    to: "/",
    exact: true,
  },
  {
    label: "Team",
    icon: "users",
    to: "/team",
    disabled: true,
    badge: "Soon",
  },
  {
    label: "Settings",
    icon: "settings",
    to: "/settings",
  },
];

function isActive(item: (typeof navItems)[0]) {
  if (item.exact) return route.path === item.to;
  return route.path.startsWith(item.to);
}
</script>

<template>
  <aside
    :class="[
      'flex flex-col bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transition-all duration-200 shrink-0',
      uiStore.isSidebarCollapsed ? 'w-16' : 'w-60',
    ]"
  >
    <!-- Logo -->
    <div
      class="flex items-center gap-3 px-4 py-5 border-b border-slate-200 dark:border-slate-800"
    >
      <div
        class="flex items-center justify-center w-8 h-8 bg-primary-600 rounded-lg shrink-0"
      >
        <svg
          class="w-4 h-4 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2.5"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
          />
        </svg>
      </div>
      <span
        v-if="!uiStore.isSidebarCollapsed"
        class="text-lg font-semibold text-slate-900 dark:text-white truncate"
      >
        Localify
      </span>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 px-2 py-4 space-y-1">
      <template v-for="item in navItems" :key="item.label">
        <RouterLink
          v-if="!item.disabled"
          :to="item.to"
          :class="[
            'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-150 group',
            isActive(item)
              ? 'bg-primary-50 dark:bg-primary-950 text-primary-700 dark:text-primary-300'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white',
          ]"
          :title="uiStore.isSidebarCollapsed ? item.label : undefined"
        >
          <!-- Grid icon -->
          <svg
            v-if="item.icon === 'grid'"
            class="w-5 h-5 shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="1.75"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
            />
          </svg>
          <!-- Settings icon -->
          <svg
            v-if="item.icon === 'settings'"
            class="w-5 h-5 shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="1.75"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <!-- Users icon (placeholder) -->
          <svg
            v-if="item.icon === 'users'"
            class="w-5 h-5 shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="1.75"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
            />
          </svg>

          <template v-if="!uiStore.isSidebarCollapsed">
            <span class="flex-1">{{ item.label }}</span>
            <span
              v-if="item.badge"
              class="text-xs bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 px-1.5 py-0.5 rounded font-medium"
            >
              {{ item.badge }}
            </span>
          </template>
        </RouterLink>

        <!-- Disabled item -->
        <div
          v-else
          :class="[
            'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium opacity-50 cursor-not-allowed',
            'text-slate-600 dark:text-slate-400',
          ]"
          :title="uiStore.isSidebarCollapsed ? item.label : undefined"
        >
          <svg
            v-if="item.icon === 'users'"
            class="w-5 h-5 shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="1.75"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
            />
          </svg>
          <template v-if="!uiStore.isSidebarCollapsed">
            <span class="flex-1">{{ item.label }}</span>
            <span
              v-if="item.badge"
              class="text-xs bg-slate-100 dark:bg-slate-800 text-slate-500 px-1.5 py-0.5 rounded font-medium"
            >
              {{ item.badge }}
            </span>
          </template>
        </div>
      </template>
    </nav>

    <!-- Collapse toggle -->
    <div class="px-2 pb-4 border-t border-slate-200 dark:border-slate-800 pt-3">
      <button
        @click="uiStore.toggleSidebar()"
        class="flex items-center justify-center w-full p-2 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        :title="
          uiStore.isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'
        "
        type="button"
      >
        <svg
          class="w-5 h-5 transition-transform duration-200"
          :class="uiStore.isSidebarCollapsed ? 'rotate-180' : ''"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="1.75"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </button>
    </div>
  </aside>
</template>
