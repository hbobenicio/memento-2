<template>
  <div id="app" class="m-app">
    <v-app>
      <v-content>
        <v-container fluid>
          <main>
            <v-snackbar :timeout="3000" top v-model="showSnackbar">
              {{ snackMsg }}
            </v-snackbar>

            <ConfirmationDialog />

            <router-view></router-view>
          </main>
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>

<script>
import SnackbarEventBus from '@/shared/event-bus/snackbar.event-bus'
import ConfirmationDialog from '@/shared/components/confirmation-dialog/ConfirmationDialog'

export default {
  name: 'App',

  components: {
    ConfirmationDialog
  },

  created () {
    SnackbarEventBus.onSnack(this.onSnack)
  },

  data: () => ({
    showSnackbar: false,
    snackMsg: ''
  }),

  methods: {
    onSnack (msg) {
      this.snackMsg = msg
      this.showSnackbar = true
    }
  },
}
</script>
