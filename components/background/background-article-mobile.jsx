import BackgroundArticlePage from '../svg/BackgroundArticlePage'

export const BackgroundArticle = ({ title = 'Artikel' }) => (
  <div className="relative pt-8 pb-20 text-center bg-primary">

    <BackgroundArticlePage className="absolute -top-4 " />

    <h1 className="text-xl font-bold leading-relaxed text-white">{title}</h1>
  </div>
)

export default BackgroundArticle
