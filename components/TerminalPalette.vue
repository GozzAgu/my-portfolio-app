<template>
  <Transition
    enter-active-class="transition duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition duration-200 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
    @after-enter="focusInput"
  >
    <div
      v-if="modelValue"
      class="fixed inset-0 z-[80] flex items-start justify-center bg-black/45 p-4 pt-[10vh] backdrop-blur-sm"
      @mousedown.self="close"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Portfolio terminal"
        class="terminal-window w-full max-w-2xl overflow-hidden rounded-2xl border border-white/10 bg-[#0b0d12] text-white shadow-2xl"
      >
        <div class="flex items-center gap-3 border-b border-white/10 px-4 py-3">
          <div class="flex gap-1.5">
            <button type="button" class="h-3 w-3 rounded-full bg-[#ff5f57]" aria-label="Close terminal" @click="close" />
            <span class="h-3 w-3 rounded-full bg-[#febc2e]" />
            <span class="h-3 w-3 rounded-full bg-[#28c840]" />
          </div>
          <p class="flex-1 text-center font-mono text-xs text-white/45">franklin@portfolio: ~</p>
          <span class="font-mono text-[11px] text-white/30">esc</span>
        </div>

        <div
          ref="scroller"
          class="max-h-[55vh] min-h-[16rem] overflow-y-auto px-5 py-4 font-mono text-[13px] leading-relaxed"
          @click="focusInput"
        >
          <div v-for="line in lines" :key="line.id" class="whitespace-pre-wrap break-words" :class="lineClass(line.kind)">
            <template v-if="line.kind === 'input'">
              <span class="text-teal-300">franklin@portfolio</span><span class="text-white/40">:~$ </span>{{ line.text }}
            </template>
            <template v-else>{{ line.text }}</template>
          </div>

          <form class="flex items-center" @submit.prevent="submit">
            <span class="shrink-0 text-teal-300">franklin@portfolio</span><span class="shrink-0 text-white/40">:~$&nbsp;</span>
            <input
              ref="input"
              v-model="draft"
              type="text"
              class="min-w-0 flex-1 bg-transparent text-white caret-teal-300 outline-none"
              autocomplete="off"
              autocapitalize="off"
              spellcheck="false"
              aria-label="Terminal command"
              @keydown="onKeydown"
            />
          </form>
        </div>

        <div class="flex flex-wrap gap-2 border-t border-white/10 px-4 py-3">
          <button
            v-for="hint in quickCommands"
            :key="hint"
            type="button"
            class="rounded-lg border border-white/10 px-2.5 py-1 font-mono text-[11px] text-white/55 transition-colors hover:border-teal-400/50 hover:text-teal-200"
            @click="execute(hint)"
          >
            {{ hint }}
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, nextTick, watch } from "vue";

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  commands: { type: Object, required: true },
});

const emit = defineEmits(["update:modelValue"]);

const quickCommands = ["help", "whoami", "skills", "play snake", "fortune", "hint", "sudo hire-franklin"];
const BUILT_INS = {
  help: "List available commands",
  clear: "Clear the screen",
  exit: "Close the terminal",
};

const input = ref(null);
const scroller = ref(null);
const draft = ref("");
const lines = ref([]);
const history = [];
let historyIndex = -1;
let seq = 0;
let greeted = false;

const print = (text, kind = "output") => {
  const items = Array.isArray(text) ? text : [text];
  lines.value = [...lines.value, ...items.map((t) => ({ id: ++seq, text: t, kind }))];
};

const lineClass = (kind) =>
  ({
    output: "text-white/75",
    error: "text-rose-300",
    success: "text-teal-200",
    muted: "text-white/40",
    input: "text-white",
  })[kind] ?? "text-white/75";

const scrollToBottom = () => nextTick(() => {
  if (scroller.value) scroller.value.scrollTop = scroller.value.scrollHeight;
});

const focusInput = () => input.value?.focus({ preventScroll: true });

const close = () => emit("update:modelValue", false);

const allNames = () => [...Object.keys(BUILT_INS), ...Object.keys(props.commands)];

const help = () => {
  const entries = [
    ...Object.entries(props.commands).filter(([, c]) => !c.hidden).map(([name, c]) => [name, c.description]),
    ...Object.entries(BUILT_INS),
  ];
  const width = Math.max(...entries.map(([name]) => name.length)) + 3;
  print(["Available commands:", ...entries.map(([name, desc]) => `  ${name.padEnd(width)}${desc}`)]);
  print("Some commands are secret. Explore.", "muted");
};

const execute = async (raw) => {
  const text = raw.trim();
  print(text, "input");
  draft.value = "";
  if (!text) return scrollToBottom();

  history.unshift(text);
  historyIndex = -1;

  const [name, ...args] = text.split(/\s+/);
  const key = name.toLowerCase();

  if (key === "help") help();
  else if (key === "clear") lines.value = [];
  else if (key === "exit") return close();
  else if (props.commands[key]) {
    try {
      const result = await props.commands[key].run(args);
      if (typeof result === "string" || Array.isArray(result)) print(result);
      else if (result) {
        if (result.lines) print(result.lines, result.kind ?? "output");
        if (result.close) setTimeout(close, 450);
      }
    } catch {
      print(`${key}: something went wrong`, "error");
    }
  } else {
    print(`command not found: ${name}. Type 'help' to see what you can do.`, "error");
  }
  scrollToBottom();
  focusInput();
};

const submit = () => execute(draft.value);

const onKeydown = (e) => {
  if (e.key === "Escape") {
    e.preventDefault();
    close();
  } else if (e.key === "ArrowUp") {
    e.preventDefault();
    if (historyIndex < history.length - 1) draft.value = history[++historyIndex];
  } else if (e.key === "ArrowDown") {
    e.preventDefault();
    historyIndex = Math.max(-1, historyIndex - 1);
    draft.value = historyIndex === -1 ? "" : history[historyIndex];
  } else if (e.key === "Tab") {
    e.preventDefault();
    const partial = draft.value.trim().toLowerCase();
    if (!partial) return;
    const matches = allNames().filter((n) => n.startsWith(partial) && !props.commands[n]?.hidden);
    if (matches.length === 1) draft.value = `${matches[0]} `;
    else if (matches.length > 1) {
      print(draft.value, "input");
      print(matches.join("   "), "muted");
      scrollToBottom();
    }
  }
};

watch(
  () => props.modelValue,
  (open) => {
    if (open && !greeted) {
      greeted = true;
      print(["Welcome to Franklin's terminal.", "Type 'help' to see what you can do, or tap a command below."], "success");
    }
    if (open) scrollToBottom();
  },
);
</script>

<style scoped>
.terminal-window {
  animation: terminal-in 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes terminal-in {
  from {
    transform: translateY(12px) scale(0.98);
  }
  to {
    transform: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .terminal-window {
    animation: none;
  }
}
</style>
