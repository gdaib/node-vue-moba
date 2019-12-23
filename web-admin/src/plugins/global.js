import Vue from 'vue';
import { MessageBox } from 'element-ui'
import Axios from '@/http'
import { upload } from '@/api/common'
import { parseTime } from '@/utils/index.js'

Vue.prototype.$axios = Axios


Vue.prototype.$uploadRequest = async (file) => {
  const formData = new FormData()
  formData.append('name', 'Multer')
  formData.append('file', file)
  const res = await upload(formData)
  return res.data.payload
}


Vue.prototype.$loadingConfirm = function ({
  title,
  text,
  confirm,
  confirmButtonText = '确定',
  cancelButtonText = '取消',
  type = 'warning'
}) {
  if (typeof confirm !== 'function') {
    throw new Error('confirm must be function')
  }
  return MessageBox.confirm(text, title, {
    confirmButtonText,
    cancelButtonText,
    type,
    beforeClose: (action, instance, done) => {
      if (action === 'confirm') {
        instance.confirmButtonLoading = true
        Promise.resolve(confirm())
          .then(done)
          .finally(() => {
            instance.confirmButtonLoading = false
          })
      } else {
        return done()
      }
    }
  }).catch(e => Promise.reject(e))
}

Vue.prototype.parseTime = parseTime
