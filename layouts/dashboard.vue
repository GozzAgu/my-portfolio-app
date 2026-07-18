<template>
  <div class="min-h-screen flex flex-col relative overflow-hidden transition-colors duration-700 ease-out" :class="isDarkMode ? 'bg-[#0a0a0f] text-gray-100' : 'bg-gray-50 text-gray-900'">

    <!-- Floating header: compact row on mobile + slide-down menu -->
    <header class="w-full fixed top-4 z-50 px-4 sm:px-6">
      <div class="max-w-5xl mx-auto relative">
        <nav
          class="pl-4 pr-2.5 sm:pl-5 sm:pr-3 py-2.5 flex justify-between items-center gap-3 rounded-full backdrop-blur-xl transition-all duration-700 ease-out"
          :class="isDarkMode ? 'bg-gray-900/70 border border-gray-800' : 'bg-white/80 border border-gray-200'"
          aria-label="Main navigation"
        >
          <div class="flex items-center gap-3 group cursor-pointer min-w-0 flex-shrink-0" @click="scrollToTop">
            <div class="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-700 ease-out" :class="isDarkMode ? 'bg-white text-gray-900' : 'bg-gray-900 text-white'">
              G
            </div>
            <span class="hidden sm:block text-sm font-semibold tracking-tight transition-colors duration-700 ease-out truncate" :class="isDarkMode ? 'text-white' : 'text-gray-900'">Franklin Agu</span>
          </div>

          <!-- Desktop / tablet: inline links -->
          <div class="hidden md:flex items-center gap-1 text-sm">
            <a href="#about" class="px-4 py-2 rounded-full font-medium transition-all duration-500 ease-out whitespace-nowrap" :class="isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'">
              About
            </a>
            <a href="#projects" class="px-4 py-2 rounded-full font-medium transition-all duration-500 ease-out whitespace-nowrap" :class="isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'">
              Projects
            </a>
            <a href="#contact" class="px-4 py-2 rounded-full font-medium transition-all duration-500 ease-out whitespace-nowrap" :class="isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'">
              Contact
            </a>
          </div>

          <div class="flex items-center gap-2 flex-shrink-0">
            <button
              type="button"
              @click="exportCvToWord"
              :disabled="cvExporting"
              class="hidden md:inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold transition-all duration-500 ease-out disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
              :class="isDarkMode ? 'bg-white text-gray-900 hover:bg-gray-200' : 'bg-gray-900 text-white hover:bg-gray-800'"
            >
              <Icon icon="ph:download-simple" class="w-4 h-4" />
              {{ cvExporting ? 'Preparing…' : 'Download CV' }}
            </button>
            <button
              type="button"
              @click="toggleDarkMode"
              class="p-2.5 rounded-full transition-all duration-500 ease-out"
              :class="isDarkMode ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-600 hover:bg-gray-100'"
              aria-label="Toggle dark mode"
            >
              <Icon v-if="isDarkMode" icon="ph:sun-duotone" class="w-5 h-5" />
              <Icon v-else icon="ph:moon-duotone" class="w-5 h-5" />
            </button>
            <button
              type="button"
              class="md:hidden p-2.5 rounded-full transition-all duration-500 ease-out [-webkit-tap-highlight-color:transparent]"
              :class="isDarkMode ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-700 hover:bg-gray-100'"
              :aria-expanded="navOpen"
              aria-controls="mobile-nav-menu"
              :aria-label="navOpen ? 'Close menu' : 'Open menu'"
              @click="navOpen = !navOpen"
            >
              <Icon :icon="navOpen ? 'ph:x' : 'ph:list'" class="w-5 h-5" />
            </button>
          </div>
        </nav>

        <!-- Mobile menu panel -->
        <div
          id="mobile-nav-menu"
          v-show="navOpen"
          class="md:hidden absolute left-0 right-0 top-[calc(100%+0.5rem)] rounded-[1.75rem] border overflow-hidden backdrop-blur-xl transition-colors duration-700 ease-out"
          :class="isDarkMode ? 'bg-gray-900/95 border-gray-800' : 'bg-white/95 border-gray-200'"
        >
          <div class="flex flex-col p-2.5">
            <a
              href="#about"
              class="px-4 py-3.5 rounded-2xl font-medium transition-all duration-500 ease-out"
              :class="isDarkMode ? 'text-gray-200 hover:bg-gray-800' : 'text-gray-800 hover:bg-gray-100'"
              @click="navOpen = false"
            >
              About
            </a>
            <a
              href="#projects"
              class="px-4 py-3.5 rounded-2xl font-medium transition-all duration-500 ease-out"
              :class="isDarkMode ? 'text-gray-200 hover:bg-gray-800' : 'text-gray-800 hover:bg-gray-100'"
              @click="navOpen = false"
            >
              Projects
            </a>
            <a
              href="#contact"
              class="px-4 py-3.5 rounded-2xl font-medium transition-all duration-500 ease-out"
              :class="isDarkMode ? 'text-gray-200 hover:bg-gray-800' : 'text-gray-800 hover:bg-gray-100'"
              @click="navOpen = false"
            >
              Contact
            </a>
            <div class="p-1.5 pt-2.5">
              <button
                type="button"
                :disabled="cvExporting"
                class="w-full inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-2xl font-semibold transition-all duration-500 ease-out disabled:opacity-50 disabled:cursor-not-allowed"
                :class="isDarkMode ? 'bg-white text-gray-900 hover:bg-gray-200' : 'bg-gray-900 text-white hover:bg-gray-800'"
                @click="exportCvToWord(); navOpen = false"
              >
                <Icon icon="ph:download-simple" class="w-4 h-4" />
                {{ cvExporting ? 'Preparing…' : 'Download CV' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>

    <main class="flex-grow w-full px-4 sm:px-6 py-20 relative z-10">
      <!-- Hero Section - Modern & Minimal -->
      <section class="min-h-screen flex items-center justify-center py-20 max-w-7xl mx-auto">
        <div class="text-center space-y-10 animate-fade-in-up w-full">
          <!-- Avatar -->
          <div class="relative inline-block">
            <div class="w-28 h-28 sm:w-32 sm:h-32 mx-auto rounded-[2rem] flex items-center justify-center transition-all duration-700 ease-out" :class="isDarkMode ? 'bg-gray-800' : 'bg-gray-900'">
              <span class="text-5xl sm:text-6xl font-bold text-white">G</span>
            </div>
          </div>

          <!-- Availability pill -->
          <div class="flex justify-center px-4">
            <div class="inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-xs font-medium transition-colors duration-700 ease-out" :class="isDarkMode ? 'bg-gray-900/60 border border-gray-800 text-gray-300' : 'bg-white border border-gray-200 text-gray-600'">
              <span class="relative flex h-2 w-2">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60"></span>
                <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Open to new opportunities
              <span class="opacity-40">·</span>
              England, UK
            </div>
          </div>

          <!-- Name -->
          <div class="space-y-5 px-4">
            <h1 class="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.02] transition-colors duration-700 ease-out" :class="isDarkMode ? 'text-white' : 'text-gray-900'">
              Franklin Agu
            </h1>
            <p class="text-lg sm:text-xl md:text-2xl font-light max-w-3xl mx-auto leading-relaxed transition-colors duration-700 ease-out" :class="isDarkMode ? 'text-gray-400' : 'text-gray-600'">
              Senior Frontend Engineer · Vue 3 & Vue 2 · State Management & Framework Modernisation
            </p>
          </div>

          <!-- CTA Buttons -->
          <div class="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-3 sm:gap-4 px-4 max-w-3xl mx-auto">
            <button
              @click="scrollToSection('projects')"
              class="group px-7 py-3.5 rounded-2xl font-semibold transition-all duration-700 ease-out w-full sm:w-auto flex items-center justify-center gap-2.5"
              :class="isDarkMode ? 'bg-white text-gray-900 hover:bg-gray-200' : 'bg-gray-900 text-white hover:bg-gray-800'"
            >
              Explore my work
              <Icon icon="ph:arrow-right" class="w-4.5 h-4.5 transition-transform duration-500 group-hover:translate-x-1" />
            </button>
            <button
              type="button"
              @click="exportCvToWord"
              :disabled="cvExporting"
              class="px-7 py-3.5 rounded-2xl font-semibold transition-all duration-700 ease-out w-full sm:w-auto flex items-center justify-center gap-2.5 border disabled:opacity-50 disabled:cursor-not-allowed"
              :class="isDarkMode ? 'bg-transparent border-gray-700 text-gray-200 hover:bg-gray-800' : 'bg-white border-gray-200 text-gray-900 hover:bg-gray-100'"
            >
              <Icon icon="ph:download-simple" class="w-4.5 h-4.5" />
              {{ cvExporting ? 'Preparing…' : 'Download CV' }}
            </button>
            <button
              @click="scrollToSection('contact')"
              class="px-7 py-3.5 rounded-2xl font-semibold transition-all duration-700 ease-out w-full sm:w-auto flex items-center justify-center gap-2.5"
              :class="isDarkMode ? 'text-gray-300 hover:text-white hover:bg-gray-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'"
            >
              Get in touch
              <Icon icon="ph:paper-plane-tilt" class="w-4.5 h-4.5" />
            </button>
          </div>

          <!-- Scroll indicator -->
          <div class="pt-14">
            <div class="flex flex-col items-center gap-2 group cursor-pointer" @click="scrollToSection('about')">
              <span class="text-xs font-medium uppercase tracking-[0.2em] opacity-50 group-hover:opacity-100 transition-opacity duration-700 ease-out" :class="isDarkMode ? 'text-gray-400' : 'text-gray-500'">Scroll</span>
              <Icon icon="ph:caret-down" class="w-5 h-5 animate-bounce transition-colors duration-700 ease-out" :class="isDarkMode ? 'text-gray-500' : 'text-gray-400'" />
            </div>
          </div>
        </div>
      </section>

      <!-- About Section - Bento Style -->
      <section id="about" class="py-28 max-w-7xl mx-auto">
        <div class="mb-14 space-y-3">
          <p class="text-xs font-semibold uppercase tracking-[0.25em] transition-colors duration-700 ease-out" :class="isDarkMode ? 'text-gray-500' : 'text-gray-400'">01 · About</p>
          <h2 class="text-4xl sm:text-5xl font-bold tracking-tight transition-colors duration-700 ease-out" :class="isDarkMode ? 'text-white' : 'text-gray-900'">
            About me
          </h2>
          <p class="text-lg max-w-2xl transition-colors duration-700 ease-out" :class="isDarkMode ? 'text-gray-400' : 'text-gray-600'">The journey, the stack, and what I care about.</p>
        </div>
          
        <!-- Bento Grid Layout -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-auto">
          <!-- Large bio card -->
          <div class="lg:col-span-2 lg:row-span-2">
            <div class="h-full rounded-[2rem] p-8 transition-all duration-700 ease-out" :class="isDarkMode ? 'bg-gray-900/50 border border-gray-800' : 'bg-white border border-gray-200'">
                <div class="leading-relaxed space-y-4 transition-colors duration-700 ease-out" :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'">
                  <p class="text-lg">Senior frontend engineer with <span class="font-semibold">5+ years building production Vue interfaces</span>, including state management architecture (Pinia and Vuex), design system implementation, and ownership of a platform's full engineering lifecycle from architecture through production deployment.</p>

                  <p>Deep in the <span class="font-semibold">Vue ecosystem</span>: Vue 3 and Vue 2, the <span class="font-semibold">Composition API</span>, <span class="font-semibold">Pinia</span>, <span class="font-semibold">Vuex</span>, <span class="font-semibold">Nuxt.js</span>, and <span class="font-semibold">TypeScript</span>, with a focus on store rationalisation, RBAC, and dependency modernisation.</p>

                  <p>Experienced building responsive, accessible UI with <span class="font-semibold">Vuetify</span> from Figma designs, and data intensive dashboards with <span class="font-semibold">Chart.js</span> that stay fast under large dataset rendering and significant data load.</p>

                  <p>Also holds an <span class="font-semibold">MSc in Cybersecurity (Distinction, University of Derby)</span>, with research applying AES encryption, RSA key exchange, and role-based access control to protect data integrity in cloud-based inventory systems.</p>
                </div>
              </div>
            </div>
            
          <!-- Skills Card 1 - Vue Ecosystem -->
          <div>
            <div class="h-full rounded-[2rem] p-6 transition-all duration-700 ease-out" :class="isDarkMode ? 'bg-gray-900/50 border border-gray-800' : 'bg-white border border-gray-200'">
                <div class="flex items-center gap-3 mb-4">
                  <div class="p-3 rounded-xl transition-colors duration-700 ease-out" :class="isDarkMode ? 'bg-gray-800' : 'bg-gray-100'">
                    <Icon icon="ph:code" class="w-6 h-6 transition-colors duration-700 ease-out" :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'" />
                  </div>
                  <h3 class="text-xl font-bold transition-colors duration-700 ease-out" :class="isDarkMode ? 'text-white' : 'text-gray-900'">Vue Ecosystem</h3>
                </div>
                <div class="flex flex-wrap gap-2">
                  <span class="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-700 ease-out" :class="isDarkMode ? 'bg-gray-800 border border-gray-700 text-gray-300' : 'bg-gray-100 border border-gray-200 text-gray-700'">Vue 3</span>
                  <span class="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-700 ease-out" :class="isDarkMode ? 'bg-gray-800 border border-gray-700 text-gray-300' : 'bg-gray-100 border border-gray-200 text-gray-700'">Composition API</span>
                  <span class="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-700 ease-out" :class="isDarkMode ? 'bg-gray-800 border border-gray-700 text-gray-300' : 'bg-gray-100 border border-gray-200 text-gray-700'">Pinia</span>
                  <span class="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-700 ease-out" :class="isDarkMode ? 'bg-gray-800 border border-gray-700 text-gray-300' : 'bg-gray-100 border border-gray-200 text-gray-700'">Vuex</span>
                  <span class="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-700 ease-out" :class="isDarkMode ? 'bg-gray-800 border border-gray-700 text-gray-300' : 'bg-gray-100 border border-gray-200 text-gray-700'">Nuxt.js</span>
                  <span class="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-700 ease-out" :class="isDarkMode ? 'bg-gray-800 border border-gray-700 text-gray-300' : 'bg-gray-100 border border-gray-200 text-gray-700'">TypeScript</span>
                </div>
              </div>
            </div>

          <!-- Skills Card 2 - State Management & Architecture -->
          <div>
            <div class="h-full rounded-[2rem] p-6 transition-all duration-700 ease-out" :class="isDarkMode ? 'bg-gray-900/50 border border-gray-800' : 'bg-white border border-gray-200'">
                <div class="flex items-center gap-3 mb-4">
                  <div class="p-3 rounded-xl transition-colors duration-700 ease-out" :class="isDarkMode ? 'bg-gray-800' : 'bg-gray-100'">
                    <Icon icon="ph:tree-structure" class="w-6 h-6 transition-colors duration-700 ease-out" :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'" />
                  </div>
                  <h3 class="text-xl font-bold transition-colors duration-700 ease-out" :class="isDarkMode ? 'text-white' : 'text-gray-900'">State Management & Architecture</h3>
                </div>
                <div class="flex flex-wrap gap-2">
                  <span class="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-700 ease-out" :class="isDarkMode ? 'bg-gray-800 border border-gray-700 text-gray-300' : 'bg-gray-100 border border-gray-200 text-gray-700'">Store rationalisation</span>
                  <span class="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-700 ease-out" :class="isDarkMode ? 'bg-gray-800 border border-gray-700 text-gray-300' : 'bg-gray-100 border border-gray-200 text-gray-700'">RBAC</span>
                  <span class="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-700 ease-out" :class="isDarkMode ? 'bg-gray-800 border border-gray-700 text-gray-300' : 'bg-gray-100 border border-gray-200 text-gray-700'">Dependency modernisation</span>
                </div>
              </div>
            </div>

          <!-- Skills Card 3 - UI & Design Systems -->
          <div>
            <div class="h-full rounded-[2rem] p-6 transition-all duration-700 ease-out" :class="isDarkMode ? 'bg-gray-900/50 border border-gray-800' : 'bg-white border border-gray-200'">
                <div class="flex items-center gap-3 mb-4">
                  <div class="p-3 rounded-xl transition-colors duration-700 ease-out" :class="isDarkMode ? 'bg-gray-800' : 'bg-gray-100'">
                    <Icon icon="ph:paint-brush" class="w-6 h-6 transition-colors duration-700 ease-out" :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'" />
                  </div>
                  <h3 class="text-xl font-bold transition-colors duration-700 ease-out" :class="isDarkMode ? 'text-white' : 'text-gray-900'">UI & Design Systems</h3>
                </div>
                <div class="flex flex-wrap gap-2">
                  <span class="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-700 ease-out" :class="isDarkMode ? 'bg-gray-800 border border-gray-700 text-gray-300' : 'bg-gray-100 border border-gray-200 text-gray-700'">Vuetify</span>
                  <span class="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-700 ease-out" :class="isDarkMode ? 'bg-gray-800 border border-gray-700 text-gray-300' : 'bg-gray-100 border border-gray-200 text-gray-700'">Figma to code</span>
                  <span class="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-700 ease-out" :class="isDarkMode ? 'bg-gray-800 border border-gray-700 text-gray-300' : 'bg-gray-100 border border-gray-200 text-gray-700'">Responsive UI</span>
                  <span class="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-700 ease-out" :class="isDarkMode ? 'bg-gray-800 border border-gray-700 text-gray-300' : 'bg-gray-100 border border-gray-200 text-gray-700'">Accessible UI</span>
                  <span class="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-700 ease-out" :class="isDarkMode ? 'bg-gray-800 border border-gray-700 text-gray-300' : 'bg-gray-100 border border-gray-200 text-gray-700'">TailwindCSS</span>
                </div>
              </div>
            </div>

          <!-- Skills Card 4 - Data & Performance -->
          <div>
            <div class="h-full rounded-[2rem] p-6 transition-all duration-700 ease-out" :class="isDarkMode ? 'bg-gray-900/50 border border-gray-800' : 'bg-white border border-gray-200'">
                <div class="flex items-center gap-3 mb-4">
                  <div class="p-3 rounded-xl transition-colors duration-700 ease-out" :class="isDarkMode ? 'bg-gray-800' : 'bg-gray-100'">
                    <Icon icon="ph:chart-line-up" class="w-6 h-6 transition-colors duration-700 ease-out" :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'" />
                  </div>
                  <h3 class="text-xl font-bold transition-colors duration-700 ease-out" :class="isDarkMode ? 'text-white' : 'text-gray-900'">Data & Performance</h3>
                </div>
                <div class="flex flex-wrap gap-2">
                  <span class="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-700 ease-out" :class="isDarkMode ? 'bg-gray-800 border border-gray-700 text-gray-300' : 'bg-gray-100 border border-gray-200 text-gray-700'">Chart.js</span>
                  <span class="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-700 ease-out" :class="isDarkMode ? 'bg-gray-800 border border-gray-700 text-gray-300' : 'bg-gray-100 border border-gray-200 text-gray-700'">Data-intensive dashboards</span>
                  <span class="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-700 ease-out" :class="isDarkMode ? 'bg-gray-800 border border-gray-700 text-gray-300' : 'bg-gray-100 border border-gray-200 text-gray-700'">Large dataset rendering</span>
                  <span class="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-700 ease-out" :class="isDarkMode ? 'bg-gray-800 border border-gray-700 text-gray-300' : 'bg-gray-100 border border-gray-200 text-gray-700'">Performance optimisation</span>
                </div>
              </div>
            </div>

          <!-- Skills Card 5 - Tooling -->
          <div class="lg:col-span-2">
            <div class="h-full rounded-[2rem] p-6 transition-all duration-700 ease-out" :class="isDarkMode ? 'bg-gray-900/50 border border-gray-800' : 'bg-white border border-gray-200'">
                <div class="flex items-center gap-3 mb-4">
                  <div class="p-3 rounded-xl transition-colors duration-700 ease-out" :class="isDarkMode ? 'bg-gray-800' : 'bg-gray-100'">
                    <Icon icon="ph:toolbox" class="w-6 h-6 transition-colors duration-700 ease-out" :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'" />
                  </div>
                  <h3 class="text-xl font-bold transition-colors duration-700 ease-out" :class="isDarkMode ? 'text-white' : 'text-gray-900'">Tooling</h3>
                </div>
                <div class="flex flex-wrap gap-2">
                  <span class="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-700 ease-out" :class="isDarkMode ? 'bg-gray-800 border border-gray-700 text-gray-300' : 'bg-gray-100 border border-gray-200 text-gray-700'">Git</span>
                  <span class="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-700 ease-out" :class="isDarkMode ? 'bg-gray-800 border border-gray-700 text-gray-300' : 'bg-gray-100 border border-gray-200 text-gray-700'">Node.js</span>
                  <span class="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-700 ease-out" :class="isDarkMode ? 'bg-gray-800 border border-gray-700 text-gray-300' : 'bg-gray-100 border border-gray-200 text-gray-700'">REST APIs</span>
                  <span class="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-700 ease-out" :class="isDarkMode ? 'bg-gray-800 border border-gray-700 text-gray-300' : 'bg-gray-100 border border-gray-200 text-gray-700'">Firebase</span>
                  <span class="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-700 ease-out" :class="isDarkMode ? 'bg-gray-800 border border-gray-700 text-gray-300' : 'bg-gray-100 border border-gray-200 text-gray-700'">CI/CD Pipelines</span>
                 </div>
              </div>
            </div>
        </div>
      </section>

      <!-- Experience Section -->
      <section class="py-28 max-w-7xl mx-auto">
        <div class="mb-14 space-y-3">
          <p class="text-xs font-semibold uppercase tracking-[0.25em] transition-colors duration-700 ease-out" :class="isDarkMode ? 'text-gray-500' : 'text-gray-400'">02 · Experience</p>
          <h2 class="text-4xl sm:text-5xl font-bold tracking-tight transition-colors duration-700 ease-out" :class="isDarkMode ? 'text-white' : 'text-gray-900'">
            Where I've worked
          </h2>
          <p class="text-lg max-w-2xl transition-colors duration-700 ease-out" :class="isDarkMode ? 'text-gray-400' : 'text-gray-600'">My professional journey so far.</p>
        </div>

        <div class="space-y-6">
            <div v-for="tab in experienceTabs" :key="tab.label">
              <div class="rounded-[2rem] p-6 sm:p-10 transition-all duration-700 ease-out" :class="isDarkMode ? 'bg-gray-900/50 border border-gray-800' : 'bg-white border border-gray-200'">
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-8">
                  <h3 class="text-xl sm:text-2xl font-bold tracking-tight transition-colors duration-700 ease-out" :class="isDarkMode ? 'text-white' : 'text-gray-900'">{{ tab.label }}</h3>
                  <span
                    class="inline-flex items-center gap-2 self-start sm:self-auto px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors duration-700 ease-out"
                    :class="isDarkMode ? 'bg-gray-800 border border-gray-700 text-gray-300' : 'bg-gray-100 border border-gray-200 text-gray-600'"
                  >
                    <span v-if="!tab.completed" class="relative flex h-2 w-2">
                      <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60"></span>
                      <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    {{ tab.date }}
                  </span>
                </div>
                <div class="space-y-0 divide-y transition-colors duration-700 ease-out" :class="isDarkMode ? 'divide-gray-800' : 'divide-gray-100'">
                  <div v-for="item in tab.timeline" :key="item.title" class="py-5 first:pt-0 last:pb-0 sm:grid sm:grid-cols-[240px_1fr] sm:gap-8">
                    <h4 class="font-semibold mb-1.5 sm:mb-0 transition-colors duration-700 ease-out" :class="isDarkMode ? 'text-white' : 'text-gray-900'">{{ item.title }}</h4>
                    <p class="text-sm leading-relaxed transition-colors duration-700 ease-out" :class="isDarkMode ? 'text-gray-400' : 'text-gray-600'">{{ item.description }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </section>

      <!-- Key Achievements Section -->
      <section class="py-28 max-w-7xl mx-auto">
        <div class="mb-14 space-y-3">
          <p class="text-xs font-semibold uppercase tracking-[0.25em] transition-colors duration-700 ease-out" :class="isDarkMode ? 'text-gray-500' : 'text-gray-400'">03 · Highlight</p>
          <h2 class="text-4xl sm:text-5xl font-bold tracking-tight transition-colors duration-700 ease-out" :class="isDarkMode ? 'text-white' : 'text-gray-900'">
            Key achievement
          </h2>
        </div>

        <div class="rounded-[2rem] p-8 sm:p-12 transition-all duration-700 ease-out" :class="isDarkMode ? 'bg-gray-900/50 border border-gray-800' : 'bg-white border border-gray-200'">
          <div class="max-w-3xl space-y-5">
            <div class="w-12 h-12 rounded-2xl flex items-center justify-center transition-colors duration-700 ease-out" :class="isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-gray-100 border border-gray-200'">
              <Icon icon="ph:trophy" class="w-6 h-6 transition-colors duration-700 ease-out" :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'" />
            </div>
            <h3 class="text-2xl sm:text-3xl font-bold tracking-tight leading-snug transition-colors duration-700 ease-out" :class="isDarkMode ? 'text-white' : 'text-gray-900'">
              Zero data loss migrating legacy data to secure cloud environments.
            </h3>
            <p class="text-lg leading-relaxed transition-colors duration-700 ease-out" :class="isDarkMode ? 'text-gray-400' : 'text-gray-600'">
              Successfully contributed to the migration of legacy data with no data loss or security breaches, demonstrating secure data migration, risk mitigation, and data integrity throughout complex system transitions.
            </p>
          </div>
        </div>
      </section>

      <!-- Education Section -->
      <section class="py-28 max-w-7xl mx-auto">
        <div class="mb-14 space-y-3">
          <p class="text-xs font-semibold uppercase tracking-[0.25em] transition-colors duration-700 ease-out" :class="isDarkMode ? 'text-gray-500' : 'text-gray-400'">04 · Education</p>
          <h2 class="text-4xl sm:text-5xl font-bold tracking-tight transition-colors duration-700 ease-out" :class="isDarkMode ? 'text-white' : 'text-gray-900'">
            Education
          </h2>
        </div>

        <div class="grid md:grid-cols-2 gap-6">
          <!-- Master's Degree -->
          <div class="rounded-[2rem] p-8 sm:p-10 transition-all duration-700 ease-out flex flex-col gap-6" :class="isDarkMode ? 'bg-gray-900/50 border border-gray-800' : 'bg-white border border-gray-200'">
            <div class="flex items-center justify-between">
              <div class="w-12 h-12 rounded-2xl flex items-center justify-center transition-colors duration-700 ease-out" :class="isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-gray-100 border border-gray-200'">
                <Icon icon="ph:graduation-cap" class="w-6 h-6 transition-colors duration-700 ease-out" :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'" />
              </div>
              <span class="text-sm font-semibold tabular-nums transition-colors duration-700 ease-out" :class="isDarkMode ? 'text-gray-500' : 'text-gray-400'">2025</span>
            </div>
            <div class="space-y-2">
              <h4 class="text-xl sm:text-2xl font-bold tracking-tight transition-colors duration-700 ease-out" :class="isDarkMode ? 'text-white' : 'text-gray-900'">MSc Cybersecurity <span class="font-medium" :class="isDarkMode ? 'text-gray-400' : 'text-gray-500'">· Distinction</span></h4>
              <p class="transition-colors duration-700 ease-out" :class="isDarkMode ? 'text-gray-400' : 'text-gray-600'">University of Derby, England</p>
            </div>
          </div>

          <!-- Bachelor's Degree -->
          <div class="rounded-[2rem] p-8 sm:p-10 transition-all duration-700 ease-out flex flex-col gap-6" :class="isDarkMode ? 'bg-gray-900/50 border border-gray-800' : 'bg-white border border-gray-200'">
            <div class="flex items-center justify-between">
              <div class="w-12 h-12 rounded-2xl flex items-center justify-center transition-colors duration-700 ease-out" :class="isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-gray-100 border border-gray-200'">
                <Icon icon="ph:graduation-cap" class="w-6 h-6 transition-colors duration-700 ease-out" :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'" />
              </div>
              <span class="text-sm font-semibold tabular-nums transition-colors duration-700 ease-out" :class="isDarkMode ? 'text-gray-500' : 'text-gray-400'">2020</span>
            </div>
            <div class="space-y-2">
              <h4 class="text-xl sm:text-2xl font-bold tracking-tight transition-colors duration-700 ease-out" :class="isDarkMode ? 'text-white' : 'text-gray-900'">BSc Computer Information Systems</h4>
              <p class="transition-colors duration-700 ease-out" :class="isDarkMode ? 'text-gray-400' : 'text-gray-600'">Babcock University, Nigeria</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Projects Section -->
      <section id="projects" class="py-28 max-w-7xl mx-auto">
        <div class="mb-14 space-y-3">
          <p class="text-xs font-semibold uppercase tracking-[0.25em] transition-colors duration-700 ease-out" :class="isDarkMode ? 'text-gray-500' : 'text-gray-400'">05 · Projects</p>
          <h2 class="text-4xl sm:text-5xl font-bold tracking-tight transition-colors duration-700 ease-out" :class="isDarkMode ? 'text-white' : 'text-gray-900'">
            Selected work
          </h2>
          <p class="text-lg max-w-2xl transition-colors duration-700 ease-out" :class="isDarkMode ? 'text-gray-400' : 'text-gray-600'">Things I've designed, built, and shipped.</p>
        </div>

        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <a
            v-for="project in projects"
            :key="project.name"
            :href="project.url"
            target="_blank"
            rel="noopener noreferrer"
            class="group flex flex-col rounded-[2rem] p-7 transition-all duration-500 ease-out"
            :class="isDarkMode ? 'bg-gray-900/50 border border-gray-800 hover:border-gray-600' : 'bg-white border border-gray-200 hover:border-gray-400'"
          >
            <div class="flex items-start justify-between mb-6">
              <div class="w-12 h-12 rounded-2xl flex items-center justify-center transition-colors duration-700 ease-out" :class="isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-gray-100 border border-gray-200'">
                <Icon :icon="project.icon" class="w-6 h-6 transition-colors duration-700 ease-out" :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'" />
              </div>
              <Icon icon="ph:arrow-up-right" class="w-5 h-5 transition-all duration-500 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5" :class="isDarkMode ? 'text-gray-600 group-hover:text-gray-300' : 'text-gray-300 group-hover:text-gray-700'" />
            </div>
            <div class="space-y-1 mb-3">
              <h3 class="text-xl font-bold tracking-tight transition-colors duration-700 ease-out" :class="isDarkMode ? 'text-white' : 'text-gray-900'">{{ project.name }}</h3>
              <p class="text-xs font-medium uppercase tracking-wider transition-colors duration-700 ease-out" :class="isDarkMode ? 'text-gray-500' : 'text-gray-400'">{{ project.tag }}</p>
            </div>
            <p class="text-sm leading-relaxed flex-grow transition-colors duration-700 ease-out" :class="isDarkMode ? 'text-gray-400' : 'text-gray-600'">{{ project.description }}</p>
            <p class="mt-6 text-xs font-medium transition-colors duration-700 ease-out" :class="isDarkMode ? 'text-gray-600' : 'text-gray-400'">{{ project.host }}</p>
          </a>
        </div>
      </section>

      <!-- Contact Section -->
      <section id="contact" class="py-28 max-w-5xl mx-auto">
        <div class="mb-14 space-y-3">
          <p class="text-xs font-semibold uppercase tracking-[0.25em] transition-colors duration-700 ease-out" :class="isDarkMode ? 'text-gray-500' : 'text-gray-400'">06 · Contact</p>
          <h2 class="text-4xl sm:text-5xl font-bold tracking-tight transition-colors duration-700 ease-out" :class="isDarkMode ? 'text-white' : 'text-gray-900'">
            Get in touch
          </h2>
        </div>
        <div class="rounded-[2.5rem] overflow-hidden transition-all duration-700 ease-out" :class="isDarkMode ? 'bg-gray-900/50 border border-gray-800' : 'bg-white border border-gray-200'">
          <div class="grid grid-cols-1 lg:grid-cols-5">

            <!-- Left: pitch -->
            <div class="lg:col-span-3 p-8 sm:p-12 lg:p-14 flex flex-col justify-between gap-10">
              <div class="space-y-6">
                <div class="inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-xs font-medium transition-colors duration-700 ease-out" :class="isDarkMode ? 'bg-gray-800 border border-gray-700 text-gray-300' : 'bg-gray-100 border border-gray-200 text-gray-600'">
                  <span class="relative flex h-2 w-2">
                    <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60"></span>
                    <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  Open to new opportunities
                </div>

                <h3 class="text-4xl sm:text-5xl font-bold tracking-tight leading-[1.05] transition-colors duration-700 ease-out" :class="isDarkMode ? 'text-white' : 'text-gray-900'">
                  Let's build<br />something together.
                </h3>

                <p class="text-lg leading-relaxed max-w-xl transition-colors duration-700 ease-out" :class="isDarkMode ? 'text-gray-400' : 'text-gray-600'">
                  Senior frontend roles, Vue-heavy products, or ambitious interfaces that need careful state management. I'd love to hear about it.
                </p>
              </div>

              <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <a
                  href="mailto:Gozieagu1@gmail.com"
                  class="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-semibold transition-all duration-700 ease-out"
                  :class="isDarkMode ? 'bg-white text-gray-900 hover:bg-gray-200' : 'bg-gray-900 text-white hover:bg-gray-800'"
                >
                  <Icon icon="ph:paper-plane-tilt" class="w-5 h-5 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  Say hello
                </a>
                <span class="text-sm text-center sm:text-left transition-colors duration-700 ease-out" :class="isDarkMode ? 'text-gray-500' : 'text-gray-500'">
                  Usually replies within a day
                </span>
              </div>
            </div>

            <!-- Right: contact rail -->
            <div class="lg:col-span-2 p-4 sm:p-6 lg:p-8 lg:border-l border-t lg:border-t-0 transition-colors duration-700 ease-out" :class="isDarkMode ? 'border-gray-800 bg-gray-900/40' : 'border-gray-200 bg-gray-50'">
              <div class="h-full flex flex-col justify-center gap-2">

                <a
                  href="mailto:Gozieagu1@gmail.com"
                  class="group flex items-center gap-4 p-4 rounded-2xl transition-all duration-500 ease-out"
                  :class="isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-white'"
                >
                  <div class="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-700 ease-out" :class="isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'">
                    <Icon icon="ph:envelope-simple" class="w-5 h-5" :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'" />
                  </div>
                  <div class="min-w-0 flex-1">
                    <p class="text-xs uppercase tracking-wider transition-colors duration-700 ease-out" :class="isDarkMode ? 'text-gray-500' : 'text-gray-500'">Email</p>
                    <p class="text-sm font-medium truncate transition-colors duration-700 ease-out" :class="isDarkMode ? 'text-gray-200' : 'text-gray-800'">Gozieagu1@gmail.com</p>
                  </div>
                  <Icon icon="ph:arrow-up-right" class="w-4 h-4 flex-shrink-0 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500" :class="isDarkMode ? 'text-gray-400' : 'text-gray-500'" />
                </a>

                <a
                  href="https://www.linkedin.com/in/chigozie-agu-85019b209"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="group flex items-center gap-4 p-4 rounded-2xl transition-all duration-500 ease-out"
                  :class="isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-white'"
                >
                  <div class="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-700 ease-out" :class="isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'">
                    <Icon icon="mdi:linkedin" class="w-5 h-5" :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'" />
                  </div>
                  <div class="min-w-0 flex-1">
                    <p class="text-xs uppercase tracking-wider transition-colors duration-700 ease-out" :class="isDarkMode ? 'text-gray-500' : 'text-gray-500'">LinkedIn</p>
                    <p class="text-sm font-medium truncate transition-colors duration-700 ease-out" :class="isDarkMode ? 'text-gray-200' : 'text-gray-800'">Franklin Agu</p>
                  </div>
                  <Icon icon="ph:arrow-up-right" class="w-4 h-4 flex-shrink-0 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500" :class="isDarkMode ? 'text-gray-400' : 'text-gray-500'" />
                </a>

                <a
                  href="https://github.com/GozzAgu"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="group flex items-center gap-4 p-4 rounded-2xl transition-all duration-500 ease-out"
                  :class="isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-white'"
                >
                  <div class="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-700 ease-out" :class="isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'">
                    <Icon icon="mdi:github" class="w-5 h-5" :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'" />
                  </div>
                  <div class="min-w-0 flex-1">
                    <p class="text-xs uppercase tracking-wider transition-colors duration-700 ease-out" :class="isDarkMode ? 'text-gray-500' : 'text-gray-500'">GitHub</p>
                    <p class="text-sm font-medium truncate transition-colors duration-700 ease-out" :class="isDarkMode ? 'text-gray-200' : 'text-gray-800'">GozzAgu</p>
                  </div>
                  <Icon icon="ph:arrow-up-right" class="w-4 h-4 flex-shrink-0 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500" :class="isDarkMode ? 'text-gray-400' : 'text-gray-500'" />
                </a>

                <a
                  href="tel:07551116916"
                  class="group flex items-center gap-4 p-4 rounded-2xl transition-all duration-500 ease-out"
                  :class="isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-white'"
                >
                  <div class="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-700 ease-out" :class="isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'">
                    <Icon icon="ph:phone" class="w-5 h-5" :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'" />
                  </div>
                  <div class="min-w-0 flex-1">
                    <p class="text-xs uppercase tracking-wider transition-colors duration-700 ease-out" :class="isDarkMode ? 'text-gray-500' : 'text-gray-500'">Phone</p>
                    <p class="text-sm font-medium truncate transition-colors duration-700 ease-out" :class="isDarkMode ? 'text-gray-200' : 'text-gray-800'">07551 116 916</p>
                  </div>
                </a>

                <div class="flex items-center gap-4 p-4 rounded-2xl">
                  <div class="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-700 ease-out" :class="isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'">
                    <Icon icon="ph:map-pin" class="w-5 h-5" :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'" />
                  </div>
                  <div class="min-w-0 flex-1">
                    <p class="text-xs uppercase tracking-wider transition-colors duration-700 ease-out" :class="isDarkMode ? 'text-gray-500' : 'text-gray-500'">Location</p>
                    <p class="text-sm font-medium truncate transition-colors duration-700 ease-out" :class="isDarkMode ? 'text-gray-200' : 'text-gray-800'">England, UK</p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>
    </main>

    <!-- Footer -->
    <footer class="w-full border-t relative z-10 transition-colors duration-700 ease-out" :class="isDarkMode ? 'border-gray-800' : 'border-gray-200'">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div class="flex flex-col md:flex-row md:items-start justify-between gap-10">
          <!-- Identity -->
          <div class="space-y-3">
            <div class="flex items-center gap-3">
              <div class="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm transition-colors duration-700 ease-out" :class="isDarkMode ? 'bg-white text-gray-900' : 'bg-gray-900 text-white'">
                G
              </div>
              <span class="text-sm font-semibold tracking-tight transition-colors duration-700 ease-out" :class="isDarkMode ? 'text-white' : 'text-gray-900'">Franklin Agu</span>
            </div>
            <p class="text-sm max-w-xs leading-relaxed transition-colors duration-700 ease-out" :class="isDarkMode ? 'text-gray-500' : 'text-gray-500'">
              Senior frontend engineer crafting Vue interfaces with careful state management.
            </p>
          </div>

          <div class="flex flex-wrap gap-12 sm:gap-16">
            <!-- Site links -->
            <div class="space-y-4">
              <p class="text-xs font-semibold uppercase tracking-[0.25em] transition-colors duration-700 ease-out" :class="isDarkMode ? 'text-gray-600' : 'text-gray-400'">Explore</p>
              <div class="flex flex-col gap-2.5 text-sm">
                <a href="#about" class="transition-colors duration-500 ease-out" :class="isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'">About</a>
                <a href="#projects" class="transition-colors duration-500 ease-out" :class="isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'">Projects</a>
                <a href="#contact" class="transition-colors duration-500 ease-out" :class="isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'">Contact</a>
              </div>
            </div>

            <!-- Social links -->
            <div class="space-y-4">
              <p class="text-xs font-semibold uppercase tracking-[0.25em] transition-colors duration-700 ease-out" :class="isDarkMode ? 'text-gray-600' : 'text-gray-400'">Connect</p>
              <div class="flex flex-col gap-2.5 text-sm">
                <a href="mailto:Gozieagu1@gmail.com" class="transition-colors duration-500 ease-out" :class="isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'">Email</a>
                <a href="https://www.linkedin.com/in/chigozie-agu-85019b209" target="_blank" rel="noopener noreferrer" class="transition-colors duration-500 ease-out" :class="isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'">LinkedIn</a>
                <a href="https://github.com/GozzAgu" target="_blank" rel="noopener noreferrer" class="transition-colors duration-500 ease-out" :class="isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'">GitHub</a>
              </div>
            </div>
          </div>
        </div>

        <!-- Bottom row -->
        <div class="mt-12 pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-3 text-xs transition-colors duration-700 ease-out" :class="isDarkMode ? 'border-gray-800 text-gray-600' : 'border-gray-200 text-gray-500'">
          <p>© {{ new Date().getFullYear() }} Franklin Agu. All rights reserved.</p>
          <p>Built with Nuxt.js & Tailwind CSS</p>
        </div>
      </div>
    </footer>

    <!-- Scroll to Top Button -->
    <Transition
      enter-active-class="transition-all duration-700 ease-out"
      enter-from-class="opacity-0 scale-75 translate-y-4"
      enter-to-class="opacity-100 scale-100 translate-y-0"
      leave-active-class="transition-all duration-700 ease-out ease-in"
      leave-from-class="opacity-100 scale-100 translate-y-0"
      leave-to-class="opacity-0 scale-75 translate-y-4"
    >
      <button
        v-show="showScrollToTop"
        @click="scrollToTop"
        class="fixed bottom-8 right-8 z-50 p-4 rounded-[1.5rem] transition-all duration-700 ease-out"
        :class="isDarkMode ? 'bg-gray-800 text-white hover:bg-gray-700 border border-gray-700' : 'bg-gray-900 text-white hover:bg-gray-800 border border-gray-800'"
        aria-label="Scroll to top"
      >
        <Icon icon="ph:arrow-up" class="w-6 h-6" />
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

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value;
  localStorage.setItem('darkMode', isDarkMode.value.toString());
  document.documentElement.classList.toggle("dark", isDarkMode.value);
};

const scrollToTop = () => {
  navOpen.value = false;
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
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
    label: "Software Engineer - CypherCrescent Ltd (Hybrid, Nigeria)",
    date: "2020 - 2025",
    completed: true,
    timeline: [
      {
        title: "Vue 3 Interfaces at Scale",
        description: "Built scalable, high performance Vue 3 interfaces using the Composition API and Pinia/Vuex for state management, translating complex stakeholder requirements into production features.",
      },
      {
        title: "State Management Architecture",
        description: "Made architectural decisions on state management structure, choosing between Pinia and Vuex patterns based on module complexity, keeping store logic maintainable as the application grew.",
      },
      {
        title: "UI & Design Systems",
        description: "Built responsive, accessible UI layouts with Vuetify from Figma designs, replacing ageing UI patterns as design requirements evolved.",
      },
      {
        title: "Data-Intensive Dashboards",
        description: "Built and refined data intensive dashboards using Chart.js for a large enterprise department, turning complex, high volume datasets into clear, actionable insight while keeping interfaces fast under significant data load.",
      },
      {
        title: "Debugging & Performance",
        description: "Debugged and optimised interfaces across browsers and devices, maintaining a consistent component architecture across multiple enterprise applications used by a large team.",
      },
      {
        title: "Agile Collaboration & CI/CD",
        description: "Worked closely with non-technical stakeholders and other engineers in an agile team, operating with high autonomy and contributing to CI/CD setup and Git based workflows.",
      },
    ],
  },
  {
    label: "Service Operations Analyst - Concentrix",
    date: "March 2026 - Present",
    completed: false,
    timeline: [
      {
        title: "Process Documentation & Improvement",
        description: "Work in a detail driven environment, documenting processes clearly and looking for ways to reduce manual, repetitive steps.",
      },
    ],
  },
  {
    label: "Service Operations Analyst - EE (UK)",
    date: "April 2025 - March 2026",
    completed: true,
    timeline: [
      {
        title: "Adaptability Across Platforms",
        description: "Worked across multiple digital tools and platforms at once, building adaptability and a habit of finding simpler ways to get things done.",
      },
    ],
  },
];

const projects = [
  {
    name: "Storvv",
    tag: "Cloud retail operations",
    icon: "ph:shield-check",
    description:
      "Secure cloud-based inventory management platform. Built with Vue 3, Firebase, AES encryption, RSA key exchange, and role-based access control for multi-store, real-time dashboards.",
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
  // Load dark mode preference from localStorage, fallback to system preference
  const savedDarkMode = localStorage.getItem('darkMode');
  if (savedDarkMode !== null) {
    isDarkMode.value = savedDarkMode === 'true';
  } else {
  isDarkMode.value = window.matchMedia("(prefers-color-scheme: dark)").matches;
  }
  
  if (isDarkMode.value) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
  
  window.addEventListener('scroll', handleScroll);
  
  window.addEventListener("resize", handleLayoutResize);
  
  // Check if experience section is already visible on load
  nextTick(() => {
    handleScroll();
  });
});
</script>

<style scoped>
/* Animations */
@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(40px) scale(0.95);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes blob {
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  25% {
    transform: translate(30px, -60px) scale(1.15);
  }
  50% {
    transform: translate(-30px, 30px) scale(0.85);
  }
  75% {
    transform: translate(60px, 60px) scale(1.1);
  }
}

@keyframes gradient-xy {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.animate-blob {
  animation: blob 25s ease-in-out infinite;
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}

.animation-delay-6000 {
  animation-delay: 6s;
}

.animate-gradient-xy {
  background-size: 400% 400%;
  animation: gradient-xy 4s ease-in-out infinite;
}

.animate-pulse-slow {
  animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: rgba(10, 10, 15, 0.3);
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(to bottom, #8b5cf6, #06b6d4, #10b981);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(to bottom, #7c3aed, #0891b2, #059669);
}

/* Enhanced glassmorphism */
.backdrop-blur-xl {
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
}

.backdrop-blur-2xl {
  backdrop-filter: blur(40px);
  -webkit-backdrop-filter: blur(40px);
}

/* Remove default transitions from all elements */
* {
  transition: none;
}

/* Add specific transitions where needed - using ease-out for very fluid feel */
button, a, .group {
  transition: all 0.7s ease-out;
}

/* Smooth hover effects with ease-out timing */
* {
  transition-timing-function: ease-out;
}

/* Friendly rounded corners throughout */
.rounded-friendly {
  border-radius: 1.5rem;
}
</style>