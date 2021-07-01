import {
  AiOutlineShareAlt, AiFillEye,
} from 'react-icons/ai'
import Avatar from './avatar'
import DateFormatter from './date-formatter'
import CoverImage from './cover-image'
import PostTitle from './post-title'

export default function PostHeader({
  title, coverImage, date,
}) {
  return (
    <>
      <PostTitle>{title}</PostTitle>
      <div className=" md:mb-12 flex justify-between ">
        <div className="flex flex-row items-center">
          <div>
            <Avatar className="text-primary text-lg font-medium leading-9 " name="dummy name" picture="https://awsimages.detik.net.id/community/media/visual/2021/05/27/presiden-jokowi_169.jpeg?w=700&q=90" />
          </div>
          <div className="w-2 h-2 bg-gray-500 rounded-full mr-2 ml-4" />
          <div className=" text-lg  text-gray-500">
            Diterbitkan pada
            <span className="ml-2"><DateFormatter dateString={date} /></span>
          </div>
        </div>
        <div className="text-lg font-medium leading-9 text-gray-500">
          <div className="inline-flex space-x-1.5 items-center justify-end w-16 h-9 ">
            <AiFillEye />
            <p>263</p>
          </div>
          <div className="inline-flex space-x-1.5 items-center justify-end w-16 h-9">
            <AiOutlineShareAlt />
            <p>263</p>
          </div>
        </div>
      </div>
      <div className="mb-8 md:mb-16 sm:mx-0">
        <CoverImage title={title} src={coverImage} height={620} width={1240} />
      </div>
      <div className="max-w-2xl mx-auto">
        {/* <div className="block md:hidden mb-6">
          <Avatar name={author.name} picture={author.picture} />
        </div> */}
        <div className="mb-6 text-lg">
          <DateFormatter dateString={date} />
        </div>
      </div>
    </>
  )
}
