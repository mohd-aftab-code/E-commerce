import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  ShoppingBag,
  MapPin,
  Settings,
  LogOut,
  RotateCcw,
  User,
} from "lucide-react";
import { logoutUser } from "@/features/shared/auth/actions";

export default async function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="mx-auto max-w-[1536px] px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col lg:flex-row lg:space-x-10">
        
        {/* Sidebar */}
        <aside className="mb-8 w-full lg:w-72 lg:flex-shrink-0">
          <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-6 shadow-sm sticky top-8">
            
            {/* User Info - Hidden on very small screens, visible on sm and up */}
            <div className="mb-6 flex flex-col items-center text-center space-y-3 hidden sm:flex">
              <div className="flex h-16 w-16 overflow-hidden items-center justify-center rounded-full bg-brand-primary-50 text-brand-primary-800 ring-4 ring-white shadow-sm">
                {session.avatarUrl ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img src={session.avatarUrl} alt={session.firstName} className="h-full w-full object-cover" />
                ) : (
                  <User size={32} />
                )}
              </div>
              <div>
                <p className="font-bold text-lg text-gray-900">{session.firstName}</p>
                <p className="text-sm text-gray-500 truncate w-48" title={session.email}>{session.email}</p>
              </div>
            </div>

            {/* Navigation - Horizontal on mobile, vertical on large screens */}
            <nav className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 hide-scrollbar">
              <Link
                href="/account"
                className="flex items-center space-x-2 sm:space-x-3 rounded-xl px-4 py-2 sm:py-3 text-sm font-medium text-gray-700 hover:bg-brand-primary-50 hover:text-brand-primary-800 transition-all duration-200 whitespace-nowrap"
              >
                <LayoutDashboard size={18} className="shrink-0" />
                <span>Dashboard</span>
              </Link>
              <Link
                href="/account/orders"
                className="flex items-center space-x-2 sm:space-x-3 rounded-xl px-4 py-2 sm:py-3 text-sm font-medium text-gray-700 hover:bg-brand-primary-50 hover:text-brand-primary-800 transition-all duration-200 whitespace-nowrap"
              >
                <ShoppingBag size={18} className="shrink-0" />
                <span>Orders</span>
              </Link>
              <Link
                href="/account/reorder"
                className="flex items-center space-x-2 sm:space-x-3 rounded-xl px-4 py-2 sm:py-3 text-sm font-medium text-gray-700 hover:bg-brand-primary-50 hover:text-brand-primary-800 transition-all duration-200 whitespace-nowrap"
              >
                <RotateCcw size={18} className="shrink-0" />
                <span>Quick Reorder</span>
              </Link>
              <Link
                href="/account/addresses"
                className="flex items-center space-x-2 sm:space-x-3 rounded-xl px-4 py-2 sm:py-3 text-sm font-medium text-gray-700 hover:bg-brand-primary-50 hover:text-brand-primary-800 transition-all duration-200 whitespace-nowrap"
              >
                <MapPin size={18} className="shrink-0" />
                <span>Addresses</span>
              </Link>
              <Link
                href="/account/settings"
                className="flex items-center space-x-2 sm:space-x-3 rounded-xl px-4 py-2 sm:py-3 text-sm font-medium text-gray-700 hover:bg-brand-primary-50 hover:text-brand-primary-800 transition-all duration-200 whitespace-nowrap"
              >
                <Settings size={18} className="shrink-0" />
                <span>Settings</span>
              </Link>
              
              <div className="lg:pt-4 lg:mt-4 lg:border-t border-gray-100 flex items-center shrink-0">
                <form action={logoutUser} className="w-full">
                  <button
                    type="submit"
                    className="flex w-full cursor-pointer items-center space-x-2 sm:space-x-3 rounded-xl px-4 py-2 sm:py-3 text-sm font-medium text-red-600 hover:bg-red-50 transition-all duration-200 whitespace-nowrap"
                  >
                    <LogOut size={18} className="shrink-0" />
                    <span>Log out</span>
                  </button>
                </form>
              </div>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0">
          {children}
        </main>
        
      </div>
    </div>
  );
}
