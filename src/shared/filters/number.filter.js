import Vue from 'vue'

export const numberFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'decimal',
  minimumFractionDigits: 2,
})

Vue.filter('number', numberValue => numberFormatter.format(numberValue))
