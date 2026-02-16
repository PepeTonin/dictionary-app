import { supabaseClient } from "./client";

export async function signUp(email: string, password: string) {
  const { data, error } = await supabaseClient.auth.signUp({
    email,
    password,
  });

  if (error || !data.user) {
    throw new Error("Failed to register user");
  }
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabaseClient.auth.signInWithPassword({
    email,
    password,
  });

  if (error || !data.user) {
    throw new Error("Failed to login");
  }

  return data;
}

export async function logout() {
  const { error } = await supabaseClient.auth.signOut();

  if (error) {
    throw new Error("Failed to logout");
  }
}
