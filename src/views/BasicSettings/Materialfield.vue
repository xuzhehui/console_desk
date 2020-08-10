<template>
    <div>
        <Toptitle title="物料分类字段" />
        <div class="nav">
            <Topsearch :list='list' @init='init' @searchData='searchData'/>
            <Button type="primary" ghost icon='md-add' @click="addItems">新增物料分类</Button>
        </div>

        <Table max-height='600' stripe border :columns="tableColums" :data="tableData">
            <template slot-scope="{ row }" slot="set">
                <Icon size='20' style="margin-right:10px;color:#3764FF;cursor:pointer" type="ios-create-outline" />
                <Icon @click="delItems" size='20' style="margin-left:10px;color:red;cursor:pointer" type="ios-trash-outline" />
            </template>
        </Table>

        <Modal :title="showTitle" v-model="showModal" :width="480">
            <Form :label-width="90">
                <FormItem label="ID：">
                    <Input placeholder="请输入ID" v-model="classInfo.id"/>
                </FormItem>
                <FormItem label="分类名称：">
                    <Input placeholder="请输入分类名称" v-model="classInfo.title"/>
                </FormItem>
            </Form>
        </Modal>

        <Footer :pageIndex='pageIndex' :total='total' @change='changePage' />
    </div>
</template>

<script>
export default {
    data(){
        return {
            list:[
                {title:'ID',name:'Input',value:2,serverName:'id',placeholder:'请输入ID'},
                {title:'物料分类名称',name:'Input',value:'',serverName:'user_name',placeholder:'请输入物料分类名称'},
            ],
            tableColums:[
                {title:'ID',align:'center',key:'id'},
                {title:'物料分类',align:'center',key:'title'},
                {title:'操作',align:'center',slot:'set'},
            ],
            tableData:[
                {id:'1'},{id:'1'},{id:'1'},{id:'1'},{id:'1'},{id:'1'},{id:'1'},{id:'1'},{id:'1'},{id:'1'},{id:'1'},
            ],
            pageIndex:1,
            total:100,
            showModal:false,
            showTitle:'新增分类',
            classInfo:{
                id:'',
                title:''
            }
        }
    },
    
    methods:{
        init(row){
            console.log(row)
        },
        searchData(row){
            console.log(row)
            
        },
        changePage(e){
            this.pageIndex = e;
        },
        addItems(obj){
            this.showModal = true;
            if(obj.id){
                this.showTitle='编辑分类'
            }else{
                //新增
            } 
        },
        delItems(row){
            this.confirmDelete({
                content:'确认删除么？',
                then:()=>{console.log(this.showTitle)}
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.nav{display: flex;justify-content: space-between;align-items: center;}
</style>