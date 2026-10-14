<template>
  <div
    class="portfolio min-h-screen flex flex-col relative transition-colors duration-500"
    :class="isDarkMode ? 'dark' : ''"
  >
    <!-- Atmosphere -->
    <div class="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <div class="absolute inset-0 bg-paper" />
      <div class="atmosphere-mesh absolute -top-32 left-1/2 h-[42rem] w-[42rem] -translate-x-1/2 rounded-full opacity-70 blur-3xl" />
      <div class="atmosphere-mesh-secondary absolute bottom-0 right-0 h-[28rem] w-[28rem] translate-x-1/4 translate-y-1/4 rounded-full opacity-50 blur-3xl" />
      <div class="absolute inset-0 noise-overlay opacity-[0.035]" />
    </div>

    <!-- Top nav -->
    <header class="fixed inset-x-0 top-0 z-50">
      <div
        class="border-b backdrop-blur-xl transition-colors duration-500"
        :class="isDarkMode ? 'border-white/10 bg-[#0b0d12]/80' : 'border-black/5 bg-[#f5f6f8]/80'"
      >
        <nav
          class="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 sm:px-8"
          aria-label="Main navigation"
        >
          <button
            type="button"
            class="group flex min-w-0 items-center gap-3"
            @click="scrollToTop"
          >
            <span
              class="font-display flex h-9 w-9 items-center justify-center rounded-xl text-sm font-bold transition-colors duration-500"
              :class="isDarkMode ? 'bg-white text-[#0b0d12]' : 'bg-[#111318] text-white'"
            >
              G
            </span>
            <span
              class="font-display hidden text-sm font-semibold leading-normal tracking-tight sm:block"
              :class="isDarkMode ? 'text-white' : 'text-[#111318]'"
            >
              Franklin Agu
            </span>
          </button>

          <div class="hidden items-center gap-8 text-sm md:flex">
            <a
              v-for="link in navLinks"
              :key="link.href"
              :href="link.href"
              class="nav-link font-medium transition-colors duration-300"
              :class="isDarkMode ? 'text-white/55 hover:text-white' : 'text-[#111318]/55 hover:text-[#111318]'"
            >
              {{ link.label }}
            </a>
          </div>

          <div class="flex items-center gap-2">
            <button
              type="button"
              class="hidden items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-50 md:inline-flex"
              :class="isDarkMode ? 'bg-white text-[#0b0d12] hover:bg-white/90' : 'bg-[#111318] text-white hover:bg-[#111318]/90'"
              :disabled="cvExporting"
              @click="exportCvToWord"
            >
              {{ cvExporting ? "Preparing…" : "Download CV" }}
            </button>
            <button
              type="button"
              class="rounded-xl p-2.5 transition-colors duration-300"
              :class="isDarkMode ? 'text-white/70 hover:bg-white/10' : 'text-[#111318]/70 hover:bg-black/5'"
              aria-label="Toggle dark mode"
              @click="toggleDarkMode"
            >
              <Icon :icon="isDarkMode ? 'ph:sun' : 'ph:moon'" class="h-5 w-5" />
            </button>
            <button
              type="button"
              class="rounded-xl p-2.5 transition-colors duration-300 md:hidden [-webkit-tap-highlight-color:transparent]"
              :class="isDarkMode ? 'text-white/70 hover:bg-white/10' : 'text-[#111318]/70 hover:bg-black/5'"
              :aria-expanded="navOpen"
              aria-controls="mobile-nav-menu"
              :aria-label="navOpen ? 'Close menu' : 'Open menu'"
              @click="navOpen = !navOpen"
            >
              <Icon :icon="navOpen ? 'ph:x' : 'ph:list'" class="h-5 w-5" />
            </button>
          </div>
        </nav>
      </div>

      <div
        id="mobile-nav-menu"
        v-show="navOpen"
        class="border-b px-5 py-3 backdrop-blur-xl md:hidden"
        :class="isDarkMode ? 'border-white/10 bg-[#0b0d12]/95' : 'border-black/5 bg-[#f5f6f8]/95'"
      >
        <div class="mx-auto flex max-w-6xl flex-col gap-1">
          <a
            v-for="link in navLinks"
            :key="link.href"
            :href="link.href"
            class="rounded-xl px-3 py-3 text-sm font-medium transition-colors duration-300"
            :class="isDarkMode ? 'text-white/80 hover:bg-white/10' : 'text-[#111318]/80 hover:bg-black/5'"
            @click="navOpen = false"
          >
            {{ link.label }}
          </a>
          <button
            type="button"
            class="mt-2 rounded-xl px-3 py-3 text-left text-sm font-semibold transition-colors duration-300 disabled:opacity-50"
            :class="isDarkMode ? 'bg-white text-[#0b0d12]' : 'bg-[#111318] text-white'"
            :disabled="cvExporting"
            @click="exportCvToWord(); navOpen = false"
          >
            {{ cvExporting ? "Preparing…" : "Download CV" }}
          </button>
        </div>
      </div>
    </header>

    <main class="relative z-10 flex-grow">
      <!-- Hero -->
      <section class="relative flex min-h-[100svh] items-end px-5 pb-16 pt-32 sm:px-8 sm:pb-24 lg:items-center lg:pb-0">
        <div class="mx-auto grid w-full max-w-6xl gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:gap-16">
          <div class="hero-copy space-y-8">
            <p
              class="text-xs font-semibold uppercase tracking-[0.28em]"
              :class="isDarkMode ? 'text-teal-300/80' : 'text-teal-800'"
            >
              Senior Customer Support Engineer
            </p>
            <h1
              class="font-display text-[clamp(3.4rem,11vw,7.5rem)] font-bold leading-[1.15] tracking-[-0.04em]"
              :class="isDarkMode ? 'text-white' : 'text-[#111318]'"
            >
              Franklin<br />Agu
            </h1>
            <p
              class="max-w-xl text-lg leading-[1.75] sm:text-xl"
              :class="isDarkMode ? 'text-white/60' : 'text-[#3a3f4b]'"
            >
              Web architecture and deployment. Six years across software engineering and technical support, resolving production issues in web apps, agentic services and serverless architectures.
            </p>
            <div class="flex flex-col gap-3 sm:flex-row sm:items-center">
              <button
                type="button"
                class="group inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold transition-all duration-300"
                :class="isDarkMode ? 'bg-white text-[#0b0d12] hover:bg-white/90' : 'bg-[#111318] text-white hover:bg-[#111318]/90'"
                @click="scrollToSection('projects')"
              >
                Explore my work
                <Icon icon="ph:arrow-right" class="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
              <button
                type="button"
                class="inline-flex items-center justify-center gap-2 rounded-xl border px-6 py-3.5 text-sm font-semibold transition-all duration-300"
                :class="isDarkMode ? 'border-white/15 text-white hover:bg-white/5' : 'border-black/10 text-[#111318] hover:bg-black/[0.03]'"
                @click="scrollToSection('contact')"
              >
                Get in touch
              </button>
            </div>
          </div>

          <div class="hero-panel relative hidden lg:block">
            <div
              class="relative rounded-[2rem] border p-8"
              :class="isDarkMode ? 'border-white/10 bg-white/[0.03]' : 'border-black/5 bg-white/70'"
            >
              <div class="space-y-8">
                <div>
                  <p class="text-xs font-semibold uppercase tracking-[0.22em]" :class="isDarkMode ? 'text-white/40' : 'text-[#6b7280]'">
                    Based in
                  </p>
                  <p class="mt-2 font-display text-2xl font-semibold leading-[1.35]" :class="isDarkMode ? 'text-white' : 'text-[#111318]'">
                    Derby, England, UK
                  </p>
                  <p class="mt-1 text-sm leading-[1.7]" :class="isDarkMode ? 'text-white/45' : 'text-[#6b7280]'">
                    Happy to cover weekend and holiday on-call rotations
                  </p>
                </div>
                <div class="h-px w-full" :class="isDarkMode ? 'bg-white/10' : 'bg-black/5'" />
                <div>
                  <p class="text-xs font-semibold uppercase tracking-[0.22em]" :class="isDarkMode ? 'text-white/40' : 'text-[#6b7280]'">
                    Focus
                  </p>
                  <p class="mt-2 text-base leading-[1.75]" :class="isDarkMode ? 'text-white/70' : 'text-[#3a3f4b]'">
                    Production troubleshooting · Vercel · Nuxt.js · TypeScript
                  </p>
                </div>
                <div class="h-px w-full" :class="isDarkMode ? 'bg-white/10' : 'bg-black/5'" />
                <button
                  type="button"
                  class="inline-flex items-center gap-2 text-sm font-semibold transition-colors duration-300"
                  :class="isDarkMode ? 'text-teal-300 hover:text-teal-200' : 'text-teal-800 hover:text-teal-950'"
                  :disabled="cvExporting"
                  @click="exportCvToWord"
                >
                  <Icon icon="ph:download-simple" class="h-4 w-4" />
                  {{ cvExporting ? "Preparing CV…" : "Download CV (Word)" }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- About -->
      <section id="about" class="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
        <div class="mb-14 max-w-2xl space-y-4">
          <p class="section-kicker">01 · About</p>
          <h2 class="font-display text-4xl font-bold leading-[1.2] tracking-tight pb-[0.1em] sm:text-5xl" :class="isDarkMode ? 'text-white' : 'text-[#111318]'">
            About me
          </h2>
          <p class="text-lg" :class="isDarkMode ? 'text-white/55' : 'text-[#6b7280]'">
            The journey, the stack, and what I care about.
          </p>
        </div>

        <div class="grid gap-14 lg:grid-cols-[1.2fr_0.8fr] lg:gap-20">
          <div class="space-y-5 text-base leading-relaxed sm:text-lg" :class="isDarkMode ? 'text-white/70' : 'text-[#3a3f4b]'">
            <p>
              Customer Support Engineer with
              <span class="font-semibold" :class="isDarkMode ? 'text-white' : 'text-[#111318]'">six years across software engineering and technical support</span>.
              I resolve production issues in web apps, agentic services and serverless architectures.
            </p>
            <p>
              I deploy on
              <span class="font-semibold" :class="isDarkMode ? 'text-white' : 'text-[#111318]'">Vercel with Nuxt.js and TypeScript</span>,
              and trace problems through HTTP requests, auth headers, SQL and SSR hydration edge cases.
            </p>
            <p>
              I explain complex systems clearly, work closely with Product Engineering to drive permanent fixes, and am happy to cover weekend and holiday on-call rotations.
            </p>
            <p>
              Holds an
              <span class="font-semibold" :class="isDarkMode ? 'text-white' : 'text-[#111318]'">MSc in Cybersecurity (Distinction, University of Derby)</span>.
            </p>
          </div>

          <div class="space-y-8">
            <div
              v-for="group in skillGroups"
              :key="group.title"
              class="border-t pt-5"
              :class="isDarkMode ? 'border-white/10' : 'border-black/5'"
            >
              <h3 class="font-display text-sm font-semibold leading-snug tracking-tight pb-[0.06em]" :class="isDarkMode ? 'text-white' : 'text-[#111318]'">
                {{ group.title }}
              </h3>
              <p class="mt-2 text-sm leading-relaxed" :class="isDarkMode ? 'text-white/50' : 'text-[#6b7280]'">
                {{ group.items }}
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Experience -->
      <section id="experience" class="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
        <div class="mb-14 max-w-2xl space-y-4">
          <p class="section-kicker">02 · Experience</p>
          <h2 class="font-display text-4xl font-bold leading-[1.2] tracking-tight pb-[0.1em] sm:text-5xl" :class="isDarkMode ? 'text-white' : 'text-[#111318]'">
            Where I've worked
          </h2>
          <p class="text-lg" :class="isDarkMode ? 'text-white/55' : 'text-[#6b7280]'">
            My professional journey so far.
          </p>
        </div>

        <div class="space-y-0">
          <article
            v-for="tab in experienceTabs"
            :key="tab.label"
            class="border-t py-10 first:border-t-0 first:pt-0"
            :class="isDarkMode ? 'border-white/10' : 'border-black/5'"
          >
            <div class="mb-6 flex flex-col gap-2 sm:mb-8 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
              <h3 class="font-display text-xl font-semibold leading-snug tracking-tight pb-[0.08em] sm:text-2xl" :class="isDarkMode ? 'text-white' : 'text-[#111318]'">
                {{ tab.label }}
              </h3>
              <p class="shrink-0 text-sm tabular-nums" :class="isDarkMode ? 'text-white/45' : 'text-[#6b7280]'">
                <span v-if="!tab.completed" class="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-teal-500 align-middle" />
                {{ tab.date }}
              </p>
            </div>
            <div class="space-y-5">
              <div
                v-for="item in tab.timeline"
                :key="item.title"
                class="grid gap-2 sm:grid-cols-[220px_1fr] sm:gap-10"
              >
                <h4 class="text-sm font-semibold" :class="isDarkMode ? 'text-white' : 'text-[#111318]'">
                  {{ item.title }}
                </h4>
                <p class="text-sm leading-relaxed" :class="isDarkMode ? 'text-white/55' : 'text-[#6b7280]'">
                  {{ item.description }}
                </p>
              </div>
            </div>
          </article>
        </div>
      </section>

      <!-- Highlight -->
      <section class="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
        <div class="mb-10 space-y-4">
          <p class="section-kicker">03 · Highlight</p>
          <h2 class="font-display text-4xl font-bold leading-[1.2] tracking-tight pb-[0.1em] sm:text-5xl" :class="isDarkMode ? 'text-white' : 'text-[#111318]'">
            Key technical project
          </h2>
        </div>
        <blockquote
          class="max-w-4xl border-l-2 pl-6 sm:pl-10"
          :class="isDarkMode ? 'border-teal-400/60' : 'border-teal-700'"
        >
          <p class="font-display text-2xl font-semibold leading-[1.25] tracking-tight pb-[0.1em] sm:text-4xl" :class="isDarkMode ? 'text-white' : 'text-[#111318]'">
            Storvv: cloud inventory platform deployed on Vercel.
          </p>
          <p class="mt-5 max-w-3xl text-base leading-relaxed sm:text-lg" :class="isDarkMode ? 'text-white/55' : 'text-[#6b7280]'">
            Founded and built a multi-tenant SaaS app for real-time inventory using Vue 3, Nuxt and TypeScript, running continuous deployment on Vercel with edge routing, custom domains and automated logging.
          </p>
        </blockquote>
      </section>

      <!-- Education -->
      <section class="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
        <div class="mb-14 space-y-4">
          <p class="section-kicker">04 · Education</p>
          <h2 class="font-display text-4xl font-bold leading-[1.2] tracking-tight pb-[0.1em] sm:text-5xl" :class="isDarkMode ? 'text-white' : 'text-[#111318]'">
            Education
          </h2>
        </div>
        <div class="grid gap-0 border-t md:grid-cols-2" :class="isDarkMode ? 'border-white/10' : 'border-black/5'">
          <div
            v-for="(edu, index) in education"
            :key="edu.degree"
            class="py-8 md:pr-10"
            :class="[
              index === 0 ? 'md:border-r md:pr-12' : 'md:pl-12',
              isDarkMode ? 'border-white/10' : 'border-black/5',
            ]"
          >
            <p class="text-sm tabular-nums" :class="isDarkMode ? 'text-white/40' : 'text-[#6b7280]'">{{ edu.year }}</p>
            <h3 class="font-display mt-3 text-xl font-semibold leading-snug tracking-tight pb-[0.08em] sm:text-2xl" :class="isDarkMode ? 'text-white' : 'text-[#111318]'">
              {{ edu.degree }}
            </h3>
            <p class="mt-2 text-sm" :class="isDarkMode ? 'text-white/50' : 'text-[#6b7280]'">{{ edu.school }}</p>
          </div>
        </div>
      </section>

      <!-- Projects -->
      <section id="projects" class="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
        <div class="mb-14 max-w-2xl space-y-4">
          <p class="section-kicker">05 · Projects</p>
          <h2 class="font-display text-4xl font-bold leading-[1.2] tracking-tight pb-[0.1em] sm:text-5xl" :class="isDarkMode ? 'text-white' : 'text-[#111318]'">
            Selected work
          </h2>
          <p class="text-lg" :class="isDarkMode ? 'text-white/55' : 'text-[#6b7280]'">
            Things I've designed, built, and shipped.
          </p>
        </div>

        <div class="grid gap-4 sm:grid-cols-2">
          <a
            v-for="project in projects"
            :key="project.name"
            :href="project.url"
            target="_blank"
            rel="noopener noreferrer"
            class="group flex flex-col rounded-2xl border p-6 transition-all duration-300 sm:p-7"
            :class="isDarkMode
              ? 'border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]'
              : 'border-black/5 bg-white/60 hover:border-black/10 hover:bg-white'"
          >
            <div class="mb-8 flex items-start justify-between gap-4">
              <p class="text-xs font-semibold uppercase tracking-[0.18em]" :class="isDarkMode ? 'text-white/40' : 'text-[#6b7280]'">
                {{ project.tag }}
              </p>
              <Icon
                icon="ph:arrow-up-right"
                class="h-5 w-5 shrink-0 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                :class="isDarkMode ? 'text-white/30 group-hover:text-white' : 'text-black/25 group-hover:text-[#111318]'"
              />
            </div>
            <h3 class="font-display text-xl font-semibold leading-snug tracking-tight pb-[0.08em]" :class="isDarkMode ? 'text-white' : 'text-[#111318]'">
              {{ project.name }}
            </h3>
            <p class="mt-3 flex-grow text-sm leading-relaxed" :class="isDarkMode ? 'text-white/50' : 'text-[#6b7280]'">
              {{ project.description }}
            </p>
            <p class="mt-6 text-xs" :class="isDarkMode ? 'text-white/30' : 'text-[#9ca3af]'">
              {{ project.host }}
            </p>
          </a>
        </div>
      </section>

      <!-- Contact -->
      <section id="contact" class="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
        <div class="mb-14 space-y-4">
          <p class="section-kicker">06 · Contact</p>
          <h2 class="font-display text-4xl font-bold leading-[1.2] tracking-tight pb-[0.1em] sm:text-5xl" :class="isDarkMode ? 'text-white' : 'text-[#111318]'">
            Get in touch
          </h2>
        </div>

        <div
          class="rounded-[2rem] border"
          :class="isDarkMode ? 'border-white/10 bg-white/[0.02]' : 'border-black/5 bg-white/70'"
        >
          <div class="grid lg:grid-cols-5">
            <div class="flex flex-col justify-between gap-10 p-8 sm:p-12 lg:col-span-3 lg:p-14">
              <div class="space-y-5">
                <p class="text-sm font-medium" :class="isDarkMode ? 'text-teal-300' : 'text-teal-800'">
                  Open to new opportunities
                </p>
                <h3 class="font-display text-4xl font-bold leading-[1.2] tracking-tight pb-[0.12em] sm:text-5xl" :class="isDarkMode ? 'text-white' : 'text-[#111318]'">
                  Let's build<br />something together.
                </h3>
                <p class="max-w-xl text-lg leading-relaxed" :class="isDarkMode ? 'text-white/55' : 'text-[#6b7280]'">
                  Customer support engineering, production troubleshooting, and web architecture and deployment. I'd love to hear about it.
                </p>
              </div>
              <div class="flex flex-col gap-4 sm:flex-row sm:items-center">
                <a
                  href="mailto:Gozieagu1@gmail.com"
                  class="group inline-flex items-center justify-center gap-2 rounded-xl px-7 py-3.5 text-sm font-semibold transition-all duration-300"
                  :class="isDarkMode ? 'bg-white text-[#0b0d12] hover:bg-white/90' : 'bg-[#111318] text-white hover:bg-[#111318]/90'"
                >
                  Say hello
                  <Icon icon="ph:arrow-right" class="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
                <span class="text-sm" :class="isDarkMode ? 'text-white/40' : 'text-[#6b7280]'">
                  Usually replies within a day
                </span>
              </div>
            </div>

            <div
              class="border-t p-4 sm:p-6 lg:col-span-2 lg:border-l lg:border-t-0 lg:p-8"
              :class="isDarkMode ? 'border-white/10 bg-black/20' : 'border-black/5 bg-black/[0.02]'"
            >
              <div class="flex h-full flex-col justify-center gap-1">
                <a
                  v-for="item in contactItems"
                  :key="item.label"
                  :href="item.href"
                  :target="item.external ? '_blank' : undefined"
                  :rel="item.external ? 'noopener noreferrer' : undefined"
                  class="group flex items-center gap-4 rounded-xl px-3 py-3.5 transition-colors duration-300"
                  :class="isDarkMode ? 'hover:bg-white/5' : 'hover:bg-white'"
                >
                  <div class="min-w-0 flex-1">
                    <p class="text-[11px] font-semibold uppercase tracking-[0.18em]" :class="isDarkMode ? 'text-white/35' : 'text-[#9ca3af]'">
                      {{ item.label }}
                    </p>
                    <p class="mt-1 truncate text-sm font-medium" :class="isDarkMode ? 'text-white/85' : 'text-[#111318]'">
                      {{ item.value }}
                    </p>
                  </div>
                  <Icon
                    v-if="item.external || item.href.startsWith('mailto') || item.href.startsWith('tel')"
                    icon="ph:arrow-up-right"
                    class="h-4 w-4 shrink-0 opacity-0 transition-all duration-300 group-hover:opacity-100"
                    :class="isDarkMode ? 'text-white/50' : 'text-[#6b7280]'"
                  />
                </a>
                <div class="flex items-center gap-4 rounded-xl px-3 py-3.5">
                  <div class="min-w-0 flex-1">
                    <p class="text-[11px] font-semibold uppercase tracking-[0.18em]" :class="isDarkMode ? 'text-white/35' : 'text-[#9ca3af]'">
                      Location
                    </p>
                    <p class="mt-1 text-sm font-medium" :class="isDarkMode ? 'text-white/85' : 'text-[#111318]'">
                      Derby, England, UK
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <!-- Footer -->
    <footer class="relative z-10 border-t" :class="isDarkMode ? 'border-white/10' : 'border-black/5'">
      <div class="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <div class="flex flex-col justify-between gap-12 md:flex-row md:items-start">
          <div class="max-w-sm space-y-4">
            <div class="flex items-center gap-3">
              <span
                class="font-display flex h-9 w-9 items-center justify-center rounded-xl text-sm font-bold"
                :class="isDarkMode ? 'bg-white text-[#0b0d12]' : 'bg-[#111318] text-white'"
              >
                G
              </span>
              <span class="font-display text-sm font-semibold" :class="isDarkMode ? 'text-white' : 'text-[#111318]'">
                Franklin Agu
              </span>
            </div>
            <p class="text-sm leading-relaxed" :class="isDarkMode ? 'text-white/45' : 'text-[#6b7280]'">
              Senior Customer Support Engineer · web architecture and deployment.
            </p>
          </div>

          <div class="flex flex-wrap gap-14">
            <div class="space-y-4">
              <p class="text-[11px] font-semibold uppercase tracking-[0.22em]" :class="isDarkMode ? 'text-white/35' : 'text-[#9ca3af]'">
                Explore
              </p>
              <div class="flex flex-col gap-2.5 text-sm">
                <a href="#about" class="footer-link" :class="isDarkMode ? 'text-white/55 hover:text-white' : 'text-[#6b7280] hover:text-[#111318]'">About</a>
                <a href="#projects" class="footer-link" :class="isDarkMode ? 'text-white/55 hover:text-white' : 'text-[#6b7280] hover:text-[#111318]'">Projects</a>
                <a href="#contact" class="footer-link" :class="isDarkMode ? 'text-white/55 hover:text-white' : 'text-[#6b7280] hover:text-[#111318]'">Contact</a>
              </div>
            </div>
            <div class="space-y-4">
              <p class="text-[11px] font-semibold uppercase tracking-[0.22em]" :class="isDarkMode ? 'text-white/35' : 'text-[#9ca3af]'">
                Connect
              </p>
              <div class="flex flex-col gap-2.5 text-sm">
                <a href="mailto:Gozieagu1@gmail.com" class="footer-link" :class="isDarkMode ? 'text-white/55 hover:text-white' : 'text-[#6b7280] hover:text-[#111318]'">Email</a>
                <a href="https://www.linkedin.com/in/franklin-agu-85019b209/" target="_blank" rel="noopener noreferrer" class="footer-link" :class="isDarkMode ? 'text-white/55 hover:text-white' : 'text-[#6b7280] hover:text-[#111318]'">LinkedIn</a>
                <a href="https://github.com/GozzAgu" target="_blank" rel="noopener noreferrer" class="footer-link" :class="isDarkMode ? 'text-white/55 hover:text-white' : 'text-[#6b7280] hover:text-[#111318]'">GitHub</a>
              </div>
            </div>
          </div>
        </div>

        <div
          class="mt-12 flex flex-col items-start justify-between gap-3 border-t pt-6 text-xs sm:flex-row sm:items-center"
          :class="isDarkMode ? 'border-white/10 text-white/30' : 'border-black/5 text-[#9ca3af]'"
        >
          <p>© {{ new Date().getFullYear() }} Franklin Agu. All rights reserved.</p>
          <p>Built with Nuxt.js & Tailwind CSS</p>
        </div>
      </div>
    </footer>

    <Transition
      enter-active-class="transition-all duration-500 ease-out"
      enter-from-class="opacity-0 translate-y-3"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-300 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 translate-y-3"
    >
      <button
        v-show="showScrollToTop"
        type="button"
        class="fixed bottom-7 right-7 z-50 rounded-xl border p-3.5 transition-colors duration-300"
        :class="isDarkMode ? 'border-white/10 bg-[#13161d] text-white hover:bg-white/10' : 'border-black/5 bg-white text-[#111318] hover:bg-black/[0.03]'"
        aria-label="Scroll to top"
        @click="scrollToTop"
      >
        <Icon icon="ph:arrow-up" class="h-5 w-5" />
      </button>
    </Transition>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from "vue";
