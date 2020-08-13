<template>
    <div>
        <Toptitle :title="title">
            <slot name='titleButton'></slot>
        </Toptitle>
        <div class="nav">
            <Topsearch :list='list' @init='init' @searchData='searchData'/>
            <div>
                <slot name='navButton'></slot>
            </div>
        </div>

        <Table max-height='600' stripe border :columns="tableColums" :data="tableData">
            <template slot-scope="{ row }" slot="set">
                <slot name='set' :row='row'></slot>
            </template>
        </Table>

        <slot></slot>

        <Footer :pageIndex='pageIndex' :total='total' @change='changePage' />
    </div>
</template>

<script>
export default {
    props:{
        list:{
            type:Array,
            default:[],
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
    }
}
</script>

<style lang="scss" scoped>
.nav{display: flex;justify-content: space-between;align-items:center;}
</style>