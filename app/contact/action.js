// BE Live 3 Server Actions
"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function submitContactForm(formData) {
  const name = formData.get("name");
  const email = formData.get("email");
  const message = formData.get("message");

  if (!name || !email || !message) {
    return {
      success: false,
      error: "Semua field wajib diisi.",
    };
  }

  const supabase = createSupabaseServerClient();

  const { error } = await supabase
    .from("messages")
    .insert({
      name,
      email,
      message,
    });

  if (error) {
    console.error("Supabase insert error:", error);

    return {
      success: false,
      error: "Pesan gagal dikirim.",
    };
  }

  return {
    success: true,
  };
}