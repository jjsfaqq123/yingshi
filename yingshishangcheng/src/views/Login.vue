<template>
  <div class="login_mall">
    <div class="header">
      <router-link to="/" class="logo"></router-link>
    </div>
    <div id="parallax">
      <div class="main">
        <div id="parallax_form" class="animated">
          <p class="description_a">欢迎登录萤石商城</p>
          <form id="form">
            <el-input
              v-model="params.uname"
              type="text"
              placeholder="用户名或手机号"
              style="margin-bottom:14px !important"
              :autofocus="true"
            ></el-input>
            <h6 style="color:red;display:none">用户名必须介于6~12位数字或字母</h6>
            <el-input
              v-model="params.upwd"
              type="password"
              placeholder="请输入密码"
              style="margin-bottom:14px !important"
            ></el-input>
          </form>
          <div class="clearfix"></div>
          <div class="msic">
            <label id="u">
              <input type="checkbox" class="auto_login" v-model="automatic" />自动登录
            </label>
            <a href="#" class="forget_pass">忘记密码?</a>
          </div>
          <div class="clearfix"></div>
          <a class="login" @click="login" :plain="true">登&nbsp;&nbsp;&nbsp;录</a>
          <div class="line normal"></div>
          <p class="description_b normal">还没有账户？ 那就注册一个吧！</p>
          <router-link to="/fall" class="register normal" id="register">注册</router-link>
          <div class="tip" id="tip" style="display:none">用户名不能为空 请输入用户名</div>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="wrapper">
        <div class="hikvision"></div>版权所有：
        <a href="/" target="_blank">杭州萤石网络有限公司</a>
        &nbsp;| &nbsp;
        <a href="/" target="_blank">浙ICP备16009593号-1</a>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
