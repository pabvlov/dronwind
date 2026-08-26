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
        <div class="hidden md:flex items-center space-x-1" ref="linksRef">
          <template v-for="link in links" :key="link.name">
            <!-- Dropdown item -->
            <div 
              v-if="link.children" 
              class="relative"
              @mouseenter="openDropdown(link.name)"
              @mouseleave="closeDropdown(link.name)"
            >
              <button
                class="relative text-sm font-medium transition-colors duration-200 px-3 py-2 rounded-lg flex items-center gap-1"
                :class="[
                  isScrolled 
                    ? (isActive(link) ? 'text-red-600' : 'text-gray-600 hover:text-red-600') 
                    : (isActive(link) ? 'text-white' : 'text-white/70 hover:text-white')
                ]"
                @click="toggleDropdown(link.name)"
              >
                {{ link.name }}
                <svg 
                  class="w-3.5 h-3.5 transition-transform duration-200" 
                  :class="{ 'rotate-180': dropdownOpen === link.name }"
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              <Transition
                enter-active-class="transition-all duration-200 ease-out"
                enter-from-class="opacity-0 translate-y-1"
                enter-to-class="opacity-100 translate-y-0"
                leave-active-class="transition-all duration-150 ease-in"
                leave-from-class="opacity-100 translate-y-0"
                leave-to-class="opacity-0 translate-y-1"
              >
                <div
                  v-show="dropdownOpen === link.name"
                  class="absolute top-full left-0 mt-1 w-48 rounded-xl shadow-lg ring-1 ring-black/5 overflow-hidden"
                  :class="isScrolled ? 'bg-white' : 'bg-gray-900/95 backdrop-blur-sm'"
                >
                  <a
                    v-for="child in link.children"
                    :key="child.name"
                    :href="child.href"
                    class="block px-4 py-3 text-sm font-medium transition-colors"
                    :class="[
                      isScrolled 
                        ? 'text-gray-600 hover:text-red-600 hover:bg-red-50' 
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                    ]"
                    @click.prevent="handleLinkClick(child); closeAllDropdowns()"
                  >
                    {{ child.name }}
                  </a>
                </div>
              </Transition>
            </div>
            
            <!-- Regular link -->
            <a 
              v-else
              :href="link.href"
              class="relative text-sm font-medium transition-colors duration-200 px-3 py-2 rounded-lg"
              :class="[
                isScrolled 
                  ? (isActive(link) ? 'text-red-600' : 'text-gray-600 hover:text-red-600') 
                  : (isActive(link) ? 'text-white' : 'text-white/70 hover:text-white')
              ]"
              @click.prevent="handleLinkClick(link)"
            >
              {{ link.name }}
              <span 
                v-if="isActive(link)"
                class="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-red-600 rounded-full"
              />
            </a>
          </template>
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
          aria-label="Toggle menu"
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
      <Transition
        enter-active-class="transition-all duration-300 ease-out"
        enter-from-class="opacity-0 -translate-y-2"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition-all duration-200 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-2"
      >
        <div 
          v-show="mobileMenuOpen"
          class="md:hidden mt-4 py-4 border-t"
          :class="isScrolled ? 'border-gray-100' : 'border-white/20'"
        >
          <div class="flex flex-col space-y-1">
            <template v-for="link in links" :key="link.name">
              <!-- Dropdown parent in mobile -->
              <div v-if="link.children">
                <button
                  class="w-full text-left font-medium py-3 px-3 rounded-lg transition-colors flex items-center justify-between"
                  :class="[
                    isScrolled 
                      ? (isActive(link) ? 'text-red-600 bg-red-50' : 'text-gray-600 hover:text-red-600 hover:bg-gray-50') 
                      : (isActive(link) ? 'text-white bg-white/10' : 'text-white/80 hover:text-white hover:bg-white/10')
                  ]"
                  @click="toggleMobileDropdown(link.name)"
                >
                  {{ link.name }}
                  <svg 
                    class="w-4 h-4 transition-transform duration-200" 
                    :class="{ 'rotate-180': mobileDropdownOpen === link.name }"
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div
                  v-show="mobileDropdownOpen === link.name"
                  class="pl-4 space-y-1 mt-1"
                >
                  <a
                    v-for="child in link.children"
                    :key="child.name"
                    :href="child.href"
                    class="block font-medium py-2 px-3 rounded-lg transition-colors text-sm"
                    :class="[
                      isScrolled 
                        ? 'text-gray-500 hover:text-red-600 hover:bg-gray-50' 
                        : 'text-white/60 hover:text-white hover:bg-white/10'
                    ]"
                    @click.prevent="handleLinkClick(child); closeMobileMenu()"
                  >
                    {{ child.name }}
                  </a>
                </div>
              </div>
              
              <!-- Regular link in mobile -->
              <a 
                v-else
                :href="link.href"
                class="font-medium py-3 px-3 rounded-lg transition-colors"
                :class="[
                  isScrolled 
                    ? (isActive(link) ? 'text-red-600 bg-red-50' : 'text-gray-600 hover:text-red-600 hover:bg-gray-50') 
                    : (isActive(link) ? 'text-white bg-white/10' : 'text-white/80 hover:text-white hover:bg-white/10')
                ]"
                @click.prevent="handleLinkClick(link); closeMobileMenu()"
              >
                {{ link.name }}
              </a>
            </template>
            <a 
              href="https://wa.me/56954080730"
              target="_blank"
              rel="noopener noreferrer"
              class="bg-red-600 text-white text-center font-bold px-5 py-3 rounded-lg mt-3"
              @click="closeMobileMenu"
            >
              Cotizar ahora
            </a>
          </div>
        </div>
      </Transition>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue';

