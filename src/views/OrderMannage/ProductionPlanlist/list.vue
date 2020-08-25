<template>
    <div>
        <FullPage 
        title='生产计划列表'
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
                {title:'订单编号',name:'Input',serverName:'id',placeholder:'请输入订单编号',value:''},
                {title:'订单类型',name:'Select',serverName:'id1',placeholder:'请选择',value:'',
                    option:[
                        {label:'工装',value:1}
                    ]
                },
                {title:'客户名称',name:'Input',serverName:'id1',placeholder:'请选择',value:''},
                {title:'手机号',name:'Input',serverName:'id1',placeholder:'请选择',value:''},
                {title:'小区',name:'Input',serverName:'id1',placeholder:'请选择',value:''},
                {title:'下单日期范围',name:'Input',start_value:'',end_value:'',isDate:true,serverName:'id2',start_placeholder:'开始日期',end_placeholder:'结束日期'},
                {title:'紧急程度',name:'Select',serverName:'id1',placeholder:'请选择',value:'',
                    option:[
                        {label:'紧急',value:1}
                    ]
                },
            ],
            tableColums:[
                {title:'订单编号',align:'center',key:'order_no',fixed:'left',},
                {title:'订单类型',align:'center',key:'type',width:'150'},
                {title:'紧急程度',align:'center',key:'warning_state',width:'150'},
                {title:'小区',align:'center',key:'residential_name'},
                {title:'发货日期',align:'center',key:'predict_time'},
                {title:'下单日期',align:'center',key:'crt_time'},
                {title:'订单状态',align:'center',key:'sub_state'},
                {title:'客户姓名',align:'center',key:'client_name'},
                {title:'手机号',align:'center',key:'mobile'},
                {title:'完成进度',align:'center',key:'complete_rate'},
                {title:'预估生产工期',align:'center',key:'predict_working'},
                {title:'生产开始时间',align:'center',key:'start_time'},
                {title:'生产结束时间',align:'center',key:'end_time'},
                {title:'操作',align:'center',slot:'set',fixed:'right',width:'150'},
            ],
            tableData:[
                {id:'1',title:'222'}
            ],
            pageIndex:1,
            total:100,
            showTableColums:false,
            
        }
    },
    methods:{
        init(row){
            this.getData({sub_state:5})
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
                path:'/cms/ordermannage/productionplanlist/details',
                query:{
                    id:row.id
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