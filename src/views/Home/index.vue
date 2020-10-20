<template>
    <div class="home">
        <div class="charts">
            <div class="left-charts">
                <!-- 产值趋势图 -->
                <Toptitle style="height:10px;font-size:10px;margin:0;padding:15px 10px;border-radius:5px;" title='产值趋势'>
                    <DatePicker @on-change="changeDate($event,1)" v-model="ProteomicTime" type='month' size='small'  split-panels placeholder="选择月份"></DatePicker>
                </Toptitle>
                <div class="bar-output" id='bar-output'></div>
            </div>
            <div class="right-charts">
                <!-- 人员工资统计图 -->
                <Toptitle style="height:10px;font-size:10px;margin:0;padding:15px 10px;border-radius:5px;" title='人员工资统计'>
                    <DatePicker @on-change="changeDate($event,2)" v-model="salaryTime" size='small' type='month'  split-panels placeholder="选择月份"></DatePicker>
                </Toptitle>
                <div class="bar-output" id='data-salary'></div>
            </div>
        </div>

        <div class="charts">
            <div class="pie-charst">
                <!-- 销售额占比 -->
                <Toptitle style="height:10px;font-size:10px;margin:0;padding:15px 10px;border-radius:5px;" title='销售额占比'>
                    <DatePicker size='small' type="daterange" split-panels placeholder="请选择时间"></DatePicker>
                </Toptitle>
                <div class="bar-output" id='pie-output'></div>
            </div>
            <div class="left-charts-other">
                <!-- 原始数据对比图 -->
                <Toptitle style="height:10px;font-size:10px;margin:0;padding:15px 10px;border-radius:5px;" title='原始数据对比'>
                    <DatePicker size='small' type="daterange" split-panels placeholder="请选择时间"></DatePicker>
                </Toptitle>
                <div class="bar-output" id='data-compare'></div>
            </div>
            <div class="right-notice">
                <Toptitle style="height:10px;font-size:10px;margin:0;padding:15px 10px;border-radius:5px;" title='通知公告'/>
                <div class="notice-content">
                    <div class="item" @click="goNotice" v-for="item of noticeList" :key="item.id">
                        <div class="item-text">{{item.content}}</div>
                        <div class="item-time">122小时前</div>
                    </div>
                </div>
            </div>
        </div>
        
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
            ProteomicsData:{//产值趋势图表
                rows:[],
                columns:[],
            },
            ProteomicTime:'',
            barOutputData:{
                rows:[],
                columns:[],
            },
            pieOutputData:{
                data:[],
                rows:[],
            },
            salaryData:{
                rows:[],
                data:[],
            },
            salaryTime:'',
            dataCompare:null,
            barOutput:null,
            pieOutput:null,
            dataSalary:null,
            noticeList:[],
        }
    },
    created(){
        this.getBarOutPue()//原始数据对比
        this.getMoneyData()//人员工资列表
        this.getPieData()//销售额占比
        this.getProteomicsData()
    },

    mounted(){
        this.axios('/api/notice_list',{params:{page_size:10,}}).then(res=>this.noticeList = res.data.data)
        addEventListener('resize',e=>{
            this.barOutput.resize()
            this.pieOutput.resize()
            this.dataCompare.resize()
            this.dataSalary.resize()
        })
    },
    methods:{
        getProteomicsData(row){
            this.axios('/api/line_chart',{params:row}).then(res=>{
                if(res.code == 200){
                    let result=[],columns=[];
                    res.data[0].map(v=>{
                        result.push(v.time)
                        columns.push(v.price)
                    })
                    this.ProteomicsData.rows = result;
                    this.ProteomicsData.columns = columns
                    this.$nextTick(e=>this.drawBarOutPut())
                }
            })
        },
        getMoneyData(row){//人员工资统计数据
            this.axios('/api/finance_total_detail',{params:{month:row}}).then(res=>{
                if(res.code == 200){
                    let result = [];
                    res.data.map(v=>{
                        result.push(v.name||'无名')
                        v.value = v.price
                    })
                    this.salaryData.rows = result;
                    this.salaryData.data = res.data;
                    this.$nextTick(e=>this.drawsalary())
                }
            })
        },
        getBarOutPue(){//原始数据对比数据
            this.axios('/api/stat_procedure').then(res=>{
                if(res.code == 200){
                    let rows = [],columns = [];
                    res.data.map(v=>{
                        rows.push(v.title)
                        columns.push(v.num)
                    })
                    this.barOutputData.rows = rows;
                    this.barOutputData.columns = columns;
                    this.$nextTick(()=>this.drawDataCompare())
                }
            })
        },

        getPieData(){//销售额占比
            this.axios('/api/stat_product').then(res=>{
                let result = [];
                res.data.map(v=>{
                    v.name = v.title;
                    v.value = v.price;
                    result.push(v.title)
                })
                this.pieOutputData.rows = result;
                this.pieOutputData.data = res.data;
                this.$nextTick(()=>{
                    this.drawPie()
                })
                
            })
        },
        drawBarOutPut(){//产值趋势
            let barOutput = this.$echarts.init(document.getElementById('bar-output'))
            this.barOutput = barOutput;
            let options={
                xAxis:{
                    type:'category',
                    data:this.ProteomicsData.rows
                },
                yAxis:{
                    type:'value'
                },
                legend:{
                    data: ['柱状图', '折线图']
                },
                tooltip:{
                    trigger:'axis'
                },
                barWidth:10,
                series:[
                    {
                        data:this.ProteomicsData.columns,
                        type:'bar',
                        name:'柱状图',
                        itemStyle:{
                            color:'#2652E7'
                        }
                    },
                    {
                        data:this.ProteomicsData.columns,
                        type:'line',
                        name:'折线图'
                    }
                ]
            }
            barOutput.setOption(options)
        },
        drawPie(){//销售额占比
            let pieOutput = this.$echarts.init(document.getElementById('pie-output'))
            this.pieOutput = pieOutput;
            let options={
                tooltip:{
                    trigger:'item',
                    formatter:'{b}: {c} ({d}%)'
                },
                legend:{
                    orient:'vertical',
                    right:0,
                    top:'25%',
                    data:this.pieOutputData.rows
                },
                title:{
                    text:'销售额(元)',
                    x:'center',
                    y:'53%',
                    textStyle:{
                        fontSize:'16',
                        color:'#666666'
                    }
                },
                graphic:{
                    type:"text",
                    left:"center",
                    top:"center",
                    style:{
                        text:"20,042",
                        textAlign:"center",
                        fill:"#333",
                        fontSize:20,
                        fontWeight:700
                    }
                },
                color:[ '#FF632A', 'orange', '#03C0DD', '#3764FF', '#62CC5C', '#FFDF1B', 'purple' ],
                series:[
                    {
                        type:'pie',
                        radius:['30%', '50%'],
                        avoidLabelOverlap: false,
                        label:{
                            show: false,
                            position: 'center'
                        },
                        emphasis:{
                            label:{
                                show:false,
                                fontSize:'20',
                                fontWeight:'bold'
                            }
                        },
                        labelLine:{
                            show:false
                        },
                        center:['50%', '50%'],
                        data:this.pieOutputData.data,
                    }
                ]
            }
            pieOutput.setOption(options)
        },
        drawDataCompare(){//原始数据表
            let dataCompare = this.$echarts.init(document.getElementById('data-compare'))
            this.dataCompare = dataCompare;
            let options = {
                xAxis:{
                    type:'category',
                    data:this.barOutputData.rows
                },
                yAxis:{
                    type:'value'
                },
                tooltip:{
                    trigger:'axis'
                },
                barWidth:20,
                series:[
                    {
                        data:this.barOutputData.columns,
                        type:'bar',
                        itemStyle:{
                            color:'#62CC5C'
                        }
                    },
                ]
            }
            dataCompare.setOption(options)
        },
        drawsalary(){//人员工资表
            let dataSalary = this.$echarts.init(document.getElementById('data-salary'))
            this.dataSalary = dataSalary
            let options = {
                xAxis:{
                    type:'category',
                    data:this.salaryData.rows
                },
                yAxis:{
                    type:'value'
                },
                tooltip:{
                    trigger:'axis'
                },
                barWidth:20,
                series:[
                    {
                        data:this.salaryData.data,
                        type:'bar',
                        itemStyle:{
                            color:'#03C0DD'
                        }
                    },
                ]
            }
            dataSalary.setOption(options)
        },
        goNotice(row){
            this.$router.push({
                path:'/cms/notice/menote'
            })
        },
        changeDate(e,type){
            if(type == 1){
                this.ProteomicTime = e
                this.getProteomicsData({month:this.ProteomicTime})
            }else{
                this.salaryTime = e
                this.getMoneyData(this.salaryTime)
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.home{width:100%;height:100%;background:rgb(240,241,244)!important;
    .charts{margin-top:10px;display: flex;height:380px;
        .left-charts{width:58%;height:100%;background:#fff;border-radius:5px;
            
        }
        .bar-output{width:100%;height:100%;}
        .right-charts{width:42%;margin-left:10px;height:100%;background:#fff;border-radius:5px;}
        .pie-charst{width:30%;height:100%;background: #fff;}
        .left-charts-other{margin-left:10px;width:50%;height:100%;background:#fff;}
        .right-notice{width:20%;margin-left:10px;height:100%;background:#fff;
            .notice-content{width:100%;height:100%;padding:0 10px;
                .item{display: flex;justify-content:space-between;align-items:center;padding:5px 0;
                    .item-text{width:80%;overflow: hidden;text-overflow:ellipsis; white-space: nowrap;font-size:13px;color:#333333;
                        cursor: pointer;&:hover{color:#3764FF;}
                    }
                    .item-time{width:80px;overflow: hidden;text-overflow:ellipsis; white-space: nowrap;text-align: right;font-size:13px;color:#999999;}
                }
            }
        }
    }
}

</style>