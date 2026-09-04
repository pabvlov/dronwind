<template>
  <section class="relative py-20 md:py-32 bg-black overflow-hidden">
    <div class="[width:auto] m-[10%] md:m-4">
      <div class="max-w-6xl mx-auto">
        <!-- Header -->
        <div class="text-center mb-12 md:mb-16">
          <h2 
            class="text-3xl md:text-5xl font-black text-white mb-4"
            style="font-family: 'Montserrat', sans-serif;"
          >
            El futuro de la limpieza<br>ya está <span class="text-red-600">volando</span>
          </h2>
          <p class="text-gray-400 text-lg max-w-2xl mx-auto">
            No arriesgues personas. No uses andamios. No detengas tu operación.
            La tecnología de drones hace la limpieza en altura más segura, rápida y eficiente.
          </p>
        </div>

        <!-- Photo composition -->
        <div class="flex justify-center">
          <div class="relative w-full max-w-xl">
            <!-- Main photo (not zoomed) -->
            <div class="aspect-square rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="/assets/images/hombre-colgando-not-zoomed.webp" 
                alt="Trabajador en altura con riesgo de accidente"
                class="w-full h-full object-cover"
              />
              <!-- Subtle gradient overlay for depth -->
              <div class="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </div>

            <!-- Zoomed detail circle -->
            <div 
              class="absolute -top-4 -right-4 md:-top-6 md:-right-6 w-24 h-24 md:w-36 md:h-36 rounded-full overflow-hidden border-4 border-white shadow-2xl z-10"
            >
              <img 
                src="/assets/images/hombre-colgando-zoomed.webp" 
                alt="Detalle del riesgo - trabajador colgado de un edificio"
                class="w-full h-full object-cover"
              />
            </div>

            <!-- Zoom label badge -->
            <div 
              class="absolute -top-4 -right-4 md:-top-6 md:-right-6 z-20 flex items-center justify-center"
            >
              <div class="bg-red-600 text-white text-[10px] md:text-xs font-bold px-2 py-1 rounded-full shadow-lg mt-1 mr-1">
                ZOOM
              </div>
            </div>

            <!-- Bottom caption -->
            <div class="absolute bottom-4 left-4 right-4">
              <div class="bg-black/60 backdrop-blur-sm rounded-xl px-4 py-3 text-center">
                <p class="text-white text-sm md:text-base font-medium">
                  La limpieza tradicional expone vidas. Nosotros no.
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Bottom CTA -->
        <div class="text-center mt-12">
          <p class="text-gray-300 text-lg mb-6">
            Con Dronwind, eliminas el riesgo humano y obtienes resultados superiores.
          </p>
          <a 
            href="/#demo" 
            class="inline-block bg-red-600 hover:bg-red-700 text-white font-bold text-lg px-10 py-5 rounded-xl transition-all duration-300 hover:scale-105 border-0"
          >
            Ver cómo funciona
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
