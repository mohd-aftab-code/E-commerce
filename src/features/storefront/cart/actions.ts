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
          product: {
            include: {
              options: {
                include: { values: true }
              }
            }
          }
        },
        orderBy: { createdAt: 'desc' }
      },
      coupon: true
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
            product: {
              include: {
                options: {
                  include: { values: true },
                },
              },
            },
          },
          orderBy: { createdAt: "desc" },
        },
        coupon: true,
      },
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
        include: {
          product: {
            include: {
              options: {
                include: { values: true },
              },
            },
          },
        },
        orderBy: { createdAt: "desc" },
      },
      coupon: true,
    },
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

/**
 * Reorders a previous order by copying its items to the cart.
 */
export async function reorderOrder(orderId: string) {
  try {
    const order = await db.order.findUnique({
      where: { id: orderId },
      include: { items: true },
    });

    if (!order || order.items.length === 0) {
      return { success: false, error: "Order not found or empty." };
    }

    const cart = await getOrCreateCart();

    // Create new cart items from old order items
    // Using a transaction to ensure all or nothing
    await db.$transaction(
      order.items.map((item) =>
        db.cartItem.create({
          data: {
            cartId: cart.id,
            productId: item.productId,
            quantity: item.quantity,
            price: item.price, // Technically we should recalculate the price here if prices changed, but for standard reorder we might just keep the old price or recalculate. To be safe we just use the price they paid or the current DB price. We will use the snapshot price they paid.
            options: item.options as any,
            artworkUrl: item.artworkUrl,
          },
        })
      )
    );

    revalidatePath("/cart");
    return { success: true };
  } catch (error) {
    console.error("Failed to reorder:", error);
    return { success: false, error: "Failed to process reorder." };
  }
}

/**
 * Applies a coupon to the cart.
 */
export async function applyCoupon(code: string) {
  try {
    const cart = await getCart();
    if (!cart) return { success: false, error: "Cart not found" };

    const coupon = await db.coupon.findUnique({ where: { code: code.toUpperCase() } });
    if (!coupon) return { success: false, error: "Invalid coupon code" };
    if (!coupon.isActive) return { success: false, error: "Coupon is no longer active" };
    if (coupon.expiresAt && coupon.expiresAt < new Date()) return { success: false, error: "Coupon has expired" };
    if (coupon.usageLimit && coupon.timesUsed >= coupon.usageLimit) return { success: false, error: "Coupon usage limit reached" };

    await db.cart.update({
      where: { id: cart.id },
      data: { couponId: coupon.id }
    });

    revalidatePath("/cart");
    return { success: true };
  } catch (error: any) {
    console.error("Failed to apply coupon:", error);
    return { success: false, error: "Failed to apply coupon" };
  }
}

/**
 * Removes the applied coupon from the cart.
 */
export async function removeCoupon() {
  try {
    const cart = await getCart();
    if (!cart) return { success: false, error: "Cart not found" };

    await db.cart.update({
      where: { id: cart.id },
      data: { couponId: null }
    });

    revalidatePath("/cart");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to remove coupon" };
  }
}
