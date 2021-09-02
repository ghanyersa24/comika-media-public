import { ItemStore } from '../components/items/item-store'
import { ContainerStore } from '../components/container/container-store'

export const App = () => {
  console.log('🚀 ~ file: tes.jsx ~ line 4 ~ App ~ App')
  return (
    <ContainerStore
      className="px-4 bg-gray-100 h-screen p-2"
      title="Digital produk"
      titleDescription="Produk populer minggu ini"
    >
      <ItemStore />
      <ItemStore />
      <ItemStore />
    </ContainerStore>
  )
}

export default App
