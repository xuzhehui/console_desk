<template>
    <div>
        <FullPage 
        title='工装订单详情1' 
        :showTopSearch='false'
        :loading='loading'
        :logList='logList'
        @changePage='changePage'
        :tableColums='tableColums'
        :tableData='tableData'
        :pageIndex='pageIndex'
        :total='total'
        >   
            <div slot='titleButton'>
                <Button @click="back" style="margin-right:10px;">返回</Button>
                <Button type="primary" @click="postData">打印</Button>
            </div>
        </FullPage>
    </div>
</template>

<script>
export default {
    data(){
        return {
            type:1,
            logList:[],
            tableColums:[
                {title:'产品类型',align:'center',key:'type',fixed:'left',width:'100'},
                {title:'产品名称',align:'center',key:'product_name',minWidth:100},
                {title:'产品型号',align:'center',key:'model',minWidth:100},
                {title:'测量数据',align:'center',minWidth:100},
                {title:'位置',align:'center',key:'address',key:'position',minWidth:100},
                {title:'预估产品工期',align:'center',key:'time',fixed:'right',minWidth:100},
            ],
            tableData:[],
            pageIndex:1,
            total:100,
            loading:false,
            proxyObj:{},
        }
    },
    mounted(){
        this.getData(this.$route.query.id)
    },
    methods:{
        back(){
            this.$router.go(-1)
        },
        postData(){

        },
        getData(id){
            this.loading = true;
            this.axios('/api/order_product_list',{params:{id:id}}).then(res=>{
                this.loading = false;
                this.tableData = res.data.product;
                this.logList = res.data.detail;
            })
        },
        goPage(row){
            this.$router.push({
                path:'/cms/productionorderlist/deliverylist/partsdetails'
            })
        },
        changePage(e){}
    }
}
</script>

<style lang="scss" scoped>
.log-list{display: flex;flex-wrap:wrap;padding:10px 0;}
</style>