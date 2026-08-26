<template>
  <section ref="sectionRef">
    <div class="grid md:grid-cols-2 gap-12 items-stretch max-w-6xl mx-auto">
      <!-- Columna izquierda: Mapa de Chile -->
      <div class="flex items-stretch justify-center">
        <CoverageMap class="h-full" />
      </div>

      <!-- Columna derecha: Atributos -->
      <div class="space-y-6">
        <div 
          v-for="(feature, index) in features" 
          :key="index"
          class="bg-white rounded-2xl p-6 border border-gray-100 hover:border-red-200 hover:shadow-lg transition-all duration-300"
        >
          <div class="flex items-start gap-4">
            <div class="flex-shrink-0 w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center text-red-600 font-black text-lg">
              {{ index + 1 }}
            </div>
            <div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">{{ feature.title }}</h3>
              <p class="text-gray-500 leading-relaxed">{{ feature.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import CoverageMap from './CoverageMap.vue';

const features = [
  {
    title: 'Autonomía y Alcance',
    description: 'Permite la operación prácticamente continua.'
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
</script>
