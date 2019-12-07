
<template>
  <div class="hero-page">
    <el-data-table v-bind="tableConfig">
      <el-table-column label="英雄头像">
        <template slot-scope="{row}">
          <preview-avatar :src="row.avatar" />
        </template>
      </el-table-column>
    </el-data-table>
    <hero-dialog :visible.sync="heroDialog.visible" title="新建英雄" />
  </div>
</template>

<script>
import ElDataTable from '@femessage/el-data-table'
import previewAvatar from '@/components/preview-avatar'
import HeroDialog from './components/hero-dialog'

export default {
  components: {
    ElDataTable,
    previewAvatar,
    HeroDialog
  },
  data() {
    return {
      heroDialog: {
        visible: false
      },
      tableConfig: {
        url: '/api/v1/admin/rest/hero',
        dataPath: 'payload.data',
        totalPath: 'payload.total',
        id: '_id',
        hasNew: false,
        hasEdit: false,
        headerButtons: [
          {
            text: '新建',
            type: 'primary',
            atClick: () => {
              this.heroDialog.visible = true
              this.$router.push({
                path: '/hero-management/edit'
              })
              return false
            }
          }
        ],
        columns: [
          {
            label: '英雄名称',
            prop: 'name'
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
