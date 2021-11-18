import cn from 'classnames'
import Link from 'next/link'
import Image from 'next/image'
import { getImageSize } from '../helper/imageSize'

export function ImageInstrinsicPost({
  title, src, slug, height, width, className,
}) {
  if (!src) {
    return <>Tanpa Gambar</>
  }
  const image = (
    <Image
      src={src}
      alt={`Cover Image for ${title}`}
      className={className}
      layout="intrinsic"
      width={getImageSize(width)}
      height={getImageSize(height)}
      // sizes={sizes} // 128px used if width < 768px
    />
  )
  return (
    <div className=" sm:mx-0">
      {slug ? (
        <Link as={`/posts/${slug}`} href="/posts/[slug]">
          <a aria-label={title}>{image}</a>
        </Link>
      ) : (
        image
      )}
    </div>
  )
}

export function ImageResponsive({
  title, src, slug, height, width,
}) {
  if (!src) {
    return <>Tanpa Gambar</>
  }
  const image = (
    <Image
      src={src}
      alt={`Cover Image for ${title}`}
      className={cn('shadow-sm object-cover', {
        'hover:shadow-md transition-shadow duration-200': slug,
      })}
      layout="responsive"
      width={width}
      height={height}
    />
  )
  return (
    <div className="p-0 bg-blue-400 sm:mx-0">
      {slug ? (
        <Link as={`/posts/${slug}`} href="/posts/[slug]">
          <a aria-label={title}>{image}</a>
        </Link>
      ) : (
        image
      )}
    </div>
  )
}
