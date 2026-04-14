import request from "supertest";
import app from "../app";
import sequelize from "../config/database";
import UserModel from "../models/UserModel";
import DevModel from "../models/DevModel";
import GenreModel from "../models/GenreModel";
import GameModel from "../models/GameModel";
import { generateToken } from "../utils/jwt";

let tokenUserA: string;
let tokenUserB: string;
let userAId: number;
let developerId: number;
let genreId: number;

beforeAll(async () => {
  await sequelize.sync({ force: true });

  const userA = await UserModel.create({
    name: "Usuário A",
    email: "a@teste.com",
    password: "Password123!",
    cpf: "12345678901",
  });
  userAId = userA.id;
  tokenUserA = generateToken(userA);

  const userB = await UserModel.create({
    name: "Usuário B",
    email: "b@teste.com",
    password: "Password123!",
    cpf: "98765432100",
  });
  tokenUserB = generateToken(userB);

  const developer = await DevModel.create({ name: "Nintendo" });
  developerId = developer.id;

  const genre = await GenreModel.create({ name: "Aventura" });
  genreId = genre.id;
});

afterAll(async () => {
  await sequelize.close();
});

describe("Testes de Games e Privacidade", () => {

  it("Deve bloquear acesso sem token", async () => {
    const res = await request(app).get("/games");
    expect(res.status).toBe(401);
  });

  it("Deve criar um game PRIVADO para o Usuário A", async () => {
    const res = await request(app)
      .post("/games")
      .set("Authorization", `Bearer ${tokenUserA}`)
      .send({
        title: "Jogo Secreto do A",
        description: "Ninguém pode ver",
        isPublic: false,
        authorIds: [developerId],
        categoryIds: [genreId],
      });

    expect(res.status).toBe(201);
    expect(res.body.userId).toBe(userAId);
    expect(res.body.isPublic).toBe(false);
  });

  it("Usuário B NÃO deve ver o jogo privado do Usuário A", async () => {
    const res = await request(app)
      .get("/games")
      .set("Authorization", `Bearer ${tokenUserB}`);

    expect(res.status).toBe(200);
    const jogaNaLista = res.body.data.find((g: any) => g.title === "Jogo Secreto do A");
    expect(jogaNaLista).toBeUndefined();
  });

  it("Usuário A DEVE conseguir ver seu próprio jogo privado", async () => {
    const res = await request(app)
      .get("/games")
      .set("Authorization", `Bearer ${tokenUserA}`);

    expect(res.status).toBe(200);
    const jogaNaLista = res.body.data.find((g: any) => g.title === "Jogo Secreto do A");
    expect(jogaNaLista).toBeDefined();
  });

  it("Deve criar um game PÚBLICO e ambos devem ver", async () => {
    await request(app)
      .post("/games")
      .set("Authorization", `Bearer ${tokenUserA}`)
      .send({
        title: "Zelda Público",
        description: "Todo mundo vê",
        isPublic: true,
        authorIds: [developerId],
        categoryIds: [genreId],
      });

    const res = await request(app)
      .get("/games")
      .set("Authorization", `Bearer ${tokenUserB}`);

    const jogaNaLista = res.body.data.find((g: any) => g.title === "Zelda Público");
    expect(jogaNaLista).toBeDefined();
  });
});