import { useEffect } from "react";
import { supabase, useAuthStore } from "@/lib/supabase";

import Login from "@/components/Login";

function App() {
  const { user, setUser } = useAuthStore();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data?.user) setUser(data.user);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user || null);
      },
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, [setUser]);

  if (!user) return <Login />;

  return <div className="p-4">Welcome, {user.email}</div>;
}

export default App;
