# 📊 NPS Project

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)

> 🎯 Complete **Net Promoter Score** system with a modern frontend and robust API

## 🏗️ Project Structure

This project contains two applications:
- **🌐 nps-front**: Frontend application in Next.js
- **🔧 nps-back**: Backend API in Nest.js

## 🚀 How to Run the Projects

### 📋 Prerequisites
- Node.js (version 16 or higher)
- MongoDB (local or remote)
- NPM or Yarn

### 🛠️ Prerequisites Installation

#### **Node.js Installation**

**🍎 macOS:**
```bash
# Using Homebrew (recommended)
brew install node

# Or download directly from the official website
# https://nodejs.org/en/download/
```

**🪟 Windows:**
```bash
# Download the official installer
# https://nodejs.org/en/download/

# Or using Chocolatey
choco install nodejs

# Or using Winget
winget install OpenJS.NodeJS
```

**🐧 Linux (Ubuntu/Debian):**
```bash
# Update repositories
sudo apt update

# Install Node.js
sudo apt install nodejs npm

# Verify installation
node --version
npm --version
```

#### **MongoDB Installation**

**🍎 macOS:**
```bash
# Using Homebrew
brew tap mongodb/brew
brew install mongodb-community

# Start the service
brew services start mongodb-community

# Verify if it's running
brew services list | grep mongodb
```

**🪟 Windows:**
```bash
# Download the official installer
# https://www.mongodb.com/try/download/community

# Or using Chocolatey
choco install mongodb

# Start as Windows service
net start MongoDB
```

**🐧 Linux (Ubuntu/Debian):**
```bash
# Import MongoDB public key
curl -fsSL https://pgp.mongodb.com/server-6.0.asc | sudo gpg -o /usr/share/keyrings/mongodb-server-6.0.gpg --dearmor

# Add repository
echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-6.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list

# Update and install
sudo apt update
sudo apt install mongodb-org

# Start service
sudo systemctl start mongod
sudo systemctl enable mongod

# Check status
sudo systemctl status mongod
```

**🐳 Docker (Alternative for all systems):**
```bash
# Run MongoDB in container
docker run -d \
  --name mongodb \
  -p 27017:27017 \
  -v mongodb_data:/data/db \
  mongo:latest

# Verify if it's running
docker ps | grep mongodb
```

### ✅ Installation Verification

After installing, verify if everything is working:

```bash
# Verify Node.js
node --version
npm --version

# Verify MongoDB
mongosh --version

# Test MongoDB connection
mongosh "mongodb://localhost:27017/test"
```

### 🌐 Alternative: MongoDB Atlas (Cloud)

If you prefer to use MongoDB in the cloud:

1. **Create a free account:** https://www.mongodb.com/atlas
2. **Create a free cluster**
3. **Configure network access** (add your IP)
4. **Create a database user**
5. **Copy the connection string** and use it in `.env`:
```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/nps-database?retryWrites=true&w=majority
```

### 🔧 Troubleshooting

**❌ Common issues:**

**MongoDB won't connect:**
```bash
# Check if the service is running
# macOS/Linux
sudo systemctl status mongod

# Windows
net start MongoDB

# Check port
netstat -tlnp | grep 27017
```

**Wrong Node.js version:**
```bash
# Install Node Version Manager (NVM)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Use specific version
nvm install 18
nvm use 18
```

**Permission issues:**
```bash
# Configure npm to not use sudo
npm config set prefix ~/.npm-global
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
source ~/.bashrc
```

### ⚙️ Backend (nps-back)

1. **Install dependencies:**
```bash
cd nps-back
npm install
```

2. **Configure environment variables:**
Create a `.env` file in the `nps-back` folder with these variables:

```env
# example for local running
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

3. **Run the seed to populate the database with test data:**
```bash
npm run seed
```
🌱 This will create example data about restaurants and ratings

✅ **Verification:** If the seed runs successfully, you'll see:
- Confirmation message
- Statistics of inserted data
- Rating count per restaurant

4. **Start the server:**
```bash
npm run start:dev
```
🔗 The API will be available at: http://localhost:3001/api

### 💻 Frontend (nps-front)

1. **Install dependencies:**
```bash
cd nps-front
npm install
```

2. **Start the development server:**
```bash
npm run dev
```
📱 The frontend will be available at: http://localhost:3000

### 🐳 Running with Docker

To facilitate development, you can use Docker to run the entire environment:

1. **Configure environment variables:**
   - For backend: Create a `.env` file in the `nps-back` folder with the necessary variables (use `.env.template` as base).
   - For frontend: Variables are already configured in docker-compose.yml.

2. **Start the complete environment (recommended):**
```bash
# In the project root, start the backend first
cd nps-back
npm run docker:up

# In another terminal, start the frontend
cd nps-front
npm run docker:up
```

3. **Available commands for Frontend (in nps-front folder):**
```bash
# Start containers
npm run docker:up

# Stop containers
npm run docker:down

# Rebuild and start containers (after changes)
npm run docker:build

