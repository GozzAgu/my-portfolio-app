<template>
  <div class="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
    <!-- Navbar -->
    <header class="w-full fixed top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-gray-900/80 shadow-md">
      <nav class="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <div class="flex items-center space-x-2">
          <h1 class="text-2xl font-bold text-green-400 dark:text-green-400">Goz</h1>
        </div>

        <div class="flex space-x-2 md:space-x-6 text-xs md:text-sm">
          <!-- Modify these links to scroll to sections -->
          <a href="#about" class="nav-link">About</a>
          <a href="#projects" class="nav-link">Projects</a>
          <a href="#contact" class="nav-link">Contact</a>
        </div>

        <!-- Dark Mode Toggle -->
        <button @click="toggleDarkMode" class="p-2 rounded-lg transition transform hover:scale-110">
          <Icon v-if="!isDarkMode" icon="ph:sun-duotone" class="w-6 h-6 text-yellow-500" />
          <Icon v-else icon="ph:moon-duotone" class="w-6 h-6 text-gray-300" />
        </button>
      </nav>
    </header>

    <!-- Page Content -->
    <main class="flex-grow max-w-6xl mx-auto px-6 py-12">
      <!-- Add sections with IDs -->
      <section id="about" class="py-12">
        <h2 class="text-lg md:text-3xl font-bold text-center mb-8">About Me</h2>
        <div class="max-w-4xl mx-auto text-xs md:text-sm">
          <p class="mb-6">
            Hi, I'm 
            <span class="font-semibold text-green-400">Chigozie Franklin Agu</span>
            , a passionate and dedicated frontend developer with over 3 years 
            of experience building dynamic web applications using modern JavaScript 
            frameworks like 
            <span class="text-blue-500">Vue.js</span>. 
            My expertise lies in creating user-friendly, responsive, 
            and performant applications with a focus on delivering the best user experience.
          </p>
          <p class="mb-6">
            I started my career as a self-taught developer, diving into the world of HTML, 
            CSS, and JavaScript. After mastering the fundamentals, I focused on learning 
            <span class="text-blue-500">Vue.js</span> 
            and quickly realized how powerful and elegant it is for building reactive, 
            component-driven user interfaces. Since then, I have worked on various projects, 
            both personal and professional, contributing to the development of scalable and 
            maintainable frontend applications.
          </p>
          <p class="mb-6">
            Throughout my career, I've developed strong problem-solving skills and a deep 
            understanding of frontend development best practices. I work closely with designers
            and backend developers to create seamless, integrated web applications that are intuitive, 
            responsive, and performant.
          </p>
          <p class="mb-6">
            I’m always learning and experimenting with new technologies, striving to stay on top of 
            the latest trends and advancements in web development. Whether it's exploring the latest 
            Vue.js features or improving my knowledge of CSS and JavaScript performance optimizations, 
            I am committed to continually improving my skills.
          </p>
          <p class="mb-6">
            In my spare time, I enjoy contributing to open-source projects, sharing my knowledge 
            through blog posts, and participating in developer communities. If you’d like to collaborate 
            on a project or discuss frontend technologies, feel free to reach out!
          </p>
        </div>
      </section>

      <section id="projects" class="py-12">
        <h2>Projects</h2>
        <p>Content for the Projects section...</p>
      </section>

      <section id="contact" class="py-12 bg-gray-50 dark:bg-gray-800">
        <div class="max-w-6xl mx-auto text-center animate__animated animate__fadeIn animate__delay-1s">
          <h2 class="text-lg md:text-3xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Get in Touch</h2>
          <p class="text-gray-600 dark:text-gray-300 mb-8 text-xs md:text-sm px-4">
            I'm always open to new opportunities and collaborations. Let's connect!
          </p>

          <!-- Social Links Section -->
          <div class="flex justify-center items-center space-x-8">
            <!-- Social Links Card -->
            <div class="grid grid-cols-4 gap-x-4 px-4 bg-white dark:bg-gray-700 p-6 md:rounded-lg w-full max-w-sm hover:scale-105 transition-transform duration-300">
              <a
                href="https://www.linkedin.com/in/your-linkedin"
                target="_blank"
                rel="noopener noreferrer"
                class="text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 transform hover:scale-125"
              >
                <Icon icon="mdi:linkedin" class="w-10 h-10 mx-auto" />
                <span class="sr-only">LinkedIn</span>
              </a>

              <a
                href="https://github.com/your-github"
                target="_blank"
                rel="noopener noreferrer"
                class="text-gray-800 dark:text-gray-200 hover:text-gray-700 dark:hover:text-gray-400 transition-all duration-300 transform hover:scale-125"
              >
                <Icon icon="mdi:github" class="w-10 h-10 mx-auto" />
                <span class="sr-only">GitHub</span>
              </a>

              <a
                href="https://twitter.com/your-twitter"
                target="_blank"
                rel="noopener noreferrer"
                class="text-gray-800 dark:text-gray-200 hover:text-blue-400 dark:hover:text-blue-500 transition-all duration-300 transform hover:scale-125"
              >
                <Icon icon="line-md:twitter-x-alt" class="w-10 h-10 mx-auto" />
                <span class="sr-only">Twitter</span>
              </a>

              <a
                href="mailto:your-email@example.com"
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

    <!-- Footer -->
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