<template>
  <div class="experience-container" ref="containerRef">
    <!-- Capítulos pinneados — cada uno es 100vh sticky -->
    <section 
      v-for="(chapter, index) in chapters" 
      :key="index"
      class="chapter"
      :id="`chapter-${index}`"
    >
      <div class="chapter-sticky">
        <!-- Canvas de video de fondo -->
        <canvas 
          class="chapter-canvas"
          ref="el => canvasRefs[index] = el"
        ></canvas>
        
        <!-- Overlay de gradiente para legibilidad -->
        <div class="chapter-overlay" :class="chapter.overlay"></div>
        
        <!-- Contenido del capítulo -->
        <div class="chapter-content">
          <!-- Título principal -->
          <h2 
            class="chapter-title"
            :class="{ 'is-visible': activeChapter === index && chapterProgress > 0.2 }"
          >
            <span 
              v-for="(line, lineIndex) in chapter.titleLines" 
              :key="lineIndex"
              class="title-line"
              :style="{ transitionDelay: `${lineIndex * 0.15}s` }"
            >
              {{ line }}
            </span>
          </h2>
          
          <!-- Subtítulo / body -->
          <p 
            class="chapter-subtitle"
            :class="{ 'is-visible': activeChapter === index && chapterProgress > 0.4 }"
          >
            {{ chapter.subtitle }}
          </p>
          
          <!-- Elementos interactivos desbloqueables -->
          <div 
            v-if="chapter.elements"
            class="chapter-elements"
          >
            <div
              v-for="(element, elIndex) in chapter.elements"
              :key="elIndex"
              class="element-card"
              :class="{ 
                'is-visible': activeChapter === index && chapterProgress > element.triggerAt,
                'is-hovered': hoveredElement === `${index}-${elIndex}`
              }"
              :style="{ transitionDelay: `${(element.triggerAt - 0.3) * 0.5}s` }"
              @mouseenter="hoveredElement = `${index}-${elIndex}`"
              @mouseleave="hoveredElement = null"
            >
              <span class="element-icon">{{ element.icon }}</span>
              <div class="element-text">
                <strong>{{ element.title }}</strong>
                <span v-if="element.subtitle">{{ element.subtitle }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Navegación lateral -->
    <nav class="chapter-nav" v-if="isDesktop">
      <button
        v-for="(chapter, index) in chapters"
        :key="index"
        class="nav-dot"
        :class="{ active: activeChapter === index }"
        @click="scrollToChapter(index)"
        :title="chapter.navLabel"
      >
        <span class="nav-label">{{ chapter.navLabel }}</span>
      </button>
    </nav>
    
    <!-- Progress bar top -->
    <div class="progress-bar">
      <div class="progress-fill" :style="{ width: `${totalProgress * 100}%` }"></div>
    </div>
    
    <!-- Skip button -->
    <button class="skip-button" @click="scrollToEnd">
      Saltar experiencia →
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { gsap, ScrollTrigger } from '../utils/gsap';

interface ChapterElement {
  icon: string;
  title: string;
  subtitle?: string;
  triggerAt: number; // 0-1 progreso del capítulo
}

interface Chapter {
  navLabel: string;
  titleLines: string[];
  subtitle: string;
  overlay: 'bottom-heavy' | 'center' | 'top-heavy' | 'none';
  elements?: ChapterElement[];
  frameStart: number;
  frameEnd: number;
}

const chapters: Chapter[] = [
  {
    navLabel: 'Intro',
    titleLines: ['DRONWIND'],
    subtitle: 'Limpieza con drones. Sin riesgos. Sin andamios. Sin límites.',
    overlay: 'bottom-heavy',
    frameStart: 1,
    frameEnd: 50
  },
  {
    navLabel: 'El Problema',
    titleLines: ['La limpieza en altura', 'es el trabajo', 'más peligroso.'],
    subtitle: '',
    overlay: 'center',
    elements: [
      { icon: '⚠️', title: '3,200', subtitle: 'accidentes laborales/año en Chile', triggerAt: 0.6 }
    ],
    frameStart: 51,
    frameEnd: 120
  },
  {
    navLabel: 'La Solución',
    titleLines: ['Hasta donde', 'llega la tecnología.'],
    subtitle: '',
    overlay: 'center',
    elements: [
      { icon: '🛡️', title: 'Cero riesgo humano', subtitle: 'Elimina el factor humano en altura', triggerAt: 0.4 },
      { icon: '⚡', title: '70% más rápido', subtitle: 'De días a horas', triggerAt: 0.5 },
      { icon: '💧', title: '70% menos agua', subtitle: 'Tecnología de recirculación', triggerAt: 0.6 },
      { icon: '🌱', title: 'Cero químicos', subtitle: 'Solo agua a presión', triggerAt: 0.7 }
    ],
    frameStart: 121,
    frameEnd: 200
  },
  {
    navLabel: 'Tecnología',
    titleLines: ['Precisión que', 'no se negocia.'],
    subtitle: '',
    overlay: 'center',
    frameStart: 201,
    frameEnd: 300
  },
  {
    navLabel: 'Acción',
    titleLines: ['Resultados', 'que se ven.'],
    subtitle: '',
    overlay: 'center',
    elements: [
      { icon: '', title: '12,500 m²', subtitle: 'limpiados', triggerAt: 0.4 },
      { icon: '', title: '850 horas', subtitle: 'ahorradas', triggerAt: 0.5 },
      { icon: '', title: '127 proyectos', subtitle: 'completados', triggerAt: 0.6 },
      { icon: '', title: '0', subtitle: 'accidentes', triggerAt: 0.7 }
    ],
    frameStart: 301,
    frameEnd: 380
  },
  {
    navLabel: 'Resultado',
    titleLines: ['Tu edificio.', 'Mejor.'],
    subtitle: '',
    overlay: 'bottom-heavy',
    frameStart: 381,
    frameEnd: 436
  }
];

const containerRef = ref<HTMLElement>();
const canvasRefs = ref<(HTMLCanvasElement | null)[]>([]);
const activeChapter = ref(0);
const chapterProgress = ref(0);
const totalProgress = ref(0);
const hoveredElement = ref<string | null>(null);
const isDesktop = ref(false);

let triggers: ScrollTrigger[] = [];

onMounted(() => {
  if (typeof window === 'undefined') return;
  
  isDesktop.value = window.innerWidth >= 1024;
  
  // Crear un ScrollTrigger por capítulo
  chapters.forEach((chapter, index) => {
    const el = document.getElementById(`chapter-${index}`);
    if (!el) return;
    
    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top top',
      end: 'bottom top',
      pin: true,
      pinSpacing: true,
      scrub: 1,
      onUpdate: (self) => {
        if (self.isActive) {
          activeChapter.value = index;
          chapterProgress.value = self.progress;
        }
      }
    });
    
    triggers.push(trigger);
  });
  
  // ScrollTrigger global para progreso total
  const globalTrigger = ScrollTrigger.create({
    trigger: containerRef.value,
    start: 'top top',
    end: 'bottom bottom',
    onUpdate: (self) => {
      totalProgress.value = self.progress;
    }
  });
  triggers.push(globalTrigger);
});

