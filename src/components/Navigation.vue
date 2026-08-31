<template>
  <nav 
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-300 flex flex-col" 
    :class="[navClasses, mobileMenuOpen ? 'min-h-screen bg-white' : '']"
    ref="navRef"
  >
    <div class="px-4 sm:px-6 py-4 [width:auto]" :class="mobileMenuOpen ? 'flex flex-col flex-1' : ''">
      <div class="flex items-center justify-between">
        <!-- Logo -->
        <a href="/" class="flex items-center space-x-2 no-underline" ref="logoRef">
          <span 
            class="font-black text-xl tracking-tight transition-colors duration-300" 
            :class="(isScrolled || mobileMenuOpen) ? 'text-gray-900' : 'text-white'"
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
                class="relative text-sm font-medium transition-colors duration-200 px-3 py-2 rounded-lg flex items-center gap-1 bg-transparent border-0 cursor-pointer"
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
                  class="absolute top-full left-0 mt-1 w-48 rounded-xl shadow-xl ring-1 ring-black/5 overflow-hidden bg-white"
                >
                  <a
                    v-for="child in link.children"
                    :key="child.name"
                    :href="child.href"
                    class="block px-4 py-3 text-sm font-medium text-gray-700 hover:text-red-600 hover:bg-red-50 transition-colors no-underline"
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
              class="relative text-sm font-medium transition-colors duration-200 px-3 py-2 rounded-lg no-underline"
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
        <QuoteModal model="Servicios de limpieza con drones" class="hidden md:block">
          <button
            type="button"
            class="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white text-sm font-bold px-5 py-2.5 rounded-lg transition-all duration-300 hover:scale-105 cursor-pointer border-0"
          >
            Cotizar
          </button>
        </QuoteModal>
        
        <!-- Mobile Menu Button -->
        <button 
          @click.stop="toggleMobileMenu"
          class="md:hidden relative w-11 h-11 flex items-center justify-center border-0 bg-transparent"
          ref="mobileButtonRef"
          aria-label="Toggle menu"
        >
          <svg v-if="mobileMenuOpen" class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
          <svg v-else class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
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
          class="md:hidden mt-4 py-4 border-t border-gray-100 flex-1 overflow-y-auto"
        >
          <div class="flex flex-col space-y-1">
            <template v-for="link in links" :key="link.name">
              <!-- Dropdown parent in mobile -->
              <div v-if="link.children">
                <button
                  class="w-full text-left font-medium py-3 px-3 rounded-lg transition-colors flex items-center justify-between bg-transparent border-0"
                  style="font-family: 'Montserrat', sans-serif;"
                  :class="[
                    isActive(link) ? 'text-red-600 bg-red-50' : 'text-gray-600 hover:text-red-600 hover:bg-gray-50'
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
                    class="block font-medium py-2 px-3 rounded-lg transition-colors text-sm text-gray-500 hover:text-red-600 hover:bg-red-50 no-underline"
                    style="font-family: 'Montserrat', sans-serif;"
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
                class="font-medium py-3 px-3 rounded-lg transition-colors no-underline"
                style="font-family: 'Montserrat', sans-serif;"
                :class="[
                  isActive(link) ? 'text-red-600 bg-red-50' : 'text-gray-600 hover:text-red-600 hover:bg-gray-50'
                ]"
                @click.prevent="handleLinkClick(link); closeMobileMenu()"
              >
                {{ link.name }}
              </a>
            </template>
            <QuoteModal model="Servicios de limpieza con drones">
              <button
                type="button"
                @click="closeMobileMenu"
                class="w-full bg-red-600 hover:bg-red-700 text-white text-center font-bold px-5 py-3 rounded-lg mt-3 cursor-pointer border-0"
                style="font-family: 'Montserrat', sans-serif;"
              >
                Cotizar ahora
              </button>
            </QuoteModal>
          </div>
        </div>
      </Transition>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue';
import QuoteModal from './QuoteModal.vue';

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
const currentPath = ref('');
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
  if (typeof window !== 'undefined' && currentPath.value !== '/') {
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
    return link.children.some(child => currentPath.value === child.href);
  }
  const sectionId = link.href.replace('/#', '');
  return activeSection.value === sectionId;
};

const handleScroll = () => {
  scrollY.value = window.scrollY;
  updateActiveSection();
};

const handleLinkClick = (link: NavLink) => {
  const isHomePage = currentPath.value === '/';
  
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
  currentPath.value = window.location.pathname;
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
