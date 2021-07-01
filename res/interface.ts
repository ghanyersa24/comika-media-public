/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
export interface BaseFetch {
  isLoading: boolean,
  error?: {
    msg: string
  },
  data?: any,
}
export interface swrReturn extends BaseFetch {
  isError?: boolean,

  mutate: any
}
export interface Itime {
  start: string,
  end: string
}

export type Login = {
  email: string,
  password: string
}
enum FetchStatus {
  loading = 'loading',
  error = 'error',
  success = 'success'
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
  'UserId': '0734f6b2-6b4c-45b9-be8c-d1aaf6803348'
}
export type TypePostCommentComponent = BaseFetch &{

  comments:comments[],

}
export type TypePostCommentAdd = BaseFetch &{
  onChange:(e:any)=>void,
  onSubmit:()=>void,
  comment:string

}
