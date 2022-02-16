<template>
  <div class="tutorial-modal-container">
    <app-modal :open="open" :dismiss="onDismissClick">
      <div class="back-button" v-if="isAdd || isUpdate" @click="openHome" data-testid="back-button">
        <span />
        <span />
        <span />
      </div>

      <div class="page">
        <div id="tutorial-add-factory">
          <carousel
            :per-page="1"
            paginationActiveColor="#6E8501"
            paginationColor="#e3e3e3"
            :paginationPadding="5"
            ref="createCarousel"
          >
            <slide>
              <h2>一、足跡</h2>
              <p>
                {{ BEAR_FOOTPRINT_DESC }}
              </p>
              <tips-section
                :title="BEAR_FOOTPRINT_TIPS.title"
                :content="BEAR_FOOTPRINT_TIPS.content"
              />
              <div
                style="
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                "
              >
                <div style="margin-bottom: 20px">
                  <p>● 熊掌印：五趾</p>
                  <img src="https://i.imgur.com/PsOFcrb.png" />
                </div>
                <div>
                  <p>● 狗腳印</p>
                  <img src="https://i.imgur.com/JWbaIHW.png" />
                </div>
              </div>
            </slide>
            <slide>
              <h2>二、爪痕</h2>
              <p>
                {{ BEAR_SCRATCHES_DESC }}
              </p>
              <div
                style="
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                "
              >
                <p>● 黑熊爪痕與水鹿角痕比較</p>
                <img src="https://i.imgur.com/FQZQx5U.png" />
              </div>
            </slide>
            <slide>
              <h2>三、糞便（排遺）</h2>
              <p>{{ BEAR_DEFECATION_DESC }}</p>
              <div style="display: flex; flex-direction: column">
                <div
                  style="
                    display: flex;
                    flex-direction: row;
                    justify-content: space-around;
                    margin-bottom: 30px;
                  "
                >
                  <div>
                    <p>● 黑熊排遺</p>
                    <img src="https://i.imgur.com/O2iPfg7.png" />
                  </div>
                  <div style="width: 10px" />
                  <div>
                    <p>● 黑熊排遺</p>
                    <img src="https://i.imgur.com/M7qtDou.png" />
                  </div>
                </div>

                <div
                  style="
                    display: flex;
                    flex-direction: row;
                    justify-content: space-around;
                    margin-bottom: 30px;
                  "
                >
                  <div>
                    <p>● 黑熊排遺</p>
                    <img src="https://i.imgur.com/MBV1Qxr.png" />
                  </div>
                  <div style="width: 10px" />
                  <div>
                    <p>● 黑熊排遺含水鹿</p>
                    <img src="https://i.imgur.com/UuHpnwE.png" />
                  </div>
                </div>
                <tips-section
                  :title="BEAR_DEFECATION_TIPS.title"
                  :content="BEAR_DEFECATION_TIPS.content"
                />
                <div
                  style="
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                  "
                >
                  <p>● 黑熊與野豬排遺比較</p>
                  <img src="https://i.imgur.com/2wTg8yZ.png" />
                </div>
              </div>
            </slide>
            <slide>
              <h2>四、熊窩</h2>
              <p>
                {{ BEAR_DEN_DESC }}
              </p>
              <div
                style="
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                "
              >
                <div
                  style="
                    display: flex;
                    flex-direction: row;
                    margin-bottom: 30px;
                  "
                >
                  <div style="margin-right: 10px">
                    <p>● 熊窩</p>
                    <img src="https://i.imgur.com/lhcMaBy.png" />
                  </div>
                  <div>
                    <p>● 熊窩</p>
                    <img src="https://i.imgur.com/OKtTnwG.png" />
                  </div>
                </div>
                <tips-section
                  :title="BEAR_DEN_TIPS.title"
                  :content="BEAR_DEN_TIPS.content"
                />
                <div
                  style="
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                  "
                >
                  <p>● 野豬窩</p>
                  <img src="https://i.imgur.com/yZ6CrLk.png" />
                </div>
              </div>
            </slide>
          </carousel>
        </div>
      </div>
    </app-modal>
  </div>
</template>

<script lang="ts">
import AppModal from '@/components/AppModal.vue'
import { createComponent, ref, computed } from '@vue/composition-api'
import { Carousel, Slide } from 'vue-carousel'

