<template>
    <div>
        <Toptitle title='审批详情'>
            <Button  @click="back"  style="margin-right:10px;">返回</Button>
            <Button @click="showModal = true" type="error" style="margin-right:10px;" ghost>驳回审批</Button>
            <Button type="success" @click="approved" ghost>通过审批</Button>
        </Toptitle>

        <div class="page-edit">
            <div style="padding:20px 0;">
                <Steps :current="current">
                    <Step v-for="item of examMineData.orders_oa" :key="item.id" 
                    :title="item.title"></Step>
                </Steps>
            </div>

            <div class="table-zou">
                <span>基本信息</span>
                <div>
                    <table border="0" cellspacing='1' cellpadding="0">
                        <th style="width:10%;background:#F4F8FF">
                            <tr>订单号</tr>
                            <tr>订单类型</tr>
                            <tr>项目金额</tr>
                            <tr>开始时间</tr>
                            <tr>交付时间</tr>
                        </th>
                        <th style="width:40%">
                            <tr>{{examMineData.order_no}}</tr>
                            <tr>工装</tr>
                            <tr>{{examMineData.predict_price}}</tr>
                            <tr>{{func.replaceDate(examMineData.crt_time)}}</tr>
                            <tr>{{func.replaceDate(examMineData.upt_time)}}</tr>
                        </th>
                        <th style="width:10%;background:#F4F8FF">
                            <tr>客户</tr>
                            <tr>手机号</tr>
                            <tr>业务员</tr>
                            <tr>是否收费</tr>
                            <tr>预估项目工期</tr>
                        </th>
                        <th>
                            <tr>{{examMineData.client_name}}</tr>
                            <tr>{{examMineData.mobile}}</tr>
                            <tr>{{examMineData.nickname}}</tr>
                            <tr>{{examMineData.pay_state == 1 ? '是' : '否'}}</tr>
                            <tr>{{examMineData.predict_time}}天</tr>
                        </th>
                    </table>
                </div>
            </div>

            <div class="table-zou">
                <span>审批信息</span>
                <div>
                    <table border="0" cellspacing='1' cellpadding="0">
                        <th style="width:10%;background:#F4F8FF">
                            <tr>提交人员</tr>
                            <tr v-for="item of left_table" :key="item.id">{{item.title}}</tr>
                            <tr>审批状态</tr>
                        </th>
                        <th style="width:40%;">
                            <tr>D19140</tr>
                            <tr v-for="item of left_table" :key="item.id">{{item.title}}</tr>
                            <tr>2020-8-20</tr>
                        </th>
                        <th style="width:10%;background:#F4F8FF">
                            <tr>提交时间</tr>
                            <tr v-for="item of right_table" :key="item.id">{{item.title}}</tr>
                            <tr>通知他人</tr>
                        </th>
                        <th>
                            <tr>{{func.replaceDate(examMineData.crt_time)}}</tr>
                            <tr v-for="item of right_table" :key="item.id">{{item.title}}</tr>
                            <tr>否</tr>
                        </th>
                    </table>
                </div>
            </div>

            <div class="time-line">
                <span>订单状态</span>
                <div class="time-ling-box">
                    <Timeline>
                        <TimelineItem :color='index == 0 ? "#2d8cf0" : "#c5c8ce" ' v-for="(item,index) of reverseArray" :key=item.id>
                            <p class="time">{{item.time}}</p>
                            <div class="content">
                                <div>
                                    <div>审批人：{{item.approve_user||'暂无数据'}}</div>
                                    <div>审批流程：{{item.content||'暂无数据'}}</div>
                                    <div>订单号：{{item.order_no}}</div>
                                    <div>用时：{{item.time||'暂无数据'}}</div>
                                </div>
                            </div>
                        </TimelineItem>
                    </Timeline>
                </div>
            </div>
        </div>

        <Modal title='审批驳回' v-model="showModal" class-name="vertical-center-modal" @on-ok="rejectApprove">
            <div class="cancelModal">
                <span>驳回原因：</span>
                <Input v-model="remark" clearable type="textarea" :autosize="true" placeholder="请输入驳回原因" />
            </div>
        </Modal>
        
    </div>
</template>

<script>
export default {
    data(){
        return {
            current:0,
            id:null,
            examMineData:{},
            left_table:[],
            right_table:[],
            reverseArray:[],
            showModal:false,
            remark:'',
        }
    },
    mounted(){
        if(this.$route.query.id){
            this.id = this.$route.query.id
            this.getDetails(this.id)
        }
    },
    methods:{
        back(){
            this.$router.go(-1)
        },
        getDetails(id){
            this.axios('/api/order_oa_list',{params:{id:id}}).then(res=>{
                let copyData = JSON.parse(JSON.stringify(res.data))
                res.data.orders_oa.map((v,i)=>{
                    if((i+1)%2){
                        v.title = `${i+1}级审批`
                        this.left_table.push(v)
                    }else{
                        v.title = `${i+1}级审批`
                        this.right_table.push(v)
                    }
                })
                console.log(res.data.orders_oa)
                res.data.orders_oa.unshift({title:'提交审批'})
                res.data.orders_oa.push({title:'审批完成'})
                this.examMineData = res.data;
                this.current = this.examMineData.orders_oa.length-2||0;
                this.reverseArray = copyData.orders_oa.reverse();
                this.reverseArray.map(v=>{
                    v.time = this.func.replaceDate(v.upt_time)
                })
            })
        },
        postData(state){//state(1:通过|2:驳回)
            let params = {id:this.examMineData.id,state:state}
            state == 2 ? params.remark = this.remark : '';
            this.axios.post('/api/order_oa_approve',params).then(res=>{
                if(res.code == 200){
                    this.$Message.success(res.msg||'无提示')
                    this.back()
                }
            })
        },
        approved(){
            this.confirmDelete({
                content:'是否通过此订单审核？',
                title:'审批通过',
                type:'primary',
                then:()=>{
                    this.postData(1)
                },
                cancel:()=>{}
            })
        },
        rejectApprove(){
            this.postData(2)
        }
    }
}
</script>

<style lang="scss" scoped>
table { border-collapse: collapse;text-align:center;width:100%;border:1px solid #DEDEDE;
    th{border-right:1px solid #DEDEDE;
        tr{display: flex;flex-direction:column;border-bottom:1px solid #DEDEDE;padding:10px;align-items:center;
            &:last-child{border-bottom: none;}
        }
    }
}
.table-zou{padding: 10px 0;
    div{padding:10px 0;}
}
.page-edit{overflow: hidden;overflow-y: auto;position:relative;top:20px;height:85%;}
.time-line{
    .time-ling-box{padding:10px 0;}
}
.time{padding:0 10px;font-size: 16px;color:#333;padding-bottom:10px;}
.content{padding:10px;background:#F4F5F7;border-radius:5px;}
.vertical-center-modal{display: flex;align-items: center;justify-content: center;
    .ivu-modal{top: 0;}
}
</style>