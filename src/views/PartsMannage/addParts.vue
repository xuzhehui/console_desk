<template>
    <div>
        <Toptitle title='新增零部件'>
            <Button @click="back" style="margin-right:10px;">返回</Button>
            <Button @click="postData">保存</Button>
        </Toptitle>

        <Form inline>
            <FormItem label="零部件ID">
                <Input disabled placeholder="自动生成"></Input>
            </FormItem>

            <FormItem label="零部件名称">
                <Input placeholder="请输入零部件名称"></Input>
            </FormItem>

            <FormItem label="数量">
                <Input placeholder="请输入数量"></Input>
            </FormItem>
            <FormItem label="单位">
                <Input placeholder="请输入单位"></Input>
            </FormItem>
            <FormItem label="长(L)">
                <Input placeholder="请输入公式(自动唤出软键盘)"></Input>
            </FormItem>
            <FormItem label="宽(W)">
                <Input placeholder="请输入公式(自动唤出软键盘)"></Input>
            </FormItem>
            <FormItem label="厚(H)">
                <Input placeholder="请输入公式(自动唤出软键盘)"></Input>
            </FormItem>
            <FormItem label="工艺要求">
                <Input placeholder="请输入工艺要求"></Input>
            </FormItem>
            <FormItem label="标签">
                <Select></Select>
            </FormItem>
        </Form>
    </div>
</template>

<script>
export default {
    data(){
        return {
            info:{
                until:''
            },
        }
    },
    mounted(){
        this.type = this.$route.query.type;
        this.id = this.$route.query.id;
        this.getParts()
    },
    methods:{
        back(){
            this.$router.go(-1)
        },
        postData(){

        },
    }
}
</script>

<style lang="scss" scoped>
.edit-table-log{display: flex;justify-content: space-between;align-items: center;padding-bottom:10px;
    .footer-log{color:#666666}
}
</style>