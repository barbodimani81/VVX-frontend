// components/feedback/error-state.tsx
export default function ErrorState({
  title = 'خطایی رخ داد',
  description = 'لطفاً دوباره تلاش کنید.',
  onRetry,
}: {
  title?: string
  description?: string
  onRetry?: () => void
}) {
  return (
    <div className="rounded-lg border p-10 text-center">
      <div className="text-base font-medium text-red-600">{title}</div>
      <div className="mt-2 text-sm text-muted-foreground">{description}</div>
      {onRetry && (
        <div className="mt-4">
          <button
            className="rounded-md border px-3 py-2 text-sm hover:bg-muted"
            onClick={onRetry}
          >
            تلاش مجدد
          </button>
        </div>
      )}
    </div>
  )
}
