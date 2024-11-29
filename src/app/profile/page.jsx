import { db } from "@/utils/db";
import { auth, currentUser } from "@clerk/nextjs/server";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
export default async function ProfilePage() {
  const { user, userId } = await auth();

  const currentUserObj = await currentUser();
  console.log(userId);
  console.log(user);
  console.log(currentUserObj);
  const responseProfile = await db.query(
    `SELECT * FROM profile WHERE clerk_id = '${userId}'`
  );
  const profile = responseProfile.rows;

  return (
    <div>
      <h2>Welcome to the profile page</h2>
      {currentUserObj && (
        <div>
          {currentUserObj.firstName
            ? `Welcome to Altnet ${currentUserObj.firstName}`
            : `welcome to Altnet`}
          {/* <div>
            {" "}
            <SignedOut>
              <Link href="/sign-in">
                Login to your account to make view profile
              </Link>
            </SignedOut>
          </div> */}
        </div>
      )}
      <h2>Username:{profile[0].username}</h2>
      <p>Bio:{profile[0].bio}</p>
    </div>
  );
}
