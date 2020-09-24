<template>
    <div>
        <FullPage 
        title='产品分类字段'
        :list='list' 
        @init='init' 
        :loading='loading'
        @searchData='init' 
        @changePage='changePage'
        @changeSize='changeSize'
        :tableColums='tableColums'
        :tableData='tableData'
        :pageIndex='pageIndex'
        :total='total'
        >
            <div slot='navButton'>
                <Button type="primary" ghost icon='md-add' @click="addItems(null,1,null)">新增产品分类</Button>
            </div>
            
            <template slot='set' slot-scope='{row}'>
                <div class="table-set">
                    <svg  @click="addItems(row,1,0)" class="icon icon-nav" aria-hidden="true">
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
                <Modal class-name="vertical-center-modal" @on-ok="postInfo" :title="showType == 1 ? '新增产品分类': '编辑产品分类'" v-model="showModal" :width="480" @on-visible-change='vivibleModal'>
                    <Form :label-width="120">
                        <FormItem label="ID：">
                            <Input disabled placeholder="ID自动生成" v-model="classInfo.id"/>
                        </FormItem>
                        <FormItem label="产品分类名称：">
                            <Input placeholder="请输入产品分类名称" v-model="classInfo.title"/>
                        </FormItem>
                        <!-- <FormItem label="父级名称：">
                            <Select v-model="classInfo.p_id">
                                <Option v-for="item of parentIds" :value="item.id" :key="item.id" :label="item.title"></Option>
                            </Select>
                        </FormItem> -->
                        <FormItem label="基础测量字段：">
                            <CheckboxGroup v-model="classInfo.measure_id">
                                <Checkbox style="margin-right:10px;margin-bottom:10px;" v-for="item of measureList" :key="item.id" :label="item.id" border>
                                    {{item.title+'('+ item.e_title +')'}}
                                </Checkbox>
                            </CheckboxGroup>
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        </FullPage>
    </div>
</template>

<script>
import Tables from '../../components/table-column/productField'
import {mapActions} from 'vuex'
export default {
    data(){
        let vm = this;
        return {
            list:[
                {title:'产品分类名称',name:'Input',value:'',serverName:'title',placeholder:'请输入产品分类名称'},
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
                {title:'产品分类名称',align:'center',key:'title'},
                {title:'操作',align:'center',slot:'set',width:'150'},
            ],
            tableData:[],
            pageIndex:1,
            total:0,
            pageSize:10,
            showModal:false,
            showType:1,
            classInfo:{
            },
            measureList:[],//测量字段列表
            proxyObj:{},
            loading:false,
            parentIds:[],
        }
    },
    mounted(){
        this.getMeasure()
        this.getParent()
    },
    methods:{
        ...mapActions(['undata_navData']),
        init(row){
            row.page_index = this.pageIndex;
            row.page_size = this.pageSize;
            this.proxyObj = row;
            this.getData(row)
        },
        getData(row){
            this.loading = true;
            this.axios('/api/basics_product_index',{params:row}).then(res=>{
                this.loading = false,
                this.tableData = res.data.data;
                this.total = res.data.total;
            })
        },
        getMeasure(){//获取基础测量字段列表
            this.axios('/api/basics_measure_index').then(res=>{
                this.measureList = res.data.data;
            })
        },
        getParent(){
            this.axios('/api/basics_product_list').then(res=>{
                this.parentIds = res.data;
            })
        },
        changePage(e){
            this.pageIndex = e;
            this.proxyObj.page_index = this.pageIndex;
            this.getData(this.proxyObj);
        },
        changeSize(e){
            this.pageSize = e;
            this.proxyObj.page_size = this.pageSize;
            this.getData(this.proxyObj);
        },
        addItems(obj,type,edit){
            this.showModal = true;
            this.showType = type
            if(edit==1){
                this.getDetails(obj.id)
            }else if(edit == 0){
                this.classInfo.id = obj.id;
            }
        },
        postInfo(){
            let post_url = this.showType == 1 ? '/api/basics_product_add' : '/api/basics_product_edit',post_data={
                id:this.classInfo.id,
                title:this.classInfo.title,
                measure_id:this.classInfo.measure_id.join(',')||'',
                // p_id:this.classInfo.p_id
            }
            this.axios.post(post_url,post_data).then(res=>{
                if(res.code == 200){
                    this.$Message.success(res.msg)
                    this.getData(this.searchObj)
                    this.undata_navData()
                }
            })
        },
        vivibleModal(e){
            if(!e){this.classInfo = {}}
        },
        getDetails(id){
            this.axios('/api/basics_product_detail',{params:{id:id}}).then(res=>{
                let result = [];
                res.data.measure_id.map(v=>result.push(v*1))
                this.classInfo = res.data;
                this.classInfo.measure_id = result;
            })
        },
        delItems(row){
            this.confirmDelete({
                content:'确认删除么？',
                then:()=>{
                    this.axios.post('/api/basics_product_del',{id:row.id,state:0}).then(res=>{
                        if(res.code == 200){
                            this.$Message.success(res.msg)
                            this.getData(this.proxyObj)
                            this.undata_navData()
                        } 
                    })
                }
            })
        },
    }
}
</script>

<style lang="scss" scoped>
.nav{display: flex;justify-content: space-between;align-items: center;}
/deep/ td.ivu-table-expanded-cell{padding:15px 10px;}
</style>