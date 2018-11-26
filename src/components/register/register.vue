<template>
  <div class="register_box">
    <h1 class="title">
      <span>欢迎注册</span>
      <span class="link">已有账号？<router-link to="/login">请登陆</router-link></span>
    </h1>
    <i-form ref="formValidate" v-if="show" :model="formValidate"
            :rules="ruleValidate" :label-width="82">
      <i-form-item label="学校：" prop="schoolid">
        <i-select v-model="formValidate.schoolid" filterable @on-change="test">
            <i-option v-for="item in schools" :value="item.id.toString()" :key="item.id">{{ item.name }}</i-option>
        </i-select>
      </i-form-item>      
      <i-formItem label="性别：" prop="gender" required>
        <i-radioGroup v-model="formValidate.gender">
          <i-radio label="1">
              <span>男</span>
          </i-radio>
          <i-radio label="2">
              <span>女</span>
          </i-radio>
        </i-radioGroup>
      </i-formItem>
      <i-formItem ref="formItem" :class="item.state===1?'ivu-form-item-success':''" :label="`${item.name}：`" :prop="item.alias" v-for="(item,index) in formOptions"
                  :key="'option'+index">
        <i-input v-model="formValidate[item.alias]"
                 :placeholder="`请输入${item.name}`"
                 :type="item.inputType"
                 size="large"
                 :icon="getIcon(item)"
                 :color="`#19be6b`"
                 @on-change="change(index)"
        ></i-input>
      </i-formItem>
      <i-formItem>
        <i-button type="primary" @click="submit">注册</i-button>
        <i-button type="ghost" @click="reset" style="margin-left: 8px">清空</i-button>
      </i-formItem>
    </i-form>
    <span class="agreen">注册视为同意 <a href="#">《法律条款和隐私声明》</a></span>
  </div>
</template>

<script>
import IForm from 'iview/src/components/form';
import IFormItem from 'iview/src/components/form/form-item';
import IInput from 'iview/src/components/input';
import IIcon from 'iview/src/components/icon';
import IButton from 'iview/src/components/button';
import IRadioGroup from 'iview/src/components/radio-group';
import IRadio from 'iview/src/components/radio';
import IModal from 'iview/src/components/modal';
import ISelect from 'iview/src/components/select';
import IOption from 'iview/src/components/select/option';

import register from 'api/register';
import login from 'api/login';
import getSchools from 'api/getSchools';

