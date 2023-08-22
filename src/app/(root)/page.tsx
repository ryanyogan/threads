import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <section>
      <UserButton afterSignOutUrl="/" />
    </section>
  );
}
