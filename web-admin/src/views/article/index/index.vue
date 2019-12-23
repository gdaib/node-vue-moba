<template>
  <div class="article-management-page">
    <el-data-table v-bind="tableConfig" ref="dataTable" />
  </div>
</template>

<script>
import ElDataTable from "@femessage/el-data-table";

export default {
  components: {
    ElDataTable
  },
  data() {
    return {
      tableConfig: {
        url: "/api/v1/admin/rest/article",
        dataPath: "payload.data",
        totalPath: "payload.total",
        id: "_id",
        hasEdit: false,
        hasNew: false,
        columns: [
          {
            prop: "title",
            label: "文章标题"
          },
          {
            prop: "summary",
            label: "文章简介"
          },
          {
            label: "发布状态",
            formatter: row => {
              const arr = ["草稿", "已发布"];
              return arr[row.status];
            }
          },
          {
            label: '创建时间',
            formatter: row => {
              return this.parseTime(row.createTime)
            }
          }
        ],
        headerButtons: [
          {
            text: "新增",
            type: "primary",
            atClick: () => {
              this.$router.push("/article/new");
              return false;
            }
          }
        ],
        extraButtons: [
          {
            text: "编辑",
            atClick: row => {
              this.$router.push({
                path: "/article/edit",
                query: {
                  articleId: row._id
                }
              });
              return false;
            }
          }
        ]
      }
    };
  }
};
</script>

<style lang="scss">
.article-management-page {
  padding: 20px;
}
</style>
