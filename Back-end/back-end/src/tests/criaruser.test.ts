import request from "supertest";
import app from "../app";
import sequelize from "../config/database";
import UserModel from "../models/UserModel";

describe("Testes de Usuário e Login", () => {
  let user1: InstanceType<typeof UserModel>;
  let user2: InstanceType<typeof UserModel>;
  let token1: string = "";
  let token2: string = "";

  beforeAll(async () => {
    await sequelize.sync({ force: true });

    user1 = await UserModel.create({
      name: "Pedro Teste",
      email: "pedro@teste.com",
      password: "J234568@",
      cpf: "12345678901",
    });

    user2 = await UserModel.create({
      name: "Outro Usuário",
      email: "outro@teste.com",
      password: "654321",
      cpf: "12345678902",
    });

    const res1 = await request(app).post("/login").send({
      email: "pedro@teste.com",
      password: "J234568@",
    });
    token1 = res1.body.token;

    const res2 = await request(app).post("/login").send({
      email: "outro@teste.com",
      password: "654321",
    });
    token2 = res2.body.token;
  });

  afterAll(async () => {
    await sequelize.close();
  });

  test("Usuário 1 deve ser criado corretamente", async () => {
    expect(user1.name).toBe("Pedro Teste");
    expect(await user1.validatePassword("J234568@")).toBe(true);
  });

  test("Usuário 2 deve ser criado corretamente", async () => {
    expect(user2.name).toBe("Outro Usuário");
  });

  describe("Login API", () => {
    it("Login com sucesso", async () => {
      const response = await request(app).post("/login").send({
        email: "pedro@teste.com",
        password: "J234568@",
      });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("token");
    });

    it("Falha ao logar com e-mail inválido", async () => {
      const response = await request(app).post("/login").send({
        email: "invalid@example.com",
        password: "password123",
      });

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty("error", "Invalid credentials");
    });

    it("Falha ao logar com senha inválida", async () => {
      const response = await request(app).post("/login").send({
        email: "pedro@teste.com",
        password: "senhaerrada",
      });

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty("error", "Invalid credentials");
    });

    it("Falha ao logar com dados ausentes", async () => {
      const response = await request(app).post("/login").send({
        email: "",
        password: "",
      });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty(
        "error",
        "Email and password are required"
      );
    });
  });

  describe("Atualização de Usuário com Restrição", () => {
    it("Não deve permitir que user2 edite dados de user1", async () => {
      const res = await request(app)
        .put(`/users/${user1.id}`)
        .set("Authorization", `Bearer ${token2}`)
        .send({
          name: "Hacker",
          user: { id: String(user2.id) },
        });

      expect(res.status).toBe(403);
      expect(res.body.error).toBe("Você só pode editar seus próprios dados");
    });

    it("Deve permitir que user1 edite seus próprios dados", async () => {
      const res = await request(app)
        .put(`/users/${user1.id}`)
        .set("Authorization", `Bearer ${token1}`)
        .send({
          name: "Pedro Editado",
          user: { id: String(user1.id) },
        });

      expect(res.status).toBe(200);
      expect(res.body.name).toBe("Pedro Editado");
    });

    it("Deve retornar erro ao tentar editar com campos obrigatórios ausentes", async () => {
      const res = await request(app)
        .put(`/users/${user1.id}`)
        .set("Authorization", `Bearer ${token1}`)
        .send({
          name: "",
          user: { id: String(user1.id) },
        });

      expect(res.status).toBe(400);
      expect(res.body.message).toMatch(/nome é obrigatório/i);
    });
  });
});