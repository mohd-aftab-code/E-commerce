import { StorefrontNavbar } from "@/components/layout/storefront-navbar";
import { StoreFeatures } from "@/components/layout/store-features";
import { StorefrontFooter } from "@/components/layout/storefront-footer";
import { db } from "@/lib/prisma";
import { getCart } from "@/features/storefront/cart/actions";
import { FloatingLeadWidget } from "@/features/storefront/leads/components/floating-lead-widget";
import { getSession } from "@/lib/session";
import { AuthModal } from "@/features/shared/auth/components/auth-modal";
import { Sparkles } from "lucide-react";

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

  const megaCategories = dbCategories.map(cat => {
    // Override link for Design Services to point to our custom static page
    const isDesignServices = cat.slug === 'design-services' || cat.name.toLowerCase() === 'design services';
    
    return {
      id: cat.id,
      name: cat.name,
      href: isDesignServices ? '/services/design' : `/categories/${cat.slug}`,
      icon: cat.imageUrl || "",
      hasChildren: isDesignServices ? false : cat.products.length > 0,
      subcategories: isDesignServices ? [] : cat.products.map(prod => ({
        name: prod.name,
        href: `/products/${prod.slug}`
      }))
    };
  });

  const cart = await getCart();
  const initialCartCount = cart ? cart.items.length : 0;
  
  const session = await getSession();

  // Fetch the latest active coupon
  const activeCoupon = await db.coupon.findFirst({
    where: { 
      isActive: true,
      OR: [
        { expiresAt: null },
        { expiresAt: { gt: new Date() } }
      ]
    },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="flex min-h-screen flex-col relative">
      {activeCoupon && (
        <div className="bg-brand-primary-900 text-white text-xs sm:text-sm font-medium text-center p-3 sm:py-2.5 px-4 shadow-sm relative z-[60] flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2">
          <div className="flex items-center gap-2">
            <Sparkles className="inline-block animate-pulse w-4 h-4 hidden sm:block" />
            <span>
              Special Offer: Get <strong>{activeCoupon.discountType === 'PERCENTAGE' ? `${activeCoupon.discountValue}%` : `$${(activeCoupon.discountValue / 100).toFixed(2)}`}</strong> off! 
            </span>
          </div>
          <div className="flex items-center gap-2 mt-1 sm:mt-0">
            <span>
              Use code <span className="font-bold bg-white/20 px-2 py-0.5 rounded mx-1 tracking-wider border border-white/30">{activeCoupon.code}</span> at checkout.
            </span>
            <Sparkles className="inline-block animate-pulse w-4 h-4" />
          </div>
        </div>
      )}
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
