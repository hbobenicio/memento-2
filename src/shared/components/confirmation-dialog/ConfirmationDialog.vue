<template>
  <v-dialog class="m-component m-dialog m-confimation-dialog" max-width="600px"
    persistent
    v-model="showDialog">

    <v-card>

      <v-card-title>
        <v-alert :type="type" :value="true">
          {{ title }}
        </v-alert>
      </v-card-title>

      <v-card-text>
        <!-- <slot></slot> -->
        <p>{{ msg }}</p>
      </v-card-text>

      <v-divider />

      <v-card-actions>
        <v-btn color="success" flat @click="onPositive">Sim</v-btn>
        <v-btn color="error" flat @click="onNegative">Não</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import ConfirmationDialogEventBus from '@/shared/components/confirmation-dialog/confirmation-dialog.event-bus'

export default {
  name: 'MConfirmationDialog',

  data () {
    return {
      showDialog: false,
      type: 'info',
      title: '',
      msg: ''
    }
  },

  created () {
    ConfirmationDialogEventBus.onOpen(this.onOpen)
  },

  methods: {
    show () {
      this.showDialog = true
    },

    hide () {
      this.showDialog = false
    },

    onOpen ({type, title, msg}) {
      this.type = type
      this.title = title
      this.msg = msg
      this.showDialog = true
    },

    onPositive () {
      ConfirmationDialogEventBus.emitChoose(true)
      this.hide()
    },

    onNegative () {
      ConfirmationDialogEventBus.emitChoose(false)
      this.hide()
    }
  }
}
</script>

<style lang="scss" scoped>
  div.alert {
    width: 100%;
  }
</style>
