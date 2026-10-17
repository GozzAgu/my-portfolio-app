<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
useHead({
  link: [
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=Outfit:wght@500;600;700;800&display=swap",
    },
  ],
});
</script>

<style>
:root {
  --font-display: "Outfit", sans-serif;
  --font-body: "DM Sans", sans-serif;
  --ink: #111318;
  --ink-soft: #3a3f4b;
  --muted: #6b7280;
  --paper: #f5f6f8;
  --surface: #ffffff;
  --line: #e4e7ec;
  --accent: #0f766e;
  --accent-soft: #ccfbf1;
}

.dark {
  --ink: #f4f5f7;
  --ink-soft: #c4c9d4;
  --muted: #8b93a7;
  --paper: #0b0d12;
  --surface: #13161d;
  --line: #252a35;
  --accent: #2dd4bf;
  --accent-soft: #134e4a;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
  font-family: var(--font-body);
}

body {
  font-family: var(--font-body);
  line-height: 1.7;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: var(--paper);
  color: var(--ink);
  transition: background-color 0.5s ease, color 0.5s ease;
}

h1,
h2,
h3,
h4,
.font-display {
  font-family: var(--font-display);
  letter-spacing: -0.03em;
  overflow: visible;
  line-height: 1.2;
}

/* Without this, elements with different transition durations change colour out of sync on theme toggle */
.theme-switching,
.theme-switching *,
.theme-switching *::before,
.theme-switching *::after {
  transition: none !important;
}

::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: var(--line);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--muted);
}

::selection {
  background: var(--accent);
  color: white;
}

*:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 3px;
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
</style>
