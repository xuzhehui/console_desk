<template>
    <div>
        <FullPage 
        title='工装订单列表' 
        :list='list' 
        @init='init'
        :loading='loading' 
        @searchData='searchData' 
        @changePage='changePage'
        @changeSelected='changeSelected'
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

            <template slot='set' slot-scope='{row}'>
                <div>
                   <a style="margin:0 5px;" @click="goPage(row)">编辑</a>
                   <a style="margin:0 5px;" @click="goPage(row)">详情</a>
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
            logList:[],
            list:[
                {title:'按楼幢',name:'Select',multiple:true,change:true,filterable:true,serverName:'house',placeholder:'请选择',value:'',
                    option:[]
                },
                {title:'按单元',name:'Select',multiple:true,change:true,filterable:true,serverName:'unit',placeholder:'请选择',value:'',
                    option:[]
                },
                {title:'按房号',name:'Select',multiple:true,change:true,filterable:true,serverName:'number_detail',placeholder:'请选择',value:'',
                    option:[]
                },
                // {title:'产品',name:'Select',serverName:'id1',placeholder:'请选择',value:'',
                //     option:[]
                // },
            ],
            tableColums:[
                {title:'小区',align:'center',key:'residential_name',fixed:'left'},
                {title:'楼幢',align:'center',key:'house'},
                {title:'单元',align:'center',key:'unit'},
                {title:'楼层',align:'center',key:'layer'},
                {title:'房间号',align:'center',key:'number_detail'},
                {title:'单价',align:'center',key:'price'},
                {title:'预估房间工期',align:'center',key:'time',width:'200'},
                {title:'操作',align:'center',slot:'set',fixed:'right',width:'180'},
            ],
            tableData:[{type:'123'}],
            pageIndex:1,
            total:100,
            loading:false,
            room_list:[],
            units:[],
            house:[],
        }
    },
    created(){
        this.getData({id:this.$route.query.id})
    },
    methods:{
        init(row){
            console.log(row)
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
                let house_result = [],units_result = [];
                this.tableData.map(v=>{
                    this.room_list.push({value:v.id,label:v.number_detail})
                    house_result.push(v.house)
                    units_result.push(v.unit)
                })
                
                house_result = Array.from(new Set(house_result))
                units_result = Array.from(new Set(units_result))
                let houst_updata = [],unit_updata = [];
                house_result.map(v=>houst_updata.push({label:v+'幢',value:v}))
                units_result.map(v=>unit_updata.push({label:v+'单元',value:v}))
                this.list[0].option = houst_updata;
                this.list[1].option = unit_updata;
                this.list[2].option = this.room_list;
                
            })
        },
        changeSelected(e){
            console.log(e)
        },
        postData(){

        },
        goPage(row){
            this.$router.push({
                path:'/cms/ordermannage/businessorderlist/details',
                query:{
                    house_id:row.id
                }
            })
        },
        changePage(e){},
        changeSelected(e){
            console.log(e)
        }
    }
}
</script>

<style lang="scss" scoped>
// .log-list{display: flex;flex-wrap:wrap;padding:10px 0;color:#666;}
// .log-item{margin-right:40px;margin-bottom:20px;}
</style>