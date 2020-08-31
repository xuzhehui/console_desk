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
            <template slot='set' slot-scope='row'>
                <div>
                    <a @click="approvalDetails(row.row)" style="margin:0 5px">审批流程</a>
                    <a style="margin:0 5px" @click="goPage(2,row.row)">编辑</a>
                    <a style="margin:0 5px" @click="goPage(3,row.row)">查看</a>
                    <a style="margin:0 5px" @click="openModal(row.row)">下生产</a>
                </div>
            </template>

            <div>
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
                {title:'订单编号',serverName:'order_no',name:'Input',value:'',placeholder:'请输入订单号'},
                {title:'紧急程度',name:'Select',serverName:'warning_state',placeholder:'请选择',value:'',
                    option:[
                        {label:'不急',value:0},
                        {label:'比较急',value:1},
                        {label:'紧急',value:2},
                        {label:'非常急',value:3},
                    ]
                },
                {title:'测量日期范围',name:'Input',start_server:'start_time',end_server:'end_time',start_value:'',end_value:'',isDate:true,start_placeholder:'开始日期',end_placeholder:'结束日期'},
            ],
            tableColums:[
                {title:'订单编号',align:'center',key:'order_no'},
                {title:'小区',align:'center',key:'residential_name'},
                {title:'地址',align:'center',key:'address'},
                {title:'订单类型',align:'center',key:'show_type'},
                {title:'发货日期',align:'center',key:'title'},
                {title:'测量开始时间',align:'center',key:'crt_time'},
                {title:'测量结束时间',align:'center',key:'upd_time'},
                {title:'实际完成时间',align:'center',key:'upd_time'},
                {title:'订单状态',align:'center',key:'state'},
                {title:'备注',align:'center',key:'remark'},
                {title:'操作',align:'center',slot:'set',width:'220'},
            ],
            tableData:[],
            pageIndex:1,
            total:0,
            proxyObj:{},
            pageSize:10,
            showPlan:false,
            planInfo:{
                id:null,
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
            this.proxyObj = row
            this.getData(row)
        },
        searchData(row){
            this.getData(row)
        },
        getData(row){
            this.loading = true;
            this.axios('/api/order_index',{params:row}).then(res=>{
                this.loading = false;
                if(!res.data.data){return this.$Message.error('列表数据返回格式不正确')}
                res.data.data.map(v=>{
                    v.show_type = v.type == 1 ? '业务订单' : '代理商订单'
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
            let id = row ? row.id : '';
            this.$router.push({
                path:'/cms/measurementordermannage/edit',
                query:{
                    type:n,
                    id:row.id
                }
            })
        },
        approvalDetails(row){
            console.log(row)
            this.$router.push({
                path:'/cms/approval/examine',
                query:{
                    id:row.id
                }
            })
        },
        openModal(row){
            this.planInfo.id = row.id;
            this.showPlan = true;
        },
        sendPlanInfo(){
            try{
                this.planInfo.start_time = new Date(this.planInfo.start_time).toLocaleDateString().replace(/\//g,"-")
                this.planInfo.end_time = new Date(this.planInfo.end_time).toLocaleDateString().replace(/\//g,"-")
            }catch(e){
                console.log(e)
            }
            this.axios.post('/api/orders_plan',this.planInfo).then(res=>{
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