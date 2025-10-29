<template>
  <nav class="fixed top-0 left-0 right-0 z-50 transition-all duration-300" :class="navClasses" ref="navRef">
    <div class="container mx-auto px-6 py-4">
      <div class="flex items-center justify-between">
        <!-- Logo -->
        <div class="flex items-center space-x-2" ref="logoRef">
          <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span class="text-white font-bold text-sm">D</span>
          </div>
          <span class="font-bold text-xl text-gray-800">Dronwind</span>
        </div>
        
        <!-- Navigation Links -->
        <div class="hidden md:flex items-center space-x-8" ref="linksRef">
          <a 
            v-for="link in links" 
            :key="link.name"
            :href="link.href"
            class="text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium"
            @mouseenter="handleLinkHover"
          >
            {{ link.name }}
          </a>
        </div>
        
        <!-- Mobile Menu Button -->
        <button 
          @click="toggleMobileMenu"
          class="md:hidden w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
          ref="mobileButtonRef"
        >
          <div class="w-5 h-5 relative">
            <span class="absolute w-full h-0.5 bg-gray-600 transition-all duration-300" :class="mobileMenuOpen ? 'top-2 rotate-45' : 'top-1'"></span>
            <span class="absolute w-full h-0.5 bg-gray-600 top-2 transition-all duration-300" :class="mobileMenuOpen ? 'opacity-0' : 'opacity-100'"></span>
            <span class="absolute w-full h-0.5 bg-gray-600 transition-all duration-300" :class="mobileMenuOpen ? 'top-2 -rotate-45' : 'top-3'"></span>
          </div>
        </button>
      </div>
      
      <!-- Mobile Menu -->
      <div 
        v-if="mobileMenuOpen"
        class="md:hidden mt-4 py-4 border-t border-gray-200"
        ref="mobileMenuRef"
      >
        <div class="flex flex-col space-y-4">
          <a 
            v-for="link in links" 
            :key="link.name"
            :href="link.href"
            class="text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium py-2"
            @click="closeMobileMenu"
          >
            {{ link.name }}
          </a>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { animateIn, addHoverEffect, gsap } from '../utils/gsap';

// Props
interface Props {
  transparent?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  transparent: false
});

// State
const scrollY = ref(0);
const mobileMenuOpen = ref(false);

// Refs
const navRef = ref<HTMLElement>();
const logoRef = ref<HTMLElement>();
const linksRef = ref<HTMLElement>();
const mobileButtonRef = ref<HTMLElement>();
const mobileMenuRef = ref<HTMLElement>();

// Navigation links
const links = [
  { name: 'Inicio', href: '#' },
  { name: 'Características', href: '#features' },
  { name: 'Documentación', href: '#docs' },
  { name: 'Contacto', href: '#contact' }
];

// Computed
const navClasses = computed(() => ({
  'bg-white/95 backdrop-blur-sm shadow-lg': scrollY.value > 50,
  'bg-transparent': scrollY.value <= 50 && props.transparent,
  'bg-white shadow-sm': scrollY.value <= 50 && !props.transparent
}));

// Methods
const handleScroll = () => {
  scrollY.value = window.scrollY;
};

const handleLinkHover = (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  if (!gsap) return;
  
  gsap.to(target, {
    scale: 1.05,
    duration: 0.2,
    ease: "power2.out"
  });
  
  target.addEventListener('mouseleave', () => {
    gsap.to(target, {
      scale: 1,
      duration: 0.2,
      ease: "power2.out"
    });
  }, { once: true });
};

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value;
  
  if (mobileMenuOpen.value && mobileMenuRef.value) {
    // Animar apertura del menú móvil
    gsap.fromTo(mobileMenuRef.value, 
      { height: 0, opacity: 0 },
      { height: 'auto', opacity: 1, duration: 0.3, ease: "power2.out" }
    );
  }
};

const closeMobileMenu = () => {
  if (mobileMenuRef.value && gsap) {
    gsap.to(mobileMenuRef.value, {
      height: 0,
      opacity: 0,
      duration: 0.2,
      ease: "power2.in",
      onComplete: () => {
        mobileMenuOpen.value = false;
      }
    });
  } else {
    mobileMenuOpen.value = false;
  }
};

// Lifecycle
onMounted(() => {
  // Agregar listener de scroll
  window.addEventListener('scroll', handleScroll);
  
  // Animaciones de entrada
  if (logoRef.value) {
    animateIn(logoRef.value, 0.1);
  }
  
  if (linksRef.value) {
    animateIn(linksRef.value, 0.2);
  }
  
  if (mobileButtonRef.value) {
    addHoverEffect(mobileButtonRef.value);
  }
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>