<template>
    <div>
        <FullPage 
        :title='title'
        :list='list' 
        @init='init' 
        @searchData='searchData' 
        @changePage='changePage'
        :tableColums='tableColums'
        :tableData='tableData'
        :pageIndex='pageIndex'
        :total='total'
        >
            <div slot='navButton'>
                <Button @click="addItems" type="primary" ghost icon='md-add'>新增{{title}}</Button>
            </div>
            
            <template slot='set' slot-scope='row'>
                <div>
                    <Icon size='20' @click="addItems(row.row)" style="margin-right:10px;color:#3764FF;cursor:pointer" type="ios-create-outline" />
                    <Icon size='20' style="margin-left:10px;color:red;cursor:pointer" type="ios-trash-outline" />
                </div>
            </template>

            <div>
                <Modal class-name="vertical-center-modal" @on-ok="postInfo" :title="showType == 1 ? '新增'+title: '编辑'+title" v-model="showModal" :width="480" @on-visible-change='vivibleModal'>
                    <Form :label-width="90">
                        <FormItem label="ID：">
                            <Input disabled placeholder="ID自动生成" v-model="classInfo.id"/>
                        </FormItem>
                        <FormItem label="属性名称：">
                            <div v-if="showType == 1">
                                <div class="item-attr" v-for="(item,index) of attribute" :key="index">
                                    <Input :placeholder='"请输入"+title+"名称"' v-model="item.title"/>
                                    <Icon @click="addAttr(index)" style="'margin:0 10px" :color='index == 0 ? "#32C800" : "#FF5E5C"' size='20' :type="index == 0 ? 'ios-add-circle' : 'md-remove-circle'" />
                                </div>
                            </div>

                            <Input v-if="showType == 2" :placeholder='"请输入"+title+"名称"' v-model="classInfo.title"/>
                            
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        </FullPage>
    </div>
</template>

<script>
export default {
    data(){
        return {
            list:[
                {title:'ID',name:'Input',value:'',serverName:'id',placeholder:'请输入ID'},
                {title:`颜色名称`,name:'Input',value:'',serverName:'title',placeholder:`请输入颜色名称`},
            ],
            tableColums:[
                {title:'ID',align:'center',key:'id'},
                {title:`颜色`,align:'center',key:'title'},
                {title:'操作',align:'center',slot:'set'},
            ],
            tableData:[],
            pageIndex:1,
            total:100,
            showModal:false,
            showType:1,
            classInfo:{},
            attribute:[{title:''}],
            title:'',
        }
    },
    mounted(){
        this.title = this.$route.query.title
    },
    watch:{
        $route(to){
            this.title = to.query.title;
            this.list[1].title = `${this.title}名称`;
            this.list[1].placeholder = `请输入${this.title}名称`
            this.tableData[1].title=this.title;
        }
    },
    methods:{
        init(row){
            this.getData(row)
        },
        searchData(row){
            this.getData(row)
        },
        getData(row){
            this.axios('/api/basics_properties_index',{params:row}).then(res=>{
                this.tableData = res.data;
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
            this.axios.post(post_url,post_data)
        },
        addAttr(n){
            n == 0 ? this.attribute.push({title:''}) : this.attribute.splice(n,1)
        }
    }
}
</script>

<style lang="scss" scoped>
.nav{display: flex;justify-content: space-between;align-items: center;}
.item-attr{display: flex;align-items: center;margin-bottom: 10px;}
</style>