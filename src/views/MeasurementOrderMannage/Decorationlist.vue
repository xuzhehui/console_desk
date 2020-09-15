<template>
    <div>
        <FullPage 
        title='工装订单列表（测量订单）' 
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
                <Button @click="back" type='primary' ghost style="margin-right:10px;">返回</Button>
                <Button @click="openModal(selects)" type="primary" style="margin-right:10px;" ghost>批量下生产</Button>
                <Button type="primary" ghost>批量导出</Button>
            </div>


            <template slot='set' slot-scope='{row}'>
                <div>
                   <a style="margin:0 5px;" @click="goPage(row)">编辑</a>
                   <a style="margin:0 5px;" @click="goPage(row)">详情</a>
                   <a style="margin:0 5px;" @click="openModal(row)">下生产</a>
                </div>
            </template>

            <Modal class-name="vertical-center-modal" title='下生产' v-model="showPlan" @on-ok="sendPlanInfo">
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
        </FullPage>
    </div>
</template>

<script>
export default {
    data(){
        return {
            type:1,
            order_no:null,
            logList:[],
            list:[
                {title:'按房号',name:'Select',serverName:'number',placeholder:'请选择',value:'',
                    option:[
                        {label:'紧急',value:1}
                    ]
                },
                {title:'订单状态',name:'Select',serverName:'type',placeholder:'请选择',value:'',
                    option:[
                        {label:'紧急',value:1}
                    ]
                },
            ],
            tableColums:[
                {type:'selection',fixed:'left',width:90,align:'center'},
                // {title:'测量单号',align:'center',key:'oa_order_no',width:'200'},
                // {title:'订单号',align:'center',key:'order_no',width:'200'},
                // {title:'小区',align:'center',key:'residential_name',width:'200'},
                {title:'楼幢',align:'center',width:'200',key:'house'},
                {title:'单元',align:'center',width:'200',key:'unit'},
                {title:'楼层',align:'center',width:'200',key:'layer'},
                {title:'房间号',align:'center',width:'200',key:'number'},
                // {title:'订单状态',align:'center',width:'200',key:'type'},
                // {title:'测量开始时间',align:'center',width:'200',key:'measure_start_time'},
                // {title:'测量结束时间',align:'center',width:'200',key:'end_time'},
                {title:'实际完成时间',align:'center',width:'200',key:'plan_start_time'},
                {title:'操作',align:'center',slot:'set',fixed:'right',width:'200'},
            ],
            tableData:[],
            pageIndex:1,
            total:0,
            showPlan:false,
            planInfo:{
                house_id:null,
                start_time:'',
                end_time:''
            },
            selects:[],
        }
    },
    created(){
    },
    methods:{
        init(row){
            row.oa_order_no = this.$route.query.oa_order_no
            row.type = 'oa'
            this.getData(row)
        },
        getData(row){
            this.axios('/api/orders_house_list',{params:row}).then(res=>{
                if(res.code == 200){
                    this.tableData = res.data.list;
                    this.logList = res.data.detail
                }
            })
        },
        back(){
            this.$router.go(-1)
        },
        
        postData(){

        },
        goPage(row){
            console.log(row)
            this.$router.push({
                path:'/cms/measurementordermannage/edit',
                query:{
                    house_id:row.house_id,
                    oa_order_no:row.oa_order_no
                }
            })
        },
        changePage(e){},
        sendPlanInfo(){
            try{
                this.planInfo.start_time = new Date(this.planInfo.start_time).toLocaleDateString().replace(/\//g,"-")
                this.planInfo.end_time = new Date(this.planInfo.end_time).toLocaleDateString().replace(/\//g,"-")
            }catch(e){

            }
            this.axios.post('/api/order_oa_people',this.planInfo).then(res=>{
                if(res.code == 200){
                    this.$Message.success(res.msg)
                }
            })
        },
        openModal(row){
            if(Array.isArray(row)){
                if(row.length<1){return this.$Message.error('请至少选择一项')}
                let result = [];
                row.map(v=>result.push(v))
                this.planInfo.house_id = result.join(',')
            }
            this.planInfo.house_id = row.house_id;
            this.showPlan = true;
        },
        selectTable(e){
            this.selects = e;
        }
        
    }
}
</script>

<style lang="scss" scoped>
.log-list{display: flex;flex-wrap:wrap;padding:10px 0;}
</style>