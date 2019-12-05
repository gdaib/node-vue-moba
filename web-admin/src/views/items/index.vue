<template>
  <div class="items-page">
    <el-data-table v-bind="tableConfig">
      <el-table-column label="装备图标">
        <template slot-scope="{row}">
          <el-avatar size="large" :src="row.icon" />
        </template>
      </el-table-column>
    </el-data-table>
  </div>
</template>

<script>
import ElDataTable from '@femessage/el-data-table'
import UploadToAli from '@femessage/upload-to-ali'

import { upload } from '@/api/common'

export default {
  components: {
    ElDataTable
  },
  data() {
    return {
      tableConfig: {
        url: '/api/v1/admin/rest/item',
        dataPath: 'payload.data',
        totalPath: 'payload.total',
        id: '_id',
        columns: [
          {
            label: '装备名称',
            prop: 'name'
          }
        ],
        form: [
          {
            id: 'name',
            label: '装备名字',
            type: 'input'
          },
          {
            id: 'icon',
            label: '装备图标',
            component: UploadToAli,
            default: '',
            el: {
              async httpRequest(file) {
                const formData = new FormData()
                formData.append('name', 'Multer')
                formData.append('file', file)

                const { data: { payload }} = await upload(formData)

                return payload
              }
            }
          }
        ]
      }
    }
  }
}
</script>

<style lang="scss">
.items-page {
  padding: 20px;
  .items-page-header {
    display: flex;
    justify-content: space-between;
    $head-height: 36px;

    &.hide-left {
      justify-content: flex-end;
    }
    .el-input {
      width: 240px;
      input,
      .el-input__icon {
        height: $head-height;
        line-height: $head-height;
      }
    }
    .el-button {
      padding-top: 0;
      padding-bottom: 0;
      height: $head-height;
      line-height: $head-height;
    }
  }
  .cate-tree {
    margin-top: 24px;
    min-height: 80px;
    .cate-ops {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 14px;
      padding-right: 8px;
      line-height: 22px;
      padding: 9px 0;
      padding-right: 14px;
      font-size: 12px;
      .el-button {
        margin-left: 16px;
        font-weight: normal;
        &.red {
          color: #e06272;
          &:hover {
            opacity: 0.85;
          }
        }
      }
    }
    .cate-label {
      font-size: 14px;
    }
    .cate-status {
      margin-right: 8px;
      &::before {
        content: "";
        display: inline-block;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background-color: #e06272;
        vertical-align: middle;
        margin-right: 5px;
      }
      &.inactive::before {
        background-color: rgba(45, 48, 59, 0.25);
      }
    }
    .el-tree-node__content {
      height: 40px;
    }
    .el-tree-node.is-drop-inner .cate-label {
      background-color: blue;
      color: #fff;
    }
  }
}
</style>
