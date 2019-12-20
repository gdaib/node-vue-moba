<template>
  <div class="article-detail">
    <el-form-renderer :content="content" ref="form" />
  </div>
</template>

<script>
import Tinymce from "@/components/Tinymce";

export default {
  data() {
    return {
      content: [
        {
          type: "input",
          id: "title",
          label: "文章标题"
        },
        {
          type: "select",
          id: "categories",
          el: {
            multiple: true
          },
          remote: () => {
            return [];
          }
        }
      ]
    };
  }
};
</script>

<style>
</style>
