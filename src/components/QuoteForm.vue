<template>
  <section class="py-20 md:py-28 bg-gray-50">
    <div class="container mx-auto px-6">
      <div class="max-w-2xl mx-auto">
        <div class="text-center mb-12">
          <h2
            class="text-3xl md:text-4xl font-black text-gray-900 mb-4"
            style="font-family: 'Montserrat', sans-serif;"
          >
            Solicitar Cotización
          </h2>
          <p class="text-gray-500 text-lg">
            Completa el formulario y te contactaremos a la brevedad.
          </p>
        </div>

        <form
          @submit.prevent="handleSubmit"
          class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-10 space-y-6"
        >
          <!-- Nombre o Empresa -->
          <div>
            <label for="quote-name" class="block text-sm font-semibold text-gray-700 mb-2">
              Nombre o Empresa <span class="text-red-500">*</span>
            </label>
            <input
              id="quote-name"
              v-model="form.name"
              type="text"
              required
              placeholder="Ej: Constructora del Pacífico"
              class="[width:stretch] px-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-100 outline-none transition-all text-gray-900 placeholder-gray-400 bg-white"
            />
          </div>

          <!-- RUT -->
          <div>
            <label for="quote-rut" class="block text-sm font-semibold text-gray-700 mb-2">
              RUT
            </label>
            <input
              id="quote-rut"
              v-model="form.rut"
              type="text"
              placeholder="12.345.678-9"
              class="[width:stretch] px-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-100 outline-none transition-all text-gray-900 placeholder-gray-400 bg-white"
            />
          </div>

          <!-- Teléfono y Email -->
          <div class="grid md:grid-cols-2 gap-6">
            <div>
              <label for="quote-phone" class="block text-sm font-semibold text-gray-700 mb-2">
                Teléfono <span class="text-red-500">*</span>
              </label>
              <input
                id="quote-phone"
                v-model="form.phone"
                type="tel"
                required
                placeholder="+56 9 1234 5678"
                class="[width:stretch] px-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-100 outline-none transition-all text-gray-900 placeholder-gray-400 bg-white"
              />
            </div>
            <div>
              <label for="quote-email" class="block text-sm font-semibold text-gray-700 mb-2">
                Correo electrónico <span class="text-red-500">*</span>
              </label>
              <input
                id="quote-email"
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
            <label for="quote-comments" class="block text-sm font-semibold text-gray-700 mb-2">
              Comentarios
            </label>
            <textarea
              id="quote-comments"
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
          <div v-if="success" class="flex items-center gap-2 text-emerald-600 font-medium">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
            </svg>
            <span>Cotización enviada con éxito. Te contactaremos a la brevedad.</span>
          </div>

          <!-- Mensaje de error -->
          <div v-if="error" class="flex items-center gap-2 text-red-600 font-medium">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
            <span>{{ error }}</span>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
  model?: string;
}>();

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
