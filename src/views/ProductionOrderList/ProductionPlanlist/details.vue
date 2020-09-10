<template>
    <div>
        <FullPage 
        title='订单详情' 
        :list='list' 
        @init='init' 
        @searchData='searchData' 
        @changePage='changePage'
        :tableColums='tableColums'
        :tableData='tableData'
        :pageIndex='pageIndex'
        :total='total'
        >   
            <div slot='titleButton'>
                <Button @click="back" style="margin-right:10px;">返回</Button>
                <Button type="primary" style="margin-right:10px;" ghost>打印清单</Button>
                <Button type="primary" ghost>批量派工单</Button>
            </div>

            <div slot='text-list' class="log-list">
                <div class="log-item" v-for="(item,index) of logList" :key="index">
                    <span>{{item.title}}：</span>
                    <span>{{item.value}}</span>
                </div>
            </div>

            <!-- <template slot='set' slot-scope='row'>
                <div>
                   <a style="color:#32C800">完成</a>
                </div>
            </template> -->
        </FullPage>
    </div>
</template>

<script>
export default {
    data(){
        return {
            order_no:null,
            logList:[{title:'系统单号',value:'10998765'}],
            list:[
                {title:'工序分类',name:'Select',serverName:'id1',placeholder:'请选择',value:'',
                    option:[
                        {label:'紧急',value:1}
                    ]
                },
                {title:'产品',name:'Select',serverName:'id1',placeholder:'请选择',value:'',
                    option:[
                        {label:'紧急',value:1}
                    ]
                },
            ],
            tableColums:[
                {title:'楼幢',align:'center',key:'house',fixed:'left',width:'120'},
                {title:'单元',align:'center',key:'unit',width:'200'},
                {title:'楼层',align:'center',key:'layer',width:'200'},
                {title:'房间号',align:'center',key:'number',width:'200'},
                {title:'产品',align:'center',key:'product_title',width:'200'},
                {title:'位置',align:'center',key:'house',width:'200'},
                {title:'部件',align:'center',key:'parts_title',width:'200'},
                {title:'左右式',align:'center',key:'product_type',width:'200'},
                {title:'包装码',align:'center',width:'200'},
                {title:'部件是否贴标签',align:'center',width:'200'},
                {title:'贴标签零部件',align:'center',width:'200'},
                {title:'工序分类',align:'center',key:'basics_procedure_title',width:'200'},
                {title:'工序',align:'procedure_title',key:'procedure_title',width:'200'},
                {title:'是否完成',align:'center',key:'is_complete',width:'200'},
                {title:'测量尺寸',align:'center',width:'200'},
                {title:'单位',align:'center',width:'200'},
                {title:'数量',align:'center',width:'200'},
                {title:'二维码',align:'center',width:'200'},
                {title:'芯片编号',align:'center',fixed:'right',width:'200'},
            ],
            tableData:[{type:'123'}],
            pageIndex:1,
            total:100,
        }
    },
    mounted(){
        this.order_no = this.$route.query.order_no;
        if(this.order_no){
            this.getDetails({order_no:this.order_no})
        }
    },
    methods:{
        init(row){

        },
        searchData(row){

        },
        back(){
            this.$router.go(-1)
        },
        getDetails(row){
            this.axios('/api/orders_produce_plan_list',{params:row}).then(res=>{
                this.tableData = res.data.list;
            })
        },
        postData(){

        },
        changePage(e){}
    }
}
</script>

<style lang="scss" scoped>
.log-list{display: flex;flex-wrap:wrap;padding:10px 0;}
</style>