interface NavLink {
  name: string;
  href: string;
  children?: NavLink[];
}

const mobileMenuOpen = ref(false);
const dropdownOpen = ref<string | null>(null);
const mobileDropdownOpen = ref<string | null>(null);
const scrollY = ref(0);
const activeSection = ref('');
const navRef = ref<HTMLElement>();

const isScrolled = computed(() => scrollY.value > 50);

const navClasses = computed(() => ({
  'bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm': isScrolled.value,
  'bg-transparent': !isScrolled.value
}));

const links: NavLink[] = [
  { name: 'Inicio', href: '/#inicio' },
  { name: 'Demo', href: '/#demo' },
  { name: 'Beneficios', href: '/#beneficios' },
  { 
    name: 'Drones', 
    href: '/#drones',
    children: [
      { name: 'Joyance JTC10', href: '/drones/jtc10' },
      { name: 'Joyance JTC30', href: '/drones/jtc30' }
    ]
  },
  { name: 'Contacto', href: '/#contacto' }
];

// Detect which section is currently in view
const updateActiveSection = () => {
  const sectionIds = links
    .filter(l => !l.children)
    .map(l => l.href.replace('/#', ''))
    .filter(id => id !== 'inicio');
  
  // Check if we're on the home page
  if (typeof window !== 'undefined' && window.location.pathname !== '/') {
    activeSection.value = '';
    return;
  }
  
  let current = '';
  for (const id of sectionIds) {
    const section = document.getElementById(id);
    if (section) {
      const rect = section.getBoundingClientRect();
      const navHeight = navRef.value?.offsetHeight || 64;
      if (rect.top <= navHeight + 100) {
        current = id;
      }
    }
  }
  
  // If no section is active and we're near the top, mark inicio as active
  if (!current && scrollY.value < 300) {
    current = 'inicio';
  }
  
  activeSection.value = current;
};

const isActive = (link: NavLink) => {
  if (link.children) {
    // Check if any child is active (for drone pages)
    return link.children.some(child => window.location.pathname === child.href);
  }
  const sectionId = link.href.replace('/#', '');
  return activeSection.value === sectionId;
};

const handleScroll = () => {
  scrollY.value = window.scrollY;
  updateActiveSection();
};

const handleLinkClick = (link: NavLink) => {
  const isHomePage = window.location.pathname === '/';
  
  if (link.href.startsWith('/#')) {
    const sectionId = link.href.replace('/#', '');
    
    if (!isHomePage) {
      // On subpage - navigate to home with hash
      window.location.href = link.href;
      return;
    }
    
    if (sectionId === 'inicio') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    
    const section = document.getElementById(sectionId);
    if (section) {
      const navHeight = navRef.value?.offsetHeight || 64;
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

const openDropdown = (name: string) => {
  dropdownOpen.value = name;
};

const closeDropdown = (name: string) => {
  if (dropdownOpen.value === name) {
    dropdownOpen.value = null;
  }
};

const toggleDropdown = (name: string) => {
  dropdownOpen.value = dropdownOpen.value === name ? null : name;
};

const closeAllDropdowns = () => {
  dropdownOpen.value = null;
};

const toggleMobileDropdown = (name: string) => {
  mobileDropdownOpen.value = mobileDropdownOpen.value === name ? null : name;
};

// Close mobile menu when clicking outside
const handleClickOutside = (event: MouseEvent) => {
  if (mobileMenuOpen.value && navRef.value && !navRef.value.contains(event.target as Node)) {
    closeMobileMenu();
  }
  // Close dropdowns when clicking outside
  if (dropdownOpen.value && navRef.value && !navRef.value.contains(event.target as Node)) {
    closeAllDropdowns();
  }
};

// Close mobile menu on escape key
const handleEscape = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    if (mobileMenuOpen.value) closeMobileMenu();
    if (dropdownOpen.value) closeAllDropdowns();
  }
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true });
  document.addEventListener('click', handleClickOutside);
  document.addEventListener('keydown', handleEscape);
  handleScroll();
  updateActiveSection();
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
  document.removeEventListener('click', handleClickOutside);
  document.removeEventListener('keydown', handleEscape);
});
</script>
