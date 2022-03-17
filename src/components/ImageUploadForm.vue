<template>
  <div class="image-upload-form w-100">
    <v-container
      style="max-width: 630px; position: relative"
      class="pt-3 pt-md-12 pb-md-8"
    >
      <h2 class="mb-4 secondary--text">上傳黑熊出沒痕跡照片</h2>

      <p>請至少上傳一張黑熊出沒痕跡照片。</p>

      <h3 class="mb-3 mt-7 primary--text required">黑熊出沒痕跡照片</h3>

      <div class="flex align-items-center mb-3">
        <v-btn :disabled="uploading" outlined class="mr-3">
          <label>
            <input
              multiple
              type="file"
              accept="image/*"
              ref="image"
              style="display: none"
              @change="onChange"
              :disabled="uploading"
            />
            新增照片
          </label>
        </v-btn>

        <span v-if="uploading && !disableProgressiveUpload">上傳中...</span>
        <span v-if="valid && !uploading && !error && !disableProgressiveUpload">
          上傳成功
          <v-icon class="primary--text">mdi-checkbox-marked-circle</v-icon>
        </span>
        <span v-if="error && !disableProgressiveUpload">上傳錯誤</span>
      </div>

      <div class="preview-images-container mb-2">
        <div
          v-for="image of previewImages"
          :key="image.token"
          class="uploaded-image"
        >
          <img :src="image.src" />
          <button class="remove-image-btn" @click="removeImage(image)" />
        </div>
      </div>

      <hr />
      <h2 class="mt-7 mb-2 secondary--text">選取遭遇時間</h2>
      <p>請選取目擊黑熊或其痕跡的日期及時間</p>

      <h3 class="mb-3 mt-7 primary--text required">遭遇時間</h3>

      <div class="flex align-items-center mb-3">
        <v-row>
          <v-col justify="center" align="center">
            <v-date-picker
              elevation="15"
              v-model="formState.date"
              class="date-picker"
            ></v-date-picker>
          </v-col>
          <v-col justify="center" align="center">
            <v-time-picker
              format="ampm"
              v-model="formState.time"
              elevation="15"
              class="time-picker"
            ></v-time-picker>
          </v-col>
        </v-row>
      </div>
      <hr />

      <div class="mb-3">
        <h2 class="mt-7 mb-2 secondary--text">環境地貌(可複選)</h2>
        <h3 class="mb-3 mt-7 primary--text required">土地類型：</h3>

        <div class="d-flex align-content-start flex-wrap">
          <v-checkbox
            class="pa-2"
            v-for="(groundType, index) in GROUND_TYPES"
            :key="`${groundType}${index}`"
            v-model="formState.groundTypes"
            :label="groundType"
            :value="groundType"
            hide-details
          >
          </v-checkbox>
        </div>

        <h3 class="mb-3 mt-7 primary--text required">植被：</h3>
        <div class="d-flex align-content-start flex-wrap">
          <v-checkbox
            class="pa-2"
            v-for="(vegetation, index) in VEGETATIONS"
            :key="`${vegetation}${index}`"
            v-model="formState.vegetations"
            :label="vegetation"
            :value="vegetation"
            hide-details
          />
        </div>

        <h3 class="mb-3 mt-7 primary--text required">
          附近可能吸引熊接近的物品:
        </h3>

        <div class="d-flex align-content-start flex-wrap">
          <v-checkbox
            class="pa-2"
            v-for="(attractor, index) in BEAR_ATTRACTORS"
            :key="`${attractor}${index}`"
            v-model="formState.bearAttractors"
            :label="attractor"
            :value="attractor"
            hide-details
          />
        </div>
      </div>
      <hr />
      <h3 class="mt-5 mb-2 primary--text">在這之前是否曾看過野外的台灣黑熊？</h3>
      <v-radio-group v-model="formState.alreadyOhshown" class="mt-0">
        <v-radio :value="1">
          <template v-slot:label>
            <v-text-field
              v-model="formState.alreadyOhshownNumber"
              label="是"
              suffix="次"
              autofocus
              v-if="formState.alreadyOhshown === 1"
            ></v-text-field>
            <span v-if="formState.alreadyOhshown !== 1">是</span>
          </template>
        </v-radio>
        <v-radio
          label="否"
          :value="0"
        ></v-radio>
      </v-radio-group>
      <h3 class="mt-5 mb-2 primary--text">我要通報...</h3>
      <v-radio-group v-model="formState.type" class="mt-0" row>
        <v-radio
          v-for="({ value, text }) in reportTypeItems"
          :key="value"
          :label="text"
          :value="value"
        />
      </v-radio-group>

      <div
        class="bottom-button-container w-100 d-flex justify-center align-items-center px-xs-3 pb-md-9"
      >
        <v-btn
          x-large
          rounded
          @click="onSubmit"
          style="width: 100%; max-width: 345px"
          color="primary"
        >
          {{ submitText || "下一步" }}
        </v-btn>
      </div>
    </v-container>
  </div>
