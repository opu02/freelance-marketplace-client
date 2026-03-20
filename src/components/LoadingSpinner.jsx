export default function LoadingSpinner({ fullPage = true }) {
  if (fullPage) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-dark-bg">
        <div className="flex flex-col items-center gap-4">
          <div className="spinner" />
          <p className="text-gray-500 dark:text-gray-400 font-medium text-sm">Loading...</p>
        </div>
      </div>
    )
  }
  return (
    <div className="flex items-center justify-center py-16">
      <div className="spinner" />
    </div>
  )
}
