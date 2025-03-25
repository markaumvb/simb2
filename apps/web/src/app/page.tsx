import { redirect } from "next/navigation";

export default function Home() {
  // Redirecionar para o dashboard se autenticado, caso contrário para login
  // Para simplicidade inicial, vamos redirecionar para o login
  redirect("/login");
}
