<template>
    <div class="content-charts">
        <div class="header-charts">
            <div class="header-pie">
                <Toptitle style="height:10px;font-size:10px;margin:0;padding:15px 10px;border-radius:5px;" title='部件生产总量'/>
                <div style="width:100%;" class="pre-c-item" id='pre-c'></div>
            </div>

            <div class="header-line">
                <Toptitle style="height:10px;font-size:10px;margin:0;padding:15px 10px;border-radius:5px;" title='生产金额'/>
                <div style="width:100%;" class="line-c" id='line-c'></div>
            </div>  
        </div>

        <div class="table-data">
            <Topsearch :list='list' @init='init' @searchData='init'></Topsearch>
            <Table height='200'  :loading='loading'  stripe border :columns="tableColums" :data="tableData">
                <template slot-scope="{ row }" slot="set">
                    <svg style="font-size:20px" color='green' @click="goPage(row)" class="icon icon-nav" aria-hidden="true">
                        <use xlink:href="#iconxiangqing"></use>
                    </svg>
                </template>
            </Table>
        </div>
        <Footer :pageIndex='pageIndex' :pageSize='pageSize' :total='total' @changePage='changePage' @changeSize='changeSize'></Footer>
    </div>
</template>

<script>
var echarts = require('echarts/lib/echarts');
require('echarts/lib/chart/pie');
require("echarts/lib/chart/line");
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');
export default {
    data(){
        return {
            loading:false,
            produces:[],
            pageIndex:1,
            total:0,
            pageSize:10,
            proxyObj:{},
            list:[
                {title:'日期范围',start_server:'start_time',end_server:'end_time',start_value:'',end_value:'',isDate:true,start_placeholder:'开始日期',end_placeholder:'结束日期'},
                {title:'部件价格',name:'Input',serverName:'price',value:'',placeholder:'请输入部件价格'}
            ],
            tableColums:[
                {title:'部件',align:'center',key:'parts_title'},
                {title:'开始时间',align:'center'},
                {title:'结束时间',align:'center'},
                {title:'部件价格',align:'center',key:'price'},
                {title:'总价',align:'center',key:'price'},
                {title:'操作',align:'center',slot:'set'},
            ],
            tableData:[{title:'213'},{title:'213'},{title:'213'},{title:'213'},{title:'213'}],
            pieResult:[],
            PieChart:null,
            LineChart:null,
            drawPie(){
                let PieChart = this.$echarts.init(document.getElementById('pre-c'))
                this.PieChart = PieChart;
                PieChart.setOption({
                    backgroundColor: '#fff',
                    tooltip: {
                        formatter: '{b} : {c} ({d}%)'
                    },
                    legend:{
                        type:'scroll',
                        orient: 'vertical',
                        right: '10',
                        top: '35%',
                        bottom: 20,
                    },
                    color:[ '#3764FF', '#62CC5C', '#FFDF1B', '#FF5017', '#03C0DD', '#FFDF1B', 'purple' ],
                    series : [
                        {
                            type: 'pie',
                            radius: [20, 120],
                            center: ['40%', '50%'],
                            roseType: 'radius',
                            label:{//不显示文字指示
                                normal:{
                                    position:'inner',
                                    show:false
                                }
                            },
                            data:this.pieResult,
                        }
                    ]
                })
            },
            lineResult:[],
            lineData_lastMonth:[],
            lineData_nowMonth:[],
            drawLine(){
                let LineChart = this.$echarts.init(document.getElementById('line-c'))
                this.LineChart = LineChart;
                LineChart.setOption({
                    backgroundColor: '#fff',
                    tooltip: {
                        trigger: 'axis'
                    },
                    xAxis: {
                        type:'category',
                        value:'time',
                        data:this.lineResult,
                    },
                    legend: {
                        data: ['本月', '上月']
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [
                        {
                            name:'本月',
                            data:this.lineData_nowMonth,
                            type: 'line',
                            smooth: true,
                            itemStyle:{
                                color:'#4096FF'
                            }
                        },
                        {
                            name:'上月',
                            data:this.lineData_lastMonth,
                            type: 'line',
                            smooth: true,
                            itemStyle:{
                                color:'#FFB040'
                            }
                        }
                    ]
                })
            }
        }

    },
    methods:{
        setLinexAis(arr){

        },
        init(row){
            row.page_size = this.pageSize;
            row.page_index = this.pageIndex;
            this.getData(row)
        },
        getData(row){
            this.axios('/api/out_put_value_index',{params:row}).then(res=>{
                this.tableData = res.data;
            })
        },
        goPage(row){
            this.$router.push({
                path:'/cms/finance/production/details',
                query:{
                    id:row.id||''
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
        getPieInfo(){
            this.axios('/api/around_detail').then(res=>{
                res.data.around.map(v=>{
                    v.value = v.count
                    v.name = v.parts_title
                })
                this.$nextTick(()=>{
                    this.pieResult = res.data.around;
                    this.drawPie()
                })
                
            })
        },
        getLineInfo(){
            this.axios('/api/line_chart').then(res=>{
                if(res.code == 200){
                    let data = res.data[0],result = [],line_last_month=[],line_now_month=[];
                    this.produces = res.data[1];
                    
                    data.map(v=>{
                        result.push(v.time)
                        line_last_month.push(v.last_price)
                        line_now_month.push(v.price)
                    })
                    this.lineResult = result;//重绘折线表x轴
                    this.lineData_lastMonth = line_last_month;
                    this.lineData_nowMonth = line_now_month;
                    this.drawLine()
                }
            })
        }
    },
    mounted(){
        this.getPieInfo();
        this.getLineInfo()  
        addEventListener('resize',e=>{
            this.PieChart.resize()
            this.LineChart.resize()
        })
    }
}
</script>

<style lang="scss" scoped>
.content-charts{margin-top:10px;background:rgb(240,241,244)!important;}
.header-charts{width:100%;height:380px;display:flex;
    .header-pie{width:35%;height:100%;margin-right:10px;
        .pre-c-item{width:100%;height:100%;}
    }
    .header-line{width:80%;height:100%;
        .line-c{width:100%;height:100%;}
    }
    
}
.table-data{padding:10px;background:#fff;margin-top:40px;}
/deep/.router-style-page{padding:0!important;}
</style>