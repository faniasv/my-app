import { supabase } from "@/lib/supabase/server";

export async function GET() {
    const { data, error } = await supabase.from("favorites").select("*");

    if (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json({ data });
}