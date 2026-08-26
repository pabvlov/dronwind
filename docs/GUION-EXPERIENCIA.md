# Guion Interactivo — Dronwind Experience

## Concepto General
Experiencia **scroll-driven** tipo Apple/Nike. El usuario desplaza la pagina y "desbloquea" una historia visual con videos de fondo, texto grande y elementos interactivos. Cada capitulo ocupa 100vh fijo (pinned) y el scroll controla la narrativa.

---

## Paleta Visual
- **Fondos**: Videos reales (no fotos)
- **Texto**: Blanco puro `#FFFFFF` o negro `#000000` segun contraste del video
- **Acento**: Rojo Dronwind `#DC2626` (solo para CTAs y highlights)
- **Tipografia**: Montserrat Bold/Black para titulos (60-120px), Regular para body
- **Overlay**: Gradiente negro suave en zonas de texto para legibilidad

---

## Capitulos

### Capitulo 0 — Intro (0% a 10% del scroll total)
**Objetivo**: Captar atencion inmediata. Marca + promesa.

- **Video de fondo**: Panorama aereo de Vina del Mar / Valparaiso al atardecer, drone volando hacia el edificio
- **Texto**:
  - "DRONWIND" — letras aparecen una por una (typewriter effect)
  - "Limpieza con drones" — fade in
  - "Sin riesgos. Sin andamios. Sin limites." — slide up
- **Interactividad**: Scroll down indicator animado (rebota)
- **Transicion a siguiente**: Fade out del texto, video se "acelera" hacia el edificio

**Video que necesitas**: *Vista aerea panoramica del drone acercandose a un edificio*

---

### Capitulo 1 — El Problema (10% a 25%)
**Objetivo**: Crear tension. El problema actual es peligroso e ineficiente.

- **Video de fondo**: Trabajador en andamio alto, tomando riesgos / edificio muy sucio
- **Texto grande** (aparece palabra por palabra con scroll):
  - "La limpieza en altura"
  - "es el trabajo"
  - "mas peligroso."
- **Stat card desbloqueable** (aparece a los 18% scroll):
  - Caja flotante roja/negro: "3,200 accidentes laborales/ano en Chile por trabajo en altura"
  - Se anima con contador (0 a 3,200)
- **Transicion**: Efecto "shatter" o "glitch" — el video se rompe/distorsiona y cambia al siguiente

**Videos que necesitas**:
1. *Trabajador en andamio a gran altura (tomado desde abajo para dramatismo)*
2. *Fachada de edificio extremadamente sucia (close-up del antes)*

---

### Capitulo 2 — La Solucion (25% a 45%)
**Objetivo**: Presentar al heroe. El drone llega.

- **Video de fondo**: Drone acercandose majestuosamente al edificio, estabilizandose
- **Texto**:
  - "Hasta donde"
  - "llega la tecnologia."
- **Feature cards** que aparecen flotando al llegar a cierto % de scroll:
  - "Cero riesgo humano" → aparece a 30%
  - "70% mas rapido" → aparece a 35%
  - "70% menos agua" → aparece a 40%
  - Cada card tiene micro-animacion de entrada (scale + fade)
- **Interactividad**: Cards tienen hover con mas info
- **Transicion**: Crossfade luminoso — el drone enciende sus luces y "explota" luz blanca que limpia la pantalla

**Videos que necesitas**:
1. *Drone acercandose al edificio, plano cinematografico*
2. *Drone estabilizandose en posicion de trabajo*

---

### Capitulo 3 — La Tecnologia (45% a 65%)
**Objetivo**: Mostrar specs de forma visual, no tecnica.

- **Video de fondo**: Close-up del drone — boquillas rociando, camara FPV, antenas
- **Texto**:
  - "Precision que"
  - "no se negocia."
- **Hotspots interactivos** (circulos rojos pulsantes sobre el video):
  - Sobre la camara → tooltip: "Camara FPV — supervision en tiempo real"
  - Sobre la boquilla → tooltip: "3,200 PSI — presion quirurgica"
  - Sobre la antena → tooltip: "GPS + RTK — precision milimetrica"
  - Sobre el sensor → tooltip: "Sensor anticolicion — proteccion 360 grados"
  - Al hacer clic/tap en un hotspot, se abre un panel lateral con mas detalle
- **Model selector**: Botones "JTC10" | "JTC30" que cambian el video de fondo al modelo correspondiente
- **Transicion**: Zoom out rapido del drone → revela el edificio completo

**Videos que necesitas**:
1. *Close-up del JTC10 rociando agua a presion*
2. *Close-up del JTC30 rociando*
3. *Vista de la camara FPV mostrando la pantalla del control*
4. *Detalle de las antenas/sensores del drone*

---

### Capitulo 4 — La Diferencia (65% a 85%)
**Objetivo**: Mostrar el impacto visual real. Sin stats inventados — la imagen habla sola.

