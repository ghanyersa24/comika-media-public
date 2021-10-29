import { address as addressType } from '../res/interface'

export const getTitleAddress = (address :addressType):string => `${address.name} (${address.postalCode})`
// Jl.Cipaku Indah 3 No 14, Kecamatan Ledeng Kelurahan Cipedes, Bandung, JawaBarat.40143
export const getBodyAddress = (address :addressType):string => `${address.address}, ${address.subdistrict}, ${address.city},  ${address.province}.${address.postalCode}`
