// Utilidades para GSAP que funcionan tanto en SSR como en el cliente
import { gsap } from 'gsap';

// Verificar si estamos en el navegador
export const isBrowser = typeof window !== 'undefined';

// Configuración base de GSAP
export const initGSAP = () => {
  if (!isBrowser) return null;
  
  // Configuraciones globales de GSAP
  gsap.defaults({
    duration: 1,
    ease: "power2.out"
  });
  
  return gsap;
};

// Timeline reutilizable para animaciones comunes
export const createFadeInTimeline = (targets: string | Element, options = {}) => {
  if (!isBrowser) return null;
  
  const tl = gsap.timeline(options);
  
  tl.fromTo(targets, 
    { 
      opacity: 0, 
      y: 30 
    },
    { 
      opacity: 1, 
      y: 0, 
      duration: 1,
      ease: "power2.out"
    }
  );
  
  return tl;
};

// Animación de entrada para elementos
export const animateIn = (element: string | Element, delay = 0) => {
  if (!isBrowser) return null;
  
  return gsap.fromTo(element,
    {
      opacity: 0,
      y: 50,
      scale: 0.95
    },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.8,
      delay,
      ease: "power2.out"
    }
  );
};

// Hover effect reutilizable
export const addHoverEffect = (element: string | Element) => {
  if (!isBrowser) return null;
  
  const el = typeof element === 'string' ? document.querySelector(element) : element;
  if (!el) return null;
  
  const handleMouseEnter = () => {
    gsap.to(el, {
      scale: 1.05,
      duration: 0.3,
      ease: "power2.out"
    });
  };
  
  const handleMouseLeave = () => {
    gsap.to(el, {
      scale: 1,
      duration: 0.3,
      ease: "power2.out"
    });
  };
  
  el.addEventListener('mouseenter', handleMouseEnter);
  el.addEventListener('mouseleave', handleMouseLeave);
  
  // Función de limpieza
  return () => {
    el.removeEventListener('mouseenter', handleMouseEnter);
    el.removeEventListener('mouseleave', handleMouseLeave);
  };
};

// Exportar GSAP para uso directo
export { gsap };
export default gsap;