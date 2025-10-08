<template>
  <div class="min-h-screen flex flex-col bg-[#0a0a0f] text-gray-100 relative overflow-hidden">
    <!-- Animated mesh gradient background -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute top-0 left-0 w-full h-full">
        <div class="absolute top-[-10%] left-[-5%] w-[40rem] h-[40rem] rounded-full bg-gradient-to-br from-violet-500/30 via-purple-500/20 to-transparent blur-3xl animate-blob"></div>
        <div class="absolute top-[20%] right-[-10%] w-[35rem] h-[35rem] rounded-full bg-gradient-to-br from-cyan-500/30 via-blue-500/20 to-transparent blur-3xl animate-blob animation-delay-2000"></div>
        <div class="absolute bottom-[-15%] left-[20%] w-[45rem] h-[45rem] rounded-full bg-gradient-to-br from-emerald-500/30 via-green-500/20 to-transparent blur-3xl animate-blob animation-delay-4000"></div>
        <div class="absolute bottom-[10%] right-[10%] w-[30rem] h-[30rem] rounded-full bg-gradient-to-br from-pink-500/20 via-rose-500/15 to-transparent blur-3xl animate-blob animation-delay-6000"></div>
      </div>
      <div class="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
    </div>

    <!-- Floating header with modern design -->
    <header class="w-full fixed top-4 z-50 px-4 sm:px-6">
      <nav class="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex justify-between items-center backdrop-blur-2xl bg-white/5 border border-white/10 rounded-2xl shadow-2xl shadow-black/10 transition-all duration-500 hover:bg-white/10">
        <div class="flex items-center space-x-3 group cursor-pointer" @click="scrollToTop">
          <div class="relative">
            <div class="absolute inset-0 bg-gradient-to-r from-violet-500 via-cyan-500 to-emerald-500 rounded-xl blur-md opacity-75 group-hover:opacity-100 transition duration-500 animate-gradient-xy"></div>
            <div class="relative w-10 h-10 bg-gradient-to-br from-violet-500 via-cyan-500 to-emerald-500 rounded-xl flex items-center justify-center font-bold text-white shadow-lg">
              G
            </div>
          </div>
          <h1 class="hidden sm:block relative text-xl font-bold bg-gradient-to-r from-violet-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">Goz</h1>
        </div>

        <div class="flex space-x-1 sm:space-x-2 text-sm">
          <a href="#about" class="nav-link-modern group relative px-4 py-2 rounded-lg font-medium text-gray-300 hover:text-white transition-all duration-300">
            <span class="relative z-10">About</span>
            <div class="absolute inset-0 bg-gradient-to-r from-violet-500/20 to-cyan-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
          </a>
          <a href="#projects" class="nav-link-modern group relative px-4 py-2 rounded-lg font-medium text-gray-300 hover:text-white transition-all duration-300">
            <span class="relative z-10">Projects</span>
            <div class="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
          </a>
          <a href="#contact" class="nav-link-modern group relative px-4 py-2 rounded-lg font-medium text-gray-300 hover:text-white transition-all duration-300">
            <span class="relative z-10">Contact</span>
            <div class="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-violet-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
          </a>
        </div>

        <button @click="toggleDarkMode" class="p-2.5 rounded-xl backdrop-blur-md bg-white/5 border border-white/10 transition-all duration-300 hover:scale-110 hover:bg-white/10 hover:border-white/20 shadow-lg group">
          <Icon v-if="!isDarkMode" icon="ph:sun-duotone" class="w-5 h-5 text-yellow-400 group-hover:rotate-180 transition-transform duration-500" />
          <Icon v-else icon="ph:moon-duotone" class="w-5 h-5 text-blue-300 group-hover:rotate-12 transition-transform duration-500" />
        </button>
      </nav>
    </header>

    <main class="flex-grow w-full px-4 sm:px-6 py-20 relative z-10">
      <!-- Hero Section - Modern & Minimal -->
      <section class="min-h-screen flex items-center justify-center py-20 max-w-7xl mx-auto">
        <div class="text-center space-y-12 animate-fade-in-up w-full">
          <!-- Avatar with modern gradient -->
          <div class="relative inline-block">
            <div class="absolute -inset-4 bg-gradient-to-r from-violet-500 via-cyan-500 to-emerald-500 rounded-3xl blur-2xl opacity-40 animate-pulse-slow"></div>
            <div class="relative w-28 h-28 sm:w-36 sm:h-36 mx-auto bg-gradient-to-br from-violet-500 via-cyan-500 to-emerald-500 rounded-3xl flex items-center justify-center shadow-2xl transform hover:scale-105 transition-transform duration-500 hover:rotate-3">
              <span class="text-5xl sm:text-6xl font-bold text-white">G</span>
            </div>
          </div>

          <!-- Name with modern typography -->
          <div class="space-y-4">
            <h1 class="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight">
              <span class="block bg-gradient-to-r from-violet-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent animate-gradient-xy">
                Chigozie Franklin Agu
              </span>
            </h1>
            <p class="text-xl sm:text-2xl md:text-3xl font-light text-gray-400 max-w-4xl mx-auto leading-relaxed px-4">
              Software Engineer with Cybersecurity expertise, crafting 
              <span class="text-violet-400 font-medium">secure</span> and 
              <span class="text-cyan-400 font-medium">scalable</span> 
              software solutions
            </p>
          </div>

          <!-- CTA Buttons with modern magnetic effect -->
          <div class="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 px-4">
            <button 
              @click="scrollToSection('projects')"
              class="group relative px-8 py-4 rounded-2xl bg-gradient-to-r from-violet-500 via-cyan-500 to-emerald-500 text-white font-semibold text-lg shadow-2xl hover:shadow-violet-500/50 transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 w-full sm:w-auto overflow-hidden"
            >
              <span class="relative z-10 flex items-center justify-center gap-2">
                Explore My Work
                <Icon icon="ph:arrow-right" class="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
              <div class="absolute inset-0 bg-gradient-to-r from-violet-600 via-cyan-600 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </button>
            <button 
              @click="scrollToSection('contact')"
              class="group relative px-8 py-4 rounded-2xl backdrop-blur-xl bg-white/5 border-2 border-white/10 text-white font-semibold text-lg hover:bg-white/10 hover:border-white/20 transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 w-full sm:w-auto"
            >
              <span class="flex items-center justify-center gap-2">
                Get In Touch
                <Icon icon="ph:paper-plane-tilt" class="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
              </span>
            </button>
          </div>

          <!-- Scroll indicator -->
          <div class="pt-12 animate-bounce">
            <Icon icon="ph:caret-down" class="w-8 h-8 text-gray-500 mx-auto" />
          </div>
        </div>
      </section>

      <!-- About Section - Bento Style -->
      <section id="about" class="py-32 max-w-7xl mx-auto" ref="aboutSection">
        <div class="mb-20">
          <h2 class="text-4xl sm:text-5xl md:text-6xl font-bold text-center mb-4">
            <span class="bg-gradient-to-r from-violet-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              About Me
            </span>
          </h2>
          <p class="text-center text-gray-400 text-lg">Get to know more about my journey and expertise</p>
        </div>

        <!-- Bento Grid Layout -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-auto">
          <!-- Large bio card -->
          <div class="lg:col-span-2 lg:row-span-2 group">
            <div class="relative h-full">
              <div class="absolute -inset-0.5 bg-gradient-to-r from-violet-500 to-cyan-500 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
              <div class="relative h-full backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all duration-500">
                <div class="text-gray-300 leading-relaxed space-y-4" ref="aboutDescription">
                  <div v-if="!aboutTyping && aboutText === ''" class="space-y-4">
                    <p class="text-lg">Hi, I'm <span class="font-semibold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">Chigozie Franklin Agu</span>, a passionate software engineer with over 4+ years of experience building dynamic web applications and software solutions using modern technologies like <span class="text-cyan-400 font-semibold">Vue.js</span> and <span class="text-cyan-400 font-semibold">TypeScript</span>.</p>
                    
                    <p>Currently pursuing my Master's in Cybersecurity, I combine software development expertise with security best practices to create secure, scalable, and performant applications.</p>

                    <p>I started my career as a self-taught developer, diving into the world of HTML, CSS, and JavaScript. After mastering the fundamentals, I expanded my skills to include <span class="text-emerald-400 font-semibold">full-stack development</span>, focusing on building end-to-end solutions that solve real-world problems.</p>

                    <p>I love solving complex problems, collaborating with teams, and learning new technologies to enhance my development workflow. When I'm not coding, I enjoy contributing to open-source projects and staying updated with the latest software engineering trends.</p>
                  </div>
                  <div v-else class="space-y-4">
                    <div v-for="(paragraph, index) in aboutParagraphs" :key="index" class="transition-all duration-1000 ease-in-out" :class="{ 'opacity-100 translate-y-0': paragraph.visible, 'opacity-0 translate-y-4': !paragraph.visible }">
                      <p v-html="paragraph.text"></p>
                    </div>
                    <span v-if="aboutTyping" class="typewriter-cursor text-cyan-400 text-2xl">|</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Skills Card 1 - Programming -->
          <div class="group">
            <div class="relative h-full">
              <div class="absolute -inset-0.5 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
              <div class="relative h-full backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6 hover:bg-white/10 transition-all duration-500">
                <div class="flex items-center gap-3 mb-4">
                  <div class="p-3 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-xl">
                    <Icon icon="ph:code" class="w-6 h-6 text-yellow-400" />
                  </div>
                  <h3 class="text-xl font-bold text-white">Languages</h3>
                </div>
                <div class="flex flex-wrap gap-2">
                  <span class="px-3 py-1.5 bg-yellow-500/10 border border-yellow-500/20 rounded-lg text-yellow-400 text-sm font-medium">JavaScript</span>
                  <span class="px-3 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-lg text-blue-400 text-sm font-medium">TypeScript</span>
                  <span class="px-3 py-1.5 bg-purple-500/10 border border-purple-500/20 rounded-lg text-purple-400 text-sm font-medium">Java</span>
                  <span class="px-3 py-1.5 bg-orange-500/10 border border-orange-500/20 rounded-lg text-orange-400 text-sm font-medium">HTML5</span>
                  <span class="px-3 py-1.5 bg-pink-500/10 border border-pink-500/20 rounded-lg text-pink-400 text-sm font-medium">CSS3</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Skills Card 2 - Frameworks -->
          <div class="group">
            <div class="relative h-full">
              <div class="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
              <div class="relative h-full backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6 hover:bg-white/10 transition-all duration-500">
                <div class="flex items-center gap-3 mb-4">
                  <div class="p-3 bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 rounded-xl">
                    <Icon icon="ph:package" class="w-6 h-6 text-emerald-400" />
                  </div>
                  <h3 class="text-xl font-bold text-white">Frameworks</h3>
                </div>
                <div class="flex flex-wrap gap-2">
                  <span class="px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-emerald-400 text-sm font-medium">Vue.js</span>
                  <span class="px-3 py-1.5 bg-cyan-500/10 border border-cyan-500/20 rounded-lg text-cyan-400 text-sm font-medium">Nuxt.js</span>
                  <span class="px-3 py-1.5 bg-purple-500/10 border border-purple-500/20 rounded-lg text-purple-400 text-sm font-medium">Node.js</span>
                  <span class="px-3 py-1.5 bg-teal-500/10 border border-teal-500/20 rounded-lg text-teal-400 text-sm font-medium">Tailwind</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Skills Card 3 - Tools -->
          <div class="group">
            <div class="relative h-full">
              <div class="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
              <div class="relative h-full backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6 hover:bg-white/10 transition-all duration-500">
                <div class="flex items-center gap-3 mb-4">
                  <div class="p-3 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-xl">
                    <Icon icon="ph:toolbox" class="w-6 h-6 text-blue-400" />
                  </div>
                  <h3 class="text-xl font-bold text-white">Tools</h3>
                </div>
                <div class="flex flex-wrap gap-2">
                  <span class="px-3 py-1.5 bg-indigo-500/10 border border-indigo-500/20 rounded-lg text-indigo-400 text-sm font-medium">Git</span>
                  <span class="px-3 py-1.5 bg-orange-500/10 border border-orange-500/20 rounded-lg text-orange-400 text-sm font-medium">Figma</span>
                  <span class="px-3 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-lg text-blue-400 text-sm font-medium">Docker</span>
                  <span class="px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-emerald-400 text-sm font-medium">Firebase</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Skills Card 4 - Security -->
          <div class="group lg:col-span-2">
            <div class="relative h-full">
              <div class="absolute -inset-0.5 bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
              <div class="relative h-full backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6 hover:bg-white/10 transition-all duration-500">
                <div class="flex items-center gap-3 mb-4">
                  <div class="p-3 bg-gradient-to-br from-red-500/20 to-purple-500/20 rounded-xl">
                    <Icon icon="ph:shield-check" class="w-6 h-6 text-red-400" />
                  </div>
                  <h3 class="text-xl font-bold text-white">Cybersecurity</h3>
                </div>
                <div class="flex flex-wrap gap-2">
                  <span class="px-3 py-1.5 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm font-medium">Secure Coding</span>
                  <span class="px-3 py-1.5 bg-purple-500/10 border border-purple-500/20 rounded-lg text-purple-400 text-sm font-medium">Threat Analysis</span>
                  <span class="px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-emerald-400 text-sm font-medium">Web Security</span>
                  <span class="px-3 py-1.5 bg-amber-500/10 border border-amber-500/20 rounded-lg text-amber-400 text-sm font-medium">OWASP</span>
                  <span class="px-3 py-1.5 bg-pink-500/10 border border-pink-500/20 rounded-lg text-pink-400 text-sm font-medium">Risk Assessment</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Experience Section -->
      <section class="py-32 max-w-7xl mx-auto">
        <div class="mb-20">
          <h2 class="text-4xl sm:text-5xl md:text-6xl font-bold text-center mb-4">
            <span class="bg-gradient-to-r from-violet-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              Experience
            </span>
          </h2>
          <p class="text-center text-gray-400 text-lg">My professional journey</p>
        </div>

        <div class="space-y-6">
          <div v-for="(tab, index) in experienceTabs" :key="tab.label" class="group">
            <div class="relative">
              <div class="absolute -inset-0.5 bg-gradient-to-r from-violet-500 via-cyan-500 to-emerald-500 rounded-3xl blur opacity-10 group-hover:opacity-30 transition-all duration-500"></div>
              <div class="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 hover:bg-white/10 transition-all duration-500">
                <div class="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
                  <div class="flex-1">
                    <h3 class="text-xl sm:text-2xl font-bold text-white mb-2">{{ tab.label }}</h3>
                    <div class="flex items-center gap-2 text-cyan-400 font-medium">
                      <Icon icon="ph:calendar" class="w-5 h-5" />
                      <span>{{ tab.date }}</span>
                    </div>
                  </div>
                  <div class="w-3 h-3 bg-gradient-to-r from-violet-400 to-cyan-400 rounded-full animate-pulse-slow"></div>
                </div>
                <div class="grid sm:grid-cols-2 gap-4">
                  <div v-for="item in tab.timeline" :key="item.title" class="backdrop-blur-xl bg-white/5 border border-white/5 rounded-2xl p-4 hover:bg-white/10 transition-all duration-300">
                    <h4 class="font-semibold text-white mb-2 flex items-start gap-2">
                      <Icon icon="ph:check-circle" class="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span>{{ item.title }}</span>
                    </h4>
                    <p class="text-gray-400 text-sm leading-relaxed">{{ item.description }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Education Section -->
      <section class="py-32 max-w-7xl mx-auto">
        <div class="mb-20">
          <h2 class="text-4xl sm:text-5xl md:text-6xl font-bold text-center mb-4">
            <span class="bg-gradient-to-r from-violet-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              Education
            </span>
          </h2>
          <p class="text-center text-gray-400 text-lg">Academic background</p>
        </div>

        <div class="grid md:grid-cols-2 gap-6">
          <!-- Bachelor's Degree -->
          <div class="group">
            <div class="relative h-full">
              <div class="absolute -inset-0.5 bg-gradient-to-r from-violet-500 to-cyan-500 rounded-3xl blur opacity-20 group-hover:opacity-40 transition-all duration-500"></div>
              <div class="relative h-full backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all duration-500 flex flex-col justify-between">
                <div>
                  <div class="flex items-center gap-3 mb-4">
                    <div class="p-3 bg-gradient-to-br from-violet-500/20 to-cyan-500/20 rounded-xl">
                      <Icon icon="ph:graduation-cap" class="w-6 h-6 text-violet-400" />
                    </div>
                    <span class="px-4 py-1.5 bg-violet-500/10 border border-violet-500/20 rounded-full text-violet-400 text-sm font-bold">2020</span>
                  </div>
                  <h4 class="text-xl sm:text-2xl font-bold text-white mb-3">Bachelor of Science in Computer Information System</h4>
                  <p class="text-gray-400 flex items-center gap-2">
                    <Icon icon="ph:building" class="w-5 h-5" />
                    Babcock University, Nigeria
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Master's Degree -->
          <div class="group">
            <div class="relative h-full">
              <div class="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-3xl blur opacity-20 group-hover:opacity-40 transition-all duration-500"></div>
              <div class="relative h-full backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all duration-500 flex flex-col justify-between">
                <div>
                  <div class="flex items-center gap-3 mb-4">
                    <div class="p-3 bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 rounded-xl">
                      <Icon icon="ph:shield-check" class="w-6 h-6 text-cyan-400" />
                    </div>
                    <span class="px-4 py-1.5 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400 text-sm font-bold">2025</span>
                  </div>
                  <h4 class="text-xl sm:text-2xl font-bold text-white mb-3">Master of Science in Cybersecurity</h4>
                  <p class="text-gray-400 flex items-center gap-2">
                    <Icon icon="ph:building" class="w-5 h-5" />
                    University of Derby, England
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Projects Section -->
      <section id="projects" class="py-32 max-w-7xl mx-auto">
        <div class="mb-20">
          <h2 class="text-4xl sm:text-5xl md:text-6xl font-bold text-center mb-4">
            <span class="bg-gradient-to-r from-violet-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
          <p class="text-center text-gray-400 text-lg">Showcasing my work and contributions</p>
        </div>

        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <!-- Project Card 1 -->
          <div class="group">
            <div class="relative h-full">
              <div class="absolute -inset-0.5 bg-gradient-to-r from-violet-500 to-purple-500 rounded-3xl blur opacity-20 group-hover:opacity-40 transition-all duration-500"></div>
              <div class="relative h-full backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6 hover:bg-white/10 transition-all duration-500 flex flex-col">
                <div class="flex items-center gap-3 mb-4">
                  <div class="p-3 bg-gradient-to-br from-violet-500/20 to-purple-500/20 rounded-xl">
                    <Icon icon="ph:shield-chevron" class="w-6 h-6 text-violet-400" />
                  </div>
                  <h3 class="text-xl font-bold text-white">Password Entropy Calculator</h3>
                </div>
                <p class="text-gray-400 text-sm leading-relaxed mb-6 flex-grow">Advanced password entropy calculator with modern web technologies for seamless user experience.</p>
                <a href="https://password-entropy-six.vercel.app/" target="_blank" class="group/btn flex items-center justify-center gap-2 w-full py-3 px-4 bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600 text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105">
                  View Project
                  <Icon icon="ph:arrow-up-right" class="w-5 h-5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </div>
          </div>

          <!-- Project Card 2 -->
          <div class="group">
            <div class="relative h-full">
              <div class="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-3xl blur opacity-20 group-hover:opacity-40 transition-all duration-500"></div>
              <div class="relative h-full backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6 hover:bg-white/10 transition-all duration-500 flex flex-col">
                <div class="flex items-center gap-3 mb-4">
                  <div class="p-3 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-xl">
                    <Icon icon="ph:receipt" class="w-6 h-6 text-cyan-400" />
                  </div>
                  <h3 class="text-xl font-bold text-white">StorV [Version 2]</h3>
                </div>
                <p class="text-gray-400 text-sm leading-relaxed mb-6 flex-grow">Advanced receipt management system with digital tracking, inventory management, and automated swap functionality. Built with modern web technologies for seamless user experience and real-time data synchronization.</p>
                <a href="https://storv-frontend.vercel.app/" target="_blank" class="group/btn flex items-center justify-center gap-2 w-full py-3 px-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105">
                  View Project
                  <Icon icon="ph:arrow-up-right" class="w-5 h-5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </div>
          </div>

          <!-- Project Card 3 -->
          <div class="group">
            <div class="relative h-full">
              <div class="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-green-500 rounded-3xl blur opacity-20 group-hover:opacity-40 transition-all duration-500"></div>
              <div class="relative h-full backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6 hover:bg-white/10 transition-all duration-500 flex flex-col">
                <div class="flex items-center gap-3 mb-4">
                  <div class="p-3 bg-gradient-to-br from-emerald-500/20 to-green-500/20 rounded-xl">
                    <Icon icon="ph:receipt" class="w-6 h-6 text-emerald-400" />
                  </div>
                  <h3 class="text-xl font-bold text-white">StorV [Version 1]</h3>
                </div>
                <p class="text-gray-400 text-sm leading-relaxed mb-6 flex-grow">Initial version of the receipt management application that digitized manual paperwork processes. Features include digital receipt storage, inventory tracking, and basic swap functionality for small businesses.</p>
                <a href="https://swiftsort.vercel.app" target="_blank" class="group/btn flex items-center justify-center gap-2 w-full py-3 px-4 bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105">
                  View Project
                  <Icon icon="ph:arrow-up-right" class="w-5 h-5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </div>
          </div>

          <!-- Project Card 4 -->
          <div class="group">
            <div class="relative h-full">
              <div class="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-amber-500 rounded-3xl blur opacity-20 group-hover:opacity-40 transition-all duration-500"></div>
              <div class="relative h-full backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6 hover:bg-white/10 transition-all duration-500 flex flex-col">
                <div class="flex items-center gap-3 mb-4">
                  <div class="p-3 bg-gradient-to-br from-orange-500/20 to-amber-500/20 rounded-xl">
                    <Icon icon="ph:building-office" class="w-6 h-6 text-orange-400" />
                  </div>
                  <h3 class="text-xl font-bold text-white">KUO Company Website</h3>
                </div>
                <p class="text-gray-400 text-sm leading-relaxed mb-6 flex-grow">Original corporate website for KUO Smart Solutions built with clean, professional design. Showcases company services, team expertise, and client testimonials with optimized performance and SEO.</p>
                <a href="https://www.kuosmartsolution.com/" target="_blank" class="group/btn flex items-center justify-center gap-2 w-full py-3 px-4 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105">
                  View Project
                  <Icon icon="ph:arrow-up-right" class="w-5 h-5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </div>
          </div>

          <!-- Project Card 5 -->
          <div class="group">
            <div class="relative h-full">
              <div class="absolute -inset-0.5 bg-gradient-to-r from-pink-500 to-rose-500 rounded-3xl blur opacity-20 group-hover:opacity-40 transition-all duration-500"></div>
              <div class="relative h-full backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6 hover:bg-white/10 transition-all duration-500 flex flex-col">
                <div class="flex items-center gap-3 mb-4">
                  <div class="p-3 bg-gradient-to-br from-pink-500/20 to-rose-500/20 rounded-xl">
                    <Icon icon="ph:building-office" class="w-6 h-6 text-pink-400" />
                  </div>
                  <h3 class="text-xl font-bold text-white">Visioni and Strauss</h3>
                </div>
                <p class="text-gray-400 text-sm leading-relaxed mb-6 flex-grow">Original corporate website for visioniandstrauss built with clean, professional design. Showcases company services, team expertise, and client testimonials with optimized performance and SEO.</p>
                <a href="https://www.visioniandstrauss.com/" target="_blank" class="group/btn flex items-center justify-center gap-2 w-full py-3 px-4 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105">
                  View Project
                  <Icon icon="ph:arrow-up-right" class="w-5 h-5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </div>
          </div>

          <!-- Project Card 6 -->
          <div class="group">
            <div class="relative h-full">
              <div class="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-3xl blur opacity-20 group-hover:opacity-40 transition-all duration-500"></div>
              <div class="relative h-full backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6 hover:bg-white/10 transition-all duration-500 flex flex-col">
                <div class="flex items-center gap-3 mb-4">
                  <div class="p-3 bg-gradient-to-br from-indigo-500/20 to-blue-500/20 rounded-xl">
                    <Icon icon="ph:lightning" class="w-6 h-6 text-indigo-400" />
                  </div>
                  <h3 class="text-xl font-bold text-white">T30 Energies</h3>
                </div>
                <p class="text-gray-400 text-sm leading-relaxed mb-6 flex-grow">Comprehensive energy company website featuring dynamic content management, interactive service portfolios, and client engagement tools. Built with modern web standards and mobile-first responsive design.</p>
                <a href="https://www.t30energies.com/" target="_blank" class="group/btn flex items-center justify-center gap-2 w-full py-3 px-4 bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105">
                  View Project
                  <Icon icon="ph:arrow-up-right" class="w-5 h-5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Contact Section -->
      <section id="contact" class="py-32 max-w-5xl mx-auto">
        <div class="mb-20">
          <h2 class="text-4xl sm:text-5xl md:text-6xl font-bold text-center mb-4">
            <span class="bg-gradient-to-r from-violet-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              Get in Touch
            </span>
          </h2>
          <p class="text-center text-gray-400 text-lg max-w-3xl mx-auto px-4">
            I'm always open to new opportunities and collaborations, especially in roles that combine 
            frontend development with cybersecurity expertise. Let's connect!
          </p>
        </div>

        <div class="relative">
          <div class="absolute -inset-0.5 bg-gradient-to-r from-violet-500 via-cyan-500 to-emerald-500 rounded-3xl blur opacity-20"></div>
          <div class="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 sm:p-12">
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <!-- LinkedIn -->
              <a
                href="https://www.linkedin.com/in/chigozie-agu-85019b209"
                target="_blank"
                rel="noopener noreferrer"
                class="group relative"
              >
                <div class="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl blur opacity-0 group-hover:opacity-60 transition-all duration-500"></div>
                <div class="relative flex flex-col items-center gap-4 p-6 backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all duration-500 transform hover:scale-105">
                  <div class="p-4 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-xl">
                    <Icon icon="mdi:linkedin" class="w-10 h-10 text-blue-400" />
                  </div>
                  <span class="text-sm font-semibold text-white">LinkedIn</span>
                </div>
              </a>

              <!-- GitHub -->
              <a
                href="https://github.com/GozzAgu"
                target="_blank"
                rel="noopener noreferrer"
                class="group relative"
              >
                <div class="absolute -inset-0.5 bg-gradient-to-r from-gray-500 to-gray-600 rounded-2xl blur opacity-0 group-hover:opacity-60 transition-all duration-500"></div>
                <div class="relative flex flex-col items-center gap-4 p-6 backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all duration-500 transform hover:scale-105">
                  <div class="p-4 bg-gradient-to-br from-gray-500/20 to-gray-600/20 rounded-xl">
                    <Icon icon="mdi:github" class="w-10 h-10 text-gray-300" />
                  </div>
                  <span class="text-sm font-semibold text-white">GitHub</span>
                </div>
              </a>

              <!-- Email -->
              <a
                href="mailto:gozieagu1@gmail.com"
                class="group relative"
              >
                <div class="absolute -inset-0.5 bg-gradient-to-r from-red-500 to-rose-600 rounded-2xl blur opacity-0 group-hover:opacity-60 transition-all duration-500"></div>
                <div class="relative flex flex-col items-center gap-4 p-6 backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all duration-500 transform hover:scale-105">
                  <div class="p-4 bg-gradient-to-br from-red-500/20 to-rose-600/20 rounded-xl">
                    <Icon icon="mdi:email" class="w-10 h-10 text-red-400" />
                  </div>
                  <span class="text-sm font-semibold text-white">Email</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>

    <!-- Modern footer -->
    <footer class="w-full py-12 text-center backdrop-blur-xl bg-white/5 border-t border-white/10 relative z-10">
      <div class="max-w-7xl mx-auto px-4">
        <div class="flex flex-col items-center gap-4">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 bg-gradient-to-br from-violet-500 via-cyan-500 to-emerald-500 rounded-lg flex items-center justify-center font-bold text-white text-sm">
              G
            </div>
            <span class="text-gray-400 font-medium">Chigozie Franklin Agu</span>
          </div>
          <p class="text-gray-500 text-sm">
            Built with <span class="text-red-400">❤️</span> using <span class="text-emerald-400 font-semibold">Nuxt.js</span> & <span class="text-cyan-400 font-semibold">Tailwind CSS</span>
          </p>
          <p class="text-gray-600 text-xs">
            © {{ new Date().getFullYear() }} All rights reserved
          </p>
        </div>
      </div>
    </footer>

    <!-- Scroll to Top Button -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 scale-75 translate-y-4"
      enter-to-class="opacity-100 scale-100 translate-y-0"
      leave-active-class="transition-all duration-300 ease-in"
      leave-from-class="opacity-100 scale-100 translate-y-0"
      leave-to-class="opacity-0 scale-75 translate-y-4"
    >
      <button
        v-show="showScrollToTop"
        @click="scrollToTop"
        class="fixed bottom-8 right-8 z-50 group"
        aria-label="Scroll to top"
      >
        <div class="absolute inset-0 bg-gradient-to-r from-violet-500 via-cyan-500 to-emerald-500 rounded-2xl blur opacity-60 group-hover:opacity-80 transition-all duration-300"></div>
        <div class="relative p-4 bg-gradient-to-r from-violet-500 via-cyan-500 to-emerald-500 rounded-2xl text-white shadow-2xl transition-all duration-300 transform group-hover:scale-110 group-hover:-translate-y-1">
          <Icon icon="ph:arrow-up" class="w-6 h-6" />
        </div>
      </button>
    </Transition>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from "vue";
import { Icon } from "@iconify/vue";

const isDarkMode = ref(false);
const aboutSection = ref(null);
const aboutDescription = ref(null);
const aboutTyping = ref(false);
const aboutText = ref("");
const aboutParagraphs = ref([]);
const showScrollToTop = ref(false);

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value;
  document.documentElement.classList.toggle("dark", isDarkMode.value);
};

