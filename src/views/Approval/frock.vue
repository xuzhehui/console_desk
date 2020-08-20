<template>
    <div>
        <FullPage 
        title='工装审批列表'
        :list='list' 
        @init='init' 
        @searchData='searchData' 
        @changePage='changePage'
        :tableColums='tableColums'
        :tableData='tableData'
        :pageIndex='pageIndex'
        :total='total'
        @selectTable='selectTable'
        >
            <div slot='titleButton'>
                <Button  @click="back"  style="margin-right:10px;">返回</Button>
                <Button type="error" style="margin-right:10px;" ghost>批量驳回审批</Button>
                <Button type="success" ghost>批量通过审批</Button>
            </div>

            <div slot='navButton'>
                <Button @click="setTableColums" type="primary" ghost icon='ios-cog'>表头设置</Button>
            </div>
            
            <template slot='set' slot-scope='row'>
                <div class="table-set">
                    <Icon @click="goDetail(row.row)" size='20' style="color:#32C800;cursor:pointer" type="ios-paper-outline" />
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
                {title:'按房号',name:'Input',value:'',serverName:'title',placeholder:'请输入房号'},
            ],
            tableColums:[
                {type:'selection',width:'60'},
                {title:'小区',align:'center',key:'residential_name'},
                {title:'楼幢',align:'center',key:'title'},
                {title:'单元',align:'center',},
                {title:'楼层',align:'center',key:'title'},
                {title:'房号',align:'center',key:'title'},
                {title:'单价',align:'center',key:'predict_price'},
                {title:'预估房间工期',align:'center',key:'predict_working'},
                {title:'操作',align:'center',slot:'set',width:'180'},
            ],
            tableData:[],
            pageIndex:1,
            total:100,
            showModal:false,
            showType:1,
            info:{},
            searchObj:{}
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
            this.axios('/api/order_oa_list',{params:row}).then(res=>{
                this.tableData = res.data;
            })
        },
        goDetail(row){
            this.$router.push({
                path:'/cms/approval/details',
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
        selectTable(pre){
            console.log(pre)
        }
    }
}
</script>

<style lang="scss" scoped>
.nav{display: flex;justify-content: space-between;align-items: center;}
.table-set{a{margin:0 5px;}}
</style>