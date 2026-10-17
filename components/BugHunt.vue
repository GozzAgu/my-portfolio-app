<template>
  <div ref="root" class="pointer-events-none absolute inset-0 z-20 overflow-hidden" aria-hidden="true">
    <button
      v-for="bug in bugs"
      :key="bug.id"
      :ref="(el) => bindBug(bug.id, el)"
      type="button"
      tabindex="-1"
      class="bug absolute left-0 top-0 p-2"
      :class="[bug.squashed ? 'is-squashed pointer-events-none' : 'pointer-events-auto', dark ? 'text-teal-300' : 'text-teal-800']"
      @pointerdown.prevent="squash(bug.id)"
    >
      <Icon icon="ph:bug-beetle-fill" class="bug-icon h-7 w-7" />
    </button>

    <span
      v-for="p in particles"
      :key="p.id"
      class="bug-particle"
      :class="dark ? 'bg-teal-300' : 'bg-teal-700'"
      :style="{ left: `${p.x}px`, top: `${p.y}px`, '--dx': `${p.dx}px`, '--dy': `${p.dy}px` }"
    />
    <span
      v-for="f in floaters"
      :key="f.id"
      class="bug-floater font-display text-sm font-bold"
      :class="dark ? 'text-teal-200' : 'text-teal-800'"
      :style="{ left: `${f.x}px`, top: `${f.y}px` }"
    >
      {{ f.text }}
    </span>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { Icon } from "@iconify/vue";

defineProps({
  dark: { type: Boolean, default: false },
});

const emit = defineEmits(["squash", "cleared", "spawn"]);

const BUG_SIZE = 44;
const FLEE_RADIUS = 110;
const TOP_SAFE = 96;
const MARGIN = 28;
const FIX_WORDS = ["fixed!", "patched!", "resolved!", "shipped!", "closed!", "deployed!"];

const root = ref(null);
const bugs = ref([]);
const particles = ref([]);
const floaters = ref([]);

const sim = new Map();
const pointer = { x: 0, y: 0, active: false };
let raf = 0;
let last = 0;
let running = false;
let inView = true;
let reducedMotion = false;
let seq = 0;

const remaining = computed(() => bugs.value.filter((b) => !b.squashed).length);

const bindBug = (id, el) => {
  const state = sim.get(id);
  if (!state) return;
  state.el = el;
  if (el) place(state);
};

const place = (b) => {
  if (!b.el) return;
  b.el.style.transform = `translate3d(${b.x - BUG_SIZE / 2}px, ${b.y - BUG_SIZE / 2}px, 0) rotate(${b.angle + Math.PI / 2}rad)`;
};

const steer = (current, target, amount) => {
  const diff = Math.atan2(Math.sin(target - current), Math.cos(target - current));
  return current + Math.max(-amount, Math.min(amount, diff));
};

const spawn = () => {
  const el = root.value;
  if (!el) return;
  const w = el.clientWidth;
  const h = el.clientHeight;
  const count = w < 640 ? 4 : 6;
  sim.clear();
  bugs.value = Array.from({ length: count }, () => {
    const id = ++seq;
    sim.set(id, {
      id,
      x: MARGIN + Math.random() * (w - MARGIN * 2),
      y: TOP_SAFE + Math.random() * Math.max(40, h - TOP_SAFE - MARGIN),
      angle: Math.random() * Math.PI * 2,
      turn: 0,
      speed: 38 + Math.random() * 34,
      squashed: false,
      el: null,
    });
    return { id, squashed: false };
  });
  emit("spawn", count);
};

const frame = (t) => {
  if (!running) return;
  const dt = Math.min(0.05, (t - (last || t)) / 1000);
  last = t;
  const el = root.value;
  if (el) {
    const w = el.clientWidth;
    const h = el.clientHeight;
    for (const b of sim.values()) {
      if (b.squashed || !b.el) continue;
      b.turn = b.turn * 0.94 + (Math.random() - 0.5) * 9 * dt;
      b.angle += b.turn;
      let speed = b.speed;

      if (pointer.active) {
        const dx = b.x - pointer.x;
        const dy = b.y - pointer.y;
        const dist = Math.hypot(dx, dy);
        if (dist < FLEE_RADIUS) {
          b.angle = steer(b.angle, Math.atan2(dy, dx), 7 * dt);
          speed *= 1 + (1 - dist / FLEE_RADIUS) * 2.4;
        }
      }

      if (b.x < MARGIN || b.x > w - MARGIN || b.y < TOP_SAFE || b.y > h - MARGIN) {
        b.angle = steer(b.angle, Math.atan2(h / 2 - b.y, w / 2 - b.x), 5 * dt);
      }

      b.x = Math.max(4, Math.min(w - 4, b.x + Math.cos(b.angle) * speed * dt));
      b.y = Math.max(TOP_SAFE - 30, Math.min(h - 4, b.y + Math.sin(b.angle) * speed * dt));
      place(b);
    }
  }
  raf = requestAnimationFrame(frame);
};

