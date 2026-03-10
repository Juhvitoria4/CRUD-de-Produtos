# CRUD de Produtos

Aplicação full stack para cadastro de produtos, desenvolvida com **.NET 9 Web API**, **Entity Framework Core**, **MySQL** e **React**.
O sistema permite realizar operações básicas de CRUD, com foco em aprendizado de integração entre backend, banco de dados e frontend.

---

## Funcionalidades

- Cadastro de produtos
- Listagem de produtos
- Exclusão de produtos
- Validação de campos obrigatórios
- Validação de preço maior que zero
- Validação de estoque não negativo
- Validação de unicidade no código de barras
- Integração entre frontend e backend via API REST

---

## Tecnologias utilizadas

### Backend
- .NET 9 Web API
- Entity Framework Core
- Pomelo.EntityFrameworkCore.MySql
- MySQL
- CORS

### Frontend
- React
- Axios
- CSS

---

## Estrutura do projeto

```bash
CRUD-de-Produtos/
├── ProdutosApi/       # Backend em .NET
└── frontend/          # Frontend em React