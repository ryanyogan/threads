import PostThread from "@/components/forms/post-thread";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export const runtime = "edge";

export default async function CreateThread() {
  const user = await currentUser();

  if (!user) {
    return null;
  }

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) {
    redirect("/onboarding");
  }

  return (
    <>
      <h1 className="head-text">Make a Zoobie</h1>
      <PostThread userId={userInfo.id} />
    </>
  );
}
