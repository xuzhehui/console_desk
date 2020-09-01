<template>
    <div>
        <Toptitle title='新增工艺'>
            <Button @click="back" style="margin-right:10px;">返回</Button>
            <Button @click="postData">保存</Button>
        </Toptitle>

        <Form inline>
            <FormItem label="ID">
                <Input v-model="info.id" disabled placeholder="自动生成"></Input>
            </FormItem>

            <FormItem label="部件名称">
                <Select v-model="info.parts_id" style="width:186px;">
                    <Option v-for="item of partsList" :key="item.id" :value="item.id" :label="item.title"></Option>
                </Select>
            </FormItem>

            <FormItem label="工艺组合名称">
                <Input v-model="info.title" placeholder="请输入工艺组合名称"></Input>
            </FormItem>
            <FormItem label="价格">
                <Input v-model="info.price" placeholder="请输入价格"></Input>
            </FormItem>
        </Form>

        <div class="hierarchy" v-for="item of info.list" :key="item.id">
            <span>{{item.name||item.title}}(单选)：</span>
            <div class="radio-g">
                <RadioGroup v-model="item.select" type="button">
                    <Radio v-for='_item of item.cld' :key="_item.id" :label="_item.id">{{_item.title}}</Radio>
                </RadioGroup>
            </div>
        </div>

        <div style="padding:10px 0;">
            <span>工艺路线：</span>
            <Button @click="editRouter">新增工艺路线</Button>
        </div>

        <Modal class-name="vertical-center-modal" v-model="show_add" title="新增工艺路线">
            <div class="modal-tags">
                <div>已选：</div>
                <div class="select-tag">
                    <Tooltip>
                        <div slot='content'>
                            <p>工序：{{12}}</p>
                            <p>价值：{{12}}</p>
                        </div>
                        <Tag @on-close='closeTag(key,selectTags,item)' v-for="(item,key) of selectTags" :key="key" color="primary" type="border" closable>{{item.title}}</Tag>
                    </Tooltip>
                </div>
            </div>
            <div class="pro-select" v-for="(item,index) of info.bps" :key="index">
                <div>{{item.name}}：</div>
                <div>
                    <Checkbox @on-change="changeCheck($event,_item,selectTags)" v-model="_item.show" style="padding:0px 5px;" v-for="(_item,_index) of item.cld" :key='_index'  border>{{_item.title}}</Checkbox>
                </div>
            </div>
        </Modal>
    </div>
</template>

<script>
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
                this.info.list = res.data;
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
                this.info.bps = res.data;
            })
        }
        this.getParts()
    },
    methods:{
        back(){
            this.$router.go(-1)
        },
        postData(){
            this.info.op = this.type = 1 ? 'add' : 'edit'
            let data = JSON.parse(JSON.stringify(this.info))
            let properties = [],procedure = [];
            data.list.map(v=>v.select ? procedure.push(v.select) : '')
            this.selectTags.map(v=>{
                properties.push(v.id)
            })
            delete data.list
            delete data.bps
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
            })
        },
        getParts(){
            this.axios('/api/parts_index').then(res=>{
                this.partsList = res.data.data
            })
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
        }
    },
}
</script>

<style lang="scss" scoped>
.edit-table-log{display: flex;justify-content: space-between;align-items: center;padding-bottom:10px;
    .footer-log{color:#666666}
}
.hierarchy{
    .radio-g{padding:10px 0;}
}
.vertical-center-modal{display: flex;align-items: center;justify-content: center;.ivu-modal{top: 0;}}
.modal-tags{display: flex;align-items: center;}
.pro-select{display: flex;padding:10px 0;align-items:center;}
</style>