/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
export interface BaseFetch {
  error?: {
    msg: string
  },
  data?: any,
}
export interface swrReturn extends BaseFetch {
  isLoading: boolean,
  isError?: boolean,

  mutate?: any
}
export interface Itime {
  start: string,
  end: string
}

export type Login = {
  email: string,
  password?: string
}
export type Signup = Login &{
  name: string,
}
export type Profile = Signup&{
  role: string,
  phone: string,
  address: string,
  postalCode: string,
  district: string,
  city: string,
  province: string,
  createdAt: string,
  updatedAt: string,
  deletedAt: string,
  photo:string
}
export type comments ={
  'id': 'bb3cb8bf-ef5e-4f5b-9ed7-749990401045',
  'comment': 'waaah bagus nih gae',
  'userId': '0734f6b2-6b4c-45b9-be8c-d1aaf6803348',
  'articleId': 'f3950e22-c609-4f7e-8d23-4fec9b52dd65',
  'createdAt': '2021-06-24T16:56:03.039Z',
  'updatedAt': '2021-06-24T16:56:03.039Z',
  'deletedAt': null,
  'ArticleId': 'f3950e22-c609-4f7e-8d23-4fec9b52dd65',
  'UserId': '0734f6b2-6b4c-45b9-be8c-d1aaf6803348',
  'User': {
    'photo': string,
    'id': string,
    'name': string
  }
}

export type TypePostCommentComponent = swrReturn &{
  comments:comments[],
}
export type TypePostCommentAdd = swrReturn &{
  onChange:(e:any)=>void,
  onSubmit:()=>void,
  comment:string

}

export type Post = {
  'id': string,
  'userId': string,
  'title': string,
  'slug': string,
  'banner': string,
  'isPremium': boolean,
  'isPublish': boolean,
  'content':string,
  'createdAt': Date,
  'updatedAt': Date,
  'deletedAt': Date,
  'UserId': Date,
  'withFlayer': boolean,
  'Comika': {
    'id': number,
    'name': string,
    'photo': string,
    'verified': boolean
}
}
export type Layout ={
  isMobile:boolean,
}
export type PropsDetailOfPost =Layout& {
  post: Post,
  session:string[],
  // morePosts: string[]
}
