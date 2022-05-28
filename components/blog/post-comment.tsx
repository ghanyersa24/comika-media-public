/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable max-len */
import {
  Fragment, ReactElement, useState,
} from 'react'
import Image from 'next/image'
import { Dialog, Transition } from '@headlessui/react'
import { signIn, useSession } from 'next-auth/client'
import { toast } from 'react-toastify'
import cn from 'classnames'

import { IoMdClose } from 'react-icons/io'
import TextareaAutosize from 'react-textarea-autosize'
import { DateFormatterRelative } from '../date-formatter'
import {
  TypePostCommentComponent,
  TypePostCommentAdd,
  CommentType,
  Profile,
} from '../../res/interface'
import getNickName from '../../helper/name'

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

export const CommentItem = ({
  name,
  comment,
  createdAt,
  photo,
  replies,
  id,
  onClickReply,
}: {
  name: string;
  id: string;
  comment: string;
  createdAt: string;
  photo: string;
  replies: CommentType[];
  onClickReply: (selectedID:string) => void;
}): ReactElement => {
  const [session] = useSession()
  const handleReply = () => {
    if (session) {
      onClickReply(id)
    } else {
      toast.info('Harap Login terlebih dahulu', {

        onClose: () => signIn(),
        autoClose: 2000,
      })
    }
  }

  return (
    <div className="py-2 ">
      <table className="table-auto ">
        <tr className="">
          <td className="">
            <div className="w-8 h-8 mr-2 xs:w-12 xs:h-12 xs:mr-4 ">
              <Image
                src={photo || '/background/download.webp'}
                alt={`photo profil ${name}`}
                layout="intrinsic"
                className="rounded-full"
                width={144}
                height={144}
              />
            </div>
          </td>
          <td>
            <div className="flex items-center">
              <p className="mr-2 font-bold leading-tight md:text-xl line-clamp-1 ">
                {name}
              </p>
              <span className="flex-shrink-0 text-xs font-medium text-gray-500 md:text-base ">
                <DateFormatterRelative dateString={createdAt} />
              </span>
            </div>
          </td>
        </tr>
        <tr>
          <td />
          <td className="md:text-lg">{comment}</td>
        </tr>
        <tr>
          <td />
          <td>
            <button onClick={handleReply} type="button" className="flex items-center mt-2">
              <svg
                className="w-5 h-5 mr-2"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4.83329 0.166504H7.30663C8.5443 0.166504 9.73129 0.658169 10.6065 1.53334C11.4816 2.40851 11.9733 3.59549 11.9733 4.83317V7.3065C11.9733 9.88383 9.88395 11.9732 7.30663 11.9732H4.83329C2.25596 11.9732 0.166626 9.88383 0.166626 7.3065V4.83317C0.166626 2.25584 2.25596 0.166504 4.83329 0.166504ZM8.59324 6.04299C8.99432 5.6463 9.22 5.10562 9.21996 4.5415V3.86484C9.21996 3.70853 9.13657 3.5641 9.00121 3.48595C8.86585 3.4078 8.69907 3.4078 8.56371 3.48595C8.42835 3.5641 8.34496 3.70853 8.34496 3.86484V4.5415C8.35304 4.87809 8.22288 5.20329 7.98481 5.44136C7.74674 5.67942 7.42155 5.80958 7.08496 5.8015H4.41329L5.70246 4.51234C5.86309 4.33996 5.85835 4.07133 5.69174 3.90472C5.52513 3.73812 5.25651 3.73338 5.08413 3.894L3.04829 5.92984C3.00875 5.9703 2.9771 6.01777 2.95496 6.06984C2.90824 6.17778 2.90824 6.30023 2.95496 6.40817C2.9771 6.46023 3.00875 6.50771 3.04829 6.54817L5.08413 8.56067C5.1668 8.64169 5.27755 8.68766 5.39329 8.689C5.50879 8.68649 5.61913 8.64069 5.70246 8.56067C5.87306 8.38986 5.87306 8.11315 5.70246 7.94234L4.41329 6.65317H7.08496C7.64904 6.6594 8.19217 6.43968 8.59324 6.04299Z"
                  fill="#006BC1"
                />
              </svg>
              <p className="text-gray-700 ">Balas</p>
            </button>
          </td>
        </tr>
        <tr>
          <td />
          <td>
            <div className="mt-2">
              {replies?.map(
                ({
                  User,
                  comment: subComment,
                  createdAt: subCreatedAt,
                  id: idSubComment,
                  replies: subReplies,
                }) => (
                  <CommentItem
                    name={User.name}
                    comment={subComment}
                    createdAt={subCreatedAt}
                    photo={User.photo}
                    key={idSubComment}
                    id={idSubComment}
                    replies={subReplies}
                    onClickReply={onClickReply}
                  />
                ),
              )}
            </div>
          </td>
        </tr>
      </table>
    </div>
  )
}

export const PostCommentList = ({
  comments,
  isLoading,
  onClickReply,
}: TypePostCommentComponent): ReactElement => {
  let content: ReactElement[] | ReactElement = <PostCommentLoading />
  if (comments && !isLoading) {
    content = comments.map(({
      User, comment, createdAt, id, replies,
    }) => (
      <div key={id} className="pt-2 pb-0">
        <CommentItem
          name={User.name}
          comment={comment}
          createdAt={createdAt}
          photo={User.photo}
          id={id}
          replies={replies}
          onClickReply={onClickReply}
        />
      </div>
    ))
  }
  return <div className="divide-y ">{content}</div>
}

