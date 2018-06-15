<template>
  <section id="m-despesas-edit-page" class="m-component m-page">

    <!-- Breadcrumbs de navegação -->
    <v-breadcrumbs>
      <v-icon slot="divider">chevron_right</v-icon>
      <v-breadcrumbs-item href="/">
        Home Page
      </v-breadcrumbs-item>
    </v-breadcrumbs>

    <v-layout row wrap>

      <!-- Formulário de Despesa -->
      <v-flex xs12>
        <Loading v-if="!despesa" />
        <DespesaForm v-else :despesa="despesa" />
      </v-flex>
    </v-layout>

  </section>
</template>

<script>
import DespesaService from '@/despesas/service/despesa.service'
import DespesaForm from './DespesaForm'
import Loading from '@/shared/components/loading/Loading'

export default {
  name: 'DespesasEditPage',

  created () {
    DespesaService.findById(this.despesaId)
      .then(despesa => this.despesa = despesa)
      .catch(e => console.error(e))
  },

  components: {
    Loading,
    DespesaForm
  },

  data () {
    return {
      despesa: null
    }
  },

  computed: {
    despesaId() {
      return this.$route.params.despesaId
    }
  }
}
</script>
