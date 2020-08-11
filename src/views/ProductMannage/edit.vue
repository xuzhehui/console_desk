<template>
    <div>
        <Toptitle :title='type == 1 ? "新增商品" : (type == 2 ? "编辑商品" : "查看商品") '>
            <Button @click="back" style="margin-right:10px;">返回</Button>
            <Button v-if="type == 1 || type == 2" type="primary" @click="postData">保存</Button>
        </Toptitle>

        <div class="product-add">
            <div class="add-items">
                <Icon size='100' type="md-add" />
                <input @change="changeIpt" type="file" class="ipt"/>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            type:1,
            id:null,
            addImgList:[],
        }
    },
    mounted(){
        this.type = this.$route.query.type;
        this.id = this.$route.query.id;
    },
    methods:{
        postData(){

        },
        back(){
            this.$router.go(-1)
        },
        changeIpt(e){
            console.log(e.target.files[0])
            let url = window.URL.createObjectURL(e.target.files[0]);
            console.log(url)
            console.log(e.target.value = null)
        }
    }
}
</script>

<style lang="scss" scoped>
.product-add{padding:10px 0;
    .ipt{position:absolute;width:100%;height:100%;opacity:0;cursor: pointer;}
    .add-items{width:240px;height:240px;background:#E7E7E7;border-radius:5px;display: flex;justify-content: center;align-items: center;;}
}
</style>