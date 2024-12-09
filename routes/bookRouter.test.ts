import request from "supertest";
import app from "../app";
import { generateAccessToken } from "../services/authServices";
import {
  setStartBookshelves,
  getStartBookshelves,
} from "../assets/starterBookshelves";
import Bookshelves from "../models/Bookshelves";

beforeAll(async () => {
  await setStartBookshelves();
  Bookshelves.refreshBookshelf();
});

it("should return a 404 if book is not found", async () => {
  await request(app).get("/api/book/invalid").send().expect(404);
});

it("should return the book with the shelf if the book is in the user's bookshelf", async () => {
  const { id, title, shelf, userId } = getStartBookshelves()[0];
  const token = generateAccessToken(userId);

  const { body } = await request(app)
    .get(`/api/book/${id}`)
    .set("Authorization", `Bearer ${token}`)
    .send()
    .expect(200);

  expect(body.book).toMatchObject({
    id,
    title,
    shelf,
  });
});

// TODO book's description stripped HTML tags

it("should not return the user id in the response", async () => {
  const { id, userId } = getStartBookshelves()[0];
  const token = generateAccessToken(userId);

  const { body } = await request(app)
    .get(`/api/book/${id}`)
    .set("Authorization", `Bearer ${token}`)
    .send()
    .expect(200);

  expect(body.book).not.toMatchObject({ userId: expect.anything() });
});

it("should return the book without the shelf if the book is not in user's the bookshelf", async () => {
  const { body } = await request(app)
    .get("/api/book/6LAaAQAAIAAJ")
    .send()
    .expect(200);
  expect(body.book).toMatchObject({
    id: "6LAaAQAAIAAJ",
    title: expect.any(String),
  });
  expect(body.book).not.toMatchObject({ shelf: expect.anything() });
});

it("should return the book without the shelf if the user has not logged in", async () => {
  const { id, title } = getStartBookshelves()[0];

  const { body } = await request(app).get(`/api/book/${id}`).send().expect(200);

  expect(body.book).toMatchObject({ id, title });
  expect(body.book).not.toMatchObject({ shelf: expect.anything() });
});
