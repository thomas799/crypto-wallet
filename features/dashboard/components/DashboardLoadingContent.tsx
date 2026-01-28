export function DashboardLoadingContent() {
  return (
    <div className="grid w-full max-w-6xl grid-cols-1 gap-6 lg:grid-cols-2">
      <div className="flex flex-col justify-between rounded-3xl bg-white p-6 shadow-lg">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 animate-pulse rounded-full bg-gray-200" />
            <div className="space-y-2">
              <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
              <div className="h-3 w-32 animate-pulse rounded bg-gray-200" />
            </div>
          </div>
          <div className="space-y-2 pt-4">
            <div className="h-3 w-20 animate-pulse rounded bg-gray-200" />
            <div className="h-8 w-40 animate-pulse rounded bg-gray-200" />
          </div>
          <div className="space-y-2 pt-2">
            <div className="h-3 w-24 animate-pulse rounded bg-gray-200" />
            <div className="h-6 w-32 animate-pulse rounded bg-gray-200" />
          </div>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-3">
          <div className="h-14 animate-pulse rounded-2xl bg-gray-200" />
          <div className="h-14 animate-pulse rounded-2xl bg-gray-200" />
        </div>
      </div>
      <div className="flex flex-col rounded-3xl bg-white p-6 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <div className="h-5 w-24 animate-pulse rounded bg-gray-200" />
          <div className="h-8 w-8 animate-pulse rounded-full bg-gray-200" />
        </div>
        <div className="space-y-1">
          <div className="h-10 w-36 animate-pulse rounded bg-gray-200" />
          <div className="h-4 w-20 animate-pulse rounded bg-gray-200" />
        </div>
        <div className="mt-4 h-48 w-full animate-pulse rounded-xl bg-gray-200" />
        <div className="mt-4 flex justify-center gap-2">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="h-8 w-12 animate-pulse rounded-lg bg-gray-200"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