const scrollToTop = () => {
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

const typeWriter = async (text, speed = 50) => {
  aboutTyping.value = true;
  aboutText.value = "";
  
  for (let i = 0; i < text.length; i++) {
    aboutText.value += text.charAt(i);
    await new Promise(resolve => setTimeout(resolve, speed));
  }
  
  aboutTyping.value = false;
};

const typeWriterParagraphs = async () => {
  const paragraphs = [
    "Hi, I'm <span class='font-semibold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent'>Chigozie Franklin Agu</span>, a passionate software engineer with over 4+ years of experience building dynamic web applications and software solutions using modern technologies like <span class='text-blue-500 font-semibold'>Vue.js</span> and <span class='text-blue-500 font-semibold'>TypeScript</span>. Currently pursuing my Master's in Cybersecurity, I combine software development expertise with security best practices to create secure, scalable, and performant applications.",
    
    "I started my career as a self-taught developer, diving into the world of HTML, CSS, and JavaScript. After mastering the fundamentals, I expanded my skills to include <span class='text-blue-500 font-semibold'>full-stack development</span>, focusing on building end-to-end solutions that solve real-world problems.",
    
    "My journey into cybersecurity began with my Master's program, where I'm learning advanced security concepts, threat analysis, and secure coding practices. This unique combination allows me to build applications that are not only functional and user-friendly but also secure by design and optimized for performance.",
    
    "I love solving complex problems, collaborating with teams, and learning new technologies to enhance my development workflow. When I'm not coding, I enjoy contributing to open-source projects, engaging with developer communities, and staying updated with the latest software engineering and cybersecurity trends."
  ];

  aboutTyping.value = true;
  aboutParagraphs.value = paragraphs.map(() => ({ text: "", visible: false }));

  for (let pIndex = 0; pIndex < paragraphs.length; pIndex++) {
    const paragraph = paragraphs[pIndex];
    aboutParagraphs.value[pIndex].text = "";
    aboutParagraphs.value[pIndex].visible = true;

    for (let i = 0; i < paragraph.length; i++) {
      aboutParagraphs.value[pIndex].text += paragraph.charAt(i);
      await new Promise(resolve => setTimeout(resolve, 25));
    }

    // Pause between paragraphs
    if (pIndex < paragraphs.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 800));
    }
  }

  aboutTyping.value = false;
};

