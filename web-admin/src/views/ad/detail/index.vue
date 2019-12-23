<template>
  <div class="ad-detail-page">
    <el-form label-width="100px">
      <el-form-item label="广告名称" required>
        <el-input v-model="name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="handleAdd" type="primary">添加一个广告位</el-button>
      </el-form-item>
      <el-form-item label="广告">
        <ad-input v-for="(item, index) in adItems" v-model="adItems[index]" :key="index"></ad-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="handleSave" type="primary">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import AdInput from "./components/ad-input";
import { createAd, getAd, saveAd } from "@/api/ad-api";

const createAdObj = (index = 0) => ({
  image: "",
  url: "",
  name: `广告_${index}`
});

export default {
  components: {
    AdInput
  },
  data() {
    return {
      name: "",
      adItems: []
    };
  },
  computed: {
    id() {
      return this.$route.query.id;
    }
  },
  mounted() {
    if (this.id) {
      this.init();
    } else if (!this.adItems.length) {
      this.adItems.push(createAdObj());
    }
  },
  methods: {
    init() {
      getAd(this.id).then(res => {
        const { items, name } = res.data.payload;
        this.name = name;
        this.adItems = items.map((item, index) => ({
          ...item,
          name: `广告_${index}`
        }));
      });
    },
    handleSave() {
      const params = {
        name: this.name,
        items: this.adItems,
        id: this.id
      };

      const method = this.id ? saveAd : createAd;

      method(params).then(() => {
        this.$message.success("操作成功");
        this.$router.push("/ad/index");
      });
    },
    handleAdd() {
      this.adItems.push(createAdObj(Math.max(this.adItems.length - 1, 0)));
    }
  }
};
</script>

<style lang="scss">
.ad-detail-page {
  padding: 24px;
}
</style>
