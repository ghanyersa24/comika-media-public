import isMobile from 'is-mobile'

const mobile = isMobile()

export const getImageSize = (n : number):number => {
  if (mobile) {
    return n * 0.5
  }
  return n
}

export default getImageSize
