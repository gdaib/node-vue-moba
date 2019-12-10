<template>
  <flow-card class="hero-skill-input">
    <span slot="tilte" class="title-main"><i class="el-icon-minus el-icon" @click="handleClickMinus"></i>{{title}}</span>
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
      this.$emit('handleClickMinus', this.extraData)
    }
  }
};
</script>

<style lang="scss">

.hero-skill-input {
  margin-bottom: 20px;
  .title-main {
    .el-icon {
      padding: 2px 5px;
      cursor: pointer;
      margin-right: 10px;
    }
  }
}
</style>
