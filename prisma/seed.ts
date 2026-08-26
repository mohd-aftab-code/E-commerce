import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const megaCategories = [
  {
    id: "business-cards",
    name: "Business Cards",
    href: "/categories/business-cards",
    icon: "/theme-images/cat-business-cards.jpg",
    hasChildren: true,
    subcategories: [
      { name: "Standard Business Cards", href: "/products/standard-business-cards" },
      { name: "Premium Business Cards", href: "/products/premium-business-cards" },
      { name: "Rounded Corner Cards", href: "/products/rounded-corner-cards" },
      { name: "Folded Business Cards", href: "/products/folded-business-cards" },
      { name: "Spot UV Cards", href: "/products/spot-uv-cards" },
      { name: "Silk Laminated Cards", href: "/products/silk-laminated-cards" },
      { name: "Foil Business Cards", href: "/products/foil-business-cards" },
    ],
  },
  {
    id: "flyers",
    name: "Flyers & Leaflets",
    href: "/categories/marketing",
    icon: "/theme-images/cat-flyers.jpg",
    hasChildren: true,
    subcategories: [
      { name: "Half-Page Flyers", href: "/products/half-page-flyers" },
      { name: "Full-Page Flyers", href: "/products/full-page-flyers" },
      { name: "Tri-Fold Leaflets", href: "/products/tri-fold-leaflets" },
      { name: "Door Hangers", href: "/products/door-hangers" },
      { name: "Rack Cards", href: "/products/rack-cards" },
      { name: "Postcards", href: "/products/postcards" },
    ],
  },
  {
    id: "brochures",
    name: "Brochures",
    href: "/categories/marketing",
    icon: "/theme-images/hero-brochures.jpg",
    hasChildren: true,
    subcategories: [
      { name: "Bi-Fold Brochures", href: "/products/bi-fold-brochures" },
      { name: "Tri-Fold Brochures", href: "/products/tri-fold-brochures" },
      { name: "Z-Fold Brochures", href: "/products/z-fold-brochures" },
      { name: "Booklets", href: "/products/booklets" },
      { name: "Catalogs", href: "/products/catalogs" },
    ],
  },
  {
    id: "signs-banners",
    name: "Signs & Banners",
    href: "/categories/signs-banners",
    icon: "/theme-images/cat-banners.jpg",
    hasChildren: true,
    subcategories: [
      { name: "Vinyl Banners", href: "/products/vinyl-banners" },
      { name: "Retractable Banners", href: "/products/retractable-banners" },
      { name: "Foam Board Signs", href: "/products/foam-board-signs" },
      { name: "Yard Signs", href: "/products/yard-signs" },
      { name: "A-Frame Signs", href: "/products/a-frame-signs" },
      { name: "Pop-Up Displays", href: "/products/pop-up-displays" },
    ],
  },
  {
    id: "stickers",
    name: "Labels & Stickers",
    href: "/categories/labels-stickers",
    icon: "/theme-images/cat-stickers.jpg",
    hasChildren: true,
    subcategories: [
      { name: "Custom Stickers", href: "/products/custom-stickers" },
      { name: "Roll Labels", href: "/products/roll-labels" },
      { name: "Sheet Labels", href: "/products/sheet-labels" },
      { name: "Die-Cut Stickers", href: "/products/die-cut-stickers" },
      { name: "Clear Stickers", href: "/products/clear-stickers" },
    ],
  },
  {
    id: "apparel",
    name: "Clothing & Apparel",
    href: "/categories/apparel",
    icon: "/theme-images/hero-tshirts.jpg",
    hasChildren: true,
    subcategories: [
      { name: "Custom T-Shirts", href: "/products/custom-t-shirts" },
      { name: "Polo Shirts", href: "/products/polo-shirts" },
      { name: "Hoodies", href: "/products/hoodies" },
      { name: "Tank Tops", href: "/products/tank-tops" },
      { name: "Custom Hats", href: "/products/custom-hats" },
      { name: "Aprons", href: "/products/aprons" },
    ],
  },
  {
    id: "packaging",
    name: "Packaging Boxes",
    href: "/categories/labels-stickers",
    icon: "/theme-images/hero-packaging.jpg",
    hasChildren: true,
    subcategories: [
      { name: "Mailer Boxes", href: "/products/mailer-boxes" },
      { name: "Retail Boxes", href: "/products/retail-boxes" },
      { name: "Product Boxes", href: "/products/product-boxes" },
      { name: "Gift Boxes", href: "/products/gift-boxes" },
      { name: "Shipping Boxes", href: "/products/shipping-boxes" },
    ],
  },
  {
    id: "drinkware",
    name: "Mugs & Drinkware",
    href: "/categories/drinkware",
    icon: "/theme-images/hero-mugs.jpg",
    hasChildren: true,
    subcategories: [
      { name: "Custom Mugs", href: "/products/custom-mugs" },
      { name: "Travel Tumblers", href: "/products/travel-tumblers" },
      { name: "Water Bottles", href: "/products/water-bottles" },
      { name: "Pint Glasses", href: "/products/pint-glasses" },
    ],
  },
  {
    id: "promotional",
    name: "Promotional Products",
    href: "/categories/promotional",
    icon: "/theme-images/cat-promo.jpg",
    hasChildren: true,
    subcategories: [
      { name: "Pens & Pencils", href: "/products/pens" },
      { name: "Tote Bags", href: "/products/tote-bags" },
      { name: "Keychains", href: "/products/keychains" },
      { name: "Lanyards", href: "/products/lanyards" },
      { name: "USB Drives", href: "/products/usb-drives" },
    ],
  },
  {
    id: "design",
    name: "Design Services",
    href: "/services/design",
    icon: "/theme-images/cat-design.jpg",
    hasChildren: false,
    subcategories: [],
  },
];

async function main() {
  console.log("Starting database seeding for Print Studio 24...");

  // 1. Clean up existing data (optional, but good for reset)
  console.log("Cleaning up existing data...");
  await prisma.cartItem.deleteMany();
  await prisma.cart.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.pricingTier.deleteMany();
  await prisma.optionValue.deleteMany();
  await prisma.productOption.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  // 2. Create Categories & Products
  console.log("Creating Categories and Products...");
  
  let sortOrder = 1;
  for (const cat of megaCategories) {
    const createdCategory = await prisma.category.create({
      data: {
        name: cat.name,
        slug: cat.id,
        imageUrl: cat.icon,
        isFeatured: true,
        sortOrder: sortOrder++,
      }
    });

    if (cat.hasChildren && cat.subcategories) {
      for (const sub of cat.subcategories) {
        // extract slug from href, e.g. "/products/standard-business-cards" -> "standard-business-cards"
        const slug = sub.href.replace("/products/", "");
        await prisma.product.create({
          data: {
            name: sub.name,
            slug: slug,
            categoryId: createdCategory.id,
            basePrice: 1000, // Dummy base price of $10.00
            isActive: true,
            imageUrl: cat.icon, // Using the category image as a placeholder for the product
          }
        });
      }
    }
  }

  console.log("Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
