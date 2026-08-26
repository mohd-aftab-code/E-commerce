import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
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
    <div className="flex h-screen bg-gray-50/50 overflow-hidden">
      
      {/* Admin Sidebar */}
      <aside className="w-72 flex-shrink-0 bg-brand-primary-900 text-white flex flex-col relative shadow-xl z-20 transition-all">
        
        {/* Brand Logo Header */}
        <div className="flex h-20 items-center px-6 border-b border-white/10 bg-[#0A1445]">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="bg-white p-1.5 rounded-lg shadow-sm group-hover:scale-105 transition-transform">
              <Image 
                src="/logo/fevicon_brand_colors.png" 
                alt="PS24 Logo" 
                width={28} 
                height={28} 
                className="object-contain"
              />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">
              PS24 <span className="text-[#F3552F]">Admin</span>
            </span>
          </Link>
        </div>
        
        <div className="px-5 py-8 flex-1 overflow-y-auto">
          <div className="mb-8 flex items-center gap-3 px-2">
            <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-[#F3552F] to-orange-400 flex items-center justify-center font-bold text-white shadow-md border-2 border-white/10">
              {session.firstName?.charAt(0) || 'A'}
            </div>
            <div>
              <p className="text-[11px] font-semibold text-brand-cyan-400 uppercase tracking-widest">
                Welcome back
              </p>
              <p className="mt-0.5 text-sm font-bold text-white">
                {session.firstName}
              </p>
            </div>
          </div>

          <nav className="space-y-2">
            <Link
              href="/admin"
              className="flex items-center px-4 py-3.5 text-sm font-medium rounded-xl text-white/80 hover:bg-white/10 hover:text-white group transition-all"
            >
              <LayoutDashboard className="mr-3 h-5 w-5 text-white/50 group-hover:text-white transition-colors" />
              Dashboard
            </Link>
            
            <Link
              href="/admin/orders"
              className="flex items-center px-4 py-3.5 text-sm font-medium rounded-xl text-white/80 hover:bg-white/10 hover:text-white group transition-all"
            >
              <ShoppingBag className="mr-3 h-5 w-5 text-white/50 group-hover:text-white transition-colors" />
              Orders
            </Link>
            
            <Link
              href="/admin/products"
              className="flex items-center px-4 py-3.5 text-sm font-medium rounded-xl text-white/80 hover:bg-white/10 hover:text-white group transition-all"
            >
              <Package className="mr-3 h-5 w-5 text-white/50 group-hover:text-white transition-colors" />
              Products
            </Link>

            <Link
              href="/admin/customers"
              className="flex items-center px-4 py-3.5 text-sm font-medium rounded-xl text-white/80 hover:bg-white/10 hover:text-white group transition-all"
            >
              <Users className="mr-3 h-5 w-5 text-white/50 group-hover:text-white transition-colors" />
              Customers
            </Link>
          </nav>
        </div>

        <div className="p-5 border-t border-white/10 bg-[#0A1445]">
          <form action={logoutUser}>
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 px-4 py-3 text-sm font-bold rounded-xl bg-white/10 text-white hover:bg-[#F3552F] hover:shadow-lg hover:-translate-y-0.5 transition-all"
            >
              <LogOut className="h-4 w-4" />
              Logout Securely
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="bg-white/80 backdrop-blur-md shadow-sm h-20 flex items-center justify-between px-8 border-b border-gray-200 sticky top-0 z-10">
          <h1 className="text-xl font-extrabold text-brand-primary-900 tracking-tight">Admin Control Panel</h1>
          <div className="flex items-center gap-6">
            <Link href="/" className="text-sm font-bold text-gray-500 hover:text-[#F3552F] transition-colors flex items-center gap-1">
              View Storefront <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </header>
        
        <div className="p-8 overflow-y-auto flex-1">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </div>
      </main>

    </div>
  );
}
