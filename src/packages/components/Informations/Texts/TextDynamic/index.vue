<template>
  <div class="container">
    <button @click="handleClick" title="背景色改变通过配置事件js实现">
      {{ indicatorVisible ? '隐藏温度' : '显示温度' }}
    </button>
    <h1 v-if="indicatorVisible" title="每10s从配置的服务器获取数据">温度：{{ temperature }}</h1>
  </div>
</template>
<script setup lang="ts">
import { PropType, toRefs, shallowReactive, watch, ref } from 'vue'
import { CreateComponentType } from '@/packages/index.d'
import { useChartDataFetch } from '@/hooks'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import { option as configOption } from './config'

const props = defineProps({
  chartConfig: {
    type: Object as PropType<CreateComponentType>,
    required: true
  }
})

const option = shallowReactive({
  dataset: configOption.dataset
})

const indicatorVisible = ref(false)
const temperature = ref(20)

const handleClick = () => {
  indicatorVisible.value = !indicatorVisible.value
}

const { w, h } = toRefs(props.chartConfig.attr)
const { size, gradient } = toRefs(props.chartConfig.option)

watch(
  () => props.chartConfig.option.dataset,
  (newData: any) => {
    option.dataset = newData
  },
  {
    immediate: true,
    deep: false
  }
)

useChartDataFetch(props.chartConfig, useChartEditStore, (newData: any) => {
  temperature.value = newData
})
</script>

<style lang="scss" scoped>
h1 {
  width: 400px;
  color: red;
  position: absolute;
  left: 0;
}
button {
  width: 100px;
  height: 40px;
  border-radius: 5px;
  background: blue;
  color: #fff;
}
</style>
