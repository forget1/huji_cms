<template>
  <div>
    <head-top></head-top>
    <div>{{name}}</div>
  </div>
</template>

<script>
import headTop from '@/components/headTop'
export default {
  data () {
    return {
      name: '户籍列表'
    }
  },
  components: {
    headTop
  }
}
</script>