import { Icon } from "@iconify/vue";
import { downloadCvDocx } from "~/utils/generateCvDocx";

const isDarkMode = ref(false);
const cvExporting = ref(false);
const showScrollToTop = ref(false);
const navOpen = ref(false);

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const skillGroups = [
  {
    title: "Platforms",
    items: "Vercel (Preview Deployments, Edge Functions), v0, serverless, agentic services",
  },
  {
    title: "Frameworks",
    items: "Nuxt.js, Vue.js, TypeScript, Node.js, JavaScript, Tailwind CSS",
  },
  {
    title: "Support",
    items: "Root cause analysis, incident triage, deployment troubleshooting, Zendesk, ClickUp",
  },
  {
    title: "Data and APIs",
    items: "SQL, REST APIs, JSON, webhooks, Firebase, Docker, Git, Postman, Chrome DevTools",
  },
  {
    title: "Documentation",
    items: "Technical writing, runbooks, knowledge bases, developer education",
  },
];

const education = [
  {
    year: "2025",
    degree: "MSc Cybersecurity · Distinction",
    school: "University of Derby, UK",
  },
  {
    year: "2020",
    degree: "BSc Computer Information Systems",
    school: "Babcock University, Nigeria",
  },
];

const contactItems = [
  {
    label: "Email",
    value: "Gozieagu1@gmail.com",
    href: "mailto:Gozieagu1@gmail.com",
  },
  {
    label: "LinkedIn",
    value: "Franklin Agu",
    href: "https://www.linkedin.com/in/franklin-agu-85019b209/",
    external: true,
  },
  {
    label: "GitHub",
    value: "GozzAgu",
    href: "https://github.com/GozzAgu",
    external: true,
  },
  {
    label: "Phone",
    value: "+44 7551 116 916",
    href: "tel:+447551116916",
  },
];

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value;
  localStorage.setItem("darkMode", isDarkMode.value.toString());
  document.documentElement.classList.toggle("dark", isDarkMode.value);
};

