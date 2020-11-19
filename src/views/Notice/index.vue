<template>
    <div>
        <FullPage 
        title='消息通知列表'
        :showTopSearch='false'
        :showPage='false'
        :loading='loading'
        :tableColums='tableColums'
        :tableData='tableData'
        >
            <template slot='set' slot-scope='{row}'>
                 <div class="table-set">
                    <svg @click="openModal(row,2)" style="font-size:20px" color='#3764FF' class="icon icon-nav" aria-hidden="true">
                        <use xlink:href="#iconbianji"></use>
                    </svg>
                </div>
            </template>

            <Modal :width="400" class-name='vertical-center-modal' :title='showType == 1 ? "新增内容" : "编辑内容"' v-model="show" @on-visible-change='changeModal'>
                <Form :label-width="80" ref='forms' :model="postInfo" :rules='rules'>
                    <FormItem label='通知分类' prop='type'>
                        <Select v-model="postInfo.type">
                            <Option :value='1'>测量</Option>
                            <Option :value='2'>生产</Option>
                            <Option :value='3'>物料警告</Option>
                            <Option :value='4'>订单过期</Option>
                        </Select>
                    </FormItem>

                    <FormItem label='通知内容' prop='content'>
                        <Input v-model="postInfo.content" type="textarea" :autosize="true" placeholder="请输入内容" />
                    </FormItem>

                    <FormItem label='通知人员' prop='user_id'>
                       <Select v-model="postInfo.user_id" multiple filterable>
                           <Option v-for='item of users' :key="item.id" :value="item.id" :label="item.nickname"></Option>
                       </Select>
                    </FormItem>
                </Form>

                <div slot="footer" class="modal-footer">
                    <Button @click="show = false">取消</Button>
                    <Button @click="handleSubmit('forms')" type="primary">确认</Button>
                </div>
            </Modal>
        </FullPage>
    </div>
</template>

<script>
export default {
    data(){
        return {
            tableColums:[
                {title:'ID',align:'center',key:'id',width:'100'},
                {title:'通知分类',align:'center',key:'title',minWidth:100},
                {title:'通知内容',align:'center',key:'content',minWidth:100},
                {title:'操作',align:'center',slot:'set',width:'150'},
            ],
            users:[],
            tableData:[],
            loading:false,
            show:false,
            postInfo:{
                type:'',
                content:'',
                user_id:[],
            },
            rules:{
                type:[{required: true,message:'请选择通知分类'}],
                content:[{required: true,message:'请输入通知内容',trigger:'blur'}],
                user_id:[{required: true,message:'请选择通知人员'}]
            },
            showType:1,
        }
    },
    mounted() {
        this.axios('/api/user').then(res=>this.users = res.data.data)
        this.getData()
    },
    methods:{
        getData(){
            this.loading = true;
            this.axios('/api/notice_index').then(res=>{
                this.loading = false;
                this.tableData = res.data||res.data.data;
            })
        },
        delItems(row){
            this.confirmDelete({
                content:'确认删除么？',
                then:()=>{
                    
                }
            })
        },
        postData(){
            let postParams = JSON.parse(JSON.stringify(this.postInfo))
            postParams.user_id = postParams.user_id.join(',')
            this.axios.post('/api/save_notice',postParams).then(res=>{
                if(res.code == 200){
                    this.$Message.success(res.msg||'操作成功');
                    this.show = false;
                    this.getData(this.proxyObj)
                }
            })
        },
        handleSubmit(name) {
            this.$refs[name].validate((valid) => {
                if(valid){
                    this.postData()
                }
            })
        },
        openModal(row,type){
            this.showType = type;
            if(row){
                this.postInfo.type = row.type;
                this.postInfo.content = row.content;
                this.postInfo.user_id = row.user_id
                this.postInfo.id = row.id
                this.postInfo.op = 'edit'
            }else{
                this.postInfo.op = 'add'
            }
            this.show = true;
        },
        changeModal(e){
            if(!e){this.postInfo = {};this.$refs['forms'].resetFields();}
        }
    }
}
</script>

<style lang="scss" scoped>
</style>