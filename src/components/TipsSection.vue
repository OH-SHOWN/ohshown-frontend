<template>
    <div class="tips-container">
        <div style="display: flex; flex-direction: row; align-items: flex-end; margin-bottom: 5px">
            <img
                src="https://www.taiwanbear.org.tw/assets/images/warning.png"
                class="warning-icon"
            />
            <span style="width: 5px"/>
            <span class="tips-title">{{title}}</span>
        </div>
        <span class="tips-content">{{content}}</span>
    </div>
</template>

<script>
import { createComponent } from '@vue/composition-api'

export default createComponent({
    name: 'TipsSection',
    props: {
        title: {
            type: String,
            required: true
        }, 
        content: {
            type: String,
            required: true
        }
    }
})
</script>

<style scoped>
    .tips-container {
        background: #FFFDDD;
        padding: 20px 15px;
        border-radius: 25px;
        margin-bottom: 20px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }
    .warning-icon {
        width: 20px;
        display: inline-block;
    }
    .tips-title {
        font-size: 18px; 
        font-weight: 800;
        margin-right: 5px;
    }
    .tips-content {
        line-height: 1.3;
        vertical-align: middle;
    }
</style>
