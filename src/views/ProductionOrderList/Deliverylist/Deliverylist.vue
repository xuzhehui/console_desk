<template>
    <div>
        <FullPage 
        title='出库表'
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
                
            </div>
            
            <template slot='set' slot-scope='{row}'>
                <a @click="confirmOutStock(row,1)" class="map-margin">确认出库</a>
                <a @click="confirmOutStock(row,2)" class="map-margin">确认运输</a>
            </template>
        </FullPage>
    </div>
</template>

<script>
export default {
    data(){
        return {
            list:[
                {title:'订单编号',name:'Input',serverName:'id',placeholder:'请输入订单编号',value:''},
                {title:'派工类型',name:'Input',serverName:'id1',placeholder:'请选择',value:''},
                {title:'出库日期范围',name:'Input',start_value:'',end_value:'',isDate:true,start_placeholder:'开始日期',end_placeholder:'结束日期'}
            ],
            tableColums:[
                {title:'订单编号',align:'center',key:'order_no',fixed:'left',width:'200'},
                {title:'订单类型',align:'center',key:'type_name',width:'150',
                    render:(h,params)=>h('span',{},params.row.type == 1 ? '工装' : '家装')
                },
                {title:'紧急程度',align:'center',key:'title',width:'150'},
                {title:'小区名称',align:'center',key:'residential_name',width:'150'},
                {title:'出库时间',align:'center',key:'unit',width:'150'},
                {title:'客户',align:'center',key:'warning_number',width:'150'},
                {title:'手机号',align:'center',key:'mobile',width:'150'},
                {title:'订单状态',align:'center',key:'long',width:'150'},
                {title:'操作',align:'center',slot:'set',fixed:'right',width:'200'},
            ],
            tableData:[],
            pageIndex:1,
            total:100,
            proxyObj:{},
            loading:false,
        }
    },
    methods:{
        init(row){
            this.proxyObj = row;
            this.getData(row)
        },
        getData(row){
            this.loading = true;
            this.axios('/api/orders_out_list',{params:row}).then(res=>{
                this.loading = false;
                if(res.code == 200){
                    this.tableData = res.data.data
                }
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
        confirmOutStock(row,type){//type 1出库  2运输
            let post_url = type == 1 ? '/api/orders_out_confirm' : '/api/orders_transport_complete'
            this.confirmDelete({
                title:'确认出库',
                content:'确认出库么？',
                type:'primary',
                then:e=>{
                    this.axios.post(post_url,{transport_no:row.transport_no}).then(res=>{
                        if(res.code == 200){
                            this.getData(this.proxyObj)
                        }
                    })
                },
                cancel:e=>{
                    console.log(e)
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
</style>