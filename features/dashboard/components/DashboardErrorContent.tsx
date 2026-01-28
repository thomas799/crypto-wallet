export interface DashboardErrorContentProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export function DashboardErrorContent({
  error,
  reset
}: DashboardErrorContentProps) {
  return (
    <div className="flex w-full max-w-6xl flex-col items-center justify-center gap-6 rounded-3xl bg-white p-12 shadow-lg">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
        <svg
          className="h-8 w-8 text-red-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
          />
        </svg>
      </div>
      <div className="text-center">
        <h2 className="text-xl font-semibold text-gray-900">
          Something went wrong
        </h2>
        <p className="mt-2 text-sm text-gray-500">
          {error.message || 'Failed to load dashboard data'}
        </p>
        {error.digest && (
          <p className="mt-1 text-xs text-gray-400">Error ID: {error.digest}</p>
        )}
      </div>
      <button
        className="rounded-xl bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-orange-600"
        onClick={reset}
      >
        Try again
      </button>
    </div>
  );
}
