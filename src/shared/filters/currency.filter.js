import Vue from 'vue'

// Create our currency formatter.
export const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  minimumFractionDigits: 2,
})


Vue.filter('currency', currencyValue => currencyFormatter.format(currencyValue))
