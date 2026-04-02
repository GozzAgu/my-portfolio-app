<template>
  <div class="min-h-screen flex flex-col relative overflow-hidden transition-colors duration-700 ease-out" :class="isDarkMode ? 'bg-[#0a0a0f] text-gray-100' : 'bg-gray-50 text-gray-900'">

    <!-- Floating header: compact row on mobile + slide-down menu -->
    <header class="w-full fixed top-4 z-50 px-4 sm:px-6">
      <div class="max-w-6xl mx-auto relative">
        <nav
          class="px-4 sm:px-6 py-3 md:py-4 flex justify-between items-center gap-3 rounded-[2rem] transition-all duration-700 ease-out"
          :class="isDarkMode ? 'bg-gray-900/50 border border-gray-800' : 'bg-white border border-gray-200'"
          aria-label="Main navigation"
        >
          <div class="flex items-center space-x-3 group cursor-pointer min-w-0 flex-shrink-0" @click="scrollToTop">
            <div class="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl flex items-center justify-center font-bold text-sm sm:text-base transition-all duration-700 ease-out" :class="isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-900 text-white'">
              G
            </div>
            <h1 class="hidden sm:block text-lg md:text-xl font-bold transition-colors duration-700 ease-out truncate" :class="isDarkMode ? 'text-white' : 'text-gray-900'">Goz</h1>
          </div>

          <!-- Desktop / tablet: inline links -->
          <div class="hidden md:flex items-center gap-1 lg:gap-2 text-sm flex-shrink-0">
            <a href="#about" class="px-4 lg:px-5 py-2.5 rounded-2xl font-medium transition-all duration-700 ease-out whitespace-nowrap" :class="isDarkMode ? 'text-gray-300 hover:text-white hover:bg-gray-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'">
              About
            </a>
            <a href="#projects" class="px-4 lg:px-5 py-2.5 rounded-2xl font-medium transition-all duration-700 ease-out whitespace-nowrap" :class="isDarkMode ? 'text-gray-300 hover:text-white hover:bg-gray-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'">
              Projects
            </a>
            <a href="#contact" class="px-4 lg:px-5 py-2.5 rounded-2xl font-medium transition-all duration-700 ease-out whitespace-nowrap" :class="isDarkMode ? 'text-gray-300 hover:text-white hover:bg-gray-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'">
              Contact
            </a>
            <button
              type="button"
              @click="exportCvToWord"
              :disabled="cvExporting"
              class="px-4 lg:px-5 py-2.5 rounded-2xl font-medium transition-all duration-700 ease-out disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
              :class="isDarkMode ? 'text-gray-300 hover:text-white hover:bg-gray-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'"
            >
              {{ cvExporting ? 'Preparing…' : 'Download CV' }}
            </button>
          </div>

          <div class="flex items-center gap-1.5 flex-shrink-0">
            <button
              type="button"
              class="md:hidden p-2.5 rounded-2xl transition-all duration-700 ease-out [-webkit-tap-highlight-color:transparent]"
              :class="isDarkMode ? 'text-gray-300 hover:bg-gray-800 border border-gray-700' : 'text-gray-700 hover:bg-gray-100 border border-gray-200'"
              :aria-expanded="navOpen"
              aria-controls="mobile-nav-menu"
              :aria-label="navOpen ? 'Close menu' : 'Open menu'"
              @click="navOpen = !navOpen"
            >
              <Icon :icon="navOpen ? 'ph:x' : 'ph:list'" class="w-6 h-6" />
            </button>
            <button
              type="button"
              @click="toggleDarkMode"
              class="p-2.5 sm:p-3 rounded-2xl transition-all duration-700 ease-out"
              :class="isDarkMode ? 'bg-gray-800 border border-gray-700 hover:bg-gray-700' : 'bg-gray-100 border border-gray-200 hover:bg-gray-200'"
              aria-label="Toggle dark mode"
            >
              <Icon v-if="isDarkMode" icon="ph:sun-duotone" class="w-5 h-5 transition-colors duration-700 ease-out text-gray-300" />
              <Icon v-else icon="ph:moon-duotone" class="w-5 h-5 transition-colors duration-700 ease-out text-gray-600" />
            </button>
          </div>
        </nav>

        <!-- Mobile menu panel -->
        <div
          id="mobile-nav-menu"
          v-show="navOpen"
          class="md:hidden absolute left-0 right-0 top-[calc(100%+0.5rem)] rounded-[1.5rem] border shadow-lg overflow-hidden transition-colors duration-700 ease-out"
          :class="isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'"
        >
          <div class="flex flex-col p-2 text-base">
            <a
              href="#about"
              class="px-4 py-3.5 rounded-xl font-medium transition-all duration-700 ease-out"
              :class="isDarkMode ? 'text-gray-200 hover:bg-gray-800' : 'text-gray-800 hover:bg-gray-100'"
              @click="navOpen = false"
            >
              About
            </a>
            <a
              href="#projects"
              class="px-4 py-3.5 rounded-xl font-medium transition-all duration-700 ease-out"
              :class="isDarkMode ? 'text-gray-200 hover:bg-gray-800' : 'text-gray-800 hover:bg-gray-100'"
              @click="navOpen = false"
            >
              Projects
            </a>
            <a
              href="#contact"
              class="px-4 py-3.5 rounded-xl font-medium transition-all duration-700 ease-out"
              :class="isDarkMode ? 'text-gray-200 hover:bg-gray-800' : 'text-gray-800 hover:bg-gray-100'"
              @click="navOpen = false"
            >
              Contact
            </a>
            <button
              type="button"
              :disabled="cvExporting"
              class="text-left px-4 py-3.5 rounded-xl font-medium transition-all duration-700 ease-out disabled:opacity-50 disabled:cursor-not-allowed"
              :class="isDarkMode ? 'text-gray-200 hover:bg-gray-800' : 'text-gray-800 hover:bg-gray-100'"
              @click="exportCvToWord(); navOpen = false"
            >
              {{ cvExporting ? 'Preparing…' : 'Download CV (Word)' }}
            </button>
          </div>
        </div>
      </div>
    </header>

    <main class="flex-grow w-full px-4 sm:px-6 py-20 relative z-10">
      <!-- Hero Section - Modern & Minimal -->
      <section class="min-h-screen flex items-center justify-center py-20 max-w-7xl mx-auto">
        <div class="text-center space-y-12 animate-fade-in-up w-full">
          <!-- Avatar -->
          <div class="relative inline-block">
            <div class="w-32 h-32 sm:w-40 sm:h-40 mx-auto rounded-[2.5rem] flex items-center justify-center transition-all duration-700 ease-out" :class="isDarkMode ? 'bg-gray-800' : 'bg-gray-900'">
              <span class="text-6xl sm:text-7xl font-bold text-white">G</span>
            </div>
          </div>

          <!-- Name -->
          <div class="space-y-4">
            <h1 class="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight transition-colors duration-700 ease-out" :class="isDarkMode ? 'text-white' : 'text-gray-900'">
              Franklin Agu
            </h1>
            <p class="text-xl sm:text-2xl md:text-3xl font-light max-w-4xl mx-auto leading-relaxed px-4 transition-colors duration-700 ease-out" :class="isDarkMode ? 'text-gray-400' : 'text-gray-600'">
              MSc Cybersecurity | Service Operations Analyst | Secure Software Engineer
            </p>
            <p class="text-lg sm:text-xl font-light max-w-3xl mx-auto leading-relaxed px-4 transition-colors duration-700 ease-out" :class="isDarkMode ? 'text-gray-500' : 'text-gray-500'">
              Location: Derby, UK
            </p>
          </div>

          <!-- CTA Buttons -->
          <div class="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-5 sm:gap-6 px-4 max-w-4xl mx-auto">
            <button 
              @click="scrollToSection('projects')"
              class="px-10 py-5 rounded-[2rem] font-semibold text-lg transition-all duration-700 ease-out w-full sm:w-auto flex items-center justify-center gap-2"
              :class="isDarkMode ? 'bg-gray-800 text-white hover:bg-gray-700 border border-gray-700' : 'bg-gray-900 text-white hover:bg-gray-800 border border-gray-800'"
            >
              Explore My Work
              <Icon icon="ph:arrow-right" class="w-5 h-5" />
            </button>
            <button 
              @click="scrollToSection('contact')"
              class="px-10 py-5 rounded-[2rem] border-2 font-semibold text-lg transition-all duration-700 ease-out w-full sm:w-auto flex items-center justify-center gap-2"
              :class="isDarkMode ? 'bg-transparent border-gray-700 text-white hover:bg-gray-800' : 'bg-transparent border-gray-300 text-gray-900 hover:bg-gray-100'"
            >
              Get In Touch
              <Icon icon="ph:paper-plane-tilt" class="w-5 h-5" />
            </button>
            <button
              type="button"
              @click="exportCvToWord"
              :disabled="cvExporting"
              class="px-10 py-5 rounded-[2rem] font-semibold text-lg transition-all duration-700 ease-out w-full sm:w-auto flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              :class="isDarkMode ? 'bg-gray-800 text-white hover:bg-gray-700 border border-gray-700' : 'bg-gray-100 text-gray-900 hover:bg-gray-200 border border-gray-200'"
            >
              <Icon icon="ph:download-simple" class="w-5 h-5" />
              {{ cvExporting ? 'Preparing document…' : 'Download CV (Word)' }}
            </button>
          </div>

          <!-- Scroll indicator -->
          <div class="pt-16 animate-bounce">
            <div class="flex flex-col items-center gap-2 group cursor-pointer" @click="scrollToSection('about')">
              <span class="text-xs font-medium opacity-60 group-hover:opacity-100 transition-opacity duration-700 ease-out" :class="isDarkMode ? 'text-gray-400' : 'text-gray-500'">Scroll to explore</span>
              <Icon icon="ph:caret-down" class="w-8 h-8 transition-all duration-700 ease-out group-hover:scale-125 group-hover:translate-y-1" :class="isDarkMode ? 'text-gray-500' : 'text-gray-400'" />
            </div>
          </div>
        </div>
      </section>

      <!-- About Section - Bento Style -->
      <section id="about" class="py-32 max-w-7xl mx-auto">
        <div class="mb-20">
          <h2 class="text-4xl sm:text-5xl md:text-6xl font-bold text-center mb-4 transition-colors duration-700 ease-out" :class="isDarkMode ? 'text-white' : 'text-gray-900'">
            About Me
          </h2>
          <p class="text-center text-lg transition-colors duration-700 ease-out" :class="isDarkMode ? 'text-gray-400' : 'text-gray-600'">Get to know more about my journey and expertise</p>
            </div>
          
        <!-- Bento Grid Layout -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-auto">
          <!-- Large bio card -->
          <div class="lg:col-span-2 lg:row-span-2">
            <div class="h-full rounded-[2rem] p-8 transition-all duration-700 ease-out" :class="isDarkMode ? 'bg-gray-900/50 border border-gray-800' : 'bg-white border border-gray-200'">
                <div class="leading-relaxed space-y-4 transition-colors duration-700 ease-out" :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'">
                  <p class="text-lg">Cybersecurity MSc graduate with <span class="font-semibold">4+ years of professional software engineering experience</span> building and securing cloud-based applications. Strong foundation across security operations, governance & compliance (GRC), application security, and secure system design.</p>

                  <p>Experienced in <span class="font-semibold">access control</span>, <span class="font-semibold">encryption</span>, <span class="font-semibold">secure API integration</span>, <span class="font-semibold">GDPR-aligned data handling</span>, <span class="font-semibold">Microsoft 365 and Dynamics 365</span> (including case logging and CRM workflows), <span class="font-semibold">CRM tools</span>, and incident-aware support environments. Seeking an entry-level cybersecurity role where technical depth and risk-focused thinking can support secure and compliant systems.</p>

                  <p>Throughout my career, I've developed enterprise-grade web applications using <span class="font-semibold">Vue.js</span> and <span class="font-semibold">Nuxt.js</span>, implemented Role-Based Access Control (RBAC) to enforce least-privilege access, and integrated secure APIs with authentication tokens and robust error handling.</p>

                  <p>My academic research focused on enhancing data integrity, security, and access control in cloud-based inventory management systems, applying AES encryption, RSA key exchange, and role-based access control to protect data integrity and prevent unauthorized access.</p>
                </div>
              </div>
            </div>
            
          <!-- Skills Card 1 - Programming -->
          <div>
            <div class="h-full rounded-[2rem] p-6 transition-all duration-700 ease-out" :class="isDarkMode ? 'bg-gray-900/50 border border-gray-800' : 'bg-white border border-gray-200'">
                <div class="flex items-center gap-3 mb-4">
                  <div class="p-3 rounded-xl transition-colors duration-700 ease-out" :class="isDarkMode ? 'bg-gray-800' : 'bg-gray-100'">
                    <Icon icon="ph:code" class="w-6 h-6 transition-colors duration-700 ease-out" :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'" />
                  </div>
                  <h3 class="text-xl font-bold transition-colors duration-700 ease-out" :class="isDarkMode ? 'text-white' : 'text-gray-900'">Languages</h3>
                </div>
                <div class="flex flex-wrap gap-2.5">
                  <span class="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-700 ease-out cursor-default" :class="isDarkMode ? 'bg-gray-800 border border-gray-700 text-gray-300' : 'bg-gray-100 border border-gray-200 text-gray-700'">JavaScript (ES6+)</span>
                  <span class="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-500 cursor-default" :class="isDarkMode ? 'bg-gray-800 border border-gray-700 text-gray-300' : 'bg-gray-100 border border-gray-200 text-gray-700'">TypeScript</span>
                  <span class="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-500 cursor-default" :class="isDarkMode ? 'bg-gray-800 border border-gray-700 text-gray-300' : 'bg-gray-100 border border-gray-200 text-gray-700'">HTML5</span>
                  <span class="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-500 cursor-default" :class="isDarkMode ? 'bg-gray-800 border border-gray-700 text-gray-300' : 'bg-gray-100 border border-gray-200 text-gray-700'">CSS3</span>
                </div>
              </div>
            </div>

          <!-- Skills Card 2 - Frameworks -->
          <div>
            <div class="h-full rounded-[2rem] p-6 transition-all duration-700 ease-out" :class="isDarkMode ? 'bg-gray-900/50 border border-gray-800' : 'bg-white border border-gray-200'">
                <div class="flex items-center gap-3 mb-4">
                  <div class="p-3 rounded-xl transition-colors duration-700 ease-out" :class="isDarkMode ? 'bg-gray-800' : 'bg-gray-100'">
                    <Icon icon="ph:package" class="w-6 h-6 transition-colors duration-700 ease-out" :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'" />
                  </div>
                  <h3 class="text-xl font-bold transition-colors duration-700 ease-out" :class="isDarkMode ? 'text-white' : 'text-gray-900'">Frameworks</h3>
                </div>
                <div class="flex flex-wrap gap-2">
                  <span class="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-700 ease-out" :class="isDarkMode ? 'bg-gray-800 border border-gray-700 text-gray-300' : 'bg-gray-100 border border-gray-200 text-gray-700'">Vue.js (2/3)</span>
                  <span class="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-700 ease-out" :class="isDarkMode ? 'bg-gray-800 border border-gray-700 text-gray-300' : 'bg-gray-100 border border-gray-200 text-gray-700'">Nuxt.js</span>
                  <span class="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-700 ease-out" :class="isDarkMode ? 'bg-gray-800 border border-gray-700 text-gray-300' : 'bg-gray-100 border border-gray-200 text-gray-700'">TailwindCSS</span>
                  <span class="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-700 ease-out" :class="isDarkMode ? 'bg-gray-800 border border-gray-700 text-gray-300' : 'bg-gray-100 border border-gray-200 text-gray-700'">SASS</span>
                </div>
              </div>
            </div>

          <!-- Skills Card 3 - Tools -->
          <div>
            <div class="h-full rounded-[2rem] p-6 transition-all duration-700 ease-out" :class="isDarkMode ? 'bg-gray-900/50 border border-gray-800' : 'bg-white border border-gray-200'">
                <div class="flex items-center gap-3 mb-4">
                  <div class="p-3 rounded-xl transition-colors duration-700 ease-out" :class="isDarkMode ? 'bg-gray-800' : 'bg-gray-100'">
                    <Icon icon="ph:toolbox" class="w-6 h-6 transition-colors duration-700 ease-out" :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'" />
                  </div>
                  <h3 class="text-xl font-bold transition-colors duration-700 ease-out" :class="isDarkMode ? 'text-white' : 'text-gray-900'">Tools</h3>
                </div>
                <div class="flex flex-wrap gap-2">
                  <span class="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-700 ease-out" :class="isDarkMode ? 'bg-gray-800 border border-gray-700 text-gray-300' : 'bg-gray-100 border border-gray-200 text-gray-700'">Git</span>
                  <span class="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-700 ease-out" :class="isDarkMode ? 'bg-gray-800 border border-gray-700 text-gray-300' : 'bg-gray-100 border border-gray-200 text-gray-700'">Firebase</span>
                  <span class="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-700 ease-out" :class="isDarkMode ? 'bg-gray-800 border border-gray-700 text-gray-300' : 'bg-gray-100 border border-gray-200 text-gray-700'">REST APIs</span>
                  <span class="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-700 ease-out" :class="isDarkMode ? 'bg-gray-800 border border-gray-700 text-gray-300' : 'bg-gray-100 border border-gray-200 text-gray-700'">GraphQL</span>
                  <span class="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-700 ease-out" :class="isDarkMode ? 'bg-gray-800 border border-gray-700 text-gray-300' : 'bg-gray-100 border border-gray-200 text-gray-700'">CI/CD Pipelines</span>
                  <span class="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-700 ease-out" :class="isDarkMode ? 'bg-gray-800 border border-gray-700 text-gray-300' : 'bg-gray-100 border border-gray-200 text-gray-700'">Microsoft 365 & Dynamics 365</span>
                  <span class="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-700 ease-out" :class="isDarkMode ? 'bg-gray-800 border border-gray-700 text-gray-300' : 'bg-gray-100 border border-gray-200 text-gray-700'">ERP</span>
                </div>
              </div>
            </div>

          <!-- Skills Card 4 - Security & Testing Tools -->
          <div>
            <div class="h-full rounded-[2rem] p-6 transition-all duration-700 ease-out" :class="isDarkMode ? 'bg-gray-900/50 border border-gray-800' : 'bg-white border border-gray-200'">
                <div class="flex items-center gap-3 mb-4">
                  <div class="p-3 rounded-xl transition-colors duration-700 ease-out" :class="isDarkMode ? 'bg-gray-800' : 'bg-gray-100'">
                    <Icon icon="ph:flask" class="w-6 h-6 transition-colors duration-700 ease-out" :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'" />
                  </div>
                  <h3 class="text-xl font-bold transition-colors duration-700 ease-out" :class="isDarkMode ? 'text-white' : 'text-gray-900'">Security & Testing</h3>
                </div>
                <div class="flex flex-wrap gap-2">
                  <span class="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-700 ease-out" :class="isDarkMode ? 'bg-gray-800 border border-gray-700 text-gray-300' : 'bg-gray-100 border border-gray-200 text-gray-700'">Postman</span>
                  <span class="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-700 ease-out" :class="isDarkMode ? 'bg-gray-800 border border-gray-700 text-gray-300' : 'bg-gray-100 border border-gray-200 text-gray-700'">Playwright</span>
                  <span class="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-700 ease-out" :class="isDarkMode ? 'bg-gray-800 border border-gray-700 text-gray-300' : 'bg-gray-100 border border-gray-200 text-gray-700'">Cypress</span>
                  <span class="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-700 ease-out" :class="isDarkMode ? 'bg-gray-800 border border-gray-700 text-gray-300' : 'bg-gray-100 border border-gray-200 text-gray-700'">Jest</span>
                </div>
              </div>
            </div>

          <!-- Skills Card 5 - Security -->
          <div class="lg:col-span-2">
            <div class="h-full rounded-[2rem] p-6 transition-all duration-700 ease-out" :class="isDarkMode ? 'bg-gray-900/50 border border-gray-800' : 'bg-white border border-gray-200'">
                <div class="flex items-center gap-3 mb-4">
                  <div class="p-3 rounded-xl transition-colors duration-700 ease-out" :class="isDarkMode ? 'bg-gray-800' : 'bg-gray-100'">
                    <Icon icon="ph:shield-check" class="w-6 h-6 transition-colors duration-700 ease-out" :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'" />
                  </div>
                  <h3 class="text-xl font-bold transition-colors duration-700 ease-out" :class="isDarkMode ? 'text-white' : 'text-gray-900'">Cybersecurity</h3>
                </div>
                <div class="flex flex-wrap gap-2">
                  <span class="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-700 ease-out" :class="isDarkMode ? 'bg-gray-800 border border-gray-700 text-gray-300' : 'bg-gray-100 border border-gray-200 text-gray-700'">Security Operations (SOC)</span>
                  <span class="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-700 ease-out" :class="isDarkMode ? 'bg-gray-800 border border-gray-700 text-gray-300' : 'bg-gray-100 border border-gray-200 text-gray-700'">GRC</span>
                  <span class="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-700 ease-out" :class="isDarkMode ? 'bg-gray-800 border border-gray-700 text-gray-300' : 'bg-gray-100 border border-gray-200 text-gray-700'">AppSec</span>
                  <span class="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-700 ease-out" :class="isDarkMode ? 'bg-gray-800 border border-gray-700 text-gray-300' : 'bg-gray-100 border border-gray-200 text-gray-700'">SSDLC</span>
                  <span class="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-700 ease-out" :class="isDarkMode ? 'bg-gray-800 border border-gray-700 text-gray-300' : 'bg-gray-100 border border-gray-200 text-gray-700'">IAM (RBAC, ABAC)</span>
                  <span class="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-700 ease-out" :class="isDarkMode ? 'bg-gray-800 border border-gray-700 text-gray-300' : 'bg-gray-100 border border-gray-200 text-gray-700'">GDPR Compliance</span>
                  <span class="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-700 ease-out" :class="isDarkMode ? 'bg-gray-800 border border-gray-700 text-gray-300' : 'bg-gray-100 border border-gray-200 text-gray-700'">Cryptography (AES, RSA)</span>
                  <span class="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-700 ease-out" :class="isDarkMode ? 'bg-gray-800 border border-gray-700 text-gray-300' : 'bg-gray-100 border border-gray-200 text-gray-700'">Vulnerability Awareness</span>
                 </div>
              </div>
            </div>
        </div>
      </section>

      <!-- Experience Section -->
      <section class="py-32 max-w-7xl mx-auto">
        <div class="mb-20">
          <h2 class="text-4xl sm:text-5xl md:text-6xl font-bold text-center mb-4 transition-colors duration-700 ease-out" :class="isDarkMode ? 'text-white' : 'text-gray-900'">
            Experience
          </h2>
          <p class="text-center text-lg transition-colors duration-700 ease-out" :class="isDarkMode ? 'text-gray-400' : 'text-gray-600'">My professional journey</p>
            </div>
          
        <div class="space-y-6">
            <div v-for="(tab, index) in experienceTabs" :key="tab.label">
              <div class="rounded-[2rem] p-6 sm:p-8 transition-all duration-700 ease-out" :class="isDarkMode ? 'bg-gray-900/50 border border-gray-800' : 'bg-white border border-gray-200'">
                <div class="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
                  <div class="flex-1">
                    <h3 class="text-xl sm:text-2xl font-bold mb-2 transition-colors duration-700 ease-out" :class="isDarkMode ? 'text-white' : 'text-gray-900'">{{ tab.label }}</h3>
                    <div class="flex items-center gap-2 font-medium transition-colors duration-700 ease-out" :class="isDarkMode ? 'text-gray-400' : 'text-gray-600'">
                      <Icon icon="ph:calendar" class="w-5 h-5" />
                      <span>{{ tab.date }}</span>
                    </div>
                  </div>
                </div>
                <div class="grid sm:grid-cols-2 gap-4">
                  <div v-for="item in tab.timeline" :key="item.title" class="rounded-2xl p-5 transition-all duration-700 ease-out" :class="isDarkMode ? 'bg-gray-800/50 border border-gray-700' : 'bg-gray-50 border border-gray-200'">
                    <h4 class="font-semibold mb-2 flex items-start gap-2 transition-colors duration-700 ease-out" :class="isDarkMode ? 'text-white' : 'text-gray-900'">
                      <Icon icon="ph:check-circle" class="w-5 h-5 flex-shrink-0 mt-0.5 transition-colors duration-700 ease-out" :class="isDarkMode ? 'text-gray-400' : 'text-gray-600'" />
                      <span>{{ item.title }}</span>
                    </h4>
                    <p class="text-sm leading-relaxed transition-colors duration-700 ease-out" :class="isDarkMode ? 'text-gray-400' : 'text-gray-600'">{{ item.description }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </section>

      <!-- Key Achievements Section -->
      <section class="py-32 max-w-7xl mx-auto">
        <div class="mb-20">
          <h2 class="text-4xl sm:text-5xl md:text-6xl font-bold text-center mb-4 transition-colors duration-700 ease-out" :class="isDarkMode ? 'text-white' : 'text-gray-900'">
            Key Achievements
          </h2>
          <p class="text-center text-lg transition-colors duration-700 ease-out" :class="isDarkMode ? 'text-gray-400' : 'text-gray-600'">Notable professional accomplishments</p>
        </div>

        <div>
          <div class="rounded-[2rem] p-8 transition-all duration-700 ease-out" :class="isDarkMode ? 'bg-gray-900/50 border border-gray-800' : 'bg-white border border-gray-200'">
            <div class="flex items-start gap-4">
              <div class="p-3 rounded-xl flex-shrink-0 transition-colors duration-700 ease-out" :class="isDarkMode ? 'bg-gray-800' : 'bg-gray-100'">
                <Icon icon="ph:trophy" class="w-6 h-6 transition-colors duration-700 ease-out" :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'" />
              </div>
              <div>
                <h3 class="text-xl sm:text-2xl font-bold mb-3 transition-colors duration-700 ease-out" :class="isDarkMode ? 'text-white' : 'text-gray-900'">Secure Design Achievement</h3>
                <p class="text-lg leading-relaxed transition-colors duration-700 ease-out" :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'">
                  Successfully contributed to the migration of legacy data to secure cloud environments with <span class="font-semibold">zero data loss or security breaches</span>. This achievement demonstrates expertise in secure data migration, risk mitigation, and maintaining data integrity throughout complex system transitions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Education Section -->
      <section class="py-32 max-w-7xl mx-auto">
        <div class="mb-20">
          <h2 class="text-4xl sm:text-5xl md:text-6xl font-bold text-center mb-4 transition-colors duration-700 ease-out" :class="isDarkMode ? 'text-white' : 'text-gray-900'">
            Education
          </h2>
          <p class="text-center text-lg transition-colors duration-700 ease-out" :class="isDarkMode ? 'text-gray-400' : 'text-gray-600'">Academic background</p>
          </div>

        <div class="grid md:grid-cols-2 gap-6">
          <!-- Bachelor's Degree -->
          <div>
            <div class="h-full rounded-[2rem] p-8 transition-all duration-700 ease-out flex flex-col justify-between" :class="isDarkMode ? 'bg-gray-900/50 border border-gray-800' : 'bg-white border border-gray-200'">
              <div>
                <div class="flex items-center gap-3 mb-4">
                  <div class="p-3 rounded-xl transition-colors duration-700 ease-out" :class="isDarkMode ? 'bg-gray-800' : 'bg-gray-100'">
                    <Icon icon="ph:graduation-cap" class="w-6 h-6 transition-colors duration-700 ease-out" :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'" />
                  </div>
                  <span class="px-4 py-1.5 rounded-full text-sm font-bold transition-colors duration-700 ease-out" :class="isDarkMode ? 'bg-gray-800 border border-gray-700 text-gray-300' : 'bg-gray-100 border border-gray-200 text-gray-700'">2020</span>
                </div>
                <h4 class="text-xl sm:text-2xl font-bold mb-3 transition-colors duration-700 ease-out" :class="isDarkMode ? 'text-white' : 'text-gray-900'">Bachelor of Science in Computer Information System</h4>
                <p class="flex items-center gap-2 transition-colors duration-700 ease-out" :class="isDarkMode ? 'text-gray-400' : 'text-gray-600'">
                  <Icon icon="ph:building" class="w-5 h-5" />
                  Babcock University, Nigeria
                </p>
              </div>
            </div>
          </div>
            
          <!-- Master's Degree -->
          <div>
            <div class="h-full rounded-[2rem] p-8 transition-all duration-700 ease-out flex flex-col justify-between" :class="isDarkMode ? 'bg-gray-900/50 border border-gray-800' : 'bg-white border border-gray-200'">
              <div>
                <div class="flex items-center gap-3 mb-4">
                  <div class="p-3 rounded-xl transition-colors duration-700 ease-out" :class="isDarkMode ? 'bg-gray-800' : 'bg-gray-100'">
                    <Icon icon="ph:shield-check" class="w-6 h-6 transition-colors duration-700 ease-out" :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'" />
                  </div>
                  <span class="px-4 py-1.5 rounded-full text-sm font-bold transition-colors duration-700 ease-out" :class="isDarkMode ? 'bg-gray-800 border border-gray-700 text-gray-300' : 'bg-gray-100 border border-gray-200 text-gray-700'">2025</span>
                </div>
                <h4 class="text-xl sm:text-2xl font-bold mb-3 transition-colors duration-700 ease-out" :class="isDarkMode ? 'text-white' : 'text-gray-900'">Master of Science in Cybersecurity</h4>
                <p class="flex items-center gap-2 transition-colors duration-700 ease-out" :class="isDarkMode ? 'text-gray-400' : 'text-gray-600'">
                  <Icon icon="ph:building" class="w-5 h-5" />
                  University of Derby, England
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Projects Section -->
      <section id="projects" class="py-32 max-w-7xl mx-auto">
        <div class="mb-20">
          <h2 class="text-4xl sm:text-5xl md:text-6xl font-bold text-center mb-4 transition-colors duration-700 ease-out" :class="isDarkMode ? 'text-white' : 'text-gray-900'">
            Projects
          </h2>
          <p class="text-center text-lg transition-colors duration-700 ease-out" :class="isDarkMode ? 'text-gray-400' : 'text-gray-600'">Showcasing my work and contributions</p>
          </div>

        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

          <!-- Project Card - Storvv -->
          <div>
            <div class="h-full rounded-[2rem] p-6 transition-all duration-700 ease-out flex flex-col" :class="isDarkMode ? 'bg-gray-900/50 border border-gray-800' : 'bg-white border border-gray-200'">
              <div class="flex items-center gap-3 mb-4">
                <div class="p-3 rounded-xl transition-colors duration-700 ease-out" :class="isDarkMode ? 'bg-gray-800' : 'bg-gray-100'">
                  <Icon icon="ph:shield-check" class="w-6 h-6 transition-colors duration-700 ease-out" :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'" />
                </div>
                <div>
                  <h3 class="text-xl font-bold transition-colors duration-700 ease-out" :class="isDarkMode ? 'text-white' : 'text-gray-900'">Storvv</h3>
                  <span class="text-xs transition-colors duration-700 ease-out" :class="isDarkMode ? 'text-gray-400' : 'text-gray-500'">Secure cloud inventory</span>
                </div>
              </div>
              <p class="text-sm leading-relaxed mb-6 flex-grow transition-colors duration-700 ease-out" :class="isDarkMode ? 'text-gray-400' : 'text-gray-600'">Secure cloud-based inventory management web app. Built with Firebase; applies AES encryption, RSA key exchange, and role-based access control to protect data integrity and prevent unauthorized access.</p>
              <a href="https://www.storvv.com" target="_blank" rel="noopener noreferrer" class="flex items-center justify-center gap-2 w-full py-3.5 px-5 rounded-2xl font-semibold transition-all duration-700 ease-out" :class="isDarkMode ? 'bg-gray-800 text-white hover:bg-gray-700 border border-gray-700' : 'bg-gray-900 text-white hover:bg-gray-800 border border-gray-800'">
                View app
                <Icon icon="ph:arrow-up-right" class="w-5 h-5" />
              </a>
            </div>
          </div>

          <!-- Project Card - SmartPhoneHub -->
          <div>
            <div class="h-full rounded-[2rem] p-6 transition-all duration-700 ease-out flex flex-col" :class="isDarkMode ? 'bg-gray-900/50 border border-gray-800' : 'bg-white border border-gray-200'">
              <div class="flex items-center gap-3 mb-4">
                <div class="p-3 rounded-xl transition-colors duration-700 ease-out" :class="isDarkMode ? 'bg-gray-800' : 'bg-gray-100'">
                  <Icon icon="ph:storefront" class="w-6 h-6 transition-colors duration-700 ease-out" :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'" />
                </div>
                <h3 class="text-xl font-bold transition-colors duration-700 ease-out" :class="isDarkMode ? 'text-white' : 'text-gray-900'">SmartPhoneHub</h3>
              </div>
              <p class="text-sm leading-relaxed mb-6 flex-grow transition-colors duration-700 ease-out" :class="isDarkMode ? 'text-gray-400' : 'text-gray-600'">Retail ecommerce experience for phones, laptops, wearables, and accessories, with shop by category, trade-in, support, and store info with a polished, responsive layout.</p>
              <a href="https://sph-ng.com/" target="_blank" rel="noopener noreferrer" class="flex items-center justify-center gap-2 w-full py-3.5 px-5 rounded-2xl font-semibold transition-all duration-700 ease-out" :class="isDarkMode ? 'bg-gray-800 text-white hover:bg-gray-700 border border-gray-700' : 'bg-gray-900 text-white hover:bg-gray-800 border border-gray-800'">
                View site
                <Icon icon="ph:arrow-up-right" class="w-5 h-5" />
              </a>
            </div>
          </div>

          <!-- Project Card - Secret Santa Generator -->
          <div>
            <div class="h-full rounded-[2rem] p-6 transition-all duration-700 ease-out flex flex-col" :class="isDarkMode ? 'bg-gray-900/50 border border-gray-800' : 'bg-white border border-gray-200'">
              <div class="flex items-center gap-3 mb-4">
                <div class="p-3 rounded-xl transition-colors duration-700 ease-out" :class="isDarkMode ? 'bg-gray-800' : 'bg-gray-100'">
                  <Icon icon="ph:gift" class="w-6 h-6 transition-colors duration-700 ease-out" :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'" />
                </div>
                <h3 class="text-xl font-bold transition-colors duration-700 ease-out" :class="isDarkMode ? 'text-white' : 'text-gray-900'">Secret Santa Generator</h3>
              </div>
              <p class="text-sm leading-relaxed mb-6 flex-grow transition-colors duration-700 ease-out" :class="isDarkMode ? 'text-gray-400' : 'text-gray-600'">A fun and interactive Secret Santa gift exchange generator that randomly pairs participants while ensuring no one gets themselves. Features include participant management, email notifications, and wishlist support.</p>
              <a href="https://secret-santa-virid.vercel.app/auth" target="_blank" class="flex items-center justify-center gap-2 w-full py-3.5 px-5 rounded-2xl font-semibold transition-all duration-700 ease-out" :class="isDarkMode ? 'bg-gray-800 text-white hover:bg-gray-700 border border-gray-700' : 'bg-gray-900 text-white hover:bg-gray-800 border border-gray-800'">
                View Project
                <Icon icon="ph:arrow-up-right" class="w-5 h-5" />
              </a>
            </div>
          </div>

          <!-- Project Card 1 -->
          <div>
            <div class="h-full rounded-[2rem] p-6 transition-all duration-700 ease-out flex flex-col" :class="isDarkMode ? 'bg-gray-900/50 border border-gray-800' : 'bg-white border border-gray-200'">
              <div class="flex items-center gap-3 mb-4">
                <div class="p-3 rounded-xl transition-colors duration-700 ease-out" :class="isDarkMode ? 'bg-gray-800' : 'bg-gray-100'">
                  <Icon icon="ph:shield-chevron" class="w-6 h-6 transition-colors duration-700 ease-out" :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'" />
                </div>
                <h3 class="text-xl font-bold transition-colors duration-700 ease-out" :class="isDarkMode ? 'text-white' : 'text-gray-900'">Password Entropy Calculator</h3>
              </div>
              <p class="text-sm leading-relaxed mb-6 flex-grow transition-colors duration-700 ease-out" :class="isDarkMode ? 'text-gray-400' : 'text-gray-600'">Advanced password entropy calculator with modern web technologies for seamless user experience.</p>
              <a href="https://password-entropy-six.vercel.app/" target="_blank" class="flex items-center justify-center gap-2 w-full py-3.5 px-5 rounded-2xl font-semibold transition-all duration-700 ease-out" :class="isDarkMode ? 'bg-gray-800 text-white hover:bg-gray-700 border border-gray-700' : 'bg-gray-900 text-white hover:bg-gray-800 border border-gray-800'">
                View Project
                <Icon icon="ph:arrow-up-right" class="w-5 h-5" />
              </a>
            </div>
          </div>

          <!-- Project Card 4 -->
          <div>
            <div class="h-full rounded-[2rem] p-6 transition-all duration-700 ease-out flex flex-col" :class="isDarkMode ? 'bg-gray-900/50 border border-gray-800' : 'bg-white border border-gray-200'">
              <div class="flex items-center gap-3 mb-4">
                <div class="p-3 rounded-xl transition-colors duration-700 ease-out" :class="isDarkMode ? 'bg-gray-800' : 'bg-gray-100'">
                  <Icon icon="ph:building-office" class="w-6 h-6 transition-colors duration-700 ease-out" :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'" />
                </div>
                <h3 class="text-xl font-bold transition-colors duration-700 ease-out" :class="isDarkMode ? 'text-white' : 'text-gray-900'">KUO Company Website</h3>
              </div>
              <p class="text-sm leading-relaxed mb-6 flex-grow transition-colors duration-700 ease-out" :class="isDarkMode ? 'text-gray-400' : 'text-gray-600'">Original corporate website for KUO Smart Solutions built with clean, professional design. Showcases company services, team expertise, and client testimonials with optimized performance and SEO.</p>
              <a href="https://www.kuosmartsolution.com/" target="_blank" class="flex items-center justify-center gap-2 w-full py-3.5 px-5 rounded-2xl font-semibold transition-all duration-700 ease-out" :class="isDarkMode ? 'bg-gray-800 text-white hover:bg-gray-700 border border-gray-700' : 'bg-gray-900 text-white hover:bg-gray-800 border border-gray-800'">
                View Project
                <Icon icon="ph:arrow-up-right" class="w-5 h-5" />
              </a>
            </div>
          </div>

          <!-- Project Card 5 -->
          <div>
            <div class="h-full rounded-[2rem] p-6 transition-all duration-700 ease-out flex flex-col" :class="isDarkMode ? 'bg-gray-900/50 border border-gray-800' : 'bg-white border border-gray-200'">
              <div class="flex items-center gap-3 mb-4">
                <div class="p-3 rounded-xl transition-colors duration-700 ease-out" :class="isDarkMode ? 'bg-gray-800' : 'bg-gray-100'">
                  <Icon icon="ph:building-office" class="w-6 h-6 transition-colors duration-700 ease-out" :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'" />
                </div>
                <h3 class="text-xl font-bold transition-colors duration-700 ease-out" :class="isDarkMode ? 'text-white' : 'text-gray-900'">Visioni and Strauss</h3>
              </div>
              <p class="text-sm leading-relaxed mb-6 flex-grow transition-colors duration-700 ease-out" :class="isDarkMode ? 'text-gray-400' : 'text-gray-600'">Original corporate website for visioniandstrauss built with clean, professional design. Showcases company services, team expertise, and client testimonials with optimized performance and SEO.</p>
              <a href="https://www.visioniandstrauss.com/" target="_blank" class="flex items-center justify-center gap-2 w-full py-3.5 px-5 rounded-2xl font-semibold transition-all duration-700 ease-out" :class="isDarkMode ? 'bg-gray-800 text-white hover:bg-gray-700 border border-gray-700' : 'bg-gray-900 text-white hover:bg-gray-800 border border-gray-800'">
                View Project
                <Icon icon="ph:arrow-up-right" class="w-5 h-5" />
              </a>
            </div>
          </div>
            
          <!-- Project Card 6 -->
          <div>
            <div class="h-full rounded-[2rem] p-6 transition-all duration-700 ease-out flex flex-col" :class="isDarkMode ? 'bg-gray-900/50 border border-gray-800' : 'bg-white border border-gray-200'">
              <div class="flex items-center gap-3 mb-4">
                <div class="p-3 rounded-xl transition-colors duration-700 ease-out" :class="isDarkMode ? 'bg-gray-800' : 'bg-gray-100'">
                  <Icon icon="ph:lightning" class="w-6 h-6 transition-colors duration-700 ease-out" :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'" />
                </div>
                <h3 class="text-xl font-bold transition-colors duration-700 ease-out" :class="isDarkMode ? 'text-white' : 'text-gray-900'">T30 Energies</h3>
              </div>
              <p class="text-sm leading-relaxed mb-6 flex-grow transition-colors duration-700 ease-out" :class="isDarkMode ? 'text-gray-400' : 'text-gray-600'">Comprehensive energy company website featuring dynamic content management, interactive service portfolios, and client engagement tools. Built with modern web standards and mobile-first responsive design.</p>
              <a href="https://www.t30energies.com/" target="_blank" class="flex items-center justify-center gap-2 w-full py-3.5 px-5 rounded-2xl font-semibold transition-all duration-700 ease-out" :class="isDarkMode ? 'bg-gray-800 text-white hover:bg-gray-700 border border-gray-700' : 'bg-gray-900 text-white hover:bg-gray-800 border border-gray-800'">
                View Project
                <Icon icon="ph:arrow-up-right" class="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <!-- Contact Section -->
      <section id="contact" class="py-32 max-w-5xl mx-auto">
        <div class="mb-20">
          <h2 class="text-4xl sm:text-5xl md:text-6xl font-bold text-center mb-4 transition-colors duration-700 ease-out" :class="isDarkMode ? 'text-white' : 'text-gray-900'">
            Get in Touch
          </h2>
          <p class="text-center text-lg max-w-3xl mx-auto px-4 transition-colors duration-700 ease-out" :class="isDarkMode ? 'text-gray-400' : 'text-gray-600'">
            I'm always open to new opportunities and collaborations, especially in entry-level cybersecurity roles 
            where technical depth and risk-focused thinking can support secure and compliant systems. Let's connect!
          </p>
          </div>

          <div class="rounded-[2rem] p-8 sm:p-12 transition-all duration-500" :class="isDarkMode ? 'bg-gray-900/50 border border-gray-800' : 'bg-white border border-gray-200'">
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <!-- LinkedIn -->
              <a
                href="https://www.linkedin.com/in/chigozie-agu-85019b209"
                target="_blank"
                rel="noopener noreferrer"
                class="flex flex-col items-center gap-4 p-7 rounded-[1.5rem] transition-all duration-700 ease-out"
                :class="isDarkMode ? 'bg-gray-800 border border-gray-700 hover:bg-gray-700' : 'bg-gray-100 border border-gray-200 hover:bg-gray-200'"
              >
                <div class="p-4 rounded-xl transition-colors duration-700 ease-out" :class="isDarkMode ? 'bg-gray-700' : 'bg-gray-200'">
                  <Icon icon="mdi:linkedin" class="w-10 h-10 transition-colors duration-700 ease-out" :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'" />
                </div>
                <span class="text-sm font-semibold transition-colors duration-700 ease-out" :class="isDarkMode ? 'text-white' : 'text-gray-900'">LinkedIn</span>
              </a>

              <!-- GitHub -->
              <a
                href="https://github.com/GozzAgu"
                target="_blank"
                rel="noopener noreferrer"
                class="flex flex-col items-center gap-4 p-7 rounded-[1.5rem] transition-all duration-700 ease-out"
                :class="isDarkMode ? 'bg-gray-800 border border-gray-700 hover:bg-gray-700' : 'bg-gray-100 border border-gray-200 hover:bg-gray-200'"
              >
                <div class="p-4 rounded-xl transition-colors duration-700 ease-out" :class="isDarkMode ? 'bg-gray-700' : 'bg-gray-200'">
                  <Icon icon="mdi:github" class="w-10 h-10 transition-colors duration-700 ease-out" :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'" />
                </div>
                <span class="text-sm font-semibold transition-colors duration-700 ease-out" :class="isDarkMode ? 'text-white' : 'text-gray-900'">GitHub</span>
              </a>

              <!-- Email -->
              <a
                href="mailto:Gozieagu1@gmail.com"
                class="flex flex-col items-center gap-4 p-7 rounded-[1.5rem] transition-all duration-700 ease-out"
                :class="isDarkMode ? 'bg-gray-800 border border-gray-700 hover:bg-gray-700' : 'bg-gray-100 border border-gray-200 hover:bg-gray-200'"
              >
                <div class="p-4 rounded-xl transition-colors duration-700 ease-out" :class="isDarkMode ? 'bg-gray-700' : 'bg-gray-200'">
                  <Icon icon="mdi:email" class="w-10 h-10 transition-colors duration-700 ease-out" :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'" />
                </div>
                <span class="text-sm font-semibold transition-colors duration-700 ease-out" :class="isDarkMode ? 'text-white' : 'text-gray-900'">Email</span>
              </a>
            </div>
            
            <!-- Contact Details -->
            <div class="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
              <div class="rounded-2xl p-4 transition-all duration-700 ease-out" :class="isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-gray-100 border border-gray-200'">
                <Icon icon="ph:phone" class="w-6 h-6 mx-auto mb-2 transition-colors duration-700 ease-out" :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'" />
                <p class="text-sm transition-colors duration-700 ease-out" :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'">07551116916</p>
              </div>
              <div class="rounded-2xl p-4 transition-all duration-700 ease-out" :class="isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-gray-100 border border-gray-200'">
                <Icon icon="ph:map-pin" class="w-6 h-6 mx-auto mb-2 transition-colors duration-700 ease-out" :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'" />
                <p class="text-sm transition-colors duration-700 ease-out" :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'">Derby, UK</p>
              </div>
            </div>
          </div>
      </section>
    </main>

    <!-- Footer -->
    <footer class="w-full py-12 text-center border-t relative z-10 transition-all duration-500" :class="isDarkMode ? 'bg-gray-900/50 border-gray-800' : 'bg-white border-gray-200'">
      <div class="max-w-7xl mx-auto px-4">
        <div class="flex flex-col items-center gap-4">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm transition-colors duration-700 ease-out" :class="isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-900 text-white'">
              G
            </div>
            <span class="font-medium transition-colors duration-700 ease-out" :class="isDarkMode ? 'text-gray-400' : 'text-gray-600'">Franklin Agu</span>
          </div>
          <p class="text-sm transition-colors duration-700 ease-out" :class="isDarkMode ? 'text-gray-500' : 'text-gray-500'">
            Built with ❤️ using <span class="font-semibold">Nuxt.js</span> & <span class="font-semibold">Tailwind CSS</span>
          </p>
          <p class="text-xs transition-colors duration-700 ease-out" :class="isDarkMode ? 'text-gray-600' : 'text-gray-500'">
            © {{ new Date().getFullYear() }} All rights reserved
          </p>
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
    label: "Service Operations Analyst - Concentrix",
    date: "March 2026 - Present",
    completed: false,
    timeline: [
      {
        title: "Service Operations & Technical Support",
        description: "Work in service operations to resolve technical issues, maintain service quality standards, and support positive customer outcomes.",
      },
      {
        title: "Microsoft 365 & Dynamics 365",
        description: "Use Microsoft 365 and Dynamics 365 for CRM-driven service delivery: case creation, structured case logging, customer records, activity history, queues, workflows, and clean handoffs across teams.",
      },
      {
        title: "Case logging & service records",
        description: "Maintain accurate case notes, timelines, and resolution details for audit readiness, quality checks, and operational reporting.",
      },
      {
        title: "GDPR, identity verification & data handling",
        description: "Apply GDPR-aligned practices: verify identity before account access or disclosure, minimise sharing of personal data, respect consent and retention rules, and follow client security and privacy policies.",
      },
      {
        title: "Incident management & escalation",
        description: "Log, prioritise, track, and escalate incidents through defined channels and tools, keeping cases updated until closure.",
      },
      {
        title: "Technical Communication",
        description: "Communicate technical and security-related issues clearly to non-technical users.",
      },
    ],
  },
  {
    label: "Service Operations Analyst - EE (UK)",
    date: "April 2025 - March 2026",
    completed: true,
    timeline: [
      {
        title: "Frontline Technical Support",
        description: "Provide frontline technical support for mobile devices, digital accounts, and connectivity issues.",
      },
      {
        title: "CRM Tools",
        description: "Used several CRM tools for customer data, case management, and issue tracking in technical support workflows.",
      },
      {
        title: "Identity Verification & GDPR Compliance",
        description: "Enforce identity verification and GDPR-compliant data handling before accessing customer accounts.",
      },
      {
        title: "Technical Communication",
        description: "Communicate technical and security-related issues clearly to non-technical users.",
      },
    ],
  },
  {
    label: "Frontend Engineer - Famous Parking (Remote, USA)",
    date: "2023 - 2024",
    completed: true,
    timeline: [
      {
        title: "Secure System Development",
        description: "Built systems handling sensitive transactional and user data with security best practices.",
      },
      {
        title: "Secure API Integration",
        description: "Integrated third-party APIs supporting secure payments and real-time data processing.",
      },
      {
        title: "Testing & Risk Mitigation",
        description: "Conducted regression testing and documented test cases to reduce operational and security risks.",
      },
      {
        title: "Business Requirements Translation",
        description: "Translated business requirements into secure, maintainable frontend implementations.",
      },
    ],
  },
  {
    label: "Frontend Engineer - Cyphercrescent Ltd (Hybrid, Nigeria)",
    date: "2020 - 2025",
    completed: true,
    timeline: [
      {
        title: "Enterprise Web Application Development",
        description: "Developed and maintained enterprise-grade web applications using Vue.js and Nuxt.js.",
      },
      {
        title: "Role-Based Access Control (RBAC)",
        description: "Implemented Role-Based Access Control (RBAC) to enforce least-privilege access.",
      },
      {
        title: "Secure API Integration",
        description: "Integrated secure APIs with authentication tokens and robust error handling.",
      },
      {
        title: "CI/CD & Version Control",
        description: "Supported secure deployments through CI/CD pipelines and version control.",
      },
      {
        title: "Cross-functional Security Collaboration",
        description: "Collaborated cross-functionally to align system functionality with security and compliance requirements.",
      },
    ],
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