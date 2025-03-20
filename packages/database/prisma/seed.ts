import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  // Criar o primeiro tenant
  const tenant = await prisma.tenant.create({
    data: {
      nome: "Empresa Padrão",
      cnpj: "12345678000199",
      razaoSocial: "Empresa Padrão Ltda",
      ativo: true,
    },
  });

  console.log(`Tenant criado: ${tenant.nome} (ID: ${tenant.id})`);

  // Criar uma cidade para o tenant
  const cidade = await prisma.cidade.create({
    data: {
      descricao: "São Paulo",
      uf: "SP",
      tenant_id: tenant.id,
    },
  });

  // Criar um sistema para o tenant
  const sistema = await prisma.sistema.create({
    data: {
      descricao: "Sistema Principal",
      status: true,
      tenant_id: tenant.id,
    },
  });

  // Criar um usuário admin para o tenant
  const hashedPassword = await bcrypt.hash("admin123", 10);
  const admin = await prisma.funcionario.create({
    data: {
      nome: "Administrador",
      email: "admin@exemplo.com",
      senha: hashedPassword,
      cpf: "12345678900",
      status: true,
      dt_admissao: new Date(),
      id_cidade: cidade.id,
      tenant_id: tenant.id,
    },
  });

  console.log(`Usuário admin criado: ${admin.email} (ID: ${admin.id})`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
