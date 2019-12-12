<template>
  <div class="hero-edit-page">
    <div class="hero-edit-page-header">
      <div class="tabs">
        <div
          v-for="tab in tabs"
          :key="tab.id"
          class="tab-item"
          :class="{active: tab.id === activeTab}"
          @click="handleChange(tab.id)"
        >{{ tab.label }}</div>
      </div>
    </div>
    <div class="hero-edit-page-content">
      <el-button
        v-if="showAddSkill"
        icon="el-icon-plus"
        type="primary"
        size="small"
        @click="handleAddSkill"
      >添加技能</el-button>
      <div v-if="!showAddSkill">
        <el-form-renderer
          key="attrsForm"
          ref="attrsForm"
          :content="attrsContent"
          label-width="80px"
        />
      </div>
      <div v-else>
        <el-form label-width="80px">
          <hero-skill-input
            v-for="(item, index) in skillContent"
            v-model="skillContent[index]"
            :key="index"
            :extraData="{index}"
            :title="`技能${index+1}`"
            @handleClickMinus="handleClickMinus"
          ></hero-skill-input>
        </el-form>
      </div>
    </div>
    <div class="bottom-panel">
      <el-button>取消</el-button>
      <el-button type="primary">确定</el-button>
    </div>
  </div>
</template>

<script>
import UploadToAli from "@femessage/upload-to-ali";

import HeroSkillInput from "../components/hero-skill-input";

import { checkDataIsEmpty } from "@/utils/validate";

// 生成一个新的英雄数据
const genrateSkillObj = () => ({
  name: "",
  icon: "",
  description: "",
  tips: ""
});

export default {
  components: {
    HeroSkillInput
  },
  data() {
    return {
      tabs: [
        {
          label: "英雄属性",
          id: "attrs"
        },
        {
          label: "英雄技能",
          id: "skill"
        }
      ],
      activeTab: "skill",
      attrsContent: [
        {
          id: "name",
          label: "英雄名字",
          type: "input"
        },
        {
          id: "avatar",
          label: "英雄头像",
          component: UploadToAli,
          default: ""
        },
        {
          id: "title",
          label: "称号",
          type: "input"
        },
        {
          id: "categories",
          label: "类型",
          type: "select",
          options: []
        },
        {
          id: "difficute",
          label: "难度",
          type: "rate",
          default: 0
        },
        {
          id: "skills",
          label: "技能",
          type: "rate",
          default: 0
        },
        {
          id: "attack",
          label: "攻击",
          type: "rate",
          default: 0
        },
        {
          id: "survive",
          label: "生存",
          type: "rate",
          default: 0
        },
        {
          id: "followingWindItems",
          label: "顺风出装",
          type: "select",
          options: []
        },
        {
          id: "headWindItems",
          label: "逆风出装",
          type: "select",
          options: []
        },
        {
          id: "usageTips",
          label: "使用技巧",
          type: "input",
          el: {
            type: "textarea"
          }
        },
        {
          id: "battleTips",
          label: "使用技巧",
          type: "input",
          el: {
            type: "textarea"
          }
        },
        {
          id: "teamTips",
          label: "团战思路",
          type: "input",
          el: {
            type: "textarea"
          }
        }
      ],
      skillContent: [genrateSkillObj()]
    };
  },
  computed: {
    showAddSkill() {
      return this.activeTab === "skill";
    }
  },
  methods: {
    handleChange(id) {
      this.activeTab = id;
    },
    async handleClickMinus({ index }) {
      const data = this.skillContent[index];

      !checkDataIsEmpty(data) &&
        (await this.$confirm("确定要删除该条英雄技能数据吗？", "温馨提示", {
          type: "warning"
        }));

      this.skillContent.splice(index, 1);
    },
    handleAddSkill() {
      this.skillContent.push(genrateSkillObj());
    }
  }
};
</script>

<style lang="scss">
.hero-edit-page {
  height: calc(100vh - 85px);
  position: relative;

  &-header {
    border-bottom: 2px solid #eee;
    .tabs {
      .tab-item {
        cursor: pointer;
        display: inline-block;
        padding: 15px 20px;
        color: #555;
        &.active {
          color: #1890ff;
          border-bottom: 2px solid #1890ff;
        }
      }
    }
  }
  &-content {
    padding: 20px 40px 140px;
    height: 100%;
    overflow: auto;
    .el-form {
      .el-input,
      .el-textarea {
        width: 90%;
      }
      .el-rate {
        transform: translateY(50%);
      }
    }
  }
  .bottom-panel {
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
