<template>
    <div>
        <Toptitle title='新增零部件'>
            <Button @click="postData(0)" style="margin-right:10px;">返回</Button>
            <Button @click="postData(1)">保存</Button>
        </Toptitle>

        <Form inline>
            <FormItem label="零部件ID">
                <Input disabled placeholder="自动生成"></Input>
            </FormItem>

            <FormItem label="物料名称">
                <Select v-model="info.title" style="width:186px">
                    <Option v-for="item of partsData" :key="item.id" :value='item.id' :label="item.title"></Option>
                </Select>
            </FormItem>

            <FormItem label="数量">
                <Input v-model="info.number" placeholder="请输入数量"></Input>
            </FormItem>
            <FormItem label="单位">
                <Input v-model="info.company" placeholder="请输入单位"></Input>
            </FormItem>
            <FormItem label="长(L)">
                <Input v-model="info.long" @on-focus="popKeyBoard(1)" placeholder="请输入公式(自动唤出软键盘)"></Input>
            </FormItem>
            <FormItem label="宽(W)">
                <Input v-model="info.wide" @on-focus="popKeyBoard(2)" placeholder="请输入公式(自动唤出软键盘)"></Input>
            </FormItem>
            <FormItem label="厚(H)">
                <Input v-model="info.thick" @on-focus="popKeyBoard(3)" placeholder="请输入公式(自动唤出软键盘)"></Input>
            </FormItem>
            <FormItem label="工艺要求">
                <Input v-model="info.requirement" placeholder="请输入工艺要求"></Input>
            </FormItem>
            <FormItem label="标签">
                <Select style="width:186px;" v-model="info.label">
                    <Option :value="0" label="是"></Option>
                    <Option :value="1" label="否"></Option>
                </Select>
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
export default {
    data(){
        return {
            info:{
                title:'',
                company:'',
                number:'',
                long:'',
                wide:'',
                thick:'',
                requirement:'',
                label:null,
            },
            showKey:false,
            logo:1,
            id:null,
            currentData:null,
            partsData:[],
        }
    },
    mounted(){
        this.type = this.$route.params.type;
        this.id = this.$route.params.id;
        this.getPartsData()
    },
    methods:{
        postData(flag){
            flag == 1 ? this.$route.params.tableData.push(this.info) : ''
            this.$router.push({
                name:'PartsManageHomeEdit',
                params:{
                    info:this.$route.params.info,
                    id:this.id,
                    type:this.type,
                    tableData:this.$route.params.tableData
                }
            })
        },
        successKey(str){
            this.logo == 1 ? this.info.long = str : (this.logo == 2 ? this.info.wide = str : this.info.thick = str)
            this.showKey = false;
        },
        cancelKey(str){
            this.logo == 1 ? this.info.long = str : (this.logo == 2 ? this.info.wide = str : this.info.thick = str)
            this.showKey = false;
        },
        popKeyBoard(n){
            this.logo = n;
            this.showKey = true;
        },
        getPartsData(){
            this.axios('/api/material').then(res=>this.partsData = res.data.data)
        }
    },
    components:{
        KeyBoard,
    }
}
</script>

<style lang="scss" scoped>
.edit-table-log{display: flex;justify-content: space-between;align-items: center;padding-bottom:10px;
    .footer-log{color:#666666}
}
</style>