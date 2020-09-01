<template>
    <div>
        <FullPage 
        title='工装订单列表'
        :list='list' 
        @init='init' 
        @searchData='init' 
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
            
            <template slot='set' slot-scope='row'>
                <div class="table-set">
                    <a>编辑</a>
                    <a @click="goDetail">详情</a>
                    <a>下测量</a>
                </div>
            </template>
        </FullPage>
    </div>
</template>

<script>
export default {
    data(){
        return {
            list:[
                {title:'产品',name:'Input',value:'',serverName:'title',placeholder:'请输入部件名称'},
            ],
            tableColums:[
                {title:'小区',align:'center',key:'id'},
                {title:'楼幢',align:'center',key:'title'},
                {title:'单元',align:'center',},
                {title:'楼层',align:'center',key:'title'},
                {title:'房号',align:'center',key:'title'},
                {title:'单价',align:'center',key:'title'},
                {title:'预估房间工期',align:'center',key:'title'},
                {title:'操作',align:'center',slot:'set',width:'180'},
            ],
            tableData:[],
            pageIndex:1,
            total:100,
            showModal:false,
            showType:1,
            classInfo:{},
            searchObj:{}
        }
    },
    methods:{
        init(row){
            this.searchObj = row;
            this.getData(row)
        },
        getData(row){
            this.axios('/api/basics_parts_index').then(res=>{
                this.tableData = res.data;
            })
        },
        goDetail(row){
            this.$router.push({
                path:'/cms/productionorderlist/deliverylist/decorationorderdetails',
            })
        },
        changePage(e){
            this.pageIndex = e;
        },
        back(){
            this.$router.go(-1)
        },
        setTableColums(){//设置表头
            this.showTableColums = true;
        },
    }
}
</script>

<style lang="scss" scoped>
.nav{display: flex;justify-content: space-between;align-items: center;}
.table-set{a{margin:0 5px;}}
</style>