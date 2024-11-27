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

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <h1>Altnet</h1>
          <nav>
            <Link href="/">Home</Link>
            <Link href="/feed">Feed</Link>
            <Link href="/profile">Profile</Link>
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
