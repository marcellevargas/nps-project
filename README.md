# 📊 NPS Project

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)
![NPM](https://img.shields.io/badge/NPM-CB3837?style=for-the-badge&logo=npm&logoColor=white)

> 🎯 Sistema completo de **Net Promoter Score** com frontend moderno e API robusta

## 🏗️ Estrutura do Projeto

Este projeto contém dois aplicativos:
- **🌐 nps-front**: Aplicação frontend em Next.js
- **🔧 nps-back**: API backend em Nest.js

## 🚀 Como executar os projetos

### 📋 Pré-requisitos
- Node.js (versão 16 ou superior)
- MongoDB (local ou remoto)
- NPM ou Yarn

### 🛠️ Instalação dos Pré-requisitos

#### **Node.js Installation**

**🍎 macOS:**
```bash
# Usando Homebrew (recomendado)
brew install node

# Ou baixe diretamente do site oficial
# https://nodejs.org/en/download/
```

**🪟 Windows:**
```bash
# Baixe o instalador oficial
# https://nodejs.org/en/download/

# Ou usando Chocolatey
choco install nodejs

# Ou usando Winget
winget install OpenJS.NodeJS
```

**🐧 Linux (Ubuntu/Debian):**
```bash
# Atualizar repositórios
sudo apt update

# Instalar Node.js
sudo apt install nodejs npm

# Verificar instalação
node --version
npm --version
```

#### **MongoDB Installation**

**🍎 macOS:**
```bash
# Usando Homebrew
brew tap mongodb/brew
brew install mongodb-community

# Iniciar o serviço
brew services start mongodb-community

# Verificar se está rodando
brew services list | grep mongodb
```

**🪟 Windows:**
```bash
# Baixe o instalador oficial
# https://www.mongodb.com/try/download/community

# Ou usando Chocolatey
choco install mongodb

# Iniciar como serviço Windows
net start MongoDB
```

**🐧 Linux (Ubuntu/Debian):**
```bash
# Importar chave pública do MongoDB
curl -fsSL https://pgp.mongodb.com/server-6.0.asc | sudo gpg -o /usr/share/keyrings/mongodb-server-6.0.gpg --dearmor

# Adicionar repositório
echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-6.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list

# Atualizar e instalar
sudo apt update
sudo apt install mongodb-org

# Iniciar serviço
sudo systemctl start mongod
sudo systemctl enable mongod

# Verificar status
sudo systemctl status mongod
```

**🐳 Docker (Alternativa para todos os sistemas):**
```bash
# Executar MongoDB em container
docker run -d \
  --name mongodb \
  -p 27017:27017 \
  -v mongodb_data:/data/db \
  mongo:latest

# Verificar se está rodando
docker ps | grep mongodb
```

### ✅ Verificação da Instalação

Após instalar, verifique se tudo está funcionando:

```bash
# Verificar Node.js
node --version
npm --version

# Verificar MongoDB
mongosh --version

# Testar conexão MongoDB
mongosh "mongodb://localhost:27017/test"
```

### 🌐 Alternativa: MongoDB Atlas (Cloud)

Se preferir usar MongoDB na nuvem:

1. **Crie uma conta gratuita:** https://www.mongodb.com/atlas
2. **Crie um cluster gratuito**
3. **Configure acesso de rede** (adicione seu IP)
4. **Crie um usuário do banco**
5. **Copie a connection string** e use no `.env`:
```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/nps-database?retryWrites=true&w=majority
```

### 🔧 Troubleshooting

**❌ Problemas comuns:**

**MongoDB não conecta:**
```bash
# Verificar se o serviço está rodando
# macOS/Linux
sudo systemctl status mongod

# Windows
net start MongoDB

# Verificar porta
netstat -tlnp | grep 27017
```

**Node.js versão incorreta:**
```bash
# Instalar Node Version Manager (NVM)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Usar versão específica
nvm install 18
nvm use 18
```

**Problemas de permissão:**
```bash
# Configurar npm para não usar sudo
npm config set prefix ~/.npm-global
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
source ~/.bashrc
```

### ⚙️ Backend (nps-back)

1. **Instale as dependências:**
```bash
cd nps-back
npm install
```

2. **Configure as variáveis de ambiente:**
Crie um arquivo `.env` na pasta `nps-back` com essas variáveis:

```env
# exemplo para rodar local
# Database Configuration
MONGODB_URI=mongodb://localhost:27017/nps-database

# Application Configuration
PORT=3000
NODE_ENV=development
```

3. **Execute o seed para popular o banco com dados de teste:**
```bash
npm run seed
```
🌱 Isso criará dados de exemplo sobre restaurantes e avaliações

✅ **Verificação:** Se o seed executar com sucesso, você verá:
- Mensagem de confirmação
- Estatísticas dos dados inseridos
- Contagem de avaliações por restaurante

4. **Inicie o servidor:**
```bash
npm run start:dev
```
🔗 A API estará disponível em: http://localhost:3000

### 💻 Frontend (nps-front)

1. **Instale as dependências:**
```bash
cd nps-front
npm install
```

2. **Inicie o servidor de desenvolvimento:**
```bash
npm run dev
```
📱 O frontend estará disponível em: http://localhost:3001

### 🐳 Rodando com Docker

Para facilitar o desenvolvimento, você pode usar Docker para executar todo o ambiente:

1. **Configure as variáveis de ambiente:**
Crie um arquivo `.env` na pasta `nps-back` com as variáveis necessárias (use o `.env.template` como base).

2. **Inicie o MongoDB e a API:**
```bash
cd nps-back
npm run docker:up
```
Este comando irá:
- Iniciar o container do MongoDB
- Construir e iniciar o container da API
- Conectar ambos na mesma rede Docker

3. **Popular o banco com dados de teste:**
```bash
cd nps-back
npm run docker:seed
```
🌱 Isso criará os mesmos dados de exemplo no container do MongoDB

4. **Para parar todos os containers:**
```bash
cd nps-back
npm run docker:down
```

✅ **Verificação:** Após iniciar os containers:
- MongoDB estará rodando em: mongodb://localhost:27017
- API estará disponível em: http://localhost:8081

## 🛠️ Tecnologias Utilizadas

### 🌐 nps-front (Next.js)
- ⚡ **TypeScript** - Tipagem estática
- 🎨 **Tailwind CSS** - Framework CSS utilitário
- 🔍 **ESLint** - Linter para código
- 🗂️ **App Router** - Roteamento moderno
- 📁 **Src directory** - Estrutura organizada

### 🔧 nps-back (Nest.js)
- ⚡ **TypeScript** - Tipagem estática
- 🏗️ **Controllers/Services/Modules** - Arquitetura modular
- 🗃️ **MongoDB + Mongoose** - Banco de dados NoSQL
- 🧪 **Jest** - Testes automatizados
- 🔍 **ESLint + Prettier** - Qualidade de código
- 📝 **Decorators** - Programação declarativa

## 🗃️ Banco de Dados

Este projeto utiliza **MongoDB** para armazenar as avaliações NPS. O banco inclui:

### 📊 Dados de Teste (Seed)
Ao executar `npm run seed`, o banco será populado com dados de exemplo sobre restaurantes:

**🍕 Restaurantes incluídos:**
- Pizza Express
- Burger King  
- Sushi House
- Padaria Doce Manhã
- Açaí da Praia
- Churrascaria Gaúcha
- Pizzaria da Esquina

**📈 Estatísticas dos dados:**
- 20 avaliações distribuídas entre os restaurantes
- Ratings de 1 a 5 estrelas
- Comentários realistas sobre comida e atendimento
- Datas variadas para simulação temporal

### 🔗 API Endpoints
- `GET /nps-survey` - Listar todas as avaliações
- `GET /nps-survey/:id` - Buscar avaliação específica
- `POST /nps-survey` - Criar nova avaliação
- `PUT /nps-survey/:id` - Atualizar avaliação
- `DELETE /nps-survey/:id` - Deletar avaliação

**🧪 Teste rápido da API:**
```bash
# Listar todas as avaliações
curl http://localhost:3000/nps-survey

# Criar nova avaliação
curl -X POST http://localhost:3000/nps-survey \
  -H "Content-Type: application/json" \
  -d '{"productName": "Novo Restaurante", "rating": 5, "comment": "Excelente!"}'
```

## 📋 Próximos passos

1. ✅ ~~Configure as variáveis de ambiente necessárias~~
2. ✅ ~~Implemente a lógica de negócio do NPS~~
3. ✅ ~~Adicione banco de dados MongoDB~~
4. ✅ ~~Configure dados de teste (seed)~~
5. 🔄 Configure a comunicação entre frontend e backend
6. 🎨 Customize o design do sistema
7. 📊 Implemente dashboards e relatórios
8. 🔧 Adicione validações e tratamento de erros
9. 🧪 Implemente testes automatizados
10. 🚀 Configure deployment e CI/CD

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

⭐ **Desenvolvido com ❤️ para melhorar a experiência do cliente** 