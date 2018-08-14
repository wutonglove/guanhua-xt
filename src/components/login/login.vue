<template>
<div class="login_box">
  <h1 class="title">
    <span>欢迎登陆</span>
    <span class="link">还没有账号？<router-link to="/register">立即注册</router-link></span>
  </h1>
  <i-form ref="formInline" :model="form" :rules="rule">
        <i-form-item prop="username">
            <i-input type="text" v-model="form.username" placeholder="请输入用户名">
            </i-input>
        </i-form-item>
        <i-form-item prop="password">
            <i-input type="password" v-model="form.password" placeholder="请输入密码">
            </i-input>
        </i-form-item>
         <i-form-item>
             <i-checkbox v-model="remember">记住密码</i-checkbox>
        </i-form-item>
        <i-form-item>
            <i-button type="primary" @click="login('formInline')">登陆</i-button>
        </i-form-item>
    </i-form>
    <a href="/"></a>
</div>
</template>

<script>
import IForm from 'iview/src/components/form';
import IFormItem from 'iview/src/components/form/form-item';
import IInput from 'iview/src/components/input';
import IIcon from 'iview/src/components/icon';
import IButton from 'iview/src/components/button';
import ICheckbox from 'iview/src/components/checkbox';
import IModal from 'iview/src/components/modal';

import login from 'api/login';

export default {
  data() {
    return {
      form: {
        username: '',
        password: ''
      },
      rule: {
        username: [
          {
            required: true,
            message: '用户名不能为空',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }
        ]
      },
      remember: false
    };
  },
  methods: {
    login(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          login({ uid: this.form.username, pwd: this.form.password })
            .then(data => {
              IModal.success({
                content: '登陆成功',
                okText: '确定',
                onOk: () => {
                  (data => {
                    let userinfo = data.split('|');
                    window.getUserInfo = () => {
                      // return {
                      //   uid: userinfo[0],
                      //   uname: userinfo[1],
                      //   role: userinfo[10],
                      //   remember: this.remember
                      // };
                      return `${userinfo[0]} ${userinfo[1]} ${userinfo[10]} ${
                        this.remember
                      }`;
                    };
                  })(data);
                }
              });
            })
            .catch((err) => {
              // console.log(err);
              IModal.error({
                content: err.toString(),
                onOk: () => {
                  this.form.password = '';
                  this.$forceUpdate();
                }
              });
            });
        } else {
          this.$Message.error('用户名密码不正确');
        }
      });
    }
  },
  components: {
    IForm,
    IFormItem,
    IInput,
    IIcon,
    IButton,
    ICheckbox,
    IModal
  }
};
</script>

<style lang="stylus">
.login_box
  max-width: 800px
  min-width: 400px
  margin: 0 auto
  padding: 30px 15px 15px
  overflow: hidden
  .title
    font-size: 20px
    margin-bottom: 35px
    padding-left: 15px
    line-height: 50px
    border-bottom: 2px solid #ccc
    .link
      font-size: 14px
      float: right
  .ivu-form-item-success
    .ivu-input-icon
      color: #00CD9D
  .agreen
    float: right
    margin: 0 0 20px
</style>

