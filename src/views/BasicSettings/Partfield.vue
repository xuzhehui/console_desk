<template>
    <div>
        <FullPage 
        title='部件字段'
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
            <div slot='titleButton'>
                <Button type="success" ghost icon='md-exit' style="margin-right:10px;">批量导入</Button>
                <Button type="warning" ghost icon='md-return-left'>批量导出</Button>
            </div>
            <div slot='navButton'>
                <Button type="primary" ghost icon='md-add' @click="addItems">新增部件</Button>
            </div>
            
            <template slot='set' slot-scope='{row}'>
                <div>
                    <Icon size='20' @click="addItems(row)" style="margin-right:10px;color:#3764FF;cursor:pointer" type="ios-create-outline" />
                    <Icon size='20' @click="delItems(row)" style="margin-left:10px;color:red;cursor:pointer" type="ios-trash-outline" />
                </div>
            </template>

            <div>
                <Modal class-name="vertical-center-modal" @on-ok="postInfo" :title="showType == 1 ? '新增部件': '编辑部件'" v-model="showModal" :width="480" @on-visible-change='vivibleModal'>
                    <Form :label-width="90">
                        <FormItem label="ID：">
                            <Input disabled placeholder="ID自动生成" v-model="classInfo.id"/>
                        </FormItem>
                        <FormItem label="部件名称：">
                            <Input placeholder="请输入部件名称" v-model="classInfo.title"/>
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
                {title:'ID',name:'Input',value:'',serverName:'id',placeholder:'请输入ID'},
                {title:'部件名称',name:'Input',value:'',serverName:'title',placeholder:'请输入部件名称'},
            ],
            tableColums:[
                {title:'ID',align:'center',key:'id'},
                {title:'部件名称',align:'center',key:'title'},
                {title:'操作',align:'center',slot:'set'},
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
        init(row){
            row.page_size = this.pageSize;
            row.page_index = this.pageIndex;
            this.proxyObj = row;
            this.getData(row)
        },
        getData(row){
            this.loading = true;
            this.axios('/api/basics_parts_index',{params:row}).then(res=>{
                this.loading = false,
                this.tableData = res.data.data;
                this.total = res.data.total
            })
        },
        changePage(e){
            this.pageIndex = e;
            this.proxyObj.page_index = this.pageIndex;
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
        postInfo(){
            let post_url = this.showType == 1 ? '/api/basics_parts_add' : '/api/basics_parts_edit';
            this.axios.post(post_url,this.classInfo).then(res=>{
                this.$Message.success(res.msg)
                this.getData(this.proxyObj)
            })
        },
        vivibleModal(e){
            if(!e){this.classInfo = {}}
        },
        delItems(row){
            this.confirmDelete({
                content:'确认删除么？',
                then:()=>{
                    this.axios.post('/api/basics_parts_del',{id:row.id,state:0}).then(res=>{
                        if(res.code == 200){
                            this.$Message.success(res.msg)
                            this.getData(this.proxyObj)
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