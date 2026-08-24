import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import Link from "next/link";
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Package, 
  Users, 
  LogOut
} from "lucide-react";
import { logoutUser } from "@/features/shared/auth/actions";

export const metadata = {
  title: "Admin Panel | Print Studio 24",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  if (session.role !== "ADMIN" && session.role !== "STAFF") {
    redirect("/");
  }

  return (
    <div className="flex h-screen bg-gray-100">
      
      {/* Admin Sidebar */}
      <aside className="w-64 flex-shrink-0 bg-gray-900 text-white overflow-y-auto">
        <div className="flex h-16 items-center px-6 border-b border-gray-800">
          <span className="text-xl font-bold tracking-tight">PS24 <span className="text-brand-cyan-500">Admin</span></span>
        </div>
        
        <div className="px-4 py-6">
          <div className="mb-6 px-2">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Signed in as
            </p>
            <p className="mt-1 text-sm font-medium text-white">
              {session.firstName} ({session.role})
            </p>
          </div>

          <nav className="space-y-1">
            <Link
              href="/admin"
              className="flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-300 hover:bg-gray-800 hover:text-white group"
            >
              <LayoutDashboard className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-300" />
              Dashboard
            </Link>
            
            <Link
              href="/admin/orders"
              className="flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-300 hover:bg-gray-800 hover:text-white group"
            >
              <ShoppingBag className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-300" />
              Orders
            </Link>
            
            <Link
              href="/admin/products"
              className="flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-300 hover:bg-gray-800 hover:text-white group"
            >
              <Package className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-300" />
              Products
            </Link>

            <Link
              href="/admin/customers"
              className="flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-300 hover:bg-gray-800 hover:text-white group"
            >
              <Users className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-300" />
              Customers
            </Link>
          </nav>
        </div>

        <div className="absolute bottom-0 w-64 p-4 border-t border-gray-800">
          <form action={logoutUser}>
            <button
              type="submit"
              className="flex w-full items-center px-2 py-2 text-sm font-medium rounded-md text-gray-300 hover:bg-gray-800 hover:text-white group"
            >
              <LogOut className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-300" />
              Logout
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white shadow-sm h-16 flex items-center px-8 border-b border-gray-200">
          <h1 className="text-lg font-semibold text-gray-900">Admin Control Panel</h1>
        </header>
        <div className="p-8">
          {children}
        </div>
      </main>

    </div>
  );
}
