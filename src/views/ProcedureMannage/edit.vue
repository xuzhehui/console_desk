<template>
    <div>
         <Toptitle :title='type == 1 ? "新增工序" : "编辑工序" '>
            <Button @click="back" style="margin-right:10px;">返回</Button>
            <Button type="primary" @click="postData">保存</Button>
        </Toptitle>

        <div class="page-edit">
            <Form style="width:40%" >
                <FormItem label="ID">
                    <Input v-model="info.id" disabled placeholder="自动生成"></Input>
                </FormItem>
                <FormItem label="工序分类">
                    <Select v-model="info.p_id" placeholder="请选择分类">
                        <Option v-for="item of perSonnel" :key="item.id" :value="item.id" :label="item.title"></Option>
                    </Select>
                </FormItem>
                <FormItem  label="工序名称">
                    <Input v-model="info.title" placeholder="请输入工序分类名称"></Input>
                </FormItem>
                <FormItem label="工时">
                    <Input v-model="info.time" placeholder="请输入工时"></Input>
                </FormItem>
                <FormItem label="产能">
                    <Input v-model="info.capacity" placeholder="请输入产能"></Input>
                </FormItem>
                <FormItem label="工价">
                    <div style="display:flex;width:100%;">
                        <Select v-model="info.type" style="width:200px;margin-right:10px;">
                            <Option label="按天" :value='0'></Option>
                            <Option label="按件" :value='1'></Option>
                        </Select>
                        <Input v-model="info.wages" placeholder="请输入价格"></Input>
                    </div>
                    
                </FormItem>
            </Form>
        </div>

        <!-- <Form style="width:40%" >
            <FormItem label="ID">
                <Input v-model="info.id" disabled placeholder="自动生成"></Input>
            </FormItem>
            <FormItem label="工序分类">
                <Select v-model="info.p_id" placeholder="请选择分类">
                    <Option v-for="item of perSonnel" :key="item.id" :value="item.id" :label="item.title"></Option>
                </Select>
            </FormItem>
            <FormItem  label="工序名称">
                <Input v-model="info.title" placeholder="请输入工序分类名称"></Input>
            </FormItem>
            <FormItem label="工时">
                <Input v-model="info.time" placeholder="请输入工时"></Input>
            </FormItem>
            <FormItem label="产能">
                <Input v-model="info.capacity" placeholder="请输入产能"></Input>
            </FormItem>
            <FormItem label="工价">
                <div style="display:flex;width:100%;">
                    <Select v-model="info.type" style="width:200px;margin-right:10px;">
                        <Option label="按天" :value='0'></Option>
                        <Option label="按件" :value='1'></Option>
                    </Select>
                    <Input v-model="info.wages" placeholder="请输入价格"></Input>
                </div>
                
            </FormItem>
        </Form> -->
    </div>
</template>

<script>
export default {
    data(){
        return {
            type:1,
            id:null,
            perSonnel:[],
            info:{
                title:'',
                time:'',
                capacity:'',
                wages:'',
                type:0,
                p_id:'',
            },
        }
    },
    mounted(){
        this.type = this.$route.query.type;
        this.id = this.$route.query.id;
        if(this.id&&this.type == 2){
            this.getDetails(this.id)
        }
        this.getData()
    },
    methods:{
        back(){
            this.$router.go(-1)
        },
        postData(){//保存时提交info
            let postUrl = this.type == 1 ? '/api/procedure_add' : '/api/procedure_edit';
            this.info.id = this.type == 1 ? this.id : this.info.id;
            this.axios.post(postUrl,this.info).then(res=>{
                if(res.code == 200){
                    this.$Message.success(res.msg)
                    this.back()
                }
            })
             
        },
        getData(row){
            this.axios('/api/basics_procedure_index').then(res=>{
                this.perSonnel = res.data.data;
            })
        },
        getDetails(row){
            this.axios('/api/procedure_detail',{params:{id:row}}).then(res=>{
                this.info = res.data[0];
            })
        },
    }
}
</script>

<style lang="scss" scoped>
.page-edit{overflow: hidden;overflow-y: auto;position:relative;top:20px;height:85%;padding-bottom: 20px;;}
</style>