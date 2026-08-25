"use server";

import { searchProducts } from "./queries";

export async function getSearchSuggestions(query: string) {
  try {
    const products = await searchProducts(query);
    // Return only necessary data for suggestions to keep payload small
    return products.slice(0, 5).map(p => ({
      id: p.id,
      name: p.name,
      slug: p.slug,
      imageUrl: p.imageUrl,
      basePrice: p.basePrice,
      category: p.category.name,
    }));
  } catch (error) {
    console.error("Failed to get search suggestions", error);
    return [];
  }
}
