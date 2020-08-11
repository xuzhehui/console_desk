<template>
    <div>
        <FullPage 
        title='部件字段'
        :list='list' 
        @init='init' 
        @searchData='searchData' 
        @changePage='changePage'
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
            
            <template slot='set' slot-scope='row'>
                <div>
                    <Icon size='20' style="margin-right:10px;color:#3764FF;cursor:pointer" type="ios-create-outline" />
                    <Icon size='20' style="margin-left:10px;color:red;cursor:pointer" type="ios-trash-outline" />
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
            total:100,
            showModal:false,
            showType:1,
            classInfo:{},
            searchObj:{}
        }
    },
    methods:{
        init(row){
            this.searchObj = row;
            this.getData(row)
        },
        searchData(row){
            console.log(row)
        },
        getData(row){
            this.axios('/proxy/api/basics_parts_index').then(res=>{
                this.tableData = res.data;
            })
        },
        changePage(e){
            this.pageIndex = e;
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
            let post_url = this.showType == 1 ? '/proxy/api/basics_parts_add' : '/proxy/api/basics_parts_edit';
            this.axios.post(post_url,this.classInfo).then(res=>{
                this.$Message.success(res.msg)
                this.getData(this.searchObj)
            })
        },
        vivibleModal(e){
            if(!e){this.classInfo = {}}
        }
    }
}
</script>

<style lang="scss" scoped>
.nav{display: flex;justify-content: space-between;align-items: center;}
</style>