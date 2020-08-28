<template>
    <div>
        <FullPage 
        title='物料分类字段'
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
                <Button type="primary" ghost icon='md-add' @click="addItems">新增物料分类</Button>
            </div>
            
            <template slot='set' slot-scope='row'>
                <div>
                    <Icon @click="addItems(row.row)" size='20' style="margin-right:10px;color:#3764FF;cursor:pointer" type="ios-create-outline" />
                    <Icon @click="delItems(row.row)"  size='20' style="margin-left:10px;color:red;cursor:pointer" type="ios-trash-outline" />
                </div>
            </template>
            
            <div>
                <Modal class-name="vertical-center-modal" @on-ok="postInfo" :title="showType == 1 ? '新增物料': '编辑物料'" v-model="showModal" :width="480" @on-visible-change='vivibleModal'>
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
export default {
    data(){
        return {
            list:[
                {title:'ID',name:'Input',value:null,serverName:'id',placeholder:'请输入ID'},
                {title:'物料分类名称',name:'Input',value:'',serverName:'title',placeholder:'请输入物料分类名称'},
            ],
            tableColums:[
                {title:'ID',align:'center',key:'id'},
                {title:'物料分类',align:'center',key:'title'},
                {title:'操作',align:'center',slot:'set'},
            ],
            tableData:[],
            pageIndex:1,
            total:0,
            pageSize:10,
            showModal:false,
            showType:1,
            classInfo:{
                id:'',
                title:''
            },
            proxyObj:{},
            loading:false,
        }
    },
    
    methods:{
        init(row){
            row.page_index = this.pageIndex;
            row.page_size = this.pageSize;
            this.proxyObj = row;
            this.getData(row)
        },
        getData(row){
            this.loading = true;
            this.axios('/api/basics_material_index',{params:row}).then(res=>{
                this.loading = false;
                this.tableData = res.data.data;
                this.total = res.data.total;
            })
        },
        changePage(e){
            this.pageIndex = e;
            this.proxyObj.page_index = e;
            this.getData(this.proxyObj)
        },
        changeSize(e){
            this.pageSize = e;
            this.proxyObj.page_size = this.pageSize;
            this.getData(this.proxyObj)
        },
        addItems(obj){
            this.showModal = true;
            if(obj.id){
                this.showType=2
                this.classInfo.id = obj.id;
                this.classInfo.title = obj.title;
            }else{
                //新增
                this.showType=1
            } 
        },
        delItems(row){
            this.confirmDelete({
                content:'确认删除么？',
                then:()=>{
                    this.axios.post('/api/basics_material_del',{id:row.id,state:0}).then(res=>{
                        if(res.code == 200){
                            this.$Message.success(res.msg)
                            this.getData(this.proxyObj)
                        } 
                    })
                }
            })
        },
        vivibleModal(e){
            if(!e){
                this.classInfo = {
                    id:'',
                    title:''
                }
            }
        },
        postInfo(){
            let post_url = this.showType == 1 ? '/api/basics_material_add' : '/api/basics_material_edit';
            this.axios.post(post_url,this.classInfo).then(res=>{
                this.$Message.success(res.msg)
                this.getData(this.searchObj)
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.nav{display: flex;justify-content: space-between;align-items: center;}
.vertical-center-modal{
        display: flex;
        align-items: center;
        justify-content: center;
        .ivu-modal{
            top: 0;
        }
    }
</style>