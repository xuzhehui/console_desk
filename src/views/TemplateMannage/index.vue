<template>
    <div>
        <FullPage 
        title='模板管理'
        :list='list' 
        @init='init' 
        :loading='loading'
        @searchData='init' 
        @changePage='changePage'
        @changeSize='changeSize'
        :tableColums='tableColums'
        :tableData='tableData'
        :pageIndex='pageIndex'
        :total='total'
        >   
            <div slot='titleButton'>
                <Button  type="primary" @click="addTemplate(1)">新增模板</Button>
            </div>
            <template slot='set' slot-scope='{row}'>
                <div style="display:flex;justify-content:space-around;">
                    <svg @click="addTemplate(2)" style="font-size:20px;cursor:pointer;" color='#3764FF' class="icon icon-nav" aria-hidden="true">
                        <use xlink:href="#iconbianji"></use>
                    </svg>
                     <svg @click="delItems(row)" class="icon icon-nav" style="font-size:20px;cursor:pointer;" color='red' aria-hidden="true">
                        <use xlink:href="#iconshanchu"></use>
                    </svg>
                </div>
            </template>

            <Modal :width="400" @on-visible-change='visibleChange' class-name="vertical-center-modal" :title='showType == 1 ? "新增模板" : "编辑模板"' v-model="showTemplate">
                <Form :label-width="100">
                    <FormItem label='模板名称：'>
                        <Input v-model="templateInfo.name" placeholder="请输入模板名称" />
                    </FormItem>
                    <FormItem label='上传模板：'>
                        <Upload  :headers='headers' :on-success='uploadSuccess' :action="$store.state.ip+'/api/upload_template'">
                            <Button icon="ios-cloud-upload-outline">上传模板</Button>
                        </Upload>
                    </FormItem>
                    <FormItem label='模板地址：'>
                        <Input readonly v-model="templateInfo.url" placeholder="请先上传模板"/>
                    </FormItem>
                    <FormItem label='模板备注：'>
                        <Input type="textarea" :autosize="true" v-model="templateInfo.remark" placeholder="请输入模板名称" />
                    </FormItem>
                </Form>
                <div slot="footer" class="modal-footer">
                    <Button @click="showTemplate = false">取消</Button>
                    <Button type="primary" @click="uploadConfirm">确认</Button>
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
                {title:'模板名称',name:'Input',value:'',serverName:'title',placeholder:'请输入模板名称'},
            ],
            tableColums:[
                {title:'ID',align:'center',key:'id',width:'100'},
                {title:'模板名称',align:'center',key:'title'},
                {title:'地址',align:'center',key:'url',},
                {title:'备注',align:'center',key:'remark',},
                {title:'操作',align:'center',width:'100',slot:'set'},
            ],
            tableData:[],
            pageIndex:1,
            pageSize:10,
            total:0,
            showModal:false,
            proxyObj:{},
            loading:false,
            showTemplate:true,
            showType:1,//1新增 2编辑
            templateInfo:{
                name:'',
                url:'',
                remark:''
            },
            headers:{'Authorization':localStorage.getItem('token')},
        }
    },
    methods:{
        init(row){
            row.page_index = this.pageIndex;
            row.page_size = this.pageSize;
            this.proxyObj = row;
            this.getData(row)
        },
        getData(row){
            this.loading = true;
            this.axios('/api/template_list',{params:row}).then(res=>{
                this.loading = false;
                this.tableData = res.data.data;
                this.total = res.data.total;
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
        postInfo(){
            
        },
        vivibleModal(e){
            if(!e){this.classInfo = {};}
        },
        delItems(row){
            this.confirmDelete({
                content:'确认删除么？',
                then:()=>{
                    this.axios.post('/api/template_del',{id:row.id})
                    .then(res=>{
                        if(res.code == 200){
                            this.$Message.success(res.msg||'删除成功')
                            this.getData(this.proxyObj)
                        }
                    })
                }
            })
        },
        addTemplate(type){
            this.showType = type;
            this.templateInfo.type = this.showType == 1 ? 'add' : 'edit'
            this.showTemplate = true;
        },
        uploadSuccess(res){
            if(res.data.url){
                this.templateInfo.url = res.data.url;
            }
        },
        uploadConfirm(){
            this.axios.post('/api/template_save',this.templateInfo)
            .then(res=>{
                if(res.code == 200){
                    this.$Message.success(res.msg||'请求成功')
                    this.showTemplate = false;
                    this.getData(this.proxyObj)
                }
            })
        },
        visibleChange(e){
            if(!e){
                this.templateInfo = {
                    name:'',
                    url:'',
                    remark:''
                }
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.nav{display: flex;justify-content: space-between;align-items: center;}
</style>