import VueRoute from 'vue-router'
import Vue from 'vue'
import routerMap from '../routerMap/index'

const routerPush = VueRoute.prototype.push
VueRoute.prototype.push = function push(location) {//防止重新加载相同的路由时控制台报错
  return routerPush.call(this, location).catch(error=> error)
}

Vue.use(VueRoute)

const routes = [
    {
        path:'/',
        name:'Login',
        meta:{index:1,title:'九方家装'},
        
        component: resolve => require(['@/views/login'], resolve)
    },
    {
        path:'/cms',
        name:'Cms',
        meta:{index:2},
        component: resolve => require(['@/views/cms'], resolve),
        children:routerMap, 
    }

]


const router = new VueRoute({
    // 配置路由和组件之间的应用关系
    routes,
    mode: 'hash',
    linkActiveClass: 'active'
})
document.title = '九方家装'

router.beforeEach((to, from, next) => {
    if(to.path === '/'){
      next();
    }else{
      let token = localStorage.getItem('token');
      if(!token) {
        next('/');
      }else{
        next();
      }
    }
});

export default router