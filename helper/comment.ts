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
  console.log('🚀 ~ file: comment.ts ~ line 13 ~ findCommentById ~ comments', comments)
  console.log('🚀 ~ file: comment.ts ~ line 13 ~ findCommentById ~ id', id)
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
