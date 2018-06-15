<template>
  <section id="m-despesas-page" class="m-component m-page">

    <!-- Breadcrumbs de navegação -->
    <v-breadcrumbs>
      <v-icon slot="divider">chevron_right</v-icon>
      <v-breadcrumbs-item href="/">
        Home Page
      </v-breadcrumbs-item>
      <v-breadcrumbs-item :disabled="true">
        {{ labelMes }}
      </v-breadcrumbs-item>
    </v-breadcrumbs>

    <v-layout row wrap>

      <!-- Cabeçalho + Botão Add Despesa -->
      <v-flex xs12>
        <v-toolbar color="light-blue" light extended>
          <v-toolbar-title slot="extension" class="white--text">
            {{ labelMes }}
          </v-toolbar-title>
          <v-btn fab small dark color="indigo" bottom right absolute
            @click="onClickNovaDespesa">
            <v-icon>add</v-icon>
          </v-btn>
        </v-toolbar>
      </v-flex>

      <!-- Grid de Despesas -->
      <v-flex xs12>
        <v-data-table id="despesasTable"
          :headers="tabelaDespesas.headers"
          :items="tabelaDespesas.items"
          hide-actions
          class="elevation-1">
          <template slot="no-data">
            <p style="margin-bottom: 0px">Nenhuma despesa encontrada</p>
          </template>
          <template slot="headers" slot-scope="props" class="text-xs-center ">
            <tr>
              <th v-for="(header, index) in props.headers" :key="index">
                {{header.text}}
              </th>
            </tr>
          </template>
          <template slot="items" slot-scope="props">
            <td :class="{pago: props.item.pago, green: props.item.pago, amber: !props.item.pago}" class="text-xs-center lighten-4">{{ props.item.id }}</td>
            <td :class="{pago: props.item.pago, green: props.item.pago, amber: !props.item.pago}" class="text-xs-center lighten-4">{{ props.item.vencimento | date }}</td>
            <td :class="{pago: props.item.pago, green: props.item.pago, amber: !props.item.pago}" class="text-xs-center lighten-4">{{ props.item.nome }}</td>
            <td :class="{pago: props.item.pago, green: props.item.pago, amber: !props.item.pago}" class="text-xs-center lighten-4">{{ props.item.responsavel }}</td>
            <td :class="{pago: props.item.pago, green: props.item.pago, amber: !props.item.pago}" class="text-xs-center lighten-4">{{ props.item.valor | number }}</td>
            <td :class="{pago: props.item.pago, green: props.item.pago, amber: !props.item.pago}" class="text-xs-center lighten-4">
              <v-switch v-model="props.item.pago" @change="onSwitchPago(props.item, $event)"></v-switch>
            </td>
            <td :class="{pago: props.item.pago, green: props.item.pago, amber: !props.item.pago}" class="text-xs-center lighten-4">
              <v-btn icon color="info" @click="editarDespesa(props.item.id)">
                <v-icon>create</v-icon>
              </v-btn>
              <v-btn icon color="error" @click="excluirDespesa(props.item.id)">
                <v-icon>delete_forever</v-icon>
              </v-btn>
            </td>
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>
  </section>
</template>

<script>
import meses from '@/shared/meses'
// import FirebaseUtils from '@/shared/firebase/firebase.utils'
import DespesaService from '@/despesas/service/despesa.service'
import SnackbarEventBus from '@/shared/event-bus/snackbar.event-bus'
import ConfirmationDialogEventBus from '@/shared/components/confirmation-dialog/confirmation-dialog.event-bus'
import router from '@/router/router'

export default {
  name: 'DespesasPage',
  created () {
    if (!this.$route.params.mes) {
      throw new Error('Página não possui ')
    }

    this.listarDespesas()
  },
  data: () => ({
    despesas: [],
    pagination: {
      sortBy: 'pago'
    },
    selectedDespesaId: undefined
  }),
  computed: {
    codigoMes () {
      return this.$route.params.mes
    },
    labelMes () {
      console.log(meses, this.$route.params.mes, meses.filter(m => m.index === this.$route.params.mes))
      return meses.filter(m => m.index === this.$route.params.mes)[0].label
    },
    despesasOrdenadas () {
      const ordenadas = this.despesas.concat()
      return ordenadas.sort((x, y) => {
        if (x.pago === y.pago) {
          return (x.vencimento < y.vencimento) ? -1 : 1
        }
        return (!x.pago && y.pago) ? -1 : 1
      })
    },
    tabelaDespesas () {
      return {
        headers: [
          { text: 'Id', value: 'id' },
          { text: 'Vencimento', value: 'vencimento' },
          { text: 'Nome', value: 'nome' },
          { text: 'Responsável', value: 'responsavel' },
          { text: 'Valor', value: 'valor' },
          { text: 'Status', value: 'status' },
          { text: 'Ações' }
        ],
        items: this.despesasOrdenadas
      }
    }
  },
  methods: {
    snackWithMsg (msg) {
      SnackbarEventBus.emitSnack(msg)
    },
    onClickNovaDespesa () {
      router.push({
        name: 'despesas-new',
        params: {
          mes: this.codigoMes
        }
      })
    },
    listarDespesas () {
      DespesaService.allByMonth(this.codigoMes)
        .then(despesas => {
          this.despesas = despesas
        })
        .catch(error => {
          SnackbarEventBus.emitSnack('Erro ao recuperar a lista de despesas')
          console.error('Erro: ', error)
          this.despesas = []
        })
    },
    onSalvarNovaDespesa (novaDespesa) {
      DespesaService.create(novaDespesa)
        .then(response => {
          this.listarDespesas()
          SnackbarEventBus.emitSnack('Nova despesa salva com sucesso')
        })
        .catch(error => {
          SnackbarEventBus.emitSnack('Erro ao salvar nova despesa')
          console.error('Erro: ', error, novaDespesa)
        })
    },

    editarDespesa (despesaId) {
      router.push({
        name: 'despesas-edit',
        params: {
          despesaId
        }
      })
    },

    excluirDespesa (despesaId) {
      this.selectedDespesaId = despesaId
      ConfirmationDialogEventBus.onChoose(this.onChoose)
      ConfirmationDialogEventBus.emitOpen({
        type: 'warning',
        title: 'Alerta',
        msg: 'Deseja realmente excluir esta despesa?'
      })
    },

    onChoose (choise) {
      if (choise === true) {
        DespesaService.delete(this.selectedDespesaId)
          .then(response => {
            this.listarDespesas()
            SnackbarEventBus.emitSnack('Despesa excluída com sucesso')
          })
          .catch(error => {
            SnackbarEventBus.emitSnack(`Erro ao excluir despesa ${this.selectedDespesaId}`)
            console.error('Erro: ', error)
          })
      }

      // Clear temp state
      this.selectedDespesaId = undefined

      // Unregister choise listener from ConfirmationDialog
      ConfirmationDialogEventBus.offChoose(this.onChoose)
    },

    onSwitchPago (despesa, pago) {
      DespesaService.update(despesa.id, {pago})
        .then(response => {
          console.log(response)
          SnackbarEventBus.emitSnack('Despesa atualizada com sucesso')
        })
        .catch(error => {
          SnackbarEventBus.emitSnack(`Erro ao atualizar despesa ${despesa.id}`)
          console.error('Erro: ', error)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
  .pago {
    text-decoration: line-through !important;
  }
</style>
