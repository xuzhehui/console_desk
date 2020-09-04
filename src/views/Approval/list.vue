<template>
    <div>
        <FullPage 
        title='审批列表'
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
            <template slot='set' slot-scope='row'>
                <div>
                    <a @click="goPage(row.row)" style="margin:0 5px">订单详情</a>
                    <a @click="goDetails(row.row)" style="margin:0 5px">审批详情</a>
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
                {title:'订单号',name:'Input',value:'',serverName:'order_no',placeholder:'请输入订单号'},
                {title:'审批状态',name:'Select',placeholder:'请选择',value:'',
                    option:[
                        {label:'待审批',value:0},
                        {label:'同意',value:1},
                        {label:'驳回',value:2},
                        {label:'取消',value:3},
                    ]
                },
                {title:'审批类型',name:'Select',serverName:'type',placeholder:'请选择',value:'',
                    option:[
                        {label:'测量',value:1},
                        {label:'生产',value:2}
                    ]
                },
                {title:'创建人员',name:'Input',serverName:'nickname',value:'',placeholder:'请输入创建人员'},
                {title:'手机号',name:'Input',serverName:'mobile',value:'',placeholder:'请输入手机号'},
            ],
            tableColums:[
                {title:'订单编号',align:'center',key:'order_no',fixed:'left',width:'180'},
                {title:'订单类型',align:'center',key:'show_order_type',width:'100'},
                {title:'客户',align:'center',key:'client_name',width:'120'},
                {title:'手机号',align:'center',key:'mobile',width:'150'},
                {title:'审批类型',align:'center',key:'show_type',width:'100'},
                {title:'审批状态',align:'center',key:'show_state',width:'100'},
                {title:'创建人员',align:'center',key:'nickname',width:'100'},
                {title:'审批开始时间',align:'center',key:'crt_time',width:'180'},
                {title:'审批结束时间',align:'center',key:'upd_time',width:'180'},
                {title:'备注',align:'center',key:'remark',width:'200'},
                {title:'操作',align:'center',slot:'set',fixed:'right',width:'180'},
            ],
            tableData:[],
            pageIndex:1,
            total:0,
            pageSize:10,
            loading:false,
            proxyObj:{},
        }
    },
    methods:{
        init(row){
            row.page_index = this.pageIndex;
            row.page_size = this.pageSize
            this.proxyObj = row;
            this.getData(row)
        },
        getData(row){
            this.loading = true;
            this.axios('/api/order_oa_list',{params:row}).then(res=>{
                this.loading = false;
                res.data.data.map(v=>{
                    v.show_state = v.state == 0 ? '待审批' : (v.state == 1 ? '同意' : (v.state == 2 ? '驳回' :'取消'))
                    v.show_type = v.state == 1 ? '测量' : '生产'
                    v.show_order_type = v.order_type == 1 ? '工装' : '家装'
                })
                this.tableData = res.data.data;
                this.total = res.data.total;
            })
        },
        changePage(e){
            this.pageIndex = e;
            this.proxyObj.page_index = this.pageIndex;
            this.getData(this.proxyObj);
        },
        goPage(row){
            row.order_type == 1 ? this.$router.push({
                path:'/cms/approval/frock',
                query:{
                    id:row.id
                }
            }) : this.$router.push({
                path:'/cms/approval/details',
                query:{
                    id:row.id
                }
            })
        },
        goDetails(row){
            this.$router.push({
                path:'/cms/approval/examine',
                query:{
                    id:row.id
                }
            })
        },
        changeSize(e){
            this.pageSize = e;
            this.proxyObj.page_size = this.page_size;
            this.getData(this.proxyObj)
        }
    }
}
</script>

<style lang="scss" scoped>
.nav{display: flex;justify-content: space-between;align-items: center;}
.item-attr{display: flex;align-items: center;margin-bottom: 10px;}
</style>