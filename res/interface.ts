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
export type ForgetPassword = {
  password: string
  passwordConfirmation: string
  token: string
}
export type Signup = Login & {
  name: string,
}
export type Profile = Signup & address & {
  role?: string,
  phone: string,
  address: string,
  birthdate: string,
  createdAt?: string,
  updatedAt?: string,
  deletedAt?: string,
  photo: string
}
export type comments = {
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

export type TypePostCommentComponent = swrReturn & {
  comments: comments[],
}
export type TypePostCommentAdd = swrReturn & {
  onChange: (e: any) => void,
  onSubmit: () => void,
  comment: string

}
export type subscribeType = {
  'rupiah': string,
  'description': string[],
  'id': string,
  'name': string,
  'price': number,
  'longTime': number
}
export type Post = {
  'id': string,
  'userId': string,
  'title': string,
  'slug': string,
  'banner': string,
  'isPremium': boolean,
  'isPublish': boolean,
  'content': string,
  'createdAt': Date,
  'updatedAt': Date,
  'deletedAt': Date,
  'UserId': Date,
  'withFlayer': boolean,
  'viewer': number,
  'shared': number,
  'bookmarked': number,
  'likes': number,
  'attribution': string,
  'Comika': {
    'id': number,
    'name': string,
    'photo': string,
    'verified': boolean
  }
}
export type Layout = {
  isMobile: boolean,
}
export type PropsDetailOfPost = Layout & {
  post: Post,
  session: string[],
  relatedArticle: Post[]
  // morePosts: string[]
}

export interface ItemStoreType {
  rupiah: string;
  id: string;
  name: string;
  slug: string;
  categoryId: number;
  description?: string;
  price: number;
  publishedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: null;
  Category?: string;
  images: Image[];
}

export interface Image {
  thumbnail: boolean | null;
  source: Source;
}

export interface Source {
  url: string;
  name: string;
}

export type address = {
  'id': string,
  'name': string,
  'address': string,
  'provinceId': number,
  'province': string,
  'cityId': number,
  'city': string,
  'type': string,
  'postalCode': string,
  'phone': string,
  userId?: string,
  subdistrictId?: null,
  subdistrict?: null,
  createdAt?: Date,
  updatedAt?: Date,
  deletedAt?: null,
  UserId?: string,
  mark?: string,
  active?: boolean,
}

export type productDetailsType = {
  onClickCart: () => void,
  onClickBuy: () => void,
  isDisabled: boolean,
  itemstore: ItemStoreType,
  buyedProductQyt?: number
}

export interface cartType {
  id: string;
  productId: string;
  qty: number;
  img: string;
  note: string;
  name: string;
  weight: number;
  price: number;
  priceRp: string;
  total: number;
  totalRp: string;
}

export type decreaseIncreaseFunctionType = {
  onDecrease: () => void,
  onIncrease: () => void,
}

export interface EstimationCost {
  detail: DetailOfEstimationCost;
  address: address;
  estimateDelivery: EstimateDelivery[];
}

export interface DetailOfEstimationCost {
  qty: string;
  weight: string;
  subtotal: string;
  subtotalRp: string;
}

export interface EstimateDelivery {
  id: number;
  service: string;
  description: string;
  cost: number;
  rupiah: string;
  estDay: string;
  estDate: string;
  note: string;
}

export interface CartEstimation {
  detail: {
    qty: string;
    weight: string;
    subtotal: string;
    subtotalRp: string;
  };
  address: address;
  estimateDelivery: EstimateDelivery[];
}

export interface Promo {
  price: number;
  rupiah: string;
  id: string;
  name: string;
  code: string;
  category: string;
}

export interface Notification {
  typeIcon?: string;
  id?: string;
  title?: string;
  img?: string;
  description?: string;
  descriptionHtml?: string;
  isRead?: boolean;
  type?: string;
  userId?: string;
  orderId?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: null;
  UserId?: string;
  OrderId?: string;
  Order?: Order;
}

export interface Order {
  priceRp?: string;
  id?: string;
  code?: string;
  price?: number;
  url?: string;
  status?: string;
  paymentType?: null;
  details?: DetailOrder[];
}

export interface DetailOrder {
  priceRp?: string;
  totalRp?: string;
  id?: string;
  name?: string;
  quantity?: number;
  img?: string;
  price?: number;
  total?: number;
}
