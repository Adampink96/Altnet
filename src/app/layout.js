import localFont from "next/font/local";
import "./globals.css";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import Link from "next/link";
import {
  PersonIcon,
  HomeIcon,
  ReaderIcon,
  RocketIcon,
} from "@radix-ui/react-icons";

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <h1>
            Altnet
            <RocketIcon />
          </h1>
          <nav className="navbar">
            <Link href="/">
              Home
              <HomeIcon />
            </Link>
            <Link href="/feed">
              Feed
              <ReaderIcon />
            </Link>
            <Link href="/profile">
              Profile
              <PersonIcon />
            </Link>
          </nav>
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
          {children}
          <footer>&copy; Altnet 2024</footer>
        </body>
      </html>
    </ClerkProvider>
  );
}
