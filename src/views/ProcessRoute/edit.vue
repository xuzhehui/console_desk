<template>
    <div>
        <Toptitle :title='type == 1 ? "新增工艺" : "编辑工艺"'>
            <Button @click="back" type='primary' ghost style="margin-right:10px;">返回</Button>
            <Button @click="handleSubmit('Info')">保存</Button>
        </Toptitle>

        <div class="page-edit">
            <Form inline ref='Info' :model="info" :rules='rules'>
                <FormItem label="ID">
                    <Input v-model="info.id" disabled placeholder="自动生成"></Input>
                </FormItem>

                <FormItem label="部件名称" prop='parts_id'>
                    <Select filterable clearable v-model="info.parts_id" style="width:186px;">
                        <Option v-for="item of partsList" :key="item.id" :value="item.id" :label="item.title"></Option>
                    </Select>
                </FormItem>

                <FormItem label="工艺组合名称" prop='title'>
                    <Input v-model="info.title" placeholder="请输入工艺组合名称"></Input>
                </FormItem>
                <FormItem label="价格" prop='price'>
                    <Input type="number" v-model="info.price" placeholder="请输入价格"></Input>
                </FormItem>
            </Form>

            <div class="hierarchy" v-for="item of info.list" :key="item.id">
                <span>{{item.name||item.title}}(单选)：</span>
                <div class="radio-g">
                    <div @click="setRadioChange(item,_item)" :class="['radio-us',_item.show ? 'radio-us-foc' : '']" v-for='_item of item.cld' :key="_item.id">{{_item.title}}</div>
                    <!-- <RadioGroup @on-change="changeRadio" v-model="item.select" type="button">
                        <Radio v-for='_item of item.cld' :key="_item.id" :label="_item.id">{{_item.title}}</Radio>
                    </RadioGroup> -->
                </div>
            </div>

            <div style="padding:10px 0;">
                <span>工艺路线：</span>
                <Button @click="editRouter">{{type == 1 ? '新增工艺路线' : '编辑工艺路线'}}</Button>
            </div>

            <Table border :columns="tableColumns" :data="tableData"></Table>
        </div>

        <Modal class-name="vertical-center-modal" v-model="show_add" title="新增工艺路线" @on-ok="saveTableData">
            <Form>
                <FormItem label='已选'>
                    <SlickList :distance="10" :lockToContainerEdges="true" axis="x,y,xy" lockAxis="xy" v-model="selectTags" class="SortableList" @input="getChangeLists">
                        <SlickItem style="z-index:9999" v-for="(item,key) of selectTags" :key="key" class="SortableItem" :index="key">
                            <div class="tag-modal">
                                <div class="before">{{key+1}}</div>
                                <Tag @on-close='closeTag(key,selectTags,item)'  color="primary" type="border" closable>{{item.title}}</Tag>
                            </div>
                        </SlickItem>
                    </SlickList>
                </FormItem>
                <FormItem v-for="(item,index) of info.bps" :key="index" :label='item.title'>
                    <Tooltip v-for="(_item,_index) of item.cld" :key='_index'>
                        <div slot='content'>
                            <p>工时：{{_item.time}}</p>
                            <p>工价：{{_item.wages}}</p>
                            <p>产能：{{_item.capacity}}</p>
                        </div>
                        <Checkbox @on-change="changeCheck($event,_item,selectTags)" v-model="_item.show" style="padding:0px 5px;">{{_item.title}}</Checkbox>
                    </Tooltip>
                </FormItem>
            </Form>
        </Modal>
    </div>
</template>

<script>

