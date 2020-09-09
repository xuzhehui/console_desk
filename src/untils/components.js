//此处注册全局组件

import Topsearch from '../components/Topsearch/index'
import Toptitle from '../components/TopTitle/index'
import Footer from '../components/footer/index'
import FullPage from '../components/currencyPage/index'
import Loading from '../components/loading/index' // 引入loading
import Generaladd from '../components/Generaladd/index'
import Tables from '../components/table-column/index'
import ProductTables from '../components/table-column/productField'

export default (Vue)=>{
  Vue.component("Topsearch", Topsearch)
  Vue.component('Toptitle', Toptitle)  
  Vue.component('Footer', Footer)
  Vue.component('FullPage', FullPage)
  Vue.component('Generaladd', Generaladd)
  Vue.component('Tables', Tables)
  Vue.component('ProductTables', ProductTables)
  Vue.use(Loading)
}