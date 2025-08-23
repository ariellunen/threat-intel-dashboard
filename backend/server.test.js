import request from "supertest";
import app from "./server.js";
import { jest } from "@jest/globals";

describe("GET /api/intel", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should return 400 if IP is missing", async () => {
    const res = await request(app).get("/api/intel");
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error", "Invalid or missing IP address");
  });

  it("should return 400 if IP is invalid", async () => {
    const res = await request(app).get("/api/intel?ip=notanip");
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error", "Invalid or missing IP address");
  });

  it("should return JSON for a valid IP (mocked)", async () => {
    // AbuseIPDB mock
    fetch.mockResolvedValueOnce({
      status: 200,
      ok: true,
      json: async () => ({
        data: { abuseConfidenceScore: 10, totalReports: 2 },
      }),
    });

    // VirusTotal mock
    fetch.mockResolvedValueOnce({
      status: 200,
      ok: true,
      json: async () => ({
        data: { attributes: { reputation: 5, network: "Google LLC" } },
      }),
    });

    // ProxyCheck mock
    fetch.mockResolvedValueOnce({
      status: 200,
      ok: true,
      json: async () => ({
        "8.8.8.8": {
          provider: "Google",
          country: "US",
          city: "Mountain View",
          proxy: "no",
        },
      }),
    });

    const res = await request(app).get("/api/intel?ip=8.8.8.8");

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("ip", "8.8.8.8");
    expect(res.body).toHaveProperty("abuseScore", 10);
    expect(res.body).toHaveProperty("recentReports", 2);
    expect(res.body).toHaveProperty("vpnOrProxy", false);
  });
});
