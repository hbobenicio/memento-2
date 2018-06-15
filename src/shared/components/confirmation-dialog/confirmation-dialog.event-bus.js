import Vue from 'vue'

const CONFIRM_DIALOG_OPEN_EVENT = 'CONFIRM_DIALOG_OPEN_EVENT'
const CONFIRM_DIALOG_CHOOSE_EVENT = 'CONFIRM_DIALOG_CHOOSE_EVENT'

let ConfirmationDialogEventBus = new Vue()

ConfirmationDialogEventBus.onOpen = eventHandler =>
  ConfirmationDialogEventBus.$on(CONFIRM_DIALOG_OPEN_EVENT, eventHandler)

ConfirmationDialogEventBus.onChoose = eventHandler =>
  ConfirmationDialogEventBus.$on(CONFIRM_DIALOG_CHOOSE_EVENT, eventHandler)

ConfirmationDialogEventBus.emitOpen = data =>
  ConfirmationDialogEventBus.$emit(CONFIRM_DIALOG_OPEN_EVENT, data)

ConfirmationDialogEventBus.emitChoose = choise =>
  ConfirmationDialogEventBus.$emit(CONFIRM_DIALOG_CHOOSE_EVENT, choise)

ConfirmationDialogEventBus.offOpen = eventHandler =>
  ConfirmationDialogEventBus.$off(CONFIRM_DIALOG_OPEN_EVENT, eventHandler)

ConfirmationDialogEventBus.offChoose = eventHandler =>
  ConfirmationDialogEventBus.$off(CONFIRM_DIALOG_CHOOSE_EVENT, eventHandler)

export default ConfirmationDialogEventBus
