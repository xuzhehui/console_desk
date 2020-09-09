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
            
            <template slot='set' slot-scope='{row}'>
                <div class="table-set">
                    <svg style="font-size:20px" color='#3764FF' @click="goPage(2,row)" class="icon icon-nav" aria-hidden="true">
                        <use xlink:href="#iconbianji"></use>
                    </svg>

                    <svg @click="delItems(row)" class="icon icon-nav" style="font-size:20px" color='red' aria-hidden="true">
                        <use xlink:href="#iconshanchu"></use>
                    </svg>
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
                {title:'用户名',name:'Input',value:'',serverName:'nickname',placeholder:'请输入用户名'},
                {title:'角色名',name:'Input',serverName:'group_name',value:'',placeholder:'请输入角色名'}
            ],
            tableColums:[
                {title:'ID',align:'center',key:'id'},
                {title:'用户名',align:'center',key:'nickname'},
                {title:'登录账号',align:'center',key:'account'},
                {title:'手机号',align:'center',key:'mobile'},
                {title:'角色名',align:'center',key:'group_name'},
                {title:'操作',align:'center',slot:'set',width:'150'},
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
        // this.getRoleList()
    },
    methods:{
        init(row){
            row.page_index = this.pageIndex;
            row.page_size = this.pageSize;
            this.proxyObj = row
            this.getData(row)
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