<template>
    <div class="content">
        <Toptitle title="我的消息">
            <Button @click="back" type='primary' ghost style="margin-right:10px;">返回</Button>
        </Toptitle>

        <Footer></Footer>
    </div>
</template>

<script>
export default {
    data(){
        return {

        }
    },
    methods:{
        back(){this.$router.go(-1)}
    }
}
</script>

<style lang="scss" scoped>

</style>