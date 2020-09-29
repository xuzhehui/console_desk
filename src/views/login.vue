<template>
  <div class="page">

      <div class="info">
          <div class="info-header">
              <span class="complan-title">九方</span>
              <span class="up">--家装版</span>
          </div>
          <div>
              <div class="info-text">
                  <!-- 汇聚全球智慧<br/>构筑万物互联 -->
                  <img src="../assets/imgs/home-text.png" alt="">
              </div>

              <div class="log-text">
                  九方软件实现了以家具生产企业为核心，充分覆盖经销商、生产企业、原材料供应商等三方从订单生成到订单生产到订单交付的全流程可视化掌控
              </div>
              <div class="b-an">粤icp备11016779号 京ICP备</div>
          </div>
      </div>
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
                        this.$router.push({path:'/cms/home',query:{title:'首页'}})
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
// background:url('http://121.41.102.225:82/pic/16003341561647');
.page{width:100%;height:100%;background:url('http://121.41.102.225:82/api/pic/16003345619022');background-size:100% 100%;
    .login-form{width:500px;height:498;padding:56px 75px;position:absolute;left:50%;top:50%;transform: translate(10%,-50%);background: #fff;border-radius:5px;
    box-shadow: 0 2px 7px rgba(0,0,0,.15);border-color: transparent;
        p{text-align: center;font-size:30px;color:#333333;font-family: '苹方-简 中黑体';}
        .auto-login{padding:30px 0 50px 0;}
    }
    .info{position:absolute;top:20%;left:20%;transform: translate(-30%,10%);width:516px;
        .info-header{
            .complan-title{font-size:34px;color:#3764FF;font-family:'PingFangSC-Semibold, PingFang SC';font-weight: 400;}
            .up{font-size:24px;color:#3764FF;font-family:'PingFangSC-Semibold, PingFang SC';font-weight: 300;}
        }
        .info-text{font-size: 90px;font-family: 'YouSheBiaoTiHei';color: #3764FF;line-height:120px;letter-spacing: 2px;font-weight:bold;}
        .log-text{color:#666666;font-size:18px;padding-top:10px;font-family:'PingFangSC-Regular, PingFang SC';}
        .b-an{padding-top:100px;}
    }
}
</style>