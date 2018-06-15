// import yup from 'yup'
import * as yup from 'yup'

export const schema = yup.object().shape({
  mes: yup.number().integer().min(1).max(12).required(),
  nome: yup.string().required(),
  vencimento: yup.date().required(),
  responsavel: yup.string().required(),
  valor: yup.number().positive().required(),
  pago: yup.boolean().required()
})
