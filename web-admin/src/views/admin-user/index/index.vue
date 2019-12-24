<template>
  <div class="ad-page">
    <el-data-table v-bind="tableConfig" ref="table"></el-data-table>
  </div>
</template>

<script>
import ElDataTable from "@femessage/el-data-table";

export default {
  data() {
    return {
      tableConfig: {
        url: "/api/v1/admin/rest/adminUser",
        dataPath: "payload.data",
        totalPath: "payload.total",
        id: "_id",
        hasEdit: false,
        form: [
          {
            type: "input",
            id: "username",
            label: "用户名"
          },
          {
            type: "input",
            id: "password",
            label: "密码",
            el: {
              type: "password"
            },
            rules: [
              {
                required: true,
                message: "请输入密码"
              }
            ]
          },
          {
            type: "input",
            id: "repeatPassword",
            label: "确认密码",
            el: {
              type: "password"
            },
            rules: [
              {
                required: true,
                message: "请确认密码"
              },
              {
                validator: (rule, value, cb) => {
                  const { table } = this.$refs;
                  const {
                    password
                  } = table.$refs.dialog.$refs.form.getFormValue();
                  if (password !== value) {
                    cb("两次输入密码不一致");
                  }
                  cb();
                }
              }
            ]
          }
        ],
        columns: [
          {
            label: "管理员账号",
            prop: "username"
          }
        ],
        extraButtons: [
          {
            text: "修改",

            atClick: row => {
              this.$refs.table.onDefaultEdit({ username: row.username });
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
