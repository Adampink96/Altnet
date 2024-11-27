import { db } from "@/utils/db";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export default async function ProfileForm() {
  const { userId } = await auth();
  console.log(userId);
  async function handleSubmit(formData) {
    "use server";
    const username = formData.get("username");
    const bio = formData.get("bio");

    db.query(
      `INSERT INTO profile (username, bio, clerk_id) VALUES ($1,$2,$3)`,
      [username, bio, userId]
    );
    revalidatePath("/feed");
  }
  return (
    <form action={handleSubmit}>
      <input placeholder="username" name="username" type="text" />
      <textarea placeholder="bio" name="bio"></textarea>
      <button>Create Profile</button>
    </form>
  );
}
