<template>
  <Transition
    enter-active-class="transition duration-700"
    enter-from-class="opacity-0"
    leave-active-class="transition duration-700"
    leave-to-class="opacity-0"
  >
    <div
      v-if="modelValue"
      class="fixed inset-0 z-[90] cursor-pointer bg-black"
      role="dialog"
      aria-label="Matrix easter egg. Click or press Escape to exit."
      @click="close"
    >
      <canvas ref="canvas" class="absolute inset-0 h-full w-full" />
      <div class="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center font-mono">
        <p class="matrix-line text-lg text-teal-200 sm:text-2xl" style="animation-delay: 0.8s">Wake up, recruiter…</p>
        <p class="matrix-line text-sm text-teal-300/70 sm:text-base" style="animation-delay: 2.2s">The Matrix has you. Hire Franklin.</p>
        <p class="matrix-line mt-6 text-xs text-white/35" style="animation-delay: 3.4s">click or press esc to exit</p>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, watch, nextTick, onBeforeUnmount } from "vue";

const props = defineProps({
  modelValue: { type: Boolean, default: false },
});

const emit = defineEmits(["update:modelValue"]);

const GLYPHS = "アイウエオカキクケコサシスセソ0123456789{}<>/=;$#FRANKLINVUENUXT";
const FONT_SIZE = 16;
const DURATION = 9000;

const canvas = ref(null);
let raf = 0;
let timeout = 0;
let drops = [];
let ctx = null;
let lastStep = 0;

const close = () => emit("update:modelValue", false);

const onKeydown = (e) => {
  if (e.key === "Escape") close();
};

const resize = () => {
  if (!canvas.value) return;
  const dpr = window.devicePixelRatio || 1;
  canvas.value.width = window.innerWidth * dpr;
  canvas.value.height = window.innerHeight * dpr;
  ctx = canvas.value.getContext("2d");
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  const columns = Math.ceil(window.innerWidth / FONT_SIZE);
  drops = Array.from({ length: columns }, () => Math.random() * -60);
};

const frame = (t) => {
  if (ctx && t - lastStep > 45) {
    lastStep = t;
    ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
    ctx.font = `${FONT_SIZE}px ui-monospace, Menlo, monospace`;
    drops.forEach((y, i) => {
      const char = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
      const x = i * FONT_SIZE;
      ctx.fillStyle = Math.random() > 0.96 ? "#ccfbf1" : "#2dd4bf";
      ctx.fillText(char, x, y * FONT_SIZE);
      drops[i] = y * FONT_SIZE > window.innerHeight && Math.random() > 0.975 ? 0 : y + 1;
    });
  }
  raf = requestAnimationFrame(frame);
};

const stop = () => {
  cancelAnimationFrame(raf);
  clearTimeout(timeout);
  window.removeEventListener("keydown", onKeydown);
  window.removeEventListener("resize", resize);
};

watch(
  () => props.modelValue,
  async (open) => {
    if (!open) return stop();
    await nextTick();
    resize();
    window.addEventListener("keydown", onKeydown);
    window.addEventListener("resize", resize);
    raf = requestAnimationFrame(frame);
    timeout = setTimeout(close, DURATION);
  },
);

onBeforeUnmount(stop);
</script>

<style scoped>
.matrix-line {
  opacity: 0;
  animation: type-in 0.9s ease-out forwards;
  text-shadow: 0 0 12px rgba(45, 212, 191, 0.6);
}

@keyframes type-in {
  from {
    opacity: 0;
    filter: blur(6px);
  }
  to {
    opacity: 1;
    filter: none;
  }
}
</style>