const scrollToTop = () => {
  navOpen.value = false;
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
};

const handleScroll = () => {
  showScrollToTop.value = window.scrollY > 300;
};

const handleLayoutResize = () => {
  if (typeof window !== "undefined" && window.innerWidth >= 768) {
    navOpen.value = false;
  }
  handleScroll();
};

const experienceTabs = [
  {
    label: "Customer Support Engineer - Concentrix, England, UK",
    date: "March 2026 - Present",
    completed: false,
    timeline: [
      {
        title: "Complex Case Resolution",
        description:
          "Solve complex cases on multi-tenant web apps by tracing HTTP requests, auth headers and status codes.",
      },
      {
        title: "Root Cause Analysis",
        description:
          "Find root causes of recurring integration failures with Product Engineering to drive permanent fixes.",
      },
      {
        title: "SPA & SSR Diagnostics",
        description:
          "Diagnose state and data hydration edge cases in TypeScript SPA and SSR apps.",
      },
      {
        title: "SQL & Internal Tooling",
        description:
          "Write SQL queries and internal scripts to inspect data and speed up the team.",
      },
      {
        title: "Runbooks & Knowledge Base",
        description:
          "Create runbooks and knowledge base articles that support enterprise escalations.",
      },
    ],
  },
  {
    label: "Customer Support (Part Time) - EE (BT Group), England, UK",
    date: "April 2025 - March 2026",
    completed: true,
    timeline: [
      {
        title: "Clear Technical Communication",
        description:
          "Explained technical behaviour and network configuration clearly to non-technical customers.",
      },
      {
        title: "Mentoring",
        description:
          "Mentored teammates in a high-volume environment while resolving frontline issues quickly.",
      },
      {
        title: "Diagnostic Workflows",
        description:
          "Wrote diagnostic workflows and incident guides that sped up triage across teams.",
      },
    ],
  },
  {
    label: "Software Engineer (Web and APIs) - CypherCrescent Ltd, Remote",
    date: "2020 - 2025",
    completed: true,
    timeline: [
      {
        title: "Production SPAs & REST Backends",
        description:
          "Built, debugged and deployed production SPAs and REST backends in JavaScript and TypeScript.",
      },
      {
        title: "Typed Component Interfaces",
        description:
          "Built typed, component-driven interfaces with solid state management.",
      },
      {
        title: "Performance Tuning",
        description:
          "Fixed performance bottlenecks by inspecting payloads and tuning HTTP caching.",
      },
      {
        title: "Requirements to Specs",
        description:
          "Turned business requirements and bug reports into clear specs within Agile teams.",
      },
    ],
  },
  {
    label: "Software Engineer (Web and APIs) - Famous Parking (Remote, USA)",
    date: "2023 - 2024",
    completed: true,
    timeline: [
      {
        title: "Transactional Systems",
        description:
          "Built and supported systems handling sensitive transactional and user data with security best practices.",
      },
      {
        title: "Payment API Integrations",
        description:
          "Integrated and debugged third-party APIs for secure payments and real-time data processing.",
      },
      {
        title: "Testing & Risk Mitigation",
        description:
          "Ran regression testing and documented test cases to reduce operational and security risks.",
      },
      {
        title: "Requirements to Specs",
        description:
          "Translated business requirements into clear, maintainable software implementations.",
      },
    ],
  },
];

