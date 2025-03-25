"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoginForm } from "@/components/forms/login-form";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Aqui virá a lógica de autenticação com a API
      // Por enquanto apenas simularemos um login com timeout

      console.log("Tentando login com:", { email, password });

      // Simulação de chamada de API
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Após login bem-sucedido, redirecionamos para o dashboard
      // Em uma implementação real, aqui salvaríamos o token e dados do usuário
      router.push("/dashboard");
    } catch (err) {
      console.error("Erro no login:", err);
      setError("Credenciais inválidas. Por favor, tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo e cabeçalho */}
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 relative mb-4">
            {/* Você pode adicionar um logo aqui */}
            <div className="bg-primary rounded-full w-full h-full flex items-center justify-center text-primary-foreground text-2xl font-bold">
              SIMB
            </div>
          </div>
          <h2 className="mt-2 text-center text-3xl font-bold text-gray-900 dark:text-white">
            Sistema Integrado de Mesas e Bilhar
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Entre com suas credenciais para acessar o sistema
          </p>
        </div>

        {/* Formulário de login componentizado */}
        <LoginForm />

        {/* Formulário de login */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Senha
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full"
              />
            </div>
          </div>

          {/* Mensagem de erro */}
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 rounded-md text-sm">
              {error}
            </div>
          )}

          <div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Entrando..." : "Entrar"}
            </Button>
          </div>
        </form>

        {/* Rodapé com informações adicionais */}
        <div className="text-center mt-4">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            © 2025 SIMB - Todos os direitos reservados
          </p>
        </div>
      </div>
    </div>
  );
}
