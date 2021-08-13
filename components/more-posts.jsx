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
          <h2 className="text-xl md:text-xl lg:text-5xl font-medium tracking-tighter leading-tight md:leading-normal text-primary">
            {/* <div className="bg-primary mr-2 w-2 inline-block "> &nbsp;</div> */}
            {title}
          </h2>
          <p className="text-xs md:text-base lg:text-lg leading-normal text-gray-600 mb-4 lg:mb-8">
            {description}
          </p>
        </>
      ) : null}

  </div>
)

export function MorePosts({
  posts, title, description, className = ' mb-16 lg:mb-24', mutate,
}) {
  return (
    <section className={className}>
      <div>
        {title && description
          ? (
            <>
              <h2 className="text-xl md:text-xl lg:text-5xl font-medium tracking-tighter leading-tight md:leading-normal text-primary">
                {/* <div className="bg-primary mr-2 w-2 inline-block "> &nbsp;</div> */}
                {title}
              </h2>
              <p className="text-xs md:text-base lg:text-lg leading-normal text-gray-600 mb-4 lg:mb-8">
                {description}
              </p>
            </>
          ) : null}

      </div>
      <PostsContainer>
        <Posts posts={posts} mutate={mutate} />
      </PostsContainer>
    </section>
  )
}

export default MorePosts
