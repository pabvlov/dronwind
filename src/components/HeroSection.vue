<template>
  <div class="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-red-700 via-red-900 to-black overflow-hidden" ref="heroRef" style="background: linear-gradient(225deg, #b91c1c 0%, #7f1d1d 10%, #450a0a 30%, #1a0505 60%, #000000 100%);">
    <div class="text-center z-30 relative max-w-4xl px-6">
      <h1 class="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-lg" ref="titleRef">
        {{ title }}
      </h1>
      <p class="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto leading-relaxed drop-shadow-md" ref="subtitleRef">
        {{ subtitle }}
      </p>
    </div>
    
    <!-- Elementos animados - Drones -->
    <div class="absolute inset-0 pointer-events-none z-20">
      <img 
        v-for="(position, i) in dronePositions" 
        :key="i"
        :ref="el => floatingElements.push(el as HTMLElement)"
        src="/assets/images/drone.svg"
        alt="Drone"
        class="absolute w-12 h-12 opacity-70 drone-icon"
        :style="{ 
          left: `${position.x}%`, 
          top: `${position.y}%` 
        }"
      />
    </div>
    
    <!-- Silueta de edificios en la parte inferior -->
    <div class="absolute bottom-0 left-0 right-0 w-full pointer-events-none z-10">
      <img 
        src="/assets/images/buildings-silouette.svg"
        alt="City Skyline"
        class="w-full h-auto buildings-silhouette"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { gsap, createFadeInTimeline } from '../utils/gsap';

// Props del componente
interface Props {
  title: string;
  subtitle: string;
}

const props = defineProps<Props>();

// Referencias DOM
const heroRef = ref<HTMLElement>();
const titleRef = ref<HTMLElement>();
const subtitleRef = ref<HTMLElement>();
const floatingElements = ref<HTMLElement[]>([]);

// Posiciones iniciales de los drones (lejos del centro)
const dronePositions = ref<Array<{x: number, y: number}>>([]);

// Timeline principal
let mainTimeline: gsap.core.Timeline | null = null;

// Función para generar posiciones alejadas del centro
const generateEdgePosition = () => {
  const centerX = 50;
  const centerY = 50;
  const minDistanceFromCenter = 30; // Porcentaje mínimo de distancia del centro
  
  let x, y, distanceFromCenter;
  
  do {
    // Generar posición en todo el rango
    x = Math.random() * 90 + 5; // 5% a 95%
    y = Math.random() * 90 + 5; // 5% a 95%
    
    // Calcular distancia del centro
    distanceFromCenter = Math.sqrt(
      Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2)
    );
  } while (distanceFromCenter < minDistanceFromCenter);
  
  return { x, y };
};

// Función para iniciar animación
const startAnimation = () => {
  if (!gsap || floatingElements.value.length === 0) return;
  
  // Animar elementos flotantes con movimiento más amplio hacia los bordes
  floatingElements.value.forEach((el, index) => {
    if (!el) return;
    
    // Calcular posición actual del elemento
    const currentPos = dronePositions.value[index];
    const centerX = 50;
    const centerY = 50;
    
    // Calcular vector desde el centro hacia el elemento
    const directionX = currentPos.x - centerX;
    const directionY = currentPos.y - centerY;
    
    // Normalizar y amplificar el movimiento (mucho más lejos)
    const moveDistanceX = directionX * 8; // Multiplicador mayor para más movimiento
    const moveDistanceY = directionY * 8;
    
    gsap.to(el, {
      rotation: 360,
      x: moveDistanceX,
      y: moveDistanceY,
      scale: Math.random() * 0.5 + 0.5,
      duration: 2 + Math.random() * 2,
      delay: index * 0.1,
      ease: "power2.inOut",
      repeat: -1,
      yoyo: true
    });
  });
  
  // Animación del título
  if (titleRef.value) {
    gsap.to(titleRef.value, {
      color: '#ef4444',
      scale: 1.1,
      duration: 1,
      ease: "power2.out"
    });
  }
};

// Lifecycle hooks
onMounted(() => {
  // Generar posiciones iniciales para los drones (lejos del centro)
  for (let i = 0; i < 5; i++) {
    dronePositions.value.push(generateEdgePosition());
  }
  
  // Timeline de entrada
  mainTimeline = gsap.timeline();
  
  if (titleRef.value && subtitleRef.value) {
    mainTimeline
      .fromTo(titleRef.value, 
        { opacity: 0, y: -50 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
      )
      .fromTo(subtitleRef.value,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" },
        "-=0.5"
      );
  }
  
  // Animar elementos flotantes inicialmente
  floatingElements.value.forEach((el, index) => {
    if (!el) return;
    
    gsap.fromTo(el,
      { opacity: 0, scale: 0 },
      { 
        opacity: 0.7, 
        scale: 1, 
        duration: 0.5,
        delay: 1 + index * 0.1,
        ease: "back.out(1.7)"
      }
    );
  });
  
  // Iniciar animación automáticamente después de la entrada
  setTimeout(() => {
    startAnimation();
  }, 2000); // Espera 2 segundos después de que aparezcan los elementos
});

onUnmounted(() => {
  // Limpiar animaciones
  if (mainTimeline) {
    mainTimeline.kill();
  }
  gsap.killTweensOf([...floatingElements.value, titleRef.value, subtitleRef.value]);
});
</script>

<style scoped>
.drone-icon {
  /* Cambiar color del SVG a blanco */
  filter: brightness(0) saturate(100%) invert(100%);
}

/* Opcional: Efecto sutil al hover */
.drone-icon:hover {
  filter: brightness(0) saturate(100%) invert(90%);
}

.buildings-silhouette {
  /* Ahora el SVG tiene fondo transparente */
  opacity: 0.3;
  /* Altura máxima para que no sea demasiado grande */
  max-height: 500px;
  object-fit: cover;
  object-position: bottom;
}
</style>

