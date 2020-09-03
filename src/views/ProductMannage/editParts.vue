<template>
    <div>
        <Toptitle :title='type == 1 ? "新增部件" : "编辑部件"'>
            <Button @click="back" style="margin-right:10px;">返回</Button>
            <Button type="primary" @click="postData">保存</Button>
        </Toptitle>

        <Form inline>
            <FormItem label="部件名称">
                <Select @on-change='changeSelect' :label-in-value="true" v-model="info.part_id" style="width:186px;">
                    <Option v-for="item of partsList" :key="item.id" :value="item.id" :label="item.title"></Option>
                </Select>
            </FormItem>
            <FormItem label="长(L)">
                <Input @on-focus="popKeyBoard(1)" v-model="info.formula_l" placeholder="请输入公式(自动唤出软键盘)"></Input>
            </FormItem>
            <FormItem label="宽(W)">
                <Input @on-focus="popKeyBoard(2)" v-model="info.formula_w" placeholder="请输入公式(自动唤出软键盘)"></Input>
            </FormItem>
            <FormItem   label="高(H)">
                <Input @on-focus="popKeyBoard(3)" v-model="info.formula_h" placeholder="请输入公式(自动唤出软键盘)"></Input>
            </FormItem>
            <FormItem label="产值比例(%)">
                <Input v-model="info.ratio" placeholder="请输入产值比例"></Input>
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
import KeyBoard from '../../components/keyboard/index'
import {mapState,mapMutations} from 'vuex'
export default {
    data(){
        return {
            type:1,
            id:null,
            partsList:[],
            info:{
                title:'',
                part_id:'',
                formula_l:'',
                formula_w:'',
                formula_h:'',
                ratio:''
            },
            showKey:false,
            key_board_value:'',
            netWork:'',
            logo:1,
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
                this.partsList = res.data.data
            })
        },
        postData(){
            this.$route.params.info.part.push(this.info)
            this.$router.push({
                name:'ProductsEdit',
                params:{
                    info:this.$route.params.info, 
                    type:this.$route.params.type,
                    id:this.$route.params.id,
                    title:this.$route.params.title,
                    back_id:this.$route.params.back_id,
                }
            })
        },
        successKey(str){
            this.logo == 1 ? this.info.formula_l = str : (this.logo == 2 ? this.info.formula_w = str : this.info.formula_h = str)
            this.showKey = false;
        },
        cancelKey(str){
            this.logo == 1 ? this.info.formula_l = str : (this.logo == 2 ? this.info.formula_w = str : this.info.formula_h = str)
            this.showKey = false;
        },
        tapKey(e){
            this.netWork = e;
        },
        popKeyBoard(n){
            this.logo = n;
            this.showKey = true;
        },
        changeSelect(e){
            this.info.title = e.label
        }
        
    },
    components:{KeyBoard}
}
</script>

<style lang="scss" scoped>
</style>