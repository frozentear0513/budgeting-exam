<template>
  <result
    :isSuccess="true"
    :content="false"
    :title="email"
    :description="description">

    <template slot="action">
     <!-- <a-button size="large" type="primary">查看邮箱</a-button>-->
      <a-button size="large" style="margin-left: 8px" @click="goHomeHandle">返回登录</a-button>
    </template>

  </result>
</template>

<script>
import { Result } from '../../components'

export default {
  name: 'RegisterResult',
  components: {
    Result
  },
  data () {
    return {
      description: '请及时登录。',
      form: {}
    }
  },
  computed: {
    email () {
      const v = this.form && this.form.email || 'xxx'
      const title = `你的账户：注册成功`
      return title
    }
  },
  created () {
    this.form = this.$route.params
  },
  methods: {
    goHomeHandle () {
      this.$router.push({ name: 'login' })
    }
  }
}
</script>

<style scoped>

</style>
