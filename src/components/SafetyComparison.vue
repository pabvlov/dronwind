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
            </div>

            <!-- Zoomed detail circle (bigger) -->
            <div 
              class="absolute -top-6 -right-6 md:-top-8 md:-right-8 w-32 h-32 md:w-44 md:h-44 rounded-full overflow-hidden border-4 border-white shadow-2xl z-10"
            >
              <img 
                src="/assets/images/hombre-colgando-zoomed-new.webp" 
                alt="Detalle del riesgo - trabajador colgado de un edificio"
                class="w-full h-full object-cover"
              />
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
