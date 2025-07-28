<template>
  <div class="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-slate-900 dark:to-gray-900 text-gray-900 dark:text-gray-100 relative overflow-hidden">
    <!-- Animated background elements -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-green-400/20 to-blue-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>
    </div>

    <!-- Modern glassmorphism header -->
    <header class="w-full fixed top-0 z-50 backdrop-blur-xl bg-white/10 dark:bg-gray-900/10 border-b border-white/20 dark:border-gray-700/20 shadow-sm">
      <nav class="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div class="flex items-center space-x-3 group">
          <div class="relative">
            <div class="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-500"></div>
            <h1 class="relative text-3xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">Goz</h1>
          </div>
        </div>

        <div class="flex space-x-1 md:space-x-8 text-sm">
          <a href="#about" class="nav-link group relative">
            <span class="relative z-10">About</span>
            <div class="absolute inset-0 bg-gradient-to-r from-green-400/20 to-blue-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-0 group-hover:scale-100"></div>
          </a>
          <a href="#projects" class="nav-link group relative">
            <span class="relative z-10">Projects</span>
            <div class="absolute inset-0 bg-gradient-to-r from-green-400/20 to-blue-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-0 group-hover:scale-100"></div>
          </a>
          <a href="#contact" class="nav-link group relative">
            <span class="relative z-10">Contact</span>
            <div class="absolute inset-0 bg-gradient-to-r from-green-400/20 to-blue-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-0 group-hover:scale-100"></div>
          </a>
        </div>

        <button @click="toggleDarkMode" class="p-3 rounded-xl backdrop-blur-md bg-white/20 dark:bg-gray-800/20 border border-white/30 dark:border-gray-700/30 transition-all duration-300 hover:scale-110 hover:bg-white/30 dark:hover:bg-gray-800/30 shadow-sm hover:shadow-md">
          <Icon v-if="!isDarkMode" icon="ph:sun-duotone" class="w-6 h-6 text-yellow-500" />
          <Icon v-else icon="ph:moon-duotone" class="w-6 h-6 text-blue-300" />
        </button>
      </nav>
    </header>

    <main class="flex-grow max-w-7xl mx-auto px-6 py-12 relative z-10">
      <!-- Hero Section -->
      <section class="min-h-screen flex items-center justify-center py-20">
        <div class="text-center space-y-8 animate-fade-in-up">
          <div class="relative">
            <div class="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500 rounded-full blur-2xl opacity-30 animate-pulse"></div>
                         <div class="relative w-32 h-32 mx-auto bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
              <span class="text-4xl font-bold text-white">G</span>
            </div>
          </div>
          <h1 class="text-5xl md:text-7xl font-bold bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-gradient">
            Chigozie Franklin Agu
          </h1>
          <p class="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Frontend Developer crafting beautiful, responsive, and performant web experiences
          </p>
          <div class="flex justify-center space-x-4">
            <UButton 
              href="#about" 
              color="white" 
              variant="solid" 
                             class="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-semibold px-8 py-3 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-105"
            >
              Explore My Work
            </UButton>
            <UButton 
              href="#contact" 
              color="gray" 
              variant="outline" 
                             class="border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold px-8 py-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 shadow-sm hover:shadow-md"
            >
              Get In Touch
            </UButton>
          </div>
        </div>
      </section>

      <!-- About Section -->
      <section id="about" class="py-20">
        <div class="max-w-6xl mx-auto">
          <div class="text-center mb-16">
            <h2 class="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent mb-6">About Me</h2>
            <div class="w-24 h-1 bg-gradient-to-r from-green-400 to-blue-500 mx-auto rounded-full"></div>
          </div>
          
          <div class="grid md:grid-cols-2 gap-12 items-center">
            <div class="space-y-6 text-lg leading-relaxed">
              <p class="text-gray-700 dark:text-gray-300">
                Hi, I'm 
                <span class="font-semibold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">Chigozie Franklin Agu</span>, 
                a passionate frontend developer with over 4+ years of experience building dynamic 
                web applications using modern JavaScript frameworks like 
                <span class="text-blue-500 font-semibold">Vue.js</span>. 
                My expertise lies in creating user-friendly, responsive, and performant applications.
              </p>
              
              <p class="text-gray-700 dark:text-gray-300">
                I started my career as a self-taught developer, diving into the world of HTML, CSS, 
                and JavaScript. After mastering the fundamentals, I focused on learning 
                <span class="text-blue-500 font-semibold">Vue.js</span>, which I found to be a powerful tool for 
                building reactive and scalable applications.
              </p>

              <p class="text-gray-700 dark:text-gray-300">
                I love solving complex problems, collaborating with teams, and learning new 
                technologies to enhance my development workflow. When I'm not coding, I enjoy 
                contributing to open-source projects and engaging with developer communities.
              </p>
            </div>
            
            <div class="relative">
              <div class="absolute inset-0 bg-gradient-to-r from-green-400/20 to-blue-500/20 rounded-3xl blur-xl"></div>
                             <div class="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-8 border border-white/20 dark:border-gray-700/20 shadow-md">
                <h3 class="text-2xl font-bold mb-6 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">Technical Skills</h3>
                <div class="flex flex-wrap gap-3">
                                     <UBadge color="yellow" class="px-4 py-2 rounded-full font-semibold shadow-sm">JavaScript</UBadge>
                   <UBadge color="blue" class="px-4 py-2 rounded-full font-semibold shadow-sm">TypeScript</UBadge>
                   <UBadge color="green" class="px-4 py-2 rounded-full font-semibold shadow-sm">Vue.js</UBadge>
                   <UBadge color="cyan" class="px-4 py-2 rounded-full font-semibold shadow-sm">Nuxt.js</UBadge>
                   <UBadge color="orange" class="px-4 py-2 rounded-full font-semibold shadow-sm">Figma</UBadge>
                   <UBadge color="indigo" class="px-4 py-2 rounded-full font-semibold shadow-sm">Git</UBadge>
                   <UBadge color="pink" class="px-4 py-2 rounded-full font-semibold shadow-sm">CSS3</UBadge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Experience Section -->
      <section class="py-20">
        <div class="max-w-6xl mx-auto">
          <div class="text-center mb-16">
            <h2 class="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent mb-6">Experience</h2>
            <div class="w-24 h-1 bg-gradient-to-r from-green-400 to-blue-500 mx-auto rounded-full"></div>
          </div>
          
          <div class="space-y-8">
            <div v-for="(tab, index) in experienceTabs" :key="tab.label" class="group">
              <div class="relative">
                <div class="absolute inset-0 bg-gradient-to-r from-green-400/10 to-blue-500/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                                 <UCard class="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/20 dark:border-gray-700/20 shadow-md hover:shadow-lg transition-all duration-500 transform hover:scale-[1.02]">
                  <template #header>
                    <div class="flex justify-between items-start">
                      <div>
                        <h3 class="text-xl font-bold text-gray-900 dark:text-gray-100">{{ tab.label }}</h3>
                        <p class="text-green-500 dark:text-green-400 font-semibold">{{ tab.date }}</p>
                      </div>
                      <div class="w-3 h-3 bg-gradient-to-r from-green-400 to-blue-500 rounded-full"></div>
                    </div>
                  </template>
                  <div class="space-y-4">
                    <div v-for="item in tab.timeline" :key="item.title" class="p-4 bg-gray-50/50 dark:bg-gray-700/50 rounded-xl">
                      <h4 class="font-semibold text-gray-900 dark:text-gray-100 mb-2">{{ item.title }}</h4>
                      <p class="text-gray-600 dark:text-gray-300">{{ item.description }}</p>
                    </div>
                  </div>
                </UCard>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Education Section -->
      <section class="py-20">
        <div class="max-w-6xl mx-auto">
          <div class="text-center mb-16">
            <h2 class="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent mb-6">Education</h2>
            <div class="w-24 h-1 bg-gradient-to-r from-green-400 to-blue-500 mx-auto rounded-full"></div>
          </div>

          <div class="grid md:grid-cols-2 gap-8">
            <div class="group">
              <div class="relative">
                <div class="absolute inset-0 bg-gradient-to-r from-green-400/20 to-blue-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                <UCard class="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/20 dark:border-gray-700/20 shadow-md hover:shadow-lg transition-all duration-500 transform hover:scale-[1.02] p-6">
                  <div class="flex justify-between items-center">
                    <div>
                      <h4 class="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">Bachelor of Science in Computer Information System</h4>
                      <p class="text-gray-600 dark:text-gray-300">Babcock University, Nigeria</p>
                    </div>
                    <UBadge color="green" variant="solid" class="px-4 py-2 rounded-full font-semibold">2017 - 2020</UBadge>
                  </div>
                </UCard>
              </div>
            </div>
            
            <div class="group">
              <div class="relative">
                <div class="absolute inset-0 bg-gradient-to-r from-green-400/20 to-blue-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                <UCard class="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/20 dark:border-gray-700/20 shadow-md hover:shadow-lg transition-all duration-500 transform hover:scale-[1.02] p-6">
                  <div class="flex justify-between items-center">
                    <div>
                      <h4 class="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">Master of Science in Cybersecurity</h4>
                      <p class="text-gray-600 dark:text-gray-300">University of Derby, England</p>
                    </div>
                    <UBadge color="green" variant="solid" class="px-4 py-2 rounded-full font-semibold">2024 - Date</UBadge>
                  </div>
                </UCard>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Projects Section -->
      <section id="projects" class="py-20">
        <div class="max-w-6xl mx-auto">
          <div class="text-center mb-16">
            <h2 class="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent mb-6">Projects</h2>
            <div class="w-24 h-1 bg-gradient-to-r from-green-400 to-blue-500 mx-auto rounded-full"></div>
          </div>
          
          <div class="grid md:grid-cols-3 gap-8">
            <div class="group">
              <div class="relative">
                <div class="absolute inset-0 bg-gradient-to-r from-green-400/20 to-blue-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                <UCard class="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/20 dark:border-gray-700/20 shadow-md hover:shadow-lg transition-all duration-500 transform hover:scale-[1.02] h-full">
                  <template #header>
                    <h3 class="text-xl font-bold text-gray-900 dark:text-gray-100">Storeventory</h3>
                  </template>
                  <p class="text-gray-600 dark:text-gray-300 mb-6">A receipt management app replacing manual paperwork with digital tracking, swaps and also inventory updates.</p>
                  <UButton to="https://swiftsort.vercel.app" target="_blank" color="white" variant="solid" class="w-full bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-semibold py-3 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                    View Project
                  </UButton>
                </UCard>
              </div>
            </div>
            
            <div class="group">
              <div class="relative">
                <div class="absolute inset-0 bg-gradient-to-r from-green-400/20 to-blue-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                <UCard class="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/20 dark:border-gray-700/20 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-[1.02] h-full">
                  <template #header>
                    <h3 class="text-xl font-bold text-gray-900 dark:text-gray-100">KUO Website</h3>
                  </template>
                  <p class="text-gray-600 dark:text-gray-300 mb-6">Professional website for KUO Smart Solutions showcasing their services and expertise.</p>
                  <UButton to="https://www.kuosmartsolution.com/" target="_blank" color="white" variant="solid" class="w-full bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                    View Project
                  </UButton>
                </UCard>
              </div>
            </div>
            
            <div class="group">
              <div class="relative">
                <div class="absolute inset-0 bg-gradient-to-r from-green-400/20 to-blue-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                <UCard class="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/20 dark:border-gray-700/20 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-[1.02] h-full">
                  <template #header>
                    <h3 class="text-xl font-bold text-gray-900 dark:text-gray-100">T30 Energies Website</h3>
                  </template>
                  <p class="text-gray-600 dark:text-gray-300 mb-6">Modern energy company website with dynamic content and interactive features.</p>
                  <UButton to="https://www.t30energies.com/" target="_blank" color="white" variant="solid" class="w-full bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                    View Project
                  </UButton>
                </UCard>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Contact Section -->
      <section id="contact" class="py-20">
        <div class="max-w-4xl mx-auto">
          <div class="text-center mb-16">
            <h2 class="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent mb-6">Get in Touch</h2>
            <div class="w-24 h-1 bg-gradient-to-r from-green-400 to-blue-500 mx-auto rounded-full mb-8"></div>
            <p class="text-xl text-gray-600 dark:text-gray-300">
              I'm always open to new opportunities and collaborations. Let's connect!
            </p>
          </div>

          <div class="relative">
            <div class="absolute inset-0 bg-gradient-to-r from-green-400/20 to-blue-500/20 rounded-3xl blur-xl"></div>
            <div class="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-12 border border-white/20 dark:border-gray-700/20 shadow-2xl">
              <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
                <a
                  href="https://www.linkedin.com/in/chigozie-agu-85019b209"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="group flex flex-col items-center space-y-3 p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 hover:from-blue-100 hover:to-blue-200 dark:hover:from-blue-800/30 dark:hover:to-blue-700/30 transition-all duration-500 transform hover:scale-110 shadow-lg hover:shadow-xl"
                >
                  <Icon icon="mdi:linkedin" class="w-12 h-12 text-blue-600 group-hover:text-blue-700 transition-colors duration-300" />
                  <span class="text-sm font-semibold text-gray-700 dark:text-gray-300">LinkedIn</span>
                </a>

                <a
                  href="https://github.com/GozzAgu"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="group flex flex-col items-center space-y-3 p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900/20 dark:to-gray-800/20 hover:from-gray-100 hover:to-gray-200 dark:hover:from-gray-800/30 dark:hover:to-gray-700/30 transition-all duration-500 transform hover:scale-110 shadow-lg hover:shadow-xl"
                >
                  <Icon icon="mdi:github" class="w-12 h-12 text-gray-800 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-300" />
                  <span class="text-sm font-semibold text-gray-700 dark:text-gray-300">GitHub</span>
                </a>

                <a
                  href="https://x.com/_gozz___"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="group flex flex-col items-center space-y-3 p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 hover:from-blue-100 hover:to-blue-200 dark:hover:from-blue-800/30 dark:hover:to-blue-700/30 transition-all duration-500 transform hover:scale-110 shadow-lg hover:shadow-xl"
                >
                  <Icon icon="line-md:twitter-x-alt" class="w-12 h-12 text-blue-400 group-hover:text-blue-500 transition-colors duration-300" />
                  <span class="text-sm font-semibold text-gray-700 dark:text-gray-300">Twitter</span>
                </a>

                <a
                  href="mailto:gozieagu1@gmail.com"
                  class="group flex flex-col items-center space-y-3 p-6 rounded-2xl bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 hover:from-red-100 hover:to-red-200 dark:hover:from-red-800/30 dark:hover:to-red-700/30 transition-all duration-500 transform hover:scale-110 shadow-lg hover:shadow-xl"
                >
                  <Icon icon="mdi:email" class="w-12 h-12 text-red-600 group-hover:text-red-700 transition-colors duration-300" />
                  <span class="text-sm font-semibold text-gray-700 dark:text-gray-300">Email</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <!-- Modern footer -->
    <footer class="w-full py-8 text-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-t border-white/20 dark:border-gray-700/20 relative z-10">
      <div class="max-w-6xl mx-auto">
        <p class="text-gray-600 dark:text-gray-300 font-medium">
          🚀 Built with ❤️ by Goz using Nuxt.js | © {{ new Date().getFullYear() }}
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { Icon } from "@iconify/vue";

