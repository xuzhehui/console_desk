<template>
    <div>
        <FullPage 
        title='安装详情'
        :list='list' 
        @init='init' 
        :logList='logList'
        :loading='loading'
        @searchData='init' 
        @changePage='changePage'
        @changeSize='changeSize'
        @selectTable='selectTable'
        :tableColums='tableColums'
        :tableData='tableData'
        :pageIndex='pageIndex'
        :total='total'
        >
            <div slot='titleButton'>
                <Button @click="back" type='primary' ghost style="margin-right:10px;">返回</Button>
                <Button @click="confirmSuccess(selects)" type="success" ghost style="margin-right:10px;" >批量完成</Button>
            </div>
            <template slot-scope="{ row }" slot="set">
                <a class="map-margin" v-if='row.sub_state!=3' @click="confirmSuccess(row)">完成</a>
                <span v-else>已完成</span>
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
                {title:'楼幢',name:'Input',serverName:'house',value:'',width:'50'},
                {title:'单元',name:'Input',serverName:'unit',value:'',width:'50'},
                {title:'房号',name:'Input',serverName:'number_detail',value:'',placeholder:'请输入房号'},
                {title:'产品名称',name:'Input',serverName:'product_title',value:'',placeholder:'请输入产品名称'},
            ],
            logList:[],
            tableColums:[
                {type:'selection',align:'center',width:'100',fixed:'left'},
                {title:'订单编号',align:'center',key:'',minWidth:200},
                {title:'楼幢',align:'center',key:'house',minWidth:100},
                {title:'单元',align:'center',minWidth:100,key:'layer'},
                {title:'楼层',align:'center',minWidth:100,key:'unit'},
                {title:'房号',align:'center',minWidth:100,key:'number_detail'},
                {title:'产品名称',align:'center',minWidth:200,key:'product_title'},
                {title:'位置',align:'center',minWidth:200,key:'position'},
                {title:'出库时间',align:'center',minWidth:200,key:'dispatch_time'},
                {title:'运输开始时间',align:'center',minWidth:200,key:'transport_time'},
                {title:'实际结束时间',align:'center',minWidth:200,key:'end_time'},
                {title:'实际运输时间',align:'center',minWidth:200,key:'at_time'},
                {title:'操作',align:'center',width:'150',fixed:'right',slot:'set'},
            ],
            tableData:[],
            pageIndex:1,
            total:0,
            pageSize:10,
            loading:false,
            selects:[],
            selects_out:[],
            showStock:false,
            info:{
                user_id:'',
                work_type:2,
                order_in_no:'',
                start_time:'',
                end_time:'',
                user_salary:''
            },
            users:[],
            time:''
        }
    },
    
    methods:{
        init(row){
            this.axios('/api/user').then(res=>this.users = res.data.data)
            row.page_index = this.pageIndex;
            row.page_size = this.pageSize;
            Object.assign(row,this.$route.query)
            this.proxyObj = row;
            this.getData(row)
        },
        getData(row){
            this.loading = true;
            this.axios('/api/orders_list_detail',{params:row}).then(res=>{
                this.loading = false;
                this.tableData = res.data.data;
                this.logList = res.data.detail
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
        selectTable(row){
            let result = [],outResult = [];
            row.map(v=>{
                v.orders_procedure_id ? result.push(v.orders_procedure_id) : ''
            })
            this.selects = result
            this.selects_out = outResult
        },
        confirmSuccess(row){
            let params = '';
            if(!row||row.length<1){return this.$Message.error('请至少选择一项')}
            params = Array.isArray(row) ? row.join(',') : row.orders_procedure_id
            this.confirmDelete({
                title:'确认完成么',
                content:'确认完成？',
                type:'primary',
                then:()=>{
                    this.axios.post('/api/orders_dispatch_confirm',{orders_procedure_id:params})
                    .then(res=>{
                        if(res.code == 200){
                            this.$Message.success(res.msg);
                            this.getData(this.proxyObj)
                        }
                    })
                },
                cancel:()=>{
                    this.$Message.warning('您取消了确认入库操作')
                }
            })
        },
    }
}
</script>

<style lang="scss" scoped>

</style>