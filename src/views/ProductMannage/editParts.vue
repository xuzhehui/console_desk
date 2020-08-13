<template>
    <div>
        <Toptitle :title='type == 1 ? "新增部件" : "编辑部件"'>
            <Button @click="back" style="margin-right:10px;">返回</Button>
            <Button type="primary" @click="postData">保存</Button>
        </Toptitle>

        <Form inline>
            <FormItem label="部件名称">
                <Select v-model="info.part_id" style="width:186px;">
                    <Option v-for="item of partsList" :key="item.id" :value="item.id" :label="item.title"></Option>
                </Select>
            </FormItem>
            <FormItem label="长(L)">
                <Input v-model="info.formula_l" placeholder="请输入公式(自动唤出软键盘)"></Input>
            </FormItem>
            <FormItem label="宽(W)">
                <Input v-model="info.formula_w" placeholder="请输入公式(自动唤出软键盘)"></Input>
            </FormItem>
            <FormItem   label="高(H)">
                <Input v-model="info.formula_h" placeholder="请输入公式(自动唤出软键盘)"></Input>
            </FormItem>
            <FormItem label="产值比例(%)">
                <Input v-model="info.ratio" placeholder="请输入产值比例"></Input>
            </FormItem>
        </Form>

        <KeyBoard @click="tapKey"/>
    </div>
</template>

<script>
import KeyBoard from '../../components/keyboard/index'
export default {
    data(){
        return {
            type:1,
            id:null,
            partsList:[],
            info:{
                part_id:'',
                formula_l:'',
                formula_w:'',
                formula_h:'',
                ratio:''
            }
        }
    },
    mounted(){
        this.getPartsData()
    },
    methods:{
        back(){
            this.$router.go(-1)
        },
        getPartsData(row){
            this.axios('/api/parts_index').then(res=>{
                this.partsList = res.data
            })
        },
        postData(){

        },
        tapKey(e){
            console.log(e)
        }
    },
    components:{KeyBoard}
}
</script>

<style lang="scss" scoped>
    
</style>