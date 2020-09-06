<template>
    <div>
        <FullPage 
        title='工艺属性字段'
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
                <Button @click="addItems" type="primary" ghost icon='md-add'>新增属性</Button>
            </div>
            
            <template slot='set' slot-scope='row'>
                <div>
                    <Icon size='20' @click="addItems(row.row)" style="margin-right:10px;color:#3764FF;cursor:pointer" type="ios-create-outline" />
                    <Icon size='20' @click="delItems(row.row)" style="margin-left:10px;color:red;cursor:pointer" type="ios-trash-outline" />
                </div>
            </template>

            <div>
                <Modal class-name="vertical-center-modal" @on-ok="postInfo" :title="showType == 1 ? '新增工艺属性': '编辑工艺属性'" v-model="showModal" :width="480" @on-visible-change='vivibleModal'>
                    <Form :label-width="90">
                        <FormItem label="ID：">
                            <Input disabled placeholder="ID自动生成" v-model="classInfo.id"/>
                        </FormItem>
                        <FormItem label="属性名称：">
                            <div v-if="showType == 1">
                                <div class="item-attr" v-for="(item,index) of attribute" :key="index">
                                    <Input placeholder="请输入属性名称" v-model="item.title"/>
                                    <Icon @click="addAttr(index)" style="'margin:0 10px" :color='index == attribute.length-1 ? "#32C800" : "#FF5E5C"' size='20' :type="index == attribute.length-1 ? 'ios-add-circle' : 'md-remove-circle'" />
                                </div>
                            </div>

                            <Input v-if="showType == 2" placeholder="请输入属性名称" v-model="classInfo.title"/>
                            
                        </FormItem>
                    </Form>
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
                {title:'ID',name:'Input',value:'',serverName:'id',placeholder:'请输入ID'},
                {title:'物料分类名称',name:'Input',value:'',serverName:'title',placeholder:'请输入属性名称'},
            ],
            tableColums:[
                {title:'ID',align:'center',key:'id'},
                {title:'属性名称',align:'center',key:'title'},
                {title:'操作',align:'center',slot:'set'},
            ],
            tableData:[],
            pageIndex:1,
            total:0,
            pageSize:10,
            showModal:false,
            showType:1,
            classInfo:{},
            attribute:[{title:''}],
            loading:false,
            proxyObj:{},
        }
    },
    methods:{
        ...mapActions(['undata_navData']),
        init(row){
            row.page_size = this.pageSize;
            row.page_index = this.pageIndex;
            this.proxyObj = row
            this.getData(row)
        },
        getData(row){
            this.loading = true;
            this.axios('/api/basics_properties_index',{params:row}).then(res=>{
                this.loading = false;
                this.tableData = res.data.data;
                this.total = res.data.total;
            })
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
        vivibleModal(e){
            if(!e){
                this.showType == 1 ? this.attribute=[{title:''}] : this.classInfo={}
            }
        },
        postInfo(){
            let post_url,post_data;
            if(this.showType == 1){
                post_url = '/api/basics_properties_add';
                let result = []
                this.attribute.map(v=>result.push(v.title))
                post_data = {
                    id:this.classInfo.id,
                    title:result.join(',')
                }
            }else{
                post_url = '/api/basics_properties_edit'
                post_data = this.classInfo;
            }
            this.axios.post(post_url,post_data).then(res=>{
                this.$Message.success(res.msg)
                this.getData(this.proxyObj)
                this.undata_navData()
            })
        },
        addAttr(n){
            n == this.attribute.length-1 ? this.attribute.push({title:''}) : this.attribute.splice(n,1)
        },
        delItems(row){
            this.confirmDelete({
                content:'确认删除么？',
                then:()=>{
                    this.axios.post('/api/basics_properties_del',{id:row.id,state:0}).then(res=>{
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