</template>

<script lang="ts">
import { createComponent } from "@vue/composition-api";
import { UploadedImage } from "../api";
import { REPORT_TYPE } from "../types";

export default createComponent({
  props: {
    previewImages: {
      type: Array,
      default: []
    },
    uploading: {
      default: false
    },
    error: {
      default: null
    },
    onClickRemoveImage: {
      type: Function
    },
    submit: {
      type: Function
    },
    valid: {
      type: Boolean,
      default: false
    },
    formState: {
      type: Object
    },
    submitText: {
      type: String
    },
    disableProgressiveUpload: {
      type: Boolean,
      default: false
    }
  },
  name: "ImageUploadForm",
  setup(props, context) {
    const reportTypeItems: Array<{ text: string; value?: string }> = [
      ...REPORT_TYPE
    ];
    const GROUND_TYPES = [
      "森林(天然林)",
      "森林(人工林)",
      "森林(次生林)",
      "溪流或河床",
      "住宅房舍附近",
      "遊憩區(包括山屋 / 營地週遭)",
      "道路(步道)",
      "道路(馬路)",
      "道路(林道)",
      "道路(產業道路)",
      "農牧用地(果園)",
      "農牧用地(菜園)",
      "農牧用地(休耕地)",
      "農牧用地(養蜂場)",
      "農牧用地(禽舍)",
      "農牧用地(豬舍)",
      "農牧用地(工寮或倉庫)",
      "其他"
    ];
    const VEGETATIONS = [
      "闊葉林",
      "針葉林",
      "混合林",
      "灌叢",
      "草原",
      "竹林/箭竹林",
      "裸露地",
      "其他"
    ];
    const BEAR_ATTRACTORS = [
      "無",
      "自然食物資源",
      "動物屍體",
      "農作物",
      "家禽/畜",
      "蜂蜜",
      "垃圾/廚餘",
      "動物飼料",
      "人類食物",
      "其他"
    ];

    return {
      images: [],
      GROUND_TYPES,
      VEGETATIONS,
      BEAR_ATTRACTORS,
      onChange: function (e: InputEvent) {
        context.emit("input", (e.target as HTMLInputElement).files);
      },
      onSubmit() {
        if (props.valid && typeof props.submit === "function") {
          props.submit();
        }
      },
      removeImage: (image: UploadedImage) => {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        props.onClickRemoveImage!(image);
      },
      reportTypeItems
    };
  }
});
</script>

<style lang="scss" scoped>
@import "@/styles/components/preview-images.scss";

.image-upload-form {
  @import "@/styles/typography.scss";

  background-color: white;
  z-index: 1;
  position: absolute;
  height: 100%;

  padding-bottom: 50px;
  overflow-y: auto;
  overflow-x: hidden;
}

.bottom-button-container {
  background: white;
  position: fixed;
  bottom: 0;
  left: 0;
  padding: 10px 15px;
}

hr {
  color: #eaf3bf;
  border-color: #eaf3bf;
  background-color: #eaf3bf;
  height: 1px;
  border-width: inherit;
}

.time-picker {
  height: 100%;
}
.date-picker {
  height: 100%;
}
</style>
