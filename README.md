# User Albums API.

## Inicialização do projeto.

- **_Node version_**: v21.6.1^.
- **_Npm version_**: v10.2.4^.
- **_Instalação de dependências_**: `npm i` | `npm install`
- **_Variáveis de ambiente_**: Duplicar e renomear o arquivo `.env.example` para `.env.dev` e sobreescrever as informações do arquivo `.env.dev` com as suas credênciais.
- **_Migrações_**: Execute as migrações com o comando: `npm run migrate:dev`.
- **_Rodar a aplicação_**: Comando para iniciar a aplicação: `npm run dev`.

## Rotas.

### Endpoint: /api/users

#### Method: patch

- É uma rota autenticada. É obrigatório enviar no cabeçalho da aplicação o token, seguindo a seguinte sintax: "Bearer _seu_token_"

**Exemplo de corpo da requisição:**

```json
// Header -> Authorization: Bearer **seu_token**
{
  "email": "pedro@mail.com",
  "password": "1234",
  "detail": {
    "phone": "+55 (11) 9 1234-1234"
  }
}
```

**Exemplo de resposta de requisição:**

```json
{
  "id": "2",
  "username": "Pedro",
  "email": "pedro@mail.com",
  "admin": false,
  "detail": {
    "id": "1",
    "address": "R. das Rosas",
    "phone": "+55 (11) 9 1234-1234",
    "bio": "Teste de update"
  }
}
```
