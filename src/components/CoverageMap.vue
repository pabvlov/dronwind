<template>
  <div class="flex flex-col items-center justify-between h-full py-2">
    <!-- Mapa SVG de Chile -->
    <div class="relative flex-1 w-full flex items-center justify-center">
      <img 
        src="/assets/images/chile.svg" 
        alt="Mapa de Chile"
        class="h-[400px] md:h-[600px] w-auto object-contain"
      />
      
      <!-- Marcador de Valparaíso -->
      <div 
        class="absolute w-4 h-4 bg-red-600 rounded-full border-2 border-white shadow-lg animate-pulse"
        style="top: 32%; right: 8%; transform: translate(50%, -50%);"
      />
    </div>

    <p class="text-xs text-gray-500 mt-4 text-center">
      <svg class="w-4 h-4 inline-block mr-1" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"></path>
      </svg>
      Operamos en toda la V Región. Consulta por cobertura en otras ciudades.
    </p>
  </div>
</template>

<script setup lang="ts">
// No script needed for static display
</script>
