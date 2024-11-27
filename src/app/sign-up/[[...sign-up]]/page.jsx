import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div>
      <p>Welcome to Altnets sign up page, please follow the instructions</p>
      <SignUp />
    </div>
  );
}
