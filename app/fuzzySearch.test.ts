const fuzzySearch = require("./fuzzySearch");

describe("fuzzySearch", () => {
    it("returns true for identical strings", () => {
        const searchString = "hello";
        const targetString = "hello";
        const result = fuzzySearch(searchString, targetString);
        expect(result).toBe(true);
    });

    it("returns true for strings with one extra character", () => {
        const searchString = "hello";
        const targetString = "helo";
        const result = fuzzySearch(searchString, targetString);
        expect(result).toBe(true);
    });

    it("returns true for strings with one missing character", () => {
        const searchString = "helo";
        const targetString = "hello";
        const result = fuzzySearch(searchString, targetString);
        expect(result).toBe(true);
    });

    it("returns true for strings with one different character", () => {
        const searchString = "hello";
        const targetString = "hallo";
        const result = fuzzySearch(searchString, targetString);
        expect(result).toBe(true);
    });

    it("returns false for strings with more than one different character", () => {
        const searchString = "hello";
        const targetString = "hallo";
        const result = fuzzySearch(searchString, targetString);
        expect(result).toBe(false);
    });

    it("returns false for strings with more than one extra character", () => {
        const searchString = "hello";
        const targetString = "heo";
        const result = fuzzySearch(searchString, targetString);
        expect(result).toBe(false);
    });

    it("returns false for strings with more than one missing character", () => {
        const searchString = "heo";
        const targetString = "hello";
        const result = fuzzySearch(searchString, targetString);
        expect(result).toBe(false);
    });
});
