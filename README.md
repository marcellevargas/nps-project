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
# Local
MONGODB_URI=
PORT=
NODE_ENV=

# Docker
APP_CONTAINER_NAME=
APP_PORT=
NODE_ENV=
MONGODB_URI_DOCKER=
MONGO_VERSION=
MONGO_CONTAINER_NAME=
MONGO_PORT=
MONGO_EXPRESS_CONTAINER_NAME=
MONGO_EXPRESS_PORT=
NETWORK_NAME=
MONGO_VERSION=
MONGO_CONTAINER_NAME=
MONGO_PORT=
MONGO_VOLUME=
MONGO_SERVER=
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
🔗 A API estará disponível em: http://localhost:3001/api

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
📱 O frontend estará disponível em: http://localhost:3000

### 🐳 Rodando com Docker

Para facilitar o desenvolvimento, você pode usar Docker para executar todo o ambiente:

1. **Configure as variáveis de ambiente:**
   - Para o backend: Crie um arquivo `.env` na pasta `nps-back` com as variáveis necessárias (use o `.env.template` como base).
   - Para o frontend: As variáveis já estão configuradas no docker-compose.yml.

2. **Inicie o ambiente completo (recomendado):**
```bash
# Na raiz do projeto, inicie primeiro o backend
cd nps-back
npm run docker:up

# Em outro terminal, inicie o frontend
cd nps-front
npm run docker:up
```

3. **Comandos disponíveis para o Frontend (na pasta nps-front):**
```bash
# Iniciar os containers
npm run docker:up

# Parar os containers
npm run docker:down

# Reconstruir e iniciar os containers (após mudanças)
npm run docker:build

# Ver logs em tempo real
npm run docker:logs
```

4. **Comandos disponíveis para o Backend (na pasta nps-back):**
```bash
# Iniciar os containers (MongoDB + API)
npm run docker:up

# Parar os containers
npm run docker:down

# Popular o banco com dados de teste
npm run docker:seed
```

✅ **Verificação:** Após iniciar os containers:
- MongoDB estará rodando em: mongodb://localhost:27017
- API (Backend) estará disponível em: http://localhost:3001
- Frontend estará disponível em: http://localhost:3000

**🔍 Troubleshooting Docker:**
```bash
# Verificar status dos containers
docker ps

# Ver logs de um container específico
docker logs nps-frontend
docker logs nps-backend

# Reiniciar um container
docker restart nps-frontend
docker restart nps-backend

# Limpar todos os containers e volumes (caso necessário)
docker-compose down -v
```

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

**🍕 Produtos incluídos:**
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

## 📊 Cálculo do NPS

O Net Promoter Score (NPS) é uma métrica que avalia a satisfação e lealdade dos clientes. O cálculo é baseado em uma única pergunta: "Em uma escala de 0 a 10, qual a probabilidade de você recomendar nosso produto/serviço para um amigo?"

### 🎯 Classificação dos Clientes

Com base nas notas fornecidas, os clientes são classificados em três grupos:

- 👎 **Detratores (0-6)**: Clientes insatisfeitos que podem prejudicar sua marca
- 😐 **Neutros (7-8)**: Clientes satisfeitos, mas indiferentes
- 👍 **Promotores (9-10)**: Clientes entusiastas que promoverão sua marca

### 🧮 Fórmula do NPS

```
NPS = (Número de Promotores - Número de Detratores) / (Total de Respondentes) × 100
```

Por exemplo:
- Total de respostas: 100
- Promotores: 70
- Neutros: 10
- Detratores: 20

NPS = (70 - 20) / 100 × 100 = 50

### 📈 Interpretação do Resultado

O score NPS varia de -100 a +100:

- 🔴 **-100 a 0**: Zona Crítica
- 🟡 **1 a 30**: Zona de Aperfeiçoamento
- 🟢 **31 a 70**: Zona de Qualidade
- 💚 **71 a 100**: Zona de Excelência

### ⚙️ Implementação no Sistema

No nosso sistema, o cálculo do NPS é realizado automaticamente com base nas avaliações recebidas:

1. As notas de 1-5 são convertidas proporcionalmente para a escala NPS (0-10)
2. O backend processa os dados em tempo real
3. O dashboard exibe métricas detalhadas incluindo:
   - Score NPS atual
   - Tendências ao longo do tempo
   - Distribuição das avaliações
   - Análise de comentários

## 📋 Próximos passos

1. ✅ ~~Configure as variáveis de ambiente necessárias~~
2. ✅ ~~Implemente a lógica de negócio do NPS~~
3. ✅ ~~Adicione banco de dados MongoDB~~
4. ✅ ~~Configure dados de teste (seed)~~
5. ✅ Configure a comunicação entre frontend e backend
6. ✅ Implemente testes automatizados
7. 📊 Melhorias nos dashboards e relatórios
8. 🔧 Adicione validações e tratamento de erros
9. 🎨 Customize o design do sistema
10. 🚀 Configure deployment e CI/CD

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

⭐ **Desenvolvido com ❤️ para melhorar a experiência do cliente** 