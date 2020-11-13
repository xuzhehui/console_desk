<template>
    <div>
        <FullPage 
        title='工装审批列表'
        :list='list' 
        @init='init' 
        :logList='logList'
        @searchData='init' 
        @changePage='changePage'
        :tableColums='tableColums'
        :tableData='tableData'
        :pageIndex='pageIndex'
        :total='total'
        @selectTable='selectTable'
        >
            <div slot='titleButton'>
                <Button type='primary' ghost  @click="back"  style="margin-right:10px;">返回</Button>
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
                {title:'按房号',name:'Input',value:'',placeholder:'请输入房号'},
            ],
            tableColums:[
                {type:'selection',width:'60'},
                {title:'小区',align:'center',key:'residential_name'},
                {title:'楼幢',align:'center',key:'house'},
                {title:'单元',align:'center',key:'unit'},
                {title:'楼层',align:'center',key:'layer'},
                {title:'房号',align:'center',key:'number'},
                {title:'单价',align:'center',key:'price'},
                {title:'预估房间工期',align:'center',key:'predict_time'},
                {title:'操作',align:'center',slot:'set',width:'180'},
            ],
            tableData:[],
            pageIndex:1,
            total:0,
            showModal:false,
            showType:1,
            info:{},
            proxyObj:{},
            logList:[],
            pageIndex:1,
            pageSize:10,
        }
    },
    methods:{
        init(row){
            this.proxyObj = row;
            this.getData({oa_order_no:this.$route.query.oa_order_no,type:'oa'})
        },
        getData(row){
            this.axios('/api/orders_house_list',{params:row}).then(res=>{
                this.tableData = res.data.list;
                this.logList = res.data.detail;
                this.total = res.data.total;
            })
        },
        goDetail(row){
            this.$router.push({
                path:'/cms/approval/details',
                query:{
                    oa_order_no:row.oa_order_no,
                    house_id:row.house_id
                }
            })
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
        back(){
            this.$router.go(-1)
        },
        setTableColums(){//设置表头
            this.showTableColums = true;
        },
        selectTable(pre){
        }
    }
}
</script>

<style lang="scss" scoped>
.nav{display: flex;justify-content: space-between;align-items: center;}
.table-set{a{margin:0 5px;}}
</style>