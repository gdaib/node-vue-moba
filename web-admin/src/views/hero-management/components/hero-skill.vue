<template>
  <div class="hero-skill-form-item">
    <el-form-item label="名称">
      <el-input v-model="value.name" />
    </el-form-item>
    <el-form-item label="图标">
      <upload-to-ali v-model="value.icon" />
    </el-form-item>
    <el-form-item label="描述">
      <el-input v-model="value.description" type="textarea" />
    </el-form-item>
    <el-form-item label="小提示">
      <el-input v-model="value.tips" type="textarea" />
    </el-form-item>
  </div>
</template>

<script>
import UploadToAli from '@femessage/upload-to-ali'

export default {
  components: {
    UploadToAli
  },
  props: {
    value: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>

<style>
</style>
