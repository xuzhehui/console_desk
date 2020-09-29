<template>
    <div>
        <FullPage 
        title='工资列表'
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
                <Button @click="exportData(proxyObj)" type="warning" ghost >批量导出</Button>
            </div>
            
            <template slot='set' slot-scope='{row}'>
                <div class="table-set">
                    <svg style="font-size:20px" color='green' @click="goPage(row)" class="icon icon-nav" aria-hidden="true">
                        <use xlink:href="#iconxiangqing"></use>
                    </svg>
                </div>
            </template>
        </FullPage>
    </div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
    data(){
        return {
            list:[
                {title:'日期范围',type:'month',start_server:'start_time',end_server:'end_time',start_value:'',end_value:'',isDate:true,start_placeholder:'开始月份',end_placeholder:'结束月份'},
            ],
            tableColums:[
                {title:'年/月份',align:'center',key:'month'},
                {title:'应发金额',align:'center',key:'price'},
                {title:'操作',align:'center',slot:'set'},
            ],
            tableData:[{month:'9月份',price:'11500'}],
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
            this.proxyObj = row;
            this.getData(row)
        },
        getData(row){
            this.loading = true;
            this.axios('/api/finance_total',{params:row}).then(res=>{
                this.loading = false;
                this.tableData = res.data
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
        goPage(row){
            this.$router.push({
                path:'/cms/finance/month',
                query:{
                    title:row.month,
                }
            })
        },
        checkData(str){
            if(!str){return ''};
            str = str.split('-');
            let [year,month] = str;
            month = month<10 ? '0'+month : month;
            return `${year}-${month}`
        },
        exportData(row){
            let url = this.$store.state.ip+'/api/finance_total_export'+this.func.objToParams(this.proxyObj)
            location.href=url
        }
    }
}
</script>

<style lang="scss" scoped>

</style>