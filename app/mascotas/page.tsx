import { supabase } from "@/lib/supabase";
import MascotaCard from "@/components/MascotaCard";

export default async function MascotasPage() {
  const { data: mascotas, error } = await supabase
    .from("mascotas")
    .select("*")
    .order("id", { ascending: false });

  if (error) {
    return (
      <main className="p-8">
        <h1>Error al cargar mascotas</h1>
      </main>
    );
  }

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        Mascotas Disponibles
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mascotas?.map((mascota) => (
          <MascotaCard
            key={mascota.id}
            mascota={mascota}
          />
        ))}
      </div>
    </main>
  );
}