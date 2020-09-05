<template>
    <div>
        <FullPage 
        :title='$route.query.title'
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
                <Button @click="goDetial(1)" type="primary" ghost icon='md-add'>新增物料</Button>
            </div>
            
            <template slot='set' slot-scope='{row}'>
                <div>
                    <Icon @click="goDetial(2,row)" size='20' style="margin-right:10px;color:#3764FF;cursor:pointer" type="ios-create-outline" />
                    <Icon @click="goDetial(3,row)" size='20' style="margin-right:10px;color:#32C800;cursor:pointer" type="ios-paper-outline" />
                    <Icon @click="delItems(row)" size='20' style="color:red;cursor:pointer"  type="ios-trash-outline" />
                </div>
            </template>
        </FullPage>
    </div>
</template>

<script>
export default {
    data(){
        return {
            list:[
                {title:'ID',name:'Input',serverName:'id',placeholder:'请输入ID',value:''},
                {title:'材质',name:'Input',serverName:'title',placeholder:'请输入材质',value:''}
            ],
            tableColums:[
                {title:'ID',align:'center',key:'id',fixed:'left',width:'100'},
                {title:'材料分类名称',align:'center',key:'type_name',width:'150'},
                {title:'材质',align:'center',key:'title',width:'150'},
                {title:'库存',align:'center',key:'stock',width:'150'},
                {title:'单位',align:'center',key:'unit',width:'100'},
                {title:'预警值',align:'center',key:'warning_number',width:'100'},
                {title:'单价(元)',align:'center',key:'price',width:'120'},
                {title:'长',align:'center',key:'long',width:'100'},
                {title:'宽',align:'center',key:'width',width:'100'},
                {title:'厚',align:'center',key:'high',width:'100'},
                {title:'公式',align:'center',key:'formula',width:'200'},
                {title:'描述',align:'center',key:'remark',width:'200'},
                {title:'操作',align:'center',slot:'set',fixed:'right',width:'150'},
            ],
            tableData:[],
            pageIndex:1,
            total:0,
            pageSize:10,
            loading:false,
            proxyObj:{},
        }
    },
    watch:{
        $route(to){
            this.proxyObj.type_id = to.query.id;
            this.getData(this.proxyObj)
        }
    },
    methods:{
        init(row){
            row.page_index = this.pageIndex;
            row.page_size = this.pageSize;
            row.type_id = this.$route.query.id;
            this.proxyObj = row
            this.getData(row)
        },
        getData(row){
            this.loading = true;
            this.axios('/api/material',{params:row}).then(res=>{
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
            this.proxyObj.page_size = this.pageSize;
            this.getData(this.proxyObj)
        },

        goDetial(n,row){// n = 1 新增 2 编辑 3 查看 
            let id = row ? row.id : ''
            this.$router.push({
                path:`/cms/materialmannage/edit`,
                query:{
                    id:id,
                    type:n,
                    back_id:this.$route.query.id
                }
            })
        },
        delItems(row){
            this.confirmDelete({
                content:'确认删除么？',
                then:()=>{
                    this.axios.post('/api/material',{id:row.id,state:0,op:'edit'}).then(res=>{
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

</style>