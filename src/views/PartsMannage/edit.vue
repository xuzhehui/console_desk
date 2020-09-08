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
                    <Button size='small' @click="addZeroPart" type="primary" ghost>新增零部件</Button>
                </div>
                <span class="footer-log">备注:适用于 ＋(加)  -(减)   ×(乘)  ÷(除)不输入就是不设定公式，支持单项输入)</span>
            </div>
            <Table stripe border :columns="tableColums" :data="tableData">
                <template slot-scope="{index}" slot="title">
                    <div>
                        <Select label-in-value @on-change="changeSe($event,index)" v-model="tableData[index].id">
                            <Option :tag='item.high' v-for="item of zeroParts" :key="item.id" :value='item.id' :label="item.title"></Option>
                        </Select>
                    </div>
                </template>
                <template slot-scope="{index}" slot="number">
                    <Input placeholder="请输入数量" v-model="tableData[index].number"/>
                </template>
                <template slot-scope="{index}" slot="company">
                    <Input placeholder="请输入单位" v-model="tableData[index].company"/>
                </template>
                <template slot-scope="{index}" slot="long">
                    <Input placeholder="请输入长度" v-model="tableData[index].long"/>
                </template>
                <template slot-scope="{index}" slot="wide">
                    <Input placeholder="请输入宽度" v-model="tableData[index].wide"/>
                </template>
                <template slot-scope="{index}" slot="thick">
                    <Input disabled placeholder="自动生成" v-model="tableData[index].thick"/>
                </template>
                <template slot-scope="{index}" slot="requirement">
                    <Input placeholder="请输入工艺要求" v-model="tableData[index].requirement"/>
                </template>
                <template slot-scope="{index}" slot="label">
                    <Select v-model="tableData[index].label">
                        <Option :value='1' label="是"></Option>
                        <Option :value='2' label="否"></Option>
                    </Select>
                </template>

                <template slot-scope="{index}" slot="set">
                    <div>
                        <a style="color:red;" @click="delItems(tableData,index)">删除</a>
                    </div>
                    
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
                title:'',
            },
            partList:[],
            partsData:[],
            tableColums:[
                {title:'零部件名称',align:'center',key:'title',slot:'title',},
                {title:'数量',align:'center',key:'number',slot:'number'},
                {title:'单位',align:'center',key:'company',slot:'company'},
                {title:'长',align:'center',key:'long',slot:'long'},
                {title:'宽',align:'center',key:'wide',slot:'wide'},
                {title:'厚',align:'center',key:'thick',slot:'thick'},
                {title:'工艺要求',align:'center',key:'requirement',slot:'requirement'},
                {title:'标签',align:'center',key:'label',slot:'label'},
                {title:'操作',align:'center',slot:'set'},
            ],
            tableData:[{title:1}],
            product_list:[],
            addObj:{
                title:'',
                number:'',
                company:'',
                long:'',
                wide:'',
                thick:'',
                requirement:'',
                label:'',
            },
            zeroParts:[],
        }
    },
    
    mounted(){
        this.getParoducts()
        this.getPartsData()
        this.type = this.$route.query.type;
        this.id = this.$route.query.id;
        if(this.id){
            this.getDetails(this.id)
        }
        this.getParts()
    },
    methods:{
        back(){
            this.$router.push({name:'PartsManageHome'})
        },
        getPartsData(){
            this.axios('/api/material').then(res=>{
                this.zeroParts = res.data.data;
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
        addNewsPart(){
            this.$router.push({
                name:'PageEdit',
                params:{
                    list:this.list,
                    title:this.tableData.length>=1 ? '编辑零部件' : '新增零部件',
                    type:'零部件'
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
        },
        addZeroPart(){
            let add = JSON.parse(JSON.stringify(this.addObj))
            this.tableData.push(add)
        },
        changeSe(e,n){
            this.tableData[n].thick = e.tag;
        }
    }
}
</script>

<style lang="scss" scoped>
.edit-table-log{display: flex;justify-content: space-between;align-items: center;padding-bottom:10px;
    .footer-log{color:#666666}
}
.page-edit{overflow: hidden;overflow-y: auto;position:relative;top:20px;height:80%;}
/deep/ .ivu-table-wrapper{overflow:visible;color:red;}//穿透iview
</style>