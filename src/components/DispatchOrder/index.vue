<template>
    <div>
        <Modal width='400' class-name="vertical-center-modal" title="派工单" v-model="show" @on-ok="sendDispatchInfo">
            <Form :label-width="85" ref='forms' :model="dispatchInfo" :rules='rules'>
                <FormItem label="产品" prop='product_id'>
                    <Select v-model="dispatchInfo.product_id">
                        <Option v-for="(item,index) of info.product" :key="index" :value="item.id" :label="item.title"></Option>
                    </Select>
                </FormItem>
                <FormItem label="部件" prop='part_id'>
                    <Select v-model="dispatchInfo.part_id">
                        <Option v-for="(item,index) of info.part" :key="index" :value="item.id" :label="item.title"></Option>
                    </Select>
                </FormItem>
                <FormItem label="工序" prop='procedure_id'>
                    <Select v-model="dispatchInfo.procedure_id">
                        <Option v-for="(item,index) of info.produce" :key="index" :value="item.id" :label="item.title"></Option>
                    </Select>
                </FormItem>

                <FormItem label="选择工人" prop='user_id'>
                    <Select v-model="dispatchInfo.user_id">
                        <Option v-for="item of users" :key="item.id" :value="item.id" :label="item.nickname"></Option>
                    </Select>
                </FormItem>

                <FormItem label="选择时间">
                    <DatePicker style="width:100%;" v-model="time" clearable type="daterange" split-panels placeholder="请选择日期"></DatePicker>
                </FormItem>

                <FormItem label="点工单形式">
                    <RadioGroup v-model="dispatchInfo.work_type">
                        <Radio :label="1">是</Radio>
                        <Radio :label="0">否</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem label="日薪" v-if="dispatchInfo.work_type == 1">
                    <Input v-model="dispatchInfo.user_salary">
                        <span slot="append">元</span>
                    </Input>
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
            users:[],
            dispatchInfo:{
                user_id:'',//工人
                work_type:0,
                start_time:'',//开始时间
                end_time:'',//结束时间
                user_salary:'',//日薪
                part_id:'',
                procedure_id:'',
                product_id:'',
            },
            info:{},
            show:false,
            params:{},
            time:[],
            rules:{
                user_id:[{required: true,message:'请选择工人',}],
                part_id:[{required: true,message:'请选择部件',}],
                product_id:[{required: true,message:'请选择产品',}],
                procedure_id:[{required: true,message:'请选择工序',}]
            }
        }
    },
    created(){
        this.axios('/api/user').then(res=>this.users = res.data.data)
        this.axios('/api/orders_plan_get_list',{params:this.params}).then(res=>{
            if(res.code == 200){
                this.info = res.data;
            } 
        })
    },
    methods:{
        sendDispatchInfo(){
            if(!this.time[0]){
                return this.$Message.error('请选择起始时间')
            }
            if(this.time.length>0){
                this.dispatchInfo.start_time = new Date(this.time[0]).toLocaleDateString().replace(/\//g,"-")
                this.dispatchInfo.end_time = new Date(this.time[1]).toLocaleDateString().replace(/\//g,"-")
            }
            this.axios.post('/api/orders_plan_dispatch',this.dispatchInfo).then(res=>{
                if(res.code == 200){
                    this.$Message.success(res.msg)
                    this.show = false;
                    this.$emit('then')
                }
            })
        },
        handleSubmit(name) {
            this.$refs[name].validate((valid) => {
                if(valid){
                    this.sendDispatchInfo()
                }
            })
        },
        closeModal(e){
            this.show =false;
            this.$emit('cancel')
        },
    }
}
</script>