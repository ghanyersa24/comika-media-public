import Link from 'next/link'
import {
  FaFacebookSquare,
} from 'react-icons/fa'
import { IoLogoYoutube, IoLogoTwitter } from 'react-icons/io'
import { RiInstagramFill } from 'react-icons/ri'

export const SocialMediaLogo = ({ className }) => {
  const SocialMedia = [
    ['/a', <FaFacebookSquare className={className} key="1" />],
    ['/b', <RiInstagramFill className={className} key="2" />],
    ['/c', <IoLogoTwitter className={className} key="3" />],
    ['/d', <IoLogoYoutube className={className} key="4" />],
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
