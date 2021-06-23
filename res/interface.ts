export interface swrReturn {
  isLoading: boolean,
  isError?: boolean,
  error?: {
    message:string
  },
  data: any,
  mutate: any
}
export interface Itime{
  start : string,
  end:string
}