onUnmounted(() => {
  triggers.forEach(t => t.kill());
});

const scrollToChapter = (index: number) => {
  const el = document.getElementById(`chapter-${index}`);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
};

const scrollToEnd = () => {
  const lastChapter = document.getElementById(`chapter-${chapters.length - 1}`);
  if (lastChapter) {
    lastChapter.scrollIntoView({ behavior: 'smooth' });
  }
};
</script>

<style scoped>
.experience-container {
  position: relative;
  background: #000;
}

.chapter {
  position: relative;
  height: 100vh;
  width: 100%;
}

.chapter-sticky {
  position: sticky;
  top: 0;
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.chapter-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.chapter-overlay {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.chapter-overlay.bottom-heavy {
  background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 40%, transparent 70%);
}

.chapter-overlay.center {
  background: radial-gradient(ellipse at center, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 50%, transparent 80%);
}

.chapter-overlay.top-heavy {
  background: linear-gradient(to bottom, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 40%, transparent 70%);
}

.chapter-content {
  position: relative;
  z-index: 10;
  text-align: center;
  padding: 2rem;
  max-width: 900px;
}

.chapter-title {
  display: flex;
  flex-direction: column;
  gap: 0.2em;
  margin-bottom: 1.5rem;
}

.title-line {
  display: block;
  font-size: clamp(2.5rem, 8vw, 6rem);
  font-weight: 900;
  color: #fff;
  line-height: 1.1;
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.8s ease, transform 0.8s ease;
}

.chapter-title.is-visible .title-line {
  opacity: 1;
  transform: translateY(0);
}

.chapter-subtitle {
  font-size: clamp(1rem, 2.5vw, 1.5rem);
  color: rgba(255,255,255,0.85);
  line-height: 1.5;
  max-width: 600px;
  margin: 0 auto;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease 0.3s, transform 0.6s ease 0.3s;
}

.chapter-subtitle.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.chapter-elements {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
}

.element-card {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.5rem;
  background: rgba(0,0,0,0.7);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(220, 38, 38, 0.3);
  border-radius: 12px;
  color: #fff;
  opacity: 0;
  transform: translateY(30px) scale(0.95);
  transition: all 0.5s ease;
  cursor: default;
}

.element-card.is-visible {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.element-card.is-hovered {
  transform: translateY(-4px) scale(1.02);
  border-color: rgba(220, 38, 38, 0.6);
  box-shadow: 0 8px 30px rgba(220, 38, 38, 0.15);
}

.element-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.element-text {
  display: flex;
  flex-direction: column;
  text-align: left;
}

.element-text strong {
  font-size: 1.1rem;
  font-weight: 700;
}

.element-text span {
  font-size: 0.85rem;
  color: rgba(255,255,255,0.7);
}

/* Navegación lateral */
.chapter-nav {
  position: fixed;
  left: 2rem;
  top: 50%;
  transform: translateY(-50%);
  z-index: 100;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.nav-dot {
  position: relative;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: rgba(255,255,255,0.3);
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.nav-dot.active {
  background: #DC2626;
  transform: scale(1.3);
}

.nav-label {
  position: absolute;
  left: 24px;
  top: 50%;
  transform: translateY(-50%);
  white-space: nowrap;
  font-size: 0.75rem;
  color: rgba(255,255,255,0.7);
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.nav-dot:hover .nav-label {
  opacity: 1;
}

/* Progress bar */
.progress-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: rgba(255,255,255,0.1);
  z-index: 100;
}

.progress-fill {
  height: 100%;
  background: #DC2626;
  transition: width 0.1s linear;
}

/* Skip button */
.skip-button {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 100;
  padding: 0.75rem 1.5rem;
  background: rgba(0,0,0,0.6);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255,255,255,0.2);
  border-radius: 8px;
  color: rgba(255,255,255,0.7);
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.skip-button:hover {
  background: rgba(220, 38, 38, 0.8);
  border-color: #DC2626;
  color: #fff;
}

/* Responsive */
@media (max-width: 1023px) {
  .chapter-nav {
    display: none;
  }
  
  .chapter-elements {
    flex-direction: column;
    align-items: center;
  }
  
  .element-card {
    width: 100%;
    max-width: 300px;
  }
}
</style>
