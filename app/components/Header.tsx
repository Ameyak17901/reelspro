import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function Header() {
  const { data: session } = useSession();
  const handleSignout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <button onClick={handleSignout}>Sign out</button>
      {session ? (
        <div>Welcome</div>
      ) : (
        <div>
          <Link href="/register">Register</Link>
          <Link href="/login">Sign In</Link>
        </div>
      )}
    </div>
  );
}
