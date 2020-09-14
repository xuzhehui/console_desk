<template>
    <div>
        <FullPage 
        title='测量字段'
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
                <Button type="primary" ghost icon='md-add' @click="addItems">新增测量单位</Button>
            </div>
            
            <template slot='set' slot-scope='{row}'>
                 <div class="table-set">
                    <svg style="font-size:20px" color='#3764FF' @click="addItems(row)" class="icon icon-nav" aria-hidden="true">
                        <use xlink:href="#iconbianji"></use>
                    </svg>

                    <svg @click="delItems(row)" class="icon icon-nav" style="font-size:20px" color='red' aria-hidden="true">
                        <use xlink:href="#iconshanchu"></use>
                    </svg>
                </div>
            </template>

            <div>
                <Modal class-name="vertical-center-modal" @on-ok="postInfo" :title="showType == 1 ? '新增测量单位': '编辑测量单位'" v-model="showModal" :width="480" @on-visible-change='vivibleModal'>
                    <Form :label-width="90">
                        <FormItem label="ID：">
                            <Input disabled placeholder="ID自动生成" v-model="classInfo.id"/>
                        </FormItem>
                        <FormItem label="单位名称：">
                            <Input placeholder="请输入单位名称" v-model="classInfo.title"/>
                        </FormItem>
                        <FormItem label="英文名称：">
                            <Input placeholder="请输入英文名称" v-model="classInfo.e_title"/>
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        </FullPage>
    </div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
    data(){
        return {
            list:[
                {title:'单位名称',name:'Input',value:'',serverName:'title',placeholder:'请输入单位名称'},
                {title:'英文名称',name:'Input',value:'',serverName:'e_title',placeholder:'请输入英文名称'},
            ],
            tableColums:[
                {title:'ID',align:'center',key:'id',width:'100'},
                {title:'单位名称',align:'center',key:'title'},
                {title:'英文名称',align:'center',key:'e_title'},
                {title:'操作',align:'center',slot:'set',width:'150'},
            ],
            tableData:[],
            pageIndex:1,
            pageSize:10,
            total:0,
            showModal:false,
            showType:1,
            classInfo:{},
            proxyObj:{},
            loading:false,
        }
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
            this.axios('/api/basics_measure_index',{params:row}).then(res=>{
                this.loading = false;
                this.tableData = res.data.data;
                this.total = res.data.total;
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
        addItems(obj){
            this.showModal = true;
            if(obj.id){
                this.showType=2
                this.classInfo.id = obj.id;
                this.classInfo.title = obj.title;
                this.classInfo.e_title = obj.e_title;
            }else{
                //新增
                this.showType=1
            } 
        },
        postInfo(){
            let post_url = this.showType == 1 ? '/api/basics_measure_add' : '/api/basics_measure_edit';
            this.axios.post(post_url,this.classInfo).then(res=>{
                if(res.code == 200){
                    this.$Message.success(res.msg)
                    this.getData(this.searchObj)
                    this.undata_navData()
                }
            })
        },
        vivibleModal(e){
            if(!e){this.classInfo = {};}
        },
        delItems(row){
            this.confirmDelete({
                content:'确认删除么？',
                then:()=>{
                    this.axios.post('/api/basics_measure_del',{id:row.id,state:0}).then(res=>{
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
</style>