<template>
  <div>
    <!-- Botón de activación -->
    <div class="bg-black/70 rounded-xl p-6 border border-red-900/30 text-center">
      <h3 class="text-xl font-bold text-white mb-3">Demo en Vivo</h3>
      <p class="text-sm text-gray-400 mb-4">
        Mira cómo nuestros drones realizan una limpieza completa
      </p>
      <button
        @click="openModal"
        class="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold px-6 py-3 rounded-lg transition-colors duration-200 flex items-center justify-center mx-auto"
      >
        <svg class="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd"></path>
        </svg>
        Ver Demo Completa
      </button>
    </div>

    <!-- Modal con video -->
    <Teleport to="body">
      <Transition name="modal-fade">
        <div 
          v-if="isOpen" 
          class="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90"
          @click="closeModal"
        >
          <div 
            class="relative w-[90vw] max-w-5xl bg-black rounded-xl overflow-hidden shadow-2xl border border-red-900/50"
            @click.stop
          >
            <!-- Botón de cierre -->
            <button
              @click="closeModal"
              class="absolute top-4 right-4 z-10 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full transition-colors duration-200"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>

            <!-- Video Player -->
            <div class="relative aspect-video bg-gray-900">
              <video
                ref="videoRef"
                class="w-full h-full"
                controls
                autoplay
                @ended="handleVideoEnd"
              >
                <source src="/assets/video/demo-cleaning.mp4" type="video/mp4">
                <p class="text-white p-8">
                  Tu navegador no soporta el elemento de video. 
                  <a href="/assets/video/demo-cleaning.mp4" class="text-red-500 underline" download>Descarga el video aquí</a>
                </p>
              </video>

              <!-- Overlay de carga -->
              <div 
                v-if="isLoading" 
                class="absolute inset-0 flex items-center justify-center bg-black/70"
              >
                <div class="text-white text-center">
                  <div class="animate-spin rounded-full h-16 w-16 border-b-4 border-red-500 mx-auto mb-4"></div>
                  <p class="text-lg font-semibold">Cargando video...</p>
                </div>
              </div>
            </div>

            <!-- Descripción debajo del video -->
            <div class="bg-gradient-to-b from-gray-900 to-black p-6 border-t border-red-900/30">
              <h4 class="text-white font-bold text-lg mb-2">Limpieza Profesional con Drones</h4>
              <p class="text-gray-400 text-sm">
                Observa la precisión y eficiencia de nuestra tecnología de limpieza aérea. 
                Acceso a zonas de difícil alcance con total seguridad y sin interrupciones operativas.
              </p>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const isOpen = ref(false);
const isLoading = ref(true);
const videoRef = ref<HTMLVideoElement | null>(null);

const openModal = () => {
  isOpen.value = true;
  isLoading.value = true;
  document.body.style.overflow = 'hidden';
};

const closeModal = () => {
  isOpen.value = false;
  isLoading.value = false;
  document.body.style.overflow = '';
  
  // Pausar video al cerrar
  if (videoRef.value) {
    videoRef.value.pause();
    videoRef.value.currentTime = 0;
  }
};

const handleVideoEnd = () => {
  // Opcional: cerrar modal automáticamente al terminar
  // closeModal();
};

// Detectar cuando el video está listo para reproducirse
watch(videoRef, (video) => {
  if (video) {
    video.addEventListener('loadeddata', () => {
      isLoading.value = false;
    });
  }
});

// Cerrar modal con tecla Escape
if (typeof window !== 'undefined') {
  window.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.key === 'Escape' && isOpen.value) {
      closeModal();
    }
  });
}
</script>

<style scoped>
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active .relative,
.modal-fade-leave-active .relative {
  transition: transform 0.3s ease;
}

.modal-fade-enter-from .relative {
  transform: scale(0.9) translateY(20px);
}

.modal-fade-leave-to .relative {
  transform: scale(0.9) translateY(20px);
}
</style>
