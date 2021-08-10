import { IoLogoYoutube, IoLogoTwitter } from 'react-icons/io'
import { SiTiktok } from 'react-icons/si'
import { RiInstagramFill } from 'react-icons/ri'

export const SocialMediaLogo = ({ className }) => {
  const SocialMedia = [
    ['https://www.instagram.com/comikamedia/', <RiInstagramFill className={className} key="2" />],
    ['https://www.youtube.com/channel/UCVhSjM95YlVkMkQNCzjAm3A', <IoLogoYoutube className={className} key="4" />],
    ['https://twitter.com/comikamedia', <IoLogoTwitter className={className} key="3" />],
    ['https://www.tiktok.com/@comikamedia', <SiTiktok className={className} key="1" />],
  ]
  return (
    <>
      {SocialMedia.map((icon) => (
        <a target="_blank" href={icon[0]} key={icon[0]} rel="noreferrer">
          {icon[1]}
        </a>
      ))}
    </>
  )
}
export default SocialMediaLogo
