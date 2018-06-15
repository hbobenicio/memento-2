import TheHomePage from '@/homepage/TheHomePage'
import TheDespesasPage from '@/despesas/TheDespesasPage'
import TheDespesasEditPage from '@/despesas/TheDespesasEditPage'
import TheDespesasNewPage from '@/despesas/TheDespesasNewPage'

export default [
  { path: '/', name: 'home', component: TheHomePage },
  { path: '/despesas/:mes', name: 'despesas', component: TheDespesasPage },
  { path: '/despesas/:despesaId/edit', name: 'despesas-edit', component: TheDespesasEditPage },
  { path: '/despesas/:mes/new', name: 'despesas-new', component: TheDespesasNewPage }
]
