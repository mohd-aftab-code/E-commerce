import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Starting database seeding for Print Studio 24...");

  // 1. Clean up existing data (optional, but good for reset)
  console.log("Cleaning up existing data...");
  await prisma.pricingTier.deleteMany();
  await prisma.optionValue.deleteMany();
  await prisma.productOption.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  // 2. Create Categories
  console.log("Creating Categories...");
  const catBusinessCards = await prisma.category.create({
    data: {
      name: "Business Cards",
      slug: "business-cards",
      description: "Premium business cards to make a lasting impression.",
      isFeatured: true,
      sortOrder: 1,
    }
  });

  const catBanners = await prisma.category.create({
    data: {
      name: "Signs & Banners",
      slug: "signs-banners",
      description: "Large format printing for maximum visibility.",
      isFeatured: true,
      sortOrder: 2,
    }
  });

  const catMarketing = await prisma.category.create({
    data: {
      name: "Marketing Materials",
      slug: "marketing-materials",
      description: "Flyers, brochures, and postcards to promote your brand.",
      isFeatured: true,
      sortOrder: 3,
    }
  });

  // 3. Create Products & Options
  console.log("Creating Products...");

  // --- Product 1: Standard Business Cards ---
  await prisma.product.create({
    data: {
      name: "Standard Business Cards",
      slug: "standard-business-cards",
      categoryId: catBusinessCards.id,
      shortDesc: "High-quality, professional business cards on premium stock.",
      description: "Make a strong first impression with our Standard Business Cards. Printed on premium 14pt or 16pt cardstock with your choice of matte or glossy finish.",
      basePrice: 1500, // $15.00 for the base tier
      isPopular: true,
      
      // Options
      options: {
        create: [
          {
            name: "Size",
            type: "SELECT",
            sortOrder: 1,
            values: {
              create: [
                { label: '2" x 3.5" (Standard US)', isDefault: true, sortOrder: 1 },
                { label: '2" x 2" (Square)', priceModifier: 500, sortOrder: 2 }, // +$5.00
              ]
            }
          },
          {
            name: "Paper Stock",
            type: "SELECT",
            sortOrder: 2,
            values: {
              create: [
                { label: '14pt Cardstock', isDefault: true, sortOrder: 1 },
                { label: '16pt Premium Cardstock', priceModifier: 400, sortOrder: 2 }, // +$4.00
              ]
            }
          },
          {
            name: "Finish",
            type: "RADIO",
            sortOrder: 3,
            values: {
              create: [
                { label: 'Matte (Dull)', isDefault: true, sortOrder: 1 },
                { label: 'UV Gloss (Shiny)', sortOrder: 2 },
              ]
            }
          }
        ]
      },

      // Pricing Tiers (Quantity discounts)
      pricingTiers: {
        create: [
          { quantity: 100, price: 1500 },  // $15
          { quantity: 250, price: 2500 },  // $25
          { quantity: 500, price: 3500 },  // $35
          { quantity: 1000, price: 5000 }, // $50
          { quantity: 2500, price: 9500 }, // $95
        ]
      }
    }
  });

  // --- Product 2: Vinyl Banners ---
  await prisma.product.create({
    data: {
      name: "Vinyl Banners",
      slug: "vinyl-banners",
      categoryId: catBanners.id,
      shortDesc: "Durable, weather-resistant custom banners.",
      description: "Perfect for indoor or outdoor use. Printed on heavy-duty 13oz vinyl with vivid colors. Optional grommets and hems for easy hanging.",
      basePrice: 2500, // $25.00 base
      isPopular: true,

      options: {
        create: [
          {
            name: "Size (W x H)",
            type: "SELECT",
            sortOrder: 1,
            values: {
              create: [
                { label: "2' x 4'", isDefault: true, sortOrder: 1 },
                { label: "3' x 6'", priceModifier: 3000, sortOrder: 2 }, // +$30
                { label: "4' x 8'", priceModifier: 6000, sortOrder: 3 }, // +$60
              ]
            }
          },
          {
            name: "Finishing Options",
            type: "RADIO",
            sortOrder: 2,
            values: {
              create: [
                { label: "Hems & Grommets (Every 2ft)", isDefault: true, sortOrder: 1 },
                { label: "Clean Cut (No Grommets)", sortOrder: 2 },
              ]
            }
          }
        ]
      },

      pricingTiers: {
        create: [
          { quantity: 1, price: 2500 },
          { quantity: 2, price: 4500 },
          { quantity: 5, price: 10000 },
        ]
      }
    }
  });

  // --- Product 3: Marketing Flyers ---
  await prisma.product.create({
    data: {
      name: "Marketing Flyers",
      slug: "marketing-flyers",
      categoryId: catMarketing.id,
      shortDesc: "Full-color printed flyers for promotions.",
      description: "Spread the word with vibrant full-color flyers. Ideal for handouts, mailers, and local advertising.",
      basePrice: 4500, // $45 base for 100
      isPopular: false,

      options: {
        create: [
          {
            name: "Size",
            type: "SELECT",
            sortOrder: 1,
            values: {
              create: [
                { label: '4" x 6"', isDefault: true, sortOrder: 1 },
                { label: '5" x 7"', priceModifier: 1500, sortOrder: 2 }, // +$15
                { label: '8.5" x 11"', priceModifier: 4000, sortOrder: 3 }, // +$40
              ]
            }
          },
          {
            name: "Printed Sides",
            type: "RADIO",
            sortOrder: 2,
            values: {
              create: [
                { label: "Single Sided (Front Only)", isDefault: true, sortOrder: 1 },
                { label: "Double Sided (Front & Back)", priceModifier: 1000, sortOrder: 2 }, // +$10
              ]
            }
          }
        ]
      },

      pricingTiers: {
        create: [
          { quantity: 100, price: 4500 },
          { quantity: 250, price: 6500 },
          { quantity: 500, price: 8500 },
          { quantity: 1000, price: 12000 },
        ]
      }
    }
  });

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
