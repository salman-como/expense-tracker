import { signInWithGoogle } from "@/lib/supabase";

export default function Login() {
  return (
    <div className="flex justify-center items-center h-screen">
      <button
        onClick={signInWithGoogle}
        className="bg-black text-white px-4 py-2 rounded"
      >
        Sign in with Google
      </button>
    </div>
  );
}
