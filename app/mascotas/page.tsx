import MascotaCard from "@/components/MascotaCard";
import { mascotas } from "@/data/mascotas";

export default function MascotasPage() {
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        Mascotas Disponibles
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mascotas.map((mascota) => (
          <MascotaCard
            key={mascota.id}
            mascota={mascota}
          />
        ))}
      </div>
    </main>
  );
}