<template>
    <div>
        <FullPage 
        title='原材料预算'
        :showTopSearch='false'
        :loading='loading'
        :showPage='false'
        :tableColums='tableColums'
        :tableData='tableData'
        ><div slot='titleButton'>
                <Button  @click="back" type='primary' ghost style="margin-right:10px;">返回</Button>
                <Button @click="powerPoint" v-print="'#print'"  type='success' ghost>打印原材料</Button>
            </div>
            <div v-if="show" id='print' style="width:730px;height:1100px;">
                <div style="width:100%;display:flex;justify-content:center;font-size:18px;font-weight:bold;padding-bottom:5px;">{{$route.query.residential_name}}</div>
                <Table  :width="730"  :columns='printTableColums' :data='tableData'></Table>
                <div style="position:absolute;bottom:20px;width:100%;display:flex;justify-content:flex-end;">
                    <span>主管签字：</span>
                    <div style="width:100px"></div>
                </div>
            </div>
            
        </FullPage>
    </div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
    data(){
        return {
            tableColums:[
                {title:'原材料名称',align:'center',key:'title',fixed:'left',minWidth:110},
                {title:'原材料库存',align:'center',key:'stock',minWidth:110},
                {title:'所需原材料数量',align:'center',key:'num',minWidth:150},
                {title:'原材料单价',align:'center',key:'price',minWidth:150},
                {title:'规格型号',align:'center',key:'specifications',minWidth:200},
                {title:'原材料单位',align:'center',key:'unit',minWidth:100},
                {title:'原材料预估费用',align:'center',key:'num_price',fixed:'right',minWidth:100},
            ],
            printTableColums:[
                {title:'原材料名称',align:'center',key:'title',width:180},
                {title:'原材料库存',align:'center',key:'stock',width:118},
                {title:'所需原材料数量',align:'center',key:'num',width:140},
                {title:'规格型号',align:'center',key:'specifications',width:180},
                {title:'原材料单位',align:'center',key:'unit',minWidth:120},
            ],
            tableData:[],
            proxyObj:{},
            loading:false,
            show:false
        }
    },
    mounted(){
        this.getData(this.$route.query)
    },
    methods:{
        getData(row){
            this.loading = true;
            this.axios('/api/order_material_detail',{params:row}).then(res=>{
                this.loading = false;
                this.tableData = res.data.data;
            })
        },
        back(){this.$router.go(-1)},
        powerPoint(){
            this.show= true
            setTimeout(()=>{this.show=false},1000)
        }
    }
}
</script>

<style lang="scss" scoped>
.nav{display: flex;justify-content: space-between;align-items: center;}
/deep/ .ivu-modal-body{padding:0;}
// /deep/ .ivu-modal{top:10px;}
</style>