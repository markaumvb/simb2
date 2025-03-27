import { ReactNode } from "react";
import { AuthProvider } from "@/providers/auth-provider";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
        <div className="w-full max-w-md space-y-8">
          <div className="flex flex-col items-center">
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              SIMB
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Sistema Integrado de Mesas e Bilhar
            </p>
          </div>
          {children}
        </div>
      </div>
    </AuthProvider>
  );
}
