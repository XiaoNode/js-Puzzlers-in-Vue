import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Item from '@/components/Item'

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
      component: Hello
    },
    { path: '*', redirect: '/', hidden: true }
  ]
})
