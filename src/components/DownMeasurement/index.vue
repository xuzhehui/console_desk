<template>
    <div>
        <Modal width='350' @on-visible-change="visibleModal" class-name="vertical-center-modal" title='下测量' v-model="show">
            <Form inline :label-width="100" ref='forms' :model="postInfo" :rules='rules'>
                <FormItem label="测量人员" prop='user_id'>
                    <Select v-model="postInfo.user_id" style="width:208px;">
                        <Option v-for="item of users" :key="item.id" :label="item.nickname" :value="item.id"></Option>
                    </Select>
                </FormItem>

                <FormItem label="选择时间">
                        <DatePicker v-model="time" clearable type="daterange" split-panels placeholder="请选择日期"></DatePicker>
                </FormItem>
            </Form>

            <div slot="footer" class="modal-footer">
                <Button @click="closeModal">取消</Button>
                <Button @click="handleSubmit('forms')" type='primary'>确认</Button>
            </div>
        </Modal>
    </div>
</template>
<script>
export default {
    data(){
        return {
            postInfo:{
                user_id:'',
            },
            users:[],
            show:false,
            time:[],
            rules:{
                user_id:[{required: true,message:'请选择人员',}]
            }
        }
    },
    created(){
        this.axios('/api/user').then(res=>this.users = res.data.data)
    },
    methods:{
        lowerMeter(postData){
            if(!this.time[0]){
                return this.$Message.error('请选择起始时间')
            }
            if(this.time.length>0){
                postData.start_time = new Date(this.time[0]).toLocaleDateString().replace(/\//g,"-")
                postData.end_time = new Date(this.time[1]).toLocaleDateString().replace(/\//g,"-")
            }
            this.axios.post('/api/orders_set_measure',this.postInfo).then(res=>{
                if(res.code == 200){
                    this.$Message.success(res.msg)
                    this.show = false;
                    this.$emit('then')
                }
            })
        },
        visibleModal(e){
            if(!e){
                this.$emit('cancel')
            }
        },
        closeModal(e){
            this.show =false;
            this.$emit('cancel')
        },
        handleSubmit(name) {
            this.$refs[name].validate((valid) => {
                if(valid){
                    this.lowerMeter(this.postInfo)
                }
            })
        },
    }
}
</script>