const projects = [
  {
    name: "Storvv",
    tag: "Cloud inventory platform on Vercel",
    icon: "ph:shield-check",
    description:
      "Founded and built a multi-tenant SaaS app for real-time inventory using Vue 3, Nuxt and TypeScript. Continuous deployment on Vercel with edge routing, custom domains and automated logging.",
    url: "https://www.storvv.com",
    host: "storvv.com",
  },
  {
    name: "SmartPhoneHub",
    tag: "Retail ecommerce",
    icon: "ph:storefront",
    description:
      "Ecommerce experience for phones, laptops, wearables, and accessories, with shop by category, trade-in, support, and store info in a polished, responsive layout.",
    url: "https://sph-ng.com/",
    host: "sph-ng.com",
  },
  {
    name: "Secret Santa Generator",
    tag: "Interactive tool",
    icon: "ph:gift",
    description:
      "Gift exchange generator that randomly pairs participants while ensuring no one gets themselves, with participant management, notifications, and wishlists.",
    url: "https://secret-santa-virid.vercel.app/auth",
    host: "secret-santa-virid.vercel.app",
  },
  {
    name: "Password Entropy Calculator",
    tag: "Security utility",
    icon: "ph:shield-chevron",
    description:
      "Password strength analysis with entropy scoring, presented through a clean, modern web UI.",
    url: "https://password-entropy-six.vercel.app/",
    host: "password-entropy-six.vercel.app",
  },
  {
    name: "KUO Company Website",
    tag: "Corporate site",
    icon: "ph:building-office",
    description:
      "Corporate website for KUO Smart Solutions showcasing services, team expertise, and client testimonials with optimised performance and SEO.",
    url: "https://www.kuosmartsolution.com/",
    host: "kuosmartsolution.com",
  },
  {
    name: "Visioni and Strauss",
    tag: "Corporate site",
    icon: "ph:building-office",
    description:
      "Clean, professional corporate site presenting services, team, and testimonials with an SEO-focused structure.",
    url: "https://www.visioniandstrauss.com/",
    host: "visioniandstrauss.com",
  },
  {
    name: "T30 Energies",
    tag: "Energy company site",
    icon: "ph:lightning",
    description:
      "Energy company website with dynamic content, interactive service portfolios, and a mobile-first responsive design.",
    url: "https://www.t30energies.com/",
    host: "t30energies.com",
  },
];

