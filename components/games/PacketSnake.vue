<template>
  <div class="select-none">
    <div class="mb-3 flex items-center justify-between text-sm">
      <p :class="dark ? 'text-white/60' : 'text-[#6b7280]'">
        Packets <span class="score-value font-semibold tabular-nums" :class="[dark ? 'text-white' : 'text-[#111318]', { 'is-bumped': bumped }]">{{ score }}</span>
      </p>
      <p :class="dark ? 'text-white/60' : 'text-[#6b7280]'">
        Best <span class="font-semibold tabular-nums" :class="dark ? 'text-white' : 'text-[#111318]'">{{ best }}</span>
      </p>
    </div>

    <div ref="wrap" class="board relative w-full overflow-hidden rounded-2xl" :class="{ 'is-shaking': shaking }">
      <canvas
        ref="canvas"
        class="block h-full w-full touch-none"
        @pointerdown="onSwipeStart"
        @pointerup="onSwipeEnd"
      />

      <Transition
        enter-active-class="transition duration-200"
        enter-from-class="opacity-0"
        leave-active-class="transition duration-150"
        leave-to-class="opacity-0"
      >
        <div
          v-if="status !== 'playing'"
          class="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center backdrop-blur-[2px]"
          :class="dark ? 'bg-[#0b0d12]/70' : 'bg-white/70'"
        >
          <template v-if="status === 'ready'">
            <Icon icon="ph:graph-fill" class="h-10 w-10 text-teal-500" />
            <p class="font-display text-xl font-bold">Route the packets</p>
            <p class="max-w-xs text-sm" :class="dark ? 'text-white/55' : 'text-[#6b7280]'">
              Eat packets to grow. Purple priority packets are worth 3. Don't crash into the walls or yourself.
            </p>
          </template>
          <template v-else-if="status === 'paused'">
            <Icon icon="ph:pause-circle-fill" class="h-10 w-10 text-teal-500" />
            <p class="font-display text-xl font-bold">Paused</p>
          </template>
          <template v-else>
            <Icon :icon="newBest ? 'ph:trophy-fill' : 'ph:warning-octagon-fill'" class="h-10 w-10" :class="newBest ? 'text-amber-500' : 'text-rose-500'" />
            <p class="font-display text-xl font-bold">{{ newBest ? "New high score!" : "Server crashed" }}</p>
            <p class="text-sm" :class="dark ? 'text-white/55' : 'text-[#6b7280]'">You routed {{ score }} {{ score === 1 ? "packet" : "packets" }}.</p>
          </template>
          <button
            type="button"
            class="mt-1 inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-colors"
            :class="dark ? 'bg-white text-[#0b0d12] hover:bg-white/90' : 'bg-[#111318] text-white hover:bg-[#111318]/90'"
            @click="status === 'paused' ? resume() : start()"
          >
            <Icon :icon="status === 'paused' ? 'ph:play-fill' : 'ph:arrow-clockwise-bold'" class="h-4 w-4" />
            {{ status === "ready" ? "Start" : status === "paused" ? "Resume" : "Play again" }}
          </button>
          <p class="hidden text-xs sm:block" :class="dark ? 'text-white/35' : 'text-[#9ca3af]'">Arrows or WASD to steer · Space to pause</p>
        </div>
      </Transition>
    </div>

    <div class="mt-4 grid grid-cols-3 gap-2 sm:hidden" aria-label="Direction controls">
      <span />
      <button type="button" class="dpad" :class="dpadClass" aria-label="Up" @pointerdown.prevent="steer(0, -1)"><Icon icon="ph:caret-up-bold" class="h-5 w-5" /></button>
      <span />
      <button type="button" class="dpad" :class="dpadClass" aria-label="Left" @pointerdown.prevent="steer(-1, 0)"><Icon icon="ph:caret-left-bold" class="h-5 w-5" /></button>
      <button type="button" class="dpad" :class="dpadClass" aria-label="Pause" @pointerdown.prevent="togglePause"><Icon icon="ph:pause-bold" class="h-5 w-5" /></button>
      <button type="button" class="dpad" :class="dpadClass" aria-label="Right" @pointerdown.prevent="steer(1, 0)"><Icon icon="ph:caret-right-bold" class="h-5 w-5" /></button>
      <span />
      <button type="button" class="dpad" :class="dpadClass" aria-label="Down" @pointerdown.prevent="steer(0, 1)"><Icon icon="ph:caret-down-bold" class="h-5 w-5" /></button>
      <span />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { Icon } from "@iconify/vue";
import { useQuest } from "~/composables/useQuest";

const props = defineProps({
  dark: { type: Boolean, default: false },
});

const GRID = 18;
const START_INTERVAL = 140;
const MIN_INTERVAL = 72;
const BONUS_TTL = 32;

