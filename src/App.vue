<script setup>
import FirstPersonForm from './components/FirstPersonForm.vue'
import SecondPersonForm from './components/SecondPersonForm.vue'
import ExpensesForm from './components/ExpensesForm.vue'
import { computed, ref, watch } from 'vue'
import Card from 'primevue/card'
import Button from 'primevue/button'
import { useToast } from 'primevue/usetoast'
import Toast from 'primevue/toast'

const toast = useToast()
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

watch(currentStep, (newStep) => {
  if (newStep === 4) {
    const result = financeSplitter.value

    const values = [
      result.firstPercentage,
      result.secondPercentage,
      result.firstOwes,
      result.secondOwes,
    ]

    const hasNaN = values.some((val) => isNaN(val))

    if (hasNaN) {
      toast.add({
        severity: 'error',
        summary: 'Invalid Calculation',
        detail: 'Please enter valid numbers for both incomes and expenses.',
        life: 3000,
      })

      currentStep.value = 1
    }
  }
})

const handleClick = () => {
  currentStep.value = 1
}
</script>

<template>
  <Toast />
  <header>
    <h1 class="anton text-6xl text-center tracking-wide text-primary">SPLIT IT!</h1>
  </header>

  <FirstPersonForm v-if="currentStep === 1" @firstPersonNet="handleFirstPersonNet" />
  <SecondPersonForm v-else-if="currentStep === 2" @secondPersonNet="handleSecondPersonNet" />
  <ExpensesForm v-else-if="currentStep == 3" @totalExpenses="handleTotalExpenses" />

  <div
    v-if="currentStep === 4"
    class="fadein animation-duration-1000 flex justify-content-center p-4"
  >
    <Card style="width: 25rem; overflow: hidden" class="shadow-2 p-4">
      <template #title>
        <h2 class="text-center text-2xl font-semibold mb-4">Results</h2>
      </template>

      <template #subtitle>
        <div class="flex justify-content-center text-lg">
          <span class="font-medium">Total expenses:</span>
          <span class="font-semibold text-lg text-primary pl-2">{{ totalExpenses }} €</span>
        </div>
      </template>

      <template #content>
        <div class="p-2 mb-6">
          <p class="m-0 flex items-center justify-between text-lg font-medium">
            <span>First person's share:</span>
            <span class="text-lg">{{ financeSplitter.firstPercentage.toFixed(2) }}%</span>
            <i class="pi pi-arrow-right mx-3"></i>
            <span class="font-semibold text-lg text-primary"
              >{{ financeSplitter.firstOwes.toFixed(2) }} €</span
            >
          </p>
        </div>

        <div class="p-2 mb-6">
          <p class="m-0 flex items-center justify-between text-lg font-medium">
            <span>Second person's share:</span>
            <span class="font-semibold text-lg"
              >{{ financeSplitter.secondPercentage.toFixed(2) }}%</span
            >
            <i class="pi pi-arrow-right mx-3"></i>
            <span class="font-semibold text-l text-primary"
              >{{ financeSplitter.secondOwes.toFixed(2) }} €</span
            >
          </p>
        </div>
      </template>

      <template #footer>
        <div class="flex justify-content-center">
          <Button
            label="Start over"
            @click="handleClick"
            class="p-button-outlined text-lg px-4 py-2"
          />
        </div>
      </template>
    </Card>
  </div>
</template>

<style scoped></style>
