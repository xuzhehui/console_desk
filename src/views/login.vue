<template>
  <div class="page">
      <div class="login-form">
          <p>登录</p>
          <Form ref='userInfo' :model="userInfo" :rules='rulesInfo'>
              <FormItem label='账号' prop='user_name'>
                  <Input size="large" placeholder="请输入您的账号" v-model="userInfo.user_name" />
              </FormItem>

              <FormItem label='密码' prop='pass_word'>
                  <Input size="large" placeholder="请输入您的密码"  v-model="userInfo.pass_word" />
              </FormItem>

              <FormItem label='选择角色' prop='type'>
                  <Select size="large" v-model="userInfo.type" >
                      <Option v-for="item of type_list" :key="item.id" :label="item.name" :value="item.id"></Option>
                  </Select>
              </FormItem>

              <div class="auto-login">
                  <Checkbox @on-change="storageUserInfo" v-model="autoLogin">自动登录</Checkbox>
              </div>

              <Button @click="handleSubmit('userInfo')" size='large' long type="primary">登录</Button>
          </Form>
      </div>
  </div>
</template>

<script>
export default {
    data(){
        return {
            userInfo:{
                user_name:'',
                pass_word:'',
                user_type:null,
            },
            rulesInfo:{
                user_name:[
                    {required: true,message:'请输入账号',trigger:'blur'}
                ],
                pass_word:[
                    {required: true,message:'请输入密码',trigger:'blur'}
                ],
                type:[
                    {required: true,message:'请选择角色',trigger:'change'}
                ]

            },
            type_list:[
                {id:'1',name:'管理员'}
            ],
            autoLogin:false,
        }
    },
    mounted(){
        
    },
    methods:{
        submit(){

        },
        handleSubmit(name) {
            this.$refs[name].validate((valid) => {
                if(valid){
                    this.$Message.success('Success!');
                    this.submit()
                }
            })
        },
        storageUserInfo(){
            let userInfo = JSON.stringify(this.userInfo)
            localStorage.setItem('userInfo',userInfo)
            console.log(JSON.parse(localStorage.getItem('userInfo')))
        }
    }
}
</script>

<style lang='scss' scoped>
.page{
    .login-form{width:610px;height:658px;padding:56px 105px;position:absolute;left:50%;top:50%;transform: translate(10%,-50%);
    box-shadow: 0 2px 7px rgba(0,0,0,.15);border-color: transparent;
        p{text-align: center;font-size:30px;color:#333333;font-family: '苹方-简 中黑体';}
        .auto-login{padding:30px 0 50px 0;}
    }
}
</style>