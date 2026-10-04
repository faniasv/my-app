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

  const { data, error } = await supabase
    .from("messages")
    .insert({
      name,
      email,
      message,
    })
    .select()
    .single();

  if (error) {
    console.error("Supabase insert error:", {
      message: error.message,
      details: error.details,
      hint: error.hint,
      code: error.code,
    });

    return {
      success: false,
      error: error.message,
    };
  }

  console.log("Message inserted:", data);

  return {
    success: true,
  };
}