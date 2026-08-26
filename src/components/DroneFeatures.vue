<template>
  <section ref="sectionRef">
    <div class="grid md:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
      <!-- Columna izquierda: Atributos -->
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

      <!-- Columna derecha: Componentes interactivos -->
      <div class="sticky top-24 space-y-6">
        <CoverageMap />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import CoverageMap from './CoverageMap.vue';

const features = [
  {
    title: 'Autonomia y Alcance',
    description: 'Vuelos optimizados para cubrir grandes areas. Sistema de baterias intercambiables que permite operacion continua sin interrupciones significativas.'
  },
  {
    title: 'Sistema de Limpieza',
    description: 'Boquillas de precision con presion ajustable y detergentes ecologicos especificos para cada tipo de superficie. Compatible con paneles solares y materiales delicados.'
  },
  {
    title: 'Antenas, sensores y precision',
    description: 'Camara FPV para ir supervisando el trabajo en tiempo real. Sensor frontal para evitar colision con instalacion y antenas GPS y RTK para mayor precision.'
  },
  {
    title: 'Seguridad Total',
    description: 'Geofencing automatico, protocolos de vuelo certificados y operacion remota con mitigacion de riesgos. Elimina completamente el riesgo de trabajo en altura.'
  },
  {
    title: 'Maxima Eficiencia',
    description: 'Hasta 70% mas rapido que metodos tradicionales. Mayor cobertura por hora con reduccion significativa de personal y eliminacion de andamios.'
  }
];

const sectionRef = ref<HTMLElement>();
</script>
