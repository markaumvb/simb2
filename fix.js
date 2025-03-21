// replace-prisma.js
const fs = require('fs');
const path = require('path');

// Caminho para a pasta modules
const modulesDir = path.join(__dirname, 'apps', 'api', 'src', 'modules');

// Função para processar diretórios recursivamente
function processDirectory(dir) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stats = fs.statSync(filePath);

    if (stats.isDirectory()) {
      processDirectory(filePath);
    } else if (file.endsWith('.service.ts')) {
      processServiceFile(filePath);
    }
  });
}

// Função para processar um arquivo de serviço
function processServiceFile(filePath) {
  console.log(`Processing: ${filePath}`);
  let content = fs.readFileSync(filePath, 'utf8');

  // 1. Mudar a importação
  content = content.replace(
    /import { PrismaService } from ['"]src\/database\/prisma.service['"];/g,
    `import { PrismaTenantService } from 'src/providers/prisma-tenant.provider';`,
  );

  // 2. Mudar o construtor
  content = content.replace(
    /constructor\(private prisma: PrismaService\)/g,
    `constructor(private prismaTenant: PrismaTenantService)`,
  );

  // 3. Mudar todas as ocorrências de this.prisma para this.prismaTenant.prisma
  content = content.replace(/this\.prisma\./g, 'this.prismaTenant.prisma.');

  // 4. Verificar se há referências a count sem parênteses
  content = content.replace(/\.count;/g, '.count();');

  // Salvar o arquivo modificado
  fs.writeFileSync(filePath, content);
  console.log(`Updated: ${filePath}`);
}

// Iniciar o processamento
processDirectory(modulesDir);
console.log('All service files updated successfully!');
