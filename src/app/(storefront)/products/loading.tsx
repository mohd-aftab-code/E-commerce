export default function ProductsLoading() {
  return (
    <div className="bg-[#f7f9fb] min-h-screen py-10">
      <div className="mx-auto max-w-[1536px] px-4 sm:px-6 lg:px-8">
        {/* Header Skeleton */}
        <div className="mb-10 animate-pulse">
          <div className="h-10 bg-gray-200 rounded-lg w-64 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded-lg w-96 max-w-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Skeleton */}
          <div className="hidden lg:block space-y-6 animate-pulse opacity-50">
            <div className="h-6 bg-gray-200 rounded-md w-32 mb-4"></div>
            <div className="space-y-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-4 bg-gray-100 rounded-md w-full"></div>
              ))}
            </div>
          </div>

          {/* Product Grid Skeleton */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 animate-pulse opacity-60">
                  <div className="aspect-[4/3] w-full bg-gray-100 rounded-xl mb-4"></div>
                  <div className="h-5 bg-gray-200 rounded-md w-3/4 mb-3"></div>
                  <div className="h-4 bg-gray-100 rounded-md w-1/2 mb-4"></div>
                  <div className="flex justify-between items-end">
                    <div className="h-6 bg-gray-200 rounded-md w-24"></div>
                    <div className="h-10 w-10 bg-gray-100 rounded-full"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