import { SlickList, SlickItem } from 'vue-slicksort'
export default {
    data(){
        return {
            type:1,
            id:null,
            partsList:[],
            show_add:false,
            selectTags:[],//已选列表
            info:{
                title:'',
                price:'',
                parts_id:'',
                id:null,
                properties:[],//工序号
                procedure:[],//工艺属性id
                list:[],
                bps:[],
            },
            rules:{
                title:[
                    {required: true,message:' ',trigger:'blur'}
                ],
                parts_id:[
                    {required: true,message:' '}
                ],
                price:[
                    {required: true,message:' ',trigger:'blur'}
                ],
            },
            tableColumns:[
                {title:'ID',align:'center',key:'id'},
                {title:'工序名称',align:'center',key:'title'},
                {title:'工时',align:'center',key:'time'},
                {title:'工价',align:'center',key:'wages'},
                {title:'产能',align:'center',key:'capacity'},
            ],
            tableData:[],

        }
    },
    mounted(){
        this.type = this.$route.query.type;
        this.id = this.$route.query.id;
        if(this.id){
            this.getData(this.id)
        }
        if(this.type == 1){
            this.axios('/api/bp_list').then(res=>{
                this.info.bps = res.data;
            });
            this.axios('/api/bpp_list').then(res=>{
                res.data.map(v=>{
                    if(v.select){
                        v.cld.map(z=>{
                            v.select.map(k=>{
                                z.show = k == z.id ? true : false
                            })
                        })
                    }else{
                        v.cld.map(v=>v.show = false)
                    }
                })
                this.info.list = res.data;
            })
        }
        this.getParts()
    },
    methods:{
        back(){
            this.$router.go(-1)
        },
        getChangeLists(e){
            // console.log(e)
        },
        postData(){
            this.info.op = this.type == 1 ? 'add' : 'edit'
            let data = JSON.parse(JSON.stringify(this.info))
            let properties = [],procedure = [];
            try{
                data.list.map(v=>v.select ? properties.push(v.select) : '')
            }catch(e){
                return this.$Message.error('must be Array got Object')
            }
            
            this.selectTags.map(v=>{procedure.push(v.id)})
            delete data.list
            delete data.bps
            this.type == 1 ? delete data.id : '';
            data.properties = properties.join(',')
            data.procedure = procedure.join(',')
            this.axios.post('/api/process_route_save',data).then(res=>{
                if(res.code == 200){
                    this.$Message.success(res.msg)
                    setTimeout(()=>{this.back()},500)
                }
            })
        },
        getData(row){
            this.axios('/api/process_route_detail',{params:{id:row}}).then(res=>{
                this.info = res.data
                this.info.bps.map(v=>{
                    if(v.select){
                        v.cld.map(z=>{
                            v.select.map(k=>{
                                z.show = k == z.id ? true : false
                                z.show ? this.selectTags.push(z) : ''
                            })
                        })
                    }else{
                        v.cld.map(v=>v.show = false)
                    }
                })
                this.tableData = this.selectTags;
                this.info.list.map(v=>{
                    if(v.select){
                        v.cld.map(k=>{
                            if(k.id == v.select){
                                k.show = true;
                            }else{
                                k.show = false
                            }
                        })
                    }
                })
                console.log(this.info.list)
            })
        },
        getParts(){
            this.axios('/api/parts_index').then(res=>{this.partsList = res.data.data})
        },
        editRouter(){
            this.show_add = true;
        },
        changeCheck(e,item,selectArray){//复选框选中与非选中同时同步tag标签跟随操作
            item.show = e;
            if(e){
                selectArray.push(item)
            }else{
                let id = item.id;
                let id_index = selectArray.findIndex(v=>v.id == id)
                selectArray.splice(id_index,1)
            }
        },
        closeTag(key,arr,row){//取消tag标签展示操作并同步下方的复选框ui同步
            arr.splice(key,1)
            this.info.bps.map(v=>{
                v.cld.map(p=>{
                    p.id == row.id ? p.show = false : ''
                })
            })
        },
        saveTableData(){
            this.tableData = this.selectTags;
        },
        handleSubmit(name) {
            this.$refs[name].validate((valid) => {
                if(valid){
                    this.postData()
                }
            })
        },
        changeRadio(e){
            console.log(e)
        },
        setRadioChange(parent,child){
            parent.cld.map(v=>v.show = false)
            if(parent.select == child.id){
                child.show = false;
                parent.select = '';
            }else{
                parent.select = child.id;
                child.show = true;
            }
            
            this.$forceUpdate()
        }
    },
    components:{SlickList,SlickItem}
}
</script>

<style lang="scss" scoped>
.edit-table-log{display: flex;justify-content: space-between;align-items: center;padding-bottom:10px;
    .footer-log{color:#666666}
}
.hierarchy{
    .radio-g{padding:10px 0;display:flex;
        .radio-us{background: #F4F5F7;;padding:5px 20px;margin-right:18px;color:#999999;border-radius:15px;border:1px solid #DEDEDE;cursor:pointer;}
        .radio-us-foc{color:#3764FF;background:#fff;border:1px solid #3764FF;}
    }
}
.vertical-center-modal{display: flex;align-items: center;justify-content: center;.ivu-modal{top: 0;}}
.modal-tags{display: flex;align-items: center;}
.pro-select{display: flex;padding:10px 0;align-items:center;}
.SortableList{display: flex;flex-wrap:wrap;overflow: hidden;}
.tag-modal{display: flex;align-items:center;
    .before{width:20px;background:#3764FF;height:24px;border-radius:5px 0 0 5px;display: flex;justify-content: center;
        align-items:center;color:#fff;
    }
}
</style>

<style lang="scss">
.ivu-tooltip-popper{z-index: 999999!important;}
</style>