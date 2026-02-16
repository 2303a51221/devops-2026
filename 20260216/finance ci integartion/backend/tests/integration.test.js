const request = require("supertest");
const app = require("../app");
const { _internal } = require("../app");

describe("Integration Tests - Personal Finance Tracker APIs", () => {
  beforeEach(() => {
    _internal._resetData();
  });

  test("Dashboard API returns correct summary data", async () => {
    const res = await request(app).get("/api/dashboard");

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("totalIncome");
    expect(res.body).toHaveProperty("totalExpenses");
    expect(res.body).toHaveProperty("balance");

    expect(res.body.totalIncome).toBe(12000);
    expect(res.body.totalExpenses).toBe(800);
    expect(res.body.balance).toBe(11200);
  });

  test("Expenses API supports fetch (GET) operation", async () => {
    const res = await request(app).get("/api/expenses");

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(2);
  });

  test("Expenses API supports create (POST) + fetch consistency", async () => {
    const newExpense = { title: "Internet Bill", amount: 999 };

    const postRes = await request(app).post("/api/expenses").send(newExpense);

    expect(postRes.statusCode).toBe(201);

    const getRes = await request(app).get("/api/expenses");
    const found = getRes.body.find((e) => e.title === "Internet Bill");

    expect(found).toBeTruthy();
  });

  test("Income API supports fetch (GET) operation", async () => {
    const res = await request(app).get("/api/income");

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(2);
  });

  test("Income API supports create (POST) + fetch consistency", async () => {
    const newIncome = { source: "Bonus", amount: 1500 };

    const postRes = await request(app).post("/api/income").send(newIncome);

    expect(postRes.statusCode).toBe(201);

    const getRes = await request(app).get("/api/income");
    const found = getRes.body.find((i) => i.source === "Bonus");

    expect(found).toBeTruthy();
  });
});
