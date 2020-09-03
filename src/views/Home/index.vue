<template>
    <div class="home">
        <Alert style="position:relative;top:10px;">一段提示信息</Alert>
        <div style="width:100%;height:100%;display:flex;padding:10px 0;">
            <div class="table-left">
                <div class="charts">
                    <Toptitle style="margin:0;height:30px;font-size:16px;" title='产品趋势'>
                    </Toptitle>
                    <ve-histogram :legend-visible='false' :data="chartData"></ve-histogram>
                </div>
                <div class="charts">
                    <Toptitle style="margin:0;height:30px;font-size:16px;" title='产品趋势'>
                    </Toptitle>
                    <ve-histogram :data="chartData"></ve-histogram>
                </div>
            </div>
            <div class="table-right">
                <div class="charts">
                    <Toptitle style="margin:0;height:30px;font-size:16px;" title='销售额类别占比'>
                    </Toptitle>
                    <ve-ring :data="chartData"></ve-ring>
                </div>
                <div class="charts">
                    <Toptitle style="margin:0;height:30px;font-size:16px;" title='销售额类别占比'>
                    </Toptitle>
                    <ve-ring :data="chartData"></ve-ring>
                </div>
            </div>
        </div>
        
    </div>
</template>

<script>
export default {
    data(){
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
.home{margin-top:20px;width:100%;height:100%;overflow: hidden;background:rgb(240,241,244)!important;
    .table-left{width:60%;height:100%;padding-right:5px;background:#fff;border-radius:5px;
        
    }
    .table-right{width:40%;height:100%;padding-left:5px;

    }
    .charts{width:100%;height:50%;transform: scale(.8);}
}
</style>