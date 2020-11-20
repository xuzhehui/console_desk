<template>
    <div>
        <Toptitle :title='$route.query.title||"null"'>
            <Button  @click="back" type='primary' ghost  style="margin-right:10px;">返回</Button>
            <Button  type='primary' @click="handleSubmit('forms')" :disabled='$route.query.type == 3'>保存</Button>
        </Toptitle>
        <Form ref='forms' style="margin-top:20px;" :label-width="110" :model="postInfo" :rules='rules'>
            <FormItem label='消息通知名称' prop='title'>
                <Input v-model="postInfo.title" style="width:200px"/>
            </FormItem>
            <FormItem label='通知类型' prop='type'>
                <Select style="width:200px" v-model="postInfo.type">
                    <Option label="1" :value='1'></Option>
                </Select>
            </FormItem>
            <FormItem label='是否启用'>
                <i-switch v-model="postInfo.state" :true-value='1' :false-value='0'></i-switch>
            </FormItem>
            <FormItem label='通知内容'>
                <quillEditor v-model="postInfo.content" style="height:400px;"></quillEditor>
            </FormItem>
        </Form>
    </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
export default {
    data(){
        return {
            postInfo:{
                title:'',
                type:null,
                state:0,
                content:'',
                op:this.$route.query.type == 1 ? 'add' : (this.$route.query.type == 2 ? 'edit' : '')
            },
            rules:{
                title:[{required: true,message:'消息通知名称',trigger:'blur'}],
                type:[{required: true,message:'请选择通知类型'}],
                content:[{required: true,message:'请输入内容'}]
            }
        }
    },
    mounted(){
        const id = this.$route.query.id
        if(id){
            this.axios('/api/notice_message/detail').then(res=>{
                res.code == 200 ? (()=>{
                    this.postInfo = res.data
                })() : ''
            })
        }
    },
    methods:{
        back(){this.$router.go(-1)},
        postData(){
            const result = JSON.stringify(this.postInfo)
            this.axios.post('/api/notice_message/save',result).then(res=>{
                if(res.code == 200){
                    this.$Message.success(res.msg||'操作成功')
                    this.back()
                }
            })
        },
        handleSubmit(name) {
            this.$refs[name].validate((valid) => {
                if(valid){
                    this.postData()
                }
            })
        },
    },
    components:{quillEditor}
}
</script>