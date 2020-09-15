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
                <Button @click="setTableColums" type="primary" ghost icon='ios-cog'>表头设置</Button>
            </div>
            
            <template slot='set' slot-scope='row'>
                <div>
                    <a style="margin:0 5px">原材料预算</a>
                    <a style="margin:0 5px">打印二维码</a>
                    <a style="margin:0 5px" @click="goDetial(row.row)">详情</a>
                    <a style="margin:0 5px" @click="openModal(row.row)">下生产</a>
                </div>
            </template>

            <div>
                <Modal :width='1064' class-name="vertical-center-modal" v-model="showTableColums" title='设置表头'>
                    <Form>
                        <FormItem label='订单信息:'>
                            <div style="width:100%;display:flex;">
                                <CheckboxGroup style="width:100%">
                                    <Checkbox label="香蕉"></Checkbox>
                                    <Checkbox label="苹果"></Checkbox>
                                    <Checkbox label="西瓜"></Checkbox>
                                    <Checkbox label="香蕉"></Checkbox>
                                </CheckboxGroup>
                            </div>
                        </FormItem>
                    </Form>
                </Modal>

                <Modal class-name="vertical-center-modal" title='下生产计划' v-model="showPlan" @on-ok="sendPlanInfo">
                    <Form>
                        <FormItem label="选择时间">
                            <div style="display:flex;">
                                <DatePicker v-model="planInfo.start_time" type="date" placeholder="开始时间"></DatePicker>
                                -
                                <DatePicker v-model="planInfo.end_time" type="date" placeholder="结束时间"></DatePicker>
                            </div>
                        </FormItem>
                    </Form>
                </Modal>
            </div>
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
                {title:'生产订单编号',align:'center',key:'oa_order_no',width:'200'},
                {title:'小区',align:'center',key:'residential_name',width:'200'},
                {title:'地址',align:'center',key:'address',width:'200'},
                {title:'客户姓名',align:'center',key:'client_name',width:'200'},
                {title:'手机号',align:'center',key:'mobile',width:'200'},
                {title:'紧急程度',align:'center',key:'warning_state',width:'100',
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
                // {title:'发货日期',align:'center',key:'show_predict_time',width:'200'},
                {title:'下单日期',align:'center',key:'show_crt_time',width:'200'},
                {title:'测量人员',align:'center',key:'show_measure_start_time',width:'200'},
                {title:'测量开始日期',align:'center',key:'show_measure_start_time',width:'200'},
                {title:'测量结束日期',align:'center',key:'show_measure_start_time',width:'200'},
                {title:'实际测量时间',align:'center',key:'show_measure_time',width:'200'},
                {title:'操作',align:'center',slot:'set',fixed:'right',width:'300'},
            ],
            tableData:[],
            pageIndex:1,
            total:0,
            pageSize:10,
            showTableColums:false,
            showPlan:false,
            planInfo:{
                order_no:null,
                start_time:'',
                end_time:'',
                state:3,
            }
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
                res.data.data.map(v=>{
                    v.show_predict_time = this.func.replaceDate(v.predict_time*1);
                    v.show_crt_time = this.func.replaceDate(v.crt_time);
                    v.show_measure_time = this.func.replaceDate(v.measure_time)
                    v.show_measure_start_time = this.func.replaceDate(v.measure_start_time)
                })
                this.tableData = res.data.data;
                this.total = res.data.total;
            })
            this.tableData.push({order_no:'123'})
        },
        setTableColums(){//设置表头
            this.showTableColums = true;
        },
        goDetial(row){
            this.$router.push({
                path:'/cms/productionorderlist/productionsorder/Decorationlist',
                query:{
                    order_no:row.order_no
                }
            })
        },
        openModal(row){
            this.planInfo.order_no = row.order_no;
            this.showPlan = true;
        },
        sendPlanInfo(){
            try{
                this.planInfo.start_time = new Date(this.planInfo.start_time).toLocaleDateString().replace(/\//g,"-")
                this.planInfo.end_time = new Date(this.planInfo.end_time).toLocaleDateString().replace(/\//g,"-")
            }catch(e){}
            this.axios.post('/api/orders_plan',this.planInfo).then(res=>{
                if(res.code == 200){
                    this.$Message.success(res.msg)
                    this.getData()
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>

</style>