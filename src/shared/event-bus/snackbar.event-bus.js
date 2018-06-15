import Vue from 'vue'

const SNACK_EVENT = 'snack'

let SnackbarEventBus = new Vue()
SnackbarEventBus.onSnack = eventHandler => SnackbarEventBus.$on(SNACK_EVENT, eventHandler)
SnackbarEventBus.emitSnack = msg => SnackbarEventBus.$emit(SNACK_EVENT, msg)

export default SnackbarEventBus
