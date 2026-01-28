import Link from 'next/link';

export function NotFoundContent() {
  return (
    <div className="flex w-full max-w-md flex-col items-center justify-center gap-6 rounded-3xl bg-white p-12 shadow-lg">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
        <span className="text-4xl">404</span>
      </div>
      <div className="text-center">
        <h2 className="text-xl font-semibold text-gray-900">Page not found</h2>
        <p className="mt-2 text-sm text-gray-500">
          The page you&apos;re looking for doesn&apos;t exist.
        </p>
      </div>
      <Link
        className="rounded-xl bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-orange-600"
        href="/"
      >
        Go to Dashboard
      </Link>
    </div>
  );
}
