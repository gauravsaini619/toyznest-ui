import Image from "next/image";
import Link from "next/link";
import { cn } from "cn";

export function Logo({
  className,
  heightClassName = "h-8",
}: {
  className?: string;
  heightClassName?: string;
}) {
  return (
    <Link
      href="/"
      aria-label="Toyznest — home"
      className={cn("inline-flex shrink-0 items-center", heightClassName, className)}
    >
      <Image
        src="/images/toyznest-mark.png"
        alt="Toyznest"
        width={751}
        height={258}
        priority
        className="h-full w-auto object-contain"
      />
    </Link>
  );
}
