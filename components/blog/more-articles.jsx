import {
  Posts, PostsContainer,
} from '../more-posts'

export const RenderMoreArticle = ({ data, mutate }) => {
  if (!data) return <div />
  return (
    <PostsContainer>
      { data.map((article) => (
        !article ? null : <Posts posts={article} mutate={mutate} key={Math.random()} />
      ))}
    </PostsContainer>
  )
}

export default RenderMoreArticle
