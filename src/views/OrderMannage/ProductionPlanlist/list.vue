<template>
    <div>
        <FullPage 
        title='生产计划列表'
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
                <Button  type="primary" ghost>批量打印二维码</Button>
            </div>

            <div slot='navButton'>
                <Button @click="setTableColums" type="primary" ghost icon='ios-cog'>表头设置</Button>
            </div>
            
            <template slot='set' slot-scope='row'>
                <div>
                    <a style="margin:0 5px" @click="goDetial(row.row)">详情</a>
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
                {title:'订单类型',name:'Select',serverName:'type',placeholder:'请选择',value:'',
                    option:[
                        {label:'业务订单',value:1},
                        {label:'代理商订单',value:2}
                    ]
                },
                {title:'客户名称',name:'Input',serverName:'client_name',placeholder:'请选择',value:''},
                {title:'手机号',name:'Input',serverName:'mobile',placeholder:'请选择',value:''},
                {title:'小区',name:'Input',serverName:'residential_name',placeholder:'请选择',value:''},
                {title:'下单日期范围',name:'Input',start_server:'start_time',end_server:'end_time',start_value:'',end_value:'',isDate:true,start_placeholder:'开始日期',end_placeholder:'结束日期'},
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
                {title:'订单编号',align:'center',key:'order_no',fixed:'left',width:'200'},
                {title:'订单类型',align:'center',key:'type',width:'150'},
                {title:'紧急程度',align:'center',key:'warning_state',width:'150'},
                {title:'小区',align:'center',key:'residential_name',width:'200'},
                {title:'发货日期',align:'center',key:'predict_time',width:'200'},
                {title:'下单日期',align:'center',key:'crt_time',width:'200'},
                {title:'订单状态',align:'center',key:'sub_state',width:'150'},
                {title:'客户姓名',align:'center',key:'client_name',width:'100'},
                {title:'手机号',align:'center',key:'mobile',width:'150'},
                {title:'完成进度',align:'center',key:'complete_rate',width:'100',
                    render(h,params){
                        return h('span',{},params.row.complete_rate*100+'%')
                    },
                },
                {title:'预估生产工期',align:'center',key:'predict_working',width:'200'},
                {title:'生产开始时间',align:'center',key:'start_time',width:'200'},
                {title:'生产结束时间',align:'center',key:'end_time',width:'200'},
                {title:'操作',align:'center',slot:'set',fixed:'right',width:'150'},
            ],
            tableData:[],
            pageIndex:1,
            total:0,
            pageSize:10,
            showTableColums:false,
            loading:false,
            
        }
    },
    methods:{
        init(row){
            row.page_index = this.pageIndex;
            row.page_size = this.pageSize;
            row.sub_state = 5
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
            this.axios('/api/produce_list',{params:row}).then(res=>{
                this.loading = false;
                this.tableData = res.data.data;
                this.total = res.data.total;
            })
        },
        setTableColums(){//设置表头
            this.showTableColums = true;
        },
        goDetial(row){
            this.$router.push({
                path:'/cms/ordermannage/productionplanlist/details',
                query:{
                    order_no:row.order_no
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