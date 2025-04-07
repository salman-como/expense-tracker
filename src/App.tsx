import { useEffect } from "react";
import { supabase, useAuthStore } from "@/lib/supabase";

import Login from "@/components/Login";
import Dashboard from "@/pages/Dashboard";

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

  return user ? <Dashboard /> : <Login />;
}

export default App;
