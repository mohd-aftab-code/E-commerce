import { StorefrontNavbar } from "@/components/layout/storefront-navbar";
import { StoreFeatures } from "@/components/layout/store-features";
import { StorefrontFooter } from "@/components/layout/storefront-footer";
import { db } from "@/lib/prisma";
import { getCart } from "@/features/storefront/cart/actions";
import { FloatingLeadWidget } from "@/features/storefront/leads/components/floating-lead-widget";
import { getSession } from "@/lib/session";
import { AuthModal } from "@/features/shared/auth/components/auth-modal";

export default async function StorefrontLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const dbCategories = await db.category.findMany({
    where: { deletedAt: null },
    include: {
      products: {
        where: { isActive: true },
      }
    },
    orderBy: { sortOrder: 'asc' }
  });

  const megaCategories = dbCategories.map(cat => ({
    id: cat.id,
    name: cat.name,
    href: `/categories/${cat.slug}`,
    icon: cat.imageUrl || "",
    hasChildren: cat.products.length > 0,
    subcategories: cat.products.map(prod => ({
      name: prod.name,
      href: `/products/${prod.slug}`
    }))
  }));

  const cart = await getCart();
  const initialCartCount = cart ? cart.items.reduce((total, item) => total + item.quantity, 0) : 0;
  
  const session = await getSession();

  return (
    <div className="flex min-h-screen flex-col relative">
      <StorefrontNavbar 
        initialCategories={megaCategories} 
        initialCartCount={initialCartCount} 
        isLoggedIn={!!session}
        userFirstName={session?.firstName}
      />
      <main className="flex-1">
        {children}
      </main>
      <StoreFeatures />
      <StorefrontFooter />
      <FloatingLeadWidget />
      <AuthModal />
    </div>
  );
}
