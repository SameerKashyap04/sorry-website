import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

export interface VisitResponse {
  id: string;
  visitor_name: string;
  website_opened: boolean;
  opened_at: string;
  forgiven: boolean;
  response: string;
  created_at: string;
}

export async function recordVisit(): Promise<string | null> {
  if (!supabase) return null;

  try {
    const { data, error } = await supabase
      .from("responses")
      .insert({
        visitor_name: "Mugdha",
        website_opened: true,
        opened_at: new Date().toISOString(),
        forgiven: false,
        response: "",
      })
      .select("id")
      .single();

    if (error) {
      console.error("Supabase insert error:", error);
      return null;
    }

    return data?.id || null;
  } catch (err) {
    console.error("Failed to record visit:", err);
    return null;
  }
}

export async function recordForgiveness(id: string): Promise<boolean> {
  if (!supabase || !id) return false;

  try {
    const { error } = await supabase
      .from("responses")
      .update({
        forgiven: true,
        response: "Mugdha forgave you ❤️",
      })
      .eq("id", id);

    if (error) {
      console.error("Supabase update error:", error);
      return false;
    }

    return true;
  } catch (err) {
    console.error("Failed to record forgiveness:", err);
    return false;
  }
}

export async function getResponses(): Promise<VisitResponse[]> {
  if (!supabase) return [];

  try {
    const { data, error } = await supabase
      .from("responses")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Supabase fetch error:", error);
      return [];
    }

    return (data as VisitResponse[]) || [];
  } catch (err) {
    console.error("Failed to fetch responses:", err);
    return [];
  }
}
