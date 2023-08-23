"use server";

import { revalidatePath } from "next/cache";
import { db } from "../db";

interface Params {
  userId: string;
  username: string;
  name: string;
  bio: string;
  image: string;
  path: string;
}

export async function updateUser({
  userId,
  username,
  name,
  bio,
  image,
  path,
}: Params): Promise<void> {
  try {
    const user = await db.user.findFirst({
      where: {
        clerkId: userId,
      },
    });

    if (user) {
      await db.user.update({
        where: { id: user.id },
        data: {
          username: username.toLowerCase(),
          name,
          bio,
          image,
          onboarded: true,
        },
      });
    } else {
      // TODO: FIX THIS
      await db.user.create({
        data: {
          clerkId: userId,
          username: username.toLowerCase(),
          name,
          bio,
          image,
          onboarded: true,
        },
      });
    }

    if (path === "/profile/edit") {
      revalidatePath(path);
    }
  } catch (error: any) {
    throw new Error(`Failed to create/update user: ${error.message}`);
  }
}
