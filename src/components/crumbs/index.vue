<template>
    <div class="crumbs">
        <div class="home" @click="crumbsTapHome">
            <div class="home-icon">
                <Icon type="md-home" size='20' />
            </div>
        </div>

        <div @click="crumbsTap(item,index)" class="next-crumbs" v-for="(item,index) of crumbs" :key="item.title" :style="computedStyle(index)">
            <div class="next-text">
                {{item.title}}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        crumbs:{
            type:Array,
            default:[]
        }
    },
    data(){
        return {
            
        }
    },
    methods:{
        computedStyle(index){//计算各子菜单间的距离与层级关系
            let style = '';
            if(index == 0){
                style = 'z-index:99'
            }else{
                let left = 30*(index+1);
                style = `z-index:${99-index};left:${-left}px`
            }
            return style
        },
        crumbsTap(row,index){//点击除首页外的其他子项，首页比较特殊所以单独提取出来
            this.$emit('crumbsTap',row,index)
        },
        crumbsTapHome(){
            //默认逻辑去往首页
        }
    }
}
</script>

<style lang="scss" scoped>
.crumbs{display: flex;
    .home{height:40px;display: flex;position:relative;z-index:999;cursor:pointer;
        .home-icon{background:#fff;height:100%;line-height: 40px;padding: 0 10px;border-radius:5px 0 0 5px;}
         &::after{content:'';width:0;height:0;border-top: 20px solid transparent;border-left: 20px solid #fff;border-bottom: 20px solid transparent;position:relative;}
    }
    .cru-right{width:0;height:0;border-top: 20px solid transparent;border-left: 20px solid #fff;border-bottom: 20px solid transparent;}
    .next-crumbs{height:40px;display:flex;position:relative;left:-30px;z-index:1;cursor:pointer;
        .next-text{line-height: 40px;padding:0 20px 0 40px;background: #fff;}
        &:before{content:'';width:0;height:0;border-top: 20px solid transparent;border-left: 20px solid #F0F1F4;border-bottom: 20px solid transparent;position:relative;z-index:3;left:20px;}
        &::after{content:'';width:0;height:0;border-top: 20px solid transparent;border-left: 20px solid #fff;border-bottom: 20px solid transparent;position:relative;}
        &:last-child{color:#3764FF; }
    }
}
</style>