<template>
    <div class="top-title">
        <div class="title">
            <div></div>
            <span>{{title}}</span>
        </div>
        <div>
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        title:String,
        default:'',
    },
}
</script>

<style lang="scss" scoped>
.top-title{margin-top:10px;display: flex;justify-content: space-between;align-items: center;border-bottom:1px solid #F4F4F4;padding:10px 0;background:#fff;
    .title{font-size:18px;color:#333;font-weight: bold;display:flex;align-items:center;border-radius:5px 5px 0 0;
        div{width:4px;height:16px;background: #3764FF;margin-right:10px;position:relative;top:-1px;}
    }
}
</style>