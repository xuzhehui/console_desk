<template>
    <div>
        <Modal @on-visible-change="visibleModal" class-name="vertical-center-modal" title='下测量' v-model="show" @on-ok="lowerMeter(postInfo)">
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
</template>
<script>
export default {
    data(){
        return {
            postInfo:{},
            users:[],
            show:false,
        }
    },
    created(){
        this.axios('/api/user').then(res=>this.users = res.data.data)
    },
    methods:{
        lowerMeter(postData){
            try{
                postData.start_time = new Date(postData.start_time).toLocaleDateString().replace(/\//g,"-")
                postData.end_time = new Date(postData.end_time).toLocaleDateString().replace(/\//g,"-")
            }catch(e){}
            this.axios.post('/api/orders_set_measure',postData).then(res=>{
                if(res.code == 200){
                    this.$Message.success(res.msg)
                    this.$emit('then')
                }
            })
        },
        visibleModal(e){
            if(!e){
                this.$emit('cancel')
            }
        },
    }
}
</script>