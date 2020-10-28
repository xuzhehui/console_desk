<template>
    <div>
        <FullPage 
        title='原材料预算'
        :showTopSearch='false'
        :loading='loading'
        @searchData='init' 
        @changePage='changePage'
        @changeSize='changeSize'
        :tableColums='tableColums'
        :tableData='tableData'
        :pageIndex='pageIndex'
        :total='total'
        ><div slot='titleButton'>
                <Button @click="back" type='primary' ghost style="margin-right:10px;">返回</Button>
                <Button @click="powerPoint" type='success' ghost>打印原材料</Button>
            </div>

            <Modal v-model="show" :width="794" :closable='false'>
                <Table style="width:100%;" border  :columns='printTableColums' :data='tableData'></Table>
                <div slot="footer"></div>
            </Modal>

        </FullPage>
    </div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
    data(){
        return {
            tableColums:[
                {title:'原材料名称',align:'center',key:'title',fixed:'left',minWidth:100},
                {title:'原材料库存',align:'center',key:'stock',minWidth:100},
                {title:'所需原材料数量',align:'center',key:'num',minWidth:100},
                {title:'原材料单价',align:'center',key:'price',minWidth:100},
                {title:'规格型号',align:'center',minWidth:100},
                {title:'原材料单位',align:'center',key:'unit',minWidth:100},
                {title:'原材料预估费用',align:'center',key:'num_price',fixed:'right',minWidth:100},
            ],
            printTableColums:[
                {title:'原材料名称',align:'center',key:'title',},
                {title:'原材料库存',align:'center',key:'stock',},
                {title:'所需原材料数量',align:'center',key:'num',},
                {title:'规格型号',align:'center',},
                {title:'原材料单位',align:'center',key:'unit',width:'110'},
            ],
            tableData:[{title:'蛋蛋们-d-h-s30-bbg',stock:'12000',num:122222}],
            pageIndex:1,
            pageSize:10,
            total:0,
            proxyObj:{},
            loading:false,
            show:false
        }
    },
    methods:{
        init(row){
            console.log(row)
            row.page_index = this.pageIndex;
            row.page_size = this.pageSize;
            this.proxyObj = row;
            this.getData(row)
        },
        getData(row){
            this.loading = true;
            this.axios('/api/basics_measure_index',{params:row}).then(res=>{
                this.loading = false;
                this.tableData = res.data.data;
                this.total = res.data.total;
            })
        },
        changePage(e){
            this.pageIndex = e;
            this.proxyObj.page_index = this.pageIndex;
            this.getData(this.proxyObj);
        },
        changeSize(e){
            this.pageSize = e;
            this.proxyObj.page_size = this.pageSize;
            this.getData(this.proxyObj);
        },
        back(){this.$router.go(-1)},
        powerPoint(){
            this.show= true
            setTimeout(()=>{print().then(()=>{alert(1)})},1000)
            
        }
    }
}
</script>

<style lang="scss" scoped>
.nav{display: flex;justify-content: space-between;align-items: center;}
/deep/ .ivu-modal-body{padding:0;}
/deep/ .ivu-modal{top:10px;}
</style>