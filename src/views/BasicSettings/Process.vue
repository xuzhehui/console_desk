<template>
    <div>
         <FullPage 
        title='工序分类'
        :list='list' 
        :loading='loading'
        @init='init' 
        @searchData='init' 
        @changePage='changePage'
        @changeSize='changeSize'
        :tableColums='tableColums'
        :tableData='tableData'
        :pageIndex='pageIndex'
        :total='total'
        >
            <div slot='navButton'>
                <Button type="primary" ghost icon='md-add' @click="addItems(null,1,null)">新增工序分类</Button>
            </div>
            
            <template slot='set' slot-scope='{row}'>
                <div class="table-set">
                    <svg @click="addItems(row,1,null)" class="icon icon-nav" aria-hidden="true">
                        <use xlink:href="#iconxinzengshuxing"></use>
                    </svg>

                    <svg style="font-size:20px" color='#3764FF' @click="addItems(row,2,1)" class="icon icon-nav" aria-hidden="true">
                        <use xlink:href="#iconbianji"></use>
                    </svg>

                    <svg @click="delItems(row)" class="icon icon-nav" style="font-size:20px" color='red' aria-hidden="true">
                        <use xlink:href="#iconshanchu"></use>
                    </svg>
                </div>
            </template>

            <div>
                <Modal class-name="vertical-center-modal" @on-ok="postInfo" :title="showType == 1 ? '新增工序分类': '编辑工序分类'" v-model="showModal" :width="480" @on-visible-change='vivibleModal'>
                    <Form :label-width="90">
                        <FormItem label="ID：">
                            <Input disabled placeholder="ID自动生成" v-model="classInfo.id"/>
                        </FormItem>
                        <FormItem label="分类名称：">
                            <Input placeholder="请输入分类名称" v-model="classInfo.title"/>
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        </FullPage>
    </div>
</template>

<script>
import Tables from '../../components/table-column/index'
import {mapActions} from 'vuex'
export default {
    data(){
        const vm = this
        return {
            list:[
                {title:'工序分类名称',name:'Input',value:'',serverName:'title',placeholder:'请输入工序分类名称'},
            ],
            tableColums:[
                {type:'expand',title:'展开',width:'70',slot:'open',
                    render(h,params){
                        const { row } = params
                        return h(Tables,{
                            props:{
                                tableDatas:params.row.child||[]
                            },
                            on:{
                                updataTables:(array)=>vm._data.tableData = array
                            }
                        })
                    }
                },
                {title:'ID',align:'center',key:'id',width:'100'},
                {title:'工序分类名称',align:'center',key:'title'},
                {title:'操作',align:'center',slot:'set',width:'150'},
            ],
            tableData:[],
            pageIndex:1,
            total:0,
            pageSize:10,
            showType:1,
            showModal:false,
            classInfo:{},
            proxyObj:{},
            loading:false,
        }
    },
    methods:{
        ...mapActions(['undata_navData']),
        init(row){
            row.page_size = this.pageSize;
            row.page_index = this.pageIndex;
            this.proxyObj = row;
            this.getData(row)
        },
        getData(row){
            this.loading = true;
            this.axios('/api/basics_procedure_index',{params:row}).then(res=>{
                this.loading = false;
                this.tableData = res.data.data;
                this.total = res.data.total;
            })
        },
        changePage(e){
            this.pageIndex = e;
            this.proxyObj.page_index = this.pageIndex;
            this.getData(this.proxyObj)
        },
        changeSize(e){
            this.pageSize = e;
            this.proxyObj.page_size = this.pageSize
            this.getData(this.proxyObj)
        },
        postInfo(){
            let post_url = this.showType == 1 ? '/api/basics_procedure_add' : '/api/basics_procedure_edit';
            this.axios.post(post_url,this.classInfo).then(res=>{
                if(res.code == 200){
                    this.$Message.success(res.msg)
                    this.getData(this.searchObj)
                    this.undata_navData()
                }  
            })
        },
        vivibleModal(e){
            if(!e){
                this.classInfo = {
                    id:null,
                    title:''
                }
            }
        },
        addItems(obj,type,edit){
            this.showModal = true;
            this.showType = type;
            if(obj.id){
                this.classInfo.id = obj.id;
                this.classInfo.title = edit == 1 ? obj.title : '';
            }else{
                //新增
                this.showType=1
            } 
        },
        delItems(row){
            this.confirmDelete({
                content:'确认删除么？',
                then:()=>{
                    this.axios.post('/api/basics_procedure_del',{id:row.id,state:0}).then(res=>{
                        if(res.code == 200){
                            this.$Message.success(res.msg)
                            this.getData(this.proxyObj)
                            this.undata_navData()
                        } 
                    })
                }
            })
        },
        saveTables(array){
            this.tableData = Array
        }
    }
}
</script>

<style lang="scss" scoped>
.nav{display: flex;justify-content: space-between;align-items: center;}
.icon-nav{margin-right:5px;font-size:16px;}
/deep/ td.ivu-table-expanded-cell{padding:15px 10px;}
</style>