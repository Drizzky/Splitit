<script setup>
import InputNumber from 'primevue/inputnumber'
import Button from 'primevue/button'
import { ref, computed } from 'vue'

const emit = defineEmits(['totalExpenses'])

let id = 0
const newExpense = ref(null)
const expenses = ref([])

const addExpense = () => {
  if (newExpense.value !== null) {
    expenses.value.push({
      id: id++,
      number: newExpense.value,
    })
    newExpense.value = null
  }
}

const removeExpense = (expenseId) => {
  expenses.value = expenses.value.filter((e) => e.id !== expenseId)
}

const totalExpenses = computed(() => {
  return expenses.value.reduce((total, expense) => total + expense.number, 0)
})

const handleSplit = () => {
  emit('totalExpenses', totalExpenses.value)
}
</script>

<template>
  <div class="fadein animation-duration-1000 flex justify-content-center p-4">
    <div class="surface-card border-round shadow-3 p-5 w-full md:w-8 lg:w-6">
      <div class="text-center mb-4">
        <h2 class="m-0">Add Your Expenses</h2>
        <p class="text-sm text-500">(Rent, water, groceries, electricity, pets...)</p>
      </div>

      <!-- Form to Add Expense -->
      <form @submit.prevent="addExpense" class="flex gap-2 mb-4">
        <InputNumber
          v-model="newExpense"
          inputId="expense-input"
          mode="currency"
          currency="EUR"
          locale="de-DE"
          class="w-full"
          required
        />
        <Button label="Add" type="submit" />
      </form>

      <!-- List of Expenses with Animation -->
      <TransitionGroup
        name="fade"
        tag="ul"
        class="list-none p-0 m-0 grid grid-nogutter gap-3"
        enter-active-class="fadein animation-duration-300"
        leave-active-class="fadeout animation-duration-200"
      >
        <li
          v-for="expense in expenses"
          :key="expense.id"
          class="col-12 sm:col-6 md:col-4 lg:col-3 flex justify-between align-items-center border-1 border-round p-2 surface-100"
        >
          <span>{{
            expense.number.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })
          }}</span>
          <i
            class="pi pi-times cursor-pointer text-red-500 ml-auto"
            @click="removeExpense(expense.id)"
          ></i>
        </li>
      </TransitionGroup>

      <!-- Split It Button at the Bottom -->
      <div class="flex justify-content-center gap-2 mt-4">
        <Button label="Split It!" @click="handleSplit" />
      </div>
    </div>
  </div>
</template>
