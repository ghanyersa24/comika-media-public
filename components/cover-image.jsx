import cn from 'classnames'
import Link from 'next/link'
import Image from 'next/image'

export function CoverImageDekstop({
  title, src, slug, height, width,
}) {
  if (!src) {
    return <>Tanpa Gambar</>
  }
  const image = (
    <Image
      src={src}
      alt={`Cover Image for ${title}`}
      className={cn('shadow-sm rounded-md object-cover', {
        'hover:shadow-md transition-shadow duration-200': slug,
      })}
      layout="responsive"
      placeholder="blur"
      blurDataURL="/background/download.webp"
      width={width}
      height={height}
    />
  )
  return (
    <div className="sm:mx-0">
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

export function CoverImageMobile({
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
      placeholder="blur"
      blurDataURL="/background/download.webp"
      layout="responsive"
      width={width}
      height={height}
    />
  )
  return (
    <div className="bg-red-400 sm:mx-0">
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
