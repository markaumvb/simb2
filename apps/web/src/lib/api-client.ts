const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3002";

// Tipo para opções adicionais
type ApiOptions = {
  tenantId?: number;
  headers?: Record<string, string>;
};

// Função auxiliar para adicionar tenant e token
const getHeaders = async (options?: ApiOptions) => {
  // Headers padrão
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...options?.headers,
  };

  // Adiciona o tenant ID se disponível
  if (options?.tenantId) {
    headers["X-Tenant-ID"] = options.tenantId.toString();
  }

  // No lado do cliente, adiciona o token de autenticação se disponível
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("authToken");
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  }

  return headers;
};

// Cliente base da API
export const apiClient = {
  async get<T>(endpoint: string, options?: ApiOptions): Promise<T> {
    const headers = await getHeaders(options);

    const response = await fetch(`${apiBaseUrl}${endpoint}`, {
      method: "GET",
      headers,
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return response.json();
  },

  // Outros métodos (post, put, patch, delete)
  // ...
};
