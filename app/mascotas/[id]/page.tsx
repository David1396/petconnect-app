import Link from "next/link";
import { supabase } from "@/lib/supabase";
import SolicitarAdopcion from "@/components/SolicitarAdopcion";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function MascotaDetallePage({
  params,
}: PageProps) {
  const { id } = await params;

  const { data: mascota, error } = await supabase
    .from("mascotas")
    .select("*")
    .eq("id", Number(id))
    .single();

  if (error || !mascota) {
    return (
      <main className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <h1 className="text-3xl font-bold text-red-600">
            Mascota no encontrada
          </h1>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <Link
          href="/mascotas"
          className="inline-block mb-6 text-blue-600 hover:text-blue-800 font-medium"
        >
          ← Volver a Mascotas
        </Link>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="grid lg:grid-cols-2">
            <div>
              <img
                src={mascota.imagen}
                alt={mascota.nombre}
                className="w-full h-full object-cover min-h-[450px]"
              />
            </div>

            <div className="p-8">
              <div className="mb-6">
                <h1 className="text-4xl font-bold text-gray-800">
                  {mascota.nombre}
                </h1>

                <p className="text-gray-500 mt-2">
                  Mascota disponible para adopción
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-blue-50 p-4 rounded-xl">
                  <h3 className="text-sm text-gray-500">
                    Raza
                  </h3>

                  <p className="text-xl font-semibold text-gray-800">
                    {mascota.raza}
                  </p>
                </div>

                <div className="bg-green-50 p-4 rounded-xl">
                  <h3 className="text-sm text-gray-500">
                    Edad
                  </h3>

                  <p className="text-xl font-semibold text-gray-800">
                    {mascota.edad} años
                  </p>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-3">
                  Descripción
                </h2>

                <p className="text-gray-600 leading-relaxed">
                  {mascota.descripcion}
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <SolicitarAdopcion mascotaId={mascota.id} />

                <Link
                  href="/mascotas"
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-lg font-semibold transition"
                >
                  Ver más mascotas
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}