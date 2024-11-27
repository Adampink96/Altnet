import { db } from "@/utils/db";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export default async function PostForm() {
  const { userId } = await auth();
  async function handleSubmit(formData) {
    "use server";
    const post = formData.get("post");
    db.query(`INSERT INTO content (post, clerk_id) VALUES ($1,$2)`, [
      post,
      userId,
    ]);
    revalidatePath("/feed");
  }
  return (
    <form action={handleSubmit}>
      <textarea
        name="post"
        placeholder="whats on that mind of yours.."
      ></textarea>
      <button>Add Post</button>
    </form>
  );
}
