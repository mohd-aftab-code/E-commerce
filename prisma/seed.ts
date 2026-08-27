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

// Helper functions for dummy data generation
const getProductDetails = (catId: string, productName: string) => {
  let shortDesc = `Premium quality ${productName.toLowerCase()} for your business.`;
  let description = `Make a lasting impression with our high-quality ${productName.toLowerCase()}. Crafted with care and precision, these are perfect for marketing, branding, or personal use. Available in multiple finishes and sizes, ensuring you get exactly what you need. Upload your print-ready design or let our experts help you create one.`;

  let basePrice = 1000; // $10.00
  let options = [];
  let tiers = [];

  if (catId === "business-cards") {
    basePrice = 1500; // $15.00 base for 100
    options = [
      {
        name: "Size", type: "SELECT", values: [
          { label: 'Standard (2" x 3.5")', priceModifier: 0, isDefault: true },
          { label: 'Square (2.5" x 2.5")', priceModifier: 500, isDefault: false },
        ]
      },
      {
        name: "Paper Type", type: "SELECT", values: [
          { label: '14pt Matte', priceModifier: 0, isDefault: true },
          { label: '16pt Premium Gloss', priceModifier: 300, isDefault: false },
          { label: '32pt Ultra Thick', priceModifier: 1500, isDefault: false },
        ]
      },
      {
        name: "Corners", type: "RADIO", values: [
          { label: 'Standard', priceModifier: 0, isDefault: true },
          { label: 'Rounded', priceModifier: 300, isDefault: false },
        ]
      }
    ];
    tiers = [
      { quantity: 100, price: 1500 }, // $15
      { quantity: 250, price: 2500 }, // $25
      { quantity: 500, price: 3500 }, // $35
      { quantity: 1000, price: 5000 }, // $50
      { quantity: 2500, price: 9000 }, // $90
    ];
  } else if (catId === "signs-banners") {
    basePrice = 2500; // $25.00 for 1
    options = [
      {
        name: "Size", type: "SELECT", values: [
          { label: "2' x 4'", priceModifier: 0, isDefault: true },
          { label: "3' x 6'", priceModifier: 2000, isDefault: false },
          { label: "4' x 8'", priceModifier: 4000, isDefault: false },
        ]
      },
      {
        name: "Material", type: "SELECT", values: [
          { label: '13oz Vinyl', priceModifier: 0, isDefault: true },
          { label: '15oz Premium Vinyl', priceModifier: 1000, isDefault: false },
          { label: 'Mesh Banner', priceModifier: 1500, isDefault: false },
        ]
      },
      {
        name: "Grommets", type: "RADIO", values: [
          { label: 'None', priceModifier: 0, isDefault: true },
          { label: 'Every 2 Feet', priceModifier: 200, isDefault: false },
        ]
      }
    ];
    tiers = [
      { quantity: 1, price: 2500 }, // $25
      { quantity: 2, price: 4500 }, // $45
      { quantity: 5, price: 10000 }, // $100
      { quantity: 10, price: 18000 }, // $180
    ];
  } else if (catId === "apparel") {
    basePrice = 1200; // $12.00
    options = [
      {
        name: "Size", type: "SELECT", values: [
          { label: 'Small', priceModifier: 0, isDefault: true },
          { label: 'Medium', priceModifier: 0, isDefault: false },
          { label: 'Large', priceModifier: 0, isDefault: false },
          { label: 'XL', priceModifier: 0, isDefault: false },
          { label: 'XXL', priceModifier: 200, isDefault: false },
        ]
      },
      {
        name: "Color", type: "SELECT", values: [
          { label: 'White', priceModifier: 0, isDefault: true },
          { label: 'Black', priceModifier: 0, isDefault: false },
          { label: 'Navy Blue', priceModifier: 0, isDefault: false },
        ]
      }
    ];
    tiers = [
      { quantity: 1, price: 1200 },
      { quantity: 10, price: 10000 },
      { quantity: 50, price: 40000 },
      { quantity: 100, price: 70000 },
    ];
  } else {
    // Generic options for other products
    basePrice = 1000;
    options = [
      {
        name: "Options", type: "SELECT", values: [
          { label: 'Standard Option', priceModifier: 0, isDefault: true },
          { label: 'Premium Option', priceModifier: 500, isDefault: false },
        ]
      }
    ];
    tiers = [
      { quantity: 50, price: 1000 },
      { quantity: 100, price: 1800 },
      { quantity: 250, price: 4000 },
      { quantity: 500, price: 7000 },
    ];
  }

  return { shortDesc, description, basePrice, options, tiers };
};

async function main() {
  console.log("Starting database seeding for Print Studio 24...");

  // 1. Clean up existing data (optional, but good for reset)
  console.log("Cleaning up existing data...");
  await prisma.artwork.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.cart.deleteMany();
  await prisma.pricingTier.deleteMany();
  await prisma.optionValue.deleteMany();
  await prisma.productOption.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  // 2. Create Categories & Products
  console.log("Creating Categories and Products with rich dummy data...");
  
  let sortOrder = 1;
  for (const cat of megaCategories) {
    const createdCategory = await prisma.category.create({
      data: {
        name: cat.name,
        slug: cat.id,
        imageUrl: cat.icon,
        isFeatured: true,
        sortOrder: sortOrder++,
        description: `Explore our premium selection of ${cat.name}. Perfect for your next marketing campaign or personal project.`,
      }
    });

    if (cat.hasChildren && cat.subcategories) {
      for (const sub of cat.subcategories) {
        // extract slug from href, e.g. "/products/standard-business-cards" -> "standard-business-cards"
        const slug = sub.href.replace("/products/", "");
        
        const details = getProductDetails(cat.id, sub.name);

        const createdProduct = await prisma.product.create({
          data: {
            name: sub.name,
            slug: slug,
            categoryId: createdCategory.id,
            basePrice: details.basePrice,
            shortDesc: details.shortDesc,
            description: details.description,
            isActive: true,
            isPopular: Math.random() > 0.7, // Randomly mark 30% as popular
            imageUrl: cat.icon, // Using the category image as a placeholder for the product
          }
        });

        // Add Product Options & Values
        let optSortOrder = 1;
        for (const opt of details.options) {
          const createdOption = await prisma.productOption.create({
            data: {
              productId: createdProduct.id,
              name: opt.name,
              type: opt.type,
              isRequired: true,
              sortOrder: optSortOrder++
            }
          });

          let valSortOrder = 1;
          for (const val of opt.values) {
            await prisma.optionValue.create({
              data: {
                optionId: createdOption.id,
                label: val.label,
                priceModifier: val.priceModifier,
                isDefault: val.isDefault,
                sortOrder: valSortOrder++
              }
            });
          }
        }

        // Add Pricing Tiers
        for (const tier of details.tiers) {
          await prisma.pricingTier.create({
            data: {
              productId: createdProduct.id,
              quantity: tier.quantity,
              price: tier.price
            }
          });
        }
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
