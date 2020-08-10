<template>
    <div class="content">
        <Header/>
        <div class="page">
            <div class="navigation">
                <Navgation :navgationData='navgationData'  @menuSelect='menuSelect'/>
            </div>

            <div class="router-map">
                <Crumbs :crumbs="crumbs" />
                <transition :name="transitionName"><router-view class="router-style"/></transition>
            </div>
        </div>
    </div>
</template>

<script>
import Header from '../components/header/index'
import Navgation from '../components/navgation/index'
import Crumbs from '../components/crumbs/index'
import {mapState,mapMutations} from 'vuex'
export default {
    data(){
        return {
            transitionName:'slide-left'
        }
    },
    watch:{
        '$route' (to, from) {
            let toName = to.name
            const toIndex = to.meta.index
            const fromIndex = from.meta.index
            this.transitionName = toIndex < fromIndex ? 'slide-right' : 'slide-left'
        }
    },
    computed:{
        ...mapState(['navgationData','crumbs'])
    },
    mounted(){
        if(sessionStorage.getItem('crumbs')){
            let data = JSON.parse(sessionStorage.getItem('crumbs'))
            this.$store.commit('updateCrumbs',data)
        }
    },
    methods:{
        ...mapMutations(['updateCrumbs']),
        menuSelect(name,data){
            sessionStorage.removeItem('crumbs')
            let split_array = name.split('-');
            let [parant,child] = split_array;
            let parantData = data[parant],childData = parantData.sub[child];
            this.$store.commit('updateCrumbs',{parantData,childData})
            sessionStorage.setItem('crumbs',JSON.stringify({parantData,childData}))
            this.$router.push({
                name:data[parant].sub[child].page
            })
        },
    },
    components:{Header,Navgation,Crumbs}
}
</script>
<style lang="scss" scoped>
.content{height:100%;}
.page{display: flex;height:100%;width:100%;padding-top:80px;
    .navigation{width:230px;height:100%;}
    .router-map{width:100%;height:100%;padding:10px 20px;background:#F0F1F4;
        .router-style{height:93%;border-radius:5px;background:#fff;padding:0 36px;position:relative;}
    }
}

.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  transition: all 500ms;
  position: absolute;
}
.slide-right-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
.slide-right-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}


</style>