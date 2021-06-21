const ERROR_MSG = {
  FE: [{ type: 'maxLength', message: 'karakter melebihi' },
    { type: 'required', message: 'wajib diisi' }],
}

export const BASH_URL = process.env.NEXT_PUBLIC_BASH_URL
export const GOOGLE_MAP_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY
export default ERROR_MSG
