<template>
    <div>
        <Toptitle :title='type == 1 ? "新增部件" : (type == 2 ? "编辑部件" : "查看部件") '>
            <Button @click="back" style="margin-right:10px;">返回</Button>
            <Button v-if="type == 1 || type == 2" type="primary" @click="postData">保存</Button>
        </Toptitle>

        <div class="page-edit">
            <Form style="width:30%">
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
                <FormItem label="单位">
                    <Input v-model="info.company" placeholder="请输入单位"></Input>
                </FormItem>
            </Form>
            <div class="edit-table-log">
                <div>
                    <span>零部件添加：</span>
                    <Button size='small' @click="addNewsPart" type="primary" ghost>新增零部件</Button>
                </div>
                <span class="footer-log">备注:适用于 ＋(加)  -(减)   ×(乘)  ÷(除)不输入就是不设定公式，支持单项输入)</span>
            </div>
            <Table stripe border :columns="tableColums" :data="tableData">
                <template slot-scope="{index}" slot="set">
                    <a style="color:red;" @click="delItems(tableData,index)">删除</a>
                </template>
            </Table>
        </div>
    </div>
</template>

<script>
import {mapState,mapMutations} from 'vuex'
export default {
    data(){
        return {
            type:1,
            id:null,
            info:{
                company:'',
                p_id:'',
                label:null,
                bp_id:null,
                title:'',
            },
            partList:[],
            tableColums:[
                {title:'零部件名称',align:'center',key:'title'},
                {title:'数量',align:'center',key:'number'},
                {title:'单位',align:'center',key:'company'},
                {title:'长',align:'center',key:'long'},
                {title:'宽',align:'center',key:'wide'},
                {title:'厚',align:'center',key:'thick'},
                {title:'工艺要求',align:'center',key:'requirement'},
                {title:'标签',align:'center',key:'label'},
            ],
            tableData:[],
            product_list:[],
            list:[
                {
                    info:[
                        {
                            title:'123',
                            name:'Input',
                            serverName:'title',
                            placeholder:'请输入',
                            value:'123'
                        },
                        {
                            title:'标签',
                            name:'Select',
                            serverName:'label',
                            option:[
                                {
                                    label:'test1',
                                    value:1
                                },
                            ]
                        }
                    ]
                },
                
            ],
        }
    },
    
    mounted(){
        this.getParoducts()
        this.type = this.$route.query.type||this.$route.params.type;
        this.id = this.$route.query.id||this.$route.params.id;
        if(this.id){
            this.getDetails(this.id)
        }
        this.getParts()
        if(this.$route.params.info){
           this.info = this.$route.params.info
        }
        if(this.$route.params.tableData){
            this.tableData = this.$route.params.tableData
        }
        if(this.pageEditData){
            this.tableData = this.tableData.concat(this.pageEditData);
            this.clearPageEditData()
        }
    },
    computed:{
        ...mapState(['pageEditData'])
    },
    methods:{
        ...mapMutations(['clearPageEditData']),
        back(){
            this.$router.push({
                name:'PartsManageHome'
            })
        },
        getParts(){
            this.axios('/api/basics_parts_index').then(res=>{
                this.partList = res.data.data;
            })
        },
        postData(){
            let postInfo = JSON.parse(JSON.stringify(this.info)),sendData = {top:{}};
            sendData.op = this.type == 1 ? 'add' : 'edit';
            for(let i in postInfo){
                i == 'detail' ? sendData.detail = postInfo['detail'] : sendData.top[i] = postInfo[i]
            }
            sendData.detail = this.tableData;
            this.axios.post('/api/parts_save',sendData).then(res=>{
                if(res.code == 200){
                    this.$Message.success(res.msg)
                    this.back()
                }
            })
        },
        getDetails(id){
            this.axios('/api/parts_detail',{params:{id:id}}).then(res=>{
                this.info = res.data;
                this.tableData = res.data.detail;
                this.$route.params.info ? this.tableData.push(this.$route.params.info) : ''
            })
        },
        // addNewsPart(){
        //     this.$router.push({
        //         name:'PartsManageHomeAddParts',
        //         params:{
        //             id:this.id,
        //             type:this.type,
        //             info:this.info,
        //             tableData:this.tableData
        //         }
        //     })
        // },
        addNewsPart(){
            this.$router.push({
                name:'PageEdit',
                params:{
                    type:this.type,
                    list:this.list,
                    title:'122313'
                }
            })
        },
        delItems(row,n){
            row.splice(n,1)
        },
        getParoducts(){
            this.axios('/api/product_list').then(res=>{
                this.product_list = res.data.data;
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.edit-table-log{display: flex;justify-content: space-between;align-items: center;padding-bottom:10px;
    .footer-log{color:#666666}
}
.page-edit{overflow: hidden;overflow-y: auto;position:relative;top:20px;height:80%;}
</style>