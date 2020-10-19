<template>
    <div>
        <FullPage 
        title='代理商订单列表'
        :list='list' 
        @init='init'
        :loading='loading' 
        @searchData='init' 
        @changePage='changePage'
        @changeSize='changeSize'
        @selectTable='selectTable'
        :tableColums='tableColums'
        :tableData='tableData'
        :pageIndex='pageIndex'
        :total='total'
        >
            <div slot='titleButton' >
                <Button  type="primary" @click="openLower(selectIds)" style="margin-right:10px;" ghost>批量下测量</Button>
                <Button  type="primary" ghost>批量打印二维码</Button>
            </div>

            <!-- <div slot='navButton' style="display:flex;">
                <Button @click="addOrder(1)" type="primary" ghost icon='ios-cog'>新增订单</Button>
            </div> -->
            
            <template slot='set' slot-scope='{row}'>
                <div>
                    <!-- <a @click="openLower(row)" style="margin:0 5px">下测量</a> -->
                    <a style="margin:0 5px" @click="addOrder(2,row)">编辑</a>
                    <a style="margin:0 5px" @click="goDetial(row)">详情</a>
                    <a @click="openLower(row)" style="margin:0 5px">通过</a>
                    <a @click="openLower(row)" style="margin:0 5px">驳回</a>
                    <a style="margin:0 5px" @click="delItems(row)">删除</a>
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
                {title:'订单编号',name:'Input',placeholder:'请输入订单编号',value:'',serverName:'order_no'},
                {title:'项目地址',name:'Input',placeholder:'请输入',value:'',serverName:'residential_name'},
                {title:'代理商',name:'Input',placeholder:'请选择',value:'',serverName:'client_name'},
                {title:'手机号',name:'Input',placeholder:'请选择',value:'',serverName:'mobile'},
                {title:'订单状态',name:'Select',placeholder:'请选择',serverName:'sub_state',value:'',
                    option:[
                        {label:'测量未审核',value:0},
                        {label:'测量审核',value:1},
                        {label:'测量通过',value:2},
                        {label:'生产审核中',value:3},
                        {label:'生产通过',value:4},
                        {label:'到生产计划',value:5},
                    ]
                },
                {title:'订单类型',name:'Select',placeholder:'请选择',serverName:'type',value:'',
                    option:[
                        {label:'业务订单',value:1},
                        {label:'代理商订单',value:2},
                    ]
                },
                {title:'紧急程度',name:'Select',placeholder:'请选择',serverName:'warning_state',value:'',
                    option:[
                        {label:'不急',value:0},
                        {label:'比较急',value:1},
                        {label:'紧急',value:2},
                        {label:'非常急',value:3},
                    ]
                },
            ],
            tableColums:[
                {type:'selection',align:'center',minWidth:100,fixed:'left'},
                {title:'订单编号',align:'center',key:'order_no',minWidth:200},
                {title:'订单类型',align:'center',key:'show_type',minWidth:100},
                {title:'订单状态',align:'center',key:'state',minWidth:150,},
                {title:'代理商姓名',align:'center',key:'salesman',minWidth:150},
                {title:'紧急程度',align:'center',key:'show_warning_state',minWidth:100,
                    render(h,params){
                        return h('span',{
                            props:{},
                            style:{
                                color:params.row.warning_state ==  0 ? '#32C800' : (params.row.warning_state == 1 ? '#FFA141' : '#FF5E5C')
                            }
                        },params.row.warning_state == 0 ? '不急' : (params.row.warning_state == 1 ? '比较急' : (params.row.warning_state == 2 ? '紧急' : '非常急')))
                    }
                },
                {title:'小区',align:'center',key:'residential_name',minWidth:200},
                {title:'收款',align:'center',key:'residential_name',minWidth:100},
                {title:'完成进度',align:'center',key:'complete_rate',minWidth:180,
                    render(h,params){
                        return h('span',{},parseInt(params.row.complete_rate*100)+'%')
                    },
                },
                {title:'预估工期',align:'center',key:'show_predict_time',minWidth:200},
                {title:'操作',align:'center',slot:'set',fixed:'right',minWidth:250,fixed:'right'},
            ],
            tableData:[],
            pageIndex:1,
            total:0,
            pageSize:10,
            show_lower:false,
            postInfo:{//下测量数据
                order_no:'',
                start_time:'',
                end_time:'',
                user_id:null,
            },
            users:[],
            selectIds:null,
            loading:false,
            proxyObj:{},
        }
    },

    methods:{
        init(row){
            row.page_index = this.pageIndex;
            row.page_size = this.pageSize;
            this.proxyObj = row
            this.getData(row)
        },
        getData(row){
            this.loading = true;
            this.axios('/api/order_index',{params:row}).then(res=>{
                this.loading = false;
                if(!res.data.data){return this.$Message.error('列表数据返回格式不正确')}
                res.data.data.map(v=>{
                    v.show_type = v.type == 1 ? '工装' : '家装'
                    v.show_state = v.state == 0 ? '未审核' : (v.state == 1 ? '审核中' : (v.state == 2 ? '审核通过' : (v.state == 3 ? '订单生产中' : '完成')))
                    v.show_sub_state = v.sub_state == 0 ? '测量未审核' : (v.sub_state == 1 ? '测量审核' : 
                    (v.sub_state == 2 ? '测量通过' : (v.sub_state == 3 ? '生产审核中' : (v.sub_state == 4 ? '生产通过' : '到生产计划'))))
                    v.show_start_time = this.func.replaceDate(v.start_time)
                    v.show_end_time = this.func.replaceDate(v.end_time)
                    v.show_predict_time = this.func.replaceDate(v.predict_time)
                })
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
        addOrder(n,row){
            let id = row ? row.id : '';
            console.log(this.$store.state.userInfo)
            this.$router.push({
                path:this.$store.state.userInfo.is_agent == 1 ? '/cms/ordermannage/businessorderlist/agentorder' : '/cms/ordermannage/businessorderlist/edit',
                query:{
                    type:n,
                    id:id
                }
            })
        },
        goDetial(row){
            this.$router.push({
                path:'/cms/ordermannage/businessorderlist/decorationlist',
                query:{
                    id:row.id,
                    type:'business'
                }
            })
        },
        openLower(row){
            if(!row){return this.$Message.warning('请至少选择一项')}
            this.postInfo.order_no = Array.isArray(row) ? row.join(',') : row.order_no
            this.dowmMeasurement({
                params:this.postInfo,
                then:()=>{
                    this.selectIds = [];
                    this.postInfo = {}
                },
                cancel:()=>{this.postInfo = {}}
            })
        },
        selectTable(e){
            let result = [];
            e.map(v=>result.push(v.order_no))
            this.selectIds = result;
        },
        delItems(row){
            this.confirmDelete({
                content:'确认删除么？',
                then:()=>{
                    this.axios.post('/api/order_del',{id:row.id,state:0}).then(res=>{
                        if(res.code == 200){
                            this.$Message.success(res.msg)
                            this.getData(this.proxyObj)
                        } 
                    })
                }
            })
        },
    }
}
</script>

<style lang="scss" scoped>
</style>