# API NPS - Documentação

Esta API permite gerenciar respostas de pesquisa de satisfação NPS (Net Promoter Score) com avaliações de 0 a 5 estrelas.

## Endpoints Disponíveis

### 1. Cadastrar Resposta do Cliente

**POST** `/nps-surveys`

Cadastra uma nova resposta de avaliação de produto.

**Body:**
```json
{
  "productName": "Nome do Produto",
  "rating": 4,
  "comment": "Comentário adicional (opcional)"
}
```

**Validações:**
- `productName`: Obrigatório, não pode estar vazio
- `rating`: Obrigatório, deve estar entre 0 e 5 (estrelas)
- `comment`: Opcional

**Resposta de Sucesso (201):**
```json
{
  "_id": "60d5ecb54d1b2c001f5e4b8a",
  "productName": "Nome do Produto",
  "rating": 4,
  "comment": "Comentário adicional",
  "createdAt": "2023-12-01T10:00:00.000Z",
  "updatedAt": "2023-12-01T10:00:00.000Z"
}
```

### 2. Listar Todas as Respostas

**GET** `/nps-surveys`

Retorna todas as respostas cadastradas.

**Resposta de Sucesso (200):**
```json
[
  {
    "_id": "60d5ecb54d1b2c001f5e4b8a",
    "productName": "Produto A",
    "rating": 4,
    "comment": "Muito bom",
    "createdAt": "2023-12-01T10:00:00.000Z",
    "updatedAt": "2023-12-01T10:00:00.000Z"
  },
  {
    "_id": "60d5ecb54d1b2c001f5e4b8b",
    "productName": "Produto B",
    "rating": 2,
    "comment": "Poderia ser melhor",
    "createdAt": "2023-12-01T11:00:00.000Z",
    "updatedAt": "2023-12-01T11:00:00.000Z"
  }
]
```

### 3. Relatório Completo

**GET** `/nps-surveys/report`

Retorna um relatório completo com todas as respostas e o cálculo do NPS.

**Resposta de Sucesso (200):**
```json
{
  "responses": [
    {
      "_id": "60d5ecb54d1b2c001f5e4b8a",
      "productName": "Produto A",
      "rating": 4,
      "comment": "Muito bom",
      "createdAt": "2023-12-01T10:00:00.000Z",
      "updatedAt": "2023-12-01T10:00:00.000Z"
    }
  ],
  "npsData": {
    "npsScore": 25,
    "totalResponses": 4,
    "promoters": 2,
    "neutrals": 1,
    "detractors": 1
  }
}
```

### 4. Calcular NPS Score

**GET** `/nps-surveys/nps-score`

Retorna apenas o cálculo do NPS Score.

**Resposta de Sucesso (200):**
```json
{
  "npsScore": 25,
  "totalResponses": 4,
  "promoters": 2,
  "neutrals": 1,
  "detractors": 1
}
```

### 5. Buscar Resposta por ID

**GET** `/nps-surveys/:id`

Busca uma resposta específica pelo ID.

**Resposta de Sucesso (200):**
```json
{
  "_id": "60d5ecb54d1b2c001f5e4b8a",
  "productName": "Produto A",
  "rating": 4,
  "comment": "Muito bom",
  "createdAt": "2023-12-01T10:00:00.000Z",
  "updatedAt": "2023-12-01T10:00:00.000Z"
}
```

### 6. Atualizar Resposta

**PUT** `/nps-surveys/:id`

Atualiza uma resposta existente.

**Body:**
```json
{
  "productName": "Nome do Produto Atualizado",
  "rating": 5,
  "comment": "Comentário atualizado"
}
```

### 7. Deletar Resposta

**DELETE** `/nps-surveys/:id`

Deleta uma resposta específica.

**Resposta de Sucesso (200):**
```json
{
  "message": "Resposta deletada com sucesso"
}
```

## Cálculo do NPS

O NPS (Net Promoter Score) é calculado com base nas seguintes categorias:

- **Promotores**: Avaliações de 4 a 5 estrelas
- **Neutros**: Avaliações de 3 estrelas
- **Detratores**: Avaliações de 0 a 2 estrelas

**Fórmula:**
```
NPS = (% de Promotores - % de Detratores)
```

**Exemplo:**
- 10 respostas total
- 6 promotores (4-5 estrelas) = 60%
- 2 neutros (3 estrelas) = 20%
- 2 detratores (0-2 estrelas) = 20%
- NPS = 60% - 20% = 40

## Códigos de Erro

- `400 Bad Request`: Dados inválidos (avaliação fora do range 0-5, nome do produto vazio)
- `404 Not Found`: Resposta não encontrada
- `500 Internal Server Error`: Erro interno do servidor

## Como Testar

1. **Instale as dependências:**
   ```bash
   npm install
   ```

2. **Certifique-se de que o MongoDB está rodando:**
   ```bash
   # MongoDB local na porta padrão 27017
   mongod
   ```

3. **Execute a aplicação:**
   ```bash
   npm run start:dev
   ```

4. **Teste os endpoints:**
   ```bash
   # Cadastrar uma resposta
   curl -X POST http://localhost:3000/nps-surveys \
     -H "Content-Type: application/json" \
     -d '{"productName": "Produto Teste", "rating": 5, "comment": "Excelente produto!"}'

   # Listar todas as respostas
   curl http://localhost:3000/nps-surveys

   # Ver relatório completo
   curl http://localhost:3000/nps-surveys/report

   # Ver apenas o NPS Score
   curl http://localhost:3000/nps-surveys/nps-score
   ```

## Estrutura do Banco de Dados

O documento no MongoDB terá a seguinte estrutura:

```javascript
{
  _id: ObjectId,
  productName: String,     // Nome do produto (obrigatório)
  rating: Number,          // Avaliação de 0 a 5 (obrigatório)
  comment: String,         // Comentário opcional
  createdAt: Date,         // Data de criação (automático)
  updatedAt: Date          // Data de atualização (automático)
}
``` 