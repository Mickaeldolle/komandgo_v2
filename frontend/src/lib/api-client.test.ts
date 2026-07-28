import { afterEach, describe, expect, it, vi } from "vitest";
import { z } from "zod";

import { apiRequest, money } from "./api-client";

afterEach(() => {
  vi.unstubAllGlobals();
  document.cookie = "csrftoken=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
});

describe("api client", () => {
  it("validates successful JSON responses", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        new Response(JSON.stringify({ value: "ok" }), {
          status: 200,
          headers: { "Content-Type": "application/json" }
        })
      )
    );

    const result = await apiRequest("/health/", z.object({ value: z.string() }));
    expect(result.value).toBe("ok");
  });

  it("normalizes API errors", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        new Response(
          JSON.stringify({
            error: { code: "invalid", message: "Données invalides", fields: null }
          }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        )
      )
    );

    await expect(apiRequest("/bad/", z.string())).rejects.toMatchObject({
      status: 400,
      code: "invalid",
      message: "Données invalides"
    });
  });

  it("formats money in euros", () => {
    expect(money("12.50")).toContain("12,50");
  });
});

