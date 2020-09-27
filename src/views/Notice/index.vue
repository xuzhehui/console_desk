<template>
    <div>
        <FullPage 
        title='消息通知内容'
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
            <div slot='navButton'>
                <Button type="primary" @click="openModal(null,1)" ghost icon='md-add'>新增内容</Button>
            </div>
            
            <template slot='set' slot-scope='{row}'>
                 <div class="table-set">
                    <svg @click="openModal(row,2)" style="font-size:20px" color='#3764FF' class="icon icon-nav" aria-hidden="true">
                        <use xlink:href="#iconbianji"></use>
                    </svg>

                    <svg @click="delItems(row)" class="icon icon-nav" style="font-size:20px" color='red' aria-hidden="true">
                        <use xlink:href="#iconshanchu"></use>
                    </svg>
                </div>
            </template>

            <Modal class-name='vertical-center-modal' :title='showType == 1 ? "新增内容" : "编辑内容"' v-model="show" @on-visible-change='changeModal'>
                <Form :label-width="80" ref='forms' :model="postInfo" :rules='rules'>
                    <FormItem label='通知分类' prop='type'>
                        <Input v-model="postInfo.title" placeholder="请输入通知分类"/>
                    </FormItem>

                    <FormItem label='通知内容' prop='content'>
                        <Input v-model="postInfo.content" type="textarea" :autosize="true" placeholder="请输入内容" />
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
            list:[
                {title:'ID',name:'Input',value:'',serverName:'id',placeholder:'请输入ID'},
            ],
            tableColums:[
                {title:'ID',align:'center',key:'id',width:'100'},
                {title:'通知分类',align:'center',key:'title'},
                {title:'通知内容',align:'center',key:'content'},
                {title:'操作',align:'center',slot:'set',width:'150'},
            ],
            tableData:[{id:1}],
            pageIndex:1,
            pageSize:10,
            total:0,
            proxyObj:{},
            loading:false,
            show:false,
            postInfo:{
                type:'',
                content:'',
            },
            rules:{
                type:[{required: true,message:'请输入通知分类',trigger:'blur'}],
                content:[{required: true,message:'请输入通知内容',trigger:'blur'}]
            },
            showType:1,
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
            this.axios('/api/notice_index',{params:row}).then(res=>{
                this.loading = false;
                this.tableData = res.data;
                this.total = res.data.total||0;
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
                    
                }
            })
        },
        postData(){
            this.axios.post('').then(res=>{
                if(res.code == 200){
                    this.$Message.success(res.msg||'操作成功');
                    this.show = false;
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
                this.postInfo = row;
            }
            this.show = true;
        },
        changeModal(e){
            if(!e){this.postInfo = {};this.$refs['forms'].resetFields()}
        }
    }
}
</script>

<style lang="scss" scoped>
</style>