const exportCvToWord = async () => {
  if (import.meta.server) return;
  try {
    cvExporting.value = true;
    await downloadCvDocx(experienceTabs);
  } catch (err) {
    console.error("CV export failed:", err);
  } finally {
    cvExporting.value = false;
  }
};

onMounted(() => {
  const savedDarkMode = localStorage.getItem("darkMode");
  if (savedDarkMode !== null) {
    isDarkMode.value = savedDarkMode === "true";
  } else {
    isDarkMode.value = false;
  }

  if (isDarkMode.value) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }

  window.addEventListener("scroll", handleScroll);
  window.addEventListener("resize", handleLayoutResize);

  nextTick(() => {
    handleScroll();
  });
});
</script>

<style scoped>
.bg-paper {
  background: var(--paper);
}

.atmosphere-mesh {
  background: radial-gradient(circle, rgba(15, 118, 110, 0.16), transparent 68%);
  animation: drift 18s ease-in-out infinite;
}

.atmosphere-mesh-secondary {
  background: radial-gradient(circle, rgba(17, 19, 24, 0.08), transparent 70%);
  animation: drift 22s ease-in-out infinite reverse;
}

.dark .atmosphere-mesh {
  background: radial-gradient(circle, rgba(45, 212, 191, 0.12), transparent 68%);
}

.dark .atmosphere-mesh-secondary {
  background: radial-gradient(circle, rgba(255, 255, 255, 0.04), transparent 70%);
}

.noise-overlay {
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-size: 180px;
}

.section-kicker {
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: #0f766e;
}

.dark .section-kicker {
  color: rgba(45, 212, 191, 0.85);
}

.hero-copy {
  animation: rise 1s cubic-bezier(0.16, 1, 0.3, 1) both;
}

.hero-panel {
  animation: rise 1.15s cubic-bezier(0.16, 1, 0.3, 1) 0.12s both;
}

.nav-link,
.footer-link {
  transition: color 0.3s ease;
}

/* Opacity-only: transforms create a layer that clips Syne/DM Sans descenders */
@keyframes rise {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes drift {
  0%,
  100% {
    transform: translate3d(-50%, 0, 0) scale(1);
  }
  50% {
    transform: translate3d(-46%, 4%, 0) scale(1.08);
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero-copy,
  .hero-panel,
  .atmosphere-mesh,
  .atmosphere-mesh-secondary {
    animation: none;
  }
}
</style>
