<template>
  <section ref="sectionRef" class="scroll-video-section relative">
    <!-- Spacer para crear espacio de scroll -->
    <div class="scroll-spacer" :style="{ height: scrollHeight + 'vh' }">
      <div class="sticky-container">
        <!-- Canvas para renderizar los frames -->
        <canvas 
          ref="canvasRef" 
          class="video-canvas"
          :width="canvasWidth"
          :height="canvasHeight"
        ></canvas>
        
        <!-- Overlay de texto opcional -->
        <div class="overlay-content">
          <slot />
        </div>
        
        <!-- Indicador de progreso -->
        <div class="scroll-indicator">
          <div class="scroll-line">
            <div class="scroll-progress" :style="{ height: progress * 100 + '%' }"></div>
          </div>
          <span class="scroll-text">Scroll para explorar</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { gsap, ScrollTrigger } from '../utils/gsap';

interface Props {
  frameCount: number;
  framePath: string;
  framePrefix?: string;
  frameExtension?: string;
  startFrame?: number;
  canvasWidth?: number;
  canvasHeight?: number;
  scrollHeight?: number;
}

const props = withDefaults(defineProps<Props>(), {
  framePrefix: 'frame_',
  frameExtension: 'webp',
  startFrame: 1,
  canvasWidth: 1920,
  canvasHeight: 1080,
  scrollHeight: 400
});

const sectionRef = ref<HTMLElement>();
const canvasRef = ref<HTMLCanvasElement>();
const progress = ref(0);

let scrollTriggerInstance: ScrollTrigger | null = null;
let images: HTMLImageElement[] = [];
let currentFrame = 0;

// Generar la ruta de un frame específico
const getFramePath = (index: number): string => {
  const frameNum = String(index).padStart(4, '0');
  return `${props.framePath}/${props.framePrefix}${frameNum}.${props.frameExtension}`;
};

// Precargar todas las imágenes
const preloadImages = (): Promise<HTMLImageElement[]> => {
  const promises: Promise<HTMLImageElement>[] = [];
  
  for (let i = props.startFrame; i <= props.frameCount; i++) {
    const img = new Image();
    const promise = new Promise<HTMLImageElement>((resolve, reject) => {
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = getFramePath(i);
    });
    promises.push(promise);
    images.push(img);
  }
  
  return Promise.all(promises);
};

// Renderizar frame en el canvas
const renderFrame = (frameIndex: number) => {
  const canvas = canvasRef.value;
  if (!canvas || !images[frameIndex]) return;
  
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  
  const img = images[frameIndex];
  
  // Limpiar canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Calcular dimensiones para cover fit
  const scale = Math.max(
    canvas.width / img.naturalWidth,
    canvas.height / img.naturalHeight
  );
  
  const x = (canvas.width - img.naturalWidth * scale) / 2;
  const y = (canvas.height - img.naturalHeight * scale) / 2;
  
  ctx.drawImage(
    img,
    x, y,
    img.naturalWidth * scale,
    img.naturalHeight * scale
  );
};

// Redimensionar canvas para pantalla retina
const resizeCanvas = () => {
  const canvas = canvasRef.value;
  if (!canvas) return;
  
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.scale(dpr, dpr);
  }
};

onMounted(async () => {
  if (typeof window === 'undefined') return;
  
  // Precargar imágenes
  try {
    await preloadImages();
    
    // Renderizar primer frame
    renderFrame(0);
    
    // Crear ScrollTrigger
    scrollTriggerInstance = ScrollTrigger.create({
      trigger: sectionRef.value,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1,
      onUpdate: (self) => {
        progress.value = self.progress;
        const frameIndex = Math.min(
          Math.floor(self.progress * (props.frameCount - 1)),
          props.frameCount - 1
        );
        
        if (frameIndex !== currentFrame) {
          currentFrame = frameIndex;
          renderFrame(frameIndex);
        }
      }
    });
    
    // Handle resize
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
  } catch (error) {
    console.error('Error precargando frames:', error);
  }
});

onUnmounted(() => {
  if (scrollTriggerInstance) {
    scrollTriggerInstance.kill();
  }
  window.removeEventListener('resize', resizeCanvas);
});
</script>

<style scoped>
.scroll-video-section {
  position: relative;
  width: 100%;
}

.scroll-spacer {
  position: relative;
}

.sticky-container {
  position: sticky;
  top: 0;
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: #000;
}

.video-canvas {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.overlay-content {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 10;
  pointer-events: none;
}

.scroll-indicator {
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  z-index: 20;
}

.scroll-line {
  width: 2px;
  height: 60px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 1px;
  overflow: hidden;
  position: relative;
}

.scroll-progress {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: #ef4444;
  transition: height 0.1s linear;
}

.scroll-text {
  color: rgba(255, 255, 255, 0.6);
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 2px;
}

@media (max-width: 768px) {
  .video-canvas {
    object-fit: contain;
  }
}
</style>
