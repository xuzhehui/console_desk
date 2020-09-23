<template>
    <div>
        <FullPage 
        title='产值详情'
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
                <Button @click="back" type='primary' ghost style="margin-right:10px;" >返回</Button>
                <Button type="warning" ghost >批量导出</Button>
            </div>
            
            <template slot='set' slot-scope='{row}'>
                <div class="table-set">
                    <svg style="font-size:20px" color='green' @click="goDetial(3,row)" class="icon icon-nav" aria-hidden="true">
                        <use xlink:href="#iconxiangqing"></use>
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
                {title:'完成时间',name:'Input',start_server:'start_time',serverName:'order_no',end_server:'end_time',start_value:'',end_value:'',isDate:true,start_placeholder:'开始月份',end_placeholder:'结束月份'},
            ],
            tableColums:[
                {title:'订单编号',align:'center',key:'order_no'},
                {title:'产品',align:'center',key:'procedure'},
                {title:'部件',align:'center',key:'product'},
                {title:'部件是否贴标签',align:'center',key:'number_url'},
                {title:'测量尺寸',align:'center',key:'price'},
                {title:'单位',align:'center',key:'type'},
                {title:'芯片编号',align:'center',key:'time'},
                {title:'部件价格',align:'center',key:'time'},
                {title:'完成时间',align:'center',key:'time'},
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
            row.id = this.$route.query.id;
            this.proxyObj = row;
            this.getData(row)
        },
        getData(row){
            this.loading = true;
            this.axios('/api/out_put_value_detail',{params:row}).then(res=>{
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
        back(){this.$router.go(-1)},
    }
}
</script>

<style lang="scss" scoped>

</style>