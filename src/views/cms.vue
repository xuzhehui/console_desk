<template>
    <div class="content">
        <Header/>
        <div class="page">
            <div class="navigation">
                <Navgation :navgationData='navgationData'  @menuSelect='menuSelect'/>
            </div>

            <div class="router-map">
                <Crumbs :crumbs="crumbs" />
                <transition :name="transitionName"><router-view :class="['router-style',$route.query.title == '首页'||$route.name=='ProductionCharts' ? 'router-style-home' : 'router-style-page']"/></transition>
            </div>
        </div>
    </div>
</template>

<script>
import Header from '../components/header/index'
import Navgation from '../components/navgation/index'
import Crumbs from '../components/crumbs/index'
import {mapState,mapMutations,mapActions} from 'vuex'
export default {
    data(){
        return {
            transitionName:'slide-left',
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
    created(){
        // this.undata_navData()
    },
    mounted(){
        if(sessionStorage.getItem('crumbs')){
            let data = JSON.parse(sessionStorage.getItem('crumbs'))
            this.$store.commit('updateCrumbs',data)
        }
    },
    methods:{
        ...mapMutations(['updateCrumbs']),
        ...mapActions(['undata_navData']),
        menuSelect(name,data){
            sessionStorage.setItem('open-menu',name)
            sessionStorage.removeItem('crumbs')
            if(this.func.isType(name) == 'Number'){//若一级菜单带page的情况下
                let s = data[name]
                this.$store.commit('updateCrumbs',{s})
                sessionStorage.setItem('crumbs',JSON.stringify({parantData,childData,lastChild}))
                return this.$router.push({
                    path:data[name].page,
                    query:{
                        title:s.title,
                        id:s.id
                    }
                })
            }
            let split_array = name.split('-');
            let [parant,child,last,end,next_end] = split_array;
            let parantData = data[parant],childData = parantData.sub[child],lastChild,endChild,nextEndChild;
            if(last){
                lastChild = childData.sub[last]
            }
            if(end){
                endChild = lastChild.sub[end]
            }
            if(next_end){
                nextEndChild = endChild.sub[next_end]
            }
            this.$store.commit('updateCrumbs',{parantData,childData,lastChild,endChild,nextEndChild})
            sessionStorage.setItem('crumbs',JSON.stringify({parantData,childData,lastChild,endChild,nextEndChild}))
            let page = nextEndChild ? nextEndChild.page : (endChild ? endChild.page : (lastChild ? lastChild.page : childData.page))
            let title = nextEndChild ? nextEndChild.title : (endChild ? endChild.title : (lastChild ? lastChild.title : childData.title))
            let id = nextEndChild ? nextEndChild.id : (endChild ? endChild.id : (lastChild ? lastChild.id : childData.id||''))
            this.$router.push({
                path:page,
                query:{
                    title:title,
                    id:id,
                }
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
        .router-style{height:93%;border-radius:5px;background:#fff;position:relative;}
        .router-style-page{padding:0 36px;}
        .router-style-home{padding:0;}
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