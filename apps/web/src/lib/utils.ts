import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

// Formatador de data
export function formatDate(date: Date | string): string {
  if (typeof date === "string") {
    date = new Date(date);
  }
  return date.toLocaleDateString("pt-BR");
}

// Formatador de CPF
export function formatCPF(cpf: string): string {
  if (!cpf) return "";

  // Remove caracteres não numéricos
  cpf = cpf.replace(/\D/g, "");

  // Verifica se tem 11 dígitos
  if (cpf.length !== 11) return cpf;

  // Formata como CPF: XXX.XXX.XXX-XX
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

// Formatador de CNPJ
export function formatCNPJ(cnpj: string): string {
  if (!cnpj) return "";

  // Remove caracteres não numéricos
  cnpj = cnpj.replace(/\D/g, "");

  // Verifica se tem 14 dígitos
  if (cnpj.length !== 14) return cnpj;

  // Formata como CNPJ: XX.XXX.XXX/XXXX-XX
  return cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
}

// Formatador de CPF/CNPJ automático
export function formatDocument(doc: string): string {
  if (!doc) return "";

  // Remove caracteres não numéricos
  doc = doc.replace(/\D/g, "");

  // Verifica se é CPF ou CNPJ pelo tamanho
  if (doc.length === 11) {
    return formatCPF(doc);
  } else if (doc.length === 14) {
    return formatCNPJ(doc);
  }

  return doc;
}