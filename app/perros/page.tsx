interface Dog {
  id: string;
  url: string;
}

async function obtenerPerros() {
  const res = await fetch(
    "https://api.thedogapi.com/v1/images/search?limit=6",
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("No se pudieron obtener los perros");
  }

  return res.json();
}

export default async function PerrosPage() {
  const perros: Dog[] = await obtenerPerros();

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        Perros desde The Dog API
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {perros.map((perro) => (
          <div
            key={perro.id}
            className="border rounded-lg p-4"
          >
            <img src={perro.url}
              alt="Perro"
              className="w-full h-64 object-cover rounded"
            />
          </div>
        ))}
      </div>
    </main>
  );
}