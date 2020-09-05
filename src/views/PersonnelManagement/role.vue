<template>
    <div class="user">
        <FullPage 
        title='角色管理'
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
                <Button type="primary" ghost icon='md-add' @click="goPage(1)">新增角色</Button>
            </div>
            
            <template slot='set' slot-scope='row'>
                <div>
                    <Icon @click="goPage(2,row.row)" size='20' style="margin-right:10px;color:#3764FF;cursor:pointer" type="ios-create-outline" />
                    <Icon @click="deleteItems(row.row)" size='20' style="margin-left:10px;color:red;cursor:pointer" type="ios-trash-outline" />
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
                {title:'ID',name:'Input',value:'',serverName:'ids',placeholder:'请输入ID'},
                {title:'角色类型',name:'Select',serverName:'group_title',value:'',option:[
                    {label:'管理员',value:1},
                    {label:'游客',value:2}
                ]}
            ],
            tableColums:[
                {title:'ID',align:'center',key:'id'},
                {title:'角色名',align:'center',key:'group_title'},
                {title:'操作',align:'center',slot:'set'},
            ],
            tableData:[],
            pageIndex:1,
            total:0,
            pageSize:10,
            proxyObj:{},
            loading:false,
        }
    },
    methods:{
        init(row){
            row.page_index = this.pageIndex;
            row.page_size = this.pageSize;
            this.proxyObj = row
            this.getData(row)
        },
        getData(row){
            this.loading = true
            this.axios('/api/group',{params:row}).then(res=>{
                this.loading = false
                res.data.data.map(v=>{v.value = v.id;v.label=v.group_title})
                this.list[1].option = res.data.data;
                this.tableData = res.data.data;
                this.total = res.data.total;
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
        deleteItems(row){
            this.confirmDelete({
                content:'删除后该角色下的所有信息将被删除，订单中已使用的角色信息将会保留不变',
                then:()=>{
                    this.axios.post('/api/group',{id:row.id,state:0,op:'edit'}).then(res=>{
                        this.getData(this.proxyObj)
                    })
                }
            })
        },
        goPage(n,row){
            let id = row ? row.id : '';
            let group_title = row ? row.group_title : ''
            this.$router.push({
                path:'/cms/personnelmanagement/role/edit',
                query:{
                    type:n,
                    id:id,
                    group_title:group_title,
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.nav{display: flex;justify-content: space-between;align-items: center;}
</style>