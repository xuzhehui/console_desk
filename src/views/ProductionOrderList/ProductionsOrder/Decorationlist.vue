<template>
    <div>
        <FullPage 
        title='工装订单列表2'
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
                <Button  @click="back"  style="margin-right:10px;">返回</Button>
                <Button type="primary" ghost style="margin-right:10px;">批量修改工艺路线</Button>
                <Button type="primary" ghost style="margin-right:10px;">批量下生产计划</Button>
                <Button type="primary" ghost>批量打印订单</Button>
            </div>
            
            <template slot='set' slot-scope='row'>
                <div class="table-set">
                    <a @click="goDetail(row.row)">编辑</a>
                    <a @click="goDetail(row.row)">详情</a>
                    <a>下生产计划</a>
                    <a>下载图纸</a>
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
                {title:'按房号',name:'Input',value:'',serverName:'id',placeholder:'请输入ID'},
                {title:'产品',name:'Input',value:'',serverName:'title',placeholder:'请输入部件名称'},
            ],
            tableColums:[
                {title:'订单号',align:'center',key:'id'},
                {title:'小区名称',align:'center',key:'id'},
                {title:'楼幢',align:'center',key:'title'},
                {title:'单元',align:'center',},
                {title:'楼层',align:'center',key:'title'},
                {title:'房号',align:'center',key:'title'},
                {title:'是否紧急',align:'center',key:'title'},
                {title:'单价',align:'center',key:'title'},
                {title:'交付日期',align:'center',key:'title'},
                {title:'订单生产时间',align:'center',key:'title'},
                {title:'单价',align:'center',key:'title'},
                {title:'单价',align:'center',key:'title'},
                {title:'预估房号工期',align:'center',key:'title'},
                {title:'操作',align:'center',slot:'set',width:'180'},
            ],
            tableData:[],
            pageIndex:1,
            total:100,
            showModal:false,
            showType:1,
            classInfo:{},
            searchObj:{},
            showTableColums:false,
        }
    },
    methods:{
        init(row){
            this.searchObj = row;
            this.getData(row)
        },
        searchData(row){
            console.log(row)
        },
        getData(row){
            this.axios('/api/basics_parts_index').then(res=>{
                this.tableData = res.data;
            })
        },
        goDetail(row){
            this.$router.push({
                path:'/cms/productionorderlist/productionsorder/details',
            })
        },
        changePage(e){
            this.pageIndex = e;
        },
        back(){
            this.$router.go(-1)
        },
    }
}
</script>

<style lang="scss" scoped>
.nav{display: flex;justify-content: space-between;align-items: center;}
.table-set{a{margin:0 5px;}}
</style>