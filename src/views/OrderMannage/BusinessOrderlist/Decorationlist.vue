<template>
    <div>
        <FullPage 
        title='工装订单列表' 
        :list='list' 
        @init='init'
        :loading='loading' 
        :logList='logList'
        @searchData='searchData' 
        @selectTable='selectTable'
        @changeSelected='changeSelected'
        :showPage='false'
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

                <Button type="error" v-if="type == 'oa'" style="margin-right:10px;" ghost>批量驳回审批</Button>
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
                {title:'按楼幢',name:'Select',multiple:true,change:true,filterable:true,serverName:'house',placeholder:'请选择',value:'',
                    option:[]
                },
                {title:'按单元',name:'Select',multiple:true,change:true,filterable:true,serverName:'unit',placeholder:'请选择',value:'',
                    option:[]
                },
                {title:'按楼层',name:'Select',multiple:true,change:true,filterable:true,serverName:'layer',placeholder:'请选择',value:'',
                    option:[]
                },
                {title:'按房号',name:'Select',multiple:true,change:true,filterable:true,serverName:'number_detail',placeholder:'请选择',value:'',
                    option:[]
                },
            ],
            tableColums:[
                {type:'selection',align:'center',fixed:'left',minWidth:100},
                {title:'小区',align:'center',key:'residential_name',minWidth:100},
                {title:'楼幢',align:'center',key:'house',minWidth:100},
                {title:'单元',align:'center',key:'unit',minWidth:100},
                {title:'楼层',align:'center',key:'layer',minWidth:100},
                {title:'房间号',align:'center',key:'number_detail',minWidth:100},
                {title:'单价',align:'center',key:'price',minWidth:100},
                {title:'预估房间工期',align:'center',key:this.$route.query.type == 'business' ? 'time' : 'predict_time',minWidth:150},
                {title:'操作',align:'center',slot:'set',fixed:'right',minWidth:250},
            ],

            tableData:[],
            reset_Table:[],
            pageIndex:1,
            total:100,
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
        }
    },
    created(){
        this.axios('/api/user').then(res=>this.users = res.data.data)
    },
    methods:{
        init(row){
            this.getData(this.$route.query)
        },
        searchData(row){
            this.loading = true;
            this.filterTable(row)
            setTimeout(()=>{this.loading = false},500)
        },
        filterTable(row){
            let resg = '';
            if(row.house){
                row.house.map((m,i)=>resg+=`${i==0? '(' : ''}v.house == ${m}${i==row.house.length-1&&(row.unit.length>0||row.layer.length>0||row.number_detail.length>0) ? ')&&' : (i==row.house.length-1 ? ')' : '||')}`)
            }
            if(row.unit){
                row.unit.map((m,i)=>resg+=`${i==0? '(' : ''}v.unit == ${m}${i==row.unit.length-1&&(row.layer.length>0||row.number_detail>0) ? ')&&' : (i==row.unit.length-1 ? ')' : '||')}`)
            }
            if(row.layer){
                row.layer.map((m,i)=>resg+=`${i==0? '(' : ''}v.layer == ${m}${i==row.layer.length-1&&row.number_detail.length>0 ? ')&&' : (i==row.layer.length-1 ? ')' : '||')}`)
            }
            if(row.number_detail){
                row.number_detail.map((m,i)=>resg+=`${i==0? '(' : ''}v.number_detail == ${'"'+m+'"'}${i==row.number_detail.length-1 ? ')' : '||'}`)
            } 
            this.tableData = this.reset_Table.filter(v=>{
               return eval(resg)
            })
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
                let house_result = [],units_result = [],number_detail_result = [],layer_result = [];
                this.tableData.map(v=>{
                    number_detail_result.push(v.number_detail)
                    house_result.push(v.house)
                    units_result.push(v.unit)
                    layer_result.push(v.layer)
                })
                
                house_result = Array.from(new Set(house_result))
                units_result = Array.from(new Set(units_result))
                layer_result = Array.from(new Set(layer_result))
                number_detail_result = Array.from(new Set(number_detail_result))
                let houst_updata = [],unit_updata = [],number_detail_updata = [],layer_updata = [];
                house_result.map(v=>houst_updata.push({label:v+'幢',value:v}))
                units_result.map(v=>unit_updata.push({label:v+'单元',value:v}))
                layer_result.map(v=>layer_updata.push({label:v+'层',value:v}))
                number_detail_result.map(v=>number_detail_updata.push({label:v,value:v}))
                this.list[0].option = houst_updata;
                this.list[1].option = unit_updata;
                this.list[2].option = layer_updata;
                this.list[3].option = number_detail_updata;
                
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
            this.postData(2,this.selectIds)
        }
        
    }
}
</script>

<style lang="scss" scoped>
</style>