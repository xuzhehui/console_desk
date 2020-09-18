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
            <div slot='titleButton'>
                <Button @click="back" type='primary' ghost style="margin-right:10px;" >返回</Button>
                <Button type="warning" ghost >批量导出</Button>
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
export default {
    data(){
        return {
            list:[
                {title:'人员名称',name:'Input',serverName:'user_name',value:'',placeholder:'请输入人名'}
            ],
            tableColums:[
                {title:'月份',align:'center',key:'month'},
                {title:'人名',align:'center',key:'user'},
                {title:'数量',align:'center',key:'number'},
                {title:'应发金额(元)',align:'center',key:'price'},
                {title:'操作',align:'center',slot:'set'},
            ],
            tableData:[{month:'9月份',user:'小红',number:'147',price:'11500'}],
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
            this.axios('/api/month_salary_list',{params:row}).then(res=>{
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
        goPage(row){
            this.$router.push({
                path:'/cms/finance/salary',
                query:{
                   title:row.user,
                   id:row.id||''
                }
            })
        },
        back(){this.$router.go(-1)},
    }
}
</script>

<style lang="scss" scoped>

</style>