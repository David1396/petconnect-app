import Link from "next/link";
import { Mascota } from "@/types/mascota";

interface MascotaCardProps {
  mascota: Mascota;
}

export default function MascotaCard({
  mascota,
}: MascotaCardProps) {
  return (
    <Link href={`/mascotas/${mascota.id}`}>
      <div className="border rounded-lg p-4 shadow hover:scale-105 transition cursor-pointer">
        <img src={mascota.imagen}
          alt={mascota.nombre}
          className="w-full h-48 object-cover rounded"
        />

        <h2 className="text-xl font-bold mt-2">
          {mascota.nombre}
        </h2>

        <p>Raza: {mascota.raza}</p>

        <p>Edad: {mascota.edad} años</p>
      </div>
    </Link>
  );
}