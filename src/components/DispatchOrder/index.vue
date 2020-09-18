<template>
    <div>
        <Modal width='400' class-name="vertical-center-modal" title="派工单" v-model="show" @on-ok="sendDispatchInfo">
            <Form :label-width="85">
                <FormItem label="产品">
                    <Select v-model="dispatchInfo.product_id">
                        <Option v-for="(item,index) of info.product" :key="index" :value="item.id" :label="item.title"></Option>
                    </Select>
                </FormItem>
                <FormItem label="部件">
                    <Select v-model="dispatchInfo.part_id">
                        <Option v-for="(item,index) of info.part" :key="index" :value="item.id" :label="item.title"></Option>
                    </Select>
                </FormItem>
                <FormItem label="工序">
                    <Select v-model="dispatchInfo.procedure_id">
                        <Option v-for="(item,index) of info.produce" :key="index" :value="item.id" :label="item.title"></Option>
                    </Select>
                </FormItem>

                <FormItem label="选择工人">
                    <Select v-model="dispatchInfo.user_id">
                        <Option v-for="item of users" :key="item.id" :value="item.id" :label="item.nickname"></Option>
                    </Select>
                </FormItem>

                <FormItem label="选择时间">
                    <div style="display:flex;">
                        <DatePicker v-model="dispatchInfo.start_time" type="date" placeholder="开始时间"></DatePicker>
                        -
                        <DatePicker v-model="dispatchInfo.end_time" type="date" placeholder="结束时间"></DatePicker>
                    </div>
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
            params:{},
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
            try{
                this.dispatchInfo.start_time = new Date(this.dispatchInfo.start_time).toLocaleDateString().replace(/\//g,"-")
                this.dispatchInfo.end_time = new Date(this.dispatchInfo.end_time).toLocaleDateString().replace(/\//g,"-")
            }catch(e){}
            this.axios.post('/api/orders_plan_dispatch',this.dispatchInfo).then(res=>{
                if(res.code == 200){
                    this.$Message.success(res.msg)
                }
            })
        },
    }
}
</script>