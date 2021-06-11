import PostPreview from './post-preview'

export default function MorePosts({ posts, title }) {
  return (
    <section>
      <div>

        <h2 className="mb-8 text-xl md:text-3xl font-bold tracking-tighter leading-tight">
          <div className="bg-primary mr-2 w-2 inline-block "> &nbsp;</div>
          {title}
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 md:gap-x-4 lg:gap-x-8 gap-y-20 md:gap-y-32 mb-32">
        {posts.map((post) => (
          <PostPreview
            key={post.slug}
            title={post.title}
            coverImage={post.coverImage}
            date={post.date}
            author={post.author}
            slug={post.slug}
            excerpt={post.excerpt}
          />
        ))}
      </div>
    </section>
  )
}
