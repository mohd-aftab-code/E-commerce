import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Package, 
  Users, 
  LogOut,
  ExternalLink,
  MessageSquare,
  Tags,
  FileText,
  Ticket
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
    <div className="flex h-screen bg-[#f8fafc] overflow-hidden font-sans">
      
      {/* Admin Sidebar - White SaaS Theme */}
      <aside className="w-72 flex-shrink-0 bg-white border-r border-gray-200 flex flex-col relative z-20">
        
        {/* Brand Logo Header */}
        <div className="flex h-20 items-center px-8 border-b border-gray-100 bg-white">
          <Link href="/admin" className="flex items-center">
            <Image 
              src="/logo/brand-logo.png" 
              alt="Print Studio 24" 
              width={160} 
              height={45} 
              className="object-contain"
              priority
            />
          </Link>
        </div>
        
        <div className="px-4 py-6 flex-1 overflow-y-auto">

          <div className="px-4 mb-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Menu
          </div>
          <nav className="space-y-1 px-2">
            {[
              { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
              { name: "Orders", href: "/admin/orders", icon: ShoppingBag },
              { name: "Categories", href: "/admin/categories", icon: Tags },
              { name: "Products", href: "/admin/products", icon: Package },
              { name: "Customers", href: "/admin/customers", icon: Users },
              { name: "Leads", href: "/admin/leads", icon: MessageSquare },
              { name: "Coupons", href: "/admin/coupons", icon: Ticket },
              { name: "Blog", href: "/admin/blog", icon: FileText },
            ].map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center px-4 py-2.5 text-sm font-medium rounded-lg text-gray-600 hover:bg-gray-50 hover:text-brand-primary-900 transition-colors cursor-pointer"
              >
                <item.icon className="mr-3 h-5 w-5 text-gray-400" />
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="p-4 border-t border-gray-100 bg-gray-50/50 flex flex-col gap-4">
          <div className="flex items-center gap-3 px-2">
            <div className="w-10 h-10 rounded-full bg-brand-primary-50 flex items-center justify-center font-bold text-brand-primary-800 border border-brand-primary-100">
              {session.firstName?.charAt(0) || 'A'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                Administrator
              </p>
              <p className="text-sm font-semibold text-gray-900 truncate">
                {session.firstName}
              </p>
            </div>
          </div>

          <form action={logoutUser}>
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg bg-white border border-gray-200 text-gray-700 hover:bg-red-50 hover:text-red-600 hover:border-red-100 transition-colors shadow-sm cursor-pointer"
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        <header className="bg-white/80 backdrop-blur-md shadow-sm h-20 flex items-center justify-between px-8 border-b border-gray-200 z-10 sticky top-0">
          <div className="flex items-center gap-3">
             <h1 className="text-lg font-bold text-gray-900">Admin Control Panel</h1>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/" target="_blank" className="text-sm font-medium text-gray-500 hover:text-brand-primary-800 transition-colors flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-md border border-gray-200 shadow-sm hover:shadow cursor-pointer">
              View Store <ExternalLink className="h-3.5 w-3.5" />
            </Link>
          </div>
        </header>
        
        <div className="p-8 overflow-y-auto flex-1">
          <div className="w-full">
            {children}
          </div>
        </div>
      </main>

    </div>
  );
}
