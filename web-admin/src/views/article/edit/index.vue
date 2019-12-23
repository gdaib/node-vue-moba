<template>
  <normal-page contentClass="article-content" v-bind="normalConfig">
    <el-form-renderer :content="content" ref="form" label-position="top" v-loading="loading" />
  </normal-page>
</template>

<script>
import Tinymce from "@/components/Tinymce";
import NormalPage from "@/container/normal-page";
import { Rate } from "element-ui";

import { createArticle, getArticle, saveArticle } from "@/api/article-api";

export default {
  components: {
    NormalPage
  },
  data() {
    return {
      content: [
        {
          type: "input",
          id: "title",
          label: "文章标题",
          rules: [{ required: true, message: "文章标题为必填项" }]
        },
        {
          type: "select",
          id: "categories",
          el: {
            multiple: true
          },
          remote: () => {
            return [];
          },
          label: "标签"
        },
        {
          id: "importance",
          component: Rate,
          label: "重要程度"
        },
        {
          id: "publishTime",
          type: "datePicker",
          label: "发布时间"
        },
        {
          id: "status",
          label: "状态",
          type: "radioGroup",
          default: 0,
          options: [{ label: "草稿", value: 0 }, { label: "发布", value: 1 }]
        },
        {
          id: "summary",
          label: "文章简介",
          type: "input",
          el: {
            type: "textarea",
            rows: 4
          }
        },
        {
          id: "content",
          label: "文章内容",
          component: Tinymce,
          rules: [{ required: true, message: "文章内容为必填项" }]
        }
      ],
      normalConfig: {
        confirm: () => {
          const { form } = this.$refs;
          form.validate(flag => {
            if (!flag) return;

            const data = form.getFormValue();

            const params = {
              ...data,
              id: this.id
            };

            const method = this.isEdit ? saveArticle : createArticle;

            method(params).then(() => {
              this.$message.success("操作成功");
              setTimeout(() => {
                this.$router.back();
              }, 1500);
            });
          });
        }
      },
      loading: false
    };
  },
  computed: {
    isEdit() {
      return /edit/.test(this.$route.path);
    },
    id() {
      return this.$route.query.articleId;
    }
  },
  mounted() {
    if (this.isEdit && this.id) {
      this.init();
    }
  },
  methods: {
    init() {
      this.loading = true;
      getArticle(this.id)
        .then(res => {
          this.$refs.form.updateForm(res.data.payload);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    handleSave() {
      console.log("save");
    }
  }
};
</script>

<style lang="scss">
.article-content {
  padding: 0 24px;
  padding-bottom: 100px;
}
</style>