//  import { login } from "@/ulits/api"
export default {
  data() {
    return {
      params:{
        uname: "",
        upwd: "",
      },
      automatic: false
    };
  },
  created() {
    this.logins();
  },
  mounted() {
    this.addUp();
  },
  Destroyed() {
    this.distrop();
  },
  computed: {
    ...mapState(["Alertstate" , "userHome"])
  },
  methods: {
    ...mapMutations(["homeAlert" ,"userHomeLet"]),
    async login() {
      //判断用户
      if(!this.params.uname) {
        this.$message.error("用户名不能为空")
        return false;
      }
      //判断用户名长度
      if(this.params.uname.length<6) {
        this.$message.error('用户名最少6位')
        return false;
      }
      //判断密码
      if(!this.params.upwd){
        this.$message.error('密码不能为空');
        return false;
      }
      //判断密码长度
      if(this.params.upwd.length<3){
        this.$message.error('密码长度最少3位');
        return false;
      }
      // let res = await login(this.params) 
      // console.log(res)
     
      var url = "login";
      this.axios.get(url, { params: this.params }).then(res => {
        if (res.data.code == 1) {
          // document.cookie=u + "," + p + ',' +this.automatic;
          if (this.automatic == true) {
            document.cookie = this.params.uname + "," +this.params. upwd + "," + this.automatic;
          } else {
            document.cookie = "";
          }
          this.userHomeLet(this.uname)
          this.homeAlert(true)
          this.$router.push({
            path:"/" ,
            query:{
              alers:true
            }
          });
        } else {
          this.$message.error("用户名密码错误");
        }
      });
     },
    logins() {
      let unames = document.cookie;
      if (unames.length > 1) {
        unames = unames.split(",");
        this.params.uname = unames[0];
        this.params.upwd = unames[1];
        this.automatic = Boolean(unames[2]);
        // yanz
      }
    },
    endkyUp(e) {
      if (e.keyCode == 13) {
        this.login();
      }
    },
    addUp() {
      document.addEventListener("keyup", this.endkyUp);
    },
    distrop() {
      document.removeEventListener("keyup", this.endkyUp);
    }
  }
};
</script>
<style scoped>
html .clearfix {
  height: 1%;
}
.header {
  width: 960px;
  height: 60px;
  margin: auto;
}
.logo {
  width: 368px;
  height: 60px;
  display: block;
  background: url("../../public/img/index/logo_mall.png") no-repeat 0 6px;
}
#parallax {
  width: 100%;
  min-width: 960px;
  height: 510px;
  position: relative;
  overflow: hidden;
  background: url("../../public/img/index/login_main_bg.png") no-repeat center
    top;
}
.main {
  width: 960px;
  height: 540px;
  margin: auto;
  position: relative;
  display: block;
}
.login_mall #parallax_form {
  top: 50px;
  left: 603px;
  width: 220px;
  height: 346px;
  padding: 25px 32px;
}
.login_mall #parallax_form {
  background: url("../../public/img/index/parallax_form_bg_mall.png");
}
#parallax_form {
  width: 226px;
  height: 380px;
  background: url("../../public/img/index/parallax_form_bg_mall.png") no-repeat;
  position: absolute;
  left: 650px;
  top: 65px;
  padding: 25px;
  z-index: 10;
}
#parallax_form.animated {
  width: 284px;
  height: 396px;
}
.description_a {
  font-size: 18px;
  color: red;
  margin: 0;
  margin-bottom: 16px;
}
form {
  margin: 0 0 18px;
}
input[type="text"],
input[type="parssword"] {
  background-color: #fff;
  border: 1px solid #cccccc;
  border-radius: 3px;
  width: 220px;
  height: 29px;
  padding: 4px;
  font-size: 13px;
  margin-bottom: 13px;
  line-height: 18px;
  color: #555555;
}
input[type="text"]:focus {
  box-shadow: 0px 0px 5px 3px navajowhite;
}
input[type="parssword"]:focus {
  box-shadow: 0px 0px 5px 3px navajowhite;
}
.clearfix::after {
  content: "";
  display: table;
  clear: both;
  display: block;
}
.clearfix::before {
  display: table;
  content: "";
}
.msic {
  margin-top: -8px;
}
.msic > .auto_login {
  width: 20px;
  float: left;
}
.forget_pass {
  margin-left: 82px;
  color: #5283d4 !important;
  font-size: 13px;
}
.login {
  width: 225px;
  height: 41px;
  background: url("../../public/img/index/login_btn_normal.png") no-repeat;
  display: block;
  line-height: 41px;
  text-align: center;
  color: #fff;
  font-size: 18px;
  margin-top: 15px;
  text-decoration: none;
}
.login:hover {
  background: url("../../public/img/index/login_btn_hover.png") no-repeat;
  text-decoration: none;
  cursor: pointer;
}
.login_mall #parallax_form .line {
  bottom: 100px;
}
.line {
  position: absolute;
  bottom: 145px;
  width: 220px;
  border: 1px dashed #d5d5d5;
}
.login_mall #parallax_form .description_b {
  bottom: 60px;
}
#parallax_form .description_b {
  position: absolute;
  bottom: 105px;
  color: #595959;
  width: 186px;
  height: 18px;
  font-size: 13px;
}
.login_mall #parallax_form .register {
  bottom: 30px;
}
#parallax_form .register {
  width: 222px;
  height: 29px;
  position: absolute;
  font-size: 14px;
  text-align: center;
  line-height: 29px;
  color: #b00;
  display: block;
  background: url("../../public/img/index/register_btn_normal.png") no-repeat;
  bottom: 75px;
}
.login_mall {
  padding-top: 120.5px;
}
.footer {
  width: 100%;
  min-width: 960px;
  height: 34px;
  margin-top: 50px;
  border-top: none;
  border-bottom: none;
  margin-top: 12px;
  clear: both;
  position: static;
  margin-bottom: 14px;
  z-index: 999;
  font-size: 12px;
  font-family: 宋体，arial, STHeiti;
}
.footer > .wrapper {
  width: 960px;
  margin: auto;
  line-height: 32px;
  color: #626262;
}
.hikvision {
  width: 111px;
  height: 18px;
  float: left;
  padding-left: 220px;
  background: url("../../public/img/index/icon_logobt.png") right top no-repeat;
  margin-left: 0px;
  margin-top: 8px;
}
.footer > .wrapper a {
  line-height: 32px;
  color: #626262;
}
#parallax_form .tip {
  width: 207px;
  height: 34px;
  background: #fee;
  border: solid 1px #fac8c8;
  position: absolute;
  top: 16px;
  color: #ff7474;
  font-size: 14px;
  line-height: 34px;
  padding-left: 10px;
  display: block;
}
</style>

