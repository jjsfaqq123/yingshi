import Vue from 'vue'
import Router from 'vue-router'
import  header from "./components/header.vue"


Vue.use(Router)

export default new Router({
  routes: [
    {
      path:"/header",component:header,
    }
  ]
})