<template>
  <div 
    class="relative min-h-screen flex items-center justify-center overflow-hidden"
    ref="heroRef"
    style="background: linear-gradient(225deg, #b91c1c 0%, #7f1d1d 10%, #450a0a 30%, #1a0505 60%, #000000 100%);"
  >
    <div class="text-center z-30 relative max-w-4xl px-6">
      <!-- Logo DRONWIND con cursor parpadeante -->
      <h1 
        class="font-black tracking-tight leading-none mb-6"
        style="font-family: 'Montserrat', sans-serif;"
        ref="logoRef"
      >
        <span 
          v-for="(letter, index) in logoLetters" 
          :key="index"
          class="inline-block transition-all duration-500"
          :class="[
            isLogoVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
            letter === 'i' ? 'relative' : ''
          ]"
          :style="{ transitionDelay: `${index * 0.08}s`, fontSize: 'clamp(4rem, 12vw, 10rem)', color: '#fff' }"
        >
          {{ letter === 'i' ? 'ı' : letter }}
          <span 
            v-if="letter === 'i'"
            class="absolute left-1/2 -translate-x-1/2 rounded-full bg-red-600"
            :class="{ 'animate-pulse': isLogoVisible }"
            style="top: 0.10em; width: 0.18em; height: 0.18em;"
          ></span>
        </span>
      </h1>
      
      <!-- Tagline con stagger -->
      <div 
        class="space-y-2 overflow-hidden"
        ref="taglineRef"
      >
        <p 
          v-for="(line, index) in taglines" 
          :key="index"
          class="text-lg md:text-2xl lg:text-3xl font-medium text-gray-200 transition-all duration-700"
          :class="isTaglineVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
          :style="{ transitionDelay: `${0.8 + index * 0.15}s` }"
        >
          {{ line }}
        </p>
      </div>
      
      <!-- Scroll indicator -->
      <div 
        class="mt-16 transition-all duration-1000"
        :class="isTaglineVisible ? 'opacity-60 translate-y-0' : 'opacity-0 translate-y-4'"
        style="transition-delay: 1.5s;"
      >
        <div class="flex flex-col items-center gap-3">
          <span class="text-xs uppercase tracking-[0.3em] text-gray-400 font-medium">Descubre</span>
          <div class="w-px h-12 bg-gradient-to-b from-red-600 to-transparent"></div>
        </div>
      </div>
    </div>
    
    <!-- Zona de drones - limitada a la altura de los edificios -->
    <div class="absolute bottom-0 left-0 right-0 h-[45vh] max-h-[500px] min-h-[300px] pointer-events-none z-20" ref="droneZoneRef">
      <img 
        v-for="(state, i) in droneStates" 
        :key="i"
        :ref="el => { if (el) floatingElements[i] = el as HTMLElement }"
        src="/assets/images/drone.svg"
        alt="Drone"
        class="absolute w-12 h-12 opacity-70 drone-icon"
        :style="{ 
          left: `${state.x}%`, 
          top: `${state.y}%` 
        }"
      />
    </div>
    
    <!-- Silueta de edificios en la parte inferior -->
    <div class="absolute bottom-0 left-0 right-0 w-full pointer-events-none z-10" ref="buildingsRef">
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
import { gsap } from '../utils/gsap';

interface DroneState {
  x: number;
  y: number;
  cleaning: boolean;
  timeline: gsap.core.Timeline | null;
}

const heroRef = ref<HTMLElement>();
const buildingsRef = ref<HTMLElement>();

const isLogoVisible = ref(false);
const isTaglineVisible = ref(false);

const logoLetters = ['D', 'r', 'o', 'n', 'w', 'i', 'n', 'd'];
const taglines = [
  'Limpieza con drones',
  'Sin riesgos. Sin andamios. Sin límites.'
];

const droneStates = ref<DroneState[]>([]);
const floatingElements = ref<HTMLElement[]>([]);
let droneTimelines: gsap.core.Timeline[] = [];

// Generar posicion aleatoria en los bordes (evita el centro donde esta el texto)
const generateRandomPosition = (): { x: number; y: number } => {
  const margin = 8; // % de margen
  const centerSafeZone = 30; // % del centro a evitar
  
  let x: number, y: number;
  let isInCenter: boolean;
  
  do {
    x = Math.random() * (100 - margin * 2) + margin;
    y = Math.random() * (100 - margin * 2) + margin;
    
    // Verificar que no este en el centro
    const distFromCenter = Math.sqrt(
      Math.pow(x - 50, 2) + Math.pow(y - 50, 2)
    );
    isInCenter = distFromCenter < centerSafeZone;
  } while (isInCenter);
  
  return { x, y };
};

