import PostPreview from './post-preview'

export default function MorePosts({ posts, title, description }) {
  return (
    <section>
      <div>

        <h2 className="text-xl md:text-5xl font-medium tracking-tighter leading-tight text-primary">
          {/* <div className="bg-primary mr-2 w-2 inline-block "> &nbsp;</div> */}
          {title}
        </h2>
        <p className="text-xs leading-normal text-gray-600 mb-4">{description}</p>
      </div>
      <div className="grid grid-cols-2 gap-x-2 md:grid-cols-3 md:gap-x-4 lg:gap-x-8 gap-y-12 md:gap-y-16 mb-32">
        {posts.map((post) => (
          <PostPreview
            key={post.slug}
            title={post.title}
            banner={post.banner}
            date={post.updatedAt}
            author={post.author}
            slug={post.slug}
            isPremium={post.isPremium}
            Comika={post.Comika}
          />
        ))}
      </div>
    </section>
  )
}
