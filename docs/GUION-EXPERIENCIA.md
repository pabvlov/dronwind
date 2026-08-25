# 🎬 Guión Interactivo — Dronwind Experience

## Concepto General
Experiencia **scroll-driven** tipo Apple/Nike. El usuario desplaza la página y "desbloquea" una historia visual con videos de fondo, texto grande y elementos interactivos. Cada capítulo ocupa 100vh fijo (pinned) y el scroll controla la narrativa.

---

## 🎨 Paleta Visual
- **Fondos**: Videos reales (no fotos)
- **Texto**: Blanco puro `#FFFFFF` o negro `#000000` según contraste del video
- **Acento**: Rojo Dronwind `#DC2626` (solo para CTAs y highlights)
- **Tipografía**: Montserrat Bold/Black para títulos (60-120px), Regular para body
- **Overlay**: Gradiente negro suave en zonas de texto para legibilidad

---

## 📖 Capítulos

### Capítulo 0 — Intro (0% → 10% del scroll total)
**Objetivo**: Captar atención inmediata. Marca + promesa.

- **Video de fondo**: Panorama aéreo de Viña del Mar / Valparaíso al atardecer, drone volando hacia el edificio
- **Texto**:
  - "DRONWIND" — letras aparecen una por una (typewriter effect)
  - "Limpieza con drones" — fade in
  - "Sin riesgos. Sin andamios. Sin límites." — slide up
- **Interactividad**: Scroll down indicator animado (rebota)
- **Transición a siguiente**: Fade out del texto, video se "acelera" hacia el edificio

**🎥 Video que necesitas**: *Vista aérea panorámica del drone acercándose a un edificio*

---

### Capítulo 1 — El Problema (10% → 25%)
**Objetivo**: Crear tensión. El problema actual es peligroso e ineficiente.

- **Video de fondo**: Trabajador en andamio alto, tomando riesgos / edificio muy sucio
- **Texto grande** (aparece palabra por palabra con scroll):
  - "La limpieza en altura"
  - "es el trabajo"
  - "más peligroso."
- **Stat card desbloqueable** (aparece a los 18% scroll):
  - Caja flotante roja/negro: "3,200 accidentes laborales/año en Chile por trabajo en altura"
  - Se anima con contador (0 → 3,200)
- **Transición**: Efecto "shatter" o "glitch" — el video se rompe/distorsiona y cambia al siguiente

**🎥 Videos que necesitas**:
1. *Trabajador en andamio a gran altura (tomado desde abajo para dramatismo)*
2. *Fachada de edificio extremadamente sucia (close-up del antes)*

---

### Capítulo 2 — La Solución (25% → 45%)
**Objetivo**: Presentar al héroe. El drone llega.

- **Video de fondo**: Drone acercándose majestuosamente al edificio, estabilizándose
- **Texto**:
  - "Hasta donde"
  - "llega la tecnología."
- **Feature cards** que aparecen flotando al llegar a cierto % de scroll:
  - 🛡️ "Cero riesgo humano" → aparece a 30%
  - ⚡ "70% más rápido" → aparece a 35%
  - 💧 "70% menos agua" → aparece a 40%
  - Cada card tiene micro-animación de entrada (scale + fade)
- **Interactividad**: Cards tienen hover con más info
- **Transición**: Crossfade luminoso — el drone enciende sus luces y "explota" luz blanca que limpia la pantalla

**🎥 Videos que necesitas**:
1. *Drone acercándose al edificio, plano cinematográfico*
2. *Drone estabilizándose en posición de trabajo*

---

### Capítulo 3 — La Tecnología (45% → 65%)
**Objetivo**: Mostrar specs de forma visual, no técnica.

- **Video de fondo**: Close-up del drone — boquillas rociando, cámara FPV, antenas
- **Texto**:
  - "Precisión que"
  - "no se negocia."
- **Hotspots interactivos** (círculos rojos pulsantes sobre el video):
  - 🔴 Sobre la cámara → tooltip: "Cámara FPV — supervisión en tiempo real"
  - 🔴 Sobre la boquilla → tooltip: "3,200 PSI — presión quirúrgica"
  - 🔴 Sobre la antena → tooltip: "GPS + RTK — precisión milimétrica"
  - 🔴 Sobre el sensor → tooltip: "Sensor anticolisión — protección 360°"
  - Al hacer clic/tap en un hotspot, se abre un panel lateral con más detalle
- **Model selector**: Botones "JTC10" | "JTC30" que cambian el video de fondo al modelo correspondiente
- **Transición**: Zoom out rápido del drone → revela el edificio completo

**🎥 Videos que necesitas**:
1. *Close-up del JTC10 rociando agua a presión*
2. *Close-up del JTC30 rociando*
3. *Vista de la cámara FPV mostrando la pantalla del control*
4. *Detalle de las antenas/sensores del drone*

---

### Capítulo 4 — La Diferencia (65% → 85%)
**Objetivo**: Mostrar el impacto visual real. Sin stats inventados — la imagen habla sola.

- **Video de fondo**: Secuencia de limpieza en progreso. El drone barriendo una fachada sucia, dejando un rastro limpio.
- **Texto**:
  - "La suciedad"
  - "se queda atrás."
