<template>
    <div>
        <FullPage 
        title='生产订单详情'
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
                <Button  @click="back" type='primary' ghost  style="margin-right:10px;">返回</Button>
                <Button type="primary" ghost style="margin-right:10px;">批量修改工艺路线</Button>
                <Button type="primary" ghost style="margin-right:10px;" @click='openModal(selects)'>批量下生产计划</Button>
                <Button type="primary" ghost>批量打印订单</Button>
            </div>
            
            <template slot='set' slot-scope='{row}'>
                <div class="table-set">
                    <a >更改芯片</a>
                    <a @click="openModal(row)">下生产计划</a>
                    <a @click="downImg($store.state.ip+row.url,row.product_title)" >下载图纸</a>
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
                {title:'按房号',name:'Input',value:'',serverName:'number',placeholder:'请输入ID'},
                {title:'产品名称',name:'Input',value:'',serverName:'title',placeholder:'请输入产品名称'},
                {title:'是否存在工艺路线',name:'Select',value:'',serverName:'process_router',
                    option:[
                        {label:'是',value:1},
                        {label:'否',value:0,}
                    ]
                },
            ],
            tableColums:[
                {type:'selection',fixed:'left',width:'100',align:'center'},
                {title:'楼幢',align:'center',key:'house',minWidth:100},
                {title:'单元',align:'center',key:'unit',minWidth:100},
                {title:'楼层',align:'center',key:'layer',minWidth:100},
                {title:'房号',align:'center',key:'number_detail',minWidth:100},
                {title:'单价',align:'center',key:'price',minWidth:100},
                {title:'产品',align:'center',key:'product_title',minWidth:150},
                {title:'部件名',align:'center',key:'part_title',minWidth:200},
                {title:'部件相关',align:'center',key:'properties',minWidth:200},
                {title:'芯片',align:'center',key:'',minWidth:200},
                {title:'预估房号工期',align:'center',key:'predict_time',minWidth:200},
                {title:'操作',align:'center',slot:'set',width:'280',fixed:'right'},
            ],
            tableData:[],
            pageIndex:1,
            total:100,
            showModal:false,
            showType:1,
            logList:[],
            classInfo:{},
            proxyObj:{},
            showPlan:false,
            planInfo:{
                order_product_id:null,
                start_time:'',
                end_time:''
            },
            selects:[],
            order_no:null,
            loading:false,
        }
    },
    methods:{
        init(row){
            row.page_index = this.pageIndex;
            row.page_size = this.pageSize;
            Object.assign(row,this.$route.query)
            this.proxyObj = row;
            this.getData(row)
        },
        getData(row){
            this.loading = true
            this.axios('/api/orders_produce_parts_list',{params:row}).then(res=>{
                this.loading = false;
                this.order_no = res.data.order_no;
                this.logList = res.data.detail
                this.tableData = res.data.list;
                this.total = res.data.total
            })
        },
        goDetail(row){
            this.$router.push({
                path:'/cms/productionorderlist/productionsorder/details',
                query:{
                    house_id:row.house_id,
                    type:'produce'
                }
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
        back(){
            this.$router.go(-1)
        },
        openModal(row){
            if(Array.isArray(row)){//批量下生产操作
                if(row.length<1){return this.$Message.warning('请至少选择一项')}
                let result = [];
                row.map(v=>result.push(v.order_product_id))
                this.planInfo.order_product_id = result.join(',')
            }else{//单个下生产
                this.planInfo.order_product_id = row.order_product_id;
            }
            this.downProduction({
                title:'下生产计划',
                type:1,
                params:this.planInfo,
                then:(e)=>{},
                cancel:(e)=>{},
            })
        },
        selectTable(e){
            this.selects = e;
        },
        vivibleModal(e){
            if(!e){
                this.planInfo = {
                    order_no:null,
                    start_time:'',
                    end_time:''
                }
            }
        },
        downImg(url,filename){                 
            let img = new Image();
            img.onload=e=>{
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;   
                if(canvas.getContext){
                    let context = canvas.getContext('2d')
                    context.drawImage(img,0,0,img.width,img.height)//绘制图纸
                    let downUrl = canvas.toDataURL('image/png')
                    let link = document.createElement('a');
                    link.href = downUrl;
                    link.style.display = 'none';
                    link.download = filename||'图纸.png'; // 文件名称
                    document.body.appendChild(link);
                    link.click();
                    URL.revokeObjectURL(link.href); //释放URL对象
                    document.body.removeChild(link);
                }
            }; 
            img.src = url
            img.crossOrigin = "anonymous"
        }
    }
}
</script>

<style lang="scss" scoped>
.nav{display: flex;justify-content: space-between;align-items: center;}
.table-set{a{margin:0 5px;}}
</style>