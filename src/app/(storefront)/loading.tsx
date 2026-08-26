import { Loader2 } from "lucide-react";

export default function StorefrontLoading() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center space-y-4">
      <div className="flex items-center space-x-3 text-brand-primary-800">
        <Loader2 className="h-8 w-8 animate-spin" />
        <h2 className="text-xl font-bold">Loading...</h2>
      </div>
      <p className="text-gray-500 text-sm animate-pulse">Preparing your print experience</p>
      
      {/* Generic layout skeleton */}
      <div className="w-full max-w-[1536px] mx-auto px-4 mt-12 space-y-8 opacity-50">
        <div className="h-64 w-full bg-gray-100 rounded-2xl animate-pulse"></div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-40 bg-gray-100 rounded-xl animate-pulse"></div>
          ))}
        </div>
      </div>
    </div>
  );
}
