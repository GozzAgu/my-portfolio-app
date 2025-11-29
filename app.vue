<template>
  <div>
    <head>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="">
      <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    </head>
  </div>
    
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style>
/* Global styles for modern, fluid design */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
  font-family: 'Quicksand', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

body {
  font-family: 'Quicksand', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
  overflow-x: hidden;
  transition: background-color 0.5s ease, color 0.5s ease;
}

/* Custom scrollbar for webkit browsers */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: rgba(10, 10, 15, 0.3);
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, #8b5cf6, #06b6d4, #10b981);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(180deg, #7c3aed, #0891b2, #059669);
}

/* Selection styling */
::selection {
  background: linear-gradient(45deg, #8b5cf6, #06b6d4);
  color: white;
}

/* Focus styles for accessibility */
*:focus-visible {
  outline: 2px solid #06b6d4;
  outline-offset: 2px;
}

/* Modern typography scale */
.text-hero {
  font-size: clamp(2.5rem, 5vw, 4.5rem);
  line-height: 1.1;
  font-weight: 800;
}

.text-display {
  font-size: clamp(2rem, 4vw, 3.5rem);
  line-height: 1.2;
  font-weight: 700;
}

.text-heading {
  font-size: clamp(1.5rem, 3vw, 2.5rem);
  line-height: 1.3;
  font-weight: 600;
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* Responsive utilities */
@media (max-width: 640px) {
  body {
    font-size: 14px;
  }
}
</style>