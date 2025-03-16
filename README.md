# 📌 Sistema de Cadastro de Usuários (React + Redis)

Este projeto é uma aplicação completa de **Cadastro de Usuários**, composta por um **frontend em React.js** e um **backend em Node.js com Redis**. Os usuários podem ser cadastrados, visualizados, editados e excluídos.

## 🚀 Tecnologias Utilizadas

- **Frontend**: React.js (com React Router e Hooks)
- **Backend**: Node.js com Express e Redis
- **Banco de Dados**: Redis (armazenamento em cache rápido)
- **Gerenciador de Pacotes**: npm ou yarn
- **Controle de Versão**: Git e GitHub

---

## 📂 Estrutura do Projeto

📦 MeuProjeto 
├── 📁 backend 
│  ├── 📄 server.js │ 
   ├── 📄 routes.js │ 
   ├── 📄 controllers.js │ 
   ├── 📄 package.json │ 
   ├── 📄 .env 
├── 📁 frontend
│ ├── 📁 src │ 
  │ ├── 📁 components │  
    │ ├── 📄 Login.jsx │ 
    │ ├── 📄 Crud.jsx 
  │ ├── 📄 App.jsx │
  │ ├── 📄 index.js 
│ ├── 📄 package.json 
│ ├── 📄 .gitignore 
├── 📄 README.md


---

## 📦 Como Instalar e Rodar o Projeto

### 🔧 **1. Clonar o Repositório**
```sh
git clone https://github.com/seu-usuario/seu-repositorio.git
cd MeuProjeto
cd backend
npm install
```

### 🔧 **2. Rodar o projeto**
```sh
cd backend
npm install
```
### 🔧 **3. Configurar o Redis** 

Certifique-se de que o Redis está instalado e rodando no container docker.
## 1.1 Instalação e configuração (preferencialmente utilizando Docker)

Instalação do DOCKER 

```jsx
docker --version
```

Baixar e Rodar o Redis com Docker

```jsx
docker run --name redis -d -p 6379:6379 redis
```

- `-name redis` → Nome do container
- `d` → Executar em modo background
- `p 6379:6379` → Mapeia a porta do host para o container

Verifique se o Redis está rodando:

```jsx
docker ps
```

Para conectar ao Redis dentro do container, use:

```jsx
docker exec -it redis redis-cli
```

Teste a conexão com:

```sql
PING
```

Verificando se a Imagem Redis já existe:

```jsx
docker images
```

**Caso a imagem do Redis não esteja na lista, baixe-a com:**

```sql
docker pull redis
```

Verificar se o Container Está Rodando

```sql
docker ps
```

Se o container **não estiver rodando**, inicie-o manualmente:

```sql
docker start redis
```

Agora, conecte-se ao Redis CLI dentro do container:

```sql
docker exec -it redis redis-cli
```

### 🔧 **4. Configurar o Frontend** 
```sh
cd ../frontend
npm install
```

### 🔧 **4. Como rodar o projeto** 
```sh
cd backend
npx nodemon server.js
```
Em outro terminal:

```sh
cd frontend
npm run dev
```

---

🎯 Funcionalidades
✔️ Cadastro de usuários
✔️ Edição de usuários
✔️ Exclusão de usuários
✔️ Listagem de usuários
✔️ Integração com o backend via API
✔️ Armazenamento de dados no Redis

