const express = require("express");
const redis = require("redis");
const cors = require("cors");

const app = express();

// Criar cliente do Redis e configurar a conexão
const redisClient = redis.createClient({
  url: "redis://localhost:6379",  // Endereço padrão do Redis (ajuste se necessário)
});

// Conectar ao Redis
redisClient.connect().catch(err => {
  console.error("Erro ao conectar ao Redis:", err);
});

// Middleware para parse de JSON e CORS
app.use(express.json());
app.use(cors());

// Inicializar um contador de ID para os novos usuários
let userIdCounter = 2; // ID inicial para novos usuários

// Rota para obter todos os usuários
app.get("/api/users", async (req, res) => {
  try {
    // Recuperar a lista de usuários do Redis
    const users = await redisClient.get("users");
    if (users) {
      return res.json(JSON.parse(users));
    }
    return res.json([]); // Se não houver usuários no Redis, retorna uma lista vazia
  } catch (error) {
    console.error("Erro ao obter usuários do Redis:", error);
    res.status(500).json({ error: "Erro ao recuperar dados do Redis." });
  }
});

// Rota para adicionar um novo usuário
app.post("/api/users", async (req, res) => {
  const { username, email, age } = req.body;
  if (!username || !email || !age) {
    return res.status(400).json({ error: "Preencha todos os campos." });
  }

  userIdCounter++;
  const newUser = { id: userIdCounter, username, email, age };

  try {
    // Recupera a lista de usuários do Redis
    const users = await redisClient.get("users");
    let usersList = users ? JSON.parse(users) : [];

    // Adiciona o novo usuário à lista
    usersList.push(newUser);

    // Armazena a lista de volta no Redis
    await redisClient.set("users", JSON.stringify(usersList));

    res.status(201).json(newUser);
  } catch (error) {
    console.error("Erro ao adicionar usuário no Redis:", error);
    res.status(500).json({ error: "Erro ao adicionar usuário ao Redis." });
  }
});

// Rota para deletar um usuário
app.delete("/api/users/:id", async (req, res) => {
  const userId = parseInt(req.params.id);

  try {
    // Recupera a lista de usuários do Redis
    const users = await redisClient.get("users");
    let usersList = users ? JSON.parse(users) : [];

    // Filtra o usuário que deve ser removido
    usersList = usersList.filter(user => user.id !== userId);

    // Armazena a lista atualizada no Redis
    await redisClient.set("users", JSON.stringify(usersList));

    res.status(204).send();
  } catch (error) {
    console.error("Erro ao deletar usuário no Redis:", error);
    res.status(500).json({ error: "Erro ao deletar usuário do Redis." });
  }
});

// Rota para editar um usuário
app.put("/api/users/:id", async (req, res) => {
  const { id } = req.params;
  const { username, email, age } = req.body;

  try {
    // Recupera a lista de usuários do Redis
    const users = await redisClient.get("users");
    let usersList = users ? JSON.parse(users) : [];

    // Atualiza o usuário
    usersList = usersList.map(user =>
      user.id === parseInt(id) ? { ...user, username, email, age } : user
    );

    // Armazena a lista atualizada no Redis
    await redisClient.set("users", JSON.stringify(usersList));

    res.json(usersList.find(user => user.id === parseInt(id)));
  } catch (error) {
    console.error("Erro ao editar usuário no Redis:", error);
    res.status(500).json({ error: "Erro ao editar usuário no Redis." });
  }
});

// Inicializar o servidor
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

// Tratamento de eventos de erro na conexão com o Redis
redisClient.on("connect", () => {
  console.log("Conectado ao Redis com sucesso!");
});

redisClient.on("error", (err) => {
  console.error("Erro de conexão com o Redis:", err);
});
