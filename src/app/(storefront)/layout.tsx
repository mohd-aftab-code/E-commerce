import { StorefrontNavbar } from "@/components/layout/storefront-navbar";
import { StorefrontFooter } from "@/components/layout/storefront-footer";

export default function StorefrontLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col relative">
      <StorefrontNavbar />
      <main className="flex-1">
        {children}
      </main>
      <StorefrontFooter />
    </div>
  );
}
