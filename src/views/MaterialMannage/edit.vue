<template>
    <div>
        <Toptitle :title='title'>
            <Button style="margin-right:10px;">取消</Button>
            <Button type="primary">保存</Button>
        </Toptitle>

        <Form inline>
            <FormItem label="ID"><Input disabled :placeholder="type == 1||type == 2 ? '自定生成': '12'"/></FormItem>
            <FormItem label="分类名称"><Input disabled placeholder="请选择分类"/></FormItem>
            <FormItem label="材质"><Input placeholder="请选择材质"/></FormItem>
            <FormItem label="单价(元)"><Input placeholder="请输入金额"/></FormItem>
            <FormItem label="长"><Input placeholder="请输入长度"/></FormItem>
            <FormItem label="宽"><Input placeholder="请输入宽度"/></FormItem>
            <FormItem label="厚"><Input placeholder="请输入厚度"/></FormItem>
            <FormItem label="单位"><Input placeholder="请输入单位"/></FormItem>
            <FormItem label="库存"><Input placeholder="请输入库存"/></FormItem>
            <FormItem label="预警值"><Input placeholder="请输入预警值"/></FormItem>
            <FormItem label="公式"><Input placeholder="请输入公式"/></FormItem>
            <FormItem label="描述"><Input placeholder="请输入描述"/></FormItem>
        </Form>
    </div>
</template>

<script>
import Toptitle from '../../components/TopTitle/index'
export default {
    data(){
        return {
            title:'',
            type:1,
            info:{
                id:'1',
                title:'红木',
            }
        }
    },
    mounted(){
        this.title = this.$route.params.title;
        this.type = this.$route.params.type
        console.log(this.type)
    }
}
</script>

<style lang="scss" scoped>

</style>