"use client";

import { LoginForm } from "@/components/forms/login-form";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50  p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo e cabeçalho */}
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 relative mb-4">
            <div className="bg-primary rounded-full w-full h-full flex items-center justify-center text-primary-foreground text-2xl font-bold">
              SIMB
            </div>
          </div>
          <h2 className="mt-2 text-center text-3xl font-bold text-gray-900 ">
            Sistema Integrado de Mesas e Bilhar
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 ">
            Entre com suas credenciais para acessar o sistema
          </p>
        </div>

        {/* Formulário de login componentizado */}
        <LoginForm />

        {/* Rodapé com informações adicionais */}
        <div className="text-center mt-4">
          <p className="text-xs text-gray-500 ">
            © 2025 SIMB - Todos os direitos reservados
          </p>
        </div>
      </div>
    </div>
  );
}
