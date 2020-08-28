<template>
    <div style="height:100%;">
        <Toptitle :title="title">
            <slot name='titleButton'></slot>
        </Toptitle>

        <div class="page-edit">
            <div class="nav" v-if="showTopSearch">
                <Topsearch  :list='list' @init='init' @searchData='searchData'/>
                <div>
                    <slot name='navButton'></slot>
                </div>
            </div>
            <div v-if="logList" slot='text-list' class="log-list" >
                <div class="log-item" v-for="(item,index) of logList" :key="index">
                    <span>{{item.key}}：</span>
                    <span>{{item.value}}</span>
                </div>
            </div>
            <div>
                <slot name='text-list'></slot>
            </div>

            <Table :loading='loading' @on-selection-change='selectTable'   stripe border :columns="tableColums" :data="tableData">
                <template slot-scope="{ row }" slot="set">
                    <slot name='set' :row='row'></slot>
                </template>
            </Table>

            <slot></slot>
        </div>
        <Footer :pageIndex='pageIndex' :total='total' @changeSize='changeSize' @change='changePage' />
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
            default:[],
        },
        tableData:{
            type:Array,
            default:[]
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
        }


    },
    data(){
        return {
            
        }
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
            console.log(e)
            this.$emit('changeSize',e)
        }
    }
}
</script>

<style lang="scss" scoped>
.nav{display: flex;justify-content: space-between;align-items:center;}
.page-edit{overflow: hidden;overflow-y: auto;position:relative;top:20px;height:80%;}
</style>