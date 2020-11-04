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
            
            <template slot='set' slot-scope='{row}'>
                <div class="table-set">
                    <svg style="font-size:20px" color='#3764FF' @click="goPage(2,row)" class="icon icon-nav" aria-hidden="true">
                        <use xlink:href="#iconbianji"></use>
                    </svg>

                    <svg @click="deleteItems(row)" class="icon icon-nav" style="font-size:20px" color='red' aria-hidden="true">
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
                {title:'角色名',name:'Input',serverName:'group_title',value:'',placeholder:'请输入角色名'}
            ],
            tableColums:[
                {title:'ID',align:'center',key:'id',width:'100'},
                {title:'角色名',align:'center',key:'group_title'},
                {title:'操作',align:'center',slot:'set',width:'150'},
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
                // this.list[1].option = res.data.data;
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
            const id = row ? row.id : '';
            const group_title = row ? row.group_title : ''
            const group_type = row ? row.type : ''
            this.$router.push({
                path:'/cms/personnelmanagement/role/edit',
                query:{
                    type:n,
                    id:id,
                    group_title:group_title,
                    group_type:group_type
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.nav{display: flex;justify-content: space-between;align-items: center;}
</style>