"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useNavigationGuard } from "@/providers/NavigationGuardProvider";

const GuardedLink = ({ href, children, ...props }) => {
  const router = useRouter();
  const { checkNavigation } = useNavigationGuard();

  const handleClick = (e) => {
    e.preventDefault();
    checkNavigation(() => {
      router.push(href);
    });
  };

  return (
    <Link href={href} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
};

export default GuardedLink;