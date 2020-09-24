<template>
    <div>
        <FullPage 
        title='生产计划列表'
        :list='list' 
        @init='init' 
        @searchData='init' 
        @selectTable='selectTable'
        @changePage='changePage'
        @changeSize='changeSize'
        :tableColums='tableColums'
        :tableData='tableData'
        :pageIndex='pageIndex'
        :total='total'
        >
            <div slot='titleButton'>
                <Button  type="primary" @click="dispatchList(selects)" ghost>批量派工单</Button>
            </div>

            <div slot='navButton'>
                <Button @click="setTableColums" type="primary" ghost icon='ios-cog'>表头设置</Button>
            </div>
            
            <template slot='set' slot-scope='{row}'>
                <div>
                    <a style="margin:0 5px" @click="goDetial(row)">详情</a>
                    <a style="margin:0 5px" @click="dispatchList(row)">派工单</a>
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
                {title:'小区名字',name:'Input',serverName:'residential_name',placeholder:'请选择',value:''},
                {title:'出库日期范围',name:'Input',start_server:'start_time',end_server:'end_time',start_value:'',end_value:'',isDate:true,serverName:'id2',start_placeholder:'开始日期',end_placeholder:'结束日期'},
                {title:'紧急程度',name:'Select',serverName:'warning_state',placeholder:'请选择',value:'',
                    option:[
                        {label:'不急',value:0},
                        {label:'比较急',value:1},
                        {label:'紧急',value:2},
                        {label:'非常急',value:3},
                    ]
                },
            ],
            tableColums:[
                {type:'selection',fixed:'left',width:'90',align:'center'},
                {title:'订单编号',align:'center',key:'order_no',width:'200'},
                {title:'订单类型',align:'center',key:'order_type',width:'150',
                    render(h,params){
                        return h('span',{},params.row.order_type == 1 ? '工装' : '家装')
                    }
                },
                {title:'订单状态',align:'center',key:'state',width:'100',
                    render(h,params){
                        return h('span',{
                            
                        },'--')
                    }
                },
                {title:'业务员',align:'center',key:'nickname',width:'150'},
                {title:'紧急程度',align:'center',key:'warning_state',width:'150',
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
                {title:'小区',align:'center',key:'residential_name',width:'200'},
                {title:'计划开始时间',align:'center',width:'200',
                    render:(h,params)=>h('span',{},this.func.replaceDate(params.row.plan_start_time))
                },
                {title:'计划结束时间',align:'center',width:'200',
                    render:(h,params)=>h('span',{},this.func.replaceDate(params.row.plan_end_time))
                },
                {title:'完成进度',align:'center',key:'complete_rate',width:'100',
                    render:(h,params)=>h('span',{},parseInt(params.row.complete_rate*100)+'%') 
                },
                {title:'预估交付日期',align:'center',key:'predict_time',width:'200'},
                {title:'操作',align:'center',slot:'set',fixed:'right',width:'150'},
            ],
            tableData:[],
            pageIndex:1,
            total:0,
            pageSize:10,
            proxyObj:{},
            showTableColums:false,
            selects:[],
        }
    },
    methods:{
        init(row){
            // this.getUsers()
            row.sub_state = 5;
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
            this.axios('/api/orders_produce_plan_list',{params:row}).then(res=>{
                this.tableData = res.data.data;
                this.total = res.data.total;
            })
        },
        setTableColums(){//设置表头
            this.showTableColums = true;
        },
        goDetial(row){
            this.$router.push({
                path:'/cms/productionorderlist/productionplanlist/details',
                query:{
                    order_no:row.order_no,
                }
            })
        },
        dispatchList(row){
            this.dispatchOrder({
                params:{order_no:Array.isArray(row) ? this.selects.join(',') : row.order_no},
                then:()=>this.getData(this.proxyObj)
            })
        },

        selectTable(e){
            let result = []
            e.map(v=>result.push(v.order_no))
            this.selects = result;
        }
    }
}
</script>

<style lang="scss" scoped>
</style>