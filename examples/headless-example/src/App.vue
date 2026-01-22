<template>
<div class="flex flex-col justify-center gap-10 p-20 max-w-[900px]">
  <div>
    <h1 class="text-xl font-semibold">Headless form example</h1>
    <p>This example shows how one can use Regle to build a headless form, thus minimizing the amount of setup and code required when building form-intense projects.</p>
  </div>
  
  <Form :initialValues :validationSchema @submit="console.log" @error="console.log" class="flex flex-col gap-5">
    <Input name="name" label="Name" />
    <Input name="age" label="Age" type="number" />

    <!-- This one is not present in the initialValues, it self-mounts as null (empty) -->
    <Input name="test" label="Test" />

    <Button>Submit me!</Button>
  </Form>
</div>
</template>

<script setup>
import * as v from 'valibot'

import Form from './components/Form.vue'
import Input from './components/Input.vue';
import Button from './components/Button.vue';

const initialValues = {
  name: 'John',
  surname: 'Doe',
  age: 17
}

const validationSchema = v.object({
  name: v.pipe(v.string(), v.minLength(3, 'Name must be at least 3 characters long.')),
  age: v.pipe(v.number(), v.minValue(18, 'You must be at least 18 years old.')),
  test: v.nonNullable(v.string(), "This field can't be empty.")
})
</script>