<template>
    <div>
        <FullPage 
        title='测量订单列表'
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
            <div slot='titleButton' style="display:flex;">
                <Upload name='your_file' :show-upload-list='false' :headers='headers' :on-error='uploadError' :on-success='uploadSuccess' :action="$store.state.ip+'/api/measure_orders_import'">
                    <Button type="success" ghost icon='md-exit' style="margin-right:10px;">批量导入</Button>
                </Upload>
                <Button @click="exportData" type="warning" ghost icon='md-return-left' style="margin-right:10px;">批量导出</Button>
                <Button type="primary" ghost>批量确认</Button>
            </div>
            <template slot='set' slot-scope='{row}'>
                <div>
                    <a style="margin:0 5px" @click="goPage(2,row)">编辑</a>
                    <a style="margin:0 5px" @click="goPage(3,row)">查看</a>
                    <a style="margin:0 5px" @click="openModal(row)">下生产</a>
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
                {title:'订单编号',serverName:'order_no',name:'Input',value:'',placeholder:'请输入订单号'},
                {title:'紧急程度',name:'Select',serverName:'warning_state',placeholder:'请选择',value:'',
                    option:[
                        {label:'不急',value:0},
                        {label:'比较急',value:1},
                        {label:'紧急',value:2},
                        {label:'非常急',value:3},
                    ]
                },
                {title:'测量日期范围',start_server:'start_time',end_server:'end_time',start_value:'',end_value:'',isDate:true,start_placeholder:'开始日期',end_placeholder:'结束日期'},
            ],
            tableColums:[
                {title:'订单编号',align:'center',key:'order_no',fixed:'left',width:'200'},
                {title:'测量单号',align:'center',key:'oa_order_no',minWidth:200,
                    render:(h,params)=>h('span',{},params.row.oa_order_no||params.row.order_no)
                },
                {title:'小区',align:'center',key:'residential_name',minWidth:200},
                {title:'地址',align:'center',key:'address',minWidth:200},
                {title:'客户姓名',align:'center',key:'client_name',minWidth:100},
                {title:'电话',align:'center',key:'mobile',minWidth:150},
                {title:'订单类型',align:'center',key:'show_type',minWidth:100,
                    render(h,params){
                        return h('span',{

                        },params.row.order_type == 1 ? '工装' : '家装')
                    }
                },
                {title:'测量开始时间',align:'center',key:'measure_start_time',minWidth:200,
                    render:(h,params)=>h('span',{},this.func.replaceDate(params.row.measure_start_time*1))
                },
                {title:'测量结束时间',align:'center',key:'measure_end_time',minWidth:200,
                    render:(h,params)=>h('span',{},this.func.replaceDate(params.row.measure_end_time*1))
                },
                {title:'实际完成时间',align:'center',key:'plan_start_time',minWidth:200,
                    render:(h,params)=>h('span',{},this.func.replaceDate(params.row.plan_start_time*1))
                },
                {title:'订单状态',align:'center',key:'show_sub_state',minWidth:100,
                    render:(h,params)=>h('span',{}, params.row.sub_state == 0 ? '测量未审核' : ( params.row.sub_state == 1 ? '测量审核' : 
                    ( params.row.sub_state == 2 ? '测量通过' : (params.row.sub_state == 3 ? '生产审核中' : (params.row.sub_state == 4 ? '生产通过' : '到生产计划')))))
                },
                {title:'备注',align:'center',key:'remark',minWidth:200},
                {title:'操作',align:'center',slot:'set',width:'200',fixed:'right'},
            ],
            tableData:[],
            pageIndex:1,
            total:0,
            proxyObj:{},
            pageSize:10,
            planInfo:{
                order_no:null,
                start_time:'',
                end_time:''
            },
            loading:false,
            headers:{'Authorization':localStorage.getItem('token')},
        }
    },
    methods:{
        init(row){
            row.page_index = this.pageIndex;
            row.page_size = this.pageSize;
            row.sub_state = 2;
            this.proxyObj = row
            this.getData(this.proxyObj)
        },
        getData(row){
            this.loading = true;
            this.axios('/api/order_measure_list',{params:row}).then(res=>{
                this.loading = false;
                this.tableData = res.data.data;
                this.total = res.data.total;
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
        goPage(n,row){
            const order_no = row ? row.id: '';
            const id = row ? row.id : ''
            this.$router.push({
                path:'/cms/ordermannage/businessorderlist/decorationlist',
                query:{
                    id:id,
                    order_no:row.order_no,
                    type:'measure',
                }
            })
        },
        approvalDetails(row){
            this.$router.push({
                path:'/cms/approval/examine',
                query:{
                    order_no:row.oa_order_no||row.order_no
                }
            })
        },
        openModal(row){
            this.planInfo.order_no = row.order_no;
            this.downProduction({
                title:'下生产',
                type:2,
                params:this.planInfo,
                then:(e)=>{this.getData(this.proxyObj)},
                cancel:(e)=>{},
            })
        },
        exportData(){
            let url = this.$store.state.ip+'/api/measure_orders_export'+this.func.objToParams(this.proxyObj)
            location.href=url
        },
        uploadSuccess(res){
            if(res.code == 200){
                this.$Message.success(res.msg||'上传成功')
            }else{
                this.$Message.warning(res.msg||'上传失败')
            }
            this.getData(this.proxyObj)
        },
        uploadError(err){
            this.$Message.error(err.msg||'上传失败')
        }
    }
}
</script>

<style lang="scss" scoped>
.nav{display: flex;justify-content: space-between;align-items: center;}
.item-attr{display: flex;align-items: center;margin-bottom: 10px;}
</style>