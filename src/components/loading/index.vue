<template>

    <div :class="show ? 'loading-box' : 'loading-box-hide'">
      <transition name="bounce" >
        <div v-show="show" class='loading-padding' >
            <atom-spinner
            :animation-duration="1000"
            :size="60"
            color="#ff1d5e"
            />
            <span>玩命加载中</span>
        </div>
      </transition>
    </div>

</template>

<script>
import { AtomSpinner } from 'epic-spinners'
export default {
    data(){
        return {
            show:true,
        }
    },
    components:{
        AtomSpinner
    }
}
</script>

<style lang="scss">
.loading-box{padding:20px 60px;display:flex;justify-content:center;align-items:center;position:fixed;left:50%;top:50%;;z-index:99999;transform: translate(-50%,-50%);} 
.loading-box-hide{padding:20px 60px;display:flex;justify-content:center;align-items:center;position:fixed;left:50%;top:50%;;z-index:-1;transform: translate(-50%,-50%);}
.loading-padding{padding:20px 60px;background:rgba(0,0,0,.1);border-radius:5px;display:flex;flex-direction:column;align-items:center;}
.spinner-line{border-left-color:#2d8cf0!important;color:#2d8cf0!important;}
.atom-spinner .spinner-circle{color:#2d8cf0!important;}
.bounce-enter-active {
  animation: bounce-in .5s;
}
.bounce-leave-active {
  animation: bounce-in .5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
</style>