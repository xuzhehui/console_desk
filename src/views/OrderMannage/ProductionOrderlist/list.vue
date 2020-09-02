<template>
    <div>
        <FullPage 
        title='生产订单列表'
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
                <Button  type="primary" style="margin-right:10px;" ghost>打印二维码</Button>
                <Button  type="primary" ghost>批量打印二维码</Button>
            </div>

            <div slot='navButton'>
                <Button @click="setTableColums" type="primary" ghost icon='ios-cog'>表头设置</Button>
            </div>
            
            <template slot='set' slot-scope='row'>
                <div>
                    <Icon @click="goDetial(row.row)" size='20' style="color:#32C800;cursor:pointer" type="ios-paper-outline" />
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
                {title:'小区名称',name:'Input',serverName:'residential_name',placeholder:'请输入小区名称',value:''},
                {title:'交货日期范围',name:'Input',start_server:'start_time',end_server:'end_time',start_value:'',end_value:'',isDate:true,serverName:'id2',start_placeholder:'开始日期',end_placeholder:'结束日期'},
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
                {title:'订单类型',align:'center',key:'type',width:'100'},
                {title:'小区',align:'center',key:'residential_name',width:'200'},
                {title:'紧急程度',align:'center',key:'warning_state',width:'100'},
                {title:'测量开始时间',align:'center',key:'start_time',width:'200'},
                {title:'测量结束时间',align:'center',key:'end_time',width:'200'},
                {title:'实际测量时间',align:'center',key:'upd_time',width:'200'},
                {title:'完成进度',align:'center',key:'sub_state',width:'100'},
                {title:'交货日期',align:'center',key:'predict_time',width:'200'},
                {title:'备注',align:'center',key:'remark',width:'200'},
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
        setTableColums(){//设置表头
            this.showTableColums = true;
        },
        getData(row){
            this.loading = true
            this.axios('/api/produce_list',{params:row}).then(res=>{
                this.loading = false;
                this.tableData = res.data.data;
                this.total = res.data.total;
            })
        },
        goDetial(row){
            this.$router.push({
                path:'/cms/ordermannage/productionorderlist/decorationlist',
                query:{
                    id:row.id
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
</style>