- **Efecto visual** (a los 70% scroll):
  - Una línea horizontal "limpia" barre la pantalla de izquierda a derecha
  - Atrás de la línea: el video se ve más brillante, saturado, limpio
  - Adelante de la línea: el video sigue sucio/gris
  - Efecto de "wipe" sincronizado con el scroll
- **Mensaje flotante** (a los 80%):
  - "La primera limpieza con drone de tu edificio empieza con un mensaje."
- **Transición**: El agua del video "barre" la pantalla hacia abajo revelando el capítulo final

**🎥 Videos que necesitas**:
1. *Drone limpiando fachada — toma lateral mostrando la zona sucia vs limpia*
2. *Toma cenital del drone haciendo una pasada completa*
3. *Close-up del agua impactando la suciedad y desapareciendo*

**💡 Nota**: Como empresa emergente, no mostramos números de clientes. En su lugar, vendemos la *experiencia visual* y la *oportunidad de ser pionero*.

---

### Capítulo 5 — El Resultado (85% → 100%)
**Objetivo**: Cierre emocional + CTA.

- **Video de fondo**: Edificio limpio brillando al sol, drone aterrizando suavemente, equipo sonriendo
- **Texto**:
  - "Tu edificio."
  - "Mejor."
- **CTA Principal** (aparece a los 90%):
  - Botón grande rojo: "Cotiza tu limpieza" → WhatsApp
  - Sub-CTA: "Ver modelos JTC" → /drones
- **Trust badges** (aparecen a los 95%):
  - Logo DGAC Chile — "Operador certificado"
  - "Cobertura: Viña del Mar, Valparaíso, Concón, Quilpué, Villa Alemana, Limache"
- **Final**: Logo Dronwind + fade to black

**🎥 Videos que necesitas**:
1. *Drone aterrizando suavemente*
2. *Equipo/operadores sonriendo junto al drone*
3. *Edificio limpio con reflejo de cielo azul*

---

## 🧭 Navegación y UI

### Sidebar de Capítulos (izquierda, desktop)
```
● Intro
○ El Problema  
○ La Solución
○ Tecnología
○ La Diferencia
○ Resultado
```
- Dots clickeables para saltar a capítulo
- Dot activo: rojo + más grande
- Labels aparecen on hover

### Progress Indicator (top)
- Barra fina roja en la parte superior de la pantalla
- Indica % total de la experiencia

### Skip Button (bottom right)
- "Saltar experiencia →" para usuarios que quieren ir directo al CTA
- Lleva al footer/contacto

### Sound Toggle (top right)
- 🔊 / 🔇 — música ambiente drone/electrónica sutil
- Default: muted (autoplay policy)

---

## 🎭 Transiciones entre Capítulos

| De | A | Efecto |
|---|---|---|
| Intro → Problema | Fade out + aceleración de video |
| Problema → Solución | Glitch / shatter distortion |
| Solución → Tecnología | Crossfade luminoso (explosión de luz blanca) |
| Tecnología → Acción | Zoom out rápido |
| Acción → Resultado | Wipe horizontal (agua barriendo) |

Todas las transiciones duran **0.8-1.2s** y están sincronizadas al scroll.

---

## 📱 Mobile Adaptation
- Misma experiencia pero:
  - Texto más pequeño (40-60px)
  - Hotspots se convierten en swipeable cards debajo del video
  - Sidebar de capítulos se convierte en dots abajo
  - Videos se renderizan a 720p para ahorro de datos

---

## 🎥 Inventario de Videos Necesarios

### Ya tienes:
- ✅ `DJI_20260812111340_0166_D` — Secuencia de scroll actual (puede usarse en "Acción")
- ✅ `drone-limpiador-limpiando.mp4` — Limpieza en progreso

### Faltan (tentativo):
1. **Panorama aéreo ciudad + drone** (Cap 0)
2. **Trabajador en andamio / edificio sucio dramático** (Cap 1)
3. **Drone acercándose cinematográficamente** (Cap 2)
4. **Close-ups de boquillas, cámara FPV, antenas** (Cap 3)
5. **Antes/Después o limpieza en progreso lateral** (Cap 4)
6. **Aterrizaje + equipo sonriendo** (Cap 5)

---

## ⚙️ Tech Stack
- **Vue 3** + **GSAP ScrollTrigger** (ya implementado)
- **Canvas** para renderizado de frames (ya implementado)
- **Lenis** o scroll nativo con inertia para suavidad
- **Prefetching** de frames del capítulo siguiente mientras se ve el actual

---

## ✍️ Copywriting Sugerido

Ver archivo `COPY.md` para textos detallados por capítulo.

---

## 📐 Métricas de Éxito
- Tiempo promedio en la experiencia: >45 segundos
- Tasa de scroll completo: >30%
- Clicks en hotspots: >15%
- Conversión a WhatsApp desde CTA final: objetivo +20%

---

*Revisado por: [tú]*  
*Próximo paso: Confirmar qué videos tienes disponibles y cuáles necesitamos grabar/filmar.*
