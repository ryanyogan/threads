"use server";

import { revalidatePath } from "next/cache";
import { db } from "../db";

interface Params {
  text: string;
  author: string;
  path: string;
  communityId: string | undefined;
}

export async function createThread({
  text,
  author,
  path,
  communityId,
}: Params) {
  try {
    await db.thread.create({
      data: {
        text,
        //community: {
          //connect: {
            //id: communityId,
        //  },
        //},
        author: {
          connect: {
            id: author,
          },
        },
      },
    });

    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Failed to create thread: ${error.message}`);
  }
}
