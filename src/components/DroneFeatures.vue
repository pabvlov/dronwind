<template>
  <section ref="sectionRef" class="relative">
    <div class="grid md:grid-cols-2 gap-12 items-start">
      <!-- Columna izquierda: Atributos -->
      <div class="space-y-8">
        <div 
          v-for="(feature, index) in features" 
          :key="index"
          class="feature-card bg-black/70 rounded-xl p-6 border border-red-900/30 hover:border-red-700/50 transition-colors duration-300"
          :ref="el => featureRefs[index] = el"
        >
          <div class="flex items-start gap-4">
            <div class="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br from-red-600 to-red-900 flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-red-900/50">
              {{ index + 1 }}
            </div>
            <div class="flex-1">
              <h3 class="text-2xl font-bold text-white mb-2">{{ feature.title }}</h3>
              <p class="text-gray-300 leading-relaxed">{{ feature.description }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Columna derecha: Componentes interactivos (sticky) -->
      <div class="sticky top-24 space-y-6">
        <BeforeAfterSlider />
        <CoverageMap />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, type ComponentPublicInstance } from 'vue';
import BeforeAfterSlider from './BeforeAfterSlider.vue';
import CoverageMap from './CoverageMap.vue';

const features = [
  {
    title: 'Autonomía y Alcance',
    description: 'Vuelos optimizados para cubrir grandes áreas. Sistema de baterías intercambiables que permite operación continua sin interrupciones significativas.'
  },
  {
    title: 'Sistema de Limpieza',
    description: 'Boquillas de precisión con presión ajustable y detergentes ecológicos específicos para cada tipo de superficie. Compatible con paneles solares y materiales delicados.'
  },
  {
    title: 'Antenas, sensores y precisión',
    description: 'Cámara FPV para ir supervisando el trabajo en tiempo real. Sensor frontal para evitar colisión con instalación y antenas GPS y RTK para mayor precisión.'
  },
  {
    title: 'Seguridad Total',
    description: 'Geofencing automático, protocolos de vuelo certificados y operación remota con mitigación de riesgos. Elimina completamente el riesgo de trabajo en altura.'
  },
  {
    title: 'Máxima Eficiencia',
    description: 'Hasta 70% más rápido que métodos tradicionales. Mayor cobertura por hora con reducción significativa de personal y eliminación de andamios.'
  }
];

const sectionRef = ref<HTMLElement>();
const featureRefs = ref<(Element | ComponentPublicInstance | null)[]>([]);

onMounted(async () => {
  // Animaciones desactivadas para mejor performance
});
</script>

<style scoped>
.feature-card {
  transform: translateZ(0);
  backface-visibility: hidden;
  perspective: 1000px;
}
</style>
