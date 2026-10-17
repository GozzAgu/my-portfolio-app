<template>
  <Transition
    enter-active-class="transition duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition duration-200 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="modelValue"
      class="fixed inset-0 z-[80] flex items-center justify-center overflow-y-auto bg-black/50 p-4 backdrop-blur-sm"
      @mousedown.self="close"
    >
      <div
        ref="panel"
        role="dialog"
        aria-modal="true"
        :aria-label="title"
        tabindex="-1"
        class="arcade-panel my-auto w-full max-w-lg rounded-[1.75rem] border p-5 shadow-2xl outline-none sm:p-7"
        :class="dark ? 'border-white/10 bg-[#13161d] text-white' : 'border-black/5 bg-white text-[#111318]'"
      >
        <div class="mb-5 flex items-start justify-between gap-4">
          <div>
            <p class="text-[11px] font-semibold uppercase tracking-[0.22em]" :class="dark ? 'text-teal-300/80' : 'text-teal-800'">
              Arcade
            </p>
            <h2 class="mt-1 font-display text-2xl font-bold tracking-tight">{{ title }}</h2>
            <p v-if="subtitle" class="mt-1 text-sm" :class="dark ? 'text-white/50' : 'text-[#6b7280]'">{{ subtitle }}</p>
          </div>
          <button
            type="button"
            class="rounded-xl p-2 transition-colors"
            :class="dark ? 'text-white/60 hover:bg-white/10' : 'text-[#111318]/60 hover:bg-black/5'"
            aria-label="Close game"
            @click="close"
          >
            <Icon icon="ph:x" class="h-5 w-5" />
          </button>
        </div>
        <slot />
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, watch, nextTick, onBeforeUnmount } from "vue";
import { Icon } from "@iconify/vue";

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  title: { type: String, required: true },
  subtitle: { type: String, default: "" },
  dark: { type: Boolean, default: false },
});

const emit = defineEmits(["update:modelValue"]);
const panel = ref(null);

const close = () => emit("update:modelValue", false);

const onKeydown = (e) => {
  if (e.key === "Escape") close();
};

watch(
  () => props.modelValue,
  (open) => {
    if (open) {
      window.addEventListener("keydown", onKeydown);
      nextTick(() => panel.value?.focus({ preventScroll: true }));
    } else {
      window.removeEventListener("keydown", onKeydown);
    }
  },
);

onBeforeUnmount(() => window.removeEventListener("keydown", onKeydown));
</script>

<style scoped>
.arcade-panel {
  animation: panel-in 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes panel-in {
  from {
    transform: translateY(16px) scale(0.97);
  }
  to {
    transform: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .arcade-panel {
    animation: none;
  }
}
</style>
