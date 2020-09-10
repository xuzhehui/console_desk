<template>
    <div>
        <FullPage 
        title='派工单'
        :list='list' 
        @init='init' 
        @searchData='init' 
        @changePage='changePage'
        @changeSize='changeSize'
        :loading='loading'
        :tableColums='tableColums'
        :tableData='tableData'
        :pageIndex='pageIndex'
        :total='total'
        >
            <div slot='titleButton'>
                <Button type="primary" ghost>批量打印</Button>
            </div>
            
            <template slot='set' slot-scope='{row}'>
                <div>
                    <a class="map-margin">打印原材料</a>
                    <a class="map-margin">打印派工单</a>
                    <a class="map-margin" @click="goDetial(row)">详情</a>
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
                {title:'订单编号',name:'Input',serverName:'order_no',placeholder:'请输入订单编号',value:''},
                {title:'派工类型',name:'Input',serverName:'type',placeholder:'请选择',value:''},
                {title:'下单日期范围',name:'Input',start_server:'start_time',end_server:'end_time',start_value:'',end_value:'',isDate:true,serverName:'id2',start_placeholder:'开始日期',end_placeholder:'结束日期'}
            ],
            tableColums:[
                {title:'订单编号',align:'center',key:'order_no',fixed:'left',width:'200'},
                {title:'订单类型',align:'center',key:'type_name',width:'150'},
                {title:'紧急程度',align:'center',key:'title',width:'150'},
                {title:'小区名称',align:'center',key:'residential_name',width:'200'},
                {title:'派工开始时间',align:'center',key:'unit',width:'200'},
                {title:'派工结束时间',align:'center',key:'unit',width:'200'},
                {title:'派工人员',align:'center',key:'warning_number',width:'200'},
                {title:'预估工期',align:'center',key:'predict_time',width:'200'},
                {title:'操作',align:'center',slot:'set',fixed:'right',width:'240'},
            ],
            tableData:[
                {id:'1',title:'222'}
            ],
            pageIndex:1,
            total:0,
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
            this.axios('/api/orders_dispatch_list',{params:row}).then(res=>{
                this.loading = false;
                if(res.code == 200){
                    this.tableData = res.data.data;
                    this.total = res.data.total;
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
            this.proxyObj.page_size = this.page_size;
            this.getData(this.proxyObj)
        },
        goDetial(row){
            this.$router.push({
                path:'/cms/productionorderlist/dispatchlist/details',
                query:{
                    id:row.id,
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
</style>