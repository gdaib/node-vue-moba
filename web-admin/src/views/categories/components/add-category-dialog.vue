<template>
  <el-dialog :visible="visible" v-bind="$attrs" @update:visible="$emit('update:visible', $event)">
    <el-form-renderer ref="form" :content="content" />
    <span slot="footer">
      <el-button @click="cancel">取消</el-button>
      <el-button type="primary" :loading="loading" @click="handleClick">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { createCategory } from '@/api/categories'

export default {
  props: {
    visible: Boolean,
    parentId: {
      type: String,
      default: ''
    },
    id: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      loading: false,
      content: [
        {
          id: 'name',
          type: 'input',
          label: '分类名称',
          el: {
            placeholder: '请输入'
          }
        }
      ]
    }
  },
  watch: {
    visible(val) {
      if (val) {
        this.set({ name: '' })
      }
    }
  },
  methods: {
    cancel() {
      this.$emit('update:visible', false)
    },
    async handleClick() {
      try {
        this.loading = true

        const content = this.$refs.form.getFormValue()

        const params = {
          ...content,
          id: this.id,
          parentId: this.parentId
        }

        const res = await createCategory(params)
        console.log(res)
        this.$emit('handleSuccess')
        this.cancel()
      } finally {
        this.loading = false
      }
    },
    set(data) {
      this.$refs.form.updateValue(data)
    }
  }
}
</script>

<style>
</style>
