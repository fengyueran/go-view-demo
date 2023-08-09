import { PublicConfigClass } from '@/packages/public'
import { CreateComponentType } from '@/packages/index.d'
import { TextDynamicConfig } from './index'
import cloneDeep from 'lodash/cloneDeep'

export const option = {
  dataset: '我是动态文本',
  size: 20,
  gradient: {
    from: '#0000FFFF',
    to: '#00FF00FF',
    deg: 45
  }
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key = TextDynamicConfig.key
  public chartConfig = cloneDeep(TextDynamicConfig)
  public option = cloneDeep(option)
}
