import Link from 'next/link'
import Avatar from './avatar'
// import DateFormatter from './date-formatter'
import CoverImage from './cover-image'

export default function PostPreview({
  title,
  coverImage,
  // date,
  // excerpt,
  // author,
  slug,
}) {
  return (
    <div className="text-textSecondary">
      <div className="mb-5">
        <CoverImage
          slug={slug}
          title={title}
          src={coverImage}
          height={222}
          width={345}
        />
      </div>
      <div className="px-4">
        <Avatar className="text-lg font-medium leading-9 text-gray-600" name="dummy name" picture="https://awsimages.detik.net.id/community/media/visual/2021/05/27/presiden-jokowi_169.jpeg?w=700&q=90" />
        <h3 className="text-xl mb-3 font-bold  leading-loose mt-2">
          <Link as={`/posts/${slug}`} href="/posts/[slug]">
            <a className="hover:underline text-gray-700 text-2xl line-clamp-2">{title}</a>
          </Link>
        </h3>
        <div className="text-sm leading-tight text-gray-500">
          Selengkapnya...
        </div>
      </div>
      {/* <div className="text-lg mb-4">
        <DateFormatter dateString={date} />
      </div> */}
      {/* <p className="text-lg leading-relaxed mb-4">{excerpt}</p> */}
    </div>
  )
}
