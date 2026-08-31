<template>
  <section class="relative py-12 md:py-32 bg-black overflow-hidden" ref="sectionRef">
    <div class="[width:auto] m-[10px] md:m-4">
      <!-- Header -->
      <div class="text-center mb-12 md:mb-16">
        <h2 class="text-3xl md:text-5xl font-black text-white mb-4" style="font-family: 'Montserrat', sans-serif;">
          Dron<span class="text-red-600">w</span>ind en Acción
        </h2>
        <p class="text-gray-400 text-lg max-w-2xl mx-auto">
          Así trabajamos. Precisión, seguridad y resultados visibles en cada superficie.
        </p>
      </div>

      <!-- Carousel Container -->
      <div class="relative max-w-6xl mx-auto">
        <!-- Main Video Stage -->
        <div class="relative aspect-video rounded-2xl overflow-hidden bg-gray-900 shadow-2xl shadow-red-900/20">
          <div 
            v-for="(video, index) in videos" 
            :key="index"
            class="absolute inset-0 transition-opacity duration-700"
            :class="index === activeIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'"
          >
            <video
              :ref="el => { if (el) videoElements[index] = el as HTMLVideoElement }"
              :src="video.src"
              class="w-full h-full object-cover"
              muted
              :loop="video.loop !== false"
              playsinline
              preload="metadata"
              @ended="nextVideo"
            />
            
            <!-- Video Label Overlay -->
            <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 md:p-8">
              <div class="flex items-end justify-between gap-3">
                <div class="min-w-0">
                  <span class="inline-block px-2 py-0.5 md:px-3 md:py-1 bg-red-600 text-white text-[10px] md:text-xs font-bold rounded-full mb-1 md:mb-2">
                    {{ video.tag }}
                  </span>
                  <h3 class="text-base md:text-2xl font-bold text-white truncate">{{ video.title }}</h3>
                  <p class="text-gray-300 text-xs md:text-sm mt-0.5 md:mt-1 hidden md:block">{{ video.description }}</p>
                </div>
                
                <!-- Play/Pause Toggle -->
                <button 
                  @click="togglePlay(index)"
                  class="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                >
                  <svg v-if="isPlaying[index]" class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <rect x="6" y="4" width="4" height="16" rx="1"/>
                    <rect x="14" y="4" width="4" height="16" rx="1"/>
                  </svg>
                  <svg v-else class="w-5 h-5 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <!-- Navigation Arrows -->
          <button 
            @click="prevVideo"
            class="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white hover:bg-black/70 transition-colors z-20"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
            </svg>
          </button>
          <button 
            @click="nextVideo"
            class="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white hover:bg-black/70 transition-colors z-20"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </button>
        </div>

        <!-- Progress Bar -->
        <div class="mt-6 flex items-center gap-4">
          <div class="flex-1 h-1 bg-gray-800 rounded-full overflow-hidden">
            <div 
              class="h-full bg-red-600 rounded-full transition-all duration-100"
              :style="{ width: `${progress}%` }"
            />
          </div>
          <span class="text-gray-400 text-sm font-mono">
            {{ String(activeIndex + 1).padStart(2, '0') }} / {{ String(videos.length).padStart(2, '0') }}
          </span>
        </div>

        <!-- Thumbnail Strip -->
        <div class="mt-4 md:mt-6 flex gap-2 md:gap-3 overflow-x-auto pb-2 scrollbar-hide px-1">
          <button
            v-for="(video, index) in videos"
            :key="index"
            @click="goToVideo(index)"
            class="relative flex-shrink-0 w-20 h-14 md:w-32 md:h-20 rounded-lg overflow-hidden border-2 transition-all duration-300"
            :class="index === activeIndex ? 'border-red-600 scale-105' : 'border-transparent opacity-50 hover:opacity-80'"
          >
            <video
              :src="video.src"
              class="w-full h-full object-cover"
              muted
              preload="metadata"
            />
            <div 
              v-if="index === activeIndex"
              class="absolute inset-0 bg-red-600/20"
            />
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

interface VideoItem {
  src: string;
  title: string;
  description: string;
  tag: string;
  loop?: boolean;
}

