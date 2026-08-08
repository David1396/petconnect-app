import { supabase } from "@/lib/supabase";
import MascotasGrid from "@/components/MascotasGrid";

export default async function MascotasPage() {
  const { data: mascotas } = await supabase
    .from("mascotas")
    .select("*")
    .eq("adoptada", false)
    .order("id", { ascending: false });

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <h1 className="text-5xl font-bold text-gray-800">
            Mascotas Disponibles 🐾
          </h1>

          <p className="text-gray-600 mt-3 text-lg">
            Encuentra tu próximo compañero de vida.
          </p>
        </div>

        <MascotasGrid mascotas={mascotas || []} />
      </div>
    </main>
  );
}