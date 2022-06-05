/* eslint-disable no-plusplus */
import { CommentType } from '../res/interface'

// export interface CommentType {
// 	id: string;
// 	comment: string;
// 	createdAt: string;
// 	User: User;
// 	replies?: CommentType[];
// 	parentId?: string;
// }
export const findCommentById = (comments: CommentType[], id:string): CommentType => {
  if (!comments) return null
  let comment = comments.find((c) => c.id === id)
  if (comment) {
    return comment
  }
  if (comments.length > 0) {
    for (let i = 0; i < comments.length; i++) {
      comment = findCommentById(comments[i].replies, id)
      if (comment) {
        return comment
      }
    }
  }
  return null
}

export default findCommentById
