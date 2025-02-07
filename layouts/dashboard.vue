<template>
  <div class="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
    <header class="w-full fixed top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-gray-900/80 shadow-md">
      <nav class="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <div class="flex items-center space-x-2">
          <h1 class="text-2xl font-bold text-green-400 dark:text-green-400">Goz</h1>
        </div>

        <div class="flex space-x-2 md:space-x-6 text-xs md:text-sm">
          <a href="#about" class="nav-link">About</a>
          <a href="#projects" class="nav-link">Projects</a>
          <a href="#contact" class="nav-link">Contact</a>
        </div>

        <button @click="toggleDarkMode" class="p-2 rounded-lg transition transform hover:scale-110">
          <Icon v-if="!isDarkMode" icon="ph:sun-duotone" class="w-6 h-6 text-yellow-500" />
          <Icon v-else icon="ph:moon-duotone" class="w-6 h-6 text-gray-300" />
        </button>
      </nav>
    </header>

    <main class="flex-grow max-w-6xl mx-auto px-6 py-12">
      <section id="about" class="py-12">
        <h2 class="text-lg md:text-3xl font-bold text-center mb-8">About Me</h2>
        <div class="max-w-4xl mx-auto text-xs md:text-sm">
          <p class="mb-6">
            Hi, I'm 
            <span class="font-semibold text-green-400">Chigozie Franklin Agu</span>, 
            a passionate frontend developer with over 4+ years of experience building dynamic 
            web applications using modern JavaScript frameworks like 
            <span class="text-blue-500">Vue.js</span>. 
            My expertise lies in creating user-friendly, responsive, and performant applications.
          </p>
          
          <p class="mb-6">
            I started my career as a self-taught developer, diving into the world of HTML, CSS, 
            and JavaScript. After mastering the fundamentals, I focused on learning 
            <span class="text-blue-500">Vue.js</span>, which I found to be a powerful tool for 
            building reactive and scalable applications. Since then, I’ve worked on various 
            projects, contributing to frontend development best practices.
          </p>

          <p class="mb-6">
            I love solving complex problems, collaborating with teams, and learning new 
            technologies to enhance my development workflow. When I'm not coding, I enjoy 
            contributing to open-source projects and engaging with developer communities.
          </p>

          <section class="mt-12">
            <h2 class="text-xl font-semibold">Technical Skills</h2>
            <div class="flex flex-wrap gap-2 mt-4">
              <UBadge color="yellow">JavaScript</UBadge>
              <UBadge color="blue">TypeScript</UBadge>
              <UBadge color="green">Vue.js</UBadge>
              <UBadge color="cyan">Nuxt.js</UBadge>
              <UBadge color="orange">Figma</UBadge>
              <UBadge color="indigo">Git</UBadge>
              <UBadge color="pink">CSS3</UBadge>
            </div>
          </section>

          <section class="mt-12">
            <h2 class="text-xl font-semibold">Experience</h2>
            <div v-if="experienceTabs" class="mt-4 space-y-6">
              <UCard v-for="tab in experienceTabs" :key="tab.label">
                <template #header>
                  <h3 class="text-lg font-semibold">{{ tab.label }}</h3>
                  <p class="text-gray-500 dark:text-gray-400">{{ tab.date }}</p>
                </template>
                <div class="space-y-4">
                  <div v-for="item in tab.timeline" :key="item.title">
                    <h4 class="font-semibold">{{ item.title }}</h4>
                    <p>{{ item.description }}</p>
                  </div>
                </div>
              </UCard>
            </div>
          </section>

          <div class="mt-24">
            <h3 class="text-lg md:text-3xl font-semibold text-center mb-6">Education</h3>

            <div class="space-y-6">
              <UCard class="p-4 bg-green-200 dark:bg-gray-800 rounded-lg">
                <div class="flex justify-between items-center text-xs md:text-sm">
                  <div>
                    <h4 class="font-semibold">Bachelor of Science in Computer Information System</h4>
                    <p class="text-gray-500 dark:text-gray-400">Babcock University, Nigeria</p>
                  </div>
                  <UBadge color="green" variant="subtle">2017 - 2020</UBadge>
                </div>
              </UCard>
              <UCard class="p-4 bg-green-200 dark:bg-gray-800 rounded-lg">
                <div class="flex justify-between items-center text-xs md:text-sm">
                  <div>
                    <h4 class="font-semibold">Master of Science in Cybersecurity</h4>
                    <p class="text-gray-500 dark:text-gray-400">University of Derby</p>
                  </div>
                  <UBadge color="green" variant="subtle">2024 - Date</UBadge>
                </div>
              </UCard>
            </div>
          </div>
        </div>
      </section>

      <section id="projects" class="py-12 max-w-4xl">
        <h2 class="text-3xl font-bold text-center mb-8">Projects</h2>
        <div class="grid md:grid-cols-1 gap-6 text-xs md:text-sm">
          <UCard>
            <template #header>
              <h3 class="font-semibold">Storeventory</h3>
            </template>
            <p>A receipt management app replacing manual paperwork with digital tracking, swaps and also inventory updates.</p>
            <UButton color="primary" variant="outline" class="mt-4 mr-2">Preview images</UButton>
            <UButton to="https://swiftsort.vercel.app" target="_blank" color="primary" variant="outline" class="mt-4">View Project</UButton>
          </UCard>
        </div>
      </section>

      <section id="contact" class="py-12 max-w-4xl bg-gray-50 dark:bg-gray-800">
        <div class="max-w-6xl mx-auto text-center animate__animated animate__fadeIn animate__delay-1s">
          <h2 class="text-lg md:text-3xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Get in Touch</h2>
          <p class="text-gray-600 dark:text-gray-300 mb-8 text-xs md:text-sm px-4">
            I'm always open to new opportunities and collaborations. Let's connect!
          </p>

          <div class="flex justify-center items-center space-x-8">
            <div class="grid grid-cols-4 gap-x-4 px-4 bg-white dark:bg-gray-700 p-6 md:rounded-lg w-full max-w-sm hover:scale-105 transition-transform duration-300">
              <a
                href="https://www.linkedin.com/in/chigozie-agu-85019b209"
                target="_blank"
                rel="noopener noreferrer"
                class="text-blue-600 hover:text-blue-400 transition-all duration-300 transform hover:scale-125"
              >
                <Icon icon="mdi:linkedin" class="w-10 h-10 mx-auto" />
                <span class="sr-only">LinkedIn</span>
              </a>

              <a
                href="https://github.com/GozzAgu"
                target="_blank"
                rel="noopener noreferrer"
                class="text-gray-800 dark:text-gray-200 hover:text-gray-700 dark:hover:text-gray-400 transition-all duration-300 transform hover:scale-125"
              >
                <Icon icon="mdi:github" class="w-10 h-10 mx-auto" />
                <span class="sr-only">GitHub</span>
              </a>

              <a
                href="https://x.com/_gozz___"
                target="_blank"
                rel="noopener noreferrer"
                class="text-blue-400 dark:hover:text-blue-500 transition-all duration-300 transform hover:scale-125"
              >
                <Icon icon="line-md:twitter-x-alt" class="w-10 h-10 mx-auto" />
                <span class="sr-only">Twitter</span>
              </a>

              <a
                href="mailto:gozieagu1@gmail.com"
                class="text-gray-800 dark:text-gray-200 hover:text-red-600 dark:hover:text-red-400 transition-all duration-300 transform hover:scale-125"
              >
                <Icon icon="mdi:email" class="w-10 h-10 mx-auto" />
                <span class="sr-only">Email</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>

    <footer class="w-full py-6 text-center text-xs md:text-sm bg-white dark:bg-gray-800">
      <p>🚀 Built with ❤️ by Goz using Nuxt.js | © {{ new Date().getFullYear() }}</p>
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
  @apply text-gray-800 dark:text-gray-200 hover:text-green-500 dark:hover:text-green-400 transition font-medium;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.social-link:hover {
  transform: scale(1.1);
}

html {
  scroll-behavior: smooth;
}
</style>