/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */

import { MutableRefObject, RefObject } from "react";

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface BaseFetch {
  error?: {
    msg: string;
  };
  data?: any;
}
export interface swrReturn extends BaseFetch {
  isLoading: boolean;
  isError?: boolean;

  mutate?: any;
}
export interface Itime {
  start: string;
  end: string;
}

export type Login = {
  email: string;
  password?: string;
};
export type ForgetPassword = {
  password: string;
  passwordConfirmation: string;
  token: string;
};
export type Signup = Login & {
  name: string;
};
export type Profile = Signup &
  address & {
    role?: string;
    phone: string;
    address: string;
    birthdate: string;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string;
    isPremium: 1 | 0;
    lastPremiumDate?: Date;
    photo: string;
  };

export interface CommentType {
  id: string;
  comment: string;
  createdAt: string;
  User: User;
  replies?: CommentType[];
  parentId?: string;
}

export interface User {
  photo: string;
  id: string;
  name: string;
}

export type TypePostCommentComponent = swrReturn & {
  comments: CommentType[];
  commentRef: MutableRefObject<any[]>;
  onClickReply: (selectedID: string) => void;
};
export type TypePostCommentAdd = swrReturn & {
  onSubmit: (comment: string) => void;
  onCloseModal: () => void;
  initialComment: string;
  onResetParrentComment: () => void;
  isOpen: boolean;

  isLoading: boolean;
  isMobile: boolean;
  parrentComment: CommentType;
};
export type subscribeType = {
  rupiah: string;
  description: string[];
  id: string;
  name: string;
  price: number;
  longTime: number;
};
export type Post = {
  id: string;
  userId: string;
  title: string;
  slug: string;
  banner: string;
  isPremium: boolean;
  isPublish: boolean;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  UserId: Date;
  withFlayer: boolean;
  viewer: number;
  shared: number;
  bookmarked: number;
  likes: number;
  attribution: string;
  Comika: {
    id: number;
    name: string;
    photo: string;
    verified: boolean;
  };
};
export type Layout = {
  isMobile: boolean;
};
export type PropsDetailOfPost = Layout & {
  post: Post;
  session: string[];
  relatedArticle: Post[];
  // morePosts: string[]
};

export interface ItemStoreType {
  rupiah: string;
  id: string;
  name: string;
  slug: string;
  isRedirect: boolean;
  categoryId: number;
  redirect: string;
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
  id: string;
  name: string;
  address: string;
  provinceId: number;
  province: string;
  cityId: number;
  city: string;
  type: string;
  postalCode: string;
  phone: string;
  userId?: string;
  subdistrictId?: null;
  subdistrict?: null;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: null;
  UserId?: string;
  mark?: string;
  active?: boolean;
};

export type productDetailsType = {
  onClickCart: () => void;
  onClickBuy: () => void;
  isDisabled: boolean;
  itemstore: ItemStoreType;
  buyedProductQyt?: number;
};

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
  type: string;
}

export type decreaseIncreaseFunctionType = {
  onDecrease: () => void;
  onIncrease: () => void;
};

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
  link: string;
  typeIcon: string;
  id: string;
  img: string;
  title: string;
  isRead: boolean;
  createdAt: Date;
  type: string;
  description: string;
}

export interface UnreadNotification {
  unreadAll: number;
  unreadInformasi: number;
  unreadTransaksi: number;
}

export interface Order {
  priceRp?: string;
  id?: string;
  code?: string;
  price?: number;
  url?: string;
  status?: "pending" | "settlement" | "expired";
  paymentType?: null;
  details?: DetailOrder[];
}

export interface DetailOrder {
  priceRp?: string;
  totalRp?: string;
  id?: string;
  note?: string;
  name?: string;
  quantity?: number;
  img?: string;
  price?: number;
  total?: number;
}
