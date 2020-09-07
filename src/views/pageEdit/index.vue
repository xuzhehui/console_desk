<template>
    <div class="general">
        <Toptitle :title='$route.params.title'>
            <Button @click="back" style="margin-right:10px;">返回</Button>
            <Button @click="postData(1)">保存</Button>
        </Toptitle>
        <div class="page-edit">
            <Generaladd :list='list'></Generaladd>
        </div>
    </div>
</template>

<script>
import {mapMutations} from 'vuex'
export default {
    data(){
        return {
            list:[],
            type:this.$route.params.type
        }
    },
    created(){
        if(this.$route.params.list){
            this.list = this.$route.params.list
        };
    },
    methods:{
        ...mapMutations(['savePageEditData']),
        postData(){
            this.savePageEditData(this.computedData());
            this.back()
        },
        back(){
            this.$router.go(-1)
        },
        computedData(){
            let result = [];
            this.list.map(v=>{
                let obj = {}
                v.info.map(k=>{
                    obj[k.serverName] = k.value
                })
                result.push(obj)
            })
            return result;
        }
    }
}
</script>

<style lang="scss" scoped>

</style>