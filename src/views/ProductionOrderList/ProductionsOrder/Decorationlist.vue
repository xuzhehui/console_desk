<template>
    <div>
        <FullPage 
        title='工装订单列表2'
        :list='list' 
        @init='init' 
        :logList='logList'
        @searchData='init' 
        @changePage='changePage'
        @selectTable='selectTable'
        :tableColums='tableColums'
        :tableData='tableData'
        :pageIndex='pageIndex'
        :total='total'
        >
            <div slot='titleButton'>
                <Button  @click="back" type='primary' ghost  style="margin-right:10px;">返回</Button>
                <Button type="primary" ghost style="margin-right:10px;">批量修改工艺路线</Button>
                <Button type="primary" ghost style="margin-right:10px;" @click='openModal(selects)'>批量下生产计划</Button>
                <Button type="primary" ghost>批量打印订单</Button>
            </div>
            
            <template slot='set' slot-scope='{row}'>
                <div class="table-set">
                    <a >更改芯片</a>
                    <a @click="openModal(row)">下生产计划</a>
                    <a>下载图纸</a>
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

                <Modal class-name="vertical-center-modal" title='下生产计划' v-model="showPlan" @on-ok="sendPlanInfo" @on-visible-change='vivibleModal'>
                    <Form>
                        <FormItem label="选择时间">
                            <div style="display:flex;">
                                <DatePicker v-model="planInfo.start_time" type="date" placeholder="开始时间"></DatePicker>
                                -
                                <DatePicker v-model="planInfo.end_time" type="date" placeholder="结束时间"></DatePicker>
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
                {title:'按房号',name:'Input',value:'',serverName:'number',placeholder:'请输入ID'},
                {title:'产品',name:'Input',value:'',serverName:'title',placeholder:'请输入部件名称'},
                {title:'是否存在工艺路线',name:'Input',value:'',serverName:'title',placeholder:'请输入部件名称'},
            ],
            tableColums:[
                {type:'selection',fixed:'left',width:'100',align:'center'},
                {title:'楼幢',align:'center',key:'house',width:'200'},
                {title:'单元',align:'center',key:'unit',width:'200'},
                {title:'楼层',align:'center',key:'layer',width:'200'},
                {title:'房号',align:'center',key:'number_detail',width:'200'},
                {title:'单价',align:'center',key:'price',width:'200'},
                {title:'产品',align:'center',key:'product_title',width:'200'},
                {title:'部件名',align:'center',key:'part_title',width:'200'},
                {title:'部件相关',align:'center',key:'',width:'200'},
                {title:'芯片',align:'center',key:'',width:'200'},
                {title:'预估房号工期',align:'center',key:'predict_time',width:'200'},
                {title:'操作',align:'center',slot:'set',width:'280',fixed:'right'},
            ],
            tableData:[],
            pageIndex:1,
            total:100,
            showModal:false,
            showType:1,
            logList:[],
            classInfo:{},
            searchObj:{},
            showTableColums:false,
            showPlan:false,
            planInfo:{
                order_no:null,
                start_time:'',
                end_time:''
            },
            selects:[],
            order_no:null,
        }
    },
    methods:{
        init(row){
            this.searchObj = row;
            this.getData({order_no:this.$route.query.order_no,type:'produce'})
        },
        getData(row){
            this.axios('/api/orders_produce_parts_list',{params:row}).then(res=>{
                this.order_no = res.data.order_no;
                this.logList = res.data.detail
                this.tableData = res.data.list;
            })
            this.tableData.push({order_no:'222222'})
            this.tableData.push({order_no:'222222'})
        },
        goDetail(row){
            this.$router.push({
                path:'/cms/productionorderlist/productionsorder/details',
                // path:'/cms/ordermannage/businessorderlist/details',
                query:{
                    house_id:row.house_id,
                    type:'produce'
                }
            })
        },
        changePage(e){
            this.pageIndex = e;
        },
        back(){
            this.$router.go(-1)
        },
        openModal(row){
            if(Array.isArray(row)){//批量下生产操作
                if(row.length<1){return this.$Message.warning('请至少选择一项')}
                let result = [];
                row.map(v=>result.push(v.order_no))
                this.planInfo.order_no = result.join(',')
            }else{//单个下生产
                // this.planInfo.order_no = row.order_no;
            }
            this.planInfo.order_no = this.order_no;
            this.showPlan = true;
        },
        sendPlanInfo(){
            try{
                this.planInfo.start_time = new Date(this.planInfo.start_time).toLocaleDateString().replace(/\//g,"-")
                this.planInfo.end_time = new Date(this.planInfo.end_time).toLocaleDateString().replace(/\//g,"-")
            }catch(e){}
            this.axios.post('/api/orders_plan',this.planInfo).then(res=>{
                if(res.code == 200){
                    this.$Message.success(res.msg)
                }
            })
        },
        selectTable(e){
            this.selects = e;
        },
        vivibleModal(e){
            if(!e){
                this.planInfo = {
                    order_no:null,
                    start_time:'',
                    end_time:''
                }
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.nav{display: flex;justify-content: space-between;align-items: center;}
.table-set{a{margin:0 5px;}}
</style>