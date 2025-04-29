<script setup>
import { ref, computed } from 'vue'
import InputNumber from 'primevue/inputnumber'
import Button from 'primevue/button'

const emit = defineEmits(['secondPersonNet'])
const paycheck = ref('')
const debt = ref('')

const secondPersonNet = computed(() => {
  return paycheck.value - debt.value
})

const handleClick = () => {
  emit('secondPersonNet', secondPersonNet.value)
}
</script>

<template>
  <h2>Second Person's Paycheck</h2>
  <InputNumber
    v-model="paycheck"
    inputId="currency-germany"
    mode="currency"
    currency="EUR"
    locale="de-DE"
    required
  />
  <h2>Second Person's total debt</h2>
  <InputNumber
    v-model="debt"
    inputId="currency-germany"
    mode="currency"
    currency="EUR"
    locale="de-DE"
  />
  <Button label="Next" @click="handleClick" />
</template>
