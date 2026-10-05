// Mini Challenge 3 - Server Actions
// Update for Supabase Integration
"use server";

import { revalidatePath } from "next/cache";
import { supabase } from "@/lib/supabase/server";

export async function deleteMessageAction(id) {
  const { error } = await supabase
    .from("messages")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Supabase delete error:", {
      message: error.message,
      details: error.details,
      hint: error.hint,
      code: error.code,
    });

    return {
      success: false,
      error: "Pesan gagal dihapus.",
    };
  }

  revalidatePath("/messages");

  return {
    success: true,
  };
}