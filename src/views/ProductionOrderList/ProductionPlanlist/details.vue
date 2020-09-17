<template>
    <div>
        <FullPage 
        title='订单详情' 
        :list='list' 
        @init='init' 
        :logList='logList'
        @searchData='init' 
        @changePage='changePage'
        @selectTable='selectTable'
        :tableColums='tableColums'
        :tableData='tableData'
        :pageIndex='pageIndex'
        :total='total'
        >   
            <div slot='titleButton'>
                <Button @click="back" type='primary' ghost style="margin-right:10px;">返回</Button>
                <Button type="primary" style="margin-right:10px;" ghost>打印清单</Button>
                <Button type="primary" ghost>批量派工单</Button>
            </div>

            <template slot='set' slot-scope='{row}'>
                <div>
                    <a style="margin:0 5px">更改芯片</a>
                </div>
            </template>
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
                {title:'楼幢',name:'Input',serverName:'house',placeholder:'请输入楼幢',value:'',},
                {title:'单元',name:'Input',serverName:'unit',placeholder:'请输入楼幢',value:'',},
                {title:'楼层',name:'Input',serverName:'layer',placeholder:'请输入楼幢',value:'',},
                {title:'房间',name:'Input',serverName:'number_detail',placeholder:'请输入楼幢',value:'',},
                {title:'产品',name:'Input',serverName:'title',placeholder:'请输入产品',value:'',},
            ],
            tableColums:[
                {type:'selection',align:'center',fixed:'left',width:'100'},
                {title:'楼幢',align:'center',key:'house',width:'120'},
                {title:'单元',align:'center',key:'unit',width:'200'},
                {title:'楼层',align:'center',key:'layer',width:'200'},
                {title:'房间号',align:'center',key:'number_detail',width:'200'},
                {title:'位置',align:'center',key:'position',width:'200'},
                {title:'产品',align:'center',key:'product_title',width:'200'},
                {title:'部件',align:'center',key:'part_title',width:'200'},
                {title:'部件是否贴标签',align:'center',width:'200'},
                {title:'贴标签零部件',align:'center',width:'200'},
                {title:'工序分类',align:'center',key:'basics_procedure_title',width:'200'},
                {title:'工序',align:'procedure_title',key:'procedure_title',width:'200'},
                {title:'是否完成',align:'center',key:'is_complete',width:'200'},
                {title:'测量尺寸',align:'center',width:'200'},
                {title:'单位',align:'center',width:'200'},
                {title:'芯片编号',align:'center',width:'200'},
                {title:'操作',align:'center',fixed:'right',width:'200',slot:'set'},
            ],
            tableData:[],
            pageIndex:1,
            total:100,
            proxyObj:{},
            selects:[],
        }
    },
    mounted(){
        
    },
    methods:{
        init(row){
            this.order_no = this.$route.query.order_no;
            row.order_no = this.order_no;
            if(this.order_no){
                this.getDetails(row)
            }
        },
        searchData(row){

        },
        back(){
            this.$router.go(-1)
        },
        getDetails(row){
            this.axios('/api/orders_procedure_list',{params:row}).then(res=>{
                this.logList = res.data.detail;
                this.tableData = res.data.list;
            })
        },
        postData(){

        },
        changePage(e){},
        selectTable(e){
            let result = [];
            e.forEach(v=>result.push(v.house_id));
            this.selects = result;
            console.log(this.selects)
        }
    }
}
</script>

<style lang="scss" scoped>
.log-list{display: flex;flex-wrap:wrap;padding:10px 0;}
</style>