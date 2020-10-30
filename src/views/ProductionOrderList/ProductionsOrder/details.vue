<template>
    <div>
        <FullPage 
        title='编辑订单' 
        :list='list'
        :logList='logList'
        @changePage='changePage'
        :tableColums='tableColums'
        :tableData='tableData'
        :pageIndex='pageIndex'
        :total='total'
        >   
            <div slot='titleButton'>
                <Button @click="back" type='primary' ghost style="margin-right:10px;">返回</Button>
                <Button type="primary" style="margin-right:10px;" @click="postData">打印图纸</Button>
                <Button type="primary" @click="openModal">下生产计划</Button>
            </div>


            <template slot='set' slot-scope='row'>
                <div>
                   <a>打印图纸</a>
                </div>
            </template>
            <div>
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
            type:1,
            list:[
                {name:'Input',title:'产品名称',value:'',placeholder:'请输入产品名称'},
                {name:'Input',title:'长',value:'',width:50},
                {name:'Input',title:'宽',value:'',width:50},
                {name:'Input',title:'高',value:'',width:50},
            ],
            logList:[],
            order_no:null,
            tableColums:[
                {title:'部件',align:'center',key:'part_title',fixed:'left',width:'150'},
                {title:'工艺路线',align:'center',minWidth:200,
                    render(h,params){
                        return h('a',{
                            props:{

                            }
                        },'编辑工艺路线')
                    }
                },
                {title:'指导报价 (元)',align:'center',minWidth:200,key:'price'},
                {title:'测量数据',align:'center',minWidth:200,key:'measurement'},
                {title:'图号',align:'center',minWidth:200,key:'url_number'},
                {title:'图纸',align:'center',minWidth:200,key:'url'},
                {title:'预估工期',align:'center',minWidth:200,key:'predict_time'},
                {title:'操作',align:'center',slot:'set',fixed:'right',width:'120'},
            ],
            tableData:[{type:'123'}],
            pageIndex:1,
            total:100,
            showPlan:false,
            planInfo:{
                order_no:null,
                start_time:'',
                end_time:''
            },
        }
    },
    mounted(){
        this.getData({house_id:this.$route.query.house_id})
    },
    methods:{
        back(){
            this.$router.go(-1)
        },
        getData(row){
            this.axios('/api/orders_product_parts_list',{params:row}).then(res=>{
                this.logList = res.data.detail;
                this.tableData = res.data.list;
                res.data.top.map(v=>{v.width=200,this.tableColums.splice(1,0,v)})
                
                this.order_no = res.data.order_no;
                this.total = res.data.total;
            })
            this.tableData.push({order_no:'123'})
        },
        postData(){

        },
        changePage(e){},
        sendPlanInfo(){
            try{
                this.planInfo.start_time = new Date(this.planInfo.start_time).toLocaleDateString().replace(/\//g,"-")
                this.planInfo.end_time = new Date(this.planInfo.end_time).toLocaleDateString().replace(/\//g,"-")
            }catch(e){
            }
            this.axios.post('/api/orders_plan',this.planInfo).then(res=>{
                if(res.code == 200){
                    this.$Message.success(res.msg)
                }
            })
        },
        openModal(row){
            this.planInfo.order_no = this.order_no;
            this.showPlan = true;
        },
    }
}
</script>

<style lang="scss" scoped>
.log-list{display: flex;flex-wrap:wrap;padding:10px 0;}
</style>