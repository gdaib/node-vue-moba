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
    <div class="hero-edit-page-content" v-loading="loading">
      <el-button
        v-if="showAddSkill"
        icon="el-icon-plus"
        type="primary"
        size="small"
        @click="handleAddSkill"
      >添加技能</el-button>
      <div v-show="!showAddSkill">
        <el-form-renderer
          key="attrsForm"
          ref="attrsForm"
          :content="attrsContent"
          label-width="80px"
        />
      </div>
      <div v-show="showAddSkill">
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
      <el-button type="primary" @click="handleConfirm">确定</el-button>
    </div>
  </div>
</template>

<script>
import UploadToAli from "@femessage/upload-to-ali";

import HeroSkillInput from "../components/hero-skill-input";
import { createHero, getHero, putHero } from "@/api/hero";
import { getCategories } from "@/api/categories";
import { getItems } from "@/api/items";

import { checkDataIsEmpty } from "@/utils/validate";

// 生成一个新的英雄数据
const genrateSkillObj = (index = 0) => ({
  name: `技能${index}`,
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
          el: {
            multiple: true
          },
          options: []
        },
        {
          id: "difficult",
          label: "难度",
          type: "rate",
          el: {
            max: 10
          },
          default: 0
        },
        {
          id: "skills",
          label: "技能",
          type: "rate",
          el: {
            max: 10
          },
          default: 0
        },
        {
          id: "attack",
          label: "攻击",
          type: "rate",
          el: {
            max: 10
          },
          default: 0
        },
        {
          id: "survive",
          label: "生存",
          type: "rate",
          el: {
            max: 10
          },
          default: 0
        },
        {
          id: "followingWindItems",
          label: "顺风出装",
          type: "select",
          el: {
            multiple: true
          },
          options: []
        },
        {
          id: "headWindItems",
          label: "逆风出装",
          type: "select",
          el: {
            multiple: true
          },
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
          label: "对抗技巧",
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
      skillContent: [genrateSkillObj()],
      cateData: [],
      itemData: [],
      loading: false
    };
  },
  computed: {
    showAddSkill() {
      return this.activeTab === "skill";
    },
    id() {
      return this.$route.query.id;
    }
  },
  async mounted() {
    await this.init();
  },
  methods: {
    async getHeroDetail() {
      const { data } = await getHero(this.id);

      const formData = {
        ...data.payload,
        ...data.payload.scores
      };

      this.$refs.attrsForm.updateForm(formData);

      this.skillContent = data.payload.skills;
      this.loading = false;
    },
    async init() {
      this.loading = true;

      const [{ data: cateData }, { data: itemData }] = await Promise.all([
        getCategories(),
        getItems()
      ]);
      this.cateData = cateData.payload.data.map(item => ({
        value: item._id,
        label: item.name
      }));
      this.itemData = itemData.payload.data.map(item => ({
        value: item._id,
        label: item.name
      }));
      this.$refs.attrsForm.setOptions("categories", this.cateData);
      this.$refs.attrsForm.setOptions("followingWindItems", this.itemData);
      this.$refs.attrsForm.setOptions("headWindItems", this.itemData);
      if (this.id) {
        this.getHeroDetail();
      } else {
        this.loading = false;
      }
    },
    handleConfirm() {
      const attrsValue = this.$refs.attrsForm.getFormValue();

      const params = {
        ...attrsValue,
        skills: this.skillContent.filter(v => !checkDataIsEmpty(v)),
        scores: {
          difficult: attrsValue.difficult,
          skills: attrsValue.skills,
          attack: attrsValue.attack,
          survive: attrsValue.survive
        },
        id: this.id
      };

      const method = params.id ? putHero : createHero;
      this.loading = true;

      method(params)
        .then(() => {
          this.$message.success("操作成功");
          this.$router.push("/hero-management/index");
        })
        .finally(() => {
          this.loading = false;
        });
    },
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
      this.skillContent.push(genrateSkillObj(this.skillContent.length));
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
