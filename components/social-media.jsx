import Link from 'next/link'
import {
  Comikamedia, Facebook, Instagram, Youtube, Twitter,
} from './svg'

export const SocialMediaLogo = ({ className }) => {
  const SocialMedia = [
    ['/a', <Facebook className={className} />],
    ['/b', <Instagram className={className} />],
    ['/c', <Twitter className={className} />],
    ['/d', <Youtube className={className} />],
  ]
  console.log('🚀 ~ file: social-media.jsx ~ line 2 ~ SocialMediaLogo ~ params')
  return (
    <>
      {SocialMedia.map((icon) => (
        <Link href={icon[0]} key={icon[0]}>
          <a>{icon[1]}</a>
        </Link>
      ))}
    </>
  )
}
export default SocialMediaLogo