const videos: VideoItem[] = [
  {
    src: '/assets/videos/video-v1-fix-3.webm',
    title: 'Dronwind en Acción',
    description: 'Limpieza profesional con drone JTC10 en fachada de edificio.',
    tag: 'Destacado',
    loop: false
  },
  {
    src: '/assets/videos/video1.webm',
    title: 'Limpieza de Fachada',
    description: 'Drone JTC10 eliminando suciedad acumulada en muros exteriores de gran altura.',
    tag: 'Fachadas'
  },
  {
    src: '/assets/videos/video2.webm',
    title: 'Precisión en Acción',
    description: 'Sistema de rociado de precisión limpiando ventanales y superficies vidriadas.',
    tag: 'Vidrios'
  },
  {
    src: '/assets/videos/video3.webm',
    title: 'Operación Aérea',
    description: 'Vista panorámica del drone en operación de limpieza industrial.',
    tag: 'Industrial'
  }
];

const activeIndex = ref(0);
const isPlaying = ref<boolean[]>(videos.map(() => true));
const videoElements = ref<HTMLVideoElement[]>([]);
const progress = ref(0);
const sectionRef = ref<HTMLElement>();

let autoPlayInterval: ReturnType<typeof setInterval>;
let progressInterval: ReturnType<typeof setInterval>;
const SLIDE_DURATION = 8000; // 8 seconds per slide
const PROGRESS_STEP = 100;

const startAutoPlay = () => {
  // Clear existing intervals
  stopAutoPlay();
  
  // Reset progress
  progress.value = 0;
  
  const currentVideo = videos[activeIndex.value];
  const videoEl = videoElements.value[activeIndex.value];
  
  if (currentVideo.loop !== false) {
    // Video con loop: usar timer de 8 segundos
    const step = 100 / (SLIDE_DURATION / PROGRESS_STEP);
    progressInterval = setInterval(() => {
      progress.value += step;
      if (progress.value >= 100) {
        progress.value = 0;
      }
    }, PROGRESS_STEP);
    
    // Start auto-advance
    autoPlayInterval = setInterval(() => {
      nextVideo();
    }, SLIDE_DURATION);
  } else if (videoEl && videoEl.duration) {
    // Video sin loop: actualizar progreso basado en duración real
    progressInterval = setInterval(() => {
      if (videoEl.duration) {
        progress.value = (videoEl.currentTime / videoEl.duration) * 100;
      }
    }, PROGRESS_STEP);
    // No autoPlayInterval: el video avanza automáticamente al terminar (evento @ended)
  }
};

const stopAutoPlay = () => {
  if (autoPlayInterval) clearInterval(autoPlayInterval);
  if (progressInterval) clearInterval(progressInterval);
};

const playCurrentVideo = () => {
  const video = videoElements.value[activeIndex.value];
  if (video) {
    video.currentTime = 0;
    video.play().catch(() => {});
    isPlaying.value[activeIndex.value] = true;
  }
};

const pauseCurrentVideo = () => {
  const video = videoElements.value[activeIndex.value];
  if (video) {
    video.pause();
    isPlaying.value[activeIndex.value] = false;
  }
};

const nextVideo = () => {
  pauseCurrentVideo();
  activeIndex.value = (activeIndex.value + 1) % videos.length;
  playCurrentVideo();
  progress.value = 0;
  
  // Restart autoplay for new video
  stopAutoPlay();
  startAutoPlay();
};

const prevVideo = () => {
  pauseCurrentVideo();
  activeIndex.value = (activeIndex.value - 1 + videos.length) % videos.length;
  playCurrentVideo();
  progress.value = 0;
  
  // Restart autoplay for new video
  stopAutoPlay();
  startAutoPlay();
};

const goToVideo = (index: number) => {
  if (index === activeIndex.value) return;
  pauseCurrentVideo();
  activeIndex.value = index;
  playCurrentVideo();
  progress.value = 0;
  
  // Reset autoplay timer
  stopAutoPlay();
  startAutoPlay();
};

const togglePlay = (index: number) => {
  const video = videoElements.value[index];
  if (!video) return;
  
  if (video.paused) {
    video.play();
    isPlaying.value[index] = true;
  } else {
    video.pause();
    isPlaying.value[index] = false;
  }
};

// Intersection Observer to pause when not visible
let observer: IntersectionObserver;

onMounted(() => {
  // Wait for DOM
  requestAnimationFrame(() => {
    playCurrentVideo();
    startAutoPlay();
    
    // Setup intersection observer
    if (sectionRef.value) {
      observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            playCurrentVideo();
            startAutoPlay();
          } else {
            pauseCurrentVideo();
            stopAutoPlay();
          }
        });
      }, { threshold: 0.3 });
      
      observer.observe(sectionRef.value);
    }
  });
});

onUnmounted(() => {
  stopAutoPlay();
  if (observer) observer.disconnect();
});
</script>

<style scoped>
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>
