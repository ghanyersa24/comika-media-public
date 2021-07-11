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
  'Comika': {
    'id': number,
    'name': string,
    'photo': string,
    'verified': boolean
}
}
export type PropsDetailOfPost = {
  post: Post,
  // morePosts: string[]
}
