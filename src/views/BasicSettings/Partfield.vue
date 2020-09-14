<template>
    <div>
        <FullPage 
        title='部件字段'
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
                <Button type="success" ghost icon='md-exit' style="margin-right:10px;">批量导入</Button>
                <Button type="warning" ghost icon='md-return-left'>批量导出</Button>
            </div>
            <div slot='navButton'>
                <Button type="primary" ghost icon='md-add' @click="addItems">新增部件</Button>
            </div>
            
            <template slot='set' slot-scope='{row}'>
                <div class="table-set">
                    <svg style="font-size:20px" color='#3764FF' @click="addItems(row)" class="icon icon-nav" aria-hidden="true">
                        <use xlink:href="#iconbianji"></use>
                    </svg>

                    <svg @click="delItems(row)" class="icon icon-nav" style="font-size:20px" color='red' aria-hidden="true">
                        <use xlink:href="#iconshanchu"></use>
                    </svg>
                </div>
            </template>

            <div>
                <Modal class-name="vertical-center-modal" :title="showType == 1 ? '新增部件': '编辑部件'" v-model="showModal" :width="480" @on-visible-change='vivibleModal'>
                    <Form :label-width="90">
                        <FormItem label="ID：">
                            <Input disabled placeholder="ID自动生成" v-model="classInfo.id"/>
                        </FormItem>
                        <span v-if="repeatFlag" style="color:red;margin-left:8px;">以下属性重复</span>
                        <FormItem label="部件名称：">
                            <div v-if="showType == 1">
                                <div class="item-attr" v-for="(item,index) of attribute" :key="index">
                                    <Input placeholder="请输入部件名称" v-model="item.title"/>
                                    <Icon @click="addAttr(index)" style="'margin:0 10px" :color='index == attribute.length-1 ? "#32C800" : "#FF5E5C"' size='20' :type="index == attribute.length-1 ? 'ios-add-circle' : 'md-remove-circle'" />
                                </div>
                            </div>
                            <Input v-if="showType == 2" placeholder="请输入部件名称" v-model="classInfo.title"/>
                        </FormItem>
                    </Form>
                    <div slot="footer" class="modal-footer">
                        <Button @click="showModal = false">取消</Button>
                        <Button type="primary" @click="postInfo">确定</Button>
                    </div>
                </Modal>
            </div>
        </FullPage>

        
    </div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
    data(){
        return {
            list:[
                {title:'部件名称',name:'Input',value:'',serverName:'title',placeholder:'请输入部件名称'},
            ],
            tableColums:[
                {title:'ID',align:'center',key:'id',width:'100'},
                {title:'部件名称',align:'center',key:'title'},
                {title:'操作',align:'center',slot:'set',width:'150'},
            ],
            tableData:[],
            pageIndex:1,
            pageSize:10,
            total:0,
            showModal:false,
            showType:1,
            classInfo:{},
            proxyObj:{},
            loading:false,
            attribute:[{title:''}],
            repeatFlag:false,
        }
    },
    methods:{
        ...mapActions(['undata_navData']),
        init(row){
            row.page_size = this.pageSize;
            row.page_index = this.pageIndex;
            this.proxyObj = row;
            this.getData(row)
        },
        getData(row){
            this.loading = true;
            this.axios('/api/basics_parts_index',{params:row}).then(res=>{
                this.loading = false,
                this.tableData = res.data.data;
                this.total = res.data.total
            })
        },
        changePage(e){
            this.pageIndex = e;
            this.proxyObj.page_index = this.pageIndex;
            this.getData(this.proxyObj)
        },
        changeSize(e){
            this.pageSize = e;
            this.proxyObj.page_size = this.pageSize;
            this.getData(this.proxyObj)
        },
        addItems(obj){
            this.showModal = true;
            if(obj.id){
                this.showType=2
                this.classInfo.id = obj.id;
                this.classInfo.title = obj.title;
            }else{
                //新增
                this.showType=1
            } 
        },
        postInfo(){
            let postData = {},post_url='';
            if(this.showType == 1){
                post_url = '/api/basics_parts_add';
                let result = []
                this.attribute.map(v=>result.push(v.title))
                postData = {
                    id:this.classInfo.id,
                    title:result.join(',')
                }
            }else{
                post_url = '/api/basics_parts_edit'
                postData = this.classInfo;
            }
            this.axios.post(post_url,postData).then(res=>{
                if(res.code == 200){
                    this.$Message.success(res.msg)
                    this.getData(this.proxyObj)
                    this.undata_navData()
                }else{
                    if(Array.isArray(res.data)){
                        this.repeatFlag = true;
                        let result = [];
                        res.data.map(v=>{
                            let obj = {};
                            v ? obj.title = v : ''
                            obj.title ? result.push(obj) : ''
                        })
                        this.attribute = result;
                    }
                }
            })
        },
        vivibleModal(e){
            if(!e){this.classInfo = {};this.attribute = [{title:''}]}
        },
        addAttr(n){
            n == this.attribute.length-1 ? this.attribute.push({title:''}) : this.attribute.splice(n,1)
        },
        
        delItems(row){
            this.confirmDelete({
                content:'确认删除么？',
                then:()=>{
                    this.axios.post('/api/basics_parts_del',{id:row.id,state:0}).then(res=>{
                        if(res.code == 200){
                            this.$Message.success(res.msg)
                            this.getData(this.proxyObj)
                            this.undata_navData()
                        } 
                    })
                }
            })
        },
    }
}
</script>

<style lang="scss" scoped>
.nav{display: flex;justify-content: space-between;align-items: center;}
.item-attr{display: flex;align-items: center;margin-bottom: 10px;}
</style>