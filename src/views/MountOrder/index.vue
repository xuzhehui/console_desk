<template>
    <div>
        <FullPage 
        title='安装订单列表'
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
                <Button  type="primary" ghost>批量确认</Button>
            </div>
            
            <template slot='set' slot-scope='{row}'>
                <div>
                    <a style="margin:0 5px" @click="goPage(row)">详情</a>
                    <!-- <a style="margin:0 5px" @click="confirmSuccess(row)">完成</a> -->
                </div>
            </template>
        </FullPage>
    </div>
</template>

<script>
export default {
    data(){
        let _this = this;
        return {
            title:'',
            list:[
                {title:'订单编号',name:'Input',serverName:'order_no',placeholder:'请输入订单编号',value:''},
                {title:'紧急程度',name:'Select',serverName:'warning_state',placeholder:'请选择',value:'',
                    option:[
                        {label:'不急',value:0},
                        {label:'比较急',value:1},
                        {label:'紧急',value:2},
                        {label:'非常急',value:3},
                    ]
                },
                {title:'下单日期范围',name:'Input',start_server:'start_time',end_server:'end_time',start_value:'',end_value:'',isDate:true,start_placeholder:'开始日期',end_placeholder:'结束日期'},
            ],
            tableColums:[
                {title:'订单编号',align:'center',key:'order_no',fixed:'left',width:'200'},
                {title:'订单类型',align:'center',key:'type',minWidth:150,
                    render:(h,params)=>h('span',{},params.row.type == 1 ? '工装' : '家装')
                },
                {title:'客户',align:'center',key:'client_name',minWidth:150},
                {title:'手机号',align:'center',key:'mobile',minWidth:150},
                {title:'地址',align:'center',key:'address',minWidth:150},
                {title:'小区',align:'center',key:'residential_name',minWidth:200},
                {title:'出库时间',align:'center',key:'predict_time',minWidth:200,
                    render:(h,params)=>h('span',{},this.func.replaceDate(params.row.transport_start_time))
                },
                {title:'运输时间',align:'center',key:'crt_time',minWidth:200,
                    render:(h,params)=>h('span',{},this.func.replaceDate(params.row.transport_end_time))
                },
                {title:'操作',align:'center',slot:'set',fixed:'right',width:'150'},
            ],
            tableData:[],
            pageIndex:1,
            total:0,
            pageSize:10,
            loading:false,
            
        }
    },
    created(){
    },
    mounted(){
        
    },
    watch:{
        $route(to,from){
            this.type = to.query.type ? to.query.type : '';
            this.getData(this.proxyObj)
        }
    },
    methods:{
        init(row){
            row.page_index = this.pageIndex;
            row.page_size = this.pageSize;
            this.proxyObj = row
            this.getData(row)
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
        getData(row){
            this.loading = true;
            this.axios('/api/orders_install_list',{params:row}).then(res=>{
                this.loading = false;
                if(res.code == 200){
                    this.tableData = res.data.data;
                    this.total = res.data.total;
                }
            })
        },
        goPage(row){
            this.$router.push({
                path:'/cms/mountorder/details',
                query:{
                    order_no:row.order_no,
                    type:3
                }
            })
        },
        confirmSuccess(row){
            
        }
    }
}
</script>

<style lang="scss" scoped>
</style>