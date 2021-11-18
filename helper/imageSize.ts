import isMobile from 'is-mobile'

const mobile = isMobile()

export const getImageSize = (n : number):number => {
  console.log('🚀 ~ file: imageSize.ts ~ line 6 ~ getImageSize ~ getImageSize', mobile)
  if (mobile) {
    return n * 0.5
  }
  return n
}

export default getImageSize
