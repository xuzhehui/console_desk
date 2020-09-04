<template>
    <div>
        <FullPage 
        title='工装订单列表' 
        :list='list' 
        @init='init'
        :loading='loading' 
        @searchData='searchData' 
        @changePage='changePage'
        :tableColums='tableColums'
        :tableData='tableData'
        :pageIndex='pageIndex'
        :total='total'
        >   
            <div slot='titleButton'>
                <Button @click="back" style="margin-right:10px;">返回</Button>
                <Button type="primary" style="margin-right:10px;" ghost>批量下测量</Button>
                <Button type="primary" ghost>打印清单</Button>
            </div>

            <div slot='text-list' class="log-list">
                <div class="log-item" v-for="(item,index) of logList" :key="index">
                    <span>{{item.key}}：</span>
                    <span style="color:#333;font-weight:bold;">{{item.value}}</span>
                </div>
            </div>

            <template slot='set' slot-scope='row'>
                <div>
                   <a style="margin:0 5px;" @click="goPage">编辑</a>
                   <a style="margin:0 5px;" @click="goPage(row.row)">详情</a>
                   <a style="margin:0 5px;">下测量</a>
                </div>
            </template>
        </FullPage>
    </div>
</template>

<script>
export default {
    data(){
        return {
            type:1,
            logList:[{title:'系统单号',value:'10998765'}],
            list:[
                {title:'按房号',name:'Select',serverName:'id1',placeholder:'请选择',value:'',
                    option:[
                        {label:'紧急',value:1}
                    ]
                },
                {title:'产品',name:'Select',serverName:'id1',placeholder:'请选择',value:'',
                    option:[
                        {label:'紧急',value:1}
                    ]
                },
            ],
            tableColums:[
                {title:'小区',align:'center',key:'residential_name',fixed:'left'},
                {title:'楼幢',align:'center',key:'house'},
                {title:'单元',align:'center',key:'unit'},
                {title:'楼层',align:'center',key:'layer'},
                {title:'房间号',align:'center',key:'number'},
                {title:'单价',align:'center',key:'price'},
                {title:'预估房间工期',align:'center',key:'time',width:'200'},
                {title:'操作',align:'center',slot:'set',fixed:'right',width:'180'},
            ],
            tableData:[{type:'123'}],
            pageIndex:1,
            total:100,
            loading:false,
        }
    },
    methods:{
        init(row){
            this.getData({id:this.$route.query.id})
        },
        searchData(row){

        },
        back(){
            this.$router.go(-1)
        },
        getData(row){
            this.loading = true;
            this.axios('/api/order_industry_list',{params:row}).then(res=>{
                this.loading = false;
                this.tableData = res.data.oil
                this.logList = res.data.detail
            })
        },
        postData(){

        },
        goPage(row){
            this.$router.push({
                path:'/cms/ordermannage/businessorderlist/details',
                query:{
                    id:row.id
                }
            })
        },
        changePage(e){}
    }
}
</script>

<style lang="scss" scoped>
// .log-list{display: flex;flex-wrap:wrap;padding:10px 0;color:#666;}
// .log-item{margin-right:40px;margin-bottom:20px;}
</style>