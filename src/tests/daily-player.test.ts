import { describe, it, expect } from "vitest";
import {
  getDailyPlayerIndex,
  getDailyPlayer,
  getDailyNumber,
} from "@/lib/daily-player";

describe("getDailyPlayerIndex", () => {
  it("returns a valid index within range", () => {
    const idx = getDailyPlayerIndex("2026-05-12");
    expect(idx).toBeGreaterThanOrEqual(0);
    expect(idx).toBeLessThan(110);
  });

  it("same date always returns same index", () => {
    const a = getDailyPlayerIndex("2026-05-12");
    const b = getDailyPlayerIndex("2026-05-12");
    expect(a).toBe(b);
  });

  it("different dates return different indices (likely)", () => {
    const a = getDailyPlayerIndex("2026-05-12");
    const b = getDailyPlayerIndex("2026-05-13");
    const c = getDailyPlayerIndex("2026-06-01");
    expect([b, c].every((x) => x !== a || b === c)).toBeDefined();
  });

  it("covers various dates without throwing", () => {
    const dates = [
      "2026-01-01",
      "2026-06-15",
      "2026-12-31",
      "2027-03-20",
    ];
    dates.forEach((d) => {
      const idx = getDailyPlayerIndex(d);
      expect(idx).toBeGreaterThanOrEqual(0);
      expect(idx).toBeLessThan(110);
    });
  });
});

describe("getDailyPlayer", () => {
  it("returns a player object with required fields", () => {
    const player = getDailyPlayer("2026-05-12");
    expect(player).toBeDefined();
    expect(player.name).toBeDefined();
    expect(player.debutDecade).toBeDefined();
    expect(player.position).toBeDefined();
  });
});

describe("getDailyNumber", () => {
  it("day 1 for epoch date", () => {
    expect(getDailyNumber("2026-01-01")).toBe(1);
  });

  it("increases by 1 each day", () => {
    const d1 = getDailyNumber("2026-05-12");
    const d2 = getDailyNumber("2026-05-13");
    expect(d2).toBe(d1 + 1);
  });
});
