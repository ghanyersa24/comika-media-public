import {
  Posts, PostsContainer,
} from '../more-posts'

export const RenderMoreArticle = ({ data, mutate }) => {
  console.log('🚀 ~ file: index.tsx ~ line 75 ~ RenderMoreArticle ~ data', data)
  if (!data) return <div />
  return (
    <PostsContainer>
      { data.map((articles) => (
        <>
          {!articles ? null : <Posts posts={articles} mutate={mutate} />}
        </>
      ))}
    </PostsContainer>
  )
}

export default RenderMoreArticle
