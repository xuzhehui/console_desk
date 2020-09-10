<template>
    <div>
        <FullPage 
        title='业务订单列表'
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

            <div slot='navButton' style="display:flex;">
                <Button @click="setTableColums" type="primary" style="margin-right:10px;" ghost icon='ios-cog'>表头设置</Button>
                <Button @click="addOrder(1)" type="primary" ghost icon='ios-cog'>新增订单</Button>
            </div>
            
            <template slot='set' slot-scope='{row}'>
                <div>
                    <a @click="openLower(row)" style="margin:0 5px">下测量</a>
                    <a style="margin:0 5px" @click="addOrder(2,row)">编辑</a>
                    <a style="margin:0 5px" @click="goDetial(row)">详情</a>
                    <a style="margin:0 5px" @click="delItems(row)">删除</a>
                </div>
            </template>

            <div>
                <Modal :width='1064' class-name="vertical-center-modal" v-model="showTableColums" title='设置表头'>
                    <Form>
                        <FormItem label='订单信息:'>
                            <div style="width:100%;display:flex;">
                                <CheckboxGroup style="width:100%">
                                    <Checkbox label="香蕉"></Checkbox>
                                    <Checkbox label="苹果"></Checkbox>
                                    <Checkbox label="西瓜"></Checkbox>
                                    <Checkbox label="香蕉"></Checkbox>
                                </CheckboxGroup>
                            </div>
                        </FormItem>
                    </Form>
                </Modal>

                <Modal @on-visible-change="visibleModal" class-name="vertical-center-modal" title='下测量' v-model="show_lower" @on-ok="lowerMeter(postInfo)">
                    <Form inline :label-width="100">
                        <FormItem label="测量人员">
                            <Select v-model="postInfo.user_id" style="width:186px;">
                                <Option v-for="item of users" :key="item.id" :label="item.nickname" :value="item.id"></Option>
                            </Select>
                        </FormItem>

                        <FormItem label="选择时间">
                            <div style="display:flex;">
                                <DatePicker v-model="postInfo.start_time" type="date" placeholder="开始时间"></DatePicker>
                                -
                                <DatePicker v-model="postInfo.end_time" type="date" placeholder="结束时间"></DatePicker>
                            </div>
                             
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        </FullPage>
    </div>
</template>

<script>
export default {
    data(){
        return {
            list:[
                {title:'订单编号',name:'Input',placeholder:'请输入订单编号',value:'',serverName:'order_no'},
                {title:'小区名字',name:'Input',placeholder:'请选择',value:'',serverName:'residential_name'},
                {title:'客户昵称',name:'Input',placeholder:'请选择',value:'',serverName:'client_name'},
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
                {type:'selection',fixed:'left',width:'60',fixed:'left'},
                {title:'订单编号',align:'center',key:'order_no',width:'200'},
                {title:'订单类型',align:'center',key:'show_type',width:'100'},
                {title:'紧急程度',align:'center',key:'show_warning_state',width:'100'},
                {title:'小区',align:'center',key:'address',width:'200'},
                {title:'计划开始时间',align:'center',key:'show_start_time',width:'180'},
                {title:'计划结束时间',align:'center',key:'show_end_time',width:'180'},
                {title:'完成进度',align:'center',key:'show_state',width:'180'},
                {title:'交货日期',align:'center',key:'show_predict_time',width:'200'},
                {title:'操作',align:'center',slot:'set',fixed:'right',width:'220',fixed:'right'},
            ],
            tableData:[],
            pageIndex:1,
            total:0,
            pageSize:10,
            showTableColums:false,
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
                    v.show_type = v.type == 1 ? '业务订单' : '代理商订单'
                    v.show_state = v.state == 0 ? '未审核' : (v.state == 1 ? '审核中' : (v.state == 2 ? '审核通过' : (v.state == 3 ? '订单生产中' : '完成')))
                    v.show_warning_state = v.warning_state == 0 ? '不急' : (v.warning_state == 1 ? '比较急' : (v.warning_state == 2 ? '紧急' : '非常急'))
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
        setTableColums(){//设置表头
            this.showTableColums = true;
        },
        addOrder(n,row){
            let id = row ? row.id : '';
            this.$router.push({
                path:'/cms/ordermannage/businessorderlist/edit',
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
                    id:row.id
                }
            })
        },
        openLower(row){
            if(!row){return this.$Message.warning('请至少选择一项')}
            this.postInfo.order_no = Array.isArray(row) ? row.join(',') : row.order_no
            this.show_lower = true;
            this.axios('/api/user').then(res=>this.users = res.data.data)
        },
        lowerMeter(postData){
            try{
                postData.start_time = new Date(postData.start_time).toLocaleDateString().replace(/\//g,"-")
                postData.end_time = new Date(postData.end_time).toLocaleDateString().replace(/\//g,"-")
            }catch(e){}
            this.axios.post('/api/orders_set_measure',postData).then(res=>{
                if(res.code == 200){
                    this.$Message.success(res.msg)
                    this.selectIds = null;//清空多选项
                    this.postInfo = {}
                }
            })
        },
        visibleModal(e){
            if(!e){
                this.postInfo = {
                    order_no:'',
                    start_time:'',
                    end_time:'',
                    user_id:null,
                }
            }
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
                    this.axios.post('/api/basics_order_del',{id:row.id,state:0}).then(res=>{
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