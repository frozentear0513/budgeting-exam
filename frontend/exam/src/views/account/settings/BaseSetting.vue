<template>
  <div class="account-settings-info-view">
    <h3><span>注册</span></h3>
    <a-form layout="vertical" ref="formSave" :form="form" id="formSave">

          <a-form-item
            label="昵称"
          >

            <a-input
              size="large"
              type="text"
              placeholder="请输入帐户名"
              v-decorator="[
                'nickname',
                {rules: [{ required: true, message: '昵称' }], validateTrigger: 'change'}
              ]"
            ></a-input>
          </a-form-item>
          <!--<a-form-item
            label="描述"
          >
            <a-textarea rows="4" placeholder="You are not alone."/>
          </a-form-item>-->

          <a-form-item
            label="电子邮件"

          >
            <a-input
              size="large"
              type="text"
              placeholder="输入邮箱地请址"
              v-decorator="['email', {rules: [{ required: false, type: 'email', message: '输入邮箱地请址' }]}]"
            ></a-input>
          </a-form-item>
          <a-form-item
            label="登录密码"
          >
            <a-input
              size="large"
              type="password"
              @click="handlePasswordInputClick"
              autocomplete="false"
              placeholder="至少6位密码，区分大小写"
              v-decorator="['password', {rules: [{ required: true, message: '至少6位密码，区分大小写'}, { validator: this.handlePasswordLevel }], validateTrigger: ['change', 'blur']}]"
            ></a-input>
          </a-form-item>

          <a-form-item>
            <a-button  size="large"
                      type="primary"
                      htmlType="submit"
                      class="register-button"
                      :loading="saveBtn"
                      @click.stop.prevent="handleSubmit"
                      :disabled="saveBtn">

              提交</a-button>
            <!--<a-button style="margin-left: 8px">保存</a-button>-->
          </a-form-item>
        </a-form>


     <!-- <a-col :md="24" :lg="8" :style="{ minHeight: '180px' }">
        <div class="ant-upload-preview" @click="$refs.modal.edit(1)" >
          <a-icon type="cloud-upload-o" class="upload-icon"/>
          <div class="mask">
            <a-icon type="plus" />
          </div>
          <img :src="option.img"/>
        </div>
      </a-col>

    </a-row>-->

    <!--<avatar-modal ref="modal">

    </avatar-modal>-->
  </div>
</template>

<script>
import { save } from '../../../api/user'

export default  {
name: 'BaseSetting',
  components: {
      },
  data () {
    return {
      // cropper
      preview: {},
      option: {
        img: '/avatar2.jpg',
        info: true,
        size: 1,
        outputType: 'jpeg',
        canScale: false,
        autoCrop: true,
        // 只有自动截图开启 宽度高度才生效
        autoCropWidth: 180,
        autoCropHeight: 180,
        fixedBox: true,
        // 开启宽度和高度比例
        fixed: true,
        fixedNumber: [1, 1]
      },
        form: this.$form.createForm(this),
        state: {
            time: 60,
            smsSendBtn: false,
            passwordLevel: 0,
            passwordLevelChecked: false,
            percent: 10,
            progressColor: '#FF0000'
        },
       // registerBtn: false
        saveBtn : false
    }
  },
  methods: {

      handlePasswordLevel (rule, value, callback) {
          let level = 0

          // 判断这个字符串中有没有数字
          if (/[0-9]/.test(value)) {
              level++
          }
          // 判断字符串中有没有字母
          if (/[a-zA-Z]/.test(value)) {
              level++
          }
          // 判断字符串中有没有特殊符号
          if (/[^0-9a-zA-Z_]/.test(value)) {
              level++
          }
          this.state.passwordLevel = level
          this.state.percent = level * 30
          if (level >= 2) {
              if (level >= 3) {
                  this.state.percent = 100
              }
              callback()
          } else {
              if (level === 0) {
                  this.state.percent = 10
              }
              callback(new Error('密码强度不够'))
          }
      },

      handlePasswordCheck (rule, value, callback) {
          const password = this.form.getFieldValue('password')
          console.log('value', value)
          if (value === undefined) {
              callback(new Error('请输入密码'))
          }
          if (value && password && value.trim() !== password.trim()) {
              callback(new Error('两次密码不一致'))
          }
          callback()
      },

      handlePhoneCheck (rule, value, callback) {
          console.log('handlePhoneCheck, rule:', rule)
          console.log('handlePhoneCheck, value', value)
          console.log('handlePhoneCheck, callback', callback)

          callback()
      },

      handlePasswordInputClick () {
          if (!this.isMobile()) {
              this.state.passwordLevelChecked = true
              return
          }
          this.state.passwordLevelChecked = false
      },

      handleSubmit () {
          const { form: { validateFields }, $router, $message } = this
          validateFields({ force: true }, (err, values) => {

              if (!err) {
                  // 在这里进行Rest请求，params参数如右：{username: "1648266192@qq.com", password: "123456", password2: "123456", mobile: "17601324488", captcha: "69076"}
                  save(values).then(res => {
                      // 成功就跳转到结果页面
                      console.log(res)
                      $router.push({ name: 'exam-card' })
                      //$router.push({ name: 'exam-card'
                  }).catch(err => {
                      // 失败就弹出警告消息
                      $message.error(`load user err: ${err.message}`)
                  })
              }
          })
      },

      /* getCaptcha (e) {
         e.preventDefault()
         const { form: { validateFields }, state, $message, $notification } = this

         validateFields(['mobile'], { force: true },
           (err, values) => {
             if (!err) {
               state.smsSendBtn = true

               const interval = window.setInterval(() => {
                 if (state.time-- <= 0) {
                   state.time = 60
                   state.smsSendBtn = false
                   window.clearInterval(interval)
                 }
               }, 1000)

               const hide = $message.loading('验证码发送中..', 0)

               getSmsCaptcha({ mobile: values.mobile }).then(res => {
                 setTimeout(hide, 2500)
                 $notification['success']({
                   message: '提示',
                   description: '验证码获取成功，您的验证码为：' + res.result.captcha,
                   duration: 8
                 })
               }).catch(err => {
                 setTimeout(hide, 1)
                 clearInterval(interval)
                 state.time = 60
                 state.smsSendBtn = false
                 this.requestFailed(err)
               })
             }
           }
         )
       },*/
      requestFailed (err) {
          this.$notification['error']({
              message: '错误',
              description: ((err.response || {}).data || {}).message || '请求出现错误，请稍后再试',
              duration: 4
          })
          this.saveBtn = false
      }
  }
}
</script>

<style lang="less" scoped>

  .avatar-upload-wrapper {
    height: 200px;
    width: 100%;
  }

  .ant-upload-preview {
    position: relative;
    margin: 0 auto;
    width: 100%;
    max-width: 180px;
    border-radius: 50%;
    box-shadow: 0 0 4px #ccc;

    .upload-icon {
      position: absolute;
      top: 0;
      right: 10px;
      font-size: 1.4rem;
      padding: 0.5rem;
      background: rgba(222, 221, 221, 0.7);
      border-radius: 50%;
      border: 1px solid rgba(0, 0, 0, 0.2);
    }
    .mask {
      opacity: 0;
      position: absolute;
      background: rgba(0,0,0,0.4);
      cursor: pointer;
      transition: opacity 0.4s;

      &:hover {
        opacity: 1;
      }

      i {
        font-size: 2rem;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -1rem;
        margin-top: -1rem;
        color: #d6d6d6;
      }
    }

    img, .mask {
      width: 100%;
      max-width: 180px;
      height: 100%;
      border-radius: 50%;
      overflow: hidden;
    }
  }
</style>
