<template>
  <div class="select-none">
    <div class="mb-4 flex items-center justify-between text-sm" :class="dark ? 'text-white/60' : 'text-[#6b7280]'">
      <p>
        Moves <span class="font-semibold tabular-nums" :class="dark ? 'text-white' : 'text-[#111318]'">{{ moves }}</span>
      </p>
      <p>
        Time <span class="font-semibold tabular-nums" :class="dark ? 'text-white' : 'text-[#111318]'">{{ formattedTime }}</span>
      </p>
      <p>
        Best <span class="font-semibold tabular-nums" :class="dark ? 'text-white' : 'text-[#111318]'">{{ best ?? "—" }}</span>
      </p>
    </div>

    <div class="grid grid-cols-4 gap-2.5 sm:gap-3">
      <button
        v-for="card in cards"
        :key="card.uid"
        type="button"
        class="memory-card [perspective:700px]"
        :class="{ 'is-flipped': card.flipped || card.matched, 'is-matched': card.matched }"
        :aria-label="card.flipped || card.matched ? card.name : 'Hidden card'"
        :disabled="card.matched"
        @click="flip(card)"
      >
        <span class="memory-inner">
          <span
            class="memory-face memory-back"
            :class="dark ? 'border-white/10 bg-white/[0.04] text-teal-300/60' : 'border-black/5 bg-[#f5f6f8] text-teal-800/50'"
          >
            <Icon icon="ph:code-bold" class="h-6 w-6" />
          </span>
          <span
            class="memory-face memory-front"
            :class="dark ? 'border-teal-400/30 bg-[#0b0d12]' : 'border-teal-700/20 bg-white'"
          >
            <Icon :icon="card.icon" class="h-9 w-9 sm:h-10 sm:w-10" />
            <span class="mt-1 text-[10px] font-semibold" :class="dark ? 'text-white/50' : 'text-[#6b7280]'">{{ card.name }}</span>
          </span>
        </span>
      </button>
    </div>

    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 translate-y-2"
      leave-active-class="transition duration-150"
      leave-to-class="opacity-0"
    >
      <div v-if="complete" class="mt-5 flex flex-col items-center gap-3 text-center">
        <p class="font-display text-lg font-bold">
          {{ newBest ? "New record!" : "Stack complete!" }}
          <span class="font-normal" :class="dark ? 'text-white/55' : 'text-[#6b7280]'">{{ moves }} moves in {{ formattedTime }}.</span>
        </p>
        <button
          type="button"
          class="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-colors"
          :class="dark ? 'bg-white text-[#0b0d12] hover:bg-white/90' : 'bg-[#111318] text-white hover:bg-[#111318]/90'"
          @click="shuffle"
        >
          <Icon icon="ph:shuffle-bold" class="h-4 w-4" />
          Shuffle again
        </button>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { Icon } from "@iconify/vue";
import { useQuest } from "~/composables/useQuest";

defineProps({
  dark: { type: Boolean, default: false },
});

const STACK = [
  { name: "Vue", icon: "logos:vue" },
  { name: "Nuxt", icon: "logos:nuxt-icon" },
  { name: "TypeScript", icon: "logos:typescript-icon" },
  { name: "Vercel", icon: "logos:vercel-icon" },
  { name: "Node.js", icon: "logos:nodejs-icon" },
  { name: "Docker", icon: "logos:docker-icon" },
  { name: "Firebase", icon: "logos:firebase" },
  { name: "Tailwind", icon: "logos:tailwindcss-icon" },
];

const quest = useQuest();
const cards = ref([]);
const moves = ref(0);
const seconds = ref(0);
const newBest = ref(false);
const best = computed(() => quest.bestScores.value.memory);
const complete = computed(() => cards.value.length > 0 && cards.value.every((c) => c.matched));
const formattedTime = computed(() => `${Math.floor(seconds.value / 60)}:${String(seconds.value % 60).padStart(2, "0")}`);

let open = [];
let locked = false;
let timer = 0;
let uid = 0;

const stopTimer = () => {
  clearInterval(timer);
  timer = 0;
};

const shuffle = () => {
  stopTimer();
  const deck = [...STACK, ...STACK].map((item) => ({ ...item, uid: ++uid, flipped: false, matched: false }));
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  cards.value = deck;
  moves.value = 0;
  seconds.value = 0;
  newBest.value = false;
  open = [];
  locked = false;
};

const finish = () => {
  stopTimer();
  newBest.value = quest.recordScore("memory", moves.value, { lowerIsBetter: true });
  quest.unlock("memory-clear");
  quest.celebrate();
};

const flip = (card) => {
  if (locked || card.flipped || card.matched) return;
  if (!timer) timer = setInterval(() => seconds.value++, 1000);

  card.flipped = true;
  open.push(card);
  if (open.length < 2) return;

  moves.value++;
  const [a, b] = open;
  open = [];
  if (a.name === b.name) {
    a.matched = b.matched = true;
    if (complete.value) finish();
    return;
  }
  locked = true;
  setTimeout(() => {
    a.flipped = b.flipped = false;
    locked = false;
  }, 750);
};

onMounted(shuffle);
onBeforeUnmount(stopTimer);
</script>

<style scoped>
/* Nuxt UI's aspect-ratio plugin disables Tailwind's `aspect-square` utility */
.memory-card {
  aspect-ratio: 1 / 1;
  -webkit-tap-highlight-color: transparent;
}

.memory-inner {
  position: relative;
  display: block;
  height: 100%;
  width: 100%;
  transform-style: preserve-3d;
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.memory-card:hover:not(.is-flipped) .memory-inner {
  transform: rotateY(12deg) scale(1.03);
}

.memory-card.is-flipped .memory-inner {
  transform: rotateY(180deg);
}

.memory-face {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-width: 1px;
  border-radius: 1rem;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}

.memory-front {
  transform: rotateY(180deg);
}

.memory-card.is-matched .memory-front {
  animation: matched 0.5s ease-out;
  box-shadow: 0 0 0 2px rgba(20, 184, 166, 0.45);
}

@keyframes matched {
  50% {
    box-shadow: 0 0 0 6px rgba(20, 184, 166, 0.25);
  }
}

@media (prefers-reduced-motion: reduce) {
  .memory-inner {
    transition: none;
  }
}
</style>
