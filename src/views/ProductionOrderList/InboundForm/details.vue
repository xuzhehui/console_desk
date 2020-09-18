<template>
    <div>
        <FullPage 
        title='入库详情'
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
            <div slot='titleButton'>
                <Button type="warning" ghost >批量出库</Button>
            </div>
        </FullPage>
    </div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
    data(){
        return {
            list:[
                {title:'楼幢',name:'Input',value:'',width:'100'},
                {title:'单元',name:'Input',value:'',width:'100'},
                {title:'房号',name:'Input',value:'',},
                {title:'产品名称',name:'Input',value:'',},
            ],
            tableColums:[
                {type:'selection',align:'center',width:'100',},
                {title:'序号',align:'center',key:'month'},
                {title:'楼幢',align:'center',key:'price'},
                {title:'单元',align:'center',},
                {title:'楼层',align:'center',},
                {title:'房号',align:'center',},
                {title:'产品名称',align:'center',},
                {title:'部件',align:'center',},
                {title:'包装码',align:'center',},
                {title:'单位',align:'center',},
                {title:'状态',align:'center',},
                {title:'芯片编号',align:'center',},
            ],
            tableData:[],
            pageIndex:1,
            total:0,
            pageSize:10,
            loading:false,
        }
    },
    
    methods:{
        init(row){
            row.page_index = this.pageIndex;
            row.page_size = this.pageSize;
            this.proxyObj = row;
            this.getData(row)
        },
        getData(row){
            this.loading = true;
            this.axios('/api/orders_dispatch_detail',{params:row}).then(res=>{
                this.loading = false;
                this.tableData = res.data.data;
                this.total = res.data.total;
            })
        },
        changePage(e){
            this.pageIndex = e;
            this.proxyObj.page_index = e;
            this.getData(this.proxyObj)
        },
        changeSize(e){
            this.pageSize = e;
            this.proxyObj.page_size = this.pageSize;
            this.getData(this.proxyObj)
        },
    }
}
</script>

<style lang="scss" scoped>

</style>