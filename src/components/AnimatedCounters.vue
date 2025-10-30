<template>
  <div class="bg-black/70 rounded-xl p-6 border border-red-900/30">
    <h3 class="text-xl font-bold text-white mb-6 text-center">Resultados Comprobados</h3>
    
    <div class="grid grid-cols-3 gap-4">
      <div 
        v-for="(counter, index) in counters" 
        :key="index"
        class="text-center"
      >
        <div class="text-4xl font-bold text-red-400 mb-2" ref="el => counterRefs[index] = el">
          {{ displayValues[index] }}
        </div>
        <div class="text-sm text-gray-300">{{ counter.label }}</div>
        <div class="text-xs text-gray-500 mt-1">{{ counter.unit }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const counters = [
  { label: 'Limpiados', unit: 'm²', target: 12500 },
  { label: 'Ahorradas', unit: 'horas', target: 850 },
  { label: 'Completados', unit: 'proyectos', target: 127 }
];

const displayValues = ref([0, 0, 0]);
const counterRefs = ref<(HTMLElement | null)[]>([]);

onMounted(async () => {
  // Mostrar valores directamente sin animación para mejor performance
  counters.forEach((counter, index) => {
    displayValues.value[index] = counter.target.toLocaleString('es-CL');
  });
});
</script>
