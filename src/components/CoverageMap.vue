<template>
  <div class="bg-black/70 rounded-xl p-6 border border-red-900/30">
    <div class="flex items-center justify-between mb-4">
      <h3 class="text-xl font-bold text-white">Cobertura</h3>
      <button 
        @click="requestVisit"
        class="bg-red-600 hover:bg-red-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors duration-200"
      >
        Solicitar visita
      </button>
    </div>

    <!-- Google Maps embebido con todas las ciudades marcadas -->
    <div class="relative w-full h-64 rounded-lg overflow-hidden border border-red-900/20">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d214458.8!2d-71.5!3d-33.05!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9689de84895bd28d%3A0xcdcbe6c0f67e1c9c!2sVi%C3%B1a%20del%20Mar!5e0!3m2!1ses!2scl!4v1635000000000!5m2!1ses!2scl&markers=color:red%7Clabel:VM%7C-33.0247,-71.5518&markers=color:red%7Clabel:V%7C-33.0472,-71.6127&markers=color:red%7Clabel:C%7C-32.9316,-71.5225&markers=color:red%7Clabel:Q%7C-33.0472,-71.4428&markers=color:red%7Clabel:VA%7C-33.0411,-71.3733&markers=color:red%7Clabel:L%7C-33.0172,-71.2686"
        width="100%"
        height="100%"
        style="border:0; filter: grayscale(20%) brightness(0.8) contrast(1.1);"
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
      
      <!-- Overlay para estilo -->
      <div class="absolute inset-0 bg-red-900/10 pointer-events-none mix-blend-multiply"></div>
    </div>

    <p class="text-xs text-gray-400 mt-3 text-center">
      <svg class="w-4 h-4 inline-block mr-1" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"></path>
      </svg>
      Cobertura V Región: Viña del Mar, Valparaíso, Concón, Quilpué, Villa Alemana, Limache
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const requestVisit = () => {
  window.open('https://wa.me/56954080730?text=Solicito%20visita%20técnica%20para%20evaluación', '_blank');
};
</script>

<style scoped>
/* Animaciones desactivadas para mejor performance */
</style>
