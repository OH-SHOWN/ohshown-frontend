<template>
  <div class="about-dialog-container">
    <app-modal :open="open" :dismiss="dismiss">
      <div class="page">
        <h3>關於通報系統</h3>

        <p>
          本系統感謝 g0v.tw 社群朋友共同開發。
        </p>

        <p>
          既有資料來源為 2019 年 7 月 30 日取自內政部國土測繪圖資雲<a href="https://maps.nlsc.gov.tw/">網站</a>。
        </p>

        <p>
          全站使用者貢獻資料以 <a href="https://creativecommons.org/licenses/by/3.0/tw/">CC BY 姓名標示 3.0</a> 釋出，原始碼以 MIT 開放授權公開在 GitHub 上
        </p>
      </div>
    </app-modal>
  </div>
</template>

<script lang="ts">
import AppModal from '@/components/AppModal.vue'
import { createComponent } from '@vue/composition-api'

export default createComponent({
  name: 'AboutModal',
  components: {
    AppModal
  },
  props: {
    open: {
      type: Boolean,
      default: false
    },
    dismiss: {
      type: Function
    }
  }
})
</script>

<style lang="scss">
@import '@/styles/page';
@import '@/styles/variables';

.about-dialog-container .app-modal {
  top: 25px;
  max-height: calc(100% - 50px);
  max-width: calc(100% - 20px);

  .page h3 {
    color: $primary-color;
  }
}
</style>