const quest = useQuest();
const wrap = ref(null);
const canvas = ref(null);
const status = ref("ready");
const score = ref(0);
const newBest = ref(false);
const bumped = ref(false);
const shaking = ref(false);
const best = computed(() => quest.bestScores.value.snake ?? 0);
const dpadClass = computed(() =>
  props.dark ? "border-white/10 bg-white/5 text-white active:bg-white/15" : "border-black/10 bg-black/[0.03] text-[#111318] active:bg-black/10",
);

let ctx = null;
let size = 0;
let snake = [];
let prev = [];
let dir = { x: 1, y: 0 };
let queue = [];
let food = { x: 0, y: 0 };
let bonus = null;
let interval = START_INTERVAL;
let acc = 0;
let last = 0;
let raf = 0;
let swipe = null;

const randomFreeCell = () => {
  const taken = new Set(snake.map((s) => `${s.x},${s.y}`));
  if (bonus) taken.add(`${bonus.x},${bonus.y}`);
  taken.add(`${food.x},${food.y}`);
  let cell;
  do {
    cell = { x: Math.floor(Math.random() * GRID), y: Math.floor(Math.random() * GRID) };
  } while (taken.has(`${cell.x},${cell.y}`));
  return cell;
};

const reset = () => {
  const mid = Math.floor(GRID / 2);
  snake = [{ x: mid, y: mid }, { x: mid - 1, y: mid }, { x: mid - 2, y: mid }];
  prev = snake.map((s) => ({ ...s }));
  dir = { x: 1, y: 0 };
  queue = [];
  bonus = null;
  food = { x: -1, y: -1 };
  food = randomFreeCell();
  interval = START_INTERVAL;
  acc = 0;
  score.value = 0;
  newBest.value = false;
};

const start = () => {
  reset();
  status.value = "playing";
};

const resume = () => {
  if (status.value === "paused") status.value = "playing";
};

const togglePause = () => {
  if (status.value === "playing") status.value = "paused";
  else resume();
};

const steer = (x, y) => {
  if (status.value === "ready" || status.value === "over") start();
  if (status.value === "paused") resume();
  const lastDir = queue[queue.length - 1] ?? dir;
  if ((x === lastDir.x && y === lastDir.y) || (x === -lastDir.x && y === -lastDir.y)) return;
  if (queue.length < 3) queue.push({ x, y });
};

const bump = () => {
  bumped.value = false;
  requestAnimationFrame(() => (bumped.value = true));
};

const gameOver = () => {
  status.value = "over";
  newBest.value = score.value > 0 && quest.recordScore("snake", score.value);
  shaking.value = true;
  setTimeout(() => (shaking.value = false), 400);
};

const addScore = (points) => {
  const before = score.value;
  score.value += points;
  interval = Math.max(MIN_INTERVAL, interval - 3 * points);
  bump();
  if (before < 10 && score.value >= 10) quest.unlock("snake-10");
};

const tick = () => {
  prev = snake.map((s) => ({ ...s }));
  if (queue.length) dir = queue.shift();
  const head = { x: snake[0].x + dir.x, y: snake[0].y + dir.y };

  const hitsWall = head.x < 0 || head.y < 0 || head.x >= GRID || head.y >= GRID;
  const grows = (head.x === food.x && head.y === food.y) || (bonus && head.x === bonus.x && head.y === bonus.y);
  const body = grows ? snake : snake.slice(0, -1);
  if (hitsWall || body.some((s) => s.x === head.x && s.y === head.y)) {
    prev = snake.map((s) => ({ ...s }));
    gameOver();
    return;
  }

  snake.unshift(head);
  if (head.x === food.x && head.y === food.y) {
    addScore(1);
    food = randomFreeCell();
    if (!bonus && Math.random() < 0.2) bonus = { ...randomFreeCell(), ttl: BONUS_TTL };
  } else if (bonus && head.x === bonus.x && head.y === bonus.y) {
    addScore(3);
    bonus = null;
  } else {
    snake.pop();
  }

  if (bonus && --bonus.ttl <= 0) bonus = null;
};

const resize = () => {
  if (!canvas.value || !wrap.value) return;
  const dpr = window.devicePixelRatio || 1;
  size = wrap.value.clientWidth;
  canvas.value.width = size * dpr;
  canvas.value.height = size * dpr;
  ctx = canvas.value.getContext("2d");
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
};

const palette = () =>
  props.dark
    ? { bg: "#0b0d12", dot: "rgba(255,255,255,0.06)", body: "#14b8a6", head: "#5eead4", eye: "#0b0d12" }
    : { bg: "#eef1f4", dot: "rgba(17,19,24,0.07)", body: "#0f766e", head: "#0d9488", eye: "#ffffff" };

