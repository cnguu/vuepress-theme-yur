<template>
  <div id="back" />
</template>

<script>
export default {
  name: 'Back',
  beforeCreate () {
    this.$router.go(-1)
  },
}
</script>
