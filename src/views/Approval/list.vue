<template>
    <div>
        <FullPage 
        title='审批列表'
        :list='list' 
        @init='init' 
        @searchData='searchData' 
        @changePage='changePage'
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
                {title:'订单号',name:'Input',value:'',placeholder:'请输入订单号'},
                {title:'审批状态',name:'Select',placeholder:'请选择',value:'',
                    option:[
                        {label:'紧急',value:1}
                    ]
                },
                {title:'审批类型',name:'Select',placeholder:'请选择',value:'',
                    option:[
                        {label:'紧急',value:1}
                    ]
                },
                {title:'创建人员',name:'Input',value:'',placeholder:'请输入创建人员'},
                {title:'手机号',name:'Input',value:'',placeholder:'请输入手机号'},
            ],
            tableColums:[
                {title:'订单编号',align:'center',key:'order_no'},
                {title:'订单类型',align:'center',key:'show_order_type'},
                {title:'客户',align:'center',key:'client_name'},
                {title:'手机号',align:'center',key:'mobile'},
                {title:'审批类型',align:'center',key:'show_type'},
                {title:'审批状态',align:'center',key:'show_state'},
                {title:'创建人员',align:'center',key:'nickname'},
                {title:'审批开始时间',align:'center',key:'crt_time'},
                {title:'审批结束时间',align:'center',key:'upd_time'},
                {title:'备注',align:'center',key:'remark'},
                {title:'操作',align:'center',slot:'set'},
            ],
            tableData:[],
            pageIndex:1,
            total:100,
        }
    },
    methods:{
        init(row){
            this.getData(row)
        },
        searchData(row){
            this.getData(row)
        },
        getData(row){
            this.axios('/api/order_oa_list',{params:row}).then(res=>{
                res.data.map(v=>{
                    v.show_state = v.state == 0 ? '待审批' : (v.state == 1 ? '同意' : (v.state == 2 ? '驳回' :'取消'))
                    v.show_type = v.state == 1 ? '测量' : '生产'
                    v.show_order_type = v.order_type == 1 ? '工装' : '家装'
                })
                this.tableData = res.data;
            })
        },
        changePage(e){
            this.pageIndex = e;
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
        }
    }
}
</script>

<style lang="scss" scoped>
.nav{display: flex;justify-content: space-between;align-items: center;}
.item-attr{display: flex;align-items: center;margin-bottom: 10px;}
</style>