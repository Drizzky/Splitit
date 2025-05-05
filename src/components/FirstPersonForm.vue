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
  <div class="fadein animation-duration-1000 flex justify-content-center p-4">
    <div class="surface-card border-round shadow-3 p-5 w-full md:w-8 lg:w-6">
      <div class="text-center mb-4">
        <h2 class="m-0">First Person's Details</h2>
      </div>

      <div class="grid formgrid gap-3">
        <div class="field col-12">
          <InputNumber
            v-model="paycheck"
            inputId="paycheck"
            mode="currency"
            currency="EUR"
            locale="de-DE"
            class="w-full"
            placeholder="First Person's Paycheck"
            required
          />
        </div>

        <div class="field col-12">
          <InputNumber
            v-model="debt"
            inputId="debt"
            mode="currency"
            currency="EUR"
            locale="de-DE"
            class="w-full"
            placeholder="First Person's Total Debt"
            required
          />
        </div>
      </div>
      <div class="flex justify-content-center mt-4">
        <Button label="Next" @click="handleClick" />
      </div>
    </div>
  </div>
</template>
