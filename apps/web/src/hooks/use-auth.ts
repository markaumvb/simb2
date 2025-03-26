"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export type User = {
  id: number;
  name: string;
  email: string;
  tenantId: number;
};

export type AuthState = {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
};

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    token: null,
    isLoading: true,
    error: null,
  });
  const router = useRouter();

  // Verifica se o usuário está autenticado ao carregar
  useEffect(() => {
    const checkAuth = () => {
      try {
        const token = localStorage.getItem("authToken");
        const userDataString = localStorage.getItem("userData");

        if (token && userDataString) {
          const userData = JSON.parse(userDataString) as User;
          setAuthState({
            user: userData,
            token,
            isLoading: false,
            error: null,
          });
        } else {
          setAuthState({
            user: null,
            token: null,
            isLoading: false,
            error: null,
          });
        }
      } catch (error) {
        console.error("Erro ao verificar autenticação:", error);
        setAuthState({
          user: null,
          token: null,
          isLoading: false,
          error: "Falha ao verificar autenticação",
        });
      }
    };

    checkAuth();
  }, []);

  // Função para login
  const login = async (email: string, password: string) => {
    setAuthState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      // URL da API - ajuste conforme necessário
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

      // Requisição para a API
      const response = await fetch(`${apiUrl}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Falha ao autenticar");
      }

      const data = await response.json();

      // Extrair token e informações do usuário
      const { access_token, user } = data;

      // Verificar se o token e usuário foram recebidos
      if (!access_token || !user) {
        throw new Error("Resposta de autenticação inválida");
      }

      // Armazenar no localStorage
      localStorage.setItem("authToken", access_token);
      localStorage.setItem("userData", JSON.stringify(user));

      // Atualizar estado
      setAuthState({
        user,
        token: access_token,
        isLoading: false,
        error: null,
      });

      return { success: true };
    } catch (error) {
      console.error("Erro durante login:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Falha na autenticação";

      setAuthState((prev) => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }));

      return { success: false, error: errorMessage };
    }
  };

  // Função para logout
  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");

    setAuthState({
      user: null,
      token: null,
      isLoading: false,
      error: null,
    });

    router.push("/login");
  };

  return {
    ...authState,
    login,
    logout,
    isAuthenticated: !!authState.token,
  };
}
