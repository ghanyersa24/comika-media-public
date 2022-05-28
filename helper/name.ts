// function danang trisdiana putra to danang tp
// rudi wawa to rudi w
// rizky rizki to rizky r

export default function getNickName(name:string):string {
  const nama = name.split(' ')
  let nickname = ''
  // eslint-disable-next-line no-plusplus
  for (let i = 1; i < nama.length; i++) {
    nickname += nama[i][0]
  }
  return `${nama[0]} ${nickname}`
}
