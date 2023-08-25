import ThreadCard from "@/components/cards/thread-card";
import { fetchThreads } from "@/lib/actions/thread.actions";
import { currentUser } from "@clerk/nextjs";

export const runtime = "edge";

export default async function Home() {
  const [{ threads }, user] = await Promise.all([
    fetchThreads(1, 30),
    currentUser(),
  ]);

  return (
    <>
      <h1 className="head-text text-left">Threads</h1>

      <section className="mt-9 flex flex-col gap-10">
        {threads.length === 0 ? (
          <p className="no-result">No Threads Found</p>
        ) : (
          <>
            {threads.map((thread) => (
              <ThreadCard
                key={thread.id}
                id={thread.id}
                currentUserId={user?.id || ""}
                parentId={thread.parentId}
                content={thread.text}
                author={thread.author}
                community={thread.community}
                createdAt={thread.createdAt}
                comments={thread.children}
              />
            ))}
          </>
        )}
      </section>
    </>
  );
}