const isDarkMode = ref(false);

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value;
  document.documentElement.classList.toggle("dark", isDarkMode.value);
};

const experienceTabs = [
  {
    label: "Frontend Engineer - Famous Parking (Contract)",
    date: "2024",
    completed: false,
    timeline: [
      {
        title: "Designed & Developed Famous Parking Resources",
        description: "Led UI design and frontend development.",
      },
    ],
  },
  {
    label: "Frontend Engineer - Cyphercrescent",
    date: "2022 - 2024",
    completed: true,
    timeline: [
      {
        title: "Lead Frontend Engineer for Reineur",
        description: "Led frontend development, code reviews, and project success.",
      },
      {
        title: "Developed Nigeria Gas Summit Website",
        description: "Designed (Figma) and developed (Nuxt.js) a one-page event site.",
      },
    ],
  },
  {
    label: "IT Support - Petronella",
    date: "2021 - 2022",
    completed: false,
    timeline: [
      {
        title: "Maintained Network Infrastructure",
        description: "Managed backups, switch configurations, and security updates.",
      },
    ],
  },
];

onMounted(() => {
  isDarkMode.value = window.matchMedia("(prefers-color-scheme: dark)").matches;
  if (isDarkMode.value) document.documentElement.classList.add("dark");
});
</script>

<style scoped>
.nav-link {
  @apply text-gray-700 dark:text-gray-300 hover:text-green-500 dark:hover:text-green-400 transition-all duration-300 font-medium px-3 py-2 rounded-lg;
}

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

@keyframes gradient {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

.animate-fade-in-up {
  animation: fadeInUp 1s ease-out;
}

.animate-gradient {
  background-size: 200% 200%;
  animation: gradient 3s ease infinite;
}

html {
  scroll-behavior: smooth;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(to bottom, #10b981, #3b82f6);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(to bottom, #059669, #2563eb);
}

/* Smooth transitions for all elements */
* {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Enhanced hover effects */
.group:hover .group-hover\:scale-\[1\.02\] {
  transform: scale(1.02);
}

.group:hover .group-hover\:blur-2xl {
  filter: blur(1rem);
}

/* Glassmorphism effect */
.backdrop-blur-xl {
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
}

/* Enhanced shadows */
.shadow-3xl {
  box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
}
</style>