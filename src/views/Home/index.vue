<template>
    <div class="home">
        <div class="alert-tip">
            <Alert type='warning' show-icon>请注意！订单ID005将在2020年8月11日交付！</Alert>
        </div>

        <div class="charts">
            <div class="left-charts">
                <Toptitle style="height:10px;font-size:10px;margin:0;padding:15px 10px;border-radius:5px;" title='产值趋势'/>
                <div class="bar-output" id='bar-output'></div>
            </div>
            <div class="right-charts">
                <Toptitle style="height:10px;font-size:10px;margin:0;padding:15px 10px;border-radius:5px;" title='销售额占比'/>
                <div class="bar-output" id='pie-output'></div>
            </div>
        </div>

        <div class="charts">
            <div class="left-charts">
                <Toptitle style="height:10px;font-size:10px;margin:0;padding:15px 10px;border-radius:5px;" title='原始数据对比'/>
                <div class="bar-output" id='data-compare'></div>
            </div>
            <div class="right-charts">
                <Toptitle style="height:10px;font-size:10px;margin:0;padding:15px 10px;border-radius:5px;" title='人员工资统计'/>
                <div class="bar-output" id='data-salary'></div>
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
            }
        }
    },
    created(){
        this.axios('/api/stat_procedure').then(res=>{//绘制柱状图
            if(res.code == 200){
                console.log(res)
                let rows = [],columns = [];
                res.data.map(v=>{
                    rows.push(v.title)
                    columns.push(v.num)
                })
                this.barOutputData.rows = rows;
                this.barOutputData.columns = columns;
                this.$nextTick(()=>{
                    this.drawBarOutPut();

                    this.drawDataCompare();

                    this.drawsalary()
                })
            }
        })

        this.axios('/api/stat_product').then(res=>{//销售额占比
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
                // this.salesVolume = res.data;
            })
            
        })

        this.axios('/api/finance_total_detail',{params:{month:'2020-09'}}).then(res=>{
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

    mounted(){
    },
    methods:{
        drawBarOutPut(){//产值趋势
            let barOutput = this.$echarts.init(document.getElementById('bar-output'))
            let options={
                xAxis:{
                    type:'category',
                    data:this.barOutputData.rows
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
                barWidth:20,
                series:[
                    {
                        data:this.barOutputData.columns,
                        type:'bar',
                        name:'柱状图',
                        itemStyle:{
                            color:'#2652E7'
                        }
                    },
                    {
                        data:this.barOutputData.columns,
                        type:'line',
                        name:'折线图'
                    }
                ]
            }
            barOutput.setOption(options)
        },
        drawPie(){//销售额占比
            let pieOutput = this.$echarts.init(document.getElementById('pie-output'))
            let options={
                tooltip:{
                    trigger:'item',
                    formatter:'{b}: {c} ({d}%)'
                },
                legend:{
                    orient:'vertical',
                    right:10,
                    top:'25%',
                    data:this.pieOutputData.rows
                },
                series:[
                    {
                        type:'pie',
                        radius:['50%', '70%'],
                        avoidLabelOverlap: false,
                        label:{
                            show: false,
                            position: 'center'
                        },
                        emphasis:{
                            label:{
                                show:true,
                                fontSize:'30',
                                fontWeight:'bold'
                            }
                        },
                        labelLine:{
                            show:false
                        },
                        center:['40%', '45%'],
                        data:this.pieOutputData.data,
                    }
                ]
            }
            pieOutput.setOption(options)
        },
        drawDataCompare(){
            let dataCompare = this.$echarts.init(document.getElementById('data-compare'))
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
        drawsalary(){
            let dataSalary = this.$echarts.init(document.getElementById('data-salary'))
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
        }
    }
}
</script>

<style lang="scss" scoped>
.home{width:100%;height:100%;overflow: hidden;background:rgb(240,241,244)!important;margin-top:10px;
    .alert-tip{width:100%;height:34px;overflow: hidden;}
    .charts{margin-top:10px;display: flex;height:360px;
        .left-charts{width:58%;height:100%;background:#fff;border-radius:5px;
            
        }
        .bar-output{width:100%;height:100%;}
        .right-charts{width:42%;margin-left:10px;height:100%;background:#fff;border-radius:5px;}
    }
}

</style>