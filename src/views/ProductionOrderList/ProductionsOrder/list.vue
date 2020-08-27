<template>
    <div>
        <FullPage 
        title='生产订单列表'
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
                {title:'订单编号',name:'Input',serverName:'id',placeholder:'请输入订单编号',value:''},
                {title:'订单类型',name:'Select',serverName:'id1',placeholder:'请选择',value:'',
                    option:[
                        {label:'紧急',value:1}
                    ]
                },
                {title:'客户名字',name:'Input',serverName:'id1',placeholder:'请选择',value:''},
                {title:'手机号',name:'Input',serverName:'id1',placeholder:'请选择',value:''},
                {title:'紧急程度',name:'Select',serverName:'id1',placeholder:'请选择',value:'',
                    option:[
                        {label:'紧急',value:1}
                    ]
                },
                {title:'下单日期范围',name:'Input',start_value:'',end_value:'',isDate:true,serverName:'id2',start_placeholder:'开始日期',end_placeholder:'结束日期'},
                
            ],
            tableColums:[
                {title:'订单编号',align:'center',key:'order_no',fixed:'left',},
                {title:'小区',align:'center',key:'residential_name'},
                {title:'紧急程度',align:'center',key:'warning_state'},
                {title:'发货日期',align:'center',key:'predict_time'},
                {title:'下单日期',align:'center',key:'crt_time'},
                {title:'下测量日期',align:'center',key:'measure_time'},
                {title:'实际测量时间',align:'center',key:'upd_time'},
                {title:'操作',align:'center',slot:'set',fixed:'right',width:'150'},
            ],
            tableData:[],
            pageIndex:1,
            total:100,
            showTableColums:false,
            showPlan:false,
            planInfo:{
                id:null,
                start_time:'',
                end_time:''
            }
        }
    },
    methods:{
        init(row){
            this.getData()
        },
        searchData(row){

        },
        changePage(e){

        },
        getData(row){
            this.axios('/api/produce_list',{params:row}).then(res=>{
                this.tableData = res.data;
            })
        },
        setTableColums(){//设置表头
            this.showTableColums = true;
        },
        goDetial(row){
            this.$router.push({
                path:'/cms/productionorderlist/productionsorder/Decorationlist',
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
                    this.getData()
                }
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