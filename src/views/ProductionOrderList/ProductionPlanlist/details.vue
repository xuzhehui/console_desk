<template>
    <div>
        <FullPage 
        title='订单详情' 
        :list='list' 
        @init='init' 
        :logList='logList'
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
                <Button @click="goOriginalPage($route.query)" type="primary" style="margin-right:10px;" ghost>打印清单</Button>
                <Button type="primary" ghost @click="batchDispatchOrder">批量派工单</Button>
            </div>

            <template slot='set' slot-scope='{row}'>
                <div>
                    <a style="margin:0 5px" @click="setZoro(row)">更改芯片</a>
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
                {title:'楼幢',name:'Select',multiple:true,filterable:true,serverName:'house',placeholder:'请选择楼幢',value:'',
                    option:[
                        {label:1,value:1}
                    ]
                },
                {title:'单元',name:'Select',multiple:true,filterable:true,serverName:'unit',placeholder:'请选择单元',value:'',
                    option:[
                        {label:1,value:1}
                    ]
                },
                {title:'楼层',name:'Select',multiple:true,filterable:true,serverName:'layer',placeholder:'请选择楼层',value:'',
                    option:[
                        {label:1,value:1}
                    ]
                },
                {title:'房间',name:'Select',multiple:true,filterable:true,serverName:'number_detail',placeholder:'请选择房间',value:'',
                    option:[
                        {label:1,value:1}
                    ]
                },
                {title:'部件',name:'Select',multiple:true,filterable:true,value:'',serverName:'part',placeholder:'请选择部件',
                    option:[
                        {label:1,value:1}
                    ]
                },
                {title:'工序',name:'Select',multiple:true,filterable:true,value:'',serverName:'produce',placeholder:'请选择工序',
                    option:[]
                },
                {title:'产品',name:'Input',serverName:'title',placeholder:'请输入产品',value:'',},
            ],
            tableColums:[
                {type:'selection',align:'center',fixed:'left',width:'100'},
                {title:'楼幢',align:'center',key:'house',minWidth:100},
                {title:'单元',align:'center',key:'unit',minWidth:100},
                {title:'楼层',align:'center',key:'layer',minWidth:100},
                {title:'房间号',align:'center',key:'number_detail',minWidth:100},
                {title:'位置',align:'center',key:'position',minWidth:100},
                {title:'产品',align:'center',key:'product_title',minWidth:200},
                {title:'部件',align:'center',key:'part_title',minWidth:200},
                {title:'部件是否贴标签',align:'center',minWidth:200,
                    render:(h,params)=>h('span',{},params.row.label == 1 ? '是' : '否')
                },
                {title:'贴标签零部件',align:'center',minWidth:200,
                    render:(h,params)=>h('span',{},params.row.sub_label == 1 ? '是' : '否')
                },
                {title:'工序分类',align:'center',key:'basics_procedure_title',minWidth:200},
                {title:'工序',align:'center',key:'procedure_title',minWidth:200},
                {title:'是否完成',align:'center',key:'is_complete',minWidth:200},
                {title:'测量尺寸',align:'center',minWidth:200,key:'measurement'},
                {title:'单位',align:'center',minWidth:200,key:'company'},
                {title:'芯片编号',align:'center',key:'chip',minWidth:200},
                {title:'操作',align:'center',fixed:'right',width:'200',slot:'set'},
            ],
            tableData:[],
            pageIndex:1,
            pageSize:10,
            total:100,
            proxyObj:{},
            selects:[],
        }
    },
    created(){
        this.getOptions()
    },
    methods:{
        init(row){
            row.page_index = this.pageIndex;
            row.page_size = this.pageSize;
            this.order_no = this.$route.query.order_no;
            Object.assign(row,this.$route.query)
            if(this.func.isType(row.house) == 'Array'){
                row.house = row.house.join(',')
            }
            if(this.func.isType(row.unit) == 'Array'){
                row.unit = row.unit.join(',')
            }
            if(this.func.isType(row.layer) == 'Array'){
                row.layer = row.layer.join(',')
            }
            if(this.func.isType(row.number_detail) == 'Array'){
                row.number_detail = row.number_detail.join(',')
            }
            if(this.func.isType(row.part) == 'Array'){
                row.part = row.part.join(',')
            }
            if(this.func.isType(row.produce) == 'Array'){
                row.produce = row.produce.join(',')
            }
            this.proxyObj = row
            this.getData(row)
        },
        getOptions(){
            this.axios('/api/order_detail_word',{params:{order_no:this.$route.query.order_no}})
            .then(res=>{
                res.data.house.map(v=>{v.value = v.house;v.label = v.house})
                res.data.unit.map(v=>{v.value = v.unit;v.label = v.unit})
                res.data.layer.map(v=>{v.value = v.layer;v.label = v.layer})
                res.data.number_detail.map(v=>{v.value = v.number_detail;v.label = v.number_detail})
                res.data.part.map(v=>{v.value = v.title;v.label = v.title})
                res.data.produce.map(v=>{v.value=v.title,v.value=v.title})
                this.list[0].option = res.data.house;
                this.list[1].option = res.data.unit;
                this.list[2].option = res.data.layer;
                this.list[3].option = res.data.number_detail;
                this.list[4].option = res.data.part;
                this.list[5].option = res.data.produce;
            })
        },
        searchData(row){

        },
        back(){
            this.$router.go(-1)
        },
        getData(row){
            this.axios('/api/orders_procedure_list',{params:row}).then(res=>{
                this.logList = res.data.detail;
                this.tableData = res.data.list;
                this.total = res.data.total
            })
        },
        postData(){

        },
        changePage(e){
            this.pageIndex = e;
            this.proxyObj.page_index = e;
            this.getData(this.proxyObj)
        },
        selectTable(e){
            let result = [];
            e.forEach(v=>result.push(v.house_id));
            this.selects = result;
        },
        setZoro(row){
        },
        batchDispatchOrder(){
            if(!this.selects||this.selects.length<1){return this.$Message.error('请至少选择一项')}
            this.dispatchOrder({
                params:{house_id:this.selects.join(',')},
                then(res){}
            })
        },
        changeSize(e){
            this.pageSize = e;
            this.proxyObj.page_size = this.pageSize;
            this.getData(this.proxyObj)
        },
        goOriginalPage(row){
            this.$router.push({
                path:'/cms/rawmateria/index',
                query:{
                    order_no:row.order_no,
                    type:4
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.log-list{display: flex;flex-wrap:wrap;padding:10px 0;}
</style>