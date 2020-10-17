<template>
    <div style="height:100%;">
        <Toptitle :title="title">
            <slot name='titleButton'></slot>
        </Toptitle>

        <div class="page-edit">
            <div class="nav" v-if="showTopSearch">
                <Topsearch :showbtn='showbtn' @changeSelected='changeSelected'  :list='list' @init='init' @searchData='searchData'/>
                <div style="padding-bottom:15px;">
                    <slot name='navButton'></slot>
                </div>
            </div>
            <div v-if="logList" slot='text-list' class="log-list" >
                <div class="log-item" v-for="(item,index) of logList" :key="index">
                    <span>{{item.key}}：</span>
                    <span :style="item.color ? 'color:'+item.color : ''">{{item.value}}</span>
                </div>
            </div>
            <div>
                <slot name='text-list'></slot>
            </div>

            <Table ref='table' v-if="showTable" :max-height='tableHeight' :width="tableWidth" :loading='loading' @on-selection-change='selectTable'   stripe border :columns="tableColums" :data="tableData">
                <template slot-scope="{ row }" slot="set">
                    <slot name='set' :row='row'></slot>
                </template>
            </Table>

            <slot></slot>
        </div>
        <Footer v-if="showPage" :pageIndex='pageIndex' :total='total' @changeSize='changeSize' @change='changePage' />
    </div>
</template>

<script>
export default {
    props:{
        list:{
            type:Array,
            default:null,
        },
        tableColums:{
            type:Array,
        },
        tableData:{
            type:Array,
        },
        pageIndex:{
            type:Number,
            default:1
        },
        total:{
            type:Number,
            default:100
        },
        title:{
            type:String,
            default:''
        },
        showTopSearch:{
            type:Boolean,
            default:true,
        },
        loading:{
            type:Boolean,
            default:false,
        },
        logList:{
            type:Array,
            default:null,
        },
        showPage:{
            type:Boolean,
            default:true,
        },
        showbtn:{
            type:Boolean,
            default:true
        },
        showTable:{
            type:Boolean,
            default:true,
        }


    },
    data(){
        return {
            tableWidth:null,
            tableHeight:null,
        }
    },
    created(){
        this.tableWidth = window.innerWidth-300;
        this.$nextTick(()=>{
            console.log(this.$refs.table.$el.offsetTop)
            this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 320
        })
        
    },
    mounted(){
        window.addEventListener('resize',(e)=>{
            this.tableWidth = e.target.innerWidth - 300;
            this.tableHeight = e.target.innerHeight - this.$refs.table.$el.offsetTop - 320;
            this.$forceUpdate()
        })
    },
    
    methods:{
        init(row){
            this.$emit('init',row)
        },
        searchData(row){
            this.$emit('searchData',row)
            
        },
        changePage(e){
            this.$emit('changePage',e)
        },
        selectTable(e){
            this.$emit('selectTable',e)
        },
        changeSize(e){
            this.$emit('changeSize',e)
        },
        changeSelected(e){
            this.$emit('changeSelected',e)
        }
    }
}
</script>

<style lang="scss" scoped>
.nav{display: flex;justify-content: space-between;align-items:flex-end;}
.page-edit{overflow: hidden;overflow-y: auto;position:relative;top:0px;height:80%;}
</style>