
<template>
  <div class="hero-page">
    <el-data-table v-bind="tableConfig">
      <el-table-column label="英雄头像">
        <template slot-scope="{row}">
          <preview-avatar :src="row.avatar" />
        </template>
      </el-table-column>
    </el-data-table>
  </div>
</template>

<script>
import ElDataTable from "@femessage/el-data-table";
import UploadToAli from "@femessage/upload-to-ali";
import previewAvatar from "@/components/preview-avatar";

import { upload } from "@/api/common";

export default {
  components: {
    ElDataTable,
    previewAvatar
  },
  data() {
    return {
      tableConfig: {
        url: "/api/v1/admin/rest/hero",
        dataPath: "payload.data",
        totalPath: "payload.total",
        id: "_id",
        columns: [
          {
            label: "英雄名称",
            prop: "name"
          }
        ],
        formAttrs: {
          // inline: true
        },
        form: [
          {
            id: "name",
            label: "英雄名字",
            type: "input"
          },
          {
            id: "avatar",
            label: "英雄头像",
            component: UploadToAli,
            default: "",
            el: {
              async httpRequest(file) {
                const formData = new FormData();
                formData.append("name", "Multer");
                formData.append("file", file);

                const {
                  data: { payload }
                } = await upload(formData);

                return payload;
              }
            }
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
        ]
      }
    };
  }
};
</script>

<style lang="scss">
.hero-page {
  padding: 20px;
}
</style>
