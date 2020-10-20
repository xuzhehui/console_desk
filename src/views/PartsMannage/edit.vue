<template>
    <div>
        <Toptitle :title='type == 1 ? "新增部件" : (type == 2 ? "编辑部件" : "查看部件") '>
            <Button @click="back" type='primary' ghost style="margin-right:10px;">返回</Button>
            <Button v-if="type == 1 || type == 2" type="primary" @click="handleSubmit('Info')">保存</Button>
        </Toptitle>

        <div class="page-edit">
            <Form style="width:30%" ref='Info' :model="info" :rules='rules'>
                <FormItem label="部件分类名称" prop='p_id'>
                    <Select filterable clearable v-model="info.p_id">
                        <Option v-for="item of partList" :key="item.id" :value="item.id" :label="item.title"></Option>
                    </Select>
                </FormItem>
                <FormItem label="标签" prop='label'>
                    <RadioGroup v-model="info.label" style="width:100%;">
                        <Radio :label="0">是</Radio>
                        <Radio :label="1">否</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem label="部件名称" prop='title'>
                    <Input v-model="info.title" placeholder="请输入部件名称"></Input>
                </FormItem>
                <FormItem label="单位" prop='company'>
                    <Input v-model="info.company" placeholder="请输入单位"></Input>
                </FormItem>
                <FormItem label="关联产品分类" prop='p_id'>
                    <div style="display:flex;align-items:center;width:100%;">
                        <Dropdown>
                            <Button type='primary' ghost>选择产品</Button>
                            <DropdownMenu slot="list">
                                <Downtree @childByValue='handleClick' :parent='productTypes'></Downtree>
                            </DropdownMenu>
                        </Dropdown>

                        <Button style="margin-left:20px;" v-if="nowSelectObj.title">{{nowSelectObj.title||''}}</Button>
                    </div>
                   
                </FormItem>
            </Form>
            <div class="edit-table-log">
                <div>
                    <span>零部件添加：</span>
                    <Button size='small' @click="addZeroPart" type="primary" ghost>新增零部件</Button>
                </div>
                <span class="footer-log">备注:适用于 ＋(加)  -(减)   ×(乘)  ÷(除)不输入就是不设定公式，支持单项输入)</span>
            </div>
            <Table stripe border :columns="tableColums" :data="tableData" :width="tableWidth">
                <template slot-scope='{index}' slot='spare_parts'>
                    <Input placeholder="请输入零部件名称" v-model="tableData[index].spare_parts" />
                </template>
                <template slot-scope="{index}" slot="title">
                    <div>
                        <Select label-in-value @on-change="changeSe($event,index)" v-model="tableData[index].material_id">
                            <Option :data-unit='item.unit' :tag='item.high' v-for="item of zeroParts" :key="item.id" :value='item.id' :label="item.title"></Option>
                        </Select>
                    </div>
                </template>
                <template slot-scope="{index}" slot="number">
                    <Input placeholder="请输入数量" v-model="tableData[index].number"/>
                </template>
                <template slot-scope="{index}" slot="company">
                    <Input placeholder="请输入单位" disabled v-model="tableData[index].company"/>
                </template>
                <template slot-scope="{index}" slot="long">
                    <Input @on-focus="openKey(index,'long')"  placeholder="请输入长" v-model="tableData[index].long"/>
                </template>
                <template slot-scope="{index}" slot="wide">
                    <Input @on-focus="openKey(index,'wide')" placeholder="请输入宽" v-model="tableData[index].wide"/>
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

        <Modal v-model="showKey" :width="1250" :mask-closable='false' :closable='false'>
            <div>
                <KeyBoard :rightData='measureList' @cancel='successKey' @success='successKey' class='key-co'/>
            </div>
            <div slot='footer'></div>
        </Modal>
    </div>
</template>

