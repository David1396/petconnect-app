import { supabase } from "@/lib/supabase";

export default async function TestPage() {
  const { data, error } = await supabase
    .from("profiles")
    .select("*");

  return (
    <main className="p-8">
      <h1>Prueba Supabase</h1>

      <pre>
        {JSON.stringify(data, null, 2)}
      </pre>

      {error && (
        <pre>
          {JSON.stringify(error, null, 2)}
        </pre>
      )}
    </main>
  );
}