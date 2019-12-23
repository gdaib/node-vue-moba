<template>
  <div class="ad-page">
    <el-data-table v-bind="tableConfig"></el-data-table>
  </div>
</template>

<script>
import ElDataTable from "@femessage/el-data-table";

export default {
  data() {
    return {
      tableConfig: {
        url: "/api/v1/admin/rest/ad",
        dataPath: "payload.data",
        totalPath: "payload.total",
        id: "_id",
        hasNew: false,
        hasEdit: false,
        columns: [
          {
            label: "幻灯片名称",
            prop: "name"
          }
        ],
        headerButtons: [
          {
            text: "新建",
            type: "primary",
            atClick: () => {
              this.$router.push("/ad/detail");
              return false;
            }
          }
        ],
        extraButtons: [
          {
            text: "编辑",

            atClick: row => {
              this.$router.push({
                path: "/ad/detail",
                query: {
                  id: row._id
                }
              });
              return false;
            }
          }
        ]
      }
    };
  },
  components: {
    ElDataTable
  }
};
</script>

<style lang="scss">
.ad-page {
  padding: 24px;
}
</style>
