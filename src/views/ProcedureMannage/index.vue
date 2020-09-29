<template>
    <div>
        <FullPage 
        :title='$route.query.title'
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
            <div slot='titleButton' style="display:flex">
                <Upload name='your_file' :show-upload-list='false' :headers='headers' :on-error='uploadError' :on-success='uploadSuccess' :action="$store.state.ip+'/api/procedure_index_import'">
                    <Button type="success" ghost icon='md-exit' style="margin-right:10px;">批量导入</Button>
                </Upload>
                <Button @click="exportData" type="warning" ghost icon='md-return-left'>批量导出</Button>
            </div>
            <div slot='navButton'>
                <Button type="primary" ghost icon='md-add' @click="goPage(1)">新增工序</Button>
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
                {title:'工序名称',name:'Input',value:'',serverName:'title',placeholder:'请输入工序名称'},
            ],
            tableColums:[
                {title:'ID',align:'center',key:'id',width:'100'},
                {title:'工序类型',align:'center',key:'p_title'},
                {title:'工序名称',align:'center',key:'title'},
                {title:'工时',align:'center',key:'time'},
                {title:'工价',align:'center',key:'wages'},
                {title:'产能',align:'center',key:'capacity'},
                {title:'操作',align:'center',slot:'set',width:'150'},
            ],
            tableData:[],
            pageIndex:1,
            total:0,
            pageSize:10,
            showModal:false,
            showType:1,
            classInfo:{},
            proxyObj:{},
            id:null,
            loading:false,
            headers:{'Authorization':localStorage.getItem('token')},
        }
    },
    watch:{
        $route(to){
            this.id = to.query.id;
            this.proxyObj.id = this.id
            this.getData(this.proxyObj)
        }
    },
    mounted(){
        if(this.$route.query.id){
            this.id = this.$route.query.id
            this.proxyObj.id = this.id;
            this.getData(this.proxyObj)
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
            this.loading = true;
            this.axios('/api/procedure_index',{params:row}).then(res=>{
                this.loading = false;
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
        goPage(n,row){
            let id = row ? row.id : this.id
            this.$router.push({
                path:'/cms/proceduremannage/edit',
                query:{
                    type:n,
                    id:id
                }
            })
        },
        delItems(row){
            this.confirmDelete({
                content:'确认删除么？',
                then:()=>{
                    this.axios.post('/api/procedure_del',{id:row.id,state:0}).then(res=>{
                        if(res.code == 200){
                            this.$Message.success(res.msg)
                            this.getData(this.proxyObj)
                        } 
                    })
                }
            })
        },
        exportData(){
            let url = this.$store.state.ip+'/api/procedure_index_export'+this.func.objToParams(this.proxyObj)
            location.href=url
        },
        uploadSuccess(res){
            if(res.code == 200){
                this.$Message.success(res||'上传成功')
            }else{
                this.$Message.warning(res||'上传失败')
            }
            this.getData(this.proxyObj)
        },
        uploadError(err){
            this.$Message.error(err.msg||'上传失败')
        }
    }
}
</script>

<style lang="scss" scoped>
.nav{display: flex;justify-content: space-between;align-items: center;}
</style>