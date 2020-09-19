<template>
    <div>
        <FullPage 
        title='测量订单列表'
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
            <div slot="titleButton">
                <Button type="primary" ghost>批量确认</Button>
            </div>
            <template slot='set' slot-scope='{row}'>
                <div>
                    <!-- <a @click="approvalDetails(row)" style="margin:0 5px">审批流程</a> -->
                    <a style="margin:0 5px" @click="goPage(2,row)">编辑</a>
                    <a style="margin:0 5px" @click="goPage(3,row)">查看</a>
                    <a style="margin:0 5px" @click="openModal(row)">下生产</a>
                </div>
            </template>

            <div>
                <Modal class-name="vertical-center-modal" title='下生产' v-model="showPlan" @on-ok="sendPlanInfo">
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
                {title:'订单编号',serverName:'order_no',name:'Input',value:'',placeholder:'请输入订单号'},
                {title:'紧急程度',name:'Select',serverName:'warning_state',placeholder:'请选择',value:'',
                    option:[
                        {label:'不急',value:0},
                        {label:'比较急',value:1},
                        {label:'紧急',value:2},
                        {label:'非常急',value:3},
                    ]
                },
                {title:'测量日期范围',start_server:'start_time',end_server:'end_time',start_value:'',end_value:'',isDate:true,start_placeholder:'开始日期',end_placeholder:'结束日期'},
            ],
            tableColums:[
                {title:'订单编号',align:'center',key:'order_no',fixed:'left',width:'200'},
                {title:'测量单号',align:'center',key:'oa_order_no',width:'200'},
                {title:'小区',align:'center',key:'residential_name',width:'200'},
                {title:'地址',align:'center',key:'address',width:'200'},
                {title:'客户姓名',align:'center',key:'client_name',width:'200'},
                {title:'电话',align:'center',key:'mobile',width:'200'},
                {title:'订单类型',align:'center',key:'show_type',width:'100',
                    render(h,params){
                        return h('span',{

                        },params.row.order_type == 1 ? '工装' : '家装')
                    }
                },
                {title:'测量开始时间',align:'center',key:'measure_start_time',width:'200'},
                {title:'测量结束时间',align:'center',key:'measure_end_time',width:'200'},
                {title:'实际完成时间',align:'center',key:'plan_start_time',width:'200'},
                {title:'订单状态',align:'center',key:'show_sub_state',width:'100'},
                {title:'备注',align:'center',key:'remark',width:'200'},
                {title:'操作',align:'center',slot:'set',width:'200',fixed:'right'},
            ],
            tableData:[],
            pageIndex:1,
            total:0,
            proxyObj:{},
            pageSize:10,
            showPlan:false,
            planInfo:{
                order_no:null,
                start_time:'',
                end_time:''
            },
            loading:false,
        }
    },
    methods:{
        init(row){
            row.page_index = this.pageIndex;
            row.page_size = this.pageSize;
            row.sub_state = 2;
            this.proxyObj = row
            this.getData(this.proxyObj)
        },
        getData(row){
            this.loading = true;
            this.axios('/api/order_measure_list',{params:row}).then(res=>{
                this.loading = false;
                if(!res.data.data){return this.$Message.error('列表数据返回格式不正确')}
                res.data.data.map(v=>{
                    v.show_type = v.type == 1 ? '业务订单' : '代理商订单';
                    v.show_sub_state = v.sub_state == 0 ? '测量未审核' : (v.sub_state == 1 ? '测量审核' : 
                    (v.sub_state == 2 ? '测量通过' : (v.sub_state == 3 ? '生产审核中' : (v.sub_state == 4 ? '生产通过' : '到生产计划'))))
                    v.state == 2 ? v.show_sub_state = '审批驳回' : v.show_sub_state
                })
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
        goPage(n,row){
            let oa_order_no = row ? row.oa_order_no : '';
            this.$router.push({
                // path:'/cms/measurementordermannage/Decorationlist',
                path:'/cms/ordermannage/businessorderlist/decorationlist',
                query:{
                    oa_order_no:oa_order_no,
                    type:'measure',
                }
            })
        },
        approvalDetails(row){
            this.$router.push({
                path:'/cms/approval/examine',
                query:{
                    oa_order_no:row.oa_order_no||'123123'
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
            }catch(e){
            }
            this.axios.post('/api/order_oa_people',this.planInfo).then(res=>{
                if(res.code == 200){
                    this.$Message.success(res.msg)
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.nav{display: flex;justify-content: space-between;align-items: center;}
.item-attr{display: flex;align-items: center;margin-bottom: 10px;}
</style>