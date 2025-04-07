import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";

export default function Header() {
  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <header className="flex justify-between items-center p-4 border-b bg-white dark:bg-gray-900">
      <h1 className="text-xl font-semibold">Expense Tracker</h1>
      <Button variant="outline" onClick={handleLogout}>
        Logout
      </Button>
    </header>
  );
}