// Animacion de "limpieza" — movimiento erratico en el mismo edificio
const animateCleaning = (
  el: HTMLElement, 
  state: DroneState, 
  onComplete: () => void
) => {
  const tl = gsap.timeline({
    onComplete,
  });
  
  // 3 a 6 movimientos erraticos (como limpiando)
  const cleaningMoves = 3 + Math.floor(Math.random() * 4);
  
  for (let i = 0; i < cleaningMoves; i++) {
    // Movimiento erratico pequeno (±15px)
    const offsetX = (Math.random() - 0.5) * 30;
    const offsetY = (Math.random() - 0.5) * 30;
    const rotation = (Math.random() - 0.5) * 20;
    const duration = 0.3 + Math.random() * 0.4; // Rapido, como camara rapida
    
    tl.to(el, {
      x: `+=${offsetX}`,
      y: `+=${offsetY}`,
      rotation,
      duration,
      ease: 'none', // Sin easing para que se vea erratico/mecanico
    });
  }
  
  // Pequena pausa
  tl.to({}, { duration: 0.1 + Math.random() * 0.2 });
  
  return tl;
};

// Animacion de vuelo hacia nuevo edificio
const animateFlight = (
  el: HTMLElement,
  fromX: number,
  fromY: number,
  toX: number,
  toY: number,
  onComplete: () => void
) => {
  const dist = Math.sqrt(Math.pow(toX - fromX, 2) + Math.pow(toY - fromY, 2));
  // Cuanto mas lejos, mas tarda — pero rapido (efecto camara rapida)
  const duration = 0.8 + (dist / 100) * 1.5;
  
  // Calcular angulo para rotar hacia la direccion del vuelo
  const angle = Math.atan2(toY - fromY, toX - fromX) * (180 / Math.PI) + 90;
  
  return gsap.to(el, {
    left: `${toX}%`,
    top: `${toY}%`,
    rotation: angle,
    duration,
    ease: 'power2.inOut',
    onComplete,
  });
};

// Ciclo completo de un drone: volar -> limpiar -> repetir
const startDroneCycle = (index: number) => {
  const el = floatingElements.value[index];
  const state = droneStates.value[index];
  if (!el || !state) return;
  
  // Paso 1: Elegir nuevo edificio (posicion)
  const newPos = generateRandomPosition();
  const currentX = state.x;
  const currentY = state.y;
  
  // Paso 2: Volar al nuevo edificio
  state.cleaning = false;
  
  animateFlight(el, currentX, currentY, newPos.x, newPos.y, () => {
    // Actualizar estado
    state.x = newPos.x;
    state.y = newPos.y;
    state.cleaning = true;
    
    // Paso 3: Limpiar (movimiento erratico)
    const cleaningTl = animateCleaning(el, state, () => {
      // Paso 4: Cuando termina de limpiar, resetear transform y volar a otro edificio
      gsap.set(el, { x: 0, y: 0, rotation: 0 });
      startDroneCycle(index);
    });
    
    if (state.timeline) state.timeline.kill();
    state.timeline = cleaningTl;
    droneTimelines[index] = cleaningTl;
  });
};

// Efecto parallax de edificios
const handleScroll = () => {
  if (!buildingsRef.value || !heroRef.value) return;
  
  const scrolled = window.scrollY;
  const heroHeight = heroRef.value.offsetHeight;
  const progress = Math.min(scrolled / heroHeight, 1);
  const scale = 1 + (progress * 0.5);
  const translateY = progress * -20;
  
  buildingsRef.value.style.transform = `scale(${scale}) translateY(${translateY}px)`;
  buildingsRef.value.style.transformOrigin = 'bottom center';
};

onMounted(() => {
  // Crear 5 drones con posiciones iniciales
  for (let i = 0; i < 5; i++) {
    const pos = generateRandomPosition();
    droneStates.value.push({
      x: pos.x,
      y: pos.y,
      cleaning: false,
      timeline: null,
    });
  }
  
  // Esperar a que los elementos del DOM esten listos
  requestAnimationFrame(() => {
    // Colocar drones en posiciones iniciales
    floatingElements.value.forEach((el, i) => {
      if (el && droneStates.value[i]) {
        gsap.set(el, {
          left: `${droneStates.value[i].x}%`,
          top: `${droneStates.value[i].y}%`,
        });
        
        // Delay inicial escalonado para que no todos partan juntos
        setTimeout(() => {
          startDroneCycle(i);
        }, i * 800 + Math.random() * 500);
      }
    });
  });
  
  // Trigger text animations
  requestAnimationFrame(() => {
    isLogoVisible.value = true;
    setTimeout(() => {
      isTaglineVisible.value = true;
    }, 400);
  });
  
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
  // Limpiar timelines
  droneTimelines.forEach(tl => tl?.kill());
  droneStates.value.forEach(s => s.timeline?.kill());
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700;900&display=swap');

.animate-pulse {
  animation: pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.3;
  }
}

.drone-icon {
  filter: brightness(0) saturate(100%) invert(100%);
}

.buildings-silhouette {
  opacity: 0.3;
  max-height: 500px;
  object-fit: cover;
  object-position: bottom;
  transition: transform 0.1s ease-out;
  will-change: transform;
}
</style>
