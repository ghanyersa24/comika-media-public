import PostPreview from './post-preview'

const skeleton = [1, 2, 3, 4, 5, 6]
export const Posts = ({ posts, mutate }) => (
  <>
    {posts ? posts.map((post) => (
      <PostPreview
        post={post}
        key={post.slug}
        mutate={mutate}
      />
    ))
      : skeleton.map((key) => (
        <div className="rounded-xl" key={key}>
          <div className="w-full h-28 lg:h-48 animate-pulse bg-gray-200 " />
          <div className="mt-2 lg:mt-4 h-8  animate-pulse bg-gray-200  " />
          <div className="mt-2 h-8  animate-pulse bg-gray-200  " />
        </div>
      ))}
  </>
)
export const PostsContainer = ({ children }) => (
  <div className="grid grid-cols-1 hp:grid-cols-2 xs:grid-cols-2 gap-x-4 md:grid-cols-3 md:gap-x-4 lg:gap-x-8 gap-y-8 md:gap-y-16">
    {children}
  </div>
)

export const TitlePost = ({ title, description }) => (
  <div>
    {title && description
      ? (
        <>
          <h2 className="title">
            {/* <div className="bg-primary mr-2 w-2 inline-block "> &nbsp;</div> */}
            {title}
          </h2>
          <p className="title-description">
            {description}
          </p>
        </>
      ) : null}

  </div>
)

export function MorePosts({
  posts, title, description, className = ' my-8 lg:my-16', mutate,
}) {
  return (
    <section className={className}>
      <TitlePost title={title} description={description} />
      <PostsContainer>
        <Posts posts={posts} mutate={mutate} />
      </PostsContainer>
    </section>
  )
}

export default MorePosts
