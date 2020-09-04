<template>
    <div class="home">
        <div class='charts-box'>
            <div class="charts">
                <div class="left-charts">
                    <Toptitle style="height:10px;font-size:10px;margin:0;padding:15px 10px;border-radius:5px;" title='产品趋势'/>
                    <div class="chart-search">
                        <RadioGroup type="button" size='small' style="margin-right:10px;">
                            <Radio label="柱状图"></Radio>
                            <Radio label="折线图"></Radio>
                        </RadioGroup>
                        <DatePicker  style="margin-right:10px;" size='small' type="daterange" split-panels placeholder="请选择时间段"></DatePicker>
                    </div>
                    
                    <ve-histogram class="big" :legend-visible='false' :data="productTrends" :settings='chartSettings'></ve-histogram>
                </div>
                <div class="right-charts">
                    <Toptitle style="height:10px;font-size:10px;margin:0;padding:15px 10px;border-radius:5px;" title='销售额类别占比'/>
                    <div class="chart-search">
                        <DatePicker  style="margin-right:10px;" size='small' type="daterange" split-panels placeholder="请选择时间段"></DatePicker>
                    </div>
                    <ve-ring :data="salesVolume" :settings="chartSettings"></ve-ring>
                </div>
            </div>

            <div class="charts">
                <div class="left-charts">
                    <Toptitle style="height:10px;font-size:10px;margin:0;padding:15px 10px;border-radius:5px;" title='原始数据对比'/>
                    <div class="chart-search">
                        <DatePicker  style="margin-right:10px;" size='small' type="daterange" split-panels placeholder="请选择时间段"></DatePicker>
                    </div>
                    
                    <ve-histogram  :data="metaData" :settings='metaDataSettings'></ve-histogram>
                </div>
                <div class="right-charts">
                    <Toptitle style="height:10px;font-size:10px;margin:0;padding:15px 10px;border-radius:5px;" title='人员工资统计'/>
                    <div class="chart-search" >
                        <Select size="small" style="margin-right:10px;">
                            <!-- <Option>油漆工</Option> -->
                        </Select>
                        <DatePicker  style="margin-right:10px;" size='small' type="daterange" split-panels placeholder="请选择时间段"></DatePicker>
                    </div>
                    <ve-histogram class="big" :legend-visible='false' :data="productTrends" :settings='chartSettings'></ve-histogram>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            chartSettings:{yAxisName:['万元']},
            metaDataSettings:{yAxisName:['个']},
            productTrends: {
                columns: ['日期', '产品趋势'],
                rows: [
                    { '日期': '1月', '产品趋势': 0.32,},
                    { '日期': '2月', '产品趋势': 0.26,},
                    { '日期': '3月', '产品趋势': 0.76,},
                    { '日期': '4月', '产品趋势': 0.49,},
                    { '日期': '5月', '产品趋势': 0.323,},
                    { '日期': '6月', '产品趋势': 0.92,},
                    { '日期': '7月', '产品趋势': 0.19,},
                    { '日期': '8月', '产品趋势': 0.38,},
                    { '日期': '9月', '产品趋势': 0.58,},
                    { '日期': '10月','产品趋势': 0.8,},
                    { '日期': '11月','产品趋势': 0.28,},
                    { '日期': '12月','产品趋势': 0.78,},
                ]
            },
            metaData:{
                columns:['日期','尺寸偏差','漏报'],
                rows:[
                    { '日期': '1月', '尺寸偏差': 3,'漏报':4},
                    { '日期': '2月', '尺寸偏差': 22,'漏报':5},
                    { '日期': '3月', '尺寸偏差': 10,'漏报':9},
                    { '日期': '4月', '尺寸偏差': 4,'漏报':1},
                    { '日期': '5月', '尺寸偏差': 7,'漏报':1},
                    { '日期': '6月', '尺寸偏差': 9,'漏报':15},
                    { '日期': '7月', '尺寸偏差': 16,'漏报':2},
                    { '日期': '8月', '尺寸偏差': 3,'漏报':6},
                    { '日期': '9月', '尺寸偏差': 14,'漏报':9},
                    { '日期': '10月','尺寸偏差': 2,'漏报':2},
                    { '日期': '11月','尺寸偏差': 6,'漏报':1},
                    { '日期': '12月','尺寸偏差': 5,'漏报':6},
                ]
            },
            salesVolume:{
                columns:[''],
                rows:[
                    {}
                ],
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.home{margin-top:10px;width:100%;height:100%;overflow: hidden;background:rgb(240,241,244)!important;
    .charts-box{width:100%;height:100%;
        .charts{width:100%;display:flex;justify-content:space-between;height:48%;margin-top:10px;
            .chart-search{display:flex;justify-content:flex-end;position:absolute;right:0;top:40px;z-index:99}
            .left-charts{width:55%;position:relative;background:#fff;border-radius:5px;
                
            }
            .right-charts{width:44%;background:#fff;position:relative;}
        }
    }
}
// .big{transform: scale(.8);position:relative;top:-5%;}
</style>