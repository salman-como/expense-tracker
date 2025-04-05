// --- Supabase + Zustand Auth Setup ---
import { createClient } from "@supabase/supabase-js";
import { create } from "zustand";

const VITE_SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const VITE_SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY);

interface AuthState {
  user: any;
  setUser: (user: any) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));

export const signInWithGoogle = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
  });
  if (error) console.error("Login Error:", error);
  return data;
};

export const signOut = async () => {
  await supabase.auth.signOut();
};

// --- TypeScript Interfaces ---

export interface Account {
  id: string;
  user_id: string;
  name: string;
  type: "bank" | "cash" | "person" | "other";
  country: string;
  balance: number;
  created_at: string;
}

export interface Transaction {
  id: string;
  user_id: string;
  account_id: string;
  type: "Income" | "Expense";
  amount: number;
  description: string;
  date: string;
  created_at: string;
}

export interface Category {
  id: string;
  name: string;
  icon?: string;
  color?: string;
  created_at: string;
}

// --- CRUD Functions ---

// Accounts
export const fetchAccounts = async (userId: string): Promise<Account[]> => {
  const { data, error } = await supabase
    .from("accounts")
    .select("*")
    .eq("user_id", userId);
  if (error) throw error;
  return data;
};

export const createAccount = async (account: Partial<Account>) => {
  const { data, error } = await supabase.from("accounts").insert([account]);
  if (error) throw error;
  return data;
};

export const updateAccount = async (id: string, updates: Partial<Account>) => {
  const { data, error } = await supabase
    .from("accounts")
    .update(updates)
    .eq("id", id);
  if (error) throw error;
  return data;
};

export const deleteAccount = async (id: string) => {
  const { data, error } = await supabase.from("accounts").delete().eq("id", id);
  if (error) throw error;
  return data;
};

// Transactions
export const fetchTransactions = async (
  userId: string,
): Promise<Transaction[]> => {
  const { data, error } = await supabase
    .from("transactions")
    .select("*")
    .eq("user_id", userId)
    .order("date", { ascending: false });
  if (error) throw error;
  return data;
};

export const createTransaction = async (txn: Partial<Transaction>) => {
  const { data, error } = await supabase.from("transactions").insert([txn]);
  if (error) throw error;
  return data;
};

export const updateTransaction = async (
  id: string,
  updates: Partial<Transaction>,
) => {
  const { data, error } = await supabase
    .from("transactions")
    .update(updates)
    .eq("id", id);
  if (error) throw error;
  return data;
};

export const deleteTransaction = async (id: string) => {
  const { data, error } = await supabase
    .from("transactions")
    .delete()
    .eq("id", id);
  if (error) throw error;
  return data;
};
