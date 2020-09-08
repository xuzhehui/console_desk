<template>
    <div>
        <Toptitle title='新增零部件'>
            <Button @click="postData(0)" style="margin-right:10px;">返回</Button>
            <Button @click="postData(1)">保存</Button>
        </Toptitle>

        <!-- <Form inline>

            <FormItem label="物料名称">
                <Select label-in-value @on-change="changeOriginal($event)" v-model="info.id" style="width:186px">
                    <Option v-for="item of partsData" :tag='item.high' :data-title='item.title' :key="item.id" :value='item.id' :label="item.title"></Option>
                </Select>
            </FormItem>

            <FormItem label="数量">
                <Input v-model="info.number" placeholder="请输入数量"></Input>
            </FormItem>
            <FormItem label="单位">
                <Input v-model="info.company" placeholder="请输入单位"></Input>
            </FormItem>
            <FormItem label="长(L)">
                <Input v-model="info.long" placeholder="请输入长度"></Input>
            </FormItem>
            <FormItem label="宽(W)">
                <Input v-model="info.wide" placeholder="请输入宽度"></Input>
            </FormItem>
            <FormItem label="厚(H)">
                <Input disabled v-model="info.thick"  placeholder="请输入厚度"></Input>
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
        </Form> -->
        <div class="page-edit">
            <Generaladd :list='list'></Generaladd>
        </div>
        
    </div>
</template>

<script>
export default {
    data(){
        return {
            info:{
                id:'',
                title:'',
                company:'',
                number:'',
                long:'',
                wide:'',
                thick:'',
                requirement:'',
                label:null,
            },
            id:null,
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
        getPartsData(){
            this.axios('/api/material').then(res=>this.partsData = res.data.data)
        },
        changeOriginal(e){
            this.info.thick = e.tag
            let s = window.event;
            this.info.title = s.target.dataset.title;
        }
    },
}
</script>

<style lang="scss" scoped>
.edit-table-log{display: flex;justify-content: space-between;align-items: center;padding-bottom:10px;
    .footer-log{color:#666666}
}
</style>