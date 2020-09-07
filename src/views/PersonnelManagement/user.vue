<template>
    <div class="user">
        <FullPage 
        title='用户管理'
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
                <Button type="primary" ghost icon='md-add' @click="goPage(1)">新增用户</Button>
            </div>
            
            <template slot='set' slot-scope='row'>
                <div>
                    <Icon size='20' @click="goPage(2,row.row)" style="margin-right:10px;color:#3764FF;cursor:pointer" type="ios-create-outline" />
                    <Icon size='20' @click="delItems(row.row)" style="margin-left:10px;color:red;cursor:pointer" type="ios-trash-outline" />
                </div>
            </template>
        </FullPage>
    </div>
</template>

<script>
export default {
    data(){
        return {
            list:[
                {title:'ID',name:'Input',value:'',serverName:'id',placeholder:'请输入ID'},
                {title:'用户名',name:'Input',value:'',serverName:'nickname',placeholder:'请输入用户名'},
                {title:'角色名',name:'Select',serverName:'group_id',value:'',option:[
                    {label:'管理员',value:1},
                    {label:'游客',value:2}
                ]}
            ],
            tableColums:[
                {title:'ID',align:'center',key:'id'},
                {title:'用户名',align:'center',key:'nickname'},
                {title:'登录账号',align:'center',key:'account'},
                {title:'手机号',align:'center',key:'mobile'},
                {title:'角色名',align:'center',key:'group_name'},
                {title:'操作',align:'center',slot:'set'},
            ],
            roleList:[],
            tableData:[],
            pageIndex:1,
            total:0,
            pageSize:10,
            proxyObj:{},
            loading:false,
        }
    },
    mounted(){
        this.getRoleList()
    },
    methods:{
        init(row){
            row.page_index = this.pageIndex;
            row.page_size = this.pageSize;
            this.proxyObj = row
            this.getData(row)
        },
        getRoleList(){
            this.loading = true;
            this.axios('/api/group').then(res=>{
                this.loading = false
                res.data.data.map(v=>{v.value = v.id;v.label=v.group_title})
                this.list[2].option = res.data.data;
            })
        },
        getData(row){
            this.axios('/api/user',{params:row}).then(res=>{
                this.tableData = res.data.data;
                this.total = res.data.total;
            })
        },
        delItems(row){
            this.confirmDelete({
                content:'删除后，该关联用户将不能正常登录使用权限',
                then:()=>{
                    this.axios.post('/api/user',{id:row.id,state:0,op:'edit'}).then(res=>{
                        if(res.code == 200){
                            this.$Message.success(res.msg)
                            this.getData(this.proxyObj)
                        } 
                    })
                }
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
        goPage(n,row){
            let id = row ? row.id : ''
            this.$router.push({
                path:'/cms/personnelmanagement/user/edit',
                query:{
                    type:n,
                    id:id
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.nav{display: flex;justify-content: space-between;align-items: center;}
</style>