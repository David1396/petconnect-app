import Link from "next/link";

interface Breed {
  id: number;
  name: string;
  origin?: string;
  life_span?: string;
  temperament?: string;
  breed_group?: string;

  image?: {
    url: string;
  };
}

async function obtenerRazas() {
  const res = await fetch(
  "https://api.thedogapi.com/v1/breeds",
  {
    headers: {
    "x-api-key": process.env.DOG_API_KEY!,
    },
    cache: "no-store",
  });
    if (!res.ok) {
    throw new Error(
    `Error ${res.status}: ${res.statusText}`
    );
    }
  return res.json();
}

export default async function EnciclopediaCaninaPage() {
  const razas: Breed[] = await obtenerRazas();

  const razasConImagen = razas
    .filter((raza) => raza.image?.url)
    .sort(() => Math.random() - 0.5)
    .slice(0, 12);

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            🐶 Enciclopedia Canina
          </h1>

          <p className="text-lg text-gray-600">
            Aprende sobre diferentes razas de perros
            gracias a la información obtenida en tiempo
            real desde The Dog API.
          </p>

          <div className="mt-6">
            <Link
              href="/perros"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition"
            >
              🔄 Explorar más razas
            </Link>
          </div>
        </div>

        <div className="bg-gradient-to-r from-yellow-100 to-orange-100 border border-orange-300 rounded-2xl p-6 mb-8 shadow-sm">
          <h2 className="text-2xl font-bold text-orange-800 mb-3">
            🌍 ¿Sabías que?
          </h2>

          <p className="text-gray-800 text-lg leading-relaxed">
            Existen cientos de razas caninas con
            características, tamaños y temperamentos
            distintos. Esta enciclopedia obtiene su
            información directamente desde The Dog API.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {razasConImagen.map((raza) => (
            <div
              key={raza.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300"
            >
              <img
                src={raza.image?.url}
                alt={raza.name}
                className="w-full h-72 object-cover"
              />

              <div className="p-5">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  🐶 {raza.name}
                </h2>

                <div className="space-y-3 text-gray-700">
                  <p>
                    <strong>🌍 Origen:</strong>{" "}
                    {raza.origin || "No disponible"}
                  </p>

                  <p>
                    <strong>🏷️ Grupo:</strong>{" "}
                    {raza.breed_group ||
                      "No disponible"}
                  </p>

                  <p>
                    <strong>
                      ⏳ Esperanza de vida:
                    </strong>{" "}
                    {raza.life_span ||
                      "No disponible"}
                  </p>

                  <p>
                    <strong>
                      🧠 Temperamento:
                    </strong>{" "}
                    {raza.temperament ||
                      "No disponible"}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}