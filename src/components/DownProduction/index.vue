<template>
    <div>
        <Modal width='350' @on-visible-change="visibleModal" class-name="vertical-center-modal" :title='title' v-model="show">
            <Form v-if="type == 1" ref='forms' :model="forms" :rules='rules'>
                <FormItem label="选择时间" prop='time'>
                    <DatePicker v-model="forms.time" clearable type="daterange" split-panels placeholder="请选择日期"></DatePicker>
                </FormItem>
            </Form>
            <div v-else style="width:100%;text-align:center;">
                确定下生产？
            </div>

            <div slot="footer" class="modal-footer">
                <Button @click="closeModal">取消</Button>
                <Button @click="sendPlanInfo" type='primary'>确认</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
export default {
    data(){
        return {
            show:false,
            title:'下生产',
            planInfo:{},
            forms:{
                time:[]
            },
            rules:{
                time:[{required: true,message:'请选择时间',}]
            }
        }
    },
    methods:{
        sendPlanInfo(){
            if(this.type == 1 && !this.forms.time[0]){
                return this.$Message.error('请选择起始时间')
            }
            if(this.forms.time.length>0){
                this.planInfo.start_time = new Date(this.forms.time[0]).toLocaleDateString().replace(/\//g,"-")
                this.planInfo.end_time = new Date(this.forms.time[1]).toLocaleDateString().replace(/\//g,"-")
            }
            let url = this.type == 1 ? '/api/orders_plan' : '/api/order_oa_people'
            this.axios.post(url,this.planInfo).then(res=>{
                if(res.code == 200){
                    this.$Message.success(res.msg)
                    this.show = false
                    this.$emit('then')
                }
            })
        },
        closeModal(e){
            this.show =false;
            this.$emit('cancel')
        },
        visibleModal(e){
            if(!e){this.$emit('cancel')}
        }
    }
}
</script>