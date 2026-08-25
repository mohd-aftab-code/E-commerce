import { ArrowLeft } from "lucide-react";

export default function OrderDetailsLoading() {
  return (
    <div className="space-y-8 max-w-5xl mx-auto animate-pulse">
      <div>
        <div className="inline-flex items-center text-sm font-medium text-gray-400 mb-4">
          <ArrowLeft className="mr-1 h-4 w-4" /> Back to Orders
        </div>
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="h-8 w-48 bg-gray-200 rounded"></div>
          <div className="mt-4 sm:mt-0 sm:ml-4">
            <div className="h-6 w-24 bg-gray-200 rounded-full"></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Main Left Column Skeleton */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white shadow sm:rounded-lg border border-gray-200">
            <div className="px-4 py-5 sm:p-6 space-y-4">
              <div className="h-6 w-48 bg-gray-200 rounded"></div>
              <div className="flex gap-4">
                <div className="h-10 w-full bg-gray-200 rounded-md"></div>
                <div className="h-10 w-24 bg-gray-200 rounded-md"></div>
              </div>
            </div>
          </div>

          <div className="bg-white shadow sm:rounded-lg border border-gray-200">
            <div className="px-4 py-5 sm:p-6 space-y-4">
              <div className="h-6 w-32 bg-gray-200 rounded mb-4"></div>
              <div className="space-y-4">
                {[1, 2].map((i) => (
                  <div key={i} className="flex flex-col gap-2 border-t border-gray-100 pt-4">
                    <div className="flex justify-between">
                      <div className="h-5 w-1/3 bg-gray-200 rounded"></div>
                      <div className="h-5 w-16 bg-gray-200 rounded"></div>
                    </div>
                    <div className="h-4 w-24 bg-gray-200 rounded"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar Skeleton */}
        <div className="space-y-6">
          <div className="bg-white shadow sm:rounded-lg border border-gray-200">
            <div className="px-4 py-5 sm:p-6 space-y-4">
              <div className="h-6 w-40 bg-gray-200 rounded"></div>
              <div className="space-y-3">
                <div>
                  <div className="h-4 w-16 bg-gray-200 rounded mb-1"></div>
                  <div className="h-5 w-32 bg-gray-200 rounded"></div>
                </div>
                <div>
                  <div className="h-4 w-24 bg-gray-200 rounded mb-1"></div>
                  <div className="h-5 w-48 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white shadow sm:rounded-lg border border-gray-200">
            <div className="px-4 py-5 sm:p-6 space-y-4">
              <div className="h-6 w-36 bg-gray-200 rounded"></div>
              <div className="space-y-2">
                <div className="h-4 w-48 bg-gray-200 rounded"></div>
                <div className="h-4 w-full bg-gray-200 rounded"></div>
                <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
