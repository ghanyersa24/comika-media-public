import Link from 'next/link'
import {
  Facebook, Instagram, Youtube, Twitter,
} from './svg'

export const SocialMediaLogo = ({ className }) => {
  const SocialMedia = [
    ['/a', <Facebook className={className} key="1" />],
    ['/b', <Instagram className={className} key="2" />],
    ['/c', <Twitter className={className} key="3" />],
    ['/d', <Youtube className={className} key="4" />],
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
