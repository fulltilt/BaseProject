import Link from "next/link";
import { SignInButton } from "./signInButton";
import { SignOutButton } from "./signOutButton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { auth } from "../api/auth/authConfig";
import { ThemeSwitcher } from "./ThemeSwitcher";

export function Hamburger() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
      />
    </svg>
  );
}

export async function NavBar() {
  const session = await auth();

  return (
    <nav className="sticky top-0 z-50 flex w-full items-center justify-between p-2 pl-4 pr-4 text-xl font-semibold">
      <div className="flex items-center gap-8">
        <Link href="/home">{process.env.NEXT_PUBLIC_APP_NAME}</Link>
        <div className="hidden gap-8 sm:flex">
          <Link href="/about" className="text-sm">
            About
          </Link>
          <Link
            href="https://www.paypal.com/donate/?hosted_button_id=ZCDZKZW4JE5LG"
            className="text-sm"
          >
            Donate
          </Link>
        </div>
      </div>
      <div className="sm:hidden">
        <div className="flex gap-4">
          <ThemeSwitcher />
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Hamburger />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <Link href="/about" className="text-sm">
                  About
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link
                  href="https://www.paypal.com/donate/?hosted_button_id=ZCDZKZW4JE5LG"
                  className="text-sm"
                >
                  Donate
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <div className="mt-4 sm:mt-0">
                  {session?.user ? <SignOutButton /> : <SignInButton />}
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="hidden sm:block">
        <div className="mt-4 flex gap-4 sm:mt-0">
          <ThemeSwitcher />
          {session?.user ? <SignOutButton /> : <SignInButton />}
        </div>
      </div>
    </nav>
  );
}
