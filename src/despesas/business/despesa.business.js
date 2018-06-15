import meses from '@/shared/meses'
import DateUtils from '@/shared/util/date.utils'

class DespesaBC {

  obterPendencias(despesas) {
    const mesAtual = DateUtils.getMesCorrente()
    let pendencias = []

    for (const mes of meses) {
      if (mes.index > mesAtual) {
        pendencias.push('futuro')
      } else {
        const qtdDespesasPendentes = despesas
          .filter(d => d.mes === mes.index)
          .filter(d => !d.pago)
          .length

        if (qtdDespesasPendentes > 0) {
          pendencias.push('pendente')
        } else {
          pendencias.push('ok')
        }
      }
    }

    return pendencias
  }

}

export default new DespesaBC()
