import { formatDateToUS } from "../date";

describe("utils - date", () => {
  describe("formatDateToUS", () => {
    it("should format the date to US format", () => {
      const date = new Date("2023-04-12").toLocaleDateString("en-US", {
        timeZone: "UTC",
      });
      const expected = "04/12/2023";
      const result = formatDateToUS(date);

      expect(result).toBe(expected);
    });

    it("should return an empty string if the date is empty", () => {
      const date = "";
      const expected = "";
      const result = formatDateToUS(date);

      expect(result).toBe(expected);
    });

    it("should format the date to US format", () => {
      const date = new Date("2023-04-11T00:00:00.000Z").toLocaleDateString(
        "en-US",
        {
          timeZone: "UTC",
        },
      );
      const expected = "04/11/2023";
      const result = formatDateToUS(date);

      expect(result).toBe(expected);
    });

    it("should format the date to US format", () => {
      const date = new Date("2017-11-01T13:43:21.123Z").toLocaleDateString(
        "en-US",
        {
          timeZone: "UTC",
        },
      );
      const expected = "11/01/2017";
      const result = formatDateToUS(date);

      expect(result).toBe(expected);
    });
  });
});
