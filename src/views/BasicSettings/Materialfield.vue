<template>
    <div>
        <FullPage 
        title='物料分类字段'
        :list='list' 
        @init='init' 
        @searchData='searchData' 
        @changePage='changePage'
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
                <Modal @on-ok="postInfo" :title="showTitle" v-model="showModal" :width="480" @on-visible-change='vivibleModal'>
                    <Form :label-width="90">
                        <FormItem label="ID：">
                            <Input placeholder="请输入ID" v-model="classInfo.id"/>
                        </FormItem>
                        <FormItem label="分类名称：">
                            <Input placeholder="请输入分类名称" v-model="classInfo.title"/>
                        </FormItem>
                    </Form>

                    <!-- <div class="modal-footer" slot="footer"></div> -->
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
            this.getData(row)
        },
        searchData(row){
            this.getData(row)
        },
        getData(row){
            this.axios('/proxy/api/basics_material_index',{params:row}).then(res=>{
                this.tableData = res.data;
            })
        },
        changePage(e){
            this.pageIndex = e;
        },
        addItems(obj){
            this.showModal = true;
            if(obj.id){
                this.showTitle='编辑分类'
                this.classInfo.id = obj.id;
                this.classInfo.title = obj.title;
            }else{
                //新增
            } 
        },
        delItems(row){
            console.log(row)
            this.confirmDelete({
                content:'确认删除么？',
                then:()=>{

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
            
        }
    }
}
</script>

<style lang="scss" scoped>
.nav{display: flex;justify-content: space-between;align-items: center;}
</style>