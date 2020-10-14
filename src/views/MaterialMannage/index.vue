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

            <div slot='titleButton' style="display:flex;">
                <Upload name='your_file' :show-upload-list='false' :headers='headers' :on-error='uploadError' :on-success='uploadSuccess' :action="$store.state.ip+'/api/material_import'">
                    <Button type="success" ghost icon='md-exit' style="margin-right:10px;">批量导入</Button>
                </Upload>
                <Button @click="exportData" type="warning" ghost icon='md-return-left'>批量导出</Button>
            </div>
            <div slot='navButton'>
                <Button @click="goDetial(1)" type="primary" ghost icon='md-add'>新增物料</Button>
            </div>
            
            <template slot='set' slot-scope='{row}'>
                <div class="table-set">
                    <svg style="font-size:20px" color='#3764FF'  @click="goDetial(2,row)" class="icon icon-nav" aria-hidden="true">
                        <use xlink:href="#iconbianji"></use>
                    </svg>

                    <svg style="font-size:20px" color='green' @click="goDetial(3,row)" class="icon icon-nav" aria-hidden="true">
                        <use xlink:href="#iconxiangqing"></use>
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
                {title:'物料',name:'Input',serverName:'title',placeholder:'请输入物料',value:''}
            ],
            tableColums:[
                {title:'ID',align:'center',key:'id',fixed:'left',width:'100'},
                {title:'材料分类名称',align:'center',key:'m_title',minWidth:150},
                {title:'物料名称',align:'center',key:'title',minWidth:150},
                {title:'库存',align:'center',key:'stock',minWidth:150},
                {title:'单位',align:'center',key:'unit',minWidth:100},
                {title:'预警值',align:'center',key:'warning_number',minWidth:100},
                {title:'单价(元)',align:'center',key:'price',minWidth:120},
                {title:'长',align:'center',key:'long',minWidth:100},
                {title:'宽',align:'center',key:'width',minWidth:100},
                {title:'厚',align:'center',key:'high',minWidth:100},
                {title:'损耗',align:'center',key:'scale',minWidth:200},
                {title:'描述',align:'center',key:'remark',minWidth:200},
                {title:'操作',align:'center',slot:'set',fixed:'right',width:'150'},
            ],
            tableData:[],
            pageIndex:1,
            total:0,
            pageSize:10,
            loading:false,
            proxyObj:{},
            headers:{'Authorization':localStorage.getItem('token')},
        }
    },
    watch:{
        $route(to){
            this.proxyObj.type_id = to.query.id;
            this.getData(this.proxyObj)
        }
    },
    methods:{
        init(row){
            row.page_index = this.pageIndex;
            row.page_size = this.pageSize;
            row.type_id = this.$route.query.id;
            this.proxyObj = row
            this.getData(row)
        },
        getData(row){
            this.loading = true;
            this.axios('/api/material',{params:row}).then(res=>{
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

        goDetial(n,row){// n = 1 新增 2 编辑 3 查看 
            let id = row ? row.id : ''
            this.$router.push({
                path:`/cms/materialmannage/edit`,
                query:{
                    id:id,
                    type:n,
                    back_id:this.$route.query.id
                }
            })
        },
        delItems(row){
            this.confirmDelete({
                content:'确认删除么？',
                then:()=>{
                    this.axios.post('/api/material',{id:row.id,state:0,op:'edit'}).then(res=>{
                        if(res.code == 200){
                            this.$Message.success(res.msg)
                            this.getData(this.proxyObj)
                        } 
                    })
                }
            })
        },
        exportData(){
            let url = this.$store.state.ip+'/api/material_export'+this.func.objToParams(this.proxyObj)
            location.href=url
        },
        uploadSuccess(res){
            if(res.code == 200){
                this.$Message.success(res.msg||'上传成功')
            }else{
                this.$Message.warning(res.msg||'上传失败')
            }
            this.getData(this.proxyObj)
        },
        uploadError(err){
            this.$Message.error(err||'上传失败')
        }
    }
}
</script>

<style lang="scss" scoped>

</style>