import { ReactElement } from 'react'
import Avatar from '../avatar'
import DateFormatter from '../date-formatter'
import { TypePostCommentComponent, TypePostCommentAdd } from '../../res/interface'

export const PostCommentLoading = (): ReactElement => (
  <div className="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
    <div className="animate-pulse flex space-x-4">
      <div className="rounded-full bg-blue-400 h-12 w-12" />
      <div className="flex-1 space-y-4 py-1">
        <div className="h-4 bg-blue-400 rounded w-3/4" />
        <div className="space-y-2">
          <div className="h-4 bg-blue-400 rounded" />
          <div className="h-4 bg-blue-400 rounded w-5/6" />
        </div>
      </div>
    </div>
  </div>
)

export const PostCommentList = ({
  comments, isLoading,
}: TypePostCommentComponent): ReactElement => {
  console.log('🚀 ~ file: post-comment.tsx ~ line 24 ~ comments', comments)
  let content: ReactElement[] | ReactElement = <PostCommentLoading />
  if (comments && !isLoading) {
    content = comments.map(({
      userId, comment, createdAt, id,
    }) => (
      <div className="mb-8 " key={id}>
        <div className="flex-row justify-between content-center flex">
          <Avatar className="text-lg font-medium leading-9 text-gray-700 mb-4 " name={userId} picture="https://awsimages.detik.net.id/community/media/visual/2021/05/27/presiden-jokowi_169.jpeg?w=700&q=90" />
          <span className="text-lg font-medium leading-9 text-gray-700"><DateFormatter dateString={createdAt} /></span>
        </div>
        <p>
          "
          {comment}
          "
        </p>
      </div>
    ))
  }
  return (
    <>
      <h6 className="text-4xl font-medium leading-10 text-primary mb-8">Komentar</h6>
      {content}
    </>

  )
}

export const PostCommentAdd = ({
  isLoading, onChange, onSubmit, error, comment,
}:TypePostCommentAdd):ReactElement => {
  console.log('🚀 ~ file: post-comment.tsx ~ line 54 ~ status', isLoading, error)
  return (
    <>
      <h6 className="text-xl font-medium leading-10 text-primary mb-4 mt-8">Tulis Komentar</h6>
      {error?.msg}
      <textarea value={comment} onChange={onChange} rows={5} className="inline-flex items-start justify-start pl-5  pt-4 w-full  border rounded-md border-gray-200" />
      <div className="flex justify-end ">
        <button type="button" className="btn-primary" onClick={onSubmit}>Kirim</button>
      </div>
    </>
  )
}

export default PostCommentList
