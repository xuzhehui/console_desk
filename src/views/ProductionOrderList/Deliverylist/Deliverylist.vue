<template>
    <div>
        <FullPage 
        title='出库表'
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
            <div slot='navButton'>
                
            </div>
            
            <template slot='set' slot-scope='{row}'>
                <a @click="confirmOutStock(row,1)"  v-if="!row.transport_no" class="map-margin">确认出库</a>
                <a @click="confirmOutStock(row,2)" v-if="row.transport_no" class="map-margin">确认运输</a>
                <a class="map-margin" @click="goPage(row)">详情</a>
            </template>
        </FullPage>
    </div>
</template>

<script>
export default {
    data(){
        return {
            list:[
                {title:'订单编号',name:'Input',serverName:'order_no',placeholder:'请输入订单编号',value:''},
                {title:'派工类型',name:'Input',placeholder:'请选择',value:''},
                {title:'出库日期范围',start_server:'start_time',end_server:'end_time',name:'Input',start_value:'',end_value:'',isDate:true,start_placeholder:'开始日期',end_placeholder:'结束日期'}
            ],
            tableColums:[
                {title:'订单编号',align:'center',key:'order_no',fixed:'left',width:'200'},
                {title:'订单类型',align:'center',key:'type_name',
                    render:(h,params)=>h('span',{},params.row.type == 1 ? '工装' : '家装')
                },
                {title:'紧急程度',align:'center',key:'show_warning_state',
                    render(h,params){
                        return h('span',{
                            props:{},
                            style:{
                                color:params.row.warning_state ==  0 ? '#32C800' : (params.row.warning_state == 1 ? '#FFA141' : '#FF5E5C')
                            }
                        },params.row.warning_state == 0 ? '不急' : (params.row.warning_state == 1 ? '比较急' : (params.row.warning_state == 2 ? '紧急' : '非常急')))
                    }
                },
                {title:'小区名称',align:'center',key:'residential_name',},
                {title:'出库时间',align:'center',key:'unit'},
                {title:'客户',align:'center',key:'warning_number',},
                {title:'手机号',align:'center',key:'mobile',},
                {title:'订单状态',align:'center',key:'long',
                    render:(h,params)=>h('span',{},params.row.sub_state==0 ? '未指派' : (params.row.sub_state == 1 ? '可以派工' : (params.row.sub_state == 2 ? '已派工' : '已完成')))
                },
                {title:'操作',align:'center',slot:'set',fixed:'right',width:'150'},
            ],
            tableData:[],
            pageIndex:1,
            total:0,
            proxyObj:{},
            loading:false,
        }
    },
    methods:{
        init(row){
            this.proxyObj = row;
            this.getData(row)
        },
        getData(row){
            this.loading = true;
            this.axios('/api/orders_out_list',{params:row}).then(res=>{
                this.loading = false;
                if(res.code == 200){
                    this.tableData = res.data.data;
                    this.total = res.data.total;
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
        confirmOutStock(row,type){//type 1出库  2运输
            let params = {};
            let post_url = type == 1 ? '/api/orders_transport' : '/api/orders_transport_confirm';
            params.transport_no = row.transport_no||row.order_no;
            this.confirmDelete({
                title:type == 1 ? '确认出库' : '确认运输',
                content:type == 1 ? '确认出库么？' : '确认运输么？',
                type:'primary',
                then:e=>{
                    this.axios.post(post_url,params).then(res=>{
                        if(res.code == 200){
                            this.$Message.success(res.msg)
                            this.getData(this.proxyObj)
                        }
                    })
                },
                cancel:e=>{
                }
            })
        },
        goPage(row){
            this.$router.push({
                path:'/cms/productionorderlist/inboundform/details',
                query:{
                    order_no:row.order_no,
                    type:2
                }
            })
        },
    }
}
</script>

<style lang="scss" scoped>
</style>