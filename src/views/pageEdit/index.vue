<template>
    <div class="general">
        <Toptitle :title='$route.params.title'>
            <Button @click="back" style="margin-right:10px;">返回</Button>
            <Button @click="postData(1)">保存</Button>
        </Toptitle>
        <div class="page-edit">
            <Generaladd @change="change" :list='list'></Generaladd>
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
        change(e,n){
            if(this.$route.params.type == '零部件'){
                let event = JSON.parse(window.event.target.dataset.info);
                this.list[n].info.map(v=>{
                    if(v.serverName == 'thick'){
                        v.value = event.high
                    }
                    v._title = event.title;
                })
            }

            if(this.$route.params.type == '部件'){
                let event = JSON.parse(window.event.target.dataset.info);

                this.list[n].info.map(v=>{
                    v._title = event.title;
                })
            }
        },
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
                    if(k._title){
                        obj.title = k._title
                    }
                })
                result.push(obj)
            })
            console.log(result)
            return result;
        }
    }
}
</script>

<style lang="scss" scoped>

</style>