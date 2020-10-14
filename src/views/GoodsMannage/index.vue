<template>
    <div>
        <FullPage 
        title='商品列表'
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
                <Button type="primary" ghost icon='md-add' @click="goPage(1)">新增商品</Button>
            </div>
            
            <template slot='set' slot-scope='{row}'>
                <div class="table-set">
                    <svg style="font-size:20px" color='#3764FF'  @click="goPage(2,row)" class="icon icon-nav" aria-hidden="true">
                        <use xlink:href="#iconbianji"></use>
                    </svg>

                    <svg style="font-size:20px" color='green' @click="goPage(3,row)" class="icon icon-nav" aria-hidden="true">
                        <use xlink:href="#iconxiangqing"></use>
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
                {title:'商品名称',name:'Input',value:'',serverName:'title',placeholder:'请输入物料分类名称'},
            ],
            tableColums:[
                {title:'ID',align:'center',key:'id',fixed:'left',width:'100'},
                {title:'图片',align:'center',key:'img_url',minWidth:100,
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
                {title:'商品名称',align:'center',key:'title',minWidth:100},
                {title:'通用商品价格',align:'center',key:'price',minWidth:100},
                {title:'操作',align:'center',slot:'set',width:'150',fixed:'right'},
            ],
            tableData:[],
            pageIndex:1,
            total:0,
            pageSize:10,
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
            this.axios('/api/goods',{params:row}).then(res=>{
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
            this.proxyObj.page_size = this.page_size;
            this.getData(this.proxyObj)
        },
        delItems(row){
            this.confirmDelete({
                content:'确认删除么？',
                then:()=>{
                    this.axios.post('/api/goods',{id:row.id,state:0}).then(res=>{
                        this.getData(this.searchObj)
                    })
                }
            })
        },
        goPage(n,row){//n = 1 新增 2 编辑 3 查看
            let id = row ? row.id : ''
            this.$router.push({
                path:'/cms/goods/edit',
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