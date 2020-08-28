<template>
    <div>
        <FullPage 
        title='木材'
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
                <Button @click="goDetial(1)" type="primary" ghost icon='md-add'>新增物料</Button>
            </div>
            
            <template slot='set' slot-scope='row'>
                <div>
                    <Icon @click="goDetial(2,row.row)" size='20' style="margin-right:10px;color:#3764FF;cursor:pointer" type="ios-create-outline" />
                    <Icon @click="goDetial(3,row.row)" size='20' style="margin-right:10px;color:#32C800;cursor:pointer" type="ios-paper-outline" />
                    <Icon size='20' style="color:red;cursor:pointer"  type="ios-trash-outline" />
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
                {title:'ID',name:'Input',serverName:'id',placeholder:'请输入ID',value:''},
                {title:'材质',name:'Input',serverName:'title',placeholder:'请输入材质',value:''}
            ],
            tableColums:[
                {title:'ID',align:'center',key:'id',fixed:'left',},
                {title:'材料分类名称',align:'center',key:'type_name',width:'150'},
                {title:'材质',align:'center',key:'title',width:'150'},
                {title:'库存',align:'center',key:'stock'},
                {title:'单位',align:'center',key:'unit'},
                {title:'预警值',align:'center',key:'warning_number'},
                {title:'单价(元)',align:'center',key:'price'},
                {title:'长',align:'center',key:'long'},
                {title:'宽',align:'center',key:'width'},
                {title:'厚',align:'center',key:'high'},
                {title:'公式',align:'center',key:'formula'},
                {title:'描述',align:'center',key:'remark'},
                {title:'操作',align:'center',slot:'set',fixed:'right',width:'150'},
            ],
            tableData:[],
            pageIndex:1,
            total:0,
            pageSize:10,
            loading:false,
            proxyObj:{},
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
                path:`/cms/materialmannage/edit?id=${id}&type=${n}`,
            })
        }
    }
}
</script>

<style lang="scss" scoped>

</style>