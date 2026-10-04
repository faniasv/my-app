// Mini Challenge 3 - Server Actions
"use server";

import { messages } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function deleteMessageAction(id) {
  const messageId = Number(id);

  const index = messages.findIndex(
    (message) => message.id === messageId
  );

  if (index === -1) {
    return {
      success: false,
      error: "Pesan tidak ditemukan.",
    };
  }

  messages.splice(index, 1);

  revalidatePath("/messages");

  return {
    success: true,
  };
}