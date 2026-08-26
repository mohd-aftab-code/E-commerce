/**
 * Navigation structure for storefront and account menus.
 *
 * Populated with semantic URL slugs that match the SEO URL plan.
 * No IDs — only human-readable slugs.
 */

export interface NavItem {
  label: string;
  href: string;
  description?: string;
  children?: NavItem[];
}

/** Primary storefront navigation */
export const mainNav: NavItem[] = [
  {
    label: "Products",
    href: "/products",
    children: [
      {
        label: "Business Cards",
        href: "/business-card-printing-tampa",
        description: "Premium business cards with fast turnaround",
      },
      {
        label: "Flyers",
        href: "/flyer-printing-tampa",
        description: "Full-color flyers for events, promotions and more",
      },
      {
        label: "Banners",
        href: "/banner-printing-tampa",
        description: "Indoor and outdoor banners in any size",
      },
      {
        label: "Signs",
        href: "/sign-printing-tampa",
        description: "Custom signs for business and events",
      },
      {
        label: "Stickers & Labels",
        href: "/sticker-printing-tampa",
        description: "Die-cut stickers, labels, and decals",
      },
      {
        label: "Brochures",
        href: "/brochure-printing-tampa",
        description: "Bi-fold and tri-fold brochures",
      },
    ],
  },
  {
    label: "Printing Services",
    href: "/printing-services-tampa-fl",
  },
  {
    label: "Get a Quote",
    href: "/quote",
  },
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];

/** Account / dashboard navigation (authenticated users) */
export const accountNav: NavItem[] = [
  { label: "My Orders", href: "/account/orders" },
  { label: "Quick Reorder", href: "/account/reorder" },
  { label: "Saved Designs", href: "/account/designs" },
  { label: "Artwork", href: "/account/artwork" },
  { label: "Quotes", href: "/account/quotes" },
  { label: "Addresses", href: "/account/addresses" },
  { label: "Profile", href: "/account/profile" },
];

/** Footer navigation columns */
export const footerNav = {
  services: [
    { label: "Business Cards", href: "/business-card-printing-tampa" },
    { label: "Flyers", href: "/flyer-printing-tampa" },
    { label: "Banners", href: "/banner-printing-tampa" },
    { label: "Signs", href: "/sign-printing-tampa" },
    { label: "Stickers", href: "/sticker-printing-tampa" },
    { label: "Brochures", href: "/brochure-printing-tampa" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "FAQ", href: "/faq" },
    { label: "Blog", href: "/blog" },
  ],
  support: [
    { label: "File Requirements", href: "/file-requirements" },
    { label: "Turnaround Times", href: "/turnaround-times" },
    { label: "Shipping & Pickup", href: "/shipping" },
    { label: "Returns & Refunds", href: "/returns" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
} as const;
