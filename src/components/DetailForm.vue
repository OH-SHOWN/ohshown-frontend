<template>
  <div class="confirm-factory-page">
    <v-container style="max-width: 630px; position: relative;" class="pt-3 pt-md-12">
      <div v-if="formState.type === '2-1'" class="mb-3">
        <h2 class="mb-4 secondary--text">個體資訊</h2>
        <h3 class="mb-3 primary--text required">個體數</h3>
        <v-text-field
          outlined
          type="number"
          suffix="隻"
          v-model.number="formState.bearNumber"
        ></v-text-field>
        <div
          v-for="(n, index) in formState.bearNumber"
          :key="index"
          class="mb-5"
          style="box-shadow: 0px 0px 5px 2px #00000030; border-radius: 5px; padding: 25px"
        >
          <h2 class="mb-2 secondary--text">黑熊{{index + 1}}</h2>
          <v-radio-group v-model="formState.bearType[index]" row>
            <v-radio
              label="大(成)熊"
              :value="0"
            ></v-radio>
            <v-radio
              label="幼熊"
              :value="1"
            ></v-radio>
          </v-radio-group>
          <h3 class="primary--text">體型</h3>
          <v-radio-group v-model="formState.bearSize[index]" class="mt-0">
            <v-radio
              v-for="(name, index) in ['10-30cm' , '30-50cm' , '50-70cm' , '70-100cm' , '100-150cm' , '>150cm' , '不清楚']"
              :key="index"
              :label="name"
              :value="index"
              class="mb-2"
            ></v-radio>
          </v-radio-group>
          <h3 class="primary--text">性別</h3>
          <v-radio-group v-model="formState.bearSex[index]" row>
            <v-radio
              v-for="(name, index) in ['公', '母', '不清楚']"
              :key="index"
              :label="name"
              :value="index"
            ></v-radio>
          </v-radio-group>
          <h3 class="mb-2 primary--text">其他特徵</h3>
          <v-text-field
            outlined
            label="請填入文字"
            v-model="formState.bearFeature[index]"
          ></v-text-field>
        </div>
        <h2 class="mb-4 secondary--text">黑熊行為與反應</h2>
        <h3 class="primary--text mt-2 mb-3">1. 看到熊當下，您的感覺如何？</h3>
        <v-text-field
          outlined
          v-model="formState.ohshownFeeling"
        ></v-text-field>
        <h3 class="primary--text mt-2 mb-3">2. 目擊當下，總共幾人同行？</h3>
        <v-text-field
          outlined
          type="number"
          suffix="人"
          v-model="formState.humanNumber"
        ></v-text-field>
        <h3 class="primary--text mt-2 mb-3">3. 目擊當下，您正在做什麼？</h3>
        <v-radio-group v-model="formState.humanBehavior" row>
          <v-radio
            v-for="(name, index) in ['行進', '休息', '開車', '煮食/用餐']"
            :key="index"
            :label="name"
            :value="index"
            class="mb-2"
          ></v-radio>
          <v-radio :value="4">
            <template v-slot:label>
              <v-text-field
                label="工作"
                placeholder="請填入文字"
                v-model="formState.humanBehaviorText"
                v-if="formState.humanBehavior === 4"
              ></v-text-field>
              <span v-if="formState.humanBehavior !== 4">工作</span>
            </template>
          </v-radio>
          <v-radio :value="5">
            <template v-slot:label>
              <v-text-field
                label="其他"
                placeholder="請填入文字"
                v-model="formState.humanBehaviorText"
                v-if="formState.humanBehavior === 5"
              ></v-text-field>
              <span v-if="formState.humanBehavior !== 5">其它</span>
            </template>
          </v-radio>
        </v-radio-group>
        <h3 class="primary--text mt-2 mb-3">4. 目擊當下，黑熊和您之間的大約距離？</h3>
        <v-radio-group v-model="formState.distance" row>
          <v-radio
            v-for="(name, index) in ['小於20', '20-50', '50-100', '大於100公尺']"
            :key="index"
            :label="name"
            :value="index"
            class="mb-2"
          ></v-radio>
        </v-radio-group>
        <h3 class="primary--text mt-2 mb-3">5. 第一眼看到熊時，黑熊正在做什麼？</h3>
        <v-radio-group v-model="formState.bearBehavior" row>
          <v-radio
            v-for="(name, index) in ['慢步', '奔跑', '爬樹', '休息', '覓食']"
            :key="index"
            :label="name"
            :value="index"
            class="mb-2"
          ></v-radio>
          <v-radio class="mb-2" :value="5">
            <template v-slot:label>
              <v-text-field
                label="其他"
                placeholder="請填入文字"
                v-model="formState.bearBehaviorText"
                v-if="formState.bearBehavior === 5"
              ></v-text-field>
              <span v-if="formState.bearBehavior !== 5">其他</span>
            </template>
          </v-radio>
        </v-radio-group>
        <div v-if="formState.bearBehavior === 4">
          <h3 class="primary--text mt-2 mb-3">5-1. 承4，黑熊在吃什麼？</h3>
          <v-checkbox
            v-for="(name, index) in ['不清楚', '果實', '莖葉', '蜂蜜', '昆蟲', '動物', '垃圾/廚餘', '家禽/畜', '動物飼料', '農作物', '其他']"
            v-model="formState.food"
            :key="index"
            :label="name"
            :value="index"
            hide-details
          >
            <template v-slot:label>
              <v-text-field
                v-model="formState.foodText[index]"
                v-if="[4, 5, 7, 9, 10].includes(index) && formState.food.includes(index)"
                :label="name"
                placeholder="請填入名稱"
                autofocus
                hide-details
              ></v-text-field>
              <span v-if="![4, 5, 7, 9, 10].includes(index) || !formState.food.includes(index)">{{name}}</span>
            </template>
          </v-checkbox>
        </div>
        <h3 class="primary--text mt-2 mb-3">6. 黑熊何時注意到人員存在？</h3>
        <v-radio-group v-model="formState.bearNotice" row>
          <v-radio
            v-for="(name, index) in ['黑熊一直未發現我', '目擊前黑熊就發現我了']"
            :key="index"
            :label="name"
            :value="index"
            class="mb-2"
          ></v-radio>
          <v-radio :value="2">
            <template v-slot:label>
              <v-text-field
                prefix="目擊後約"
                suffix="分鐘黑熊發現我的存在"
                v-model="formState.bearNoticeMinutes"
                type="number"
              ></v-text-field>
            </template>
          </v-radio>
        </v-radio-group>
        <h3 class="primary--text mt-2 mb-3">7. 您目擊黑熊後，您做出什麼反應？</h3>
        <v-checkbox
          v-for="(name, index) in ['靜止不動', '緩慢離開', '快速逃跑', '爬樹', '使用防熊噴霧', '大聲喊叫或發出聲響', '趴在地上裝死', '拿可防身物品威嚇', '其他']"
          v-model="formState.humanReaction"
          :key="index"
          :label="name"
          :value="index"
          hide-details
        >
          <template v-slot:label>
            <v-text-field
              v-model="formState.humanReactionText[index]"
              v-if="index === 8 && formState.humanReaction.includes(index)"
              :label="name"
              :autofocus="true"
              placeholder="請填入文字"
              hide-details
            ></v-text-field>
            <span v-if="index !== 8 || !formState.humanReaction.includes(index)">{{name}}</span>
          </template>
        </v-checkbox>
        <h3 class="primary--text mt-6 mb-3">8. 黑熊發現您後，熊做出什麼反應？（可複選）</h3>
        <v-checkbox
          v-model="formState.bearReaction"
          v-for="(name, index) in ['繼續原先的活動', '緩慢走開', '吼叫威嚇', '站立', '朝人觀望、戒備', '快速逃離', '主動接近人', '其它']"
          :key="index"
          :label="name"
          :value="index"
          hide-details
        >
          <template v-slot:label>
            <v-text-field
              v-model="formState.bearReactionText[index]"
              v-if="index === 7 && formState.bearReaction.includes(index)"
              :label="name"
              :autofocus="true"
              placeholder="請填入文字"
              hide-details
            ></v-text-field>
            <span v-if="index !== 7 || !formState.bearReaction.includes(index)">{{name}}</span>
          </template>
        </v-checkbox>
        <h3 class="primary--text mt-6 mb-3">9. .是否有人因為遇見黑熊，而因故受傷或意外發生？</h3>
        <v-radio-group v-model="formState.humanHurt">
          <v-radio
            label="是"
            value="1"
          ></v-radio>
          <v-radio
            label="否"
            value="0"
          ></v-radio>
          <v-text-field
            outlined
            placeholder="說明"
            v-model="formState.humanHurtDescription"
          ></v-text-field>
        </v-radio-group>
      </div>
      <div v-if="formState.type === '2-2'" class="mb-3">
        <h2 class="mb-2 secondary--text">發現黑熊痕跡</h2>
        <h3 class="mb-2 primary--text">1. 類型</h3>
        <v-radio-group v-model="formState.traceType" class="mt-0">
          <v-radio
            v-for="(name, index) in ['糞便', '腳印', '食痕', '折枝']"
            :key="index"
            :label="name"
            :value="index"
            class="mb-2"
          ></v-radio>
          <v-radio :value="4">
            <template v-slot:label>
              <v-text-field
                v-model="formState.traceTypeText"
                v-if="formState.traceType === 4"
                label="爪痕(樹木/種類)"
                placeholder="請填入文字"
                class="pa-0 mt-4"
              ></v-text-field>
              <span v-if="formState.traceType !== 4">爪痕(樹木/種類)</span>
            </template>
          </v-radio>
          <v-radio :value="5">
            <template v-slot:label>
              <v-text-field
                v-model="formState.traceTypeText"
                v-if="formState.traceType === 5"
                label="其他"
                placeholder="請填入文字"
                class="pa-0 mt-4"
              ></v-text-field>
              <span v-if="formState.traceType !== 5">其他</span>
            </template>
          </v-radio>
        </v-radio-group>
        <h3 class="mb-2 primary--text">2. 新舊估計</h3>
        <v-radio-group v-model="formState.freshness" class="mt-0">
          <v-radio :value="0">
            <template v-slot:label>
              <span v-if="formState.freshness !== 0">新</span>
              <v-text-field
                v-model="formState.freshnessNumber"
                v-if="formState.freshness === 0"
                :autofocus="true"
                label="新"
                prefix="約"
                suffix="天"
                class="pa-0 mt-4"
              ></v-text-field>
            </template>
          </v-radio>
          <v-radio :value="1">
            <template v-slot:label>
              <span v-if="formState.freshness !== 1">舊</span>
              <v-text-field
                v-model="formState.freshnessNumber"
                v-if="formState.freshness === 1"
                :autofocus="true"
                label="舊"
                prefix="約"
                suffix="個月"
                class="pa-0 mt-4"
              ></v-text-field>
            </template>
          </v-radio>
          <v-radio
            label="不清楚"
            :value="2"
          ></v-radio>
        </v-radio-group>
        <h3 class="primary--text">3. 是否提供影像檔案</h3>
        <v-radio-group v-model="formState.imageAvailable" row>
          <v-radio
            v-for="(name, index) in ['有', '無']"
            :key="index"
            :label="name"
            :value="index"
          ></v-radio>
        </v-radio-group>
        <h3 class="mb-2 primary--text">4. 其他補充說明</h3>
        <v-text-field
          outlined
          v-model="formState.otherInfo"
        ></v-text-field>
      </div>
      <h2 class="mb-2 secondary--text">下一次，如果有機會的話</h2>
      <h3 class="mb-2 primary--text">1. 您是否希望以後再看到野外的黑熊？</h3>
      <v-radio-group v-model="formState.ohshownAgain" class="mt-0">
        <v-radio
          v-for="(name, index) in ['是', '否', '沒意見']"
          :key="index"
          :label="name"
          :value="index"
          class="mb-2"
        ></v-radio>
      </v-radio-group>
      <v-text-field
        label="為什麼"
        outlined
        v-model="formState.ohshownAgainReason"
      ></v-text-field>
      <h3 class="primary--text mt-2 mb-3">2. 您知道以下哪些做法有助於減少遇到熊的機會，或避免不愉快地與熊相遇？ (可複選)</h3>
      <v-checkbox
        v-model="formState.preventOhshownMethods"
        v-for="(name, index) in ['盡量結伴同行', '輕聲走路', '必要時，沿途製造些聲響，如吹口哨、講話', '避免走夜路', '妥善收存食物、垃圾與廚餘', '看到熊在遠方時，人要輕聲離開現場', '單獨行動', '隨身攜帶哨子或鈴鐺', '攜帶防熊噴霧', '其他']"
        :key="index"
        :label="name"
        :value="index"
        hide-details
      >
        <template v-slot:label>
          <v-text-field
            v-model="formState.preventOhshownMethodsText"
            v-if="index === 9 && formState.preventOhshownMethods.includes(index)"
            :label="name"
            :autofocus="true"
            hide-details
          ></v-text-field>
          <span v-if="index !== 9 || !formState.preventOhshownMethods.includes(index)">{{name}}</span>
        </template>
      </v-checkbox>
      <h3 class="primary--text mt-6 mb-3">3. 您是否會先了解您預計前往的地點有無黑熊出沒？</h3>
      <v-radio-group v-model="formState.surveyIfBearExist" class="mt-0" row>
        <v-radio
          v-for="(name, index) in ['是', '否']"
          :key="index"
          :label="name"
          :value="index"
          class="mb-2"
        ></v-radio>
      </v-radio-group>
      <div class="bottom-button-container w-100 d-flex justify-center align-items-center px-xs-3 pb-md-9">
        <v-btn x-large rounded @click="submit" style="width: 100%; max-width: 345px;" color="primary">
          下一步
        </v-btn>
      </div>
    </v-container>
  </div>
