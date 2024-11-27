import { db } from "@/utils/db";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export default async function CommentForm() {
  const { userId } = await auth();
  async function handleSubmit(formData) {
    "use server";
    const comment = formData.get("comment");
    db.query(`INSERT INTO remark (comment, clerk_id) VALUES ($1,$2)`, [
      comment,
      userId,
    ]);
    revalidatePath("/feed");
  }
  return (
    <form action={handleSubmit}>
      <textarea
        name="comment"
        placeholder="what you got to say about that..."
      ></textarea>
      <button>Add Comment</button>
    </form>
  );
}