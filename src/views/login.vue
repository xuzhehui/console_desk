<template>
  <div class="page">
      <div class="login-form">
          <p>登录</p>
          <Form ref='userInfo' :model="userInfo" :rules='rulesInfo'>
              <FormItem label='账号' prop='name'>
                  <Input size="large" placeholder="请输入您的账号" v-model="userInfo.name" />
              </FormItem>

              <FormItem label='密码' prop='password'>
                  <Input type="password" size="large" placeholder="请输入您的密码"  v-model="userInfo.password" />
              </FormItem>

              <div class="auto-login">
                  <Checkbox @on-change="storageUserInfo" v-model="autoLogin">自动登录</Checkbox>
              </div>

              <Button :loading="loading" @click="handleSubmit('userInfo')" size='large' long type="primary">登录</Button>
          </Form>
      </div>
  </div>
</template>

<script>
export default {
    data(){
        return {
            userInfo:{
                name:'',
                password:'',
            },
            rulesInfo:{
                name:[
                    {required: true,message:'请输入账号',trigger:'blur'}
                ],
                password:[
                    {required: true,message:'请输入密码',trigger:'blur'}
                ],

            },
            autoLogin:false,
            loading:false,
        }
    },
    mounted(){
        let flag = JSON.parse(localStorage.getItem('autoLogin'));
        this.autoLogin = flag||false
        if(this.autoLogin){
            let user = JSON.parse(localStorage.getItem('loginInfo'))
            this.userInfo = user;
            setTimeout(()=>{
                this.handleSubmit('userInfo')
            })
            
        }
    },
    methods:{
        submit(){
            let userInfo = JSON.stringify(this.userInfo)
            localStorage.setItem('loginInfo',userInfo)
            this.loading = true
            this.axios.post('/api/login',this.userInfo).then(res=>{
                this.loading = false
                if(res.code == 200){
                    this.$Message.success(res.msg||'登陆成功')
                    if(res.data.token){
                        localStorage.setItem('token',res.data.token)
                        let user = JSON.stringify(res.data.user_info);
                        localStorage.setItem('user_info',user)
                        this.$router.push({name:'Cms'})
                    }
                }
            })
        },
        handleSubmit(name) {
            this.$refs[name].validate((valid) => {
                if(valid){
                    this.submit()
                }
            })
        },
        storageUserInfo(){
            localStorage.setItem('autoLogin',this.autoLogin)
        }
    }
}
</script>

<style lang='scss' scoped>
.page{width:100%;height:100%;background:url('http://121.41.102.225:82/api/pic/basic/index');background-size:100% 100%;
    .login-form{width:610px;height:558px;padding:56px 105px;position:absolute;left:50%;top:50%;transform: translate(10%,-50%);background: #fff;
    box-shadow: 0 2px 7px rgba(0,0,0,.15);border-color: transparent;
        p{text-align: center;font-size:30px;color:#333333;font-family: '苹方-简 中黑体';}
        .auto-login{padding:30px 0 50px 0;}
    }
}
</style>