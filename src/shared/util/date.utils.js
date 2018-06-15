import moment from 'moment'

class DateUtils {

  /**
   * Retorna o mês corrente (indexado a partir de 1. Jan => 1, Fev => 2, ...)
   */
  getMesCorrente () {
    return moment().month() + 1
  }
}

export default new DateUtils()
