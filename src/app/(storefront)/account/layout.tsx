import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import Link from "next/link";
import { User, LayoutDashboard, ShoppingBag, Settings, LogOut } from "lucide-react";
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
      <div className="flex flex-col md:flex-row md:space-x-10">
        
        {/* Sidebar */}
        <aside className="mb-8 w-full md:w-72 md:flex-shrink-0">
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sticky top-8">
            <div className="mb-8 flex flex-col items-center text-center space-y-3">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-primary-50 text-brand-primary-800 ring-4 ring-white shadow-sm">
                <User size={32} />
              </div>
              <div>
                <p className="font-bold text-lg text-gray-900">{session.firstName}</p>
                <p className="text-sm text-gray-500 truncate w-48" title={session.email}>{session.email}</p>
              </div>
            </div>

            <nav className="space-y-1.5">
              <Link
                href="/account"
                className="flex items-center space-x-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-700 hover:bg-brand-primary-50 hover:text-brand-primary-800 transition-all duration-200"
              >
                <LayoutDashboard size={18} />
                <span>Dashboard</span>
              </Link>
              <Link
                href="/account/orders"
                className="flex items-center space-x-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-700 hover:bg-brand-primary-50 hover:text-brand-primary-800 transition-all duration-200"
              >
                <ShoppingBag size={18} />
                <span>Orders</span>
              </Link>
              <Link
                href="/account/settings"
                className="flex items-center space-x-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-700 hover:bg-brand-primary-50 hover:text-brand-primary-800 transition-all duration-200"
              >
                <Settings size={18} />
                <span>Settings</span>
              </Link>
              
              <form action={logoutUser} className="pt-4 mt-4 border-t border-gray-100">
                <button
                  type="submit"
                  className="flex w-full items-center space-x-3 rounded-xl px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 transition-all duration-200"
                >
                  <LogOut size={18} />
                  <span>Log out</span>
                </button>
              </form>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          {children}
        </main>
        
      </div>
    </div>
  );
}
