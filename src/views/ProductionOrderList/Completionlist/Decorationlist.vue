<template>
    <div>
        <FullPage 
        title='工装订单列表'
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
                <Button type="primary" style="margin-right:10px;">批量下测量</Button>
                <Button type="primary">打印清单</Button>
            </div>

            <div slot='navButton'>
                <Button @click="setTableColums" type="primary" ghost icon='ios-cog'>表头设置</Button>
            </div>

            <div slot="text-list" class="log-list">
                <div class="log-item" v-for="(item,index) of logList" :key="index">
                    <span>{{item.title}}：</span>
                    <span>{{item.value}}</span>
                </div>
            </div>
            
            <template slot='set' slot-scope='row'>
                <div class="table-set">
                    <a @click="goDetail(row.row)">详情</a>
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
            ],
            tableColums:[
                {title:'小区',align:'center',key:'id'},
                {title:'楼幢',align:'center',key:'title'},
                {title:'单元',align:'center',},
                {title:'楼层',align:'center',key:'title'},
                {title:'房号',align:'center',key:'title'},
                {title:'单价',align:'center',key:'title'},
                {title:'预估户型工期',align:'center',key:'title'},
                {title:'操作',align:'center',slot:'set',width:'180'},
            ],
            tableData:[],
            logList:[{title:'订单编号',value:'10998765'}],
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
        setTableColums(){//设置表头
            this.showTableColums = true;
        },
        getData(row){
            this.axios('/api/basics_parts_index').then(res=>{
                this.tableData = res.data;
            })
        },
        goDetail(row){
            this.$router.push({
                path:'/cms/productionorderlist/completionlist/details',
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
.log-list{display: flex;flex-wrap:wrap;padding:10px 0;}
</style>