const handleScroll = async () => {
  // Show/hide scroll to top button
  showScrollToTop.value = window.scrollY > 300;

  // About section typewriter (disabled on mobile)
  if (aboutSection.value && window.innerWidth > 768) {
    const aboutRect = aboutSection.value.getBoundingClientRect();
    const aboutVisible = aboutRect.top < window.innerHeight && aboutRect.bottom > 0;
    
    if (aboutVisible && !aboutTyping.value && aboutParagraphs.value.length === 0) {
      typeWriterParagraphs();
    }
  }
};

const experienceTabs = [
  {
    label: "Software Engineer - Famous Parking (Remote, USA)",
    date: "2022 - 2024",
    completed: true,
    timeline: [
      {
        title: "Technical Communication & Stakeholder Management",
        description: "Translated complex technical issues into understandable terms for non-technical stakeholders, ensuring project alignment with user expectations and business requirements.",
      },
      {
        title: "Frontend Development & UI Implementation",
        description: "Developed and maintained frontend applications for parking management system using modern web technologies and responsive design principles.",
      },
      {
        title: "Cross-functional Collaboration",
        description: "Collaborated with product managers, designers, and backend developers to deliver high-quality user experiences and seamless integration.",
      },
    ],
  },
  {
    label: "Software Engineer - Cyphercrescent (Nigeria)",
    date: "2020 - 2024",
    completed: true,
    timeline: [
      {
        title: "Lead Software Development",
        description: "Led frontend development initiatives, conducted code reviews, and mentored junior developers while ensuring project delivery success.",
      },
      {
        title: "Nigeria Gas Summit Website Development",
        description: "Designed (Figma) and developed (Nuxt.js) a comprehensive one-page event website with interactive features and responsive design.",
      },
      {
        title: "Technology Stack Implementation",
        description: "Implemented modern software technologies including Vue.js, Nuxt.js, TypeScript, and CSS3 to build scalable web applications.",
      },
      {
        title: "Client Project Delivery",
        description: "Successfully delivered multiple client projects on time and within budget, maintaining high code quality and user experience standards.",
      },
      {
        title: "Code Review & Quality Assurance",
        description: "Established coding standards and conducted thorough code reviews to ensure maintainable and efficient codebase.",
      },
      {
        title: "Team Collaboration & Mentoring",
        description: "Collaborated with cross-functional teams to achieve project objectives and technical excellence.",
      },
    ],
  },
];

onMounted(() => {
  isDarkMode.value = window.matchMedia("(prefers-color-scheme: dark)").matches;
  if (isDarkMode.value) document.documentElement.classList.add("dark");
  
  // Add scroll listener for typewriter effect
  window.addEventListener('scroll', handleScroll);
  
  // Add resize listener to handle screen size changes
  window.addEventListener('resize', handleScroll);
  
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
    transform: translateY(30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes blob {
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  25% {
    transform: translate(20px, -50px) scale(1.1);
  }
  50% {
    transform: translate(-20px, 20px) scale(0.9);
  }
  75% {
    transform: translate(50px, 50px) scale(1.05);
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

@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

.animate-fade-in-up {
  animation: fadeInUp 1s ease-out;
}

.animate-blob {
  animation: blob 20s ease-in-out infinite;
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
  animation: gradient-xy 3s ease infinite;
}

.animate-pulse-slow {
  animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.typewriter-cursor {
  animation: blink 1s infinite;
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

/* Add specific transitions where needed */
button, a, .group {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>