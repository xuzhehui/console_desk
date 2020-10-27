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
                <Button type="primary" ghost style="margin-right:10px;" @click="showBatchModal = true">批量绑定芯片</Button>
                <Button type="primary" ghost style="margin-right:10px;">批量修改工艺路线</Button>
                <Button type="primary" ghost style="margin-right:10px;" @click='openModal(selects)'>批量下生产计划</Button>
                <Button type="primary" ghost>批量打印订单</Button>
            </div>
            
            <template slot='set' slot-scope='{row}'>
                <div class="table-set">
                    <a @click="bingChip(row)">绑定芯片</a>
                    <a v-if="row.tagnum&&row.part_tag">更换芯片</a>
                    <a @click="openModal(row)">下生产计划</a>
                    <a @click="downImg(row.url,row.product_title)">下载图纸</a>
                </div>
            </template>

            <Modal @on-ok="saveChip" class-name="vertical-center-modal" title='绑定芯片' v-model="showChip" :width='300' @on-visible-change='vivibleModal'>
                <Form>
                    <FormItem label='芯片编号'>
                        <Input v-model="chipInfo.tag" placeholder="请输入芯片编号"></Input>
                    </FormItem>
                </Form>
            </Modal>

            <Modal title="批量绑定" fullscreen v-model="showBatchModal" @on-visible-change='visibleBatchModal'>
                <div class="batch-content">
                    <div style="margin-right:10px;width:60%;">
                        <Table @on-selection-change='batchSelect' border stripe :columns="batchTablePartsColumn" :data='batchTablePartsData'></Table>
                    </div>
                    <div style="margin-left:10px;width:40%;">
                        <Table border stripe :columns='batchChipColumns' :data='batchChipData'></Table>
                    </div>
                </div>
                <div class="batch-footer"><Page :total="batchTotal" show-total /></div>
                <div slot='footer' class="modal-footer">
                    <Button @click="showBatchModal = false">取消</Button>
                    <Button type="primary" @click="batchBindChip">确认绑定</Button>
                </div>
            </Modal>
        </FullPage>
    </div>
</template>

