# 📝 Copywriting — Dronwind Experience

## Capítulo 0 — Intro
**Duración visual**: 3-5 segundos de lectura

```
[DRONWIND]          ← typewriter, letra por letra, font-size: 80-120px

Limpieza con drones

Sin riesgos. Sin andamios. Sin límites.
```

**Notas**:
- "DRONWIND" en Montserrat Black, tracking -2px
- El punto rojo sobre la "i" parpadea como cursor
- El tagline aparece con stagger (0.1s entre línea)

---

## Capítulo 1 — El Problema
**Duración visual**: 5-8 segundos de lectura

```
La limpieza en altura
es el trabajo
más peligroso.
```

**Stat Card** (aparece después del texto):
```
⚠️  DATO

3,200
accidentes laborales
al año en Chile
por trabajo en altura

Fuente: SENCE / ACHS 2024
```

**Notas**:
- "más peligroso" en rojo `#DC2626`
- El stat card tiene fondo `rgba(0,0,0,0.85)` + borde rojo sutil
- El número 3,200 cuenta desde 0 con animación de 1.5s

---

## Capítulo 2 — La Solución
**Duración visual**: 6-10 segundos

```
Hasta donde
llega la tecnología.
```

**Feature Cards**:
```
🛡️  Cero riesgo humano
    Elimina el factor humano en altura

⚡  70% más rápido
    De días a horas

💧  70% menos agua
    Tecnología de recirculación

🌱  Cero químicos agresivos
    Solo agua a presión
```

**Notas**:
- Cards aparecen desde la derecha con `slideInRight` + fade
- Cada card tiene un pequeño icono blanco dentro de círculo rojo
- Hover: card se eleva 8px + sombra + scale 1.02

---

## Capítulo 3 — Tecnología
**Duración visual**: 8-12 segundos

```
Precisión que
no se negocia.
```

**Hotspots**:
```
🔴 Cámara FPV
   "Supervisión en tiempo real.
    Ve lo que el drone ve."

🔴 Boquilla de alta presión
   "3,200 PSI.
    Como un láser de agua."

🔴 Antena GPS + RTK
   "Precisión milimétrica.
    No hay margen de error."

🔴 Sensor anticolisión
   "360° de protección.
    El entorno importa."
```

**Model Selector**:
```
[ JTC10 ]  [ JTC30 ]

Compacto y versátil  |  Potencia industrial
7.4 kg               |  24.4 kg
3,200 PSI            |  4,100 PSI
30-50 min autonomía  |  20-40 min autonomía
100 m alcance        |  160 m alcance
```

**Notas**:
- Hotspots son círculos rojos pulsantes (heartbeat animation)
- Tooltip aparece al hover/click con fondo negro semi-transparente
- Model selector es un toggle con slide animation entre estados

---

## Capítulo 4 — La Acción
**Duración visual**: 6-10 segundos

```
Resultados
que se ven.
```

**Counters**:
```
12,500 m²
limpiados

850 horas
ahorradas

127 proyectos
completados

0
accidentes
```

**Testimonio**:
```
"Increíble. Nunca pensé que un drone 
pudiera dejar los vidrios así de limpios."

— Constructora XYZ, Viña del Mar
```

**Notas**:
- Counters usan `countUp.js` o GSAP para animación de números
- El "0 accidentes" es el más impactante — aparece al final con énfasis
- Testimonio tiene comillas grandes decorativas en rojo (`"` a 120px, opacity 0.1)

---

## Capítulo 5 — El Resultado
**Duración visual**: 5-8 segundos

```
Tu edificio.
Mejor.
```

**CTA**:
```
[COTIZA TU LIMPIEZA]

O escríbenos por WhatsApp
+56 9 5408 0730
```

**Trust Badges**:
```
✓ Operador certificado DGAC Chile
✓ Cobertura: Viña del Mar, Valparaíso, Concón, 
  Quilpué, Villa Alemana, Limache
✓ Tecnología de punta
✓ 100% seguro
```

**Notas**:
- "Mejor." está en rojo `#DC2626`
- CTA es un botón enorme (padding 24px 48px), font 20px bold
- Hover del CTA: gradiente animado rojo → rojo oscuro
- Trust badges aparecen con stagger desde abajo

---

## 🎯 Microcopy

### Navegación
```
Scroll para explorar ↓
Saltar experiencia →
🔊 Sonido
```

### Hotspots
```
Ver más →
Toca para explorar
```

### Loading
```
Cargando experiencia...
[████████░░] 80%
```

### Skip / Exit
```
¿Prefieres ir directo al grano?
[Ver servicios]  [Contactar]
```

---

## 🎨 Guía de Voz

- **Tono**: Profesional pero cercano. Tecnológico pero humano.
- **Evitar**: Jerga técnica excesiva, lenguaje corporativo frío
- **Usar**: "Tú", "Tu edificio", verbos de acción, números concretos
- **Longitud máxima por bloque**: 6 palabras por línea en títulos

---

## 🌐 Versión Inglés (futuro)
```
The future of cleaning.

Height is not the limit.
Risk is.

Precision that doesn't negotiate.

Your building.
Better.
```
