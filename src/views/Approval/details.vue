<template>
    <div>
        <FullPage 
        title='工装(家装)审批详情' 
        :showTopSearch='false'
        :logList='logList'
        @changePage='changePage'
        :tableColums='tableColums'
        :tableData='tableData'
        :pageIndex='pageIndex'
        :total='total'
        >   
            <div slot='titleButton'>
                <Button  @click="back"  style="margin-right:10px;">返回</Button>
                <!-- <Button type="error" style="margin-right:10px;" ghost>驳回审批</Button>
                <Button type="success" ghost>通过审批</Button> -->
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
                {title:'产品类型',align:'center',key:'basics_title',},
                {title:'产品名称',align:'center',key:'product_title'},
                {title:'产品型号',align:'center',key:'model'},
                {title:'测量数据',align:'center',},
                {title:'位置',align:'center',key:'position'},
                {title:'出库时间',align:'center',},
                // {title:'操作',align:'center',fixed:'right',width:'150'},
            ],
            tableData:[],
            pageIndex:1,
            pageSize:10,
            total:0,
        }
    },
    mounted(){
        this.getData({oa_order_no:this.$route.query.oa_order_no,house_id:this.$route.query.house_id})
    },
    methods:{
        back(){
            this.$router.go(-1)
        },
        postData(){

        },
        getData(row){
            this.axios('/api/orders_product_list',{params:row}).then(res=>{
                if(res.code == 200){
                    this.logList = res.data.detail;
                    this.tableData = res.data.list
                }
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