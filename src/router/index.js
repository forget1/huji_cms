import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/Login'

Vue.use(Router)

const Main = r => require.ensure([], () => r(require('@/pages/Main')), 'main')
const HujiList = r => require.ensure([], () => r(require('@/pages/hujiList')), 'hujiList')
const ImportData = r => require.ensure([], () => r(require('@/pages/importData')), 'importData')
const DataExport = r => require.ensure([], () => r(require('@/pages/dataExport')), 'dataExport')

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/main',
      name: 'Main',
      component: Main,
      redirect: '/hujiList',
      beforeEnter: (to, from, next) => {
        let user = sessionStorage.getItem('user')
        if (from.path.startsWith('/')) {
          if (!user) {
            next({ path: '/' })
          } else {
            next()
          }
        } else {
          if (!user) {
            next({ path: '/' })
          } else {
            next()
          }
        }
      },
      children: [
        {
          path: '/hujiList',
          name: 'HujiList',
          component: HujiList,
          meta: ['户籍列表']
        },
        {
          path: '/importData',
          name: 'ImportData',
          component: ImportData,
          meta: ['导入数据']
        },
        {
          path: '/dataExport',
          name: 'DataExport',
          component: DataExport,
          meta: ['导出数据']
        }
      ]
    }
  ]
})
