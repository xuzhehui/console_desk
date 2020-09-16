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

                <Button v-if="type == 'oa'" type="primary" style="margin-right:10px;" @click="openLower(selectIds)" ghost>
                    批量下生产
                </Button>

                <Button v-if="type == 'business'" type="primary" style="margin-right:10px;" @click="openLower(selectIds)" ghost>
                    批量下测量
                </Button>
                 <Button type="primary" v-if="type == 'plan'" style="margin-right:10px;" ghost>批量派工单</Button>

                <Button v-if='type=="produce"' type="primary" ghost style="margin-right:10px;">批量修改工艺路线</Button>
                <Button v-if='type == "produce"' type="primary" ghost style="margin-right:10px;" @click='openModal(selectIds)'>批量下生产计划</Button>
                <Button type="primary" ghost>打印清单</Button>
            </div>

            <template slot='set' slot-scope='{row}'>
                <div>
                   <a v-if='type == "business"||type == "oa"' style="margin:0 5px;" @click="goPage(row)">编辑</a>
                   <a v-if='type == "business"||type == "oa"' style="margin:0 5px;" @click="goPage(row)">详情</a>
                   <a v-if='type == "business"' style="margin:0 5px;" @click="openLower(row)">下测量</a>
                   <a v-if="type == 'oa'" style="margin:0 5px;" @click="openModal(row)">下生产</a>

                    <a v-if='type=="produce"||type == "plan"' style="margin:0 5px;">更改芯片</a>
                    <a v-if='type=="produce"' @click="openModal(row)" style="margin:0 5px;">下生产计划</a>
                    <a v-if='type=="produce"' style="margin:0 5px;">下载图纸</a>
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
                {type:'selection',align:'center',fixed:'left',width:'90'},
                {title:'小区',align:'center',key:'residential_name',},
                {title:'楼幢',align:'center',key:'house'},
                {title:'单元',align:'center',key:'unit'},
                {title:'楼层',align:'center',key:'layer'},
                {title:'房间号',align:'center',key:'number_detail'},
                {title:'单价',align:'center',key:'price'},
                {title:'预估房间工期',align:'center',key:'time',width:'200'},
                {title:'操作',align:'center',slot:'set',fixed:'right',width:'250'},
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
                order_no:'',
                start_time:'',
                end_time:'',
                user_id:null,
            },
            planInfo:{
                order_no:'',
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
           let params = [];
           for(let i in row){
               if(Array.isArray(row[i])&&row[i].length>0){
                   row[i].map(v=>params.push({key:i,value:v}))
               }
           }
           let houseArray = [],unitArray = [],layerArray = [],roomArray = [];
           if(params.length<1){
               this.tableData = this.reset_Table;
           }else{
               params.map(v=>{
                    if(v.key == 'house'){
                        houseArray = houseArray.concat(this.reset_Table.filter(k=>k[v.key] == v.value))
                        if(houseArray.length>0){
                            params.map(k=>{
                                if(k.key == 'unit'){
                                    unitArray = unitArray.concat(houseArray.filter(m=>m[k.key] == k.value))
                                    if(unitArray.length>0){
                                        params.map(b=>{
                                            if(b.key == 'layer'){
                                                layerArray = layerArray.concat(unitArray.filter(m=>m[b.key] == b.value))
                                            }
                                        })
                                        if(layerArray.length>0){
                                            params.map(z=>{
                                                if(z.key == 'number_detail'){
                                                    roomArray = roomArray.concat(layerArray.filter(m=>m[z.key] == z.value))
                                                }
                                            })
                                        }
                                    }
                                }
                            })
                        }
                    }else if(v.key == 'unit'){
                        let res = houseArray.length>0 ? houseArray : this.reset_Table
                        unitArray = unitArray.concat(res.filter(k=>k[v.key] == v.value)) 
                        if(unitArray.length>0){
                            params.map(b=>{
                                if(b.key == 'layer'){
                                    layerArray = layerArray.concat(unitArray.filter(m=>m[b.key] == b.value))
                                }
                            })
                            if(layerArray.length>0){
                                params.map(b=>{
                                    if(b.key == 'number_detail'){
                                        roomArray = roomArray.concat(unitArray.filter(m=>m[b.key] == b.value))
                                    }
                                })
                            }
                        }
                    }else if(v.key=='layer'){
                        let res = unitArray.length>0 ? unitArray : this.reset_Table
                        layerArray = layerArray.concat(res.filter(k=>k[v.key] == v.value)) 
                        if(layerArray.length>0){
                            roomArray = roomArray.concat(res.filter(k=>k[v.key] == v.value)) 
                        }
                        
                    }else if(v.key=='number_detail'){
                        let res = layerArray.length>0 ? layerArray : this.reset_Table
                        roomArray = roomArray.concat(res.filter(k=>k[v.key] == v.value)) 
                    }
                })
                this.tableData = roomArray.length>0 ? roomArray : ( layerArray.length>0 ? layerArray : (unitArray.length>0 ? unitArray :  houseArray))
           }  
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
                path:this.type == 'oa' ? '/cms/measurementordermannage/edit' : '/cms/ordermannage/businessorderlist/details',
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
                // this.planInfo.order_no = row.order_no;
            }
            this.downProduction({
                title:this.type == 'produce' ? '下生产计划' : '下生产',
                type:this.type == 'produce' ? 1 : 2,
                params:this.planInfo,
                then:(e)=>{},
                cancel:(e)=>{},
            })
        },
        selectTable(e){
            let result = [];
            e.map(v=>result.push(this.type == 'business' ? v.id : v.house_id))
            this.selectIds = result;
        },
        
    }
}
</script>

<style lang="scss" scoped>
</style>