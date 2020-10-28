<template>
    <div>
        <FullPage 
        title='生产订单列表'
        :list='list' 
        @init='init' 
        @searchData='init' 
        @changePage='changePage'
        @changeSize='changeSize'
        :tableColums='tableColums'
        :tableData='tableData'
        :pageIndex='pageIndex'
        :total='total'
        >
            <div slot='titleButton'>
                <Button  type="primary" ghost>批量打印二维码</Button>
            </div>

            <div slot='navButton'>
                <Button type="primary" ghost icon='ios-cog'>表头设置</Button>
            </div>
            
            <template slot='set' slot-scope='{row}'>
                <div>
                    <a style="margin:0 5px" @click="goOriginalPage(row)">原材料预算</a>
                    <a style="margin:0 5px">打印二维码</a>
                    <a style="margin:0 5px" @click="goDetial(row)">详情</a>
                    <a style="margin:0 5px" @click="openModal(row)">下生产计划</a>
                </div>
            </template>

            <!-- <Modal :width='1000' class-name="vertical-center-modal" title='原材料预算' v-model="showOriginal">
                <Table border :span-method="handleSpan" :columns="originalTableColumns" :data="originalData"></Table>
            </Modal> -->
        </FullPage>
    </div>
</template>

<script>
export default {
    data(){
        return {
            list:[
                {title:'订单编号',name:'Input',serverName:'order_no',placeholder:'请输入订单编号',value:''},
                {title:'订单类型',name:'Select',serverName:'type',placeholder:'请选择',value:'',
                    option:[
                        {label:'业务订单',value:1},
                        {label:'代理商订单',value:2}
                    ]
                },
                {title:'客户名字',name:'Input',serverName:'client_name',placeholder:'请选择',value:''},
                {title:'手机号',name:'Input',serverName:'mobile',placeholder:'请选择',value:''},
                {title:'紧急程度',name:'Select',serverName:'warning_state',placeholder:'请选择',value:'',
                    option:[
                        {label:'不急',value:0},
                        {label:'比较急',value:1},
                        {label:'紧急',value:2},
                        {label:'非常急',value:3},
                    ]
                },
                {title:'下单日期范围',name:'Input',start_server:'start_time',end_server:'end_time',start_value:'',end_value:'',isDate:true,serverName:'id2',start_placeholder:'开始日期',end_placeholder:'结束日期'},
                
            ],
            tableColums:[
                {title:'订单编号',align:'center',key:'order_no',fixed:'left',width:'200'},
                {title:'生产订单编号',align:'center',key:'oa_order_no',minWidth:200},
                {title:'小区',align:'center',key:'residential_name',minWidth:200},
                {title:'地址',align:'center',key:'address',minWidth:200},
                {title:'客户姓名',align:'center',key:'client_name',minWidth:200},
                {title:'手机号',align:'center',key:'mobile',minWidth:200},
                {title:'测量人员',align:'center',key:'nickname',minWidth:200},
                {title:'紧急程度',align:'center',key:'warning_state',minWidth:100,
                    render(h,params){
                        return h('span',{
                            props:{},
                            style:{
                                color:params.row.warning_state ==  0 ? '#32C800' : (params.row.warning_state == 1 ? '#FFA141' : '#FF5E5C')
                            }
                        },
                        params.row.warning_state == 0 ? '不急' :(params.row.warning_state == 1 ? '比较急' : (params.row.warning_state == 2 ? '紧急' : '非常急'))
                        )
                    }
                },
                {title:'下单日期',align:'center',minWidth:200,
                    render:(h,params)=>h('span',{},this.func.replaceDate(params.row.crt_time*1))
                },
                
                {title:'测量开始日期',align:'center',minWidth:200,
                    render:(h,params)=>h('span',{},this.func.replaceDate(params.row.measure_start_time*1))
                },
                {title:'测量结束日期',align:'center',minWidth:200,
                    render:(h,params)=>h('span',{},this.func.replaceDate(params.row.measure_end_time*1))
                },
                {title:'实际测量时间',align:'center',minWidth:200,
                    render:(h,params)=>h('span',{},this.func.replaceDate(params.row.measure_time*1))
                },
                {title:'操作',align:'center',slot:'set',fixed:'right',width:'320'},
            ],
            tableData:[],
            pageIndex:1,
            total:0,
            pageSize:10,
            planInfo:{
                order_no:null,
                start_time:'',
                end_time:'',
                state:3,
            },
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
            this.axios('/api/orders_produce_order_list',{params:row}).then(res=>{
                this.tableData = res.data.data;
                this.total = res.data.total;
            })
            this.tableData.push({order_no:'123'})
        },
        goDetial(row){
            this.$router.push({
                path:'/cms/productionorderlist/productionsorder/Decorationlist',
                query:{
                    order_no:row.order_no,
                    type:'produce'
                }
            })
        },
        openModal(row){
            this.planInfo.order_no = row.order_no;
            this.downProduction({
                title:'下生产计划',
                type:1,
                params:this.planInfo,
                then:(e)=>{this.getData(this.proxyObj)},
                cancel:(e)=>{},
            })
        },
        goOriginalPage(row){
            this.$router.push({
                path:'/cms/rawmateria/index',
                query:{
                    order_no:row.order_no
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>

</style>