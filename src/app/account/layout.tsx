import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import Link from "next/link";
import { User, LayoutDashboard, ShoppingBag, Settings, LogOut } from "lucide-react";
import { logoutUser } from "@/features/auth/actions";

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
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row md:space-x-8">
        
        {/* Sidebar */}
        <aside className="mb-8 w-full md:w-64 md:flex-shrink-0">
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center space-x-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                <User size={24} />
              </div>
              <div>
                <p className="font-semibold text-gray-900">{session.firstName}</p>
                <p className="text-sm text-gray-500 truncate w-32" title={session.email}>{session.email}</p>
              </div>
            </div>

            <nav className="space-y-1">
              <Link
                href="/account"
                className="flex items-center space-x-3 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors"
              >
                <LayoutDashboard size={18} />
                <span>Dashboard</span>
              </Link>
              <Link
                href="/account/orders"
                className="flex items-center space-x-3 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors"
              >
                <ShoppingBag size={18} />
                <span>Orders</span>
              </Link>
              <Link
                href="/account/settings"
                className="flex items-center space-x-3 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors"
              >
                <Settings size={18} />
                <span>Settings</span>
              </Link>
              
              <form action={logoutUser} className="pt-4 mt-4 border-t border-gray-100">
                <button
                  type="submit"
                  className="flex w-full items-center space-x-3 rounded-md px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
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
