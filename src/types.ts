import Feature from 'ol/Feature'

/* eslint-disable quote-props */
export const FACTORY_TYPE = [
  { value: '2-1', text: '痕跡: 爪痕' },
  { value: '2-2', text: '痕跡: 排遺' },
  { value: '2-3', text: '痕跡: 植物折痕' },
  { value: '3', text: '人熊衝突現場痕跡 - 雞舍' },
  { value: '4', text: '人熊衝突現場痕跡 - 果園' },
  { value: '5', text: '人熊衝突現場痕跡 - 其他' },
  { value: '6', text: '死亡' },
  { value: '7', text: '現場目擊 - 不確定' },
  { value: '8', text: '現場目擊 - 確定' },
  { value: '9', text: '其他' }
] as const
export type FactoryType = (typeof FACTORY_TYPE)[number]['value']

export type FactoryDisplayStatusType = 'default' | 0 | 1 | 2 | 3

export const defaultFactoryDisplayStatuses = [
  'default', 0, 1, 2, 3
] as FactoryDisplayStatusType[]

type DocumentDisplayStatus = '已通報' | '已排程調查' | '與通報者溝通期' | '已開始進行鑑定' | '鑑定完畢已開始進行調查' | '已至現場調查' | '已調查完畢' | '不再追蹤'

type FactoryDisplayStatus = {
  type: FactoryDisplayStatusType,
  name: string,
  documentDisplayStatuses: ('疑似黑熊出沒痕跡' | DocumentDisplayStatus)[],
  color: string
}
export const FactoryDisplayStatuses: FactoryDisplayStatus[] = [
  {
    type: 'default',
    name: '未處理',
    documentDisplayStatuses: ['疑似黑熊出沒痕跡'],
    color: '#A22A29'
  },
  {
    type: 0,
    name: '處理中',
    documentDisplayStatuses: ['已通報', '已排程調查', '與通報者溝通期', '已開始進行鑑定'],
    color: '#457287'
  },
  {
    type: 1,
    name: '已斷電',
    documentDisplayStatuses: ['鑑定完畢已開始進行調查', '已至現場調查'],
    color: '#364516'
  },
  {
    type: 2,
    name: '已拆除',
    documentDisplayStatuses: ['已調查完畢'],
    color: '#A1A1A1'
  },
  {
    type: 3,
    name: '無法處理',
    documentDisplayStatuses: ['不再追蹤'],
    color: '#E0E0E0'
  }
]

const FactoryDisplayStatusMap = FactoryDisplayStatuses.reduce((acc, c) => {
  return {
    ...acc,
    [c.type]: c
  }
}, {}) as {
  [key in FactoryDisplayStatusType]: FactoryDisplayStatus
}

export const getDisplayStatusText = (status: FactoryDisplayStatusType) => {
  return FactoryDisplayStatusMap[status].name
}

export const getDisplayStatusColor = (status: FactoryDisplayStatusType) => {
  return FactoryDisplayStatusMap[status].color
}

export type FactoryImage = {
  id: string,
  image_path: string,
  url: string
}

export type FactoryData = {
  id: string,
  display_number: string,
  lat: number,
  lng: number,
  name: string,
  landcode: string,
  townname: string,
  sectname: string,
  sectcode: string,
  source: string,
  type: FactoryType,
  images: FactoryImage[],
  // TODO: can be one of https://docs.djangoproject.com/en/2.2/ref/settings/#datetime-input-formats
  // eslint-disable-next-line
  reported_at: null | string,
  data_complete: boolean,
  before_release: boolean,
  document_display_status: DocumentDisplayStatus | null,
  feature?: Feature
}

export type FactoriesResponse = Array<FactoryData>

export interface FactoriesByStatus {
  [key: string]: FactoryData[]
}

export type FactoryPostData = {
  name: string,
  type?: FactoryType,
  images?: string[],
  others?: string,
  lat: number,
  lng: number,
  nickname?: string,
  contact?: string
}

export type ReportRecord = {
  id: string,
  created_at: string,
  others?: string
}
