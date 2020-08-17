<template>
    <div>
        <FullPage 
        title='审批列表'
        :list='list' 
        @init='init' 
        @searchData='searchData' 
        @changePage='changePage'
        :tableColums='tableColums'
        :tableData='tableData'
        :pageIndex='pageIndex'
        :total='total'
        >   
            <template slot='set' slot-scope='row'>
                <div>
                    <a style="margin:0 5px">订单详情</a>
                    <a style="margin:0 5px">审批详情</a>
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
                {title:'订单号',name:'Input',value:'',serverName:'id',placeholder:'请输入订单号'},
                {title:'审批状态',name:'Select',serverName:'id1',placeholder:'请选择',value:'',
                    option:[
                        {label:'紧急',value:1}
                    ]
                },
                {title:'审批类型',name:'Select',serverName:'id1',placeholder:'请选择',value:'',
                    option:[
                        {label:'紧急',value:1}
                    ]
                },
                {title:'创建人员',name:'Input',value:'',serverName:'title',placeholder:'请输入创建人员'},
                {title:'手机号',name:'Input',value:'',serverName:'title',placeholder:'请输入手机号'},
            ],
            tableColums:[
                {title:'订单编号',align:'center',key:'id'},
                {title:'订单类型',align:'center',key:'title'},
                {title:'客户',align:'center',key:'title'},
                {title:'手机号',align:'center',key:'title'},
                {title:'审批类型',align:'center',key:'title'},
                {title:'审批状态',align:'center',key:'title'},
                {title:'创建人员',align:'center',key:'title'},
                {title:'审批开始时间',align:'center',key:'title'},
                {title:'审批结束时间',align:'center',key:'title'},
                {title:'备注',align:'center',key:'title'},
                {title:'操作',align:'center',slot:'set'},
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
    }
}
</script>

<style lang="scss" scoped>
.nav{display: flex;justify-content: space-between;align-items: center;}
.item-attr{display: flex;align-items: center;margin-bottom: 10px;}
</style>