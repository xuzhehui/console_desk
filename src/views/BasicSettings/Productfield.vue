<template>
    <div>
        <FullPage 
        title='产品分类字段'
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
                <Button type="primary" ghost icon='md-add' @click="addItems">新增产品分类</Button>
            </div>
            
            <template slot='set' slot-scope='row'>
                <div>
                    <Icon size='20' @click="addItems(row.row)" style="margin-right:10px;color:#3764FF;cursor:pointer" type="ios-create-outline" />
                    <Icon size='20' style="margin-left:10px;color:red;cursor:pointer" type="ios-trash-outline" />
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
export default {
    data(){
        return {
            list:[
                {title:'ID',name:'Input',value:'',serverName:'id',placeholder:'请输入ID'},
                {title:'产品分类名称',name:'Input',value:'',serverName:'user_name',placeholder:'请输入产品分类名称'},
            ],
            tableColums:[
                {title:'ID',align:'center',key:'id'},
                {title:'产品分类名称',align:'center',key:'title'},
                {title:'操作',align:'center',slot:'set'},
            ],
            tableData:[],
            pageIndex:1,
            total:100,
            showModal:false,
            showType:1,
            classInfo:{

            },
            measureList:[],//测量字段列表
            searchObj:{}
        }
    },
    methods:{
        init(row){
            this.searchObj = row;
            this.getData(row)
        },
        searchData(row){
            this.getData(row)
        },
        getData(row){
            this.axios('/proxy/api/basics_product_index',{params:row}).then(res=>{
                this.tableData = res.data;
            })
        },
        getMeasure(){//获取基础测量字段列表
            this.axios('/proxy/api/basics_measure_index').then(res=>{
                this.measureList = res.data;
            })
        },
        changePage(e){
            this.pageIndex = e;
        },
        addItems(obj){
            this.showModal = true;
            this.getMeasure()
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
            let post_url = this.showType == 1 ? '/proxy/api/basics_product_add' : '/proxy/api/basics_product_edit',post_data={
                id:this.classInfo.id,
                title:this.classInfo.title,
                measure_id:this.classInfo.measure_id.join(',')
            }
            this.axios.post(post_url,post_data).then(res=>{
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