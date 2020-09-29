<template>
    <div>
        <FullPage 
        :title='$route.query.name+"工资详情"'
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
                <Button @click="exportData" type="warning" ghost >批量导出</Button>
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
                {title:'订单号',name:'Input',value:'',serverName:'order_no',placeholder:'请输入订单号'},
                {title:'工序',name:'Input',value:'',serverName:'procedure',placeholder:'请输入工序'},
                {title:'产品名称',name:'Input',value:'',serverName:'product',placeholder:'请输入产品名称'},
                {title:'日期范围',type:'month',name:'Input',start_server:'start_time',serverName:'order_no',end_server:'end_time',start_value:'',end_value:'',isDate:true,start_placeholder:'开始月份',end_placeholder:'结束月份'},
                {title:'工价',name:'Input',value:'',serverName:'price',placeholder:'请输入工价'},
            ],
            tableColums:[
                {title:'订单号',align:'center',key:'order_no'},
                {title:'工序',align:'center',key:'procedure_name'},
                {title:'产品名称',align:'center',key:'product_name'},
                // {title:'图号(元)',align:'center',key:'number_url'},
                {title:'工价',align:'center',key:'price'},
                {title:'天/计件',align:'center',key:'type',
                    render:(h,params)=>h('span',{},params.row.type == 0 ? '天' : '件')
                },
                {title:'时间',align:'center',key:'time',
                    render:(h,params)=>h('span',{},this.func.replaceDate(params.row.time*1))
                },
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
            row.start_time = this.checkData(row.start_time)
            row.end_time = this.checkData(row.end_time)
            Object.assign(row,this.$route.query)
            this.proxyObj = row;
            this.getData(row)
        },
        getData(row){
            this.loading = true;
            this.axios('/api/finance_total_product_detail',{params:row}).then(res=>{
                this.loading = false;
                this.tableData = res.data.data;
                this.total = res.data.total||0;
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
        checkData(str){
            if(!str){return ''};
            str = str.split('-');
            let [year,month] = str;
            month = month<10 ? '0'+month : month;
            return `${year}-${month}`
        },
        exportData(){
            let url = this.$store.state.ip+'/api/finance_total_product_detail_export'+this.func.objToParams(this.proxyObj)
            location.href=url
        }
    }
}
</script>

<style lang="scss" scoped>

</style>