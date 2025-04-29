<script setup>
import FirstPersonForm from './components/FirstPersonForm.vue'
import SecondPersonForm from './components/SecondPersonForm.vue'
import ExpensesForm from './components/ExpensesForm.vue'
import { computed, ref } from 'vue'
import Card from 'primevue/card'
import Button from 'primevue/button'

const currentStep = ref(1)
const firstPersonNet = ref(null)
const secondPersonNet = ref(null)
const totalExpenses = ref(null)

const handleFirstPersonNet = (value) => {
  firstPersonNet.value = value
  currentStep.value = 2
}

const handleSecondPersonNet = (value) => {
  secondPersonNet.value = value
  currentStep.value = 3
}

const handleTotalExpenses = (value) => {
  totalExpenses.value = value
  currentStep.value = 4
}

const financeSplitter = computed(() => {
  const totalNet = firstPersonNet.value + secondPersonNet.value

  const firstPercentage = (firstPersonNet.value / totalNet) * 100
  const secondPercentage = (secondPersonNet.value / totalNet) * 100

  const firstOwes = (firstPercentage / 100) * totalExpenses.value
  const secondOwes = (secondPercentage / 100) * totalExpenses.value

  return {
    firstPercentage,
    secondPercentage,
    firstOwes,
    secondOwes,
  }
})

const handleStartOver = () => {
  currentStep.value = 1
}
</script>

<template>
  <heaader>
    <h1>Split it!</h1>
  </heaader>

  <FirstPersonForm v-if="currentStep === 1" @firstPersonNet="handleFirstPersonNet" />
  <SecondPersonForm v-else-if="currentStep === 2" @secondPersonNet="handleSecondPersonNet" />
  <ExpensesForm v-else-if="currentStep == 3" @totalExpenses="handleTotalExpenses" />

  <div v-if="currentStep === 4">
    <Card style="width: 25rem; overflow: hidden">
      <template #header> </template>
      <template #title>Results</template>
      <template #subtitle>Total expenses: {{ totalExpenses }} €</template>
      <template #content>
        <p class="m-0">
          First person's share: {{ financeSplitter.firstPercentage.toFixed(2) }}%
          <i class="pi pi-arrow-right"></i>
          {{ financeSplitter.firstOwes.toFixed(2) }} €
        </p>
        <p class="m-0">
          Second person's share: {{ financeSplitter.secondPercentage.toFixed(2) }}%
          <i class="pi pi-arrow-right"></i>
          {{ financeSplitter.secondOwes.toFixed(2) }} €
        </p>
      </template>
      <template #footer>
        <div class="flex gap-4 mt-1">
          <Button label="Start over" @click="handleStartOver" />
        </div>
      </template>
    </Card>
  </div>
</template>

<style scoped></style>
