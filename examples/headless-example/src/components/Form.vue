<template>
<form @submit.prevent="submit" v-bind="$attrs">
  <slot/>
</form>
</template>

<script setup>
import { ref, defineProps, toRaw, provide, defineEmits } from 'vue'
import { useRegleSchema } from '@regle/schemas';
import * as v from 'valibot';

const emit = defineEmits(['submit', 'error'])

const props = defineProps({
  validationSchema: {
    type: Object,
    default: () => v.object({})
  },
  initialValues: {
    type: Object,
    default: () => {}
  },
  ownState: {
    type: Boolean,
    default: true
  }
})

// Value instance (initialize immediately so children see defaults on mount)
const value = ref(props.ownState ? structuredClone(toRaw(props.initialValues)) : {});

// Regle instance
const { r$ } = useRegleSchema(
  value, 
  props.validationSchema,
  {
    rewardEarly: true
  }
)

const submit = async () => {
  const { valid, data } = await r$.$validate();
  if(valid) emit('submit', data)
  else emit('error', r$.$errors)
}

provide('form', r$)
provide('formValue', value)

defineExpose({
  instance: r$,
  value
})
</script>
