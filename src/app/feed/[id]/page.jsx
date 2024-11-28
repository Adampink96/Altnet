import CommentForm from "@/components/CommentForm";
import { db } from "@/utils/db";
import { auth } from "@clerk/nextjs/server";
export default async function SingleFeedPage({ params }) {
  const { userId } = await auth();
  const id = (await params).id;
  console.log(params);
  const contentresponse = await db.query(
    `SELECT * FROM content WHERE id = ${id}`
  );
  const content = contentresponse.rows;
  console.log(content);

  const remarkresponse = await db.query(
    `SELECT * FROM remark WHERE content_id = ${id}`
  );
  const remarks = remarkresponse.rows;
  console.log(remarks);

  return (
    <div>
      <h2>{content[0].post}</h2>
      {remarks.map((remark) => {
        return (
          <div key={remark.id}>
            <p>{remark.comment}</p>
            {/* <CommentForm id={content.id} /> */}
          </div>
        );
      })}
    </div>
  );
}
