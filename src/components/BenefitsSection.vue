<template>
  <section class="relative">
    <div class="[width:auto] m-[10%] md:m-4">
      <!-- Beneficios Clave -->
      <div class="mb-20">
        <div class="mb-10 text-center">
          <h2 class="text-2xl md:text-3xl font-semibold text-gray-900 mb-2" style="font-family: 'Montserrat', sans-serif;">
            Beneficios Cla<span class="text-red-600">v</span>e
          </h2>
          <p class="text-gray-400 text-sm">
            Tecnología que transforma la limpieza industrial y comercial
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8 max-w-5xl mx-auto">
          <div 
            v-for="(benefit, index) in benefits" 
            :key="index"
            class="flex flex-col gap-3"
          >
            <component :is="benefit.icon" class="w-6 h-6 text-red-600" />
            <div>
              <h3 class="text-base font-medium text-gray-900 mb-1">{{ benefit.title }}</h3>
              <p class="text-sm text-gray-500 leading-relaxed">{{ benefit.description }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Superficies que Limpiamos -->
      <div>
        <div class="mb-10 text-center">
          <h2 class="text-2xl md:text-3xl font-semibold text-gray-900 mb-2" style="font-family: 'Montserrat', sans-serif;">
            Superficies que Limpia<span class="text-red-600">m</span>os
          </h2>
          <p class="text-gray-400 text-sm">
            Soluciones especializadas para cada tipo de superficie
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8 max-w-4xl mx-auto">
          <div 
            v-for="(surface, index) in surfaces" 
            :key="index"
            class="flex flex-col gap-3"
          >
            <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
            </svg>
            <div>
              <h3 class="text-base font-medium text-gray-900 mb-1">{{ surface.title }}</h3>
              <p class="text-sm text-gray-500 leading-relaxed">{{ surface.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { h } from 'vue';

const benefits = [
  {
    title: 'Reducción de Tiempo',
    description: 'Hasta 70% más rápido que métodos tradicionales de limpieza',
    icon: () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' })
    ])
  },
  {
    title: 'Cero Riesgos',
    description: 'Elimina completamente el riesgo de trabajo en altura y uso de andamios',
    icon: () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' })
    ])
  },
  {
    title: 'Mayor Privacidad',
    description: 'Sin intrusión en espacios privados, operación completamente externa',
    icon: () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' })
    ])
  },
  {
    title: 'Máxima Eficiencia',
    description: 'Uso optimizado de agua e insumos con menor costo operativo',
    icon: () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' })
    ])
  }
];

const surfaces = [
  { title: 'Fachadas', description: 'Edificios residenciales y comerciales de cualquier altura' },
  { title: 'Vidrios y Curtain Walls', description: 'Limpieza de grandes superficies vidriadas sin rastros' },
  { title: 'Paneles Solares', description: 'Mantenimiento para preservar máxima eficiencia energética' },
  { title: 'Techos Industriales', description: 'Naves industriales y techos domésticos de difícil acceso' },
  { title: 'Silos y Tanques', description: 'Estructuras de almacenamiento industrial' },
  { title: 'Infraestructura tipo torre y telecomunicaciones', description: 'Estructuras de comunicación y señalización de difícil acceso' }
];
</script>