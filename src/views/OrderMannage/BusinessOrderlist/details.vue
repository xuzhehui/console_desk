<template>
    <div>
        <FullPage 
        title='工装家装订单详情' 
        :showTopSearch='false'
        :logList='logList'
        :loading='loading'
        @changePage='changePage'
        :tableColums='tableColums'
        :tableData='tableData'
        :pageIndex='pageIndex'
        :total='total'
        >   
            <div slot='titleButton'>
                <Button @click="back" style="margin-right:10px;">返回</Button>
                <Button type="primary" @click="postData">打印清单</Button>
            </div>

            <template slot='set' slot-scope='row'>
                <div>
                   <a @click="goPage(row.row)">查看部件</a>
                </div>
            </template>
        </FullPage>
    </div>
</template>

<script>
export default {
    data(){
        return {
            id:this.$route.query.id,
            logList:[],
            tableColums:[
                {title:'产品类型',align:'center',key:'type',fixed:'left',width:'100'},
                {title:'产品名称',align:'center',key:'product_name',},
                {title:'产品型号',align:'center',key:'model',},
                {title:'测量数据',align:'center'},
                {title:'位置',align:'center',key:'address',key:'position'},
                {title:'预估产品工期',align:'center',key:'time'},
                {title:'操作',align:'center',slot:'set',fixed:'right',width:'100'},
            ],
            tableData:[],
            pageIndex:1,
            total:100,
            loading:false
        }
    },
    mounted(){
        if(this.id){
            this.getData(this.id)
        }
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
                path:'/cms/productionorderlist/deliverylist/partsdetails',
                query:{
                    // house_id:row.h_id,
                    order_product_id:row.id,
                }
            })
        },
        changePage(e){}
    }
}
</script>

<style lang="scss" scoped>
.log-list{display: flex;flex-wrap:wrap;padding:10px 0;}

</style>