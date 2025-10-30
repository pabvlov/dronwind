<template>
  <section class="relative w-full h-screen overflow-hidden bg-black">
    <!-- Video de fondo -->
    <video
      ref="videoRef"
      class="absolute inset-0 w-full h-full object-cover"
      autoplay
      muted
      loop
      playsinline
      @loadeddata="onVideoLoaded"
    >
      <source src="/assets/video/drone-limpiador-limpiando.mp4" type="video/mp4">
      Tu navegador no soporta videos HTML5.
    </video>

    <!-- Overlay oscuro para mejorar legibilidad -->
    <div class="absolute inset-0 bg-black/40"></div>

    <!-- Contenido sobre el video con parallax -->
    <div 
      ref="contentRef"
      class="relative z-10 h-full flex flex-col items-center justify-center text-center px-6"
    >
      <h2 class="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-2xl">
        Tecnología en Acción
      </h2>
      <p class="text-xl md:text-2xl text-gray-200 max-w-3xl mb-8 drop-shadow-lg">
        Observa cómo nuestros drones realizan limpiezas profesionales con precisión milimétrica
      </p>
    </div>

    <!-- Indicador de scroll -->
    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
      <svg class="w-8 h-8 text-white opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
      </svg>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const videoRef = ref<HTMLVideoElement | null>(null);
const contentRef = ref<HTMLElement | null>(null);
const isPlaying = ref(true);
const isMuted = ref(true);
const isLoaded = ref(false);

const onVideoLoaded = () => {
  isLoaded.value = true;
};

const handleScroll = () => {
  if (!contentRef.value) return;
  
  const scrolled = window.scrollY;
  const sectionHeight = window.innerHeight;
  
  // Definir el rango de scroll donde ocurre la animación
  const animationRange = sectionHeight * 0.5; // 50% del viewport
  
  // Calcular el progreso de 0 a 1
  const progress = Math.min(scrolled / animationRange, 1);
  
  // Comenzar desde abajo (200px abajo) y terminar en el centro (0)
  const startY = 200;
  const endY = 0;
  const currentY = startY - (startY * progress);
  
  // Comenzar con opacidad 0 y terminar en 1
  const opacity = progress;
  
  contentRef.value.style.transform = `translateY(${currentY}px)`;
  contentRef.value.style.opacity = `${opacity}`;
};

onMounted(() => {
  // Inicializar el texto desde abajo con opacidad 0
  if (contentRef.value) {
    contentRef.value.style.transform = 'translateY(200px)';
    contentRef.value.style.opacity = '0';
  }
  
  // Asegurar que el video se reproduce automáticamente
  if (videoRef.value) {
    videoRef.value.play().catch(err => {
      console.log('Autoplay bloqueado:', err);
      isPlaying.value = false;
    });
  }
  
  // Agregar listener de scroll para parallax
  window.addEventListener('scroll', handleScroll, { passive: true });
  
  // Ejecutar una vez para aplicar el estado inicial
  handleScroll();
});

onUnmounted(() => {
  // Limpiar el video al desmontar
  if (videoRef.value) {
    videoRef.value.pause();
    videoRef.value.src = '';
  }
  
  // Remover listener de scroll
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
/* Optimización para video */
video {
  transform: translateZ(0);
  backface-visibility: hidden;
}

/* Transición suave para el parallax */
.relative.z-10 {
  transition: transform 0.1s ease-out, opacity 0.1s ease-out;
  will-change: transform, opacity;
}
</style>
