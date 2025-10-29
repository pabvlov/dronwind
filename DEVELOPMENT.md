# Guía de Desarrollo - Dronwind

## 🚀 Inicio Rápido

```bash
# Clonar e instalar
git clone <tu-repo>
cd dronwind
npm install

# Desarrollo
npm run dev
# Abre http://localhost:4321/

# Producción
npm run build
npm run preview
```

## 🎯 Funcionalidades Principales

### 1. Renderizado Híbrido
- **SSR por defecto**: Todas las páginas se renderizan en el servidor
- **Hidratación selectiva**: Componentes Vue se hidratan según necesidad
- **Optimización automática**: Astro maneja la optimización

### 2. Componentes Vue Reactivos
```vue
<!-- Ejemplo de uso -->
<AnimatedCard
  title="Mi Título"
  description="Descripción"
  client:visible
/>
```

### 3. Animaciones GSAP
```typescript
// En componentes Vue
import { animateIn, addHoverEffect } from '../utils/gsap';

onMounted(() => {
  animateIn('.element', 0.2);
  addHoverEffect('.button');
});
```

### 4. Estilos con Tailwind
- Clases utility-first
- Responsive design
- Colores y animaciones personalizadas

## 📦 Scripts Disponibles

- `npm run dev` - Servidor de desarrollo
- `npm run build` - Build para producción
- `npm run preview` - Previsualizar build
- `npm run astro check` - Verificar tipos

## 🛠️ Estructura de Archivos

```
src/
├── components/     # Componentes Vue
├── layouts/        # Layouts Astro
├── pages/          # Páginas del sitio
├── styles/         # CSS global
└── utils/          # Utilidades
```

## 🎨 Directivas de Hidratación

- `client:load` - Hidrata inmediatamente
- `client:visible` - Hidrata cuando es visible
- `client:idle` - Hidrata cuando el navegador está inactivo
- `client:media="(max-width: 768px)"` - Hidrata según media query

## 🔧 Configuración Avanzada

### Astro Config
```javascript
export default defineConfig({
  output: 'server',
  integrations: [vue()],
  adapter: node({ mode: 'standalone' })
});
```

### Tailwind Config
- Colores personalizados
- Animaciones extendidas
- Configuración responsive

## 🚀 Despliegue

### Servidor Node.js
```bash
npm run build
node ./dist/server/entry.mjs
```

### Docker
```dockerfile
FROM node:18-alpine
COPY . .
RUN npm install && npm run build
EXPOSE 4321
CMD ["node", "./dist/server/entry.mjs"]
```

## 📚 Recursos

- [Astro Docs](https://docs.astro.build/)
- [Vue 3 Guide](https://vuejs.org/guide/)
- [GSAP Learning](https://greensock.com/learning/)
- [Tailwind Docs](https://tailwindcss.com/docs)

## 🐛 Solución de Problemas

### Build Errors
- Verificar imports de GSAP
- Comprobar directivas client:*
- Revisar configuración Tailwind

### Rendimiento
- Usar `client:visible` para componentes pesados
- Optimizar imágenes
- Minificar CSS/JS automáticamente

---

¡Feliz desarrollo! 🚁✨