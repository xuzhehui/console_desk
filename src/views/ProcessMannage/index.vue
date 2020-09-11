<template>
    <div>
        <FullPage 
        :title='title'
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
                <Button @click="addItems" type="primary" ghost icon='md-add'>新增{{title}}</Button>
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
                <Modal class-name="vertical-center-modal" @on-ok="postInfo" :title="showType == 1 ? '新增'+title: '编辑'+title" v-model="showModal" :width="480" @on-visible-change='vivibleModal'>
                    <Form :label-width="90">
                        <FormItem label="ID：">
                            <Input disabled placeholder="ID自动生成" v-model="classInfo.id"/>
                        </FormItem>
                        <FormItem label="属性名称：">
                            <div v-if="showType == 1">
                                <div class="item-attr" v-for="(item,index) of attribute" :key="index">
                                    <Input :placeholder='"请输入"+title+"名称"' v-model="item.title"/>
                                    <Icon @click="addAttr(index)" style="'margin:0 10px" :color='index == attribute.length-1 ? "#32C800" : "#FF5E5C"' size='20' :type="index == attribute.length-1 ? 'ios-add-circle' : 'md-remove-circle'" />
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
                {title:'ID',name:'Input',value:'',serverName:'p_id',placeholder:'请输入ID'},
                {title:`颜色名称`,name:'Input',value:'',serverName:'title',placeholder:`请输入颜色名称`},
            ],
            tableColums:[
                {title:'ID',align:'center',key:'id'},
                {title:`颜色`,align:'center',key:'title'},
                {title:'操作',align:'center',slot:'set',width:'150'},
            ],
            tableData:[],
            pageIndex:1,
            total:0,
            pageSize:10,
            showModal:false,
            showType:1,
            classInfo:{},
            attribute:[{title:''}],
            title:'',
            id:null,
            proxyObj:{},
            loading:false,
        }
    },
    mounted(){
        this.title = this.$route.query.title
        console.log(this.$route)
        if(this.$route.query.id){
            this.proxyObj.id = this.$route.query.id;
             this.list[1].title = `${this.title}名称`;
            this.list[1].placeholder = `请输入${this.title}名称`
            this.tableColums[1].title = this.title
            this.getData(this.proxyObj)
        }

    },
    watch:{
        $route(to){
            this.title = to.query.title;
            this.id = to.query.id;
            this.proxyObj.id = this.id
            this.list[1].title = `${this.title}名称`;
            this.list[1].placeholder = `请输入${this.title}名称`
            this.tableColums[1].title = this.title
            this.getData(this.proxyObj)
            this.classInfo.id = this.id;
        }
    },
    methods:{
        init(row){
            row.page_index = this.pageIndex;
            row.page_size = this.pageSize;
            this.proxyObj = row;
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
        vivibleModal(e){
            if(!e){
                this.showType == 1 ? this.attribute=[{title:''}] : this.classInfo={}
                this.getData(this.proxyObj)
            }
        },
        postInfo(){
            let post_url,post_data;
            if(this.showType == 1){
                post_url = '/api/properties_add';
                let result = []
                this.attribute.map(v=>result.push(v.title))
                post_data = {
                    id:this.$route.query.id,
                    title:result.join(',')
                }
            }else{
                post_url = '/api/properties_edit'
                post_data = this.classInfo;
            }
            this.axios.post(post_url,post_data).then(res=>{
                if(res.code == 200){
                    this.$Message.success(res.msg)
                    this.getData(this.proxyObj)
                }  
            })
        },
        addAttr(n){
            n == this.attribute.length-1 ? this.attribute.push({title:''}) : this.attribute.splice(n,1)
        },
        getData(row){
            this.loading = true;
            this.axios('/api/properties_index',{params:row}).then(res=>{
                this.loading = false;
                this.tableData = res.data.data;
                this.total = res.data.total;
            })
        },
        delItems(row){
            this.confirmDelete({
                content:'确认删除么？',
                then:()=>{
                    this.axios.post('/api/properties_del',{id:row.id,state:0}).then(res=>{
                        if(res.code == 200){
                            this.$Message.success(res.msg)
                            this.getData(this.proxyObj)
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