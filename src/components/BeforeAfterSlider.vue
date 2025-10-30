<template>
  <div class="relative rounded-xl overflow-hidden border border-red-900/30 bg-black/70 shadow-xl">
    <div class="relative h-80 w-full overflow-hidden">
      <!-- Imagen "Antes" (fondo completo) -->
      <img 
        src="/assets/images/vidrio-limpio.jpeg" 
        alt="Antes de la limpieza"
        class="absolute inset-0 w-full h-full object-cover"
      />
      
      <!-- Imagen "Después" (con máscara deslizante) -->
      <div 
        class="absolute inset-0 overflow-hidden transition-gpu"
        :style="{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }"
      >
        <img 
          src="/assets/images/vidrio-sucio.jpeg" 
          alt="Después de la limpieza"
          class="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      <!-- Línea divisoria con handle -->
      <div 
        class="absolute top-0 bottom-0 w-1 bg-red-500 cursor-ew-resize shadow-lg"
        :style="{ left: `${sliderPosition}%` }"
      >
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-red-500 rounded-full flex items-center justify-center shadow-xl">
          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
          </svg>
        </div>
      </div>

      <!-- Input range invisible para control -->
      <input 
        type="range" 
        min="0" 
        max="100" 
        v-model="sliderPosition"
        class="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-10"
      />
    </div>

    <!-- Labels -->
    <div class="flex justify-between items-center p-4 bg-black/60">
      <span class="text-sm font-semibold text-gray-300">Antes</span>
      <span class="text-sm font-semibold text-white">Desliza para comparar</span>
      <span class="text-sm font-semibold text-gray-300">Después</span>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';

const sliderPosition = ref(50);

onMounted(async () => {
  // Animación removida para mejor performance
});
</script>

<style scoped>
.transition-gpu {
  transform: translateZ(0);
  backface-visibility: hidden;
}
</style>