- **Video de fondo**: Secuencia de limpieza en progreso. El drone barriendo una fachada sucia, dejando un rastro limpio.
- **Texto**:
  - "La suciedad"
  - "se queda atras."
- **Efecto visual** (a los 70% scroll):
  - Una linea horizontal "limpia" barre la pantalla de izquierda a derecha
  - Atras de la linea: el video se ve mas brillante, saturado, limpio
  - Adelante de la linea: el video sigue sucio/gris
  - Efecto de "wipe" sincronizado con el scroll
- **Mensaje flotante** (a los 80%):
  - "La primera limpieza con drone de tu edificio empieza con un mensaje."
- **Transicion**: El agua del video "barre" la pantalla hacia abajo revelando el capitulo final

**Videos que necesitas**:
1. *Drone limpiando fachada — toma lateral mostrando la zona sucia vs limpia*
2. *Toma cenital del drone haciendo una pasada completa*
3. *Close-up del agua impactando la suciedad y desapareciendo*

**Nota**: Como empresa emergente, no mostramos numeros de clientes. En su lugar, vendemos la *experiencia visual* y la *oportunidad de ser pionero*.

---

### Capitulo 5 — El Resultado (85% a 100%)
**Objetivo**: Cierre emocional + CTA.

- **Video de fondo**: Edificio limpio brillando al sol, drone aterrizando suavemente, equipo sonriendo
- **Texto**:
  - "Tu edificio."
  - "Mejor."
- **CTA Principal** (aparece a los 90%):
  - Boton grande rojo: "Cotiza tu limpieza" → WhatsApp
  - Sub-CTA: "Ver modelos JTC" → /drones
- **Trust badges** (aparecen a los 95%):
  - Logo DGAC Chile — "Operador certificado"
  - "Cobertura: Vina del Mar, Valparaiso, Concon, Quilpue, Villa Alemana, Limache"
- **Final**: Logo Dronwind + fade to black

**Videos que necesitas**:
1. *Drone aterrizando suavemente*
2. *Equipo/operadores sonriendo junto al drone*
3. *Edificio limpio con reflejo de cielo azul*

---

## Navegacion y UI

### Sidebar de Capitulos (izquierda, desktop)
```
o Intro
  El Problema  
  La Solucion
  Tecnologia
  La Diferencia
  Resultado
```
- Dots clickeables para saltar a capitulo
- Dot activo: rojo + mas grande
- Labels aparecen on hover

### Progress Indicator (top)
- Barra fina roja en la parte superior de la pantalla
- Indica % total de la experiencia

### Skip Button (bottom right)
- "Saltar experiencia →" para usuarios que quieren ir directo al CTA
- Lleva al footer/contacto

### Sound Toggle (top right)
- Altavoz / Mute — musica ambiente drone/electronica sutil
- Default: muted (autoplay policy)

---

## Transiciones entre Capitulos

| De | A | Efecto |
|---|---|---|
| Intro → Problema | Fade out + aceleracion de video |
| Problema → Solucion | Glitch / shatter distortion |
| Solucion → Tecnologia | Crossfade luminoso (explosion de luz blanca) |
| Tecnologia → Diferencia | Zoom out rapido |
| Diferencia → Resultado | Wipe horizontal (agua barriendo) |

Todas las transiciones duran **0.8-1.2s** y estan sincronizadas al scroll.

---

## Mobile Adaptation
- Misma experiencia pero:
  - Texto mas pequeno (40-60px)
  - Hotspots se convierten en swipeable cards debajo del video
  - Sidebar de capitulos se convierte en dots abajo
  - Videos se renderizan a 720p para ahorro de datos

---

## Inventario de Videos Necesarios

### Ya tienes:
- `DJI_20260812111340_0166_D` — Secuencia de scroll actual (puede usarse en "Diferencia")
- `drone-limpiador-limpiando.mp4` — Limpieza en progreso

### Faltan (tentativo):
1. **Panorama aereo ciudad + drone** (Cap 0)
2. **Trabajador en andamio / edificio sucio dramatico** (Cap 1)
3. **Drone acercandose cinematograficamente** (Cap 2)
4. **Close-ups de boquillas, camara FPV, antenas** (Cap 3)
5. **Antes/Despues o limpieza en progreso lateral** (Cap 4)
6. **Aterrizaje + equipo sonriendo** (Cap 5)

---

## Tech Stack
- **Vue 3** + **GSAP ScrollTrigger** (ya implementado)
- **Canvas** para renderizado de frames (ya implementado)
- **Lenis** o scroll nativo con inertia para suavidad
- **Prefetching** de frames del capitulo siguiente mientras se ve el actual

---

## Copywriting Sugerido

Ver archivo `COPY-EXPERIENCIA.md` para textos detallados por capitulo.

---

## Metricas de Exito
- Tiempo promedio en la experiencia: >45 segundos
- Tasa de scroll completo: >30%
- Clicks en hotspots: >15%
- Conversion a WhatsApp desde CTA final: objetivo +20%

---
