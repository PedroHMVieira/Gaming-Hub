import request from "supertest";
import app from "../app";
import sequelize from "../config/database";
import UserModel from "../models/UserModel";
import DevModel from "../models/DevModel";
import GenreModel from "../models/GenreModel";
import { generateToken } from "../utils/jwt";

let token: string;
let developerId: number;
let genreId: number;

beforeAll(async () => {
  await sequelize.sync({ force: true });

  const user = await UserModel.create({
    name: "Pedro Teste",
    email: "pedro@teste.com",
    password: "J234568@",
    cpf: "12345678901",
  });

  token = generateToken(user);

  const developer = await DevModel.create({ name: "Nintendo" });
  developerId = developer.id;

  const genre = await GenreModel.create({ name: "Aventura" });
  genreId = genre.id;
});

afterAll(async () => {
  await sequelize.close();
});

describe("Testes de Games", () => {
  it("Deve bloquear acesso sem token", async () => {
    const res = await request(app).get("/games");
    expect(res.status).toBe(401);
  });

  it("Deve listar os games com token válido", async () => {
    const res = await request(app)
      .get("/games")
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
  });

  it("Deve criar um game com token válido", async () => {
    const res = await request(app)
      .post("/games")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "The Legend of Zelda",
        description: "Um jogo de aventura épico",
        date_published: "2024-01-01",
        developerIds: [developerId],
        genreIds: [genreId],
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.title).toBe("The Legend of Zelda");
  });
});