# View real-time logs
npm run docker:logs
```

4. **Available commands for Backend (in nps-back folder):**
```bash
# Start containers (MongoDB + API)
npm run docker:up

# Stop containers
npm run docker:down

# Populate database with test data
npm run docker:seed
```

✅ **Verification:** After starting the containers:
- MongoDB will be running at: mongodb://localhost:27017
- API (Backend) will be available at: http://localhost:3001
- Frontend will be available at: http://localhost:3000

**🔍 Docker Troubleshooting:**
```bash
# Check containers status
docker ps

# View logs of a specific container
docker logs nps-frontend
docker logs nps-backend

# Restart a container
docker restart nps-frontend
docker restart nps-backend

# Clean all containers and volumes (if needed)
docker-compose down -v
```

## 🛠️ Technologies Used

### 🌐 nps-front (Next.js)
- ⚡ **TypeScript** - Static typing
- 🎨 **Tailwind CSS** - Utility-first CSS framework
- 🔍 **ESLint** - Code linter
- 🗂️ **App Router** - Modern routing
- 📁 **Src directory** - Organized structure

### 🔧 nps-back (Nest.js)
- ⚡ **TypeScript** - Static typing
- 🏗️ **Controllers/Services/Modules** - Modular architecture
- 🗃️ **MongoDB + Mongoose** - NoSQL database
- 🧪 **Jest** - Automated testing
- 🔍 **ESLint + Prettier** - Code quality
- 📝 **Decorators** - Declarative programming

## 🗃️ Database

This project uses **MongoDB** to store NPS ratings. The database includes:

### 📊 Test Data (Seed)
When running `npm run seed`, the database will be populated with example data about restaurants:

**🍕 Included Products:**
- Pizza Express
- Burger King  
- Sushi House
- Sweet Morning Bakery
- Beach Açaí
- Gaucho Steakhouse
- Corner Pizzeria

**📈 Data Statistics:**
- 20 ratings distributed among restaurants
- Ratings from 1 to 5 stars
- Realistic comments about food and service
- Various dates for temporal simulation

### 🔗 API Endpoints
- `GET /nps-survey` - List all ratings
- `GET /nps-survey/:id` - Get specific rating
- `POST /nps-survey` - Create new rating
- `PUT /nps-survey/:id` - Update rating
- `DELETE /nps-survey/:id` - Delete rating

**🧪 Quick API Test:**
```bash
# List all ratings
curl http://localhost:3000/nps-survey

# Create new rating
curl -X POST http://localhost:3000/nps-survey \
  -H "Content-Type: application/json" \
  -d '{"productName": "New Restaurant", "rating": 5, "comment": "Excellent!"}'
```

## 📊 NPS Calculation

The Net Promoter Score (NPS) is a metric that evaluates customer satisfaction and loyalty. The calculation is based on a single question: "On a scale of 0 to 10, how likely are you to recommend our product/service to a friend?"

### 🎯 Customer Classification

Based on the provided scores, customers are classified into three groups:

- 👎 **Detractors (0-6)**: Unsatisfied customers who might harm your brand
- 😐 **Passives (7-8)**: Satisfied but indifferent customers
- 👍 **Promoters (9-10)**: Enthusiastic customers who will promote your brand

### 🧮 NPS Formula

```
NPS = (Number of Promoters - Number of Detractors) / (Total Respondents) × 100
```

For example:
- Total responses: 100
- Promoters: 70
- Passives: 10
- Detractors: 20

NPS = (70 - 20) / 100 × 100 = 50

### 📈 Result Interpretation

The NPS score ranges from -100 to +100:

- 🔴 **-100 to 0**: Critical Zone
- 🟡 **1 to 30**: Improvement Zone
- 🟢 **31 to 70**: Quality Zone
- 💚 **71 to 100**: Excellence Zone

### ⚙️ System Implementation

In our system, the NPS calculation is performed automatically based on received ratings:

1. Scores from 1-5 are proportionally converted to the NPS scale (0-10)
2. The backend processes data in real-time
3. The dashboard displays detailed metrics including:
   - Current NPS score
   - Trends over time
   - Rating distribution
   - Comment analysis

## 📋 Next Steps

1. ✅ ~~Configure required environment variables~~
2. ✅ ~~Implement NPS business logic~~
3. ✅ ~~Add MongoDB database~~
4. ✅ ~~Configure test data (seed)~~
5. ✅ ~~Configure frontend and backend communication~~
6. ✅ ~~Implement automated tests~~
7. 🌐 Create translation hook
8. 📊 Improve dashboards and reports
9. 🔧 Add validations and error handling
10. 📊 Testing Improvement
11. 🎨 Customize system design
12. 🚀 Configure deployment and CI/CD
---


## 🤝 Developer
Developed with ❤️ by:

<table>
  <tr>
    <td align="center">
      <a href="https://www.marcellevargas.com.br/" title="check my portfolio page">
        <img src="https://avatars.githubusercontent.com/u/37669732?v=4" width="100px;" alt="Photo of Marcelle on Github"/><br>
        <sub>
          <b>Marcelle Vargas</b>
        </sub>
      </a>
    </td>
  </tr>
</table>
