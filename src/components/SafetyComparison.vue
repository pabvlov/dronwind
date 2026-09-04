<template>
  <section class="relative py-20 md:py-32 bg-black overflow-hidden">
    <div class="[width:auto] m-[10%] md:m-4">
      <div class="max-w-6xl mx-auto">
        <!-- Header -->
        <div class="text-center mb-12 md:mb-16">
          <h2 
            class="text-3xl md:text-5xl font-black text-white mb-4"
            style="font-family: 'Montserrat', sans-serif;"
          >
            El futuro de la limpieza<br>ya está <span class="text-red-600">volando</span>
          </h2>
          <p class="text-gray-400 text-lg max-w-2xl mx-auto">
            No arriesgues personas. No uses andamios. No detengas tu operación.
            La tecnología de drones hace la limpieza en altura más segura, rápida y eficiente.
          </p>
        </div>

        <!-- Image comparison -->
        <div 
          ref="containerRef"
          class="relative w-full max-w-4xl mx-auto aspect-[4/3] rounded-2xl overflow-hidden cursor-ew-resize select-none"
          @mousemove="handleMove"
          @touchmove="handleTouch"
          @mousedown="startDrag"
          @touchstart="startDrag"
          @mouseup="stopDrag"
          @touchend="stopDrag"
          @mouseleave="stopDrag"
        >
          <!-- Background image (not zoomed / normal) -->
          <img 
            src="/assets/images/hombre-colgando-not-zoomed.webp" 
            alt="Trabajador en altura con riesgo de accidente"
            class="absolute inset-0 w-full h-full object-cover"
            draggable="false"
          />
          
          <!-- Overlay dark gradient for text readability -->
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          <!-- Zoomed image (revealed on drag) -->
          <div 
            class="absolute inset-0 overflow-hidden"
            :style="{ clipPath: `inset(0 ${100 - position}% 0 0)` }"
          >
            <img 
              src="/assets/images/hombre-colgando-zoomed.webp" 
              alt="Detalle del riesgo de trabajar en altura"
              class="absolute inset-0 w-full h-full object-cover"
              draggable="false"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>

          <!-- Slider line -->
          <div 
            class="absolute top-0 bottom-0 w-1 bg-red-600 shadow-lg"
            :style="{ left: `${position}%`, transform: 'translateX(-50%)' }"
          >
            <!-- Slider handle -->
            <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-red-600 rounded-full flex items-center justify-center shadow-xl border-2 border-white">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4"/>
              </svg>
            </div>
          </div>

          <!-- Labels -->
          <div class="absolute bottom-6 left-6 bg-black/70 backdrop-blur-sm px-4 py-2 rounded-lg">
            <span class="text-white text-sm font-semibold">Limpieza tradicional</span>
          </div>
          <div class="absolute bottom-6 right-6 bg-red-600/90 backdrop-blur-sm px-4 py-2 rounded-lg">
            <span class="text-white text-sm font-semibold">Alto riesgo</span>
          </div>
        </div>

        <!-- Bottom CTA -->
        <div class="text-center mt-12">
          <p class="text-gray-300 text-lg mb-6">
            Con Dronwind, eliminas el riesgo humano y obtienes resultados superiores.
          </p>
          <a 
            href="/#demo" 
            class="inline-block bg-red-600 hover:bg-red-700 text-white font-bold text-lg px-10 py-5 rounded-xl transition-all duration-300 hover:scale-105 border-0"
          >
            Ver cómo funciona
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const containerRef = ref<HTMLElement>();
const position = ref(50);
const isDragging = ref(false);

const updatePosition = (clientX: number) => {
  if (!containerRef.value) return;
  const rect = containerRef.value.getBoundingClientRect();
  const x = clientX - rect.left;
  const pct = (x / rect.width) * 100;
  position.value = Math.max(0, Math.min(100, pct));
};

const handleMove = (e: MouseEvent) => {
  if (!isDragging.value) return;
  updatePosition(e.clientX);
};

const handleTouch = (e: TouchEvent) => {
  if (!isDragging.value) return;
  e.preventDefault();
  updatePosition(e.touches[0].clientX);
};

const startDrag = () => {
  isDragging.value = true;
};

const stopDrag = () => {
  isDragging.value = false;
};

onMounted(() => {
  // Auto-animate slightly on load to hint interactivity
  setTimeout(() => {
    position.value = 45;
    setTimeout(() => {
      position.value = 50;
    }, 400);
  }, 800);
});
</script>
