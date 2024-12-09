import request from "supertest";
import app from "../app";

it("should return an array of books", async () => {
  const { body } = await request(app)
    .get("/api/book/search/card+games")
    .send()
    .expect(200);
  expect(body).toMatchObject({
    message: `Showing first 20 results'`,
    books: expect.any(Array),
  });
  expect(body.books[0]).toMatchObject({
    id: expect.any(String),
    title: expect.any(String),
  });
});

it("should return an empty array of books if no books are found", async () => {
  const { body } = await request(app)
    .get("/api/book/search/uslvtugszgdxzgvhzsvja")
    .send()
    .expect(200);
  expect(body).toMatchObject({
    message: `No books matching 'uslvtugszgdxzgvhzsvja' found.`,
    books: [],
  });
});

it("should return the results for the latest search query if this API is being called on every keystroke", async () => {
  const responses = ["ca", "car", "cars"].map((text) => {
    return request(app).get(`/api/book/search/${text}`).send();
  });
  const results = await Promise.all(responses);
  const data = results.map(({ body }) => body.books);
  expect(data[0]).toStrictEqual(data[2]);
  expect(data[1]).toStrictEqual(data[2]);
});
