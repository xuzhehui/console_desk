<template>
    <div>
        <FullPage 
        @init='init'
        :list='list'
        @searchData='init'
        title='计量单位列表'
        @changePage='changePage'
        @changeSize='changeSize'
        :pageIndex='pageIndex'
        :total='total'
        :loading='loading'
        :tableColums='tableColums'
        :tableData='tableData'
        >
            <div slot='titleButton'>
                <Button  type="primary" @click="addItems(null)">新增计量单位</Button>
            </div>
            <template slot='set' slot-scope='{row}'>
                 <div class="table-set">
                    <Button size='small' type='primary' class="map-margin" @click="addItems(row)">编辑</Button>
                    <Button size='small' type='error' class="map-margin" @click="delItems(row)">删除</Button>
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
                {name:'Input',title:'计量单位名称',value:'',serverName:'title',placeholder:'请输入权限名称'},
            ],
            tableColums:[
                {title:'计量单位编码',align:'center',key:'unit_code',width:200,fixed:'left'},
                {title:'计量单位名称',align:'center',key:'title',minWidth:100},
                {title:'操作',align:'center',slot:'set',width:'180',fixed:'right'},
            ],
            tableData:[
                {
                    title:'单位',unit_code:'001',id:1,
                }
            ],
            loading:false,
            pageIndex:1,
            pageSize:10,
            total:10,
            proxyObj:{},
            show:false,
        }
    },
    methods:{
        init(row){
            row.page_index = this.pageIndex
            row.page_size = this.pageSize
            this.proxyObj = row
            this.getData(row)
        },
        getData(row){
            this.loading = true;
            this.axios('/api/notice_message/list',{params:row}).then(res=>{
                this.loading = false;
                this.tableData = res.data||res.data.data;
            })
        },
        delItems(row){
            this.confirmDelete({
                content:'确认删除么？',
                then:()=>{
                    this.axios.post('/api/notice_message/del',{id:row.id}).then(res=>{
                        if(res.code == 200){
                            this.$Message.success(res.msg||'操作成功')
                            this.getData(this.proxyObj)
                        }
                    })
                }
            })
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
        addItems(row){
            console.log(row)
            this.confirmEdit({
                title:row&&row.id ? '编辑' : '新增',
                info:row&&row.id ? row.title : '',
                placeholder:'请输入计量单位名称',
                then:(val)=>{
                    console.log(val)
                },
                cancel:()=>{}
            })
        }
    }
}
</script>

<style lang="scss" scoped>
</style>