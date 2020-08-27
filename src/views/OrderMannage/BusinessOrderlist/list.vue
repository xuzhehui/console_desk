<template>
    <div>
        <FullPage 
        title='业务订单列表'
        :list='list' 
        @init='init'
        :loading='loading' 
        @searchData='searchData' 
        @changePage='changePage'
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
            
            <template slot='set' slot-scope='row'>
                <div>
                    <a @click="openLower(row.row)" style="margin:0 5px">下测量</a>
                    <a style="margin:0 5px" @click="addOrder(2,row.row)">编辑</a>
                    <a style="margin:0 5px" @click="goDetial(row.row)">详情</a>
                    <a style="margin:0 5px">删除</a>
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

                <Modal class-name="vertical-center-modal" title='下测量' v-model="show_lower" @on-ok="lowerMeter(postInfo)">
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
                {title:'订单编号',name:'Input',serverName:'id',placeholder:'请输入订单编号',value:''},
                {title:'小区名字',name:'Input',serverName:'id1',placeholder:'请选择',value:''},
                {title:'出库日期范围',name:'Input',start_value:'',end_value:'',isDate:true,serverName:'id2',start_placeholder:'开始日期',end_placeholder:'结束日期'},
                {title:'紧急程度',name:'Select',serverName:'id1',placeholder:'请选择',value:'',
                    option:[
                        {label:'紧急',value:1}
                    ]
                },
            ],
            tableColums:[
                {type:'selection',fixed:'left',width:'60'},
                {title:'订单编号',align:'center',key:'order_no',},
                {title:'订单类型',align:'center',key:'show_type',width:'150'},
                {title:'紧急程度',align:'center',key:'show_warning_state',width:'150'},
                {title:'小区',align:'center',key:'address'},
                {title:'计划开始时间',align:'center',key:'start_time'},
                {title:'计划结束时间',align:'center',key:'end_time'},
                {title:'完成进度',align:'center',key:'show_state'},
                {title:'交货日期',align:'center',key:'predict_time'},
                {title:'操作',align:'center',slot:'set',fixed:'right',width:'150'},
            ],
            tableData:[
                {id:'1',title:'222'}
            ],
            pageIndex:1,
            total:100,
            showTableColums:false,
            show_lower:false,
            postInfo:{//下测量数据
                id:'',
                start_time:'',
                end_time:'',
                user_id:null,
            },
            users:[],
            selectIds:null,
            loading:false,
        }
    },

    methods:{
        init(row){
            this.getData({id:1})
            this.axios('/api/menu')
        },
        searchData(row){

        },
        getData(row){
            this.loading = true;
            this.axios('/api/order_index',{params:row}).then(res=>{
                this.loading = false;
                res.data.map(v=>{
                    v.show_type = v.type == 1 ? '业务订单' : '代理商订单'
                    v.show_state = v.state == 0 ? '未审核' : (v.state == 1 ? '审核中' : (v.state == 2 ? '审核通过' : (v.state == 3 ? '订单生产中' : '完成'))),
                    v.show_warning_state = v.warning_state == 0 ? '不急' : (v.warning_state == 1 ? '比较急' : (v.warning_state == 2 ? '紧急' : '非常急'))
                })
                this.tableData = res.data;
            })
        },
        changePage(e){
            console.log(e)
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
            this.postInfo.id = Array.isArray(row) ? row.join(',') : row.id
            this.show_lower = true;
            this.axios('/api/user').then(res=>this.users = res.data)
        },
        lowerMeter(postData){
            try{
                postData.start_time = new Date(postData.start_time).toLocaleDateString().replace(/\//g,"-")
                postData.end_time = new Date(postData.end_time).toLocaleDateString().replace(/\//g,"-")
            }catch(e){
                console.log(e)
            }
            this.axios.post('/api/orders_set_measure',postData).then(res=>{
                if(res.code == 200){
                    this.$Message.success(res.msg)
                    this.selectIds = null;//清空多选项
                }
            })
        },
        selectTable(e){
            let result = [];
            e.map(v=>result.push(v.id))
            this.selectIds = result;
        },
    }
}
</script>

<style lang="scss" scoped>
</style>