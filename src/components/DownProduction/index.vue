<template>
    <div>
        <Modal @on-visible-change="visibleModal" class-name="vertical-center-modal" :title='title' v-model="show" @on-ok="sendPlanInfo">
            <Form v-if="type == 1">
                <FormItem label="选择时间">
                    <div style="display:flex;">
                        <DatePicker v-model="planInfo.start_time" type="date" placeholder="开始时间"></DatePicker>
                        -
                        <DatePicker v-model="planInfo.end_time" type="date" placeholder="结束时间"></DatePicker>
                    </div>
                </FormItem>
            </Form>
            <div v-else style="width:100%;text-align:center;">
                确定下生产？
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
        }
    },
    methods:{
        sendPlanInfo(){
            try{
                this.planInfo.start_time = new Date(this.planInfo.start_time).toLocaleDateString().replace(/\//g,"-")
                this.planInfo.end_time = new Date(this.planInfo.end_time).toLocaleDateString().replace(/\//g,"-")
            }catch(e){

            }
            let url = this.type == 1 ? '/api/order_oa_people' : '/api/orders_plan'
            this.axios.post('/api/order_oa_people',this.planInfo).then(res=>{
                if(res.code == 200){
                    this.$Message.success(res.msg)
                    this.$emit('then')
                }
            })
        },
        visibleModal(e){
            if(!e){this.$emit('cancel')}
        }
    }
}
</script>