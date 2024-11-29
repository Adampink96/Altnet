import { db } from "@/utils/db";
// import { auth } from "@clerk/nextjs/server";

export default async function SingleProfilePage({ params }) {
  //   const { userId } = await auth();
  const profile_id = (await params).profile_id;
  console.log(params);
  const profileresponse = await db.query(
    `SELECT * FROM profile WHERE id = ${profile_id}`
  );
  const profile = profileresponse.rows;
  console.log(profile);
  return (
    <div>
      <h2>username:{profile[0].username}</h2>
      <p>Bio:{profile[0].bio}</p>
    </div>
  );
}
