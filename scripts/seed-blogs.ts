import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding blogs...')

  const blogs = [
    {
      title: 'The Ultimate Guide to Business Card Printing in Tampa, FL',
      slug: 'ultimate-guide-business-card-printing-tampa',
      excerpt: 'Learn why high-quality business cards are still the ultimate networking tool in Tampa, and how to design ones that stand out.',
      content: '<h2>Why Business Cards Still Matter</h2><p>In the digital age, a physical business card remains one of the most powerful tools in your networking arsenal. When meeting a potential client, handing over a premium, well-designed business card leaves a lasting impression.</p><h2>Key Elements of a Perfect Business Card</h2><ul><li><strong>Paper Quality:</strong> Always opt for heavier stocks like 16pt or 32pt. A flimsy card feels cheap, while a thick card exudes professionalism.</li><li><strong>Premium Finishes:</strong> Use finishes like Matte, Gloss, or Soft-Touch to give your card a tactile experience that people remember.</li><li><strong>Minimalist Design:</strong> Don\'t clutter your card. Include only essential information: Name, Title, Phone, Email, and Website.</li><li><strong>Brand Colors:</strong> Ensure your card accurately reflects your brand\'s core identity and color palette.</li></ul><h2>How We Can Help</h2><p>Let <strong>Print Studio 24</strong> help you create the perfect cards for your next networking event. Our Tampa-based team ensures every batch is printed with pixel-perfect precision.</p>',
      imageUrl: '/images/blogs/blog_business_cards.jpg',
      seoTitle: 'Business Card Printing Guide Tampa FL | Print Studio 24',
      seoDescription: 'Discover the ultimate guide to printing premium business cards in Tampa, Florida. Make a lasting impression with custom finishes and stocks.',
      isPublished: true,
    },
    {
      title: 'Why Custom Banners Are Essential for Local Businesses',
      slug: 'why-custom-banners-essential-local-businesses',
      excerpt: 'Attract foot traffic and highlight promotions with vibrant, durable custom banners designed for your storefront.',
      content: '<h2>The Power of Physical Advertising</h2><p>For local brick-and-mortar stores, visibility is everything. A large, vibrant banner hanging outside your storefront acts as a 24/7 salesperson.</p><h2>Benefits of Custom Banners</h2><ul><li><strong>Cost-Effective:</strong> Compared to digital ads that expire, a banner is a one-time investment that generates impressions for months or years.</li><li><strong>High Visibility:</strong> Bright colors and large text capture the attention of both pedestrians and drivers passing by your location.</li><li><strong>Weather Resistant:</strong> Our premium vinyl banners are built to withstand rain, wind, and harsh sunlight without fading.</li><li><strong>Versatile Usage:</strong> Perfect for grand openings, seasonal sales, trade shows, or simply reinforcing your brand identity.</li></ul><h2>Design Tips for Banners</h2><p>When designing your banner, keep the message concise. Use high-contrast colors and always include a clear call-to-action (like "Visit Us Today!").</p>',
      imageUrl: '/images/blogs/blog_custom_banners.jpg',
      seoTitle: 'Custom Promotional Banners for Local Businesses | Print Studio 24',
      seoDescription: 'Learn why custom banners are a must-have for local businesses looking to increase foot traffic and visibility in their community.',
      isPublished: true,
    },
    {
      title: 'How to Choose the Right Paper Type for Your Custom Flyers',
      slug: 'how-to-choose-right-paper-type-custom-flyers',
      excerpt: 'Not all flyers are created equal. Understand the differences between paper stocks and finishes to maximize your marketing impact.',
      content: '<h2>First Impressions Matter</h2><p>Flyers are a staple of local marketing, but the paper type you choose can drastically affect how your message is received. A flimsy flyer might get tossed, while a sturdy flyer feels valuable.</p><h2>Popular Paper Types Explained</h2><ul><li><strong>100lb Gloss Text:</strong> The industry standard for vibrant, high-quality flyers. It has a magazine-like feel, perfect for mass distribution.</li><li><strong>14pt Uncoated Cover:</strong> A thicker cardstock that is easy to write on. Great for forms, mailers, or premium handouts.</li><li><strong>16pt Matte Finish:</strong> Offers a highly sophisticated, glare-free look. It feels extremely premium and is easy to read under any lighting.</li><li><strong>Recycled Kraft:</strong> An eco-friendly option that gives an organic, rustic look—perfect for artisan brands or cafes.</li></ul><h2>Making the Final Decision</h2><p>Think about your target audience. If you are promoting a luxury service, invest in thicker cover stocks. Need help deciding? Our experts at <strong>Print Studio 24</strong> are here to guide you.</p>',
      imageUrl: '/images/blogs/blog_flyer_paper.jpg',
      seoTitle: 'Choosing Paper for Custom Flyers | Print Studio 24',
      seoDescription: 'A comprehensive guide to selecting the best paper stock and finish for your custom promotional flyers to maximize marketing impact.',
      isPublished: true,
    }
  ];

  for (const blog of blogs) {
    const created = await prisma.blogPost.upsert({
      where: { slug: blog.slug },
      update: blog,
      create: blog,
    })
    console.log(`Upserted blog: ${created.title}`)
  }

  console.log('Seeding completed successfully.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
