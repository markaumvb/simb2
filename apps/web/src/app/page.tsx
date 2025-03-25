// Edite o arquivo src/app/page.tsx

import { prisma } from "database";

// Esta é uma função assíncrona que roda no servidor
async function getCidades() {
  try {
    // Busca todas as cidades
    const cidades = await prisma.cidade.findMany({
      take: 10, // Limitar a 10 para ser mais rápido
      where: {
        tenant_id: 1, // Fixando em um tenant ID para teste
      },
    });
    return cidades;
  } catch (error) {
    console.error("Erro ao buscar cidades:", error);
    return [];
  }
}

export default async function Home() {
  // Busca as cidades usando Server Component
  const cidades = await getCidades();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold mb-8">SIMB - Sistema Integrado</h1>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Cidades Cadastradas</h2>

          {cidades.length > 0 ? (
            <ul className="space-y-2">
              {cidades.map((cidade) => (
                <li key={cidade.id} className="p-3 bg-gray-100 rounded">
                  {cidade.descricao} - {cidade.uf}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">
              Nenhuma cidade encontrada ou falha na conexão.
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