</template>

<script lang="ts">
import { createComponent, inject, ref } from '@vue/composition-api'

import { MainMapControllerSymbol } from '../symbols'
import { MapFactoryController } from '../lib/map'
import { useAppState } from '../lib/appState'
import { REPORT_TYPE } from '../types'

import Minimap from './Minimap.vue'

export default createComponent({
  name: 'ConfirmFactory',
  components: {
    Minimap
  },
  props: {
    formState: {
      type: Object,
      default: {}
    },
    previewImages: {
      type: Array,
      default: []
    },
    submit: {
      type: Function
    }
  },
  setup () {
    const mapController = inject(MainMapControllerSymbol, ref<MapFactoryController>())
    const [appState, { pageTransition }] = useAppState()

    const initialFactories = mapController.value?.factories
    const initialLocation = mapController.value?.mapInstance.map.getView().getCenter()

    const reportTypeItems: Array<{ text: string, value?: string }> = [
      ...REPORT_TYPE
    ]

    return {
      appState,
      initialFactories,
      initialLocation,
      gotoStepOne () {
        if (mapController.value) {
          pageTransition.gotoCreateStep(0)
        }
      },
      gotoStepTwo () {
        pageTransition.gotoCreateStep(1)
      },
      reportTypeItems
    }
  }
})
</script>

<style lang="scss" scoped>
@import '@/styles/components/preview-images.scss';

.confirm-factory-page {
  @import '@/styles/typography.scss';

  background-color: white;
  z-index: 1;
  position: absolute;
  width: 100%;
  height: 100%;

  padding-bottom: 50px;
  overflow-y: auto;
  overflow-x: hidden;

  padding-bottom: 72px;

  h2 {
    font-size: 24px;
  }
}

.bottom-button-container {
  background: white;
  position: fixed;
  bottom: 0;
  left: 0;
  padding: 10px 15px;
}

hr {
  color: #EAF3BF;
  border-color: #EAF3BF;
  background-color: #EAF3BF;
  height: 1px;
  border-width: inherit;
}

.minimap-container {
  &.desktop {
    max-width: 430px;
  }
}

.minimap-overlay {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
</style>
