<template>
  <div class="getting-started-container">
    <app-modal :open="open" :showCloseButton="false" :dismiss="dismiss">
      <div class="page">
        <h3 class="text-center">歡迎來到<b>OH!SHOWN 黑熊出沒痕跡通報系統！</b></h3>
        <br><br>
        <p>需要大家回報以下黑熊出沒痕跡之照片及資訊：</p>

        <small class="text-center" style="padding-left: 20px; padding-right: 20px;">
          使用者於OH!SHOWN臺灣黑熊通報與資訊平台上傳之所有內容，採用創用CC姓名標示4.0版授權條款，提供台灣黑熊保護協會做保育推廣以及野生動物學術單位做教學及研究使用。使用者所提供之通報相關資料，包括經緯度、日期、地點名稱、註解，其僅屬單純資訊記載不受著作權利保護之態樣者,日後將採適宜的資料開放途徑進行公開披露，以促進公民科學發展、激勵參與者資料共享循環。部分通報資料若經本站管理員判斷有危害個體乃至黑熊族群之疑慮，本站得移除或隱藏使用者所貢獻之資料。本授權條款係適用於全世界，且其有效期間持續至本著作的著作權保護期間屆滿為止，同時具不可撤回之特性。本人亦了解他人合理使用的權利及其他相關規範，不因本授權條款之內容而受影響。本人擔保本作品未侵害或抄襲他人之著作（作品中使用他人作品之部份，包含圖像及聲音等），若有違反智慧財產之情事者，願自行負擔一切法律責任。本網站由 <a href="https://g0v.tw/" target="_blank">g0v.tw</a>社群中的 OH!SHOWN 團隊所開發。
        </small>

        <app-button @click="agree">我同意加入回報</app-button>

        <small>
          <a href="https://www.taiwanbear.org.tw/">我不同意，請帶我離開這個頁面</a>
        </small>
      </div>
    </app-modal>
  </div>
</template>

<script lang="ts">
import AppModal from '@/components/AppModal.vue'
import AppButton from '@/components/AppButton.vue'
import { createComponent } from '@vue/composition-api'

export default createComponent({
  name: 'GettingStartedModal',
  components: {
    AppModal,
    AppButton
  },
  props: {
    open: {
      type: Boolean,
      default: false
    },
    dismiss: {
      type: Function
    }
  },
  setup (props) {
    return {
      agree () {
        localStorage.setItem('use-app', 'true')
        if (props.dismiss) {
          props.dismiss()
        }
      }
    }
  }
})
</script>

<style lang="scss">
@import '@/styles/page';
@import '@/styles/variables';

.getting-started-container .app-modal {
  top: 20px;
  max-height: calc(100% - 40px);
  max-width: calc(50% - 20px);
  padding-top: 35px;

  .page {
    h3 {
      color: $primary-color;
      font-size: 18px;
      margin-top: 0;
      font-weight: normal;
      line-height: 1.2;
    }

    small {
      text-align: center;
      display: block;
      margin: 1em 0;
      line-height: 1.1;
    }

    a {
      color: $primary-color;
      text-decoration: none;
    }

    pre {
      line-height: 1.5em;
      white-space: pre-line;
    }
  }
}
</style>
