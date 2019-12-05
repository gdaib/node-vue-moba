<template>
  <div class="preview-avatar-wrap">
    <el-avatar size="large" :src="src" @click.native="handleClick" />
    <img-preview v-model="previewUrl" />
  </div>
</template>

<script>
import imgPreview from '@femessage/img-preview'
export default {
  components: {
    imgPreview
  },
  props: ['src'],
  data() {
    return {
      previewUrl: ''
    }
  },
  methods: {
    handleClick() {
      this.previewUrl = this.src
    }
  }
}
</script>

<style lang="scss">
.preview-avatar-wrap {
  .el-avatar {
    cursor: pointer;
  }
}
</style>
