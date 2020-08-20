<template>
    <div>
        <Toptitle :title='type == 1 ? "新增部件" : (type == 2 ? "编辑部件" : "查看部件") '>
            <Button @click="back" style="margin-right:10px;">返回</Button>
            <Button v-if="type == 1 || type == 2" type="primary" @click="postData">保存</Button>
        </Toptitle>

        <Form style="width:50%">
            <FormItem label="部件分类名称">
                <Select v-model="info.p_id">
                    <Option v-for="item of partList" :key="item.id" :value="item.id" :label="item.title"></Option>
                </Select>
            </FormItem>
            <FormItem label="标签">
                <RadioGroup v-model="info.label" style="width:100%;">
                    <Radio :label="0">是</Radio>
                    <Radio :label="1">否</Radio>
                </RadioGroup>
            </FormItem>
            <FormItem label="部件名称">
                <Input v-model="info.title"></Input>
            </FormItem>

            <FormItem label="关联产品">
                <div style="width:100%;display:flex;">
                    <Select style="width:50%"></Select>
                    ~
                    <Select style="width:50%"></Select>
                </div>
                <span>该产品测量属性为：L W H</span>
                
            </FormItem>

             <FormItem label="单位">
                <Input v-model="info.company" placeholder="请输入单位"></Input>
            </FormItem>
        </Form>

        <div class="edit-table-log">
            <div>
                <span>零部件添加：</span>
                <Button @click="addNewsPart" type="primary" ghost>新增零部件</Button>
            </div>
            <span class="footer-log">备注:适用于 ＋(加)  -(减)   ×(乘)  ÷(除)不输入就是不设定公式，支持单项输入)</span>
        </div>

        <Table stripe border :columns="tableColums" :data="tableData">
            <template slot-scope="{ row }" slot="set">
                <a style="color:red;">删除</a>
            </template>
        </Table>
    </div>
</template>

<script>
import Toptitle from '../../components/TopTitle/index'
export default {
    data(){
        return {
            type:1,
            id:null,
            info:{
                company:''
            },
            partList:[],
            tableColums:[
                {title:'零部件ID',align:'center',key:'id'},
                {title:'零部件名称',align:'center',key:'title'},
                {title:'数量',align:'center',key:'number'},
                {title:'单位',align:'center',key:'company'},
                {title:'长',align:'center',key:'long'},
                {title:'宽',align:'center',key:'wide'},
                {title:'厚',align:'center',key:'thick'},
                {title:'工艺要求',align:'center',key:'requirement'},
                {title:'标签',align:'center',key:''},
                {title:'操作',align:'center',slot:'set'},
            ],
            tableData:[]
        }
    },
    mounted(){
        this.type = this.$route.query.type;
        this.id = this.$route.query.id;
        if(this.id){
            this.getDetails(this.id)
        }
        this.getParts()
    },
    methods:{
        back(){
            this.$router.go(-1)
        },
        getParts(){
            this.axios('/api/basics_parts_index').then(res=>{
                this.partList = res.data;
            })
        },
        postData(){

        },
        getDetails(id){
            this.axios('/api/parts_detail',{params:{id:id}}).then(res=>{
                console.log(res)
                this.info = res.data;
                this.tableData = res.data.detail;
            })
        },
        addNewsPart(){
            this.$router.push({
                path:'/cms/partsmannage/addparts',
                query:{}
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.edit-table-log{display: flex;justify-content: space-between;align-items: center;padding-bottom:10px;
    .footer-log{color:#666666}
}
</style>