import request from "supertest";
import app from "../app";
import sequelize from "../config/database";
import UserModel from "../models/UserModel";
import { generateToken } from "../utils/jwt";

let token: string;

beforeAll(async () => {
  await sequelize.sync({ force: true });

  const user = await UserModel.create({
    name: "Pedro Teste",
    email: "pedro@teste.com",
    password: "J234568@",
    cpf: "12345678901",
  });

  token = generateToken(user);
});

afterAll(async () => {
  await sequelize.close();
});

describe("Testes de Genres (Gêneros de Jogos)", () => {
  it("Deve bloquear acesso sem token", async () => {
    const res = await request(app).get("/genres");
    expect(res.status).toBe(401);
  });

  it("Deve listar os gêneros com token válido", async () => {
    const res = await request(app)
      .get("/genres")
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
  });

  it("Deve criar um gênero com token válido", async () => {
    const res = await request(app)
      .post("/genres")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "RPG",
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.name).toBe("RPG");
  });
});