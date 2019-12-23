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
            text: '编辑',
            atClick: (row) => {
              this.$router.push({
                path: '/article/edit',
                query: {
                  articleId: row._id
                }
              })
              return false
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