export default {
  mounted() {
    this.show = false;
    this.initFromData();
    this.getSchoolInfo();
  },
  data() {
    return {
      formOptions: [
        {
          name: '姓名',
          alias: 'name',
          inputType: 'text',
          state: -1,
          rule: [
            { required: true, message: '昵称不能为空', trigger: 'change blur' },
            {
              type: 'string',
              max: 12,
              message: '最长12个字符',
              trigger: 'change blur'
            }
          ]
        },
        {
          name: '用户名',
          alias: 'userid',
          inputType: 'text',
          state: -1,
          rule: [
            {
              required: true,
              message: '用户名不能为空',
              trigger: 'change blur'
            },
            {
              type: 'string',
              pattern: /^[a-zA-Z0-9_-]{6,20}$/,
              message: '支持字母、数字、“-”“_”的组合，6-20个字符',
              trigger: 'change blur'
            }
          ]
        },
        {
          name: '密码',
          alias: 'pwd',
          inputType: 'password',
          state: -1,
          rule: [
            { required: true, message: '密码不能为空', trigger: 'change blur' },
            {
              type: 'string',
              pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,}$/,
              message: '建议使用6位以上的数字和字母的组合',
              trigger: 'change blur'
            },
            {
              type: 'string',
              max: 20,
              message: '密码最长20位',
              trigger: 'change blur'
            }
          ]
        },
        {
          name: '确认密码',
          alias: 'repeatPD',
          inputType: 'password',
          state: -1,
          rule: [
            {
              required: true,
              message: '确认密码不能为空',
              trigger: 'change blur'
            },
            { validator: this.valiPassword, trigger: 'blur' }
          ]
        },
        {
          name: '手机号码',
          alias: 'mobile',
          inputType: 'text',
          state: -1,
          rule: [
            {
              type: 'string',
              pattern: /^1[3|4|5|7|8][0-9]{9}$/,
              message: '格式不正确',
              trigger: 'change blur'
            }
          ]
        },
        {
          name: '邮箱',
          alias: 'email',
          inputType: 'text',
          state: -1,
          rule: [
            {
              type: 'email',
              message: '格式不正确',
              trigger: 'change blur'
            }
          ]
          // },
          // {
          //   name: '验证码',
          //   alias: 'code',
          //   inputType: 'text',
          //   state: -1,
          //   rule: [
          //     {
          //       required: true,
          //       message: '验证码不能为空',
          //       trigger: 'change blur'
          //     },
          //     { validator: this.valiCode, trigger: 'change blur' }
          //   ]
        }
      ],
      formValidate: {
        schoolid: '',
        gender: '1'
      },
      ruleValidate: {
        schoolid: [
          { required: true, message: '请选择学校', trigger: 'change' }
        ],
        gender: [{ required: true, message: '请选择性别', trigger: 'change' }]
      },
      schools: [],
      show: false
    };
  },
  methods: {
    submit() {
      this.$refs.formValidate.validate(valid => {
        if (valid) {
          let data = Object.assign({}, this.formValidate);
          delete data.code;
          delete data.repeatPD;
          data.kemu = '||';
          data.callerid = '';
          register(data)
            .then(() => {
              // 注册成功自动登陆
              IModal.success({
                content: '注册成功!',
                onOk: () => {
                  login({
                    uid: this.formValidate.userid,
                    pwd: this.formValidate.pwd
                  })
                    .then(data => {
                      // 清空input
                      this.reset();
                      (data => {
                        let userinfo = data.split('|');
                        // c# 传参
                        window.getUserInfo = () => {
                          return `${userinfo[0]} ${userinfo[1]} ${
                            userinfo[10]
                          } ${this.remember}`;
                        };
                        // 父iframe 传参
                        window.parent.postMessage(
                          JSON.stringify({
                            userid: userinfo[0],
                            username: userinfo[1],
                            phone: userinfo[3],
                            email: userinfo[4],
                            gender: userinfo[5],
                            school: userinfo[19]
                          }),
                          '*'
                        );
                      })(data);
                    })
                    .catch(err => {
                      IModal.error({
                        content: err.toString(),
                        onOk: () => {
                          this.form.password = '';
                          this.$forceUpdate();
                        }
                      });
                    });
                }
              });
            })
            .catch(err => {
              IModal.error({
                content: err.toString(),
                onOk: () => {
                  this.formValidate.pwd = '';
                  this.formValidate.repeatPD = '';
                  this.$forceUpdate();
                }
              });
            });
        }
      });
    },
    reset() {
      // 隐藏图标
      this.formOptions.forEach(item => {
        item.state = -1;
      });
      this.$refs.formValidate.resetFields();
    },
    valiPassword(rule, value, callback) {
      if (value !== this.formValidate.pwd) {
        callback(new Error('俩次输入密码输入不一致'));
      } else {
        callback();
      }
    },
    valiCode(rule, value, callback) {
      if (value !== this.code) {
        return callback(new Error('验证码不正确'));
      } else {
        return callback();
      }
    },
    change(index) {
      //        console.log(this.$refs.formItem[index], this.$refs.formItem[index].validateState);
      this.formOptions[index].state =
        this.$refs.formItem[index].validateState === 'success' ? 1 : 0;
    },
    getIcon(item) {
      if (item.state === -1) return '';
      else if (item.state === 0) return 'close-circled';
      else if (item.state === 1) {
        // 非必填项为空时 不现实icon
        return this.formValidate[item.alias].trim() !== ''
          ? 'checkmark-circled'
          : '';
      }
    },
    initFromData() {
      let formValidate = {};
      let ruleValidate = {};
      this.formOptions.forEach(item => {
        formValidate[item.alias] = '';
        ruleValidate[item.alias] = item.rule;
      });
      Object.assign(this.ruleValidate, ruleValidate);
      Object.assign(this.formValidate, formValidate);
      this.show = true;
    },
    getSchoolInfo() {
      getSchools()
        .then(data => {
          this.schools = data;
        })
        .catch(res => {
          console.log(res);
        });
    },
    test() {
      console.log(this.formValidate.schoolid);
    }
  },
  components: {
    IInput,
    IIcon,
    IForm,
    IFormItem,
    IButton,
    IRadioGroup,
    IRadio,
    ISelect,
    IOption
  }
};
</script>

<style lang="stylus">
.register_box
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
