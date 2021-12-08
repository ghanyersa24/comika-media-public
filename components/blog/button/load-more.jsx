export const LoadMoreButton = ({ onClickMore, isLoading, title = 'Lihat artikel lainnya' }) => (
  <div className="text-right ">
    <button
      type="button"
      onClick={onClickMore}
      disabled={isLoading}
      className="px-2 text-base leading-tight md:text-lg text-primary "
    >
      {isLoading ? 'loading' : title }
    </button>
  </div>
)

export default LoadMoreButton
