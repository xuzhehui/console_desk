<template>
    <div>
        <FullPage 
        title='工装订单列表' 
        :list='list' 
        @init='init'
        :loading='loading' 
        :logList='logList'
        @searchData='init' 
        @selectTable='selectTable'
        @changePage='changePage'
        @changeSize='changeSize'
        :tableColums='tableColums'
        :tableData='tableData'
        :pageIndex='pageIndex'
        :total='total'
        >   
            <div slot='titleButton'>
                <Button @click="back" type='primary' ghost style="margin-right:10px;">返回</Button>

                <Button v-if="type == 'measure'" type="primary" style="margin-right:10px;" @click="openModal(selectIds)" ghost>
                    批量下生产
                </Button>

                <Button v-if="type == 'business'" type="primary" style="margin-right:10px;" @click="openLower(selectIds)" ghost>
                    批量下测量
                </Button>

                <Button type="error" v-if="type == 'oa'" @click="showModal = true" style="margin-right:10px;" ghost>批量驳回审批</Button>
                <Button type="success" @click="approved" v-if="type == 'oa'" style="margin-right:10px;" ghost>批量通过审批</Button>

                <Button v-if='type!="oa"' type="primary" ghost>打印清单</Button>
            </div>

            <template slot='set' slot-scope='{row}'>
                <div>
                   <a v-if='type == "business"||type == "measure"' style="margin:0 5px;" @click="goPage(row)">编辑</a>
                   <a v-if='type == "business"||type == "measure"||type == "oa"' style="margin:0 5px;" @click="goPage(row)">详情</a>
                   <a v-if='type == "business"' style="margin:0 5px;" @click="openLower(row)">下测量</a>
                   <a v-if="type == 'measure'" style="margin:0 5px;" @click="openModal(row)">下生产</a>
                </div>
            </template>

            <Modal title='审批驳回' v-model="showModal" class-name="vertical-center-modal" @on-ok="rejectApprove" @on-visible-change='vivibleModal'>
                <div class="cancelModal">
                    <span>驳回原因：</span>
                    <Input v-model="remark" clearable type="textarea" :autosize="true" placeholder="请输入驳回原因" />
                </div>
            </Modal>
        </FullPage>
    </div>
</template>

