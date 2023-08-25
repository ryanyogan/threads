"use server";

import { revalidatePath } from "next/cache";
import { db } from "../db";

interface Params {
  text: string;
  author: string;
  path: string;
  communityId: string | undefined | null;
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
        // community: {
        //   connect: {
        //     id: communityId,
        //   },
        // },
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

export async function fetchThreads(pageNumber = 1, pageSize = 20) {
  try {
    const skipAmount = (pageNumber - 1) * pageSize;

    const threads = await db.thread.findMany({
      where: {
        parentId: null || undefined,
      },
      skip: skipAmount,
      include: {
        author: true,
        community: true,
        children: {
          include: {
            author: true,
          },
        },
      },
    });

    const isNext = threads.length > skipAmount + threads.length;

    return { threads, isNext };
  } catch (error: any) {
    throw new Error(`Failed loading threads: ${error.message}`);
  }
}
