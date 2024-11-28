import { db } from "@/utils/db";
import { auth, currentUser } from "@clerk/nextjs/server";

export default async function ProfilePage() {
  const user = await auth();
  const currentUserObj = await currentUser();
  console.log(user);
  console.log(currentUserObj);
  const responseProfile = await db.query(`SELECT * FROM profile`);
  const profile = responseProfile.rows;

  return (
    <div>
      <h2>Welcome to the profile page</h2>
      {currentUserObj && (
        <div>
          {currentUserObj.firstName
            ? `Welcome to Altnet ${currentUserObj.firstName}`
            : `welcome to Altnet`}
        </div>
      )}
    </div>
  );
}
