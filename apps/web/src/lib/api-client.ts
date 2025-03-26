/**
 * Cliente de API para comunicação com o backend
 */

// Configuração base para todas as requisições
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
  /**
   * Faz uma requisição GET para a API
   */
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

  /**
   * Faz uma requisição POST para a API
   */
  async post<T>(endpoint: string, data: any, options?: ApiOptions): Promise<T> {
    const headers = await getHeaders(options);

    const response = await fetch(`${apiBaseUrl}${endpoint}`, {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return response.json();
  },

  /**
   * Faz uma requisição PUT para a API
   */
  async put<T>(endpoint: string, data: any, options?: ApiOptions): Promise<T> {
    const headers = await getHeaders(options);

    const response = await fetch(`${apiBaseUrl}${endpoint}`, {
      method: "PUT",
      headers,
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return response.json();
  },

  /**
   * Faz uma requisição PATCH para a API
   */
  async patch<T>(
    endpoint: string,
    data: any,
    options?: ApiOptions
  ): Promise<T> {
    const headers = await getHeaders(options);

    const response = await fetch(`${apiBaseUrl}${endpoint}`, {
      method: "PATCH",
      headers,
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return response.json();
  },

  /**
   * Faz uma requisição DELETE para a API
   */
  async delete<T>(endpoint: string, options?: ApiOptions): Promise<T> {
    const headers = await getHeaders(options);

    const response = await fetch(`${apiBaseUrl}${endpoint}`, {
      method: "DELETE",
      headers,
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return response.json();
  },
};
