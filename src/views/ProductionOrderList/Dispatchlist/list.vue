<template>
    <div>
        <FullPage 
        title='派工单'
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
                <Button type="primary" ghost>批量打印</Button>
            </div>
            
            <template slot='set' slot-scope='row'>
                <div>
                    <a  @click="goDetial(row.row)">详情</a>
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
                {title:'订单编号',name:'Input',serverName:'id',placeholder:'请输入订单编号',value:''},
                {title:'派工类型',name:'Input',serverName:'id1',placeholder:'请选择',value:''},
                {title:'下单日期范围',name:'Input',start_value:'',end_value:'',isDate:true,serverName:'id2',start_placeholder:'开始日期',end_placeholder:'结束日期'}
            ],
            tableColums:[
                {title:'订单编号',align:'center',key:'id',fixed:'left',},
                {title:'订单类型',align:'center',key:'type_name',width:'150'},
                {title:'紧急程度',align:'center',key:'title',width:'150'},
                {title:'小区名称',align:'center',key:'stock'},
                {title:'派工开始时间',align:'center',key:'unit'},
                {title:'派工结束时间',align:'center',key:'unit'},
                {title:'派工人员',align:'center',key:'warning_number'},
                {title:'预估工期',align:'center',key:'price'},
                {title:'操作',align:'center',slot:'set'},
            ],
            tableData:[
                {id:'1',title:'222'}
            ],
            pageIndex:1,
            total:100,
        }
    },
    methods:{
        init(row){
            // this.axios('/api/material').then(res=>{
            //     this.tableData = res.data;
            // })
        },
        searchData(row){

        },
        changePage(e){

        },
        goDetial(row){
            this.$router.push({
                path:'/cms/productionorderlist/dispatchlist/details',
                query:{}
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.vertical-center-modal{
    display: flex;
     align-items: center;
    justify-content: center;
    .ivu-modal{
        top: 0;
    }
}
</style>