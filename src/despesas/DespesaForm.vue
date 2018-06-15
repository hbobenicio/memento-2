<template>
  <v-card>

    <!-- Título -->
    <v-card-title>
      <span class="headline">{{titulo}}</span>
    </v-card-title>

    <!-- Campos -->
    <v-card-text>
      <v-container grid-list-md>
        <v-layout wrap>

          <v-flex xs12>
            <v-menu
              ref="menu"
              :close-on-content-click="false"
              v-model="showModalVencimento"
              :nudge-right="40"
              :return-value.sync="formModel.vencimento"
              lazy
              transition="scale-transition"
              offset-y
              full-width
              min-width="290px">

              <v-text-field
                slot="activator"
                v-model="formModel.vencimento"
                label="Data de Vencimento"
                prepend-icon="event"
                readonly />

              <v-date-picker v-model="formModel.vencimento"
                color="green lighten-1"
                @input="$refs.menu.save(formModel.vencimento)" />
            </v-menu>
          </v-flex>

          <v-flex xs12>
            <v-text-field label="Nome da Despesa" required
              v-model="formModel.nome"
              @change="validarFormulario">
            </v-text-field>
          </v-flex>

          <v-flex xs12>
            <v-text-field label="Responsável" required
              v-model="formModel.responsavel"
              @change="validarFormulario">
            </v-text-field>
          </v-flex>

          <v-flex xs12>
            <v-text-field label="Valor" prefix="R$" required
              hint="999.99"
              :rules="[rules.required, rules.numerico]"
              v-model="formModel.valor"
              @change="validarFormulario" />
          </v-flex>

        </v-layout>
      </v-container>

      <small class="red--text">*campos obrigatórios</small>
    </v-card-text>

    <!-- Ações -->
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn flat color="red" @click.native="onCancelar">Cancelar</v-btn>
      <v-btn flat color="blue darken-1"
        :disabled="!despesaValida"
        @click.native="onSalvar">Salvar</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { schema as DespesaSchema } from '@/despesas/model/despesa.schema'
import DespesaService from './service/despesa.service'

export default {
  name: 'DespesaForm',

  props: ['despesa'],

  created () {
    if (this.editMode) {
      this.formModel = Object.assign({}, this.despesa)
    } else {
      this.formModel.mes = this.$route.params.mes
    }
  },

  data () {
    return {
      showModalVencimento: false,
      despesaValida: false,
      formModel: {
        vencimento: null,
        nome: '',
        responsavel: '',
        valor: '0.0',
        pago: false
      },

      /**
       * Rules for v-text-field validation.
       */
      rules: {
        required: (valor) => !!valor || 'Campo obrigatório.',
        numerico: (valor) => {
          return true
        }
      }
    }
  },

  computed: {
    mode () {
      return this.despesa ? 'edit' : 'new'
    },

    editMode () {
      return this.mode === 'edit'
    },

    newMode () {
      return this.mode === 'new'
    },

    titulo () {
      return this.newMode ? 'Nova Despesa' : 'Editar Despesa'
    }
  },

  watch: {
    'formModel.vencimento' (newValue) {
      this.validarFormulario()
    }
  },

  methods: {
    onCancelar () {
      const mes = this.newMode ? this.$route.params.mes : this.formModel.mes
      this.$router.push({
        name: 'despesas',
        params: {
          mes
        }
      })
    },

    onSalvar () {
      // Corrigir Data antes de salvar!
      if (this.newMode) {
        DespesaService.create(this.formModel)
          .then(_ => this.$router.go(-1))
          .catch(e => console.error('Error ao criar Despesa.', e))
      } else if (this.editMode) {
        console.log(this.formModel)
        DespesaService.update(this.formModel.id, this.formModel)
          .then(_ => this.$router.go(-1))
          .catch(e => console.error('Error ao atualizar Despesa.', e))
      } else {
        throw new Error('Modo Inválido')
      }
    },

    validarFormulario () {
      DespesaSchema.isValid(this.formModel)
        .then(_ => {
          this.despesaValida = true
        })
        .catch(e => {
          this.despesaValida = false
          console.log('Despesa falhou na validação: ', e)
        })
    }
  }
}
</script>
