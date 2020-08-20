<template>
    <div class="content">
        <Menu :active-name='activeMenu' :open-names='openMenu' @on-select='menuSelect($event,navgationData)'>
            <Submenu v-for="(item,index) of navgationData" :key="index" :name="index">
                <template slot="title">
                    <Icon type="ios-analytics" />
                    {{item.title}}
                </template>
                
                <MenuItem v-if="_item.page" v-for="(_item,_index) of item.sub" :key="_index" :name="index+'-'+_index">{{_item.title}}</MenuItem>
                <Submenu v-else name="2">
                    <template slot="title">
                        <Icon type="ios-filing" />
                        {{_item.title}}
                    </template>
                    <MenuItem v-for="(__item,__index) of _item.sub" :key="__index" :name="index+'-'+_index+'-'+__index">{{__item.title}}</MenuItem>
                </Submenu>

            </Submenu>
            <!-- <Submenu name="2">
                <template slot="title">
                    <Icon type="ios-filing" />
                    财务管理
                </template>
                <MenuItem name="2-1">Option 5</MenuItem>
                <MenuItem name="2-2">Option 6</MenuItem>
                <Submenu name="3">
                    <template slot="title">Submenu</template>
                    <MenuItem name="3-1">Option 7</MenuItem>
                    <MenuItem name="3-2">Option 8</MenuItem>
                </Submenu>
            </Submenu> -->
            
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
.content{overflow-y: scroll;
        overflow-x:hidden;
}
</style>