<template>
    <div>
        <FullPage 
        title='测量订单列表'
        :list='list' 
        @init='init' 
        @searchData='searchData' 
        @changePage='changePage'
        :tableColums='tableColums'
        :tableData='tableData'
        :pageIndex='pageIndex'
        :total='total'
        >   
            <div slot="titleButton">
                <Button type="primary" ghost>批量确认</Button>
            </div>
            <template slot='set' slot-scope='row'>
                <div>
                    <a style="margin:0 5px">审批流程</a>
                    <a style="margin:0 5px" @click="goPage(1,row.row)">编辑</a>
                    <a style="margin:0 5px" @click="goPage(2,row.row)">查看</a>
                    <a style="margin:0 5px">编辑</a>
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
                {title:'订单编号',name:'Input',value:'',serverName:'id',placeholder:'请输入订单号'},
                {title:'紧急程度',name:'Select',serverName:'id1',placeholder:'请选择',value:'',
                    option:[
                        {label:'紧急',value:1}
                    ]
                },
                {title:'测量日期范围',name:'Input',start_value:'',end_value:'',isDate:true,serverName:'id2',start_placeholder:'开始日期',end_placeholder:'结束日期'},
            ],
            tableColums:[
                {title:'订单编号',align:'center',key:'id'},
                {title:'小区',align:'center',key:'title'},
                {title:'地址',align:'center',key:'title'},
                {title:'订单类型',align:'center',key:'title'},
                {title:'发货日期',align:'center',key:'title'},
                {title:'测量开始时间',align:'center',key:'title'},
                {title:'测量结束时间',align:'center',key:'title'},
                {title:'实际完成时间',align:'center',key:'title'},
                {title:'订单状态',align:'center',key:'title'},
                {title:'备注',align:'center',key:'title'},
                {title:'操作',align:'center',slot:'set',width:'220'},
            ],
            tableData:[],
            pageIndex:1,
            total:100,
        }
    },
    methods:{
        init(row){
            this.getData(row)
        },
        searchData(row){
            this.getData(row)
        },
        getData(row){
            this.axios('/api/basics_properties_index',{params:row}).then(res=>{
                this.tableData = res.data;
            })
        },
        changePage(e){
            this.pageIndex = e;
        },
        goPage(n,row){
            this.$router.push({
                path:'/cms/measurementordermannage/edit'
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.nav{display: flex;justify-content: space-between;align-items: center;}
.item-attr{display: flex;align-items: center;margin-bottom: 10px;}
</style>