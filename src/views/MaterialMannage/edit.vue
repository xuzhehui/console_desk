<template>
    <div>
        <Toptitle :title='title'>
            <Button>取消</Button>
            <Button>保存</Button>
        </Toptitle>
    </div>
</template>

<script>
import Toptitle from '../../components/TopTitle/index'
export default {
    data(){
        return {
            title:''
        }
    },
    mounted(){
        this.title = this.$route.params.title;
    }
}
</script>

<style lang="scss" scoped>

</style>