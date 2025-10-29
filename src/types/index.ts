// Tipos globales para el proyecto Dronwind
import type { gsap } from 'gsap';

declare global {
  interface Window {
    gsap: typeof gsap;
  }
}

// Tipos para componentes Vue
export interface AnimatedCardProps {
  title: string;
  description: string;
  buttonText?: string;
  delay?: number;
}

export interface HeroSectionProps {
  title: string;
  subtitle: string;
}

// Tipos para utilidades GSAP
export interface GSAPUtils {
  initGSAP: () => typeof gsap | null;
  createFadeInTimeline: (targets: string | Element, options?: object) => gsap.core.Timeline | null;
  animateIn: (element: string | Element, delay?: number) => gsap.core.Tween | null;
  addHoverEffect: (element: string | Element) => (() => void) | null;
}

// Tipos de configuración
export interface DronwindConfig {
  animations: {
    defaultDuration: number;
    defaultEase: string;
  };
  breakpoints: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
}

export {};