const draw = (t) => {
  if (!ctx) return;
  const cell = size / GRID;
  const colors = palette();
  const alpha = status.value === "playing" ? Math.min(1, acc / interval) : 1;

  ctx.fillStyle = colors.bg;
  ctx.fillRect(0, 0, size, size);

  ctx.fillStyle = colors.dot;
  for (let x = 0; x < GRID; x++) {
    for (let y = 0; y < GRID; y++) {
      ctx.beginPath();
      ctx.arc((x + 0.5) * cell, (y + 0.5) * cell, cell * 0.06, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  const pulse = 1 + Math.sin(t / 180) * 0.08;
  const drawPacket = (p, color, glow) => {
    const s = cell * 0.62 * pulse;
    ctx.save();
    ctx.shadowColor = glow;
    ctx.shadowBlur = cell * 0.6;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.roundRect((p.x + 0.5) * cell - s / 2, (p.y + 0.5) * cell - s / 2, s, s, s * 0.28);
    ctx.fill();
    ctx.restore();
  };
  drawPacket(food, "#f59e0b", "rgba(245,158,11,0.7)");
  if (bonus && (bonus.ttl > 8 || Math.floor(t / 120) % 2 === 0)) {
    drawPacket(bonus, "#a855f7", "rgba(168,85,247,0.8)");
  }

  const points = snake.map((s, i) => {
    const from = prev[i] ?? s;
    return {
      x: (from.x + (s.x - from.x) * alpha + 0.5) * cell,
      y: (from.y + (s.y - from.y) * alpha + 0.5) * cell,
    };
  });

  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.strokeStyle = colors.body;
  ctx.lineWidth = cell * 0.7;
  ctx.beginPath();
  points.forEach((p, i) => (i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y)));
  ctx.stroke();

  const head = points[0];
  ctx.fillStyle = colors.head;
  ctx.beginPath();
  ctx.arc(head.x, head.y, cell * 0.42, 0, Math.PI * 2);
  ctx.fill();

  const look = queue[0] ?? dir;
  ctx.fillStyle = colors.eye;
  [-1, 1].forEach((side) => {
    const ex = head.x + look.x * cell * 0.14 + -look.y * side * cell * 0.17;
    const ey = head.y + look.y * cell * 0.14 + look.x * side * cell * 0.17;
    ctx.beginPath();
    ctx.arc(ex, ey, cell * 0.08, 0, Math.PI * 2);
    ctx.fill();
  });
};

const loop = (t) => {
  const dt = last ? Math.min(100, t - last) : 0;
  last = t;
  if (status.value === "playing") {
    acc += dt;
    while (acc >= interval && status.value === "playing") {
      acc -= interval;
      tick();
    }
  }
  draw(t);
  raf = requestAnimationFrame(loop);
};

const KEYS = {
  ArrowUp: [0, -1], w: [0, -1],
  ArrowDown: [0, 1], s: [0, 1],
  ArrowLeft: [-1, 0], a: [-1, 0],
  ArrowRight: [1, 0], d: [1, 0],
};

const onKeydown = (e) => {
  const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
  if (KEYS[key]) {
    e.preventDefault();
    steer(...KEYS[key]);
  } else if (key === " " || key === "p") {
    e.preventDefault();
    if (status.value === "playing" || status.value === "paused") togglePause();
    else start();
  } else if (key === "Enter" && status.value !== "playing") {
    e.preventDefault();
    status.value === "paused" ? resume() : start();
  }
};

const onSwipeStart = (e) => {
  swipe = { x: e.clientX, y: e.clientY };
};

const onSwipeEnd = (e) => {
  if (!swipe) return;
  const dx = e.clientX - swipe.x;
  const dy = e.clientY - swipe.y;
  swipe = null;
  if (Math.max(Math.abs(dx), Math.abs(dy)) < 24) return;
  Math.abs(dx) > Math.abs(dy) ? steer(Math.sign(dx), 0) : steer(0, Math.sign(dy));
};

const onBlur = () => {
  if (status.value === "playing") status.value = "paused";
};

let ro;
onMounted(() => {
  reset();
  resize();
  ro = new ResizeObserver(resize);
  ro.observe(wrap.value);
  window.addEventListener("keydown", onKeydown);
  window.addEventListener("blur", onBlur);
  raf = requestAnimationFrame(loop);
});

onBeforeUnmount(() => {
  cancelAnimationFrame(raf);
  ro?.disconnect();
  window.removeEventListener("keydown", onKeydown);
  window.removeEventListener("blur", onBlur);
});
</script>

<style scoped>
/* Nuxt UI's aspect-ratio plugin disables Tailwind's `aspect-square` utility */
.board {
  aspect-ratio: 1 / 1;
}

.dpad {
  display: flex;
  height: 3rem;
  align-items: center;
  justify-content: center;
  border-width: 1px;
  border-radius: 0.9rem;
  -webkit-tap-highlight-color: transparent;
}

.score-value.is-bumped {
  display: inline-block;
  animation: bump 0.3s ease-out;
}

.is-shaking {
  animation: shake 0.4s ease-in-out;
}

@keyframes bump {
  50% {
    transform: scale(1.35);
    color: #14b8a6;
  }
}

@keyframes shake {
  20%,
  60% {
    transform: translateX(-6px);
  }
  40%,
  80% {
    transform: translateX(6px);
  }
}

@media (prefers-reduced-motion: reduce) {
  .is-shaking,
  .score-value.is-bumped {
    animation: none;
  }
}
</style>
