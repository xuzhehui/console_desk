<template>
    <div class="content">
        <Menu  :active-name='activeMenu' :open-names='openMenu' @on-select='menuSelect($event,navgationData)'>
            <Submenu v-for="(item,index) of navgationData" :key="index" :name="index">
                <template slot="title">
                    <div class="sort">
                        <svg class="icon icon-nav" aria-hidden="true">
                            <use style="font-size:20px" :xlink:href="item.icon"></use>
                        </svg>
                        <span>{{item.title}}</span>
                    </div>
                </template>
                
                <MenuItem v-if="_item.page" v-for="(_item,_index) of item.sub" :key="_index" :name="index+'-'+_index">{{_item.title}}</MenuItem>
                <Submenu v-else :name="index+'-'+_index">
                    <template slot="title">
                        <svg class="icon icon-nav" aria-hidden="true">
                            <use style="font-size:20px" :xlink:href="_item.icon"></use>
                        </svg>
                        {{_item.title}}
                    </template>
                    <MenuItem v-for="(__item,__index) of _item.sub" :key="__index" :name="index+'-'+_index+'-'+__index">{{__item.title}}</MenuItem>
                </Submenu>

            </Submenu>
            
        </Menu>
    </div>
</template>

<script>
export default {
    props:{
        navgationData:{
            type:Array,
            default:[],
        }
    },
    data(){
        return {
            activeMenu:'',
            openMenu:[],
            c:'#icongongyiluxian'
        }
    },
    created(){
        if(sessionStorage.getItem('open-menu')){
            let open = sessionStorage.getItem('open-menu')
            this.activeMenu = open
            let first = parseInt(open[0])
            this.openMenu.push(first)
        }  
    },
    mounted(){
        
    },
    methods:{
        menuSelect(name,data){
            this.$emit('menuSelect',name,data)
        }
    }
}
</script>

<style lang="scss" scoped>
.content{overflow-y: scroll;overflow-x:hidden;}
.sort{display: flex;align-items: center;
    .icon-nav{margin-right:5px;font-size:16px;}
}
</style>