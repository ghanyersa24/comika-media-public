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
}
export type PropsDetailOfPost = {
  post: Post,
  // morePosts: string[]
}
