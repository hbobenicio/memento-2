<template>
  <div id="m-home-page" class="m-component m-page grey lighten-3" fluid>
    <v-snackbar :timeout="3000" top v-model="snackbar">
      {{ snackMsg }}
    </v-snackbar>

    <HomePageTitle />

    <v-container fluid>
      <v-layout row wrap>
        <v-flex xs12 sm6 md4 lg3 class="text-xs-center" v-for="mes in meses" :key="mes.index">
          <CardMes :tipo="tipoPendencias[mes.index - 1]" :indiceMes="mes.index" />
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import HomePageTitle from '@/homepage/TheHomePageTitle.vue'
import CardMes from '@/homepage/CardMes.vue'
import meses from '@/shared/meses'

import DespesaBC from '@/despesas/business/despesa.business'
import DespesaService from '@/despesas/service/despesa.service'

export default {
  name: 'HomePage',
  components: {
    [HomePageTitle.name]: HomePageTitle,
    [CardMes.name]: CardMes
  },
  created () {
    this.listarDespesas()
  },
  data: () => ({
    snackMsg: '',
    snackbar: false,
    titulo: 'Home Page',
    corMesOk: 'green accent-4',
    corMesPendente: 'amber lighten-1',
    corMesFuturo: 'grey lighten-3',
    meses,
    despesas: [],
    tipoPendencias: []
  }),
  methods: {
    // TODO colocar funções de snack em um mixin. Adicionar snacks no App
    snackWithMsg (msg) {
      this.snackMsg = msg
      this.snackbar = true
    },

    listarDespesas () {
      DespesaService.all()
        .then(despesas => {
          this.despesas = despesas
          this.preencherPendencias()
        })
        .catch(error => {
          this.snackWithMsg('Erro ao recuperar a lista de despesas')
          console.error('Erro: ', error)
          this.despesas = []
        })
    },

    preencherPendencias () {
      this.tipoPendencias = DespesaBC.obterPendencias(this.despesas)
    }
  }
}
</script>

<style lang="scss" scoped>
  .m-home-page-title {
    display: block;
    width: 100%;
  }
</style>