export default createComponent({
  name: 'TutorialModal',
  components: {
    AppModal,
    Carousel,
    Slide
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
    const page = ref('home')

    const isHome = computed(() => page.value === 'home')
    const isAdd = computed(() => page.value === 'add')
    const isUpdate = computed(() => page.value === 'update')

    const createCarousel = ref<HTMLElement>(null)
    const updateCarousel = ref<HTMLElement>(null)

    const openHome = () => { page.value = 'home' }
    const openAdd = () => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-explicit-any
      (createCarousel.value! as any).goToPage(0)
      page.value = 'add'
    }
    const openUpdate = () => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-explicit-any
      (updateCarousel.value! as any).goToPage(0)
      page.value = 'update'
    }

    const addImages = new Array(7).fill(true).map((_, index) => `/images/tutorial/create-${index + 1}.jpg`)
    const updateImages = new Array(4).fill(true).map((_, index) => `/images/tutorial/update-${index + 1}.jpg`)

    const onDismissClick = () => {
      openHome()
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      props.dismiss!()
    }

    const BEAR_FOOTPRINT_DESC =
      "台灣黑熊的整個腳掌面裸出，走路時以整個掌面貼地，也就是和人類一樣。腳掌約為成人手掌大小或稍大，爪子外露，無法像貓一樣可收回，但是地面上的足跡時常看不清爪印。台灣黑熊的前腳掌墊長約 10 至 14 公分，前後腳掌都有五趾，趾短而並列於腳掌墊之前，中間三趾近乎排列在一橫線上。";
    const BEAR_FOOTPRINT_TIPS = {
      title: "混淆：",
      content:
        "一般民眾常把大型犬腳印誤認為熊腳印，但兩者的腳掌墊形狀和趾頭數目，甚至大小，都很不一樣。狗的腳掌墊偏三角形，前緣單峰，後緣三峰; 另外，狗的腳趾只有四趾，且對稱排列為中間前二，外側後二。"
    };

    const BEAR_SCRATCHES_DESC =
      "台灣黑熊善於爬樹，熊爪彎曲且堅硬，因此爬樹時會在樹幹上留下爪痕，痕跡的深淺和清晰程度常受樹皮紋路及樹幹硬度影響。有時樹幹上的熊爪痕超過五年以上仍清晰可辨。雖說熊有五爪，但樹幹上的爪痕卻以三及四爪最常見，這與樹幹粗細和熊爬樹的姿勢有關。就單一個熊爪痕來看，經常呈現三角形。熊爪痕最大的特徵是各爪痕平行排列，爪痕間距一般為1.5至3公分。因此，熊爪痕與其他動物的爪痕或磨痕多為凌亂且不規則的排列方式不同，如水鹿的磨角痕。";

    const BEAR_DEFECATION_DESC =
      "黑熊排遺(糞便)一般為圓柱狀，與人糞相似，直徑約2至5公分。熊排遺中經常可發現消化不完全的食物殘渣，如：果皮、動物骨頭或毛髮等。熊排遺的顏色、氣味、質地會隨攝取的食物種類以及排放的時間、環境等因素而不同。";
    const BEAR_DEFECATION_TIPS = {
      title: "混淆：",
      content:
        "在野外，民眾常將黑熊與野豬的排遺混淆。野豬也是雜食性，所吃食物種類和黑熊有些重疊，唯豬糞常有濃郁的豬騷味。野豬糞便在外觀上也是圓柱狀，但份量通常較黑熊的少，且常有分節或者呈現碎塊狀，內容物含有粗纖維或種子。"
    };

    // 熊窩分辨文案
    const BEAR_DEN_DESC =
      "台灣黑熊有特殊的築巢行為，會利用芒草或灌叢樹枝等作為巢材，壓折並交錯編織成碗狀，中間凹陷，外觀上像是個大鳥巢，黑熊便坐臥其上。熊窩附近常可發現熊排遺，或在巢底部發現熊毛。\n熊窩的深度約30公分，外徑為80至150公分，內徑60至100公分不等。";
    const BEAR_DEN_TIPS = {
      title: "混淆：",
      content:
        "野豬窩常發現於較平坦的地形，野豬會利用各種咬斷的草類或蕨類聚集成堆，乍看就像一座小山丘，大者可超過二公尺長。野豬便從草堆的底層鑽入，躲藏窩內部。"
    };

    return {
      isHome,
      isAdd,
      isUpdate,
      openHome,
      openAdd,
      openUpdate,
      addImages,
      updateImages,
      onDismissClick,
      createCarousel,
      updateCarousel,
      BEAR_FOOTPRINT_DESC,
      BEAR_FOOTPRINT_TIPS,
      BEAR_SCRATCHES_DESC,
      BEAR_DEFECATION_DESC,
      BEAR_DEFECATION_TIPS,
      BEAR_DEN_DESC,
      BEAR_DEN_TIPS
    };
  }
});
</script>

<style lang="scss">
@import "@/styles/page";
@import "@/styles/variables";
@import "@/styles/components/back-button";

.tutorial-modal-container .app-modal {
  top: 20px;
  max-height: 100%;
  max-width: calc(100% - 20px);
  background-color: #fff4c2;

  padding: 70px 45px 35px;

  .page {
    height: auto;
    img {
      display: block;
      margin: 0 auto;
      max-height: 65vh;
    }

    h2 {
      color: $second-color;
      border: none;
    }

    #tutorial-home {
      p {
        font-weight: bold;
        margin-top: 2em;
        margin-bottom: 2em;
      }
    }

    #tutorial-add-factory,
    #tutorial-update-factory {
      h2 {
        margin-right: 0;
        text-align: center;
        color: $primary-color;
      }
    }
  }

  .outline-button {
    border: solid 1px $primary-color;
    padding: 10px 20px;
    color: $primary-color;
    margin-bottom: 15px;
    line-height: 1.5em;
    user-select: none;
    cursor: pointer;

    &:hover,
    &:active {
      color: white;
      background-color: $primary-color;
    }
  }

  .back-button {
    position: absolute;
    top: 24px;
    left: 22px;
  }
}
</style>
