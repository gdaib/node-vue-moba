<template>
  <div class="article-management-page">
    <el-data-table v-bind="tableConfig" ref="dataTable" />
  </div>
</template>

<script>
import ElDataTable from '@femessage/el-data-table'

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
        id: "_id"
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
