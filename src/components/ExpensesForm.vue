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
  <div>
    <h2>Add your expenses.</h2>
    <p>(Rent, water, groceries, electricity, pets...)</p>
  </div>
  <ul>
    <li v-for="expense in expenses" :key="expense.id">
      {{ expense.number }} €
      <i class="pi pi-times" @click="removeExpense(expense.id)"></i>
    </li>
  </ul>
  <form @submit.prevent="addExpense">
    <div>
      <InputNumber
        v-model="newExpense"
        inputId="currency-germany"
        mode="currency"
        currency="EUR"
        locale="de-DE"
        required
      />
      <footer>
        <Button label="Add" @click="addExpense" /> <Button label="Split!" @click="handleSplit" />
      </footer>
    </div>
  </form>
</template>
