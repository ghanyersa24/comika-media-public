import { IoLogoYoutube, IoLogoTwitter } from 'react-icons/io'
import { SiTiktok } from 'react-icons/si'
import { RiInstagramFill } from 'react-icons/ri'
import Link from 'next/link'

export const SocialMediaLogo = ({ className, oritentation = 'horizontal' }) => {
  const SocialMedia = [
    [
      'https://www.instagram.com/comikamedia/',
      <RiInstagramFill className={className} key="2" />,
      '@Comikamedia',
    ],
    [
      'https://www.youtube.com/channel/UCVhSjM95YlVkMkQNCzjAm3A',
      <IoLogoYoutube className={className} key="4" />,
      'COMIKA MEDIA',
    ],
    [
      'https://twitter.com/comikamedia',
      <IoLogoTwitter className={className} key="3" />,
      'Comikamedia',
    ],
    [
      'https://www.tiktok.com/@comikamedia',
      <SiTiktok className={className} key="1" />,
      '@Comikamedia',
    ],
  ]
  if (oritentation === 'vertical') {
    return (
      <>
        {SocialMedia.map((icon) => (
          <a className="flex items-center text-gray-light" target="_blank" href={icon[0] as string} key={icon[0] as string} rel="noreferrer">
            {icon[1]}
            {icon[2]}
          </a>
        ))}
      </>
    )
  }
  if (oritentation === 'horizontal') {
    return (
      <>
        {SocialMedia.map((icon) => (
          <a target="_blank" href={icon[0] as string} key={icon[0] as string} rel="noreferrer">
            {icon[1]}
          </a>
        ))}
      </>
    )
  }
}
export default SocialMediaLogo
