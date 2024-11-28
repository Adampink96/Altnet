import { db } from "@/utils/db";
import { auth } from "@clerk/nextjs/server";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import PostForm from "@/components/PostForm";
import ProfileForm from "@/components/ProfileForm";
import Link from "next/link";
import CommentForm from "@/components/CommentForm";

export default async function FeedPage() {
  const { userId } = await auth();

  const responseContent = await db.query(`SELECT
content.id,
content.post,
profile.username,
profile.bio,
profile.id as profile_id,
remark.comment 
FROM content
LEFT JOIN profile ON content.clerk_id = profile.clerk_id
LEFT JOIN remark ON content.clerk_id = remark.clerk_id`);
  const contents = responseContent.rows;
  const responseProfile = await db.query(
    `SELECT * FROM profile WHERE clerk_id = '${userId}'`
  );

  const numUsers = responseProfile.rowCount;
  return (
    <div>
      {" "}
      <h2>Welcome to the live feed</h2>
      <SignedIn>{numUsers === 1 ? <PostForm /> : <ProfileForm />}</SignedIn>
      <SignedOut>
        <Link href="/sign-in">Login to your account to make posts</Link>
      </SignedOut>
      {contents.map((content) => {
        return (
          <div key={content.id}>
            <h3>
              <Link href={`/profile/${content.profile_id}`}>
                {content.username}
              </Link>
            </h3>
            <p>
              <Link href={`/feed/${content.id}`}> {content.post}</Link>
            </p>

            <CommentForm id={content.id} />
          </div>
        );
      })}
    </div>
  );
}
