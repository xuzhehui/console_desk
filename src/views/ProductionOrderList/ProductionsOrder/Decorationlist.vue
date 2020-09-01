<template>
    <div>
        <FullPage 
        title='工装订单列表2'
        :list='list' 
        @init='init' 
        @searchData='init' 
        @changePage='changePage'
        :tableColums='tableColums'
        :tableData='tableData'
        :pageIndex='pageIndex'
        :total='total'
        >
            <div slot='titleButton'>
                <Button  @click="back"  style="margin-right:10px;">返回</Button>
                <Button type="primary" ghost style="margin-right:10px;">批量修改工艺路线</Button>
                <Button type="primary" ghost style="margin-right:10px;">批量下生产计划</Button>
                <Button type="primary" ghost>批量打印订单</Button>
            </div>
            
            <template slot='set' slot-scope='row'>
                <div class="table-set">
                    <a @click="goDetail(row.row)">编辑</a>
                    <a @click="goDetail(row.row)">详情</a>
                    <a @click="openModal(row.row)">下生产计划</a>
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

                <Modal class-name="vertical-center-modal" title='下生产计划' v-model="showPlan" @on-ok="sendPlanInfo">
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
                {title:'按房号',name:'Input',value:'',serverName:'id',placeholder:'请输入ID'},
                {title:'产品',name:'Input',value:'',serverName:'title',placeholder:'请输入部件名称'},
            ],
            tableColums:[
                {title:'订单号',align:'center',key:'order_no'},
                {title:'小区名称',align:'center',key:'residential_name'},
                {title:'楼幢',align:'center',key:'house'},
                {title:'单元',align:'center',key:'unit'},
                {title:'楼层',align:'center',key:'layer'},
                {title:'房号',align:'center',key:'number'},
                {title:'是否紧急',align:'center',key:''},
                {title:'单价',align:'center',key:''},
                {title:'交付日期',align:'center',key:''},
                {title:'订单生产时间',align:'center',key:''},
                {title:'单价',align:'center',key:''},
                {title:'图纸',align:'center',key:''},
                {title:'预估房号工期',align:'center',key:''},
                {title:'操作',align:'center',slot:'set',width:'180'},
            ],
            tableData:[],
            pageIndex:1,
            total:100,
            showModal:false,
            showType:1,
            classInfo:{},
            searchObj:{},
            showTableColums:false,
            showPlan:false,
            planInfo:{
                id:null,
                start_time:'',
                end_time:''
            }
        }
    },
    methods:{
        init(row){
            this.searchObj = row;
            this.getData({id:this.$route.query.id})
        },
        getData(row){
            this.axios('/api/order_industry_list',{params:row}).then(res=>{
                this.tableData = res.data.oil;
            })
        },
        goDetail(row){
            this.$router.push({
                path:'/cms/productionorderlist/productionsorder/details',
            })
        },
        changePage(e){
            this.pageIndex = e;
        },
        back(){
            this.$router.go(-1)
        },
        openModal(row){
            this.planInfo.id = row.id;
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
        }
    }
}
</script>

<style lang="scss" scoped>
.nav{display: flex;justify-content: space-between;align-items: center;}
.table-set{a{margin:0 5px;}}
</style>