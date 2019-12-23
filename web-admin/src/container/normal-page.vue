<template>
  <div class="normal-page">
    <div class="normal-page-content" :class="contentClass">
      <slot></slot>
    </div>
    <div class="normal-page-bottom">
      <el-button @click="cancelMethod">取消</el-button>
      <el-button type="primary" @click="handleConfirm" :loading="loading">确定</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "NormalPage",
  props: {
    cancel: {
      type: Function,
      default: null
    },
    confirm: {
      type: Function,
      default: () => {}
    },
    contentClass: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      loading: false
    }
  },
  computed: {
    cancelMethod() {
      return this.cancel || this.defaultCancel;
    }
  },

  methods: {
    defaultCancel() {
      this.$confirm("确定要取消吗?", "提示").then(() => {
        this.$router.back();
      });
    },
    handleConfirm() {
      this.loading = true;

      Promise.resolve(this.confirm())
        .then(() => {})
        .finally(() => {
          this.loading = false;
        });
    }
  }
};
</script>

<style lang="scss">
.normal-page {
  height: calc(100vh - 85px);
  position: relative;
  &-content {
    height: 100%;
    padding-bottom: 100px;
    overflow-y: auto;
  }
  &-bottom {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 60px;
    background: #fff;
    border-top: 1px solid #eee;
    box-shadow: 10px rgba(255, 255, 255, 0.6);
    text-align: center;
    line-height: 60px;
  }
}
</style>
