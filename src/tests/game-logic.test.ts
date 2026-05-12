import { describe, it, expect } from "vitest";
import {
  compare,
  compareDecade,
  compareTitles,
  compareNationality,
  isWin,
  type Player,
} from "@/lib/game-logic";

const base: Player = {
  id: 1,
  name: "Test Player",
  debutDecade: "1990s",
  position: "Delantero",
  nationality: "Argentina",
  mainArgClub: "Boca Juniors",
  intTitles: "1-2",
  playedForNationalTeam: true,
  verified: true,
};

describe("compareDecade", () => {
  it("same decade → match", () => {
    expect(compareDecade("1990s", "1990s")).toBe("match");
  });

  it("adjacent decade → close", () => {
    expect(compareDecade("1980s", "1990s")).toBe("close");
    expect(compareDecade("2000s", "1990s")).toBe("close");
  });

  it("two decades apart → miss", () => {
    expect(compareDecade("1970s", "1990s")).toBe("miss");
  });

  it("extreme decades → miss", () => {
    expect(compareDecade("1960s", "2020s")).toBe("miss");
  });
});

describe("compareTitles", () => {
  it("same → match", () => {
    expect(compareTitles("1-2", "1-2")).toBe("match");
    expect(compareTitles("0", "0")).toBe("match");
    expect(compareTitles("3+", "3+")).toBe("match");
  });

  it("adjacent → close", () => {
    expect(compareTitles("0", "1-2")).toBe("close");
    expect(compareTitles("1-2", "3+")).toBe("close");
  });

  it("far apart → miss", () => {
    expect(compareTitles("0", "3+")).toBe("miss");
  });
});

describe("compareNationality", () => {
  it("same → match", () => {
    expect(compareNationality("Argentina", "Argentina")).toBe("match");
  });

  it("Argentina vs Otro país sudamericano → close", () => {
    expect(compareNationality("Argentina", "Otro país sudamericano")).toBe(
      "close"
    );
  });

  it("Otro vs Resto → close", () => {
    expect(compareNationality("Otro país sudamericano", "Resto")).toBe("close");
  });

  it("Argentina vs Resto → miss", () => {
    expect(compareNationality("Argentina", "Resto")).toBe("miss");
  });
});

describe("compare", () => {
  it("identical player → all match", () => {
    const result = compare(base, base);
    expect(result.debutDecade).toBe("match");
    expect(result.position).toBe("match");
    expect(result.nationality).toBe("match");
    expect(result.mainArgClub).toBe("match");
    expect(result.intTitles).toBe("match");
    expect(result.playedForNationalTeam).toBe("match");
  });

  it("different position → miss", () => {
    const guess = { ...base, position: "Arquero" };
    const result = compare(guess, base);
    expect(result.position).toBe("miss");
  });

  it("different club → miss", () => {
    const guess = { ...base, mainArgClub: "River Plate" };
    const result = compare(guess, base);
    expect(result.mainArgClub).toBe("miss");
  });

  it("adjacent decade → close", () => {
    const guess = { ...base, debutDecade: "2000s" };
    const result = compare(guess, base);
    expect(result.debutDecade).toBe("close");
  });
});

describe("isWin", () => {
  it("all match → win", () => {
    const result = compare(base, base);
    expect(isWin(result)).toBe(true);
  });

  it("one miss → not win", () => {
    const guess = { ...base, position: "Arquero" };
    const result = compare(guess, base);
    expect(isWin(result)).toBe(false);
  });
});