export const PostCommentAdd = ({
  isLoading,
  isMobile,
  onSubmit,
  onCloseModal,
  initialComment,
  isOpen,
  onResetParrentComment,
  parrentComment,
}: TypePostCommentAdd): ReactElement => {
  const [comment, setComment] = useState(initialComment)
  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(comment)
    setComment('')
  }

  if (isMobile) {
    return (
      <div className="fixed bottom-0 left-0 right-0 z-10 w-full max-w-md overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl">
        {parrentComment && (
        <div
          className="text-lg font-medium text-gray-900"
        >
          <div className="flex items-center justify-start px-4 py-2 bg-gray-200">
            <div className="flex items-center justify-start h-full">
              <p className="font-medium leading-normal text-gray-600 ">Balasan untuk:</p>
            </div>
            <div className="flex items-center justify-center ml-2 mr-1">
              <img className="rounded-full w-7 h-7" src={parrentComment.User.photo} />
            </div>
            <div className="flex items-center justify-start flex-1 ">
              <p className="font-bold leading-normal text-gray-900 ">{getNickName(parrentComment.User.name)}</p>
            </div>
            <button onClick={onResetParrentComment} type="button" className="px-2 py-1"><IoMdClose /></button>
          </div>

        </div>
        )}
        <form className="py-2 border-t " onSubmit={handleSubmit}>

          <div className="flex items-center justify-start w-full px-4 ">
            <TextareaAutosize
              // cacheMeasurements
              placeholder="Tambahkan komentar..."
              className="w-full py-2 border-0 focus:border-0 focus:ring-0"
              onChange={(e) => setComment(e.target.value)}
              value={comment}
            />
            <button
              type="submit"
              // className=" text-primary"
              className={cn(
                'px-6 py-2 text-white rounded bg-primary',
                {
                  'opacity-50 cursor-not-allowed': isLoading,
                },
              )}
              disabled={isLoading}
            >
              Post

            </button>
          </div>
        </form>
      </div>
    )
  }

  return (
    <div className="">
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => {
            onCloseModal()
            // setComment('')
          }}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-full text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-100"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-50"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="fixed bottom-0 w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl md:static md:rounded-2xl">
                  {parrentComment && (
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    <div className="inline-flex items-start justify-start">
                      <div className="flex items-center justify-start h-full">
                        <p className="font-medium leading-normal text-gray-600 ">Balasan untuk:</p>
                      </div>
                      <div className="flex items-center justify-center ml-2 mr-2">
                        <img className="w-8 h-8 rounded-full" src={parrentComment.User.photo} />
                      </div>
                      <div className="flex items-center justify-start">
                        <p className="font-bold leading-normal text-gray-900 ">{getNickName(parrentComment.User.name)}</p>
                      </div>
                    </div>

                  </Dialog.Title>
                  )}
                  <form className="mt-2" onSubmit={handleSubmit}>

                    <div className="w-full">
                      <TextareaAutosize
                        // cacheMeasurements
                        minRows={3}
                        placeholder="Tambahkan komentar..."
                        className="w-full py-2 border-0 focus:border-0 focus:ring-0"
                        onChange={(e) => setComment(e.target.value)}
                        value={comment}
                      />
                    </div>
                    <div className="justify-end hidden mt-2 md:flex">
                      <button
                        type="submit"
                        className={cn(
                          'px-6 py-2 text-white rounded bg-primary',
                          {
                            'opacity-50 cursor-not-allowed': isLoading,
                          },
                        )}
                        disabled={isLoading}
                      >
                        Kirim
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>

  )
}

export const PostInitialCommentAddDesktop = ({ isLoading, profile, onSubmit }:{isLoading:boolean, profile:Profile, onSubmit:(comment:string)=>void}):ReactElement => {
  const [comment, setComment] = useState('')
  return (
    <>
      {profile && (
      <div className="px-6 py-6 my-2 -mx-8 rounded-xl bg-slate-100 ">
        <div className="flex items-center">
          <div className="w-12 h-12 mr-2 xs:w-12 xs:h-12 xs:mr-4">
            <Image
              src={profile.photo || '/background/download.webp'}
              alt={`photo profil ${profile.name}`}
              layout="intrinsic"
              className="rounded-full"
              width={144}
              height={144}
            />
          </div>
          <span className="mx-2 font-bold md:text-xl">{profile.name}</span>
        </div>
        <TextareaAutosize
          // cacheMeasurements
          placeholder="Tambahkan komentar..."
          minRows={3}
          className="w-full px-4 py-2 my-4 border-0 focus:border-0 focus:ring-0 "
          onChange={(e) => setComment(e.target.value)}
          value={comment}
        />
        {/* <input value={comment} onChange={(e) => setComment(e.target.value)} className="flex-1 px-3 py-2 mr-2 " type="text" placeholder="Tambahkan Komentar" name="comment" id="comment" /> */}
        <div className="flex justify-end">
          <button
            onClick={() => {
              onSubmit(comment)
              setComment('')
            }}
            type="button"
            className={cn(
              'px-6 py-2 text-white rounded bg-primary',
              {
                'opacity-50 cursor-not-allowed': isLoading,
              },
            )}
            disabled={isLoading}
          >
            Kirim

          </button>
        </div>
      </div>
      )}
    </>
  )
}

export default PostCommentList
