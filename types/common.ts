export interface ProgramDetail {
  display_title: string
  id: string
  short_title: string
  thumbnail_img_url: string
}

export type ShortTitleKey = keyof typeof ShortTitle
export type StatusKey = keyof typeof Status

export enum ShortTitle {
  vc = 'vc',
  product = 'product',
  data = 'data',
  data2 = 'data2',
  data3 = 'data3',
  scrum = 'scrum',
  product2 = 'product2',
  growth = 'growth',
}

export enum Status {
  OFFERING = 'OFFERING',
  RUNNING = 'RUNNING',
  OFFBOARDING = 'OFFBOARDING',
}
