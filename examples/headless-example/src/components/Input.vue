<template>
  <div class="flex flex-col gap-1 text-sm">

    <!-- Label (if set) -->
    <label 
      :class="[{'text-red-500' : error}]" 
      :for="name" 
      v-if="label"
    >
      {{ label }}
    </label>

    <!-- Input -->
    <input
      :id="name"
      :class="['border border-gray-300 rounded-md py-1 px-2', {'border-red-500' : error}]"
      :type="type"
      v-model="value"
    />

    <!-- Error message (if present) -->
    <div class="text-sm text-red-500" v-if="error">{{ error }}</div>

  </div>
</template>

<script setup>
import { inject, computed, onMounted } from 'vue';

const props = defineProps({
  name: { type: String, default: () => crypto.randomUUID() },
  label: { type: String, default: null },
  type: { type: String, default: 'text' }
});

const form = inject('form');
const formField = computed(() => form[props.name]);

const value = computed({
  get: () => formField.value?.$value,
  set: (val) => formField.value.$value = val
});

// Initiate the field, if it doesn't exist on the form
const formValue = inject('formValue');

onMounted(() => {
  if (formValue.value[props.name] === undefined) {
    console.log('Setting to null')
    formValue.value[props.name] = null;
  }
})

const error = computed(() => formField.value?.$errors[0]);
</script>
