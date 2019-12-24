<template>
  <flow-card class="ad-input">
    <span slot="tilte" class="title-main" title="删除">
      <i class="el-icon-minus el-icon" @click.stop="handleClickMinus"></i>
      {{value.name}}
    </span>
    <el-form-item label="链接URL">
      <el-input v-model="value.url" />
    </el-form-item>
    <el-form-item label="图片" style="margin-top: 20px">
      <upload-to-ali v-model="value.image" />
    </el-form-item>
  </flow-card>
</template>

<script>
import FlowCard from "@/components/FlowCard";
import UploadToAli from "@femessage/upload-to-ali";

export default {
  components: {
    FlowCard,
    UploadToAli
  },
  props: {
    title: String,
    value: {
      type: Object,
      default: () => ({})
    },
    extraData: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    handleClickMinus() {
      this.$emit("handleClickMinus", this.extraData);
    }
  }
};
</script>

<style lang="scss">
.ad-input {
  & + .ad-input {
    margin-top: 20px;
  }
  /deep/ .upload-to-oss .upload-item-wrappe,
  .upload-to-oss .upload-box {
    width: 140px;
  }
  .title-main {
    .el-icon {
      padding: 2px 5px;
      cursor: pointer;
      margin-right: 10px;
    }
  }
}
</style>
