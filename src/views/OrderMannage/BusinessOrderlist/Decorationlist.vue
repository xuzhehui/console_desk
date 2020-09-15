<template>
    <div>
        <FullPage 
        title='工装订单列表' 
        :list='list' 
        @init='init'
        :loading='loading' 
        :logList='logList'
        @searchData='searchData' 
        @changePage='changePage'
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
                <Button type="primary" style="margin-right:10px;" @click="openLower(selectIds)" ghost>批量下测量</Button>
                <Button type="primary" ghost>打印清单</Button>
            </div>

            <template slot='set' slot-scope='{row}'>
                <div>
                   <a style="margin:0 5px;" @click="goPage(row)">编辑</a>
                   <a style="margin:0 5px;" @click="goPage(row)">详情</a>
                   <a style="margin:0 5px;" @click="openLower(row)">下测量</a>
                </div>
            </template>

            <Modal @on-visible-change="visibleModal" class-name="vertical-center-modal" title='下测量' v-model="show_lower" @on-ok="lowerMeter(postInfo)">
                <Form inline :label-width="100">
                    <FormItem label="测量人员">
                        <Select v-model="postInfo.user_id" style="width:186px;">
                            <Option v-for="item of users" :key="item.id" :label="item.nickname" :value="item.id"></Option>
                        </Select>
                    </FormItem>

                    <FormItem label="选择时间">
                        <div style="display:flex;">
                            <DatePicker v-model="postInfo.start_time" type="date" placeholder="开始时间"></DatePicker>
                            -
                            <DatePicker v-model="postInfo.end_time" type="date" placeholder="结束时间"></DatePicker>
                        </div>
                             
                    </FormItem>
                </Form>
            </Modal>
        </FullPage>
    </div>
</template>

<script>
export default {
    data(){
        return {
            type:1,
            logList:[],
            list:[
                {title:'按楼幢',name:'Select',multiple:true,change:true,filterable:true,serverName:'house',placeholder:'请选择',value:'',
                    option:[]
                },
                {title:'按单元',name:'Select',multiple:true,change:true,filterable:true,serverName:'unit',placeholder:'请选择',value:'',
                    option:[]
                },
                {title:'按房号',name:'Select',multiple:true,change:true,filterable:true,serverName:'number_detail',placeholder:'请选择',value:'',
                    option:[]
                },
                // {title:'产品',name:'Select',serverName:'id1',placeholder:'请选择',value:'',
                //     option:[]
                // },
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
                {title:'操作',align:'center',slot:'set',fixed:'right',width:'180'},
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
            users:[],
            show_lower:false,
            selectIds:null,
        }
    },
    created(){
        
        this.axios('/api/user').then(res=>this.users = res.data.data)
    },
    methods:{
        init(row){
            this.getData({id:this.$route.query.id})
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
           let houseArray = [];
           let unitArray = []
           let roomArray = [];
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
                                            if(b.key == 'number_detail'){
                                                roomArray = roomArray.concat(unitArray.filter(m=>m[b.key] == b.value))
                                            }
                                        })
                                    }
                                }
                            })
                        }
                    }else if(v.key == 'unit'){
                        let res = houseArray.length>0 ? houseArray : this.reset_Table
                        unitArray = unitArray.concat(res.filter(k=>k[v.key] == v.value)) 
                        if(unitArray.length>0){
                            params.map(b=>{
                                if(b.key == 'number_detail'){
                                    roomArray = roomArray.concat(unitArray.filter(m=>m[b.key] == b.value))
                                }
                            })
                        }
                    }else if(v.key=='number_detail'){
                        let res = unitArray.length>0 ? unitArray : this.reset_Table
                        roomArray = roomArray.concat(res.filter(k=>k[v.key] == v.value)) 
                    }
                })
                this.tableData = roomArray.length>0 ? roomArray : (unitArray.length>0 ? unitArray : houseArray)
           }  
        },
        back(){
            this.$router.go(-1)
        },
        getData(row){
            this.loading = true;
            this.axios('/api/order_industry_list',{params:row}).then(res=>{
                this.loading = false;
                this.tableData = res.data.oil
                this.reset_Table = JSON.parse(JSON.stringify(this.tableData))
                this.logList = res.data.detail
                let house_result = [],units_result = [],number_detail_result = [];
                this.tableData.map(v=>{
                    number_detail_result.push(v.number_detail)
                    house_result.push(v.house)
                    units_result.push(v.unit)
                })
                
                house_result = Array.from(new Set(house_result))
                units_result = Array.from(new Set(units_result))
                let houst_updata = [],unit_updata = [],number_detail_updata = [];
                house_result.map(v=>houst_updata.push({label:v+'幢',value:v}))
                units_result.map(v=>unit_updata.push({label:v+'单元',value:v}))
                number_detail_result.map(v=>number_detail_updata.push({label:v,value:v}))
                this.list[0].option = houst_updata;
                this.list[1].option = unit_updata;
                this.list[2].option = number_detail_updata;
                
            })
        },
        changeSelected(e){
            console.log(e)
        },
        postData(){

        },
        goPage(row){
            this.$router.push({
                path:'/cms/ordermannage/businessorderlist/details',
                query:{
                    house_id:row.id
                }
            })
        },
        changePage(e){},
        changeSelected(e){
            console.log(e)
        },
        visibleModal(e){
            if(!e){
                this.postInfo = {
                    house_id:'',
                    start_time:'',
                    end_time:'',
                    user_id:null,
                }
            }
        },
        lowerMeter(postData){
            try{
                postData.start_time = new Date(postData.start_time).toLocaleDateString().replace(/\//g,"-")
                postData.end_time = new Date(postData.end_time).toLocaleDateString().replace(/\//g,"-")
            }catch(e){}
            this.axios.post('/api/orders_set_measure',postData).then(res=>{
                if(res.code == 200){
                    this.$Message.success(res.msg)
                    this.selectIds = null;//清空多选项
                    this.postInfo = {}
                }
            })
        },
        openLower(row){
            if(!row){return this.$Message.warning('请至少选择一项')}
            this.postInfo.house_id = Array.isArray(row) ? row.join(',') : row.id
            this.show_lower = true;
        },
        selectTable(e){
            let result = [];
            e.map(v=>result.push(v.id))
            this.selectIds = result;
        },
        
    }
}
</script>

<style lang="scss" scoped>
// .log-list{display: flex;flex-wrap:wrap;padding:10px 0;color:#666;}
// .log-item{margin-right:40px;margin-bottom:20px;}
</style>