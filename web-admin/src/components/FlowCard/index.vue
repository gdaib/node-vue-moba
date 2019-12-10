<template>
  <div class="flod-card">
    <div class="flod-card-header">
      <div class="flod-card-header-title">
        <slot name="tilte" >{{title}}</slot>
      </div>
      <i
        class="el-icon-arrow-up flod-card-header-icon"
        :class="{'is-closed': !show}"
        @click="toggleShow"
      ></i>
    </div>
    <el-collapse-transition>
      <div class="flod-card-content" v-if="show">
        <slot />
      </div>
    </el-collapse-transition>
  </div>
</template>

<script>
import CollapseTransition from "element-ui/lib/transitions/collapse-transition";

export default {
  components: {
    [CollapseTransition.name]: CollapseTransition
  },
  props: {
    title: String,
    value: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      show: true
    };
  },
  computed: {
    icon() {
      return `el-icon-arrow-${this.show ? "up" : "down"}`;
    }
  },
  methods: {
    toggleShow() {
      this.show = !this.show;
    }
  }
};
</script>

<style lang="scss">
.flod-card {
  border: 1px solid #efefef;
  border-radius: 5px;
  &-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    padding: 5px 20px;
    border-bottom: 1px solid #efefef;

    &-icon {
      cursor: pointer;
      padding: 5px;
      &.is-closed {
        transition: all 0.3s;
        transform: rotateX(180deg);
      }
    }
  }
  &-content {
    padding: 20px;
  }
}
</style>
