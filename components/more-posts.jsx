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
        <div className="divide-y-2 divide-gray-300 rounded-xl" key={key}>
          <div className="mb-3">
            <div className="w-full h-20 bg-gray-200 lg:h-48 animate-pulse " />
            <div className="h-4 my-2 bg-gray-200 lg:mt-4 animate-pulse " />
            <div className="h-4 mb-2 bg-gray-200 lg:mt-4 animate-pulse " />
          </div>
          <div className="pt-3">
            <div className="h-6 bg-gray-200 animate-pulse " />
          </div>
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
            {/* <div className="inline-block w-2 mr-2 bg-primary "> &nbsp;</div> */}
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
  posts, title, description, className = 'my-8 lg:my-16', mutate,
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
