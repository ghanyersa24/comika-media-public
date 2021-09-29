export function numberWithCommas(x:number):string {
  if (!x) return '-'
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
export default numberWithCommas
