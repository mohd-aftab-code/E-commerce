"use server";

import { db } from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { revalidatePath } from "next/cache";

export async function getUserAddresses() {
  const session = await getSession();
  if (!session) return [];

  return db.address.findMany({
    where: { userId: session.userId },
    orderBy: [
      { isDefault: "desc" },
      { createdAt: "desc" }
    ]
  });
}

export async function getAddressById(id: string) {
  const session = await getSession();
  if (!session) return null;

  return db.address.findUnique({
    where: { id, userId: session.userId }
  });
}

export async function createAddress(data: any) {
  const session = await getSession();
  if (!session) return { error: "Unauthorized" };

  try {
    // If this is the first address or explicitly set to default, make it default
    // We should turn off isDefault for other addresses if this one is set to default
    if (data.isDefault) {
      await db.address.updateMany({
        where: { userId: session.userId },
        data: { isDefault: false }
      });
    } else {
      const existingCount = await db.address.count({ where: { userId: session.userId } });
      if (existingCount === 0) data.isDefault = true;
    }

    const address = await db.address.create({
      data: {
        ...data,
        userId: session.userId,
      }
    });

    revalidatePath("/account/addresses");
    revalidatePath("/checkout/shipping");
    return { success: true, address };
  } catch (error: any) {
    console.error("Error creating address:", error);
    return { error: "Failed to save address." };
  }
}

export async function updateAddress(id: string, data: any) {
  const session = await getSession();
  if (!session) return { error: "Unauthorized" };

  try {
    const existing = await db.address.findUnique({ where: { id, userId: session.userId } });
    if (!existing) return { error: "Address not found" };

    if (data.isDefault) {
      await db.address.updateMany({
        where: { userId: session.userId, id: { not: id } },
        data: { isDefault: false }
      });
    }

    const address = await db.address.update({
      where: { id },
      data
    });

    revalidatePath("/account/addresses");
    revalidatePath("/checkout/shipping");
    return { success: true, address };
  } catch (error: any) {
    console.error("Error updating address:", error);
    return { error: "Failed to update address." };
  }
}

export async function deleteAddress(id: string) {
  const session = await getSession();
  if (!session) return { error: "Unauthorized" };

  try {
    const address = await db.address.findUnique({ where: { id, userId: session.userId } });
    if (!address) return { error: "Address not found" };

    await db.address.delete({ where: { id } });

    // If it was default, make the most recently created remaining address the new default
    if (address.isDefault) {
      const latest = await db.address.findFirst({
        where: { userId: session.userId },
        orderBy: { createdAt: "desc" }
      });
      if (latest) {
        await db.address.update({
          where: { id: latest.id },
          data: { isDefault: true }
        });
      }
    }

    revalidatePath("/account/addresses");
    revalidatePath("/checkout/shipping");
    return { success: true };
  } catch (error: any) {
    console.error("Error deleting address:", error);
    return { error: "Failed to delete address." };
  }
}

export async function setDefaultAddress(id: string) {
  const session = await getSession();
  if (!session) return { error: "Unauthorized" };

  try {
    await db.$transaction([
      db.address.updateMany({
        where: { userId: session.userId },
        data: { isDefault: false }
      }),
      db.address.update({
        where: { id, userId: session.userId },
        data: { isDefault: true }
      })
    ]);

    revalidatePath("/account/addresses");
    revalidatePath("/checkout/shipping");
    return { success: true };
  } catch (error: any) {
    return { error: "Failed to set default address." };
  }
}
