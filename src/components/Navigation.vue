<template>
  <nav 
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-300" 
    :class="navClasses"
    ref="navRef"
  >
    <div class="container mx-auto px-6 py-4">
      <div class="flex items-center justify-between">
        <!-- Logo -->
        <a href="/" class="flex items-center space-x-2" ref="logoRef">
          <span 
            class="font-black text-xl tracking-tight transition-colors duration-300" 
            :class="isScrolled ? 'text-gray-900' : 'text-white'"
            style="font-family: 'Montserrat', sans-serif;"
          >
            Dron<span class="text-red-600">w</span>ind
          </span>
        </a>
        
        <!-- Navigation Links -->
        <div class="hidden md:flex items-center space-x-8" ref="linksRef">
          <a 
            v-for="link in links" 
            :key="link.name"
            :href="link.href"
            class="text-sm font-medium transition-colors duration-200"
            :class="isScrolled ? 'text-gray-600 hover:text-red-600' : 'text-white/80 hover:text-white'"
            @click.prevent="handleLinkClick(link)"
          >
            {{ link.name }}
          </a>
        </div>
        
        <!-- CTA Button -->
        <a 
          href="https://wa.me/56954080730"
          target="_blank"
          rel="noopener noreferrer"
          class="hidden md:inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white text-sm font-bold px-5 py-2.5 rounded-lg transition-all duration-300 hover:scale-105"
        >
          Cotizar
        </a>
        
        <!-- Mobile Menu Button -->
        <button 
          @click="toggleMobileMenu"
          class="md:hidden w-10 h-10 flex items-center justify-center rounded-lg border transition-colors"
          :class="isScrolled ? 'border-gray-200 hover:bg-gray-50' : 'border-white/30 hover:bg-white/10'"
          ref="mobileButtonRef"
        >
          <div class="w-5 h-5 relative">
            <span class="absolute w-full h-0.5 transition-all duration-300"
                  :class="[isScrolled ? 'bg-gray-600' : 'bg-white', mobileMenuOpen ? 'top-2 rotate-45' : 'top-1']"></span>
            <span class="absolute w-full h-0.5 top-2 transition-all duration-300"
                  :class="[isScrolled ? 'bg-gray-600' : 'bg-white', mobileMenuOpen ? 'opacity-0' : 'opacity-100']"></span>
            <span class="absolute w-full h-0.5 transition-all duration-300"
                  :class="[isScrolled ? 'bg-gray-600' : 'bg-white', mobileMenuOpen ? 'top-2 -rotate-45' : 'top-3']"></span>
          </div>
        </button>
      </div>
      
      <!-- Mobile Menu -->
      <div 
        v-if="mobileMenuOpen"
        class="md:hidden mt-4 py-4 border-t"
        :class="isScrolled ? 'border-gray-100' : 'border-white/20'"
      >
        <div class="flex flex-col space-y-4">
          <a 
            v-for="link in links" 
            :key="link.name"
            :href="link.href"
            class="font-medium py-2 transition-colors"
            :class="isScrolled ? 'text-gray-600 hover:text-red-600' : 'text-white/80 hover:text-white'"
            @click.prevent="handleLinkClick(link); closeMobileMenu()"
          >
            {{ link.name }}
          </a>
          <a 
            href="https://wa.me/56954080730"
            target="_blank"
            rel="noopener noreferrer"
            class="bg-red-600 text-white text-center font-bold px-5 py-3 rounded-lg mt-2"
          >
            Cotizar ahora
          </a>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue';

const mobileMenuOpen = ref(false);
const scrollY = ref(0);

const isScrolled = computed(() => scrollY.value > 50);

const navClasses = computed(() => ({
  'bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm': isScrolled.value,
  'bg-transparent': !isScrolled.value
}));

const links = [
  { name: 'Inicio', href: '/#inicio' },
  { name: 'Demo', href: '/#demo' },
  { name: 'Beneficios', href: '/#beneficios' },
  { name: 'Drones', href: '/#drones' },
  { name: 'Contacto', href: '/#contacto' }
];

const handleScroll = () => {
  scrollY.value = window.scrollY;
};

const handleLinkClick = (link: { name: string; href: string }) => {
  if (link.href.startsWith('/#')) {
    const sectionId = link.href.replace('/#', '');
    const section = document.getElementById(sectionId);
    
    if (section) {
      const navHeight = 64;
      const sectionTop = section.offsetTop - navHeight;
      window.scrollTo({ top: sectionTop, behavior: 'smooth' });
    }
  } else {
    window.location.href = link.href;
  }
};

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value;
};

const closeMobileMenu = () => {
  mobileMenuOpen.value = false;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>
