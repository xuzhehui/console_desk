<template>
    <div>
        <FullPage 
        @init='init'
        :list='list'
        @searchData='init'
        title='消息类型列表'
        @changePage='changePage'
        @changeSize='changeSize'
        :pageIndex='pageIndex'
        :total='total'
        :loading='loading'
        :tableColums='tableColums'
        :tableData='tableData'
        >
            <div slot='titleButton'>
                <Button  type="primary" @click="openModal(null)">新增消息类型</Button>
            </div>
            <template slot='set' slot-scope='{row}'>
                 <div class="table-set">
                    <Button size='small' type='primary' @click="openModal(row)" class="map-margin">编辑</Button>
                    <Button size='small' type='error' @click="delItems(row)" class="map-margin">删除</Button>
                </div>
            </template>

            <Modal :width='400' class-name="vertical-center-modal" :title='modalType == 1 ? "新增消息类型" : "编辑消息类型"' v-model="show" @on-visible-change='changeModal'>
                <Form ref='forms' :label-width="80" :model="postInfo" :rules='rules'>
                    <FormItem label='消息类型' prop='title'>
                        <Input v-model="postInfo.title"/>
                    </FormItem>
                    <FormItem label='通知状态' >
                        <i-switch v-model="postInfo.state" :true-value='1' :false-value='0'></i-switch>
                    </FormItem>
                    <FormItem label='通知模块' prop='modules'>
                        <CheckboxGroup v-model="postInfo.modules">
                            <Checkbox :label="1">工厂</Checkbox>
                            <Checkbox :label="2">经销商</Checkbox>
                            <Checkbox :label="3">供应商</Checkbox>
                            <Checkbox :label="4">公司内部</Checkbox>
                        </CheckboxGroup>
                    </FormItem>
                    <FormItem label='备注'>
                        <Input v-model="postInfo.remark" type="textarea" :autosize="true"/>
                    </FormItem>
                   
                </Form>
                 <div class="modal-footer" slot='footer'>
                    <Button @click="show = false">取消</Button>
                    <Button type='primary' @click="handleSubmit('forms')">确认</Button>
                </div>
            </Modal>
        </FullPage>
    </div>
</template>

<script>
export default {
    data(){
        return {
            list:[
                {name:'Input',title:'消息类型名称',value:'',serverName:'title'}
            ],
            tableColums:[
                {title:'通知类型',align:'center',key:'title',minWidth:100},
                {title:'最后操作人',align:'center',key:'user',minWidth:100},
                {title:'操作时间',align:'center',key:'time',minWidth:100},
                {title:'是否启用',align:'center',minWidth:100,
                    render:(h,params)=>h('i-switch',{
                        props:{
                            value:params.row.state,
                            'true-value':1,
                            'false-value':0,
                        },
                        on:{
                            "on-change":(check)=>this.tableData[params.index].state = check
                        }
                    })
                },
                {title:'操作',align:'center',slot:'set',width:'150'},
            ],
            pageIndex:1,
            pageSize:10,
            total:10,
            postInfo:{
                title:'',
                state:false,
                remark:''
            },
            proxyObj:{},
            tableData:[{title:'消息类型1',user:'张三',time:'2020-11-20',state:1,modules:[1,2]}],
            loading:false,
            rules:{
                title:[{required: true,message:'请输入通知类型'}],
                state:[{required: true,message:'',trigger:'blur'}],
                modules:[{required: true,message:'请选择通知模块'}]
            },
            modalType:1,//1新增 2编辑
            show:false,
        }
    },
    methods:{
        init(row){
            row.page_index = this.pageIndex
            row.page_size = this.pageSize
            this.proxyObj = row
            this.getData(row)
        },
        getData(row){
            this.loading = true;
            this.axios('/api/notice_type/list',{params:row}).then(res=>{
                this.loading = false;
                this.tableData = res.data||res.data.data;
            })
        },
        changePage(e){
            this.pageIndex = e;
            this.proxyObj.page_index = this.pageIndex;
            this.getData(this.proxyObj);
        },
        changeSize(e){
            this.pageSize = e;
            this.proxyObj.page_size = this.pageSize;
            this.getData(this.proxyObj);
        },
        delItems(row){
            this.confirmDelete({
                content:'确认删除么？',
                then:()=>{
                    this.axios.post('/api/notice_type/del',{params:{id:row.id}}).then(res=>{
                        if(res.code == 200){
                            this.$Message.success(res.msg||'删除成功')
                            this.getData(this.proxyObj);
                        }
                    })
                }
            })
        },
        async postData(){
           const result = await this.axios.post('/api/notice_type/update',this.postInfo)
           if(result.code == 1){
               this.$Message.success(res.msg)
               this.show = false
               this.getData(this.proxyObj)
           }
        },
        handleSubmit(name) {
            this.$refs[name].validate((valid) => {
                if(valid){
                    this.postData()
                }
            })
        },
        openModal(row){
            if(row){
                let result = JSON.parse(JSON.stringify(row))
                this.postInfo = result;
                this.postInfo.op = 'edit'
                this.modalType = 2
            }else{
                this.postInfo.op = 'add'
                this.modalType = 1
            }
            this.show = true
        },
        changeModal(e){
            if(!e){this.postInfo = {state:0};this.$refs['forms'].resetFields();}
        }
    }
}
</script>

<style lang="scss" scoped>
</style>