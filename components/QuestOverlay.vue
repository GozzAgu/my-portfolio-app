<template>
  <div>
    <div
      class="pointer-events-none fixed bottom-6 left-4 z-[70] flex w-[min(20rem,calc(100vw-2rem))] flex-col gap-2 sm:left-6"
      aria-live="polite"
    >
      <TransitionGroup
        enter-active-class="transition duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
        enter-from-class="opacity-0 -translate-x-6 scale-95"
        enter-to-class="opacity-100 translate-x-0 scale-100"
        leave-active-class="transition duration-300 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0 -translate-x-4"
      >
        <button
          v-for="toast in quest.toasts.value"
          :key="toast.id"
          type="button"
          class="pointer-events-auto flex items-center gap-3 rounded-2xl border px-4 py-3 text-left shadow-xl backdrop-blur-xl"
          :class="dark ? 'border-white/10 bg-[#13161d]/95 text-white' : 'border-black/5 bg-white/95 text-[#111318]'"
          @click="quest.dismissToast(toast.id)"
        >
          <span
            class="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
            :class="toast.kind === 'level'
              ? 'bg-amber-400/20 text-amber-500'
              : (dark ? 'bg-teal-400/15 text-teal-300' : 'bg-teal-700/10 text-teal-800')"
          >
            <Icon :icon="toast.icon" class="h-5 w-5" />
          </span>
          <span class="min-w-0 flex-1">
            <span class="block text-[10px] font-semibold uppercase tracking-[0.2em]" :class="dark ? 'text-white/40' : 'text-[#9ca3af]'">
              {{ toast.kind === "level" ? "Level up!" : "Achievement unlocked" }}
            </span>
            <span class="block truncate text-sm font-semibold leading-snug">{{ toast.title }}</span>
          </span>
          <span v-if="toast.xp" class="text-xs font-semibold tabular-nums text-teal-600">+{{ toast.xp }} XP</span>
        </button>
      </TransitionGroup>
    </div>

    <div class="pointer-events-none fixed inset-0 z-[75] overflow-hidden" aria-hidden="true">
      <span
        v-for="piece in confetti"
        :key="piece.id"
        class="confetti"
        :style="{
          left: `${piece.x}%`,
          background: piece.color,
          width: `${piece.w}px`,
          height: `${piece.h}px`,
          '--dx': `${piece.dx}px`,
          '--dy': `${piece.dy}px`,
          '--rot': `${piece.rot}deg`,
          animationDelay: `${piece.delay}ms`,
          animationDuration: `${piece.duration}ms`,
        }"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { Icon } from "@iconify/vue";
import { useQuest } from "~/composables/useQuest";

defineProps({
  dark: { type: Boolean, default: false },
});

const quest = useQuest();
const confetti = ref([]);
const COLORS = ["#14b8a6", "#2dd4bf", "#f59e0b", "#f472b6", "#60a5fa", "#a78bfa"];
let seq = 0;

const burst = () => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const pieces = Array.from({ length: 90 }, () => ({
    id: ++seq,
    x: 35 + Math.random() * 30,
    dx: (Math.random() - 0.5) * 900,
    dy: -(200 + Math.random() * 380),
    rot: (Math.random() - 0.5) * 1080,
    w: 6 + Math.random() * 6,
    h: 8 + Math.random() * 10,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    delay: Math.random() * 150,
    duration: 1500 + Math.random() * 900,
  }));
  confetti.value = [...confetti.value, ...pieces];
  const ids = new Set(pieces.map((p) => p.id));
  setTimeout(() => {
    confetti.value = confetti.value.filter((p) => !ids.has(p.id));
  }, 2700);
};

watch(() => quest.celebrateTick.value, burst);
</script>

<style scoped>
.confetti {
  position: absolute;
  top: 55%;
  border-radius: 2px;
  opacity: 0;
  animation-name: confetti-fly;
  animation-timing-function: cubic-bezier(0.2, 0.6, 0.4, 1);
  animation-fill-mode: forwards;
}

@keyframes confetti-fly {
  0% {
    opacity: 1;
    transform: translate3d(0, 0, 0) rotate(0deg);
  }
  45% {
    opacity: 1;
    transform: translate3d(calc(var(--dx) * 0.7), var(--dy), 0) rotate(calc(var(--rot) * 0.5));
  }
  100% {
    opacity: 0;
    transform: translate3d(var(--dx), calc(var(--dy) + 75vh), 0) rotate(var(--rot));
  }
}
</style>
