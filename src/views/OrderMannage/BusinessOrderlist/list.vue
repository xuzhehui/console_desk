<template>
    <div>
        <FullPage 
        title='业务订单列表'
        :list='list' 
        @init='init' 
        @searchData='searchData' 
        @changePage='changePage'
        :tableColums='tableColums'
        :tableData='tableData'
        :pageIndex='pageIndex'
        :total='total'
        >
            <div slot='titleButton' >
                <Button  type="primary" style="margin-right:10px;" ghost>批量下测量</Button>
                <Button  type="primary" ghost>批量打印二维码</Button>
            </div>

            <div slot='navButton' style="display:flex;">
                <Button @click="setTableColums" type="primary" style="margin-right:10px;" ghost icon='ios-cog'>表头设置</Button>
                <Button @click="addOrder" type="primary" ghost icon='ios-cog'>新增订单</Button>
            </div>
            
            <template slot='set' slot-scope='row'>
                <div>
                    <a style="margin:0 5px">下测量</a>
                    <a style="margin:0 5px" @click="goDetial(row.row)">编辑</a>
                    <a style="margin:0 5px" @click="goDetial(row.row)">详情</a>
                    <a style="margin:0 5px">删除</a>
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
                {title:'小区名字',name:'Input',serverName:'id1',placeholder:'请选择',value:''},
                {title:'出库日期范围',name:'Input',start_value:'',end_value:'',isDate:true,serverName:'id2',start_placeholder:'开始日期',end_placeholder:'结束日期'},
                {title:'紧急程度',name:'Select',serverName:'id1',placeholder:'请选择',value:'',
                    option:[
                        {label:'紧急',value:1}
                    ]
                },
            ],
            tableColums:[
                {title:'订单编号',align:'center',key:'order_no',fixed:'left',},
                {title:'订单类型',align:'center',key:'show_type',width:'150'},
                {title:'紧急程度',align:'center',key:'show_warning_state',width:'150'},
                {title:'小区',align:'center',key:'address'},
                {title:'计划开始时间',align:'center',key:'start_time'},
                {title:'计划结束时间',align:'center',key:'end_time'},
                {title:'完成进度',align:'center',key:'show_state'},
                {title:'交货日期',align:'center',key:'predict_time'},
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
            this.getData({id:1})
        },
        searchData(row){

        },
        getData(row){
            this.axios('/api/order_index',{params:row}).then(res=>{
                res.data.map(v=>{
                    v.show_type = v.type == 1 ? '业务订单' : '代理商订单'
                    v.show_state = v.state == 0 ? '未审核' : (v.state == 1 ? '审核中' : (v.state == 2 ? '审核通过' : (v.state == 3 ? '订单生产中' : '完成'))),
                    v.show_warning_state = v.warning_state == 0 ? '不急' : (v.warning_state == 1 ? '比较急' : (v.warning_state == 2 ? '紧急' : '非常急'))
                })
                this.tableData = res.data;
            })
        },
        changePage(e){

        },
        setTableColums(){//设置表头
            this.showTableColums = true;
        },
        addOrder(){
            this.$router.push({
                path:'/cms/ordermannage/businessorderlist/edit',
            })
        },
        goDetial(row){
            this.$router.push({
                path:'/cms/ordermannage/businessorderlist/decorationlist',
                query:{}
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