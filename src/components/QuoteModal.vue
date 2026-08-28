<template>
  <div>
    <!-- Trigger slot -->
    <div @click="openModal">
      <slot />
    </div>

    <!-- Modal Overlay -->
    <Teleport to="body">
      <div
        v-if="isOpen"
        class="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6"
        @click.self="closeModal"
      >
        <!-- Backdrop -->
        <div 
          class="absolute inset-0 bg-black/70 transition-opacity duration-300"
          :class="isOpen ? 'opacity-100' : 'opacity-0'"
        ></div>

        <!-- Modal Content -->
        <div
          class="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl transition-all duration-300"
          :class="isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4'"
        >
          <!-- Header -->
          <div class="sticky top-0 bg-white z-10 flex items-center justify-between px-4 md:px-8 pt-6 md:pt-8 pb-4">
            <div>
              <h2
                class="text-xl md:text-3xl font-black text-gray-900"
                style="font-family: 'Montserrat', sans-serif;"
              >
                Solicitar Cotización
              </h2>
              <p class="text-gray-500 mt-1">
                Completa el formulario y te contactaremos a la brevedad.
              </p>
            </div>
            <button
              type="button"
              @click.stop="closeModal"
              class="flex-shrink-0 ml-4 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
              aria-label="Cerrar"
            >
              <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>

          <!-- Form -->
          <div class="px-4 md:px-8 pb-6 md:pb-8">
            <form
              @submit.prevent="handleSubmit"
              class="space-y-5"
            >
              <!-- Nombre o Empresa -->
              <div>
                <label for="modal-quote-name" class="block text-sm font-semibold text-gray-700 mb-1.5">
                  Nombre o Empresa <span class="text-red-500">*</span>
                </label>
                <input
                  id="modal-quote-name"
                  v-model="form.name"
                  type="text"
                  required
                  placeholder="Ej: Constructora del Pacífico"
                  class="[width:stretch] px-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-100 outline-none transition-all text-gray-900 placeholder-gray-400 bg-white"
                />
              </div>

              <!-- RUT -->
              <div>
                <label for="modal-quote-rut" class="block text-sm font-semibold text-gray-700 mb-1.5">
                  RUT
                </label>
                <input
                  id="modal-quote-rut"
                  v-model="form.rut"
                  type="text"
                  placeholder="12.345.678-9"
                  class="[width:stretch] px-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-100 outline-none transition-all text-gray-900 placeholder-gray-400 bg-white"
                />
              </div>

              <!-- Teléfono y Email -->
              <div class="grid md:grid-cols-2 gap-5">
                <div>
                  <label for="modal-quote-phone" class="block text-sm font-semibold text-gray-700 mb-1.5">
                    Teléfono <span class="text-red-500">*</span>
                  </label>
                  <input
                    id="modal-quote-phone"
                    v-model="form.phone"
                    type="tel"
                    required
                    placeholder="+56 9 1234 5678"
                    class="[width:stretch] px-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-100 outline-none transition-all text-gray-900 placeholder-gray-400 bg-white"
                  />
                </div>
                <div>
                  <label for="modal-quote-email" class="block text-sm font-semibold text-gray-700 mb-1.5">
                    Correo electrónico <span class="text-red-500">*</span>
                  </label>
                  <input
                    id="modal-quote-email"
                    v-model="form.email"
                    type="email"
                    required
                    placeholder="nombre@empresa.cl"
                    class="[width:stretch] px-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-100 outline-none transition-all text-gray-900 placeholder-gray-400 bg-white"
                  />
                </div>
              </div>

              <!-- Comentarios -->
              <div>
                <label for="modal-quote-comments" class="block text-sm font-semibold text-gray-700 mb-1.5">
                  Comentarios
                </label>
                <textarea
                  id="modal-quote-comments"
                  v-model="form.comments"
                  rows="4"
                  placeholder="Cuéntanos sobre tu proyecto: tipo de superficie, altura aproximada, metros cuadrados, etc."
                  class="[width:stretch] px-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-100 outline-none transition-all text-gray-900 placeholder-gray-400 bg-white resize-none"
                ></textarea>
              </div>

              <!-- Botón -->
              <button
                type="submit"
                :disabled="loading"
                class="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-300 disabled:cursor-not-allowed text-white font-bold text-lg px-8 py-4 rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-xl flex items-center justify-center gap-2 border-0"
              >
                <span v-if="loading">Enviando...</span>
                <span v-else>Enviar cotización</span>

                <svg v-if="!loading" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                </svg>
                <svg v-else class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </button>

              <!-- Mensaje de éxito -->
              <div 
                v-if="success" 
                class="flex items-center gap-2 text-emerald-600 font-medium"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
                <span>Cotización enviada con éxito. Te contactaremos a la brevedad.</span>
              </div>

              <!-- Mensaje de error -->
              <div 
                v-if="error" 
                class="flex items-center gap-2 text-red-600 font-medium"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
                <span>{{ error }}</span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
  model?: string;
}>();

const isOpen = ref(false);

const openModal = () => {
  isOpen.value = true;
  document.body.style.overflow = 'hidden';
};

const closeModal = () => {
  isOpen.value = false;
  document.body.style.overflow = '';
};

const form = ref({
  name: '',
  rut: '',
  phone: '',
  email: '',
  comments: ''
});

const loading = ref(false);
const success = ref(false);
const error = ref('');

const handleSubmit = async () => {
  loading.value = true;
  success.value = false;
  error.value = '';

  try {
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: form.value.name.trim(),
        rut: form.value.rut.trim(),
        phone: form.value.phone.trim(),
        email: form.value.email.trim(),
        comments: form.value.comments.trim(),
        model: props.model || 'No especificado'
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Error al enviar el correo');
    }

    success.value = true;
    form.value = { name: '', rut: '', phone: '', email: '', comments: '' };

    setTimeout(() => {
      success.value = false;
    }, 6000);

  } catch (err: any) {
    error.value = err.message || 'Error de conexión. Intenta de nuevo.';

    setTimeout(() => {
      error.value = '';
    }, 8000);
  } finally {
    loading.value = false;
  }
};
</script>