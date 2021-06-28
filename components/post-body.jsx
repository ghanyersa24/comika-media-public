import markdownStyles from './markdown-styles.module.css'

const OverlayStopArticle = ({ isShow }) => {
  if (isShow) {
    return (
      <>
        <div className="bg-gradient-to-b  from-transparent via-white to-white  absolute inset-x-0 bottom-0 flex flex-col justify-end items-center pb-8">
          <h4 className="text-primary text-3xl font-medium leading-9 mt-96 ">Jadilah Bagian dari Kami!</h4>
          <p className="text-lg leading-loose text-gray-700 text-center ">Dapatkan akses tanpa batas ke seluruh artikel kami dengan berlangganan comikamedia.id</p>
          <img className=" w-full " src="/assets/blog/subscribe/subscribe.png" />
        </div>

      </>
    )
  }
}
export default function PostBody({ content }) {
  return (
    <div className="max-w-2xl mx-auto relative ">
      <div
        className={markdownStyles.markdown}
        dangerouslySetInnerHTML={{ __html: content }}
      />
      <OverlayStopArticle isShow />
    </div>
  )
}
