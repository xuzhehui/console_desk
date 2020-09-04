<template>
    <div class="home">
        <div class='charts-box'>
            <div class="charts">
                <div class="left-charts">
                    <Toptitle style="height:10px;font-size:10px;margin:0;padding:15px 0;" title='产品趋势'/>
                    <div class="chart-search">
                        <RadioGroup type="button" size='small'>
                            <Radio label="柱状图"></Radio>
                            <Radio label="折线图"></Radio>
                        </RadioGroup>
                        <DatePicker size='small' type="daterange" split-panels placeholder="请选择时间段"></DatePicker>
                    </div>
                    
                    <ve-histogram :legend-visible='false' :data="chartData" :settings='chartSettings'></ve-histogram>
                </div>
                <div class="right-charts">
                    <Toptitle style="height:10px;font-size:10px;margin:0;padding:15px 0;" title='销售额类别占比'/>
                    <div class="chart-search">
                        <DatePicker size='small' type="daterange" split-panels placeholder="请选择时间段"></DatePicker>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        this.chartSettings = {
            yAxisName: ['万元']
      }
        return {
            chartData: {
                columns: ['日期', '产品趋势'],
                    rows: [
                        { '日期': '1月', '产品趋势': 0.32, },
                        { '日期': '2月', '产品趋势': 0.26, },
                        { '日期': '3月', '产品趋势': 0.76, },
                        { '日期': '4月', '产品趋势': 0.49, },
                        { '日期': '5月', '产品趋势': 0.323, },
                        { '日期': '6月', '产品趋势': 0.78, },
                        { '日期': '7月', '产品趋势': 0.78, },
                        { '日期': '8月', '产品趋势': 0.78, },
                        { '日期': '9月', '产品趋势': 0.78, },
                        { '日期': '10月','产品趋势': 0.78, },
                        { '日期': '11月','产品趋势': 0.78, },
                        { '日期': '12月','产品趋势': 0.78, },
                    ]
                }
            }
    }
}
</script>

<style lang="scss" scoped>
.home{margin-top:10px;width:100%;height:100%;overflow: hidden;background:rgb(240,241,244)!important;
    .charts-box{width:100%;height:100%;
        .charts{width:100%;display:flex;justify-content:space-between;
            .chart-search{display:flex;justify-content:flex-end;}
            .left-charts{width:55%;
                
            }
            .right-charts{width:44%;}
        }
    }
}
</style>