const start = () => {
  if (running || reducedMotion || !inView || document.hidden) return;
  running = true;
  last = 0;
  raf = requestAnimationFrame(frame);
};

const stop = () => {
  running = false;
  cancelAnimationFrame(raf);
};

const burstAt = (x, y) => {
  const parts = Array.from({ length: 10 }, (_, i) => {
    const angle = (i / 10) * Math.PI * 2 + Math.random() * 0.4;
    const dist = 22 + Math.random() * 26;
    return { id: ++seq, x, y, dx: Math.cos(angle) * dist, dy: Math.sin(angle) * dist };
  });
  const floater = { id: ++seq, x, y, text: FIX_WORDS[Math.floor(Math.random() * FIX_WORDS.length)] };
  particles.value = [...particles.value, ...parts];
  floaters.value = [...floaters.value, floater];
  const ids = new Set([...parts.map((p) => p.id), floater.id]);
  setTimeout(() => {
    particles.value = particles.value.filter((p) => !ids.has(p.id));
    floaters.value = floaters.value.filter((f) => !ids.has(f.id));
  }, 900);
};

const squash = (id, { silent = false } = {}) => {
  const b = sim.get(id);
  if (!b || b.squashed) return;
  b.squashed = true;
  bugs.value = bugs.value.map((bug) => (bug.id === id ? { ...bug, squashed: true } : bug));
  if (!silent) burstAt(b.x, b.y);
  emit("squash", remaining.value);
  if (remaining.value === 0) emit("cleared");
};

const squashAll = () => {
  const ids = bugs.value.filter((b) => !b.squashed).map((b) => b.id);
  ids.forEach((id) => squash(id));
  return ids.length;
};

const onPointerMove = (e) => {
  if (e.pointerType !== "mouse" || !root.value) {
    pointer.active = false;
    return;
  }
  const rect = root.value.getBoundingClientRect();
  pointer.x = e.clientX - rect.left;
  pointer.y = e.clientY - rect.top;
  pointer.active = pointer.x >= 0 && pointer.y >= 0 && pointer.x <= rect.width && pointer.y <= rect.height;
};

const onVisibility = () => (document.hidden ? stop() : start());

let io;
onMounted(() => {
  reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  spawn();
  io = new IntersectionObserver(([entry]) => {
    inView = entry.isIntersecting;
    inView ? start() : stop();
  });
  io.observe(root.value);
  window.addEventListener("pointermove", onPointerMove, { passive: true });
  document.addEventListener("visibilitychange", onVisibility);
  start();
});

onBeforeUnmount(() => {
  stop();
  io?.disconnect();
  window.removeEventListener("pointermove", onPointerMove);
  document.removeEventListener("visibilitychange", onVisibility);
});

defineExpose({
  remaining,
  squashAll,
  respawn: () => {
    spawn();
    start();
  },
});
</script>

<style scoped>
.bug {
  will-change: transform;
  cursor: crosshair;
  -webkit-tap-highlight-color: transparent;
}

.bug-icon {
  filter: drop-shadow(0 2px 4px rgba(15, 118, 110, 0.35));
  animation: scuttle 0.18s ease-in-out infinite alternate;
}

.bug:hover .bug-icon {
  filter: drop-shadow(0 0 8px rgba(20, 184, 166, 0.7));
}

.is-squashed .bug-icon {
  animation: squash 0.35s ease-out forwards;
}

.bug-particle {
  position: absolute;
  height: 6px;
  width: 6px;
  margin: -3px 0 0 -3px;
  border-radius: 9999px;
  animation: particle 0.6s ease-out forwards;
}

.bug-floater {
  position: absolute;
  transform: translate(-50%, -50%);
  white-space: nowrap;
  animation: floater 0.9s ease-out forwards;
}

@keyframes scuttle {
  from {
    transform: rotate(-6deg);
  }
  to {
    transform: rotate(6deg);
  }
}

@keyframes squash {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  40% {
    transform: scale(1.5, 0.4);
    opacity: 1;
  }
  100% {
    transform: scale(0.2);
    opacity: 0;
  }
}

@keyframes particle {
  from {
    transform: translate(0, 0) scale(1);
    opacity: 1;
  }
  to {
    transform: translate(var(--dx), var(--dy)) scale(0.2);
    opacity: 0;
  }
}

@keyframes floater {
  from {
    transform: translate(-50%, -50%);
    opacity: 1;
  }
  to {
    transform: translate(-50%, -190%);
    opacity: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .bug-icon {
    animation: none;
  }
}
</style>
