<template>
    <div>
        <FullPage 
        title='入库表'
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
            
            <template slot='set' slot-scope='{row}'>
                <a @click="goPage(row)">查看详情</a>
            </template>

        </FullPage>
    </div>
</template>

<script>
export default {
    data(){
        return {
            list:[
                {title:'订单编号',name:'Input',placeholder:'请输入订单编号',value:'',serverName:'order_no'},
                {title:'小区名字',name:'Input',placeholder:'请选择',value:'',serverName:'residential_name'},
                {title:'订单状态',name:'Select',placeholder:'请选择',serverName:'sub_state',value:'',
                    option:[
                        {label:'测量未审核',value:0},
                        {label:'测量审核',value:1},
                        {label:'测量通过',value:2},
                        {label:'生产审核中',value:3},
                        {label:'生产通过',value:4},
                        {label:'到生产计划',value:5},
                    ]
                },
                {title:'订单类型',name:'Select',placeholder:'请选择',serverName:'type',value:'',
                    option:[
                        {label:'业务订单',value:1},
                        {label:'代理商订单',value:2},
                    ]
                },
                {title:'日期范围',name:'Input',start_server:'start_time',end_server:'end_time',start_value:'',end_value:'',isDate:true,start_placeholder:'开始日期',end_placeholder:'结束日期'},
                {title:'客户昵称',name:'Input',placeholder:'请输入客户昵称',value:'',serverName:'client_name'},
                {title:'手机号',name:'Input',placeholder:'请输入手机号',value:'',serverName:'mobile'},
                {title:'业务员',name:'Input',placeholder:'请输入业务员',value:'',serverName:'client_name'},
            ],
            tableColums:[
                {title:'序号',align:'center',key:'',width:'100',fixed:'left'},
                {title:'订单编号',align:'center',key:'order_no',width:'200'},
                {title:'订单类型',align:'center',key:'show_type',width:'100',
                    render:(h,params)=>h('span',{},params.row.type == 1 ? '工装' : '家装')
                },
                {title:'手机号',align:'center',key:'mobile',width:'200'},
               
                {title:'紧急程度',align:'center',key:'show_warning_state',width:'100',
                    render(h,params){
                        return h('span',{
                            props:{},
                            style:{
                                color:params.row.warning_state ==  0 ? '#32C800' : (params.row.warning_state == 1 ? '#FFA141' : '#FF5E5C')
                            }
                        },params.row.warning_state == 0 ? '不急' : (params.row.warning_state == 1 ? '比较急' : (params.row.warning_state == 2 ? '紧急' : '非常急')))
                    }
                },
                {title:'完成进度',align:'center',key:'complete_rate',width:'180',
                    render(h,params){
                        return h('span',{},params.row.complete_rate||0*100+'%')
                    },
                },
                {title:'订单开始日期',align:'center',key:'show_start_time',width:'180',
                    render:(h,params)=>h('span',{},this.func.replaceDate(params.row.start_time*1))
                },
                {title:'订单结束时间',align:'center',key:'show_predict_time',width:'200',
                    render:(h,params)=>h('span',{},this.func.replaceDate(params.row.end_time*1))
                },
                {title:'业务员',align:'center',key:'nickname',width:'150'},
                {title:'订单状态',align:'center',key:'state',width:'150',},
                {title:'操作',align:'center',slot:'set',fixed:'right',width:'100',fixed:'right'},
            ],
            tableData:[{order_no:'123'}],
            pageIndex:1,
            total:0,
            pageSize:10,
            loading:false,
            proxyObj:{},
        }
    },

    methods:{
        init(row){
            row.page_index = this.pageIndex;
            row.page_size = this.pageSize;
            this.proxyObj = row
            this.getData(row)
        },
        getData(row){
            this.loading = true;
            this.axios('/api/orders_in_list',{params:row}).then(res=>{
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
            this.proxyObj.page_size = this.pageSize;
            this.getData(this.proxyObj)
        },
        goPage(row){
            this.$router.push({
                path:'/cms/productionorderlist/inboundform/details',
                query:{
                    order_no:row.order_no,
                    type:4
                }
            })
        }
        
    }
}
</script>

<style lang="scss" scoped>
</style>