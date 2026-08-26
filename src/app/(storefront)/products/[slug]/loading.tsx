export default function ProductDetailsLoading() {
  return (
    <div className="bg-[#f7f9fb] min-h-screen py-10">
      <div className="mx-auto max-w-[1536px] px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Skeleton */}
        <div className="h-4 bg-gray-200 rounded w-48 mb-8 animate-pulse"></div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-12">
          {/* LEFT: Image + Tabs Skeleton */}
          <div className="lg:col-span-7 space-y-6">
            <div className="relative aspect-[4/3] w-full rounded-2xl bg-gray-200 animate-pulse"></div>
            
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm space-y-4 animate-pulse">
              <div className="flex gap-4 border-b border-gray-100 pb-2">
                <div className="h-6 w-24 bg-gray-200 rounded"></div>
                <div className="h-6 w-24 bg-gray-100 rounded"></div>
                <div className="h-6 w-24 bg-gray-100 rounded"></div>
              </div>
              <div className="space-y-3">
                <div className="h-4 bg-gray-100 rounded w-full"></div>
                <div className="h-4 bg-gray-100 rounded w-5/6"></div>
                <div className="h-4 bg-gray-100 rounded w-4/6"></div>
              </div>
            </div>
          </div>

          {/* RIGHT: Order Panel Skeleton */}
          <div className="lg:col-span-5 space-y-4">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm animate-pulse">
              <div className="h-4 bg-gray-100 rounded w-24 mb-2"></div>
              <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-10 bg-gray-200 rounded w-1/3 mb-6"></div>
              
              <div className="space-y-4 mt-8">
                <div className="h-12 bg-gray-100 rounded-xl w-full"></div>
                <div className="h-12 bg-gray-100 rounded-xl w-full"></div>
                <div className="h-12 bg-gray-100 rounded-xl w-full"></div>
              </div>

              <div className="mt-8 space-y-4">
                <div className="h-32 border-2 border-dashed border-gray-200 rounded-xl w-full"></div>
                <div className="h-14 bg-brand-primary-800/50 rounded-xl w-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
