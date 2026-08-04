import { mascotas } from "@/data/mascotas";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function MascotaDetallePage({
  params,
}: PageProps) {
  const { id } = await params;

  const mascota = mascotas.find(
    (m) => m.id === Number(id)
  );

  if (!mascota) {
    return (
      <main className="p-8">
        <h1 className="text-3xl font-bold">
          Mascota no encontrada
        </h1>
      </main>
    );
  }

  return (
    <main className="p-8">
      <h1 className="text-4xl font-bold mb-4">
        {mascota.nombre}
      </h1>

      <img
        src={mascota.imagen}
        alt={mascota.nombre}
        className="w-full max-w-xl rounded-lg mb-4"
      />

      <div className="text-lg">
        <p>
{mascota.edad} años
        </p>
      </div>
    </main>
  );
}