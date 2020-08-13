<template>
    <div>
         <Toptitle :title='type == 1 ? "新增工序" : "编辑工序" '>
            <Button @click="back" style="margin-right:10px;">返回</Button>
            <Button type="primary" @click="postData">保存</Button>
        </Toptitle>

        <Form style="width:40%" >
            <FormItem label="ID">
                <Input disabled placeholder="自动生成"></Input>
            </FormItem>
            <FormItem label="工序分类">
                <Select placeholder="请选择分类"></Select>
            </FormItem>
            <FormItem  label="工序名称">
                <Input placeholder="请输入工序分类名称"></Input>
            </FormItem>
            <FormItem label="工时">
                <Input placeholder="请输入工时"></Input>
            </FormItem>
            <FormItem label="产能">
                <Input placeholder="请输入产能"></Input>
            </FormItem>
            <FormItem label="工价">
                <div style="display:flex;width:100%;">
                    <Select style="width:200px;margin-right:10px;"></Select>
                    <Input placeholder="请输入价格"></Input>
                </div>
                
            </FormItem>
        </Form>
    </div>
</template>

<script>
export default {
    data(){
        return {
            type:1,
            id:null,
            info:{},
        }
    },
    mounted(){
        this.type = this.$route.query.type;
        this.id = this.$route.query.id;
    },
    methods:{
        back(){
            this.$router.go(-1)
        },
        postData(){//保存时提交info

        }
    }
}
</script>

<style lang="scss" scoped>

</style>