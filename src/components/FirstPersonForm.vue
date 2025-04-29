<script setup>
import { ref, computed } from 'vue'
import InputNumber from 'primevue/inputnumber'
import Button from 'primevue/button'

const emit = defineEmits(['firstPersonNet'])
const paycheck = ref('')
const debt = ref('')

const firstPersonNet = computed(() => {
  return paycheck.value - debt.value
})

const handleClick = () => {
  emit('firstPersonNet', firstPersonNet.value)
}
</script>

<template>
  <h2>First Person's Paycheck</h2>
  <InputNumber
    v-model="paycheck"
    inputId="currency-germany"
    mode="currency"
    currency="EUR"
    locale="de-DE"
    required
  />
  <h2>First Person's total debt</h2>
  <InputNumber
    v-model="debt"
    inputId="currency-germany"
    mode="currency"
    currency="EUR"
    locale="de-DE"
  />
  <Button label="Next" @click="handleClick" />
</template>
