import { Mascota } from "@/types/mascota";

interface MascotaCardProps {
  mascota: Mascota;
}

export default function MascotaCard({
  mascota,
}: MascotaCardProps) {
  return (
    <div className="border rounded-lg p-4 shadow">
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
  );
}