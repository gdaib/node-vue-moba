<template>
  <div class="items-page">
    <el-data-table v-bind="tableConfig">
      <el-table-column label="装备图标">
        <template slot-scope="{row}">
          <preview-avatar :src="row.icon" />
        </template>
      </el-table-column>
    </el-data-table>
  </div>
</template>

<script>
import ElDataTable from '@femessage/el-data-table'
import UploadToAli from '@femessage/upload-to-ali'
import previewAvatar from '@/components/preview-avatar'

import { upload } from '@/api/common'

export default {
  components: {
    ElDataTable,
    previewAvatar
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

                const {
                  data: { payload }
                } = await upload(formData)

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
}
</style>

