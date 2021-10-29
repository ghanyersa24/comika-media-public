import { ReactElement } from 'react'
import { AvatarRelativeDate } from '../avatar'
import { DateFormatterRelative } from '../date-formatter'
import { TypePostCommentComponent, TypePostCommentAdd } from '../../res/interface'

export const PostCommentLoading = (): ReactElement => (
  <div className="w-full max-w-sm p-4 mx-auto border border-blue-300 rounded-md shadow">
    <div className="flex space-x-4 animate-pulse">
      <div className="w-12 h-12 bg-blue-400 rounded-full" />
      <div className="flex-1 py-1 space-y-4">
        <div className="w-3/4 h-4 bg-blue-400 rounded" />
        <div className="space-y-2">
          <div className="h-4 bg-blue-400 rounded" />
          <div className="w-5/6 h-4 bg-blue-400 rounded" />
        </div>
      </div>
    </div>
  </div>
)

export const PostCommentList = ({
  comments, isLoading,
}: TypePostCommentComponent): ReactElement => {
  let content: ReactElement[] | ReactElement = <PostCommentLoading />
  if (comments && !isLoading) {
    content = comments.map(({
      User, comment, createdAt, id,
    }) => (
      <div className="p-4 mb-8 bg-gray-100 rounded-2xl " key={id}>
        <div className="flex flex-row content-center justify-between">
          <AvatarRelativeDate
            className="mb-2 text-base font-medium leading-9 text-gray-700 md:mb-4 md:text-lg "
            name={User.name}
            picture={User.photo}
            date={<DateFormatterRelative dateString={createdAt} />}
          />
        </div>
        <p className="md:text-lg">

          {comment}

        </p>
      </div>
    ))
  }
  return (
    <>
      <h6 className="mb-4 text-xl font-medium leading-10 md:mb-8 md:text-4xl text-primary">Komentar</h6>
      {content}
    </>

  )
}

export const PostCommentAdd = ({
  isLoading, onChange, onSubmit, comment,
}:TypePostCommentAdd):ReactElement => (
  <>
    <h6 className="mt-8 mb-4 text-xl font-medium leading-10 text-primary">Tulis Komentar</h6>
    <textarea value={comment} onChange={onChange} rows={5} className="inline-flex items-start justify-start w-full pt-4 pl-5 border border-gray-200 rounded-md" />
    <div className="flex justify-end ">
      <button type="button" className="btn-primary" onClick={onSubmit}>Kirim</button>
    </div>
  </>
)

export default PostCommentList
