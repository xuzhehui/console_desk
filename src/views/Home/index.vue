<template>
    <div class="home">
        <div class='charts-box'>
            <div class="charts">
                <div class="left-charts">
                    <Toptitle style="height:10px;font-size:10px;margin:0;padding:15px 10px;border-radius:5px;" title='工序统计'>
                        <div>
                            <RadioGroup type="button" size='small' style="margin-right:10px;" v-model="radioType">
                                <Radio :label="1">柱状图</Radio>
                                <Radio :label="2">折线图</Radio>
                            </RadioGroup>
                            <DatePicker size='small' type="daterange" split-panels placeholder="请选择时间段"></DatePicker>
                        </div>
                    </Toptitle>
                    <ve-line  class="big" v-if="radioType == 2" :data="productTrends" :legend-visible='false' :settings='chartSettings'></ve-line>
                    <ve-histogram v-else class="big" :legend-visible='false' :data="productTrends" :settings='chartSettings' :extend="chartExtend"></ve-histogram>
                </div>
                <div class="right-charts">
                    <Toptitle style="height:10px;font-size:10px;margin:0;padding:15px 10px;border-radius:5px;" title='销售额类别占比'>
                        <DatePicker  size='small' type="daterange" split-panels placeholder="请选择时间段"></DatePicker>
                    </Toptitle>
                    <ve-ring class="big" :data="salesVolume"></ve-ring>
                </div>
            </div>

            <div class="charts">
                <div class="left-charts">
                    <Toptitle style="height:10px;font-size:10px;margin:0;padding:15px 10px;border-radius:5px;" title='原始数据对比'>
                        <DatePicker size='small' type="daterange" split-panels placeholder="请选择时间段"></DatePicker>
                    </Toptitle>
                    
                    <ve-histogram class="big"  :data="metaData" :settings='metaDataSettings'></ve-histogram>
                </div>
                <div class="right-charts">
                    <Toptitle style="height:10px;font-size:10px;margin:0;padding:15px 10px;border-radius:5px;" title='人员工资统计'>
                        <Select size="small" style="margin-right:10px;width:100px;">
                        </Select>
                        <DatePicker  style="margin-right:10px;" size='small' type="daterange" split-panels placeholder="请选择时间段"></DatePicker>
                    </Toptitle>
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
            radioType:1,//1柱状图 2折线图
            chartExtend:{
                series: {
                    barWidth: 25,
                    color:'#3764FF'
                }
            },
            chartSettings:{yAxisName:['万元']},
            metaDataSettings:{yAxisName:['个']},
            productTrends: {
                columns: ['title', 'num'],
                rows: [],
                barWidth: 20,
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
                columns: ['日期', '访问用户'],
                rows: [
                    { '日期': '1', '访问用户': 1393 },
                    { '日期': '2', '访问用户': 3530 },
                    { '日期': '3', '访问用户': 2923 },
                    { '日期': '4', '访问用户': 1723 },
                    { '日期': '5', '访问用户': 3792 },
                    { '日期': '6', '访问用户': 4593 }
                ]
            },
        }
    },
    created(){
        this.axios('/api/stat_procedure').then(res=>{
            if(res.code == 200){
                this.$nextTick(()=>{
                    this.productTrends.rows = res.data
                })
            }
        })

        this.axios('/api/stat_product').then(res=>{
            this.$nextTick(()=>{
                // this.salesVolume = res.data;
            })
            
        })
    }
}
</script>

<style lang="scss" scoped>
.home{width:100%;height:100%;overflow: hidden;background:rgb(240,241,244)!important;
    .charts-box{width:100%;height:100%;
        .charts{width:100%;display:flex;justify-content:space-between;height:48%;margin-top:10px;
            .chart-search{display:flex;justify-content:flex-end;position:absolute;right:0;top:40px;z-index:99}
            .left-charts{width:55%;position:relative;background:#fff;border-radius:5px;
                
            }
            .right-charts{width:44%;background:#fff;position:relative;}
        }
    }
}
.big{transform: scale(.8);position:relative;top:-5%;width:100%;}
</style>