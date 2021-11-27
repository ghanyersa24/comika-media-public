export function numberWithCommas(x:number):string {
  console.log('🚀 ~ file: accounting.ts ~ line 2 ~ numberWithCommas ~ x', x)
  if (x === undefined) return '-'
  if (x === 0) return '0'
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
export default numberWithCommas
