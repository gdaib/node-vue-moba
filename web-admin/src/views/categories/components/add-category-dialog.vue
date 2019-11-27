<template>
  <el-dialog :visible="visible" v-bind="$attrs" @update:visible="$emit('update:visible', $event)">
    <span slot="footer">
      <el-button @click="cancel">取消</el-button>
      <el-button>确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  props: {
    visible: Boolean
  },
  methods: {
    cancel() {
      this.$emit('update:visible', false)
    }
  }
}
</script>

<style>
</style>
