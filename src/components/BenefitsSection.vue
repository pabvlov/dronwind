<template>
  <section class="relative">
    <div class="container mx-auto px-6">
      <!-- Beneficios Clave -->
      <div class="mb-20">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-5xl font-black text-gray-900 mb-4" style="font-family: 'Montserrat', sans-serif;">
            Beneficios Clave
          </h2>
          <p class="text-gray-500 max-w-2xl mx-auto">
            Tecnologia que transforma la limpieza industrial y comercial
          </p>
        </div>
        
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          <div 
            v-for="(benefit, index) in benefits" 
            :key="index"
            class="bg-white rounded-2xl p-6 border border-gray-100 hover:border-red-200 hover:shadow-lg transition-all duration-300 group"
          >
            <div class="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center mb-4 group-hover:bg-red-600 transition-colors duration-300">
              <component :is="benefit.icon" class="w-6 h-6 text-red-600 group-hover:text-white transition-colors" />
            </div>
            <h3 class="text-lg font-bold text-gray-900 mb-2">{{ benefit.title }}</h3>
            <p class="text-sm text-gray-500">{{ benefit.description }}</p>
          </div>
        </div>
      </div>

      <!-- Superficies que Limpiamos -->
      <div>
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-5xl font-black text-gray-900 mb-4" style="font-family: 'Montserrat', sans-serif;">
            Superficies que Limpiamos
          </h2>
          <p class="text-gray-500 max-w-2xl mx-auto">
            Soluciones especializadas para cada tipo de superficie
          </p>
        </div>
        
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
          <div 
            v-for="(surface, index) in surfaces" 
            :key="index"
            class="group bg-white rounded-xl p-5 border border-gray-100 hover:border-red-200 hover:shadow-md transition-all duration-300"
          >
            <div class="flex items-start gap-4">
              <div class="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center flex-shrink-0 group-hover:bg-red-600 transition-colors">
                <svg class="w-5 h-5 text-red-600 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                </svg>
              </div>
              <div>
                <h3 class="text-base font-bold text-gray-900 group-hover:text-red-600 transition-colors">
                  {{ surface.title }}
                </h3>
                <p class="text-sm text-gray-500">{{ surface.description }}</p>
              </div>
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
    title: 'Reduccion de Tiempo',
    description: 'Hasta 70% mas rapido que metodos tradicionales de limpieza',
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
    description: 'Sin intrusion en espacios privados, operacion completamente externa',
    icon: () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' })
    ])
  },
  {
    title: 'Maxima Eficiencia',
    description: 'Uso optimizado de agua e insumos con menor costo operativo',
    icon: () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' })
    ])
  }
];

const surfaces = [
  { title: 'Fachadas', description: 'Edificios residenciales y comerciales de cualquier altura' },
  { title: 'Vidrios y Curtain Walls', description: 'Limpieza de grandes superficies vidriadas sin rastros' },
  { title: 'Paneles Solares', description: 'Mantenimiento para preservar maxima eficiencia energetica' },
  { title: 'Techos Industriales', description: 'Naves industriales y techos domesticos de dificil acceso' },
  { title: 'Silos y Tanques', description: 'Estructuras de almacenamiento industrial' },
  { title: 'Torres y Antenas', description: 'Infraestructura de alta tension y telecomunicaciones' }
];
</script>
