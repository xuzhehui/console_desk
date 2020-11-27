//此处注册全局组件

import Topsearch from '../components/Topsearch/index'
import Toptitle from '../components/TopTitle/index'
import Footer from '../components/footer/index'
import FullPage from '../components/currencyPage/index'
import Loading from '../components/loading/index' // 引入loading
import Tables from '../components/table-column/index'
import ProductTables from '../components/table-column/productField'
import ColumnDropTree from '../components/drowDown/index'

import ConfirmDelete from '../components/confirm-delete/index.js'
import ConfirmEdit from '../components/confirm/edit/index'


export default (Vue)=>{
  Vue.component("Topsearch", Topsearch)
  Vue.component('Toptitle', Toptitle)  
  Vue.component('Footer', Footer)
  Vue.component('FullPage', FullPage)
  Vue.component('Tables', Tables)
  Vue.component('ProductTables', ProductTables)
  Vue.component('ColumnDropTree',ColumnDropTree)
  Vue.use(Loading)
  Vue.use(ConfirmDelete)//删除--确认
  Vue.use(ConfirmEdit)//删除--确认
}