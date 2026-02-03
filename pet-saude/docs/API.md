# API REST - Monitoramento de Equipamentos Hospitalares

API REST para gerenciamento de equipamentos hospitalares com operações CRUD completas, filtros avançados e validação de dados.

## 📋 Índice

- [Base URL](#base-url)
- [Modelo de Dados](#modelo-de-dados)
- [Endpoints](#endpoints)
  - [Listar Equipamentos](#get-apiequipamentos)
  - [Criar Equipamento](#post-apiequipamentos)
  - [Buscar Equipamento por ID](#get-apiequipamentosid)
  - [Atualizar Equipamento](#put-apiequipamentosid)
  - [Remover Equipamento](#delete-apiequipamentosid)
- [Códigos de Status HTTP](#códigos-de-status-http)
- [Exemplos de Uso](#exemplos-de-uso)

---

## Base URL

```
http://localhost:3000/api
```

---

## Modelo de Dados

### Equipamento

```typescript
{
  id: string; // Gerado automaticamente (formato: eq-000001)
  nome: string; // Nome do equipamento (3-100 caracteres)
  categoria: CategoriaEquipamento; // Ver categorias abaixo
  status: StatusEquipamento; // Ver status abaixo
  prioridade: PrioridadeEquipamento; // Ver prioridades abaixo
  localizacao: string; // Localização física (3-100 caracteres)
  dataAquisicao: string; // Data ISO 8601 (obrigatória)
  dataUltimaManutencao: string; // Data ISO 8601 (opcional)
  criadoEm: string; // Gerado automaticamente (ISO 8601)
  atualizadoEm: string; // Gerado automaticamente (ISO 8601)
}
```

### Enums Disponíveis

**Categoria:**

- `Monitor`
- `Respirador`
- `Bomba de Infusão`
- `Raio-X`
- `Ultrassom`
- `Maca`
- `Outro`

**Status:**

- `Disponível`
- `Em Uso`
- `Manutenção`
- `Inativo`
- `Descartado`

**Prioridade:**

- `Baixa`
- `Média`
- `Alta`

---

## Endpoints

### GET `/api/equipamentos`

Lista todos os equipamentos com suporte a filtros.

#### Query Parameters (todos opcionais)

| Parâmetro    | Tipo   | Descrição                                          | Exemplo                    |
| ------------ | ------ | -------------------------------------------------- | -------------------------- |
| `categorias` | string | Categorias separadas por vírgula (filtro múltiplo) | `Monitor,Ultrassom`        |
| `status`     | string | Status único do equipamento                        | `Disponível`               |
| `dataInicio` | string | Data de aquisição mínima (ISO 8601)                | `2024-01-01T00:00:00.000Z` |
| `dataFim`    | string | Data de aquisição máxima (ISO 8601)                | `2025-12-31T23:59:59.999Z` |

#### Exemplo de Requisição

```bash
# Listar todos os equipamentos
curl http://localhost:3000/api/equipamentos

# Filtrar por categoria e status
curl "http://localhost:3000/api/equipamentos?categorias=Monitor,Respirador&status=Disponível"

# Filtrar por intervalo de datas
curl "http://localhost:3000/api/equipamentos?dataInicio=2024-01-01T00:00:00.000Z&dataFim=2024-12-31T23:59:59.999Z"

# Combinar múltiplos filtros
curl "http://localhost:3000/api/equipamentos?categorias=Monitor&status=Em%20Uso&dataInicio=2023-01-01T00:00:00.000Z"
```

#### Resposta de Sucesso (200 OK)

```json
[
  {
    "id": "eq-000001",
    "nome": "Monitor Cardíaco Philips MX40",
    "categoria": "Monitor",
    "status": "Disponível",
    "prioridade": "Alta",
    "localizacao": "UTI - Sala 101",
    "dataAquisicao": "2023-03-15T10:00:00.000Z",
    "dataUltimaManutencao": "2025-11-20T14:30:00.000Z",
    "criadoEm": "2026-02-02T10:30:00.000Z",
    "atualizadoEm": "2026-02-02T10:30:00.000Z"
  },
  {
    "id": "eq-000002",
    "nome": "Respirador Mecânico Drager Evita V800",
    "categoria": "Respirador",
    "status": "Em Uso",
    "prioridade": "Alta",
    "localizacao": "UTI - Sala 102",
    "dataAquisicao": "2023-06-10T08:00:00.000Z",
    "dataUltimaManutencao": "2025-12-01T09:00:00.000Z",
    "criadoEm": "2026-02-02T10:30:00.000Z",
    "atualizadoEm": "2026-02-02T10:30:00.000Z"
  }
]
```

#### Resposta de Erro (400 Bad Request)

```json
{
  "error": "dataInicio deve estar no formato ISO 8601"
}
```

---

### POST `/api/equipamentos`

Cria um novo equipamento.

#### Request Body

```json
{
  "nome": "Monitor Multiparamétrico Mindray",
  "categoria": "Monitor",
  "status": "Disponível",
  "prioridade": "Alta",
  "localizacao": "UTI - Sala 105",
  "dataAquisicao": "2026-01-15T10:00:00.000Z",
  "dataUltimaManutencao": "2026-01-20T14:00:00.000Z" // Opcional
}
```

#### Validações

- `nome`: obrigatório, 3-100 caracteres
- `categoria`: obrigatório, deve ser um dos valores do enum
- `status`: obrigatório, deve ser um dos valores do enum
- `prioridade`: obrigatório, deve ser um dos valores do enum
- `localizacao`: obrigatório, 3-100 caracteres
- `dataAquisicao`: obrigatório, formato ISO 8601
- `dataUltimaManutencao`: opcional, formato ISO 8601, não pode ser anterior a `dataAquisicao`

#### Exemplo de Requisição

```bash
curl -X POST http://localhost:3000/api/equipamentos \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Monitor Multiparamétrico Mindray",
    "categoria": "Monitor",
    "status": "Disponível",
    "prioridade": "Alta",
    "localizacao": "UTI - Sala 105",
    "dataAquisicao": "2026-01-15T10:00:00.000Z"
  }'
```

#### Resposta de Sucesso (201 Created)

```json
{
  "id": "eq-000011",
  "nome": "Monitor Multiparamétrico Mindray",
  "categoria": "Monitor",
  "status": "Disponível",
  "prioridade": "Alta",
  "localizacao": "UTI - Sala 105",
  "dataAquisicao": "2026-01-15T10:00:00.000Z",
  "dataUltimaManutencao": "",
  "criadoEm": "2026-02-02T15:45:30.123Z",
  "atualizadoEm": "2026-02-02T15:45:30.123Z"
}
```

#### Resposta de Erro (400 Bad Request)

```json
{
  "error": "Dados inválidos",
  "detalhes": [
    {
      "campo": "nome",
      "mensagem": "Nome deve ter no mínimo 3 caracteres"
    },
    {
      "campo": "categoria",
      "mensagem": "Categoria inválida"
    }
  ]
}
```

---

### GET `/api/equipamentos/:id`

Busca um equipamento específico por ID.

#### Parâmetros de Rota

| Parâmetro | Tipo   | Descrição         |
| --------- | ------ | ----------------- |
| `id`      | string | ID do equipamento |

#### Exemplo de Requisição

```bash
curl http://localhost:3000/api/equipamentos/eq-000001
```

#### Resposta de Sucesso (200 OK)

```json
{
  "id": "eq-000001",
  "nome": "Monitor Cardíaco Philips MX40",
  "categoria": "Monitor",
  "status": "Disponível",
  "prioridade": "Alta",
  "localizacao": "UTI - Sala 101",
  "dataAquisicao": "2023-03-15T10:00:00.000Z",
  "dataUltimaManutencao": "2025-11-20T14:30:00.000Z",
  "criadoEm": "2026-02-02T10:30:00.000Z",
  "atualizadoEm": "2026-02-02T10:30:00.000Z"
}
```

#### Resposta de Erro (404 Not Found)

```json
{
  "error": "Equipamento não encontrado"
}
```

---

### PUT `/api/equipamentos/:id`

Atualiza um equipamento existente. **Atualização parcial** - apenas os campos fornecidos serão atualizados.

#### Parâmetros de Rota

| Parâmetro | Tipo   | Descrição         |
| --------- | ------ | ----------------- |
| `id`      | string | ID do equipamento |

#### Request Body (todos os campos opcionais)

```json
{
  "nome": "Monitor Cardíaco Philips MX40 - Atualizado",
  "status": "Manutenção",
  "localizacao": "Centro Cirúrgico - Sala 2",
  "dataUltimaManutencao": "2026-02-01T10:00:00.000Z"
}
```

#### Validações

- Mesmas validações do POST, mas todos os campos são opcionais
- Pelo menos um campo deve ser fornecido
- `dataUltimaManutencao` não pode ser anterior a `dataAquisicao` quando ambas estiverem presentes

#### Exemplo de Requisição

```bash
# Atualizar apenas o status
curl -X PUT http://localhost:3000/api/equipamentos/eq-000001 \
  -H "Content-Type: application/json" \
  -d '{
    "status": "Manutenção"
  }'

# Atualizar múltiplos campos
curl -X PUT http://localhost:3000/api/equipamentos/eq-000001 \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Monitor Cardíaco Philips MX40 - Atualizado",
    "status": "Manutenção",
    "localizacao": "Centro Cirúrgico - Sala 2",
    "dataUltimaManutencao": "2026-02-01T10:00:00.000Z"
  }'
```

#### Resposta de Sucesso (200 OK)

```json
{
  "id": "eq-000001",
  "nome": "Monitor Cardíaco Philips MX40 - Atualizado",
  "categoria": "Monitor",
  "status": "Manutenção",
  "prioridade": "Alta",
  "localizacao": "Centro Cirúrgico - Sala 2",
  "dataAquisicao": "2023-03-15T10:00:00.000Z",
  "dataUltimaManutencao": "2026-02-01T10:00:00.000Z",
  "criadoEm": "2026-02-02T10:30:00.000Z",
  "atualizadoEm": "2026-02-02T16:20:15.456Z"
}
```

#### Resposta de Erro (404 Not Found)

```json
{
  "error": "Equipamento não encontrado"
}
```

#### Resposta de Erro (400 Bad Request)

```json
{
  "error": "Nenhum campo fornecido para atualização"
}
```

---

### DELETE `/api/equipamentos/:id`

Remove um equipamento.

#### Parâmetros de Rota

| Parâmetro | Tipo   | Descrição         |
| --------- | ------ | ----------------- |
| `id`      | string | ID do equipamento |

#### Exemplo de Requisição

```bash
curl -X DELETE http://localhost:3000/api/equipamentos/eq-000001
```

#### Resposta de Sucesso (200 OK)

```json
{
  "mensagem": "Equipamento removido com sucesso"
}
```

#### Resposta de Erro (404 Not Found)

```json
{
  "error": "Equipamento não encontrado"
}
```

---

## Códigos de Status HTTP

| Código | Descrição                                              |
| ------ | ------------------------------------------------------ |
| 200    | OK - Requisição bem-sucedida                           |
| 201    | Created - Recurso criado com sucesso                   |
| 400    | Bad Request - Dados inválidos ou parâmetros incorretos |
| 404    | Not Found - Recurso não encontrado                     |
| 500    | Internal Server Error - Erro interno do servidor       |

---

## Exemplos de Uso

### Cenário 1: Criar e Atualizar Equipamento

```bash
# 1. Criar novo equipamento
curl -X POST http://localhost:3000/api/equipamentos \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Ultrassom Portátil GE",
    "categoria": "Ultrassom",
    "status": "Disponível",
    "prioridade": "Média",
    "localizacao": "Ambulatório - Sala 3",
    "dataAquisicao": "2026-02-01T08:00:00.000Z"
  }'

# Resposta: { "id": "eq-000011", ... }

# 2. Atualizar para manutenção
curl -X PUT http://localhost:3000/api/equipamentos/eq-000011 \
  -H "Content-Type: application/json" \
  -d '{
    "status": "Manutenção",
    "dataUltimaManutencao": "2026-02-02T10:00:00.000Z"
  }'

# 3. Buscar equipamento atualizado
curl http://localhost:3000/api/equipamentos/eq-000011
```

### Cenário 2: Filtrar Equipamentos por Múltiplos Critérios

```bash
# Buscar todos os monitores e respiradores disponíveis adquiridos em 2023
curl "http://localhost:3000/api/equipamentos?categorias=Monitor,Respirador&status=Disponível&dataInicio=2023-01-01T00:00:00.000Z&dataFim=2023-12-31T23:59:59.999Z"
```

### Cenário 3: Listar Equipamentos em Manutenção

```bash
# Buscar todos os equipamentos em manutenção
curl "http://localhost:3000/api/equipamentos?status=Manutenção"
```

### Cenário 4: Gerenciar Ciclo de Vida Completo

```bash
# 1. Criar equipamento
curl -X POST http://localhost:3000/api/equipamentos \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Bomba de Infusão Teste",
    "categoria": "Bomba de Infusão",
    "status": "Disponível",
    "prioridade": "Baixa",
    "localizacao": "Estoque",
    "dataAquisicao": "2026-01-01T08:00:00.000Z"
  }'

# 2. Marcar como em uso
curl -X PUT http://localhost:3000/api/equipamentos/eq-000012 \
  -H "Content-Type: application/json" \
  -d '{ "status": "Em Uso", "localizacao": "Enfermaria 3 - Leito 5" }'

# 3. Enviar para manutenção
curl -X PUT http://localhost:3000/api/equipamentos/eq-000012 \
  -H "Content-Type: application/json" \
  -d '{
    "status": "Manutenção",
    "localizacao": "Oficina Técnica",
    "dataUltimaManutencao": "2026-02-02T14:00:00.000Z"
  }'

# 4. Retornar para estoque
curl -X PUT http://localhost:3000/api/equipamentos/eq-000012 \
  -H "Content-Type: application/json" \
  -d '{ "status": "Disponível", "localizacao": "Estoque" }'

# 5. Descartar equipamento
curl -X PUT http://localhost:3000/api/equipamentos/eq-000012 \
  -H "Content-Type: application/json" \
  -d '{ "status": "Descartado", "localizacao": "Depósito de Descarte" }'

# 6. Remover do sistema
curl -X DELETE http://localhost:3000/api/equipamentos/eq-000012
```

---

## Dados Iniciais (Seed)

A API é inicializada automaticamente com 10 equipamentos de exemplo para facilitar testes. Os dados incluem:

- 2 Monitores (1 disponível, 1 em uso)
- 2 Respiradores (1 em uso, 1 inativo)
- 2 Bombas de Infusão (1 em manutenção, 1 disponível)
- 1 Aparelho de Raio-X (disponível)
- 1 Ultrassom (disponível)
- 1 Maca (disponível)
- 1 Desfibrilador (descartado)

Equipamentos com datas de aquisição variando de 2020 a 2025, permitindo testar filtros de data.

---

## Notas Técnicas

1. **Persistência**: Os dados são armazenados em memória. Reiniciar o servidor irá resetar os dados para o estado inicial (seed data).

2. **IDs**: Os IDs são gerados automaticamente no formato `eq-XXXXXX` (ex: `eq-000001`).

3. **Timestamps**: Os campos `criadoEm` e `atualizadoEm` são gerenciados automaticamente pelo servidor.

4. **Datas**: Todas as datas devem estar no formato ISO 8601. O campo `dataUltimaManutencao` pode estar vazio (`""`) quando não fornecido.

5. **Filtros**: Filtros no GET são combinados com lógica AND. Um array vazio é retornado quando nenhum equipamento corresponde aos critérios.

6. **Atualização Parcial**: O endpoint PUT suporta atualização parcial - apenas os campos fornecidos serão atualizados, preservando os demais valores.
