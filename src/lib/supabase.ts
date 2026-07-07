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
  device_info: string;
  location: string;
  device_details: any;
  letter_opened: boolean;
  slideshow_opened: boolean;
  no_attempts: number;
  created_at: string;
}

export async function recordVisit(): Promise<string | null> {
  if (!supabase) return null;

  try {
    let locationStr = "Unknown Location";
    let fullLocationData = {};
    try {
      const res = await fetch("https://ipwho.is/");
      const geo = await res.json();
      if (geo.success) {
        locationStr = `${geo.city}, ${geo.region}, ${geo.country}`;
        fullLocationData = geo;
      }
    } catch (e) {
      console.error("Failed to fetch location", e);
    }

    let deviceDetails = {};
    if (typeof window !== "undefined") {
      deviceDetails = {
        userAgent: navigator.userAgent,
        platform: navigator.platform,
        language: navigator.language,
        screenResolution: `${window.screen.width}x${window.screen.height}`,
        windowSize: `${window.innerWidth}x${window.innerHeight}`,
        colorDepth: window.screen.colorDepth,
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        hardwareConcurrency: navigator.hardwareConcurrency || "Unknown",
        // @ts-ignore
        deviceMemory: navigator.deviceMemory || "Unknown",
        // @ts-ignore
        connectionType: navigator.connection?.effectiveType || "Unknown",
        maxTouchPoints: navigator.maxTouchPoints || 0,
        isTouchDevice: 'ontouchstart' in window || navigator.maxTouchPoints > 0,
        cookieEnabled: navigator.cookieEnabled,
        vendor: navigator.vendor,
        ipData: fullLocationData
      };
    }

    const { data, error } = await supabase
      .from("responses")
      .insert({
        visitor_name: "Mugdha",
        website_opened: true,
        opened_at: new Date().toISOString(),
        forgiven: false,
        response: "",
        device_info: typeof window !== "undefined" ? navigator.userAgent : "Unknown Device",
        location: locationStr,
        device_details: deviceDetails,
        letter_opened: false,
        slideshow_opened: false,
        no_attempts: 0,
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

export async function recordAction(id: string, updates: Partial<VisitResponse>): Promise<boolean> {
  if (!supabase || !id) return false;

  try {
    const { error } = await supabase
      .from("responses")
      .update(updates)
      .eq("id", id);

    if (error) {
      console.error("Supabase update error:", error);
      return false;
    }

    return true;
  } catch (err) {
    console.error("Failed to update record:", err);
    return false;
  }
}

export async function recordForgiveness(id: string): Promise<boolean> {
  return recordAction(id, {
    forgiven: true,
    response: "Mugdha forgave you ❤️",
  });
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
