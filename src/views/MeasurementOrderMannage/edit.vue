<template>
    <div>
        <Toptitle :title='type == 2 ? "编辑订单" : "查看订单" '>
            <Button @click="back" type='primary' ghost style="margin-right:10px;">返回</Button>
            <Button :disabled='type == 3 ? true : false' type="primary" style="margin-right:10px;" @click="postData">保存</Button>
            <Button :disabled='type == 3 ? true : false' type="primary" @click="openModal">下生产</Button>
        </Toptitle>

        <div class="page-edit">
            <div class="log-list">
                <div class="log-item" v-for="(item,index) of logList" :key="index">
                    <span>{{item.key}}：</span>
                    <span>{{item.value}}</span>
                </div>
            </div>
            <div>
                <Table  @on-selection-change='selectTable'  :width="tableWidth" class="overflow-table" border stripe :columns="tableColums" :data="tableData">

                    <div slot-scope="{index }" v-for="(item,_key) in tableTop" :key="_key" :slot="item.slot">
                        <Input v-model="tableData[index][item.key]" :placeholder="'请输入'+item.title"></Input> 
                    </div>

                    <template slot-scope="{index }" slot="img_number">
                        <Input :disabled='type == 3 ? true : false' v-model="tableData[index].url_number" placeholder="请输入图号"/>
                    </template>
                    <template slot-scope="{row,index}" slot="up-load">
                        <div>
                            <Upload :disabled='type == 3 ? true : false' :headers="headers" :on-success='successUpload' :show-upload-list='false' :action="$store.state.ip+'/api/upload_pic'">
                                <a v-if="!row.url" @click="mapRow(index)">上传</a>
                                <img @click="mapRow(index)" style="max-width:50px;max-height:50px;position:relative;top:3px" v-if="row.url" :src="$store.state.ip+row.url" alt="">
                            </Upload>
                        </div>
                    </template>
                </Table>
            </div>
        </div>

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
    </div>
</template>

<script>
export default {
    data(){
        return {
            type:1,
            oa_order_no:null,
            house_id:null,
            logList:[{title:'系统单号',value:'10998765'}],
            tableColums:[
                {type:'selection',width:100,align:'center',fixed:'left'},
                {title:'产品名称',align:'center',key:'product_title',fixed:'left',width:'200'},
                {title:'产品型号',align:'center',key:'model',width:'150'},
                {title:'单位',align:'center',key:'unit',width:'130'},
                {title:'图号',align:'center',width:'130',slot:'img_number',},
                {title:'图纸',align:'center',slot:'up-load',width:'130'},
                {title:'位置',align:'center',width:'200',key:'position'},
                {title:'预估产品工期',align:'center',width:'200',key:'predict_working'},
                {title:'测量数据',align:'center',fixed:'right',width:'200',key:'model'},
            ],
            tableData:[],
            pageIndex:1,
            total:100,
            logList:[],
            headers:{'Authorization':localStorage.getItem('token')},
            currentIndex:0,
            showPlan:false,
            planInfo:{
                order_product_id:'',
            },
            tableWidth:null,
            tableTop:[],
            select:[],
        }
    },
    created(){
        this.tableWidth = window.innerWidth-300;
        this.type = this.$route.query.type;
        this.oa_order_no = this.$route.query.oa_order_no;
        this.house_id = this.$route.query.house_id;
        this.getData(this.oa_order_no,this.house_id)
        
    },
    mounted(){
        window.addEventListener('resize',(e)=>{this.tableWidth = e.target.innerWidth - 300;this.$forceUpdate();})
    },
    methods:{
        back(){
            this.$router.go(-1)
        },
        selectTable(e){
            let result = [];
            e.map(v=>result.push(v.order_product_id))
            this.select = result;
        },
        postData(){
            let result= [];
            this.tableData.map((v,i)=>{
                let obj = {};
                obj.order_product_id = v.order_product_id;
                obj.url = v.url||'';
                obj.url_number = v.url_number||'';
                obj.detail = [];
                this.tableTop.map(k=>{
                    let o = {}
                    let key = k.key;
                    for(let m in this.tableData[i]){
                        if(m==key){
                            o.key = key
                            o.value = this.tableData[i][key]
                            o.title = k.title
                            obj.detail.push(o)
                        }
                        
                    }
                })
                result.push(obj)
            })
            console.log(result)
            let postInfo = JSON.stringify(result)
            this.axios.post('/api/orders_save_measure',{data:postInfo}).then(res=>{
                if(res.code == 200){
                    this.$Message.success(res.msg);
                }
            })
        },
        getData(oa_order_no,house_id){
            this.axios('/api/orders_product_list',{params:{oa_order_no:oa_order_no,house_id:house_id,type:'oa'}}).then(res=>{
                this.tableData = res.data.list;
                this.logList = res.data.detail
                this.tableTop = res.data.top;
                console.log(this.tableTop)
                res.data.top.map(v=>{
                    v.width=200;
                    v.slot=v.key;
                    this.tableColums.splice(2,0,v)
                })
            })
            
        },
        goPage(row){
            this.$router.push({
                path:'/cms/productionorderlist/deliverylist/partsdetails'
            })
        },
        successUpload(event){
            let url = event.data.url;
            this.tableData[this.currentIndex].url = url
        },
        mapRow(n){
            this.currentIndex = n;
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
        openModal(){
            if(!this.select||this.select.length<1){return this.$Message.error('请至少选择一项')}
            this.planInfo.order_product_id = this.select.join(',')
            this.downProduction({
                title:'下生产',
                type:2,
                params:this.planInfo,
                then:(e)=>{},
                cancel:(e)=>{},
            })
        },
    }
}
</script>

<style lang="scss" scoped>
.log-list{display: flex;flex-wrap:wrap;padding:10px 0;}
/deep/ .ivu-table-wrapper{overflow:visible;color:red;}//穿透iview
.page-edit{overflow: hidden;overflow-y: auto;position:relative;top:20px;height:80%;}
</style>