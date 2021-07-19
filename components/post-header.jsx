import {
  AiOutlineShareAlt, AiFillEye,
} from 'react-icons/ai'
import { BiArrowBack } from 'react-icons/bi'
import Avatar from './avatar'
import DateFormatter from './date-formatter'
import { CoverImageDekstop, CoverImageMobile } from './cover-image'
import PostTitle from './post-title'

export function PostHeaderDekstop({
  title, coverImage, date, Comika,
}) {
  return (
    <>
      <PostTitle>{title}</PostTitle>
      <div className=" md:mb-12 flex justify-between ">
        <div className="flex flex-row items-center">
          <div>
            <Avatar className="text-primary text-lg font-medium leading-9 " name={Comika.name} picture={Comika.photo} />
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
        <CoverImageDekstop title={title} src={coverImage} height={620} width={1240} />
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

export function PostHeaderMobile({
  title, coverImage, date, Comika,
}) {
  return (
    <div className="">
      <div className="sm:mx-0 relative">
        <div className="bg-white p-2 absolute top-0 z-20 mt-6 ml-6 text-xl rounded-lg shadow">
          <BiArrowBack />
        </div>
        <div className="relaive z-10 ">
          <CoverImageMobile title={title} src={coverImage} height={720} width={720} />
        </div>

        <div className="bg-white shadow rounded-lg relative z-20 -mt-16 mx-5 px-4 py-2">
          <h1 className="text-lg font-bold leading-relaxed text-gray-800">
            {title}
          </h1>
          <div className="text-base leading-loose text-gray-500 mt-2 ">
            <DateFormatter dateString={date} />
            <div className="w-1.5 h-1.5 bg-gray-500 rounded-full mr-2 ml-4 inline-block " />
            {Comika.name}
          </div>
          <div className="text-lg font-medium leading-9 text-gray-500 ">
            <div className="inline-flex space-x-1.5 items-center justify-start w-16 h-9 ">
              <AiFillEye />
              <p>263</p>
            </div>
            <div className="inline-flex space-x-1.5 items-center justify-start w-16 h-9">
              <AiOutlineShareAlt />
              <p>263</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