<script>
export default {
    data(){
        return {
            type:this.$route.query.type,
            logList:[],
            list:[
                {title:'楼幢',name:'Select',multiple:true,filterable:true,serverName:'house',placeholder:'请选择',value:'',
                    option:[]
                },
                {title:'单元',name:'Select',multiple:true,filterable:true,serverName:'unit',placeholder:'请选择',value:'',
                    option:[]
                },
                {title:'楼层',name:'Select',multiple:true,filterable:true,serverName:'layer',placeholder:'请选择',value:'',
                    option:[]
                },
                {title:'房号',name:'Select',multiple:true,filterable:true,serverName:'number_detail',placeholder:'请选择',value:'',
                    option:[]
                },
                {title:'测量状态',name:'Select',serverName:'measurement_state',placeholder:'请选择',value:'',
                    option:[
                        {label:'未下测量',value:0},
                        {label:'已下测量',value:1},
                        {label:'测量中',value:2},
                        {label:'测量完成',value:3},
                    ]
                },
            ],
            tableColums:[
                {type:'selection',align:'center',fixed:'left',minWidth:100},
                {title:'小区',align:'center',key:'residential_name',minWidth:200},
                {title:'楼幢',align:'center',key:'house',minWidth:100},
                {title:'单元',align:'center',key:'unit',minWidth:100},
                {title:'楼层',align:'center',key:'layer',minWidth:100},
                {title:'房间号',align:'center',key:'number_detail',minWidth:100},
                {title:'单价',align:'center',key:'price',minWidth:150,
                    render:(h,params)=>h('span',{},
                        `${parseInt(params.row.price).toFixed(2)}元`
                    )
                },
                {title:'测量状态',align:'center',key:'measurement_state',minWidth:100,
                    render:(h,params)=>h('span',{},
                        params.row.measurement_state == 2 ? '测量完成' : (params.row.measurement_state == 1 ? '已下测量' : (params.row.measurement_state == 2 ? '测量中' : '未下测量'))
                    )
                },
                {title:'预估房间工期',align:'center',key:this.$route.query.type == 'business' ? 'time' : 'predict_time',minWidth:150,
                    render:(h,params)=>h('span',{},this.$route.query.type == 'business' ? `${params.row.time}小时` : (`${params.row.predict_working}小时`||`${params.row.predict_time}小时`))
                },
                {title:'操作',align:'center',slot:'set',fixed:'right',minWidth:250},
            ],

            tableData:[],
            reset_Table:[],
            pageIndex:1,
            pageSize:10,
            total:0,
            loading:false,
            room_list:[],
            units:[],
            house:[],
            postInfo:{//下测量数据
                start_time:'',
                end_time:'',
                user_id:null,
            },
            planInfo:{
                house_id:null,
            },//下生产数据
            users:[],
            selectIds:null,
            showModal:false,
            remark:'',
        }
    },
    created(){
        this.axios('/api/user').then(res=>this.users = res.data.data)
        this.querySelectColumns(this.$route.query)
    },
    methods:{
        init(row){
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
            row.page_index = this.pageIndex;
            row.page_size = this.pageSize;
            Object.assign(row,this.$route.query)
            this.proxyObj = row;
            this.getData(row)
        },
        back(){
            this.$router.go(-1)
        },
        getData(row){
            this.loading = true;
            let url = this.type == 'business' ? '/api/order_industry_list' : '/api/orders_house_list'
            this.axios(url,{params:row}).then(res=>{
                this.loading = false;
                this.tableData = this.type == 'business' ? res.data.oil : res.data.list
                this.reset_Table = JSON.parse(JSON.stringify(this.tableData))
                this.logList = res.data.detail
                this.total = res.data.total;
            })
        },
        changeSelected(e){},
        goPage(row){
            this.$router.push({
                path:this.type == 'measure' ? '/cms/measurementordermannage/edit' : '/cms/ordermannage/businessorderlist/details',
                query:{
                    house_id: this.type == 'business' ? row.id :  row.house_id,
                    oa_order_no:row.oa_order_no,
                    type:this.type
                }
            })
        },
        openLower(row){//下测量
            if(!row){return this.$Message.warning('请至少选择一项')}
            this.postInfo.house_id = Array.isArray(row) ? row.join(',') : row.id
            this.dowmMeasurement({
                params:this.postInfo,
                then:()=>{
                    this.postInfo = {};
                    this.selectIds = [];
                },
                cancel:()=>{
                    this.postInfo = {}
                }
            })
        },
        openModal(row){//下生产||生产计划
            if(!row){return this.$Message.error('未选择')}
            if(Array.isArray(row)){
                if(row.length<1){return this.$Message.error('请至少选择一项')}
                let result = [];
                row.map(v=>result.push(v))
                this.planInfo.house_id = result.join(',')
            }else{
                this.planInfo.house_id = row.house_id;
            }
            this.downProduction({
                title:'下生产',
                type:2,
                params:this.planInfo,
                then:(e)=>{},
                cancel:(e)=>{},
            })
        },
        selectTable(e){
            let result = [];
            e.map(v=>result.push(this.type == 'business' ? v.id : (this.type == 'oa' ? v.oa_order_no : v.house_id)))
            this.selectIds = result;
        },
        postData(state,arr){//state(1:通过|2:驳回)
            let params = {oa_order_no:arr.join(','),state:state}
            state == 2 ? params.remark = this.remark : '';
            this.axios.post('/api/order_oa_approve',params).then(res=>{
                if(res.code == 200){
                    this.$Message.success(res.msg||'无提示')
                    this.back()
                }
            })
        },
        approved(){
            this.confirmDelete({
                content:'是否通过此订单审核？',
                title:'审批通过',
                type:'primary',
                then:()=>{
                    this.postData(1,this.selectIds)
                },
                cancel:()=>{}
            })
        },
        rejectApprove(){
            if(!this.selectIds){
                return this.$Message.warning('请至少选择一项')
            }
            this.postData(2,this.selectIds)
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
        querySelectColumns(row){
            this.axios('/api/order_industry_list_top',{params:row})
            .then(res=>{
                res.code == 200 ? (()=>{
                    let result = res.data;
                    this.list[0].option = result.house;
                    this.list[1].option = result.unit;
                    this.list[2].option = result.layer;
                    this.list[3].option = result.number;
                })() : ''
            })
        },
        vivibleModal(e){
            if(!e){this.remark = ''}
        }
        
    }
}
</script>

<style lang="scss" scoped>
</style>