<script>
import KeyBoard from '../../components/keyboard/index'
import Downtree from '../../components/drowDown/index'
import {mapState,mapMutations} from 'vuex'
export default {
    data(){
        return {
            type:1,
            id:null,
            tableWidth:null,
            info:{
                company:'',
                p_id:'',
                bp_id:null,
                label:null,
                title:'',
            },
            partList:[],
            partsData:[],
            tableColums:[
                {title:'零部件名称',align:'center',key:'spare_parts',slot:'spare_parts',minWidth:150,fixed:'left'},
                {title:'物料名称',align:'center',key:'title',slot:'title',minWidth:150},
                {title:'数量',align:'center',key:'number',slot:'number',minWidth:150},
                {title:'单位',align:'center',key:'company',slot:'company',minWidth:100},
                {title:'长',align:'center',key:'long',slot:'long',minWidth:120},
                {title:'宽',align:'center',key:'wide',slot:'wide',minWidth:120},
                {title:'厚',align:'center',key:'thick',slot:'thick',minWidth:120},
                {title:'工艺要求',align:'center',key:'requirement',slot:'requirement',minWidth:150},
                {title:'标签',align:'center',key:'label',slot:'label',minWidth:150},
                {title:'操作',align:'center',slot:'set',minWidth:100,fixed:'right'},
            ],
            tableData:[],
            rules:{
                p_id:[{required: true, message:' ',}],
                label:[{required: true, message: '请选择标签',}],
                title:[{required: true, message: ' ', trigger: 'blur'}],
                company:[{required: true, message: ' ', trigger: 'blur'}],
            },
            addObj:{
                title:'',
                number:'',
                company:'',
                spare_parts:'',
                long:'',
                wide:'',
                thick:'',
                requirement:'',
                label:2,
                p_id:null,
            },
            zeroParts:[],
            showKey:false,
            attrindex:null,
            attrName:'',
            measureList:[],
            productTypes:[],
            nowSelectObj:{},
        }
    },
    
    mounted(){
        this.getProductTypes()
        this.getPartsData()
        this.type = this.$route.query.type;
        this.id = this.$route.query.id;
        if(this.id){
            this.getDetails(this.id)
        }
        this.getParts()
        this.tableWidth = window.innerWidth-300;
        window.addEventListener('resize',(e)=>this.tableWidth = e.target.innerWidth - 300)
    },
    components:{
        KeyBoard,Downtree
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
            if(!this.info.bp_id){return this.$Message.warning('请关联产品')}
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
                if(this.info.product){
                    this.nowSelectObj = this.info.product
                }
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
        addZeroPart(){
            let add = JSON.parse(JSON.stringify(this.addObj))
            this.tableData.push(add)
        },
        changeSe(e,n){
            let event = window.event;
            let unit = event.target.dataset.unit;
            this.tableData[n].company = unit ? unit : ''
            this.tableData[n].thick = e.tag;
        },
        handleSubmit(name) {
            this.$refs[name].validate((valid) => {
                if(valid){
                    this.postData()
                }
            })
        },
        successKey(str){
            this.tableData[this.attrindex][this.attrName] = str;
            this.showKey = false;
        },
         openKey(row,attr){
            this.showKey = true;
            this.attrindex = row;
            this.attrName = attr;
        },
        getProductTypes(e){
            this.axios('/api/parts_product_list',{params:{id:e}}).then(res=>{
                if(res.code == 200){
                    this.productTypes = res.data;
                }
            })
        },
        handleClick(e){
           let data = JSON.parse(e)
           this.nowSelectObj = data
           this.info.bp_id = this.nowSelectObj.id;
           this.axios('/api/basics_product_list',{params:{id:this.info.bp_id}}).then(res=>{
               this.measureList = res.data[0].measure
           })
        },
    }
}
</script>

<style lang="scss" scoped>
.edit-table-log{display: flex;justify-content: space-between;align-items: center;padding-bottom:10px;padding-top:20px;
    .footer-log{color:#666666}
}
.page-edit{overflow: hidden;overflow-y: auto;position:relative;top:20px;height:80%;}
/deep/ .ivu-table-wrapper{overflow:visible;color:red;}//穿透iview
</style>