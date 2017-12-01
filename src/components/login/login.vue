<template>
  <div class="login_box">
    <i-form ref="formValidate" v-if="show" :model="formValidate"
            :rules="ruleValidate" :label-width="100">
      <i-formItem ref="formItem" :label="`${item.name}：`" :prop="item.alias" v-for="(item,index) in formOptions"
                  :key="'option'+index">
        <i-input v-model="formValidate[item.alias]"
                 :placeholder="`请输入${item.name}`"
                 :type="item.inputType"
                 size="large"
                 :icon="getIcon(item.state)"
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

  import Message from 'iview/src/components/message';

  export default {
    mounted() {
      this._initFromData();
    },
    data() {
      return {
        formOptions: [
          {
            name: '昵称',
            alias: 'nickname',
            inputType: 'text',
            state: -1,
            rule: [
              {required: true, message: '昵称不能为空', trigger: 'change blur'},
              {type: 'string', max: 12, message: '最长12个字符', trigger: 'change blur'}
            ]
          },
          {
            name: '用户名',
            alias: 'username',
            inputType: 'text',
            state: -1,
            rule: [
              {required: true, message: '用户名不能为空', trigger: 'change blur'},
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
            alias: 'password',
            inputType: 'password',
            state: -1,
            rule: [
              {required: true, message: '密码不能为空', trigger: 'change blur'},
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
              {required: true, message: '确认密码不能为空', trigger: 'change blur'},
              {validator: this.valiPassword, trigger: 'blur'}
            ]
          },
          {
            name: '手机号码',
            alias: 'phone',
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
          },
          {
            name: '验证码',
            alias: 'code',
            inputType: 'text',
            state: -1,
            rule: [
              {
                required: true,
                message: '验证码不能为空',
                trigger: 'blur'
              },
              {validator: this.valiCode, trigger: 'blur'}
            ]
          }
        ],
        formValidate: {},
        ruleValidate: {},
        code: 'abcd'
      };
    },
    computed: {
      show() {
        return Object.keys(this.formValidate).length > 0 && Object.keys(this.ruleValidate).length > 0;
      }
    },
    methods: {
      submit() {
        this.$refs.formValidate.validate((valid) => {
          if (valid) {
            Message.success('Success!');
          } else {
            Message.error('Fail!');
          }
        });
      },
      reset() {

      },
      valiPassword(rule, value, callback) {
        if (value !== this.formValidate.password) {
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
        this.formOptions[index].state = this.$refs.formItem[index].validateState === 'success' ? 1 : 0;
      },
      getIcon(state) {
        if (state === -1) return '';
        else if (state === 0) return 'close-circled';
        else if (state === 1) return 'checkmark-circled';
      },
      _initFromData() {
        let formValidate = {};
        let ruleValidate = {};
        this.formOptions.forEach((item) => {
          formValidate[item.alias] = '';
          ruleValidate[item.alias] = item.rule;
        });
        this.formValidate = formValidate;
        this.ruleValidate = ruleValidate;
      }
    },
    watch: {
      formValidate: {
        deep: true,
        handler(newVal) {
//          console.log(newVal);
        }
      }
    },
    components: {
      IInput,
      IIcon,
      IForm,
      IFormItem,
      IButton
    }
  };
</script>

<style scoped lang="stylus">
  .login_box
    max-width: 800px
    margin: 0 auto
    padding: 15px
    overflow: hidden
    .agreen
      float: right
      margin:0 0 20px
</style>
