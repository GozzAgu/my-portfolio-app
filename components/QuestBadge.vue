<template>
  <div ref="root" class="relative">
    <button
      type="button"
      class="group flex items-center gap-2.5 rounded-xl border px-2.5 py-1.5 text-xs font-semibold transition-colors duration-300"
      :class="dark ? 'border-white/10 text-white/80 hover:bg-white/5' : 'border-black/10 text-[#111318]/80 hover:bg-black/[0.03]'"
      :aria-expanded="open"
      aria-haspopup="dialog"
      :aria-label="`Level ${quest.levelNumber.value}, ${quest.xp.value} XP. View achievements`"
      @click="open = !open"
    >
      <span
        class="flex h-6 w-6 items-center justify-center rounded-lg text-[11px] font-bold tabular-nums"
        :class="dark ? 'bg-teal-400/15 text-teal-300' : 'bg-teal-700/10 text-teal-800'"
      >
        {{ quest.levelNumber.value }}
      </span>
      <span class="hidden flex-col items-start gap-1 sm:flex">
        <span class="leading-none">{{ quest.level.value.title }}</span>
        <span class="h-1 w-16 overflow-hidden rounded-full" :class="dark ? 'bg-white/10' : 'bg-black/10'">
          <span
            class="block h-full rounded-full bg-teal-500 transition-[width] duration-700 ease-out"
            :style="{ width: `${Math.round(quest.progress.value * 100)}%` }"
          />
        </span>
      </span>
      <span class="tabular-nums sm:hidden">{{ quest.xp.value }} XP</span>
    </button>

    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div
        v-if="open"
        role="dialog"
        aria-label="Achievements"
        class="fixed inset-x-4 top-[4.75rem] z-[55] rounded-2xl border p-5 shadow-2xl sm:absolute sm:inset-x-auto sm:right-0 sm:top-full sm:mt-3 sm:w-[22rem]"
        :class="dark ? 'border-white/10 bg-[#13161d] text-white' : 'border-black/5 bg-white text-[#111318]'"
      >
        <div class="flex items-start justify-between gap-4">
          <div>
            <p class="text-[11px] font-semibold uppercase tracking-[0.2em]" :class="dark ? 'text-teal-300/80' : 'text-teal-800'">
              Level {{ quest.levelNumber.value }}
            </p>
            <p class="mt-1 font-display text-xl font-semibold">{{ quest.level.value.title }}</p>
          </div>
          <p class="text-sm tabular-nums" :class="dark ? 'text-white/50' : 'text-[#6b7280]'">
            {{ quest.xp.value }} / {{ quest.maxXp }} XP
          </p>
        </div>

        <div class="mt-4 h-1.5 overflow-hidden rounded-full" :class="dark ? 'bg-white/10' : 'bg-black/5'">
          <div
            class="h-full rounded-full bg-teal-500 transition-[width] duration-700 ease-out"
            :style="{ width: `${Math.round((quest.xp.value / quest.maxXp) * 100)}%` }"
          />
        </div>
        <p class="mt-2 text-xs" :class="dark ? 'text-white/40' : 'text-[#6b7280]'">
          {{ quest.nextLevel.value ? `${quest.nextLevel.value.xp - quest.xp.value} XP to ${quest.nextLevel.value.title}` : "Max level reached. Legend." }}
        </p>

        <ul class="mt-5 max-h-[50vh] space-y-1 overflow-y-auto pr-1">
          <li
            v-for="a in quest.achievements"
            :key="a.id"
            class="flex items-center gap-3 rounded-xl px-2 py-2"
          >
            <span
              class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
              :class="quest.has(a.id)
                ? (dark ? 'bg-teal-400/15 text-teal-300' : 'bg-teal-700/10 text-teal-800')
                : (dark ? 'bg-white/5 text-white/25' : 'bg-black/[0.04] text-black/25')"
            >
              <Icon :icon="quest.has(a.id) || !a.secret ? a.icon : 'ph:lock-simple-fill'" class="h-4 w-4" />
            </span>
            <span class="min-w-0 flex-1">
              <span class="block text-sm font-medium leading-snug" :class="quest.has(a.id) ? '' : (dark ? 'text-white/45' : 'text-[#6b7280]')">
                {{ a.secret && !quest.has(a.id) ? "Secret achievement" : a.title }}
              </span>
              <span class="block text-xs leading-snug" :class="dark ? 'text-white/40' : 'text-[#9ca3af]'">
                {{ a.secret && !quest.has(a.id) ? "Keep exploring…" : a.description }}
              </span>
            </span>
            <span class="text-xs tabular-nums" :class="dark ? 'text-white/40' : 'text-[#9ca3af]'">+{{ a.xp }}</span>
          </li>
        </ul>

        <div class="mt-4 flex items-center justify-between border-t pt-4 text-xs" :class="dark ? 'border-white/10 text-white/40' : 'border-black/5 text-[#9ca3af]'">
          <span>Press <kbd class="kbd" :class="dark ? 'border-white/15' : 'border-black/10'">/</kbd> for the terminal</span>
          <button type="button" class="font-medium transition-colors hover:text-teal-600" @click="quest.reset()">
            Reset progress
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { Icon } from "@iconify/vue";
import { useQuest } from "~/composables/useQuest";

defineProps({
  dark: { type: Boolean, default: false },
});

const quest = useQuest();
const open = ref(false);
const root = ref(null);

const onPointerDown = (e) => {
  if (open.value && root.value && !root.value.contains(e.target)) open.value = false;
};
const onKeydown = (e) => {
  if (e.key === "Escape") open.value = false;
};

onMounted(() => {
  document.addEventListener("pointerdown", onPointerDown);
  document.addEventListener("keydown", onKeydown);
});
onBeforeUnmount(() => {
  document.removeEventListener("pointerdown", onPointerDown);
  document.removeEventListener("keydown", onKeydown);
});
</script>

<style scoped>
.kbd {
  display: inline-block;
  min-width: 1.25rem;
  border-width: 1px;
  border-radius: 0.35rem;
  padding: 0 0.3rem;
  text-align: center;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
}
</style>
