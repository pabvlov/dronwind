<template>
  <div class="bg-black/40 backdrop-blur-sm rounded-lg shadow-lg p-6 m-4 max-w-sm border border-red-900/30 hover:border-red-700/50 hover:shadow-2xl hover:shadow-red-900/20 transition-all duration-300" ref="cardRef">
    <div class="space-y-4">
      <h3 class="text-xl font-bold text-white drop-shadow-lg">{{ title }}</h3>
      <p class="text-gray-300 leading-relaxed">{{ description }}</p>
      <button 
        @click="handleClick"
        class="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded transition-colors duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-black/40 border-0"
        ref="buttonRef"
      >
        {{ buttonText }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { animateIn, addHoverEffect, gsap } from '../utils/gsap';

// Props del componente
interface Props {
  title: string;
  description: string;
  buttonText?: string;
  delay?: number;
}

const props = withDefaults(defineProps<Props>(), {
  buttonText: 'Click me',
  delay: 0
});

// Referencias a los elementos DOM
const cardRef = ref<HTMLElement>();
const buttonRef = ref<HTMLElement>();

// Variables para limpieza de eventos
let cleanupHover: (() => void) | null = null;

// Función para manejar el click del botón
const handleClick = () => {
  if (!buttonRef.value) return;
  
  // Animación de click
  gsap.to(buttonRef.value, {
    scale: 0.95,
    duration: 0.1,
    yoyo: true,
    repeat: 1,
    ease: "power2.inOut"
  });
  
  // Emitir evento personalizado
  console.log(`Button clicked: ${props.title}`);
};

// Lifecycle hooks
onMounted(() => {
  // Animar la entrada del componente
  if (cardRef.value) {
    animateIn(cardRef.value, props.delay);
  }
  
  // Agregar efecto hover al botón
  if (buttonRef.value) {
    cleanupHover = addHoverEffect(buttonRef.value);
  }
});

onUnmounted(() => {
  // Limpiar event listeners
  if (cleanupHover) {
    cleanupHover();
  }
});
</script>

