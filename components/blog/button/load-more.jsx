export const LoadMoreButton = ({ onClickMore, isLoading }) => (
  <div className="text-right mt-8">
    <button
      type="button"
      onClick={onClickMore}
      disabled={isLoading}
      className="text-base px-2 md:text-lg leading-tight text-primary "
    >
      {isLoading ? 'loading' : 'Lihat artikel lainnya'}
    </button>
  </div>
)

export default LoadMoreButton
