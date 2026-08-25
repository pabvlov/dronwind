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

// Renderizar frame en el canvas — CONTAIN (ver imagen completa, sin recortar)
const renderFrame = (frameIndex: number) => {
  const canvas = canvasRef.value;
  if (!canvas || !images[frameIndex]) return;
  
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  
  const img = images[frameIndex];
  
  // Usar tamaño CSS (no el backing store multiplicado por DPR)
  const cssWidth = parseFloat(canvas.style.width) || canvas.clientWidth;
  const cssHeight = parseFloat(canvas.style.height) || canvas.clientHeight;
  
  // Limpiar canvas (fondo negro)
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, cssWidth, cssHeight);
  
  // Calcular dimensiones para CONTAIN (ver imagen completa)
  const scale = Math.min(
    cssWidth / img.naturalWidth,
    cssHeight / img.naturalHeight
  );
  
  const drawWidth = img.naturalWidth * scale;
  const drawHeight = img.naturalHeight * scale;
  const x = (cssWidth - drawWidth) / 2;
  const y = (cssHeight - drawHeight) / 2;
  
  ctx.drawImage(img, x, y, drawWidth, drawHeight);
};

// Redimensionar canvas manteniendo aspect ratio 16:9 del contenedor
const resizeCanvas = () => {
  const canvas = canvasRef.value;
  const container = canvas?.parentElement;
  if (!canvas || !container) return;
  
  const containerWidth = container.clientWidth;
  const containerHeight = container.clientHeight;
  
  // Aspect ratio del video (16:9)
  const videoRatio = 16 / 9;
  const containerRatio = containerWidth / containerHeight;
  
  let canvasWidth, canvasHeight;
  
  if (containerRatio > videoRatio) {
    // Contenedor más ancho que 16:9 → limitar por altura
    canvasHeight = containerHeight;
    canvasWidth = canvasHeight * videoRatio;
  } else {
    // Contenedor más alto que 16:9 → limitar por ancho
    canvasWidth = containerWidth;
    canvasHeight = canvasWidth / videoRatio;
  }
  
  // Aplicar tamaño CSS
  canvas.style.width = canvasWidth + 'px';
  canvas.style.height = canvasHeight + 'px';
  
  // Tamaño interno del canvas (resolución de rendering)
  const dpr = window.devicePixelRatio || 1;
  canvas.width = canvasWidth * dpr;
  canvas.height = canvasHeight * dpr;
  
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.scale(dpr, dpr);
  }
  
  // Re-renderizar frame actual si existe
  if (images.length > 0 && currentFrame >= 0) {
    renderFrame(currentFrame);
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
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
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
</style>
