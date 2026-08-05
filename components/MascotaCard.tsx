import Link from "next/link";

interface Mascota {
  id: number;
  nombre: string;
  raza: string;
  edad: number;
  imagen: string;
}

interface MascotaCardProps {
  mascota: Mascota;
}

export default function MascotaCard({
  mascota,
}: MascotaCardProps) {
  return (
    <Link href={`/mascotas/${mascota.id}`}>
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition duration-300 cursor-pointer">
        <img
          src={mascota.imagen}
          alt={mascota.nombre}
          className="w-full h-64 object-cover"
        />

        <div className="p-5">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {mascota.nombre}
          </h2>

          <p className="text-gray-600">
            <span className="font-semibold">
              Raza:
            </span>{" "}
            {mascota.raza}
          </p>

          <p className="text-gray-500">
            <span className="font-semibold">
              Edad:
            </span>{" "}
            {mascota.edad} años
          </p>

          <div className="mt-4">
            <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
              Ver detalles
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}