<script>
export default {
    data(){
        return {
            list:[
                {title:'按楼幢',name:'Select',multiple:true,filterable:true,value:'',serverName:'house',placeholder:'请选择楼幢',
                    option:[]
                },
                {title:'按单元',name:'Select',multiple:true,filterable:true,value:'',serverName:'unit',placeholder:'请选择单元',
                    option:[]
                },
                {title:'按楼层',name:'Select',multiple:true,filterable:true,value:'',serverName:'layer',placeholder:'请选择楼层',
                    option:[]
                },
                {title:'按房号',name:'Select',multiple:true,filterable:true,value:'',serverName:'number_detail',placeholder:'请选择房号',
                    option:[]
                },
                {title:'按部件',name:'Select',multiple:true,filterable:true,value:'',serverName:'part',placeholder:'请选择部件',
                    option:[]
                },
                {title:'按工序',name:'Select',multiple:true,filterable:true,value:'',serverName:'produce',placeholder:'请选择工序',
                    option:[]
                },
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
                {title:'芯片',align:'center',key:'chip',minWidth:200},
                {title:'部件是否贴标签',align:'center',minWidth:200,
                    render:(h,params)=>h('span',{},params.row.label == 1 ? '是' : '否')
                },
                {title:'零部件名称',align:'center',key:'sub_label',minWidth:200},
                {title:'零部件是否贴标签',align:'center',minWidth:200,
                    render:(h,params)=>h('span',{},params.row.sub_is_tag==1 ? '是' : '否')
                },
                {title:'预估房号工期',align:'center',key:'predict_time',minWidth:200},
                {title:'操作',align:'center',slot:'set',width:'280',fixed:'right',},
            ],
            tableData:[],
            pageIndex:1,
            pageSize:10,
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
            showChip:false,
            chipInfo:{},
            showBatchModal:false,
            batchTablePartsColumn:[
                {type:'selection',fixed:'left',minWidth:90,align:'center'},
                {title:'小区名称',key:'',align:'center',minWidth:200},
                {title:'房号',key:'',align:'center',key:'number_detail',minWidth:100},
                {title:'产品',key:'',align:'center',key:'product_title',minWidth:150},
                {title:'位置',key:'',align:'center',key:'position',minWidth:100},
                {title:'部件',key:'',align:'center',key:'part_title',minWidth:100},
                {title:'部件是否贴标签',key:'',align:'center',minWidth:200,
                    render:(h,params)=>h('span',{},params.row.label == 1 ? '是' : '否')
                },
                {title:'零部件是否贴标签',key:'',align:'center',minWidth:150,
                    render:(h,params)=>h('span',{},params.row.sub_is_tag==1 ? '是' : '否')
                },
                {title:'操作',align:'center',width:'100',fixed:'right',
                    render:(h,params)=>h('a',{
                        on:{
                            'click':()=>this.batchTablePartsData.splice(params.index,1)
                        }
                    },'删除')
                }
            ],
            batchTablePartsData:[],
            batchChipColumns:[
                {title:'芯片编码',key:'',align:'center',key:'tag',},
                {title:'扫码时间',key:'',align:'center',minWidth:100,
                    render:(h,params)=>h('span',{},this.func.replaceDate(params.row.scan_time*1))
                },
                {title:'操作',key:'',align:'center',
                    render:(h,params)=>h('a',{
                        on:{
                            'click':()=>this.batchChipData.splice(params.index,1)
                        }
                    },'删除')
                },
            ],
            batchChipData:[],
            batchPageIndex:1,
            batchPageSize:10,
            batchTotal:10,
            batchSelectArray:[],
        }
    },
    created(){
        this.getOptions()
    },
    methods:{
        init(row){
            row.page_index = this.pageIndex;
            row.page_size = this.pageSize;
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
        getOptions(){
            this.axios('/api/order_detail_word',{params:{order_no:this.$route.query.order_no}})
            .then(res=>{
                console.log(res)
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
            if(!url){return this.$Message.error('暂无可下载资源')}              
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
            img.src = this.$store.state.ip+url
            img.crossOrigin = "anonymous"
        },
        bingChip(row){
            this.showChip = true;
            this.chipInfo.pr_id = row.pr_id;
        },
        saveChip(){
            this.axios.post('/api/tag_bind',this.chipInfo)
            .then(res=>{
                if(res.code == 200){
                    this.$Message.success(res.msg||'操作成功')
                    this.getData(this.proxyObj)
                }
            })
        },
        vivibleModal(e){
            if(!e){this.chipInfo = {}}
        },
        getChipData(){
            this.axios('/api/tag_list',{params:{page_size:this.batchPageSize,page_index:this.pageIndex,status:0}})
            .then(res=>{
                res.code == 200 ? (()=>{
                    this.batchChipData = res.data.data;
                    this.batchTotal = res.data.total
                })() : ''
            })
            this.axios('/api/orders_produce_parts_list',{params:{page_size:this.batchPageSize,page_index:this.batchPageIndex,order_no:this.$route.query.order_no,type:'produce',label:0}})
            .then(res=>{
                res.code == 200 ? (()=>{this.batchTablePartsData = res.data.list})() : this.$Message.error(res.msg||'请求失败')
            })
        },
        visibleBatchModal(e){
            if(e){
                this.getChipData()
            }
            
        },
        batchSelect(e){
            this.batchSelectArray = e;
        },
        batchBindChip(){
            if(!this.batchSelectArray.length){
                return false
            }
            let pr_id = '',tag = '';
            this.batchSelectArray.forEach((v,i)=>{
                this.batchChipData[i].tag ? (()=>{
                    // result.push({pr_id:v.pr_id,tag:this.batchChipData[i].tag})
                    pr_id+=v.pr_id+(i==this.batchSelectArray.length-1 ? '' : ',');
                    tag+=this.batchChipData[i].tag+(i==this.batchSelectArray.length-1 ? '' : ',')
                })() : ''
            })
            this.axios.post('/api/tag_bind',{pr_id:pr_id,tag:tag})
            .then(res=>{
                if(res.code == 200){
                    this.$Message.success(res.msg||'操作成功')
                    this.showBatchModal = false
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.nav{display: flex;justify-content: space-between;align-items: center;}
.table-set{a{margin:0 5px;}}
.batch-content{width:100%;display: flex;}
.batch-footer{display: flex;justify-content: center;padding:10px 0;}
</style>