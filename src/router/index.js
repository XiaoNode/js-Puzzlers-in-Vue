import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Item from '@/components/Item'
import Result from '@/components/result'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/item',
      name: 'Item',
      component: Item
    },
    {
      path: '/result',
      name: 'Result',
      component: Result
    },
    { path: '*', redirect: '/', hidden: true }
  ]
})
