<template>
  <section id="m-despesas-new-page" class="m-component m-page">

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
        <DespesaForm />
      </v-flex>
    </v-layout>

  </section>
</template>

<script>
import DespesaForm from './DespesaForm'

export default {
  name: 'MDespesasEditPage',

  components: {
    DespesaForm
  }
}
</script>
