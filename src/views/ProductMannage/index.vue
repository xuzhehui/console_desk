<template>
    <div>
        <FullPage 
        :title='$route.query.title'
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
                <Button type="primary" ghost icon='md-add' @click="goPage(1)">新增产品</Button>
            </div>
            
            <template slot='set' slot-scope='row'>
                <div>
                    <Icon size='20' @click="goPage(2,row.row)" style="margin-right:10px;color:#3764FF;cursor:pointer" type="ios-create-outline" />
                    <Icon @click="delItems(row.row)" size='20' style="margin-left:10px;color:red;cursor:pointer" type="ios-trash-outline" />
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
                {title:'ID',name:'Input',value:'',serverName:'id',placeholder:'请输入ID'},
                {title:'产品型号',name:'Input',value:'',serverName:'name',placeholder:'请输入产品型号'},
                {title:'产品名称',name:'Input',value:'',serverName:'title',placeholder:'请输入产品名称'},
            ],
            tableColums:[
                {title:'ID',align:'center',key:'id'},
                {title:'分类名称',align:'center',key:'type_name'},
                {title:'产品名称',align:'center',key:'title'},
                {title:'计量单位',align:'center',key:'unit'},
                {title:'图片',align:'center',key:'company',
                    render: (h, params) => {
                        return h('img', {
                            attrs:{
                                src:this.$store.state.ip + params.row.img_url,
                                style:'max-width:50px;max-height:50px;position:relative;top:3px;'
                            },
                            props:{
                                row: params.row
                            }
                        })
                    }
                },
                {title:'操作',align:'center',slot:'set'},
            ],
            tableData:[],
            pageIndex:1,
            total:100,
        }
    },
    mounted(){
        console.log(this.$route.query)
    },
    methods:{
        init(row){
            this.getData(row)
        },
        searchData(row){
            console.log(row)
        },
        getData(row){
            this.axios('/api/product',{params:row}).then(res=>{
                this.tableData = res.data
            })
        },
        delItems(row){
            this.confirmDelete({
                content:'确认删除么？',
                then:()=>{
                    this.getData({id:row.id,state:0})
                }
            })
        },
        changePage(e){
            this.pageIndex = e;
        },
        goPage(n,row){//n = 1 新增 2 编辑 3 查看
            let id = row ? row.id : ''
            this.$router.push({
                path:'/cms/product/edit',
                query:{
                    type:n,
                    id:id
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>

</style>