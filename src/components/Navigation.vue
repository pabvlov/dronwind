<template>
  <nav class="fixed top-0 left-0 right-0 z-50 transition-all duration-300" :class="navClasses" ref="navRef">
    <div class="container mx-auto px-6 py-4">
      <div class="flex items-center justify-between">
        <!-- Logo -->
        <a href="/" class="flex items-center space-x-2" ref="logoRef">
          <div class="w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-300"
               :class="isTransparent ? 'bg-red-600' : 'bg-blue-600'">
            <span class="text-white font-bold text-sm">D</span>
          </div>
          <span class="font-bold text-xl transition-colors duration-300"
                :class="isTransparent ? 'text-white' : 'text-gray-800'">Dronwind</span>
        </a>
        
        <!-- Navigation Links -->
        <div class="hidden md:flex items-center space-x-6" ref="linksRef">
          <template v-for="link in links" :key="link.name">
            <!-- Dropdown link -->
            <div 
              v-if="link.children"
              class="relative group"
              @mouseenter="openDropdown(link.name)"
              @mouseleave="closeDropdown(link.name)"
            >
              <a 
                :href="link.href"
                class="transition-colors duration-300 font-medium flex items-center gap-1 py-2"
                :class="isTransparent ? 'text-white hover:text-red-300' : 'text-gray-600 hover:text-blue-600'"
                @click.prevent="handleLinkClick(link)"
              >
                {{ link.name }}
                <svg class="w-4 h-4 transition-transform duration-200" :class="dropdowns[link.name] ? 'rotate-180' : ''" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </a>
              
              <!-- Dropdown menu -->
              <div 
                v-show="dropdowns[link.name]"
                class="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-50"
              >
                <a
                  v-for="child in link.children"
                  :key="child.name"
                  :href="child.href"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
                  @mouseenter="handleLinkHover"
                >
                  {{ child.name }}
                </a>
              </div>
            </div>
            
            <!-- Regular link -->
            <a 
              v-else
              :href="link.href"
              class="transition-colors duration-300 font-medium py-2"
              :class="isTransparent ? 'text-white hover:text-red-300' : 'text-gray-600 hover:text-blue-600'"
              @mouseenter="handleLinkHover"
              @click.prevent="handleLinkClick(link)"
            >
              {{ link.name }}
            </a>
          </template>
        </div>
        
        <!-- Mobile Menu Button -->
        <button 
          @click="toggleMobileMenu"
          class="md:hidden w-10 h-10 flex items-center justify-center rounded-lg border transition-colors"
          :class="isTransparent ? 'border-white/30 hover:bg-white/10' : 'border-gray-200 hover:bg-gray-50'"
          ref="mobileButtonRef"
        >
          <div class="w-5 h-5 relative">
            <span class="absolute w-full h-0.5 transition-all duration-300"
                  :class="[isTransparent ? 'bg-white' : 'bg-gray-600', mobileMenuOpen ? 'top-2 rotate-45' : 'top-1']"></span>
            <span class="absolute w-full h-0.5 top-2 transition-all duration-300"
                  :class="[isTransparent ? 'bg-white' : 'bg-gray-600', mobileMenuOpen ? 'opacity-0' : 'opacity-100']"></span>
            <span class="absolute w-full h-0.5 transition-all duration-300"
                  :class="[isTransparent ? 'bg-white' : 'bg-gray-600', mobileMenuOpen ? 'top-2 -rotate-45' : 'top-3']"></span>
          </div>
        </button>
      </div>
      
      <!-- Mobile Menu -->
      <div 
        v-if="mobileMenuOpen"
        class="md:hidden mt-4 py-4 border-t border-gray-200"
        ref="mobileMenuRef"
      >
        <div class="flex flex-col space-y-2">
          <template v-for="link in links" :key="link.name">
            <!-- Mobile dropdown -->
            <div v-if="link.children">
              <button
                @click="toggleMobileDropdown(link.name)"
                class="w-full text-left text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium py-2 flex items-center justify-between"
              >
                {{ link.name }}
                <svg class="w-4 h-4 transition-transform" :class="mobileDropdowns[link.name] ? 'rotate-180' : ''" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              <div v-show="mobileDropdowns[link.name]" class="pl-4 space-y-2 mt-2">
                <a
                  v-for="child in link.children"
                  :key="child.name"
                  :href="child.href"
                  class="block text-gray-500 hover:text-blue-600 transition-colors py-1"
                  @click="closeMobileMenu"
                >
                  {{ child.name }}
                </a>
              </div>
            </div>
            
            <!-- Mobile regular link -->
            <a 
              v-else
              :href="link.href"
              class="text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium py-2"
              @click.prevent="handleLinkClick(link); closeMobileMenu()"
            >
              {{ link.name }}
            </a>
          </template>
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
const dropdowns = ref<Record<string, boolean>>({});
const mobileDropdowns = ref<Record<string, boolean>>({});
const isHome = ref(false);

// Refs
const navRef = ref<HTMLElement>();
const logoRef = ref<HTMLElement>();
const linksRef = ref<HTMLElement>();
const mobileButtonRef = ref<HTMLElement>();
const mobileMenuRef = ref<HTMLElement>();

// Check if we're on the home page
onMounted(() => {
  if (typeof window !== 'undefined') {
    isHome.value = window.location.pathname === '/';
  }
});

// Navigation links
const links = [
  { name: 'Inicio', href: '/' },
  { name: 'Demo', href: '/#demo' },
  { name: 'Beneficios', href: '/#beneficios' },
  { name: 'Servicios', href: '/#servicios' },
  { 
    name: 'Drones', 
    href: '/drones',
    children: [
      { name: 'JTC10', href: '/drones/jtc10' },
      { name: 'JTC30', href: '/drones/jtc30' }
    ]
  },
  { name: 'Contacto', href: '/#contacto' }
];

// Computed
const navClasses = computed(() => ({
  'bg-white/95 backdrop-blur-sm shadow-lg': scrollY.value > 50,
  'bg-transparent': scrollY.value <= 50 && props.transparent,
  'bg-white shadow-sm': scrollY.value <= 50 && !props.transparent
}));

const isTransparent = computed(() => scrollY.value <= 50 && props.transparent);

// Dropdown handlers
const openDropdown = (name: string) => {
  dropdowns.value[name] = true;
};

const closeDropdown = (name: string) => {
  dropdowns.value[name] = false;
};

const toggleMobileDropdown = (name: string) => {
  mobileDropdowns.value[name] = !mobileDropdowns.value[name];
};

// Link click handler
const handleLinkClick = (link: { name: string; href: string }) => {
  // If it's an anchor link and we're on home page, scroll smoothly
  if (link.href.startsWith('/#') && isHome.value) {
    const sectionId = link.href.replace('/#', '');
    const section = document.getElementById(sectionId);
    
    if (section) {
      const navHeight = navRef.value?.offsetHeight || 0;
      const sectionTop = section.offsetTop - navHeight;
      
      window.scrollTo({
        top: sectionTop,
        behavior: 'smooth'
      });
    }
  } else if (link.href === '/#contacto' && isHome.value) {
    const section = document.getElementById('contacto');
    if (section) {
      const navHeight = navRef.value?.offsetHeight || 0;
      const sectionTop = section.offsetTop - navHeight;
      window.scrollTo({
        top: sectionTop,
        behavior: 'smooth'
      });
    }
  } else {
    // For regular links or when not on home page, let default navigation happen
    window.location.href = link.href;
  }
};

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
  window.addEventListener('scroll', handleScroll);
  
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
