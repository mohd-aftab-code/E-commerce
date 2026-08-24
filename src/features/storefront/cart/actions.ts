"use server";

import { db } from "@/lib/prisma";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

const CART_COOKIE_NAME = "ps24_cart_id";

/**
 * Retrieves the current cart from the database without creating a new one.
 * Use this in Server Components to avoid setting cookies during render.
 */
export async function getCart() {
  const cookieStore = await cookies();
  const cartId = cookieStore.get(CART_COOKIE_NAME)?.value;

  if (!cartId) return null;

  return await db.cart.findUnique({
    where: { id: cartId },
    include: {
      items: {
        include: {
          product: true
        },
        orderBy: { createdAt: 'desc' }
      }
    }
  });
}

/**
 * Retrieves the current cart from the database or creates a new one
 * using a cookie to store the Cart ID for guests.
 * MUST only be called from Server Actions or Route Handlers.
 */
export async function getOrCreateCart() {
  const cookieStore = await cookies();
  const cartId = cookieStore.get(CART_COOKIE_NAME)?.value;

  if (cartId) {
    const existingCart = await db.cart.findUnique({
      where: { id: cartId },
      include: {
        items: {
          include: {
            product: true
          },
          orderBy: { createdAt: 'desc' }
        }
      }
    });

    if (existingCart) return existingCart;
  }

  // If no cart found or cookie is missing, create a new one
  const newCart = await db.cart.create({
    data: {}
  });

  cookieStore.set(CART_COOKIE_NAME, newCart.id, {
    maxAge: 60 * 60 * 24 * 30, // 30 days
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });

  return await db.cart.findUniqueOrThrow({
    where: { id: newCart.id },
    include: { 
      items: { 
        include: { product: true },
        orderBy: { createdAt: 'desc' }
      } 
    }
  });
}

/**
 * Adds an item to the cart.
 */
export async function addToCart(data: {
  productId: string;
  quantity: number;
  price: number;
  options: Record<string, string>;
  artworkUrl?: string;
}) {
  try {
    const cart = await getOrCreateCart();

    await db.cartItem.create({
      data: {
        cartId: cart.id,
        productId: data.productId,
        quantity: data.quantity,
        price: data.price,
        options: data.options,
        artworkUrl: data.artworkUrl,
      }
    });

    revalidatePath("/cart");
    revalidatePath("/products");
    
    return { success: true };
  } catch (error) {
    console.error("Failed to add to cart:", error);
    return { success: false, error: "Failed to add item to cart." };
  }
}

/**
 * Removes an item from the cart.
 */
export async function removeCartItem(itemId: string) {
  try {
    const cookieStore = await cookies();
    const cartId = cookieStore.get(CART_COOKIE_NAME)?.value;
    
    if (!cartId) throw new Error("No cart found");

    // Verify the item belongs to the user's cart
    await db.cartItem.delete({
      where: {
        id: itemId,
        cartId: cartId,
      }
    });

    revalidatePath("/cart");
    return { success: true };
  } catch (error) {
    console.error("Failed to remove item:", error);
    return { success: false, error: "Failed to remove item." };
  }
}
