<template>
  <div class="m-component m-card-mes">
    <router-link :to="{ name: 'despesas', params: { mes: mes.index } }">
      <v-card :color="cor" class="elevation-3 ma-2">
        <v-card-text class="m-card-mes-text">
          <h2>{{ mes.label }}</h2>
        </v-card-text>
      </v-card>
    </router-link>
  </div>
</template>

<script>
import meses from '@/shared/meses'
import oneOf from '@/shared/validators/one-of.validator'

export const TIPO_OK = 'ok'
export const TIPO_PENDENTE = 'pendente'
export const TIPO_FUTURO = 'futuro'

export default {
  name: 'CardMes',
  props: {
    tipo: {
      type: String,
      default: TIPO_FUTURO,
      validator: oneOf([TIPO_OK, TIPO_PENDENTE, TIPO_FUTURO])
    },
    indiceMes: {
      type: Number,
      required: true,
      validator: oneOf(meses.map(m => m.index))
    }
  },
  data: () => ({
    corMesOk: 'green accent-4',
    corMesPendente: 'amber lighten-1',
    corMesFuturo: 'white',
  }),
  computed: {
    isOk () {
      return this.tipo === TIPO_OK
    },
    isPendente () {
      return this.tipo === TIPO_PENDENTE
    },
    isFuturo () {
      return this.tipo === TIPO_FUTURO
    },
    mes () {
      return meses.filter(m => m.index === this.indiceMes)[0]
    },
    cor () {
      if (this.isOk) {
        return this.corMesOk
      }

      if (this.isPendente) {
        return this.corMesPendente
      }

      return this.corMesFuturo
    }
  }
}
</script>

<style lang="scss" scoped>
  $card-height: 85px;

  .m-card-mes {
    .card {
      height: $card-height !important;
    }
  }

  .m-card-mes:hover {
    cursor: pointer;
  }

  .m-card-mes-text {
    padding: 0px;
    height: 100%;
    vertical-align: middle;
    line-height: $card-height;
  }

  a {
    text-decoration: none;
  }
</style>
