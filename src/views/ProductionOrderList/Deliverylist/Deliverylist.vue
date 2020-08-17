<template>
    <div>
        <FullPage 
        title='出库表'
        :list='list' 
        @init='init' 
        @searchData='searchData' 
        @changePage='changePage'
        :tableColums='tableColums'
        :tableData='tableData'
        :pageIndex='pageIndex'
        :total='total'
        >
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
                {title:'订单编号',name:'Input',serverName:'id',placeholder:'请输入订单编号',value:''},
                {title:'派工类型',name:'Input',serverName:'id1',placeholder:'请选择',value:''},
                {title:'出库日期范围',name:'Input',start_value:'',end_value:'',isDate:true,start_placeholder:'开始日期',end_placeholder:'结束日期'}
            ],
            tableColums:[
                {title:'订单编号',align:'center',key:'id',fixed:'left',},
                {title:'订单类型',align:'center',key:'type_name',width:'150'},
                {title:'紧急程度',align:'center',key:'title',width:'150'},
                {title:'小区名称',align:'center',key:'stock'},
                {title:'出库时间',align:'center',key:'unit'},
                {title:'客户',align:'center',key:'warning_number'},
                {title:'手机号',align:'center',key:'price'},
                {title:'订单状态',align:'center',key:'long'},
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
            // this.axios('/api/material').then(res=>{
            //     this.tableData = res.data;
            // })
        },
        searchData(row){
            console.log(row)
        },
        changePage(e){

        },
        setTableColums(){//设置表头
            this.showTableColums = true;
        },
        goDetial(row){
            this.$router.push({
                path:'/cms/productionorderlist/deliverylist/decorationlist',
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