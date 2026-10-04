// BE Live 3 Server Actions
// Update for Mini Challenge 3 - Server Actions
// Update for Supabase Integration
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { deleteMessageAction } from "./action";

export const dynamic = "force-dynamic";

export default async function MessagesPage() {
  const supabase = createSupabaseServerClient();

  const { data: messages, error } = await supabase
    .from("messages")
    .select("*")
    .order("created_at", { ascending: false });

  console.log("MESSAGES FROM SUPABASE:", messages);
  console.log("MESSAGES ERROR:", error);

  if (error) {
    console.error("Supabase fetch error:", {
      message: error.message,
      details: error.details,
      hint: error.hint,
      code: error.code,
    });

    return (
      <section className="mx-auto max-w-3xl px-6 py-20">
        <h1 className="text-3xl font-bold">Pesan Masuk</h1>

        <p className="mt-8 text-destructive">
          {error.message}
        </p>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-3xl px-6 py-20">
      <h1 className="text-3xl font-bold">Pesan Masuk</h1>

      <div className="mt-8 space-y-4">
        {messages.length === 0 ? (
          <p className="text-muted-foreground">
            Belum ada pesan masuk.
          </p>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className="rounded-lg border p-4"
            >
              <p className="font-medium">
                {msg.name} — {msg.email}
              </p>

              <p className="mt-1 text-sm text-muted-foreground">
                {msg.message}
              </p>

              <form
                action={deleteMessageAction.bind(null, msg.id)}
                className="mt-4"
              >
                <button
                  type="submit"
                  className="rounded-md bg-destructive px-3 py-2 text-sm text-white"
                >
                  Hapus
                </button>
              </form>
            </div>
          ))
        )}
      </div>
    </section>
  );
}