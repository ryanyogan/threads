import Image from "next/image";
import Link from "next/link";

export function TopBar() {
  return (
    <nav className="topbar">
      <Link href="/" className="flex items-center gap-4">
        <Image src="/logo.svg" alt="logo" height={28} width={28} />
        <p className="text-heading3-bold text-light-1 max-xs:hidden">Threads</p>
      </Link>
    </nav>
  );
}
