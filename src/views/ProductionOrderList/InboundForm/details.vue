<template>
    <div>
        <FullPage 
        title='入库详情'
        :list='list' 
        @init='init' 
        :logList='logList'
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
            <div slot='titleButton'>
                <Button @click="back" type='primary' ghost style="margin-right:10px;">返回</Button>
                <Button v-if="$route.query.type == 4" @click="confirmSuccess(selects)" type="success" ghost style="margin-right:10px;" >批量入库</Button>
                <Button v-if="$route.query.type == 4" type="warning" ghost @click="outStock(selects_out)">批量出库</Button>
                <Button v-if="$route.query.type == 2" @click="outShip(selects,1)" type="success" ghost style="margin-right:10px;" >批量确认出库</Button>
                <Button v-if="$route.query.type == 2" @click="outShip(selects_out,2)" type="success" ghost style="margin-right:10px;" >批量运输</Button>
                
            </div>
            <template slot-scope="{ row }" slot="set">
                <a v-if="$route.query.type == 4&&!row.order_in_no" class="map-margin" @click="confirmSuccess(row)">确认入库</a>
                <a v-if="$route.query.type == 4&&row.order_in_no" class="map-margin" @click="outStock(row)">出库</a>
                <a v-if="$route.query.type == 2&&!row.transport_no" class="map-margin" @click="outShip(row,1)">确认出库</a>
                <a v-if="$route.query.type == 2&&row.transport_no" class="map-margin" @click="outShip(row,2)">运输</a>
            </template>

            <Modal class-name="vertical-center-modal" width='400' title='确认出库' v-model="showStock" @on-ok="confirmOutStock">
                <Form :label-width="100">
                    <FormItem label='选择人员'>
                        <Select clearable v-model="info.user_id">
                            <Option v-for="item of users" :key="item.id" :value="item.id" :label="item.nickname"></Option>
                        </Select>
                    </FormItem>
                    
                    <FormItem label='出库日期'>
                        <DatePicker v-model="time" clearable type="daterange" split-panels placeholder="请选择日期"></DatePicker>
                    </FormItem>
                    <FormItem label="点工单形式">
                        <RadioGroup v-model="info.work_type">
                            <Radio :label="1">是</Radio>
                            <Radio :label="2">否</Radio>
                        </RadioGroup>
                    </FormItem>
                    <FormItem label="日薪" v-if="info.work_type == 1">
                        <Input v-model="info.user_salary">
                            <span slot="append">元</span>
                        </Input>
                    </FormItem>
                </Form>
            </Modal>
        </FullPage>
    </div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
    data(){
        return {
            list:[
                {title:'楼幢',name:'Input',serverName:'house',value:'',width:'50'},
                {title:'单元',name:'Input',serverName:'unit',value:'',width:'50'},
                {title:'房号',name:'Input',serverName:'number_detail',value:'',placeholder:'请输入房号'},
                {title:'产品名称',name:'Input',serverName:'product_title',value:'',placeholder:'请输入产品名称'},
            ],
            logList:[],
            tableColums:[
                {type:'selection',align:'center',width:'100',fixed:'left'},
                {title:'楼幢',align:'center',key:'house',width:'100'},
                {title:'单元',align:'center',width:'100',key:'layer'},
                {title:'楼层',align:'center',width:'100',key:'unit'},
                {title:'房号',align:'center',width:'100',key:'number_detail'},
                {title:'产品名称',align:'center',width:'200',key:'product_title'},
                {title:'部件',align:'center',width:'200',key:'part_title'},
                this.$route.query.type == 4 ? {title:'包装码',align:'center',width:'200',key:'order_in_no'} : {title:'运输单号',align:'center',width:'200',key:'transport_no'},
                {title:'单位',align:'center',width:'100',key:'company'},
                {title:'状态',align:'center',width:'200',key:'',
                    render:(h,params)=>h('span',{},params.row.sub_state==0 ? '未指派' : (params.row.sub_state == 1 ? '可以派工' : (params.row.sub_state == 2 ? '已派工' : '已完成')))
                },
                {title:'芯片编号',align:'center',width:'200'},
                {title:'操作',align:'center',width:'150',fixed:'right',slot:'set'},
            ],
            tableData:[],
            pageIndex:1,
            total:0,
            pageSize:10,
            loading:false,
            selects:[],
            selects_out:[],
            showStock:false,
            info:{
                user_id:'',
                work_type:2,
                order_in_no:'',
                start_time:'',
                end_time:'',
                user_salary:''
            },
            users:[],
            time:'',
            shipArray:[]
        }
    },
    
    methods:{
        init(row){
            this.axios('/api/user').then(res=>this.users = res.data.data)
            row.page_index = this.pageIndex;
            row.page_size = this.pageSize;
            Object.assign(row,this.$route.query)
            this.proxyObj = row;
            this.getData(row)
        },
        getData(row){
            this.loading = true;
            this.axios('/api/orders_list_detail',{params:row}).then(res=>{
                this.loading = false;
                this.tableData = res.data.data;
                this.logList = res.data.detail
                this.total = res.data.total||0;
            })
        },
        changePage(e){
            this.pageIndex = e;
            this.proxyObj.page_index = e;
            this.getData(this.proxyObj)
        },
        changeSize(e){
            this.pageSize = e;
            this.proxyObj.page_size = this.pageSize;
            this.getData(this.proxyObj)
        },
        back(){this.$router.go(-1)},
        selectTable(row){
            let result = [],outResult = [];
            if(this.$route.query.type == 2){
                row.map(v=>{
                    v.transport_no ? result.push(v.transport_no) : ''
                    v.order_in_no ? outResult.push(v.order_in_no) : ''
                })

            }else{
                row.map(v=>{
                    v.orders_procedure_id ? result.push(v.orders_procedure_id) : ''
                    v.order_in_no ? outResult.push(v.order_in_no) : ''
                })
            }
            this.selects = result||[];
            this.selects_out = outResult||[]
        },
        confirmSuccess(row){
            let params = '';
            if(!row||row.length<1){return this.$Message.error('请至少选择一项')}
            params = Array.isArray(row) ? row.join(',') : row.orders_procedure_id
            this.confirmDelete({
                title:'确认入库',
                content:'确认入库？',
                type:'primary',
                then:()=>{
                    this.axios.post('/api/orders_in',{orders_procedure_id:params})
                    .then(res=>{
                        if(res.code == 200){
                            this.$Message.success(res.msg);
                            this.getData(this.proxyObj)
                        }
                    })
                },
                cancel:()=>{
                    this.$Message.warning('您取消了确认入库操作')
                }
            })
        },
        outStock(row){
            if(!row||row.length<1){return this.$Message.error('您未选择或者未确认出库')}
            this.info.order_in_no = Array.isArray(row) ? row.join(',') : row.order_in_no
            this.showStock = true;
        },
        confirmOutStock(){
            if(this.time.length>0){
                this.info.start_time = new Date(this.time[0]).toLocaleDateString().replace(/\//g,"-")
                this.info.end_time = new Date(this.time[1]).toLocaleDateString().replace(/\//g,"-")
            }
            this.axios.post('/api/orders_out',this.info).then(res=>{
                if(res.code == 200){
                    this.$Message.success(res.msg)
                    setTimeout(()=>this.back(),500)
                }
            })
        },

        outShip(row,type){//type 1出库  2运输
            if(!row||row.length<1){return this.$Message.error('请至少选择一项')}
            let transport_no = Array.isArray(row) ? row.join(',') : row.transport_no;
            let post_url = type == 1 ? '/api/orders_transport' : '/api/orders_transport_confirm';
            let params = {};
            params.transport_no = transport_no
            this.confirmDelete({
                title:type == 1 ? '确认出库' : '确认运输',
                content:type == 1 ? '确认出库么？' : '确认运输么',
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
    }
}
</script>

<style lang="scss" scoped>

</style>