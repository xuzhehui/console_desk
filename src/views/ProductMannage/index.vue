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
            <div slot='titleButton'>
                <Button type="success" ghost icon='md-exit' style="margin-right:10px;">批量导入</Button>
                <Button type="warning" ghost icon='md-return-left'>批量导出</Button>
            </div>
            <div slot='navButton'>
                <Button type="primary" ghost icon='md-add' @click="goPage(1)">新增产品</Button>
            </div>
            
            <template slot='set' slot-scope='{row}'>
                <div class="table-set">
                    <svg style="font-size:20px" color='#3764FF' @click="goPage(2,row)" class="icon icon-nav" aria-hidden="true">
                        <use xlink:href="#iconbianji"></use>
                    </svg>

                    <svg @click="delItems(row)" class="icon icon-nav" style="font-size:20px" color='red' aria-hidden="true">
                        <use xlink:href="#iconshanchu"></use>
                    </svg>
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
                {title:'产品型号',name:'Input',value:'',serverName:'model',placeholder:'请输入产品型号'},
                {title:'产品名称',name:'Input',value:'',serverName:'title',placeholder:'请输入产品名称'},
            ],
            tableColums:[
                {title:'ID',align:'center',key:'id',width:'100'},
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
                {title:'操作',align:'center',slot:'set',width:'150'},
            ],
            tableData:[],
            pageIndex:1,
            total:0,
            pageSize:10,
            proxyObj:{},
            loading:false,
        }
    },
    mounted(){
        this.proxyObj.type_id = this.$route.query.id;
        this.getData(this.proxyObj)
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
            row.type_id = this.$route.query.id;//产品管理因为无法使用id 所以用type_id替代
            this.proxyObj = row
            this.getData(row)
        },
        getData(row){
            this.loading = true;
            this.axios('/api/product',{params:row}).then(res=>{
                this.loading = false;
                this.tableData = res.data.data;
                this.total = res.data.total;
            })
        },
        delItems(row){
            this.confirmDelete({
                content:'确认删除么？',
                then:()=>{
                    this.axios.post('/api/product',{id:row.id,state:0}).then(res=>{
                        if(res.code == 200){
                            this.$Message.success(res.msg)
                            this.getData(this.proxyObj)
                        }
                    })
                }
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
        goPage(n,row){//n = 1 新增 2 编辑 3 查看
            let id = row ? row.id : ''
            this.$router.push({
                path:'/cms/product/edit',
                query:{
                    type:n,
                    id:id,
                    back_id:this.$route.query.id,
                    title:this.$route.query.title,
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>

</style>