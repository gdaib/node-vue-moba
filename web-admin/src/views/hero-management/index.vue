
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
        url: '/api/v1/admin/rest/hero',
        dataPath: 'payload.data',
        totalPath: 'payload.total',
        id: '_id',
        columns: [
          {
            label: '英雄名称',
            prop: 'name'
          }
        ],
        form: [
          {
            id: 'name',
            label: '英雄名字',
            type: 'input'
          },
          {
            id: 'avatar',
            label: '英雄头像',
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
.hero-page {
  padding: 20px;
}
</style>
