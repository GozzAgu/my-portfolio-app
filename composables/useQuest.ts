import { computed } from "vue";

export type Achievement = {
  id: string;
  title: string;
  description: string;
  xp: number;
  icon: string;
  secret?: boolean;
};

export type QuestToast = {
  id: number;
  kind: "achievement" | "level";
  title: string;
  xp: number;
  icon: string;
};

export const ACHIEVEMENTS: Achievement[] = [
  { id: "seen-about", title: "Getting to know me", description: "Read the About section", xp: 15, icon: "ph:user-circle-fill" },
  { id: "seen-experience", title: "Career archaeologist", description: "Scrolled through my experience", xp: 15, icon: "ph:briefcase-fill" },
  { id: "seen-projects", title: "Code tourist", description: "Checked out my projects", xp: 15, icon: "ph:squares-four-fill" },
  { id: "seen-contact", title: "Almost there", description: "Reached the contact section", xp: 15, icon: "ph:paper-plane-tilt-fill" },
  { id: "full-tour", title: "Full tour", description: "Visited every section", xp: 40, icon: "ph:map-trifold-fill" },
  { id: "first-bug", title: "First fix", description: "Squashed your first bug", xp: 10, icon: "ph:bug-fill" },
  { id: "all-bugs", title: "Incident resolved", description: "Squashed every bug in production", xp: 50, icon: "ph:shield-check-fill" },
  { id: "theme", title: "Lights out", description: "Switched the theme", xp: 10, icon: "ph:moon-stars-fill" },
  { id: "terminal", title: "Power user", description: "Opened the terminal", xp: 15, icon: "ph:terminal-window-fill" },
  { id: "project", title: "Window shopper", description: "Opened a live project", xp: 20, icon: "ph:arrow-square-out-fill" },
  { id: "cv", title: "Paper trail", description: "Downloaded the CV", xp: 30, icon: "ph:file-arrow-down-fill" },
  { id: "hello", title: "Say hello", description: "Clicked to email me", xp: 30, icon: "ph:hand-waving-fill" },
  { id: "snake-10", title: "Low latency", description: "Routed 10 packets in Packet Snake", xp: 30, icon: "ph:lightning-fill" },
  { id: "memory-clear", title: "Full-stack memory", description: "Matched every pair in Stack Memory", xp: 30, icon: "ph:cards-fill" },
  { id: "sudo", title: "Root access", description: "Ran a sudo command in the terminal", xp: 25, icon: "ph:key-fill", secret: true },
  { id: "matrix", title: "Follow the white rabbit", description: "Entered the Matrix", xp: 25, icon: "ph:binary-fill", secret: true },
  { id: "persistent", title: "Persistent", description: "Clicked the logo five times in a row", xp: 20, icon: "ph:cursor-click-fill", secret: true },
  { id: "konami", title: "Old-school gamer", description: "Entered the Konami code", xp: 60, icon: "ph:game-controller-fill", secret: true },
];

const LEVELS = [
  { xp: 0, title: "Visitor" },
  { xp: 40, title: "Explorer" },
  { xp: 120, title: "Debugger" },
  { xp: 240, title: "Engineer" },
  { xp: 380, title: "Legend" },
];

const SECTION_ACHIEVEMENTS = ["seen-about", "seen-experience", "seen-projects", "seen-contact"];
const STORAGE_KEY = "franklin-quest-v1";
const SCORES_KEY = "franklin-arcade-v1";
const byId = Object.fromEntries(ACHIEVEMENTS.map((a) => [a.id, a]));
const MAX_XP = ACHIEVEMENTS.reduce((sum, a) => sum + a.xp, 0);

let toastSeq = 0;

export function useQuest() {
  const unlocked = useState<string[]>("quest-unlocked", () => []);
  const toasts = useState<QuestToast[]>("quest-toasts", () => []);
  const celebrateTick = useState<number>("quest-celebrate", () => 0);
  const bestScores = useState<Record<string, number>>("arcade-best", () => ({}));

  const xp = computed(() => unlocked.value.reduce((sum, id) => sum + (byId[id]?.xp ?? 0), 0));
  const levelIndex = computed(() => {
    let index = 0;
    LEVELS.forEach((level, i) => {
      if (xp.value >= level.xp) index = i;
    });
    return index;
  });
  const level = computed(() => LEVELS[levelIndex.value]);
  const nextLevel = computed(() => LEVELS[levelIndex.value + 1] ?? null);
  const progress = computed(() => {
    if (!nextLevel.value) return 1;
    const base = level.value.xp;
    return (xp.value - base) / (nextLevel.value.xp - base);
  });

  const persist = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(unlocked.value));
    } catch {}
  };

  const load = () => {
    try {
      const ids = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
      if (Array.isArray(ids)) unlocked.value = ids.filter((id) => byId[id]);
      const scores = JSON.parse(localStorage.getItem(SCORES_KEY) ?? "{}");
      if (scores && typeof scores === "object") bestScores.value = scores;
    } catch {}
  };

  /** Saves the score if it beats the stored best. `lowerIsBetter` is for move counts. */
  const recordScore = (game: string, score: number, { lowerIsBetter = false } = {}): boolean => {
    const best = bestScores.value[game];
    const isBest = best === undefined || (lowerIsBetter ? score < best : score > best);
    if (!isBest) return false;
    bestScores.value = { ...bestScores.value, [game]: score };
    try {
      localStorage.setItem(SCORES_KEY, JSON.stringify(bestScores.value));
    } catch {}
    return true;
  };

  const dismissToast = (id: number) => {
    toasts.value = toasts.value.filter((t) => t.id !== id);
  };

  const pushToast = (toast: Omit<QuestToast, "id">) => {
    const id = ++toastSeq;
    toasts.value = [...toasts.value, { ...toast, id }];
    setTimeout(() => dismissToast(id), 4200);
  };

  const celebrate = () => {
    celebrateTick.value++;
  };

  const has = (id: string) => unlocked.value.includes(id);

  const unlock = (id: string): boolean => {
    const achievement = byId[id];
    if (!achievement || has(id)) return false;

    const levelBefore = levelIndex.value;
    unlocked.value = [...unlocked.value, id];
    persist();
    pushToast({ kind: "achievement", title: achievement.title, xp: achievement.xp, icon: achievement.icon });

    if (levelIndex.value > levelBefore) {
      pushToast({
        kind: "level",
        title: `Level ${levelIndex.value + 1} · ${level.value.title}`,
        xp: 0,
        icon: "ph:crown-simple-fill",
      });
      celebrate();
    }

    if (SECTION_ACHIEVEMENTS.includes(id) && SECTION_ACHIEVEMENTS.every(has)) {
      unlock("full-tour");
    }
    return true;
  };

  const reset = () => {
    unlocked.value = [];
    persist();
  };

  return {
    achievements: ACHIEVEMENTS,
    maxXp: MAX_XP,
    unlocked,
    toasts,
    celebrateTick,
    xp,
    level,
    levelNumber: computed(() => levelIndex.value + 1),
    nextLevel,
    progress,
    bestScores,
    recordScore,
    has,
    unlock,
    load,
    reset,
    celebrate,
    dismissToast,
  };
}
