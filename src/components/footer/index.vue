<template>
    <div class="footer-page">
        <div>
            <Page @on-page-size-change='changeSize' @on-change='changePage' :current='pageIndex' show-total :total="total" show-sizer :page-size='pageSize' />
        </div>
        
    </div>
</template>

<script>
export default {
    props:{
        total:{
            type:Number,
            default:0,
        },
        pageIndex:{
            type:Number,
            default:1,
        },
        pageSize:{
            type:Number,
            default:10,
        }
    },
    data(){
        return {

        }
    },
    methods:{
        changePage(e){
            this.$emit('change',e)
        },
        changeSize(e){
            this.$emit('changeSize',e)
        }
    }
}
</script>

<style lang="scss" scoped>
.footer-page{display: flex;justify-content: center;align-items: center;position:absolute;left:0;width:100%;bottom:20px;
    div{width:100%;display: flex;justify-content: center;}
}
</style>