<template>
    <div>
        <FullPage 
        title='完工单'
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
                <Button type="primary" ghost>批量打印</Button>
            </div>
            
            <template slot='set' slot-scope='{row}'>
                <div>
                    <a @click="goDetial(row)">详情</a>
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
                {title:'订单编号',name:'Input',serverName:'order-no',placeholder:'请输入订单编号',value:''},
                {title:'派工类型',name:'Input',serverName:'type',placeholder:'请选择',value:''},
                {title:'下单日期范围',name:'Input',start_server:'start_time',end_server:'end_time',start_value:'',end_value:'',isDate:true,serverName:'id2',start_placeholder:'开始日期',end_placeholder:'结束日期'}
            ],
            tableColums:[
                {title:'订单编号',align:'center',key:'order_no',fixed:'left',width:'200'},
                {title:'订单类型',align:'center',key:'show_type',minWidth:150},
                {title:'紧急程度',align:'center',key:'show_warning_state',minWidth:150},
                {title:'小区名称',align:'center',key:'residential_name',minWidth:200},
                {title:'交付时间',align:'center',key:'show_predict_time',minWidth:200},
                {title:'客户',align:'center',key:'client_name',minWidth:150},
                {title:'手机号',align:'center',key:'mobile',minWidth:150},
                {title:'订单状态',align:'center',key:'show_sub_state',minWidth:100},
                {title:'操作',align:'center',slot:'set',fixed:'right',width:'100'},
            ],
            tableData:[],
            pageIndex:1,
            total:0,
            proxyObj:{},
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
        changePage(e){
            this.pageIndex = e;
            this.proxyObj.page_index = this.pageIndex;
            this.getData(this.proxyObj)
        },
        changeSize(e){
            this.pageSize = e;
            this.proxyObj.page_size = this.page_size;
            this.getData(this.proxyObj)
        },
        getData(row){
            this.loading = true;
            this.axios('/api/orders_confirm_list',{params:row}).then(res=>{
                this.loading = false;
                if(res.code == 200){
                    res.data.data.map(v=>{
                        v.show_type = v.type == 1 ? '业务订单' : '代理商订单'
                        v.show_warning_state = v.warning_state == 0 ? '不急' : (v.warning_state == 1 ? '比较急' : (v.warning_state == 2 ? '紧急' : '非常急'))
                        v.show_predict_time = this.func.replaceDate(v.predict_time)
                        v.show_sub_state = v.sub_state == 0 ? '测量未审核' : (v.sub_state == 1 ? '测量审核' : 
                        (v.sub_state == 2 ? '测量通过' : (v.sub_state == 3 ? '生产审核中' : (v.sub_state == 4 ? '生产通过' : '到生产计划'))))
                    })
                }
                
            })
            this.tableData.push({order_no:'123'})
        },
        goDetial(row){
            this.$router.push({
                path:'/cms/productionorderlist/completionlist/decorationlist',
                query:{
                    id:row.id
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
</style>