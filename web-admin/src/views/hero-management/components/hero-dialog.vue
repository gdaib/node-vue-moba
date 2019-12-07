<template>
  <el-dialog
    :visible="visible"
    v-bind="$attrs"
    top="2%"
    class="hero-dialog"
    @update:visible="$emit('update:visible', $event)"
  >
    <div class="dialog-content">

      <el-form-renderer ref="form" :content="content" />
    </div>
    <span slot="footer">
      <el-button>取消</el-button>
      <el-button type="primary">保存</el-button>
    </span>
  </el-dialog>
</template>

<script>

export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      activeTab: 'key1',
      content: [
        {
          id: 'name',
          label: '英雄名字',
          type: 'input'
        },
        {
          id: 'title',
          label: '称号',
          type: 'input'
        },
        {
          id: 'categories',
          label: '类型',
          type: 'select',
          options: []
        },
        {
          id: 'difficute',
          label: '难度',
          type: 'rate',
          default: 0
        },
        {
          id: 'skills',
          label: '技能',
          type: 'rate',
          default: 0
        },
        {
          id: 'attack',
          label: '攻击',
          type: 'rate',
          default: 0
        },
        {
          id: 'survive',
          label: '生存',
          type: 'rate',
          default: 0
        },
        {
          id: 'followingWindItems',
          label: '顺风出装',
          type: 'select',
          options: []
        },
        {
          id: 'headWindItems',
          label: '逆风出装',
          type: 'select',
          options: []
        },
        {
          id: 'usageTips',
          label: '使用技巧',
          type: 'input',
          el: {
            type: 'textarea'
          }
        },
        {
          id: 'battleTips',
          label: '使用技巧',
          type: 'input',
          el: {
            type: 'textarea'
          }
        },
        {
          id: 'teamTips',
          label: '团战思路',
          type: 'input',
          el: {
            type: 'textarea'
          }
        }
      ]
    }
  }
}
</script>

<style lang="scss">
.hero-dialog {
  .el-dialog {
    &__body {
      padding: 0 20px 30px;
    }
  }
}
</style>
