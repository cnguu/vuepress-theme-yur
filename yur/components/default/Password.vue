<template>
  <div id="default-password">
    <div class="wrapper">
      <a-input-password
        v-model="pwd"
        allow-clear
        :placeholder="$l('password')"
        @pressEnter="checkPwd"
      >
        <a-icon
          slot="prefix"
          type="lock"
        />
      </a-input-password>
      <a-button
        class="submit"
        type="primary"
        @click="checkPwd"
      >
        {{ $l('enter') }}
      </a-button>
    </div>
  </div>
</template>

<script>
import SHA256 from 'crypto-js/sha256'
import Base64 from 'crypto-js/enc-base64'

export default {
  name: 'Password',
  data () {
    return {
      pwd: '',
    }
  },
  created () {
    this.$notification.info({
      message: this.$l('pwdInfoMsg'),
      description: this.$l('pwdInfoDesc'),
      duration: 4.3,
    })
  },
  methods: {
    checkPwd () {
      if (this.pwd) {
        const pwd = Base64.stringify(SHA256(this.pwd))
        if (this.$page.password === pwd) {
          this.$notification.success({
            message: this.$l('pwdOkMsg'),
            description: this.$page.title,
            duration: 4.3,
          })
          this.$page.password = false
          this.$emit('refresh')
        } else {
          this.$notification.error({
            message: this.$l('pwdErrMsg'),
            description: this.$l('pwdErrDesc'),
            duration: 4.3,
          })
        }
      } else {
        this.$notification.warning({
          message: this.$l('pwdWarnMsg'),
          description: this.$l('pwdWarnDesc'),
          duration: 4.3,
        })
      }
    },
  },
}
</script>

<style lang="less" scoped>
</style>
