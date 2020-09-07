<template>
    <div>
        <Toptitle :title='type == 1 ? "新增物料" : (type == 2 ? "编辑物料" : "查看物料")'>
            <Button @click="back" style="margin-right:10px;">返回</Button>
            <Button v-if="type == 1 || type == 2" type="primary" @click="postData">保存</Button>
        </Toptitle>

        <Form inline>
            <FormItem label="ID">
                <Input v-model="info.id" disabled :placeholder="type == 1||type == 2 ? '自定生成': '12'"/>
            </FormItem>
            <FormItem  label="物料名称">
                <Input :disabled='type == 3 ? true : false' v-model="info.title"  placeholder="请输入物料名称"/>
            </FormItem>
            <FormItem label="物料分类">
                <Select style="width:186px;" v-model="info.m_id" :disabled='type == 3 ? true : false' placeholder="请选择材质">
                    <Option v-for="item of materialList" :key="item.id" :label="item.title" :value="item.id"></Option>
                </Select>
            </FormItem>
            <FormItem label="单价(元)">
                <Input :disabled='type == 3 ? true : false' v-model="info.price" placeholder="请输入金额"/>
            </FormItem>
            <FormItem label="长">
                <Input :disabled='type == 3 ? true : false' v-model="info.long" placeholder="请输入长度"/>
            </FormItem>
            <FormItem label="宽">
                <Input :disabled='type == 3 ? true : false' v-model="info.width" placeholder="请输入宽度"/>
            </FormItem>
            <FormItem label="厚">
                <Input :disabled='type == 3 ? true : false' v-model="info.high" placeholder="请输入厚度"/>
            </FormItem>
            <FormItem label="单位">
                <Input :disabled='type == 3 ? true : false' v-model="info.unit" placeholder="请输入单位"/>
            </FormItem>
            <FormItem label="库存">
                <Input :disabled='type == 3 ? true : false' v-model="info.stock" placeholder="请输入库存"/>
            </FormItem>
            <FormItem label="预警值">
                <Input :disabled='type == 3 ? true : false' v-model="info.warning_number" placeholder="请输入预警值"/>
            </FormItem>
            <FormItem label="损耗">
                <Input :disabled='type == 3 ? true : false' v-model="info.scale" placeholder="请输入百分比"/>
            </FormItem>
            <FormItem label="描述">
                <Input :disabled='type == 3 ? true : false' v-model="info.remark" placeholder="请输入描述"/>
            </FormItem>
        </Form>
        <Modal v-model="showKey" :width="1300" :mask-closable='false' :closable='false'>
            <div>
                 <KeyBoard @cancel='successKey' @success='successKey' class='key-co'/>
            </div>
            <div slot='footer'></div>
        </Modal>
    </div>
</template>

<script>
import Toptitle from '../../components/TopTitle/index'
import KeyBoard from '../../components/keyboard/index'
export default {
    data(){
        return {
            type:1,
            info:{},
            id:null,
            materialList:[],
            showKey:false,
        }
    },
    components:{KeyBoard},
    mounted(){
        this.type = this.$route.query.type;
        this.id = this.$route.query.id||''
        this.type == 1 ? this.info.m_id = this.$route.query.back_id*1: this.info.m_id;
        this.axios('/api/basics_material_index').then(res=>{
            this.materialList = res.data.data;
        })
        if(this.id){
            this.getData(this.id)
        } 
    },
    methods:{
        getData(id){
            this.axios('/api/material',{params:{id:id}}).then(res=>{
                let data = res.data.shift();
                this.info = data;
            })
        },
        postData(){
            this.info.op = this.type == 1 ? 'add' : 'edit'
            this.axios.post('/api/material',this.info).then(res=>{
                if(res.code == 200){
                    this.$Message.success(res.msg)
                    this.back()
                }
            })
        },
        back(){
            this.$router.go(-1)
        },
        successKey(str){
            this.info.formula = str;
            this.showKey = false;
        },
        popKeyBoard(){
            this.showKey = true;
        },
    }
}
</script>

<style lang="